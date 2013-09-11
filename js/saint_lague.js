var Bundestagswahl = Bundestagswahl || {};

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
