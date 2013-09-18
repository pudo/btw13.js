// Bundestagswahl Tabulator, MIT Licensed. (C) Friedrich Lindenberg
var Bundestagswahl = Bundestagswahl || {};

// Source: http://bundeswahlleiter.de/de/aktuelle_mitteilungen/downloads/20130902_Sitzkontingente.pdf
Bundestagswahl.STATE_SEATS = {
    1: 22,  // SH
    2: 13,  // HH
    3: 59,  // NI
    4: 5,   // BR
    5: 128, // NW
    6: 43,  // HE
    7: 30,  // RP
    8: 76,  // BW
    9: 92,  // BY
    10: 7,  // SL
    11: 24, // BE
    12: 19, // BB
    13: 13, // MV
    14: 32, // SN
    15: 15, // ST
    16: 17  // TH
};var Bundestagswahl = Bundestagswahl || {};

Bundestagswahl.reduce_sum = function(n, m) { return n+m; };

Bundestagswahl.saint_lague_iterative = function(votes, seats, mandates) {
  // this is a fairly manual implementation of the iterative method of 
  // calculating a saint lague allocation. this complication is made
  // necessary by the requirement that all states receive at least as 
  // many seats as they have direct mandates. the only way to ensure 
  // this is by iteratively estimating an appropriate divisor.

  // based on: http://dip21.bundestag.de/dip21/btd/17/118/1711819.pdf page 2.

  var voteTotal = _.reduce(_.values(votes), Bundestagswahl.reduce_sum, 0),
      divisor = voteTotal / seats,
      change = divisor / 2,
      distribution = {};

  while (true) {
    // distribute seats amongst candidates, at least the number of
    // direct mandates they have
    _.each(votes, function(cvotes, state) {
      var _seats = Math.max(Math.round(cvotes/divisor), mandates[state] || 0);
      // TODO: handle 0.5 case.
      distribution[state] = _seats;
    });
    
    // get the total number of seats allocated.
    seats_given = _.reduce(_.values(distribution),
      Bundestagswahl.reduce_sum, 0);

    if (seats_given == seats) {
      // right amount of seats have been allocated, done.
      return distribution;
    }
    if (seats_given > seats) {
      // too many seats, try a larger divisor.
      divisor = divisor + change;
    } else {
      // too few seats, try a smaller divisor.
      divisor = divisor - change;
    }
    change = change * 0.8;
  }
};

//console.log(saint_lague_iterative({'X': 5200, 'Y': 1700, 'Z': 3100}, 15, {}));
var Bundestagswahl = Bundestagswahl || {};

Bundestagswahl.parseResults = function(data) {
  // Parse a results data file from Bundeswahlleiter.
  // Format is described at: http://opendatalabs.org/de/wahldaten/fi/Beschreibung_Ergebnisdatei_csv.pdf

  function cellEmpty(cell) {
    return !cell || cell.trim().length === 0;
  }

  function numericCell(cell) {
    return cellEmpty(cell) ? 0 : parseInt(cell, 10);
  }

  function rightPad(row) {
    var previous = null;
    return row.map(function(cell) {
      if (cellEmpty(cell)) {
        return previous;
      } else {
        previous = cell;
        return cell;
      }
    });
  }

  var lines = data.split('\n').map(function(r) { return r.split(';'); }),
      results = [];
  
  // file manifest:
  results.election_name = lines.shift()[0];
  results.result_type = lines.shift()[0];
  
  // headers (party, vote type, result type):
  var group_header = rightPad(lines.shift()).slice(3),
      vote_header = rightPad(lines.shift()).slice(3),
      type_header = rightPad(lines.shift()).slice(3);
  
  _.each(lines, function(cells, row_id) {
    // row headers, with regional info:
    var admin_id = numericCell(cells.shift()),
        admin_label = cells.shift(),
        parent_id = numericCell(cells.shift()),
        admin_level = parent_id === 99 ? 'state' : 'district';
    admin_level = parent_id === 0 ? 'federal' : admin_level;

    // skip empty lines
    if (admin_id === 0) return;
    _.each(cells, function(value, i) {
      // TODO: skip all 'type': 'Vorperiode'?
      results.push({
        //'cell_index': i,
        //'row_index': row_id,
        'is_party': i > 15,
        'admin_id': admin_id,
        'admin_label': admin_label,
        'parent_id': parent_id,
        'admin_level': admin_level,
        'group': group_header[i],
        'vote_type': vote_header[i],
        'type': type_header[i],
        'votes': numericCell(value),
      });
    });
  });
  return results;
};
var Bundestagswahl = Bundestagswahl || {};

Bundestagswahl.Tabulator = function(results, result_type, regime) {
  var self = this;

  // the raw result objects from the interim tallies.
  self.results = results;
  self.regime = regime;

  self._filter_admin = function(level) {
    // find the distinct set of administrative regions
    var fres = _.filter(self.results, function(r) { return r.admin_level === level; }),
        regs = _.map(fres, function(r) {
          return {
            'id': r.admin_id,
            'label': r.admin_label,
            'parent_id': r.parent_id
          };
        });
    return _.uniq(regs, function(r) { return r.id; });
  };

  // get a list of all electoral districts
  self.districts = _.memoize(_.partial(self._filter_admin, 'district'));

  // get a list of all federal states
  self.states = _.memoize(_.partial(self._filter_admin, 'state'));

  self.regularSeatsCount = _.memoize(function() {
    // calculate the number of regular (i.e. non excess mandate) seats.
    return self.districts().length * 2;
  });

  self._admin_results = function(level, id) {
    // get all raw results for one particular administrative zone (state, district).
    return _.filter(self.results, function(r) {
      return r.admin_level === level && r.admin_id === id;
    });
  };

  self.parties = function() {
    // a list of all parties.
    return _.uniq(_.pluck(_.filter(results, function(r) { return r.is_party; }), 'group'));
  };

  self.directMandates = _.memoize(function() {
    // determine the party of the candidate that has won a direct mandate for
    // each district.
    var pairs = _.map(self.districts(), function(district) {
      // get all the relevant results for party candidates. 
      var results = _.filter(self._admin_results('district', district.id), function(r) {
        return r.is_party && r.vote_type == 'Erststimmen' && r.type == result_type;
      });
      var winner,
          bestResult = _.max(results, function(r) { return r.votes; });
      
      // if there is a primary vote candidate with the most votes:
      if (bestResult && bestResult.votes > 0) {
        winner = bestResult.group;
      }

      // TODO: maybe only call it if a certain percentage of voters have 
      // cast their ballot?
      return [district.id, winner];
    });
    return _.object(pairs);
  });

  self.directMandatesByParty = _.memoize(function() {
    // group direct mandates by party.
    return _.countBy(_.pairs(self.directMandates()), function(pair) {
      return pair[1];
    });
  });

  self.directMandatesByStateAndParty = _.memoize(function() {
    // group direct mandates by state, then grouped by party.
    var mandates = self.directMandates(),
        states = _.groupBy(self.districts(), function(d) { return d.parent_id; });
        seats = _.map(states, function(districts, state) {
          return [state, _.countBy(districts, function(d) { return mandates[d.id]; })];
        });
    return _.object(seats);
  });

  self.totalValidNationalSecondaryVotes = _.memoize(function() {
    // total number of valid secondary votes cast on the federal level
    var result = _.find(self._admin_results('federal', 99), function(r) {
        return r.vote_type == 'Zweitstimmen' && r.type == result_type && r.group == 'Gültige';
    });
    return result ? result.votes : 0;
  });

  self.totalNationalSecondaryVotesByParty = _.memoize(function() {
    // total number of secondary votes cast on the federal level for each party
    var results = _.filter(self._admin_results('federal', 99), function(r) {
        return r.vote_type == 'Zweitstimmen' && r.type == result_type && r.is_party;
    });
    return _.object(_.map(results, function(r) {
      return [r.group, r.votes];
    }));
  });

  self.secondaryResultsByState = _.memoize(function() {
    // per-party secondary votes, grouped by state.
    var counts = {};
    _.each(self.states(), function(state) {
      var results = _.filter(self._admin_results('state', state.id), function(r) {
        return r.vote_type == 'Zweitstimmen' && r.type == result_type && r.is_party;
      });
      counts[state.id] = _.object(_.map(results, function(r) {
        return [r.group, r.votes];
      }));
    });
    return counts;
  });

  self.factions = _.memoize(function() {
    // determine which parties have met the barring clause requirement.
    var parties = [];

    // check if any of the parties have three or more direct mandates
    _.each(self.directMandatesByParty(), function(count, party) {
      if (count >= 3) parties.push(party);
    });

    // check if any of the parties have 5% or more of the nation vote
    var total = self.totalValidNationalSecondaryVotes();
    _.each(self.totalNationalSecondaryVotesByParty(), function(votes, party) {
      if ((votes / total) >= 0.05) parties.push(party);
    });

    return _.uniq(parties);
  });

  self.nonFactionSeatsByState = _.memoize(function() {
    // calculate the number of seats per state which are allocated
    // directly to a party (or candidate) which doesn't meet the
    // barring clause.
    var fs = self.factions(),
        states = _.map(self.directMandatesByStateAndParty(), function(parties, state) {
          var count = _.reduce(_.pairs(parties), function(m, p) {
            return !_.contains(fs, p[0]) ? m + p[1] : m;
            }, 0);
          return [state, count];
        });
    return _.object(states);
  });

  self.nationalNonFactionSeats = function() {
    // calculate the total number of seats which are allocated directly to a
    // person which is part of no party or a party not meeting the barring 
    // clause.
    return _.reduce(_.values(self.nonFactionSeatsByState()),
      Bundestagswahl.reduce_sum, 0);
  };

  self.availableSeatsByState = _.memoize(function() {
    // calculate how many seats per state will go into saint lague distribution.
    var seats = _.map(self.nonFactionSeatsByState(), function(blocked, state) {
      return [state, Bundestagswahl.STATE_SEATS[state] - blocked];
    });
    return _.object(seats);
  });

  self.minimalSeatsByParty = _.memoize(function() {
    // in order to calculate the minimal number of seats which each faction is
    // to receive, all available seats per state are divvied up according to 
    // saint lague, then excess mandates are added and the resulting numbers are
    // added up on a nation level.
    var directMandates = self.directMandatesByStateAndParty(),
        stateSeats = self.availableSeatsByState(),
        fs = self.factions(),
        minimalSeats = {};

    var initalDistribution = _.map(self.secondaryResultsByState(), function(parties, state) {
      // count only parties meeting the barring condition:
      parties = _.object(_.filter(_.pairs(parties), function(p) { return _.contains(fs, p[0]); }));
      var seats = Bundestagswahl.saint_lague_iterative(parties, stateSeats[state], {});
      _.each(seats, function(s, p) {
        var mandates = directMandates[state][p]||0;
        // create excess mandates
        seats[p] = Math.max(s, mandates);
      });
      return seats;
    });

    // sum up party seats on a national level.
    _.each(initalDistribution, function(parties) {
      _.each(parties, function(seats, party) {
        minimalSeats[party] = minimalSeats[party] ? minimalSeats[party] + seats : seats;
      });
    });
    return minimalSeats;
  });

  self.make_divisor = function (votes, minimalSeats) {
    // based on http://www.wahlrecht.de/bundestag/index.htm ("Bundesdivisor").
    var divisors = _.map(votes, function(count, party) {
      return count / (minimalSeats[party]-0.5);
    });
    return _.min(divisors);
  };

  self.upperDistribution2013 = _.memoize(function() {
    // determine the number of seats available to each party on a national level, 
    // prior to their distribution to the states.

    // WARNING: does not include direct mandates gained by candidates without a 
    // faction.
    console.log("Errechne Oberverteilung (2013 BWahlG)...");

    var seatsAvailable = self.regularSeatsCount() - self.nationalNonFactionSeats(),
        minimalSeats = self.minimalSeatsByParty(),
        fs = self.factions(),
        results = self.totalNationalSecondaryVotesByParty();

    // filter out non-faction secondary votes.
    results = _.object(_.filter(_.pairs(results), function(p) { return _.contains(fs, p[0]); }));

    // generate an appropriate divisor (i.e. voter per seat)
    var divisor = self.make_divisor(results, minimalSeats);
    var distribution = {};
    _.each(results, function(votes, party) {
      // TODO: handle 0.5 case.
      distribution[party] = Math.round(votes / divisor);
    });
    return distribution;
  });

  self.upperDistribution2009 = _.memoize(function() {
    var distribution = {};
    //console.log(self.lowerDistribution());
    _.each(self.lowerDistribution(), function(states, party) {
      //console.log(states);
      distribution[party] = _.reduce(states, function(m, n) { return n + m; }, 0);
    });
    //console.log(distribution);
    return distribution;
  });

  self.upperDistribution = function() {
    var regimes = {
      '2009': self.upperDistribution2009,
      '2013': self.upperDistribution2013
    };
    return regimes[self.regime]();
  };

  self.directDistribution = _.memoize(function() {
    // Directly distribute seats on a federal level based on secondary vote results.
    // This method is only used in the 2009 law. 
    console.log("Errechne Oberverteilung (2009 BWahlG)...");

    var seatsAvailable = self.regularSeatsCount() - self.nationalNonFactionSeats(),
        fs = self.factions(),
        results = self.totalNationalSecondaryVotesByParty();

    // filter out non-faction secondary votes.
    results = _.object(_.filter(_.pairs(results), function(p) { return _.contains(fs, p[0]); }));

    return Bundestagswahl.saint_lague_iterative(results, seatsAvailable, {});
  });

  self.lowerDistribution2013 = _.memoize(function() {
    // distribute the seats allocated to the parties in upperDistribution to
    // state lists and direct mandates.
    console.log("Errechne Unterverteilung (2013 BWahlG)...");

    var results = self.secondaryResultsByState(),
        partySeats = self.upperDistribution(),
        distribution = {},
        directMandates = self.directMandatesByStateAndParty();
    
    _.each(partySeats, function(seats, party) {
      var stateVotes = {};
      _.each(results, function(votes, state) { stateVotes[state] = votes[party]; });
      var mandates = {};
      _.each(directMandates, function(ms, state) { mandates[state] = ms[party]; });
      distribution[party] = Bundestagswahl.saint_lague_iterative(stateVotes, seats, mandates);
    });

    return distribution;
  });

  self.lowerDistribution2009 = _.memoize(function() {
    // distribute the seats allocated to the parties in upperDistribution to
    // state lists and direct mandates.
    console.log("Errechne Unterverteilung (2009 BWahlG)...");
    // cf. http://www.wahlrecht.de/bundestag/wahlsystem-2009.html

    var results = self.secondaryResultsByState(),
        partySeats = self.directDistribution(),
        distribution = {},
        directMandates = self.directMandatesByStateAndParty();
    
    _.each(partySeats, function(seats, party) {
      var stateVotes = {};
      _.each(results, function(votes, state) { stateVotes[state] = votes[party]; });
      var mandates = {};
      _.each(directMandates, function(ms, state) { mandates[state] = ms[party]; });
      var minimalDistribution = Bundestagswahl.saint_lague_iterative(stateVotes, seats, {});
      distribution[party] = {};
      _.each(minimalDistribution, function(seats, state) {
        distribution[party][state] = Math.max(seats, mandates[state] || 0);
      });
    });
    return distribution;
  });

  self.lowerDistribution = function() {
    var regimes = {
      '2009': self.lowerDistribution2009,
      '2013': self.lowerDistribution2013
    };
    return regimes[self.regime]();
  };

  self.tabulate = function() {
    // generate an object to interpret the vote results.
    
    // TODO: include more stats on participation, primary votes.
    var parties = {},
        states = {},
        upper = self.upperDistribution(),
        lower = self.lowerDistribution(),
        fs = self.factions(),
        total_seats = 0,
        directMandatesByParty = self.directMandatesByParty(),
        directMandatesByStateAndParty = self.directMandatesByStateAndParty(),
        nationalSecondaryVotes = self.totalNationalSecondaryVotesByParty(),
        stateSecondaryVotes = self.secondaryResultsByState();

    _.each(self.parties(), function(party) {
      var is_faction = _.contains(fs, party),
          seats = is_faction ? upper[party] : (directMandatesByParty[party] || 0);
      total_seats += seats;
      parties[party] = {
        is_faction: is_faction,
        total_seats: seats,
        direct_mandates: directMandatesByParty[party] || 0,
        secondary_votes: nationalSecondaryVotes[party]
      };
    });

    _.each(self.states(), function(state) {
      var parties = {};
      _.each(self.parties(), function(party) {
        var dm = directMandatesByStateAndParty[state.id][party] || 0,
            seats = lower[party] ? lower[party][state.id] || dm : dm;
        parties[party] = {
          total_seats: seats,
          direct_mandates: dm,
          secondary_votes: stateSecondaryVotes[state.id][party] || 0
        };
      });
      states[state.id] = {
        label: state.label,
        parties: parties
      };
    });

    return {
      summary: {
        total_seats: total_seats,
        election: self.results.election_name,
        result: self.results.result_type,
        valid_votes: self.totalValidNationalSecondaryVotes(),
        regular_seats: self.regularSeatsCount()
      },
      parties: parties,
      states: states
    };
  };

};
