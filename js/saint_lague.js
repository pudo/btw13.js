// based on: http://de.wikipedia.org/wiki/Sainte-Lagu%C3%AB-Verfahren

var saint_lague = function(seats, votes) {
  // saint lague seat allocation algorithm
  var divisor = 0.5,
      values = [],
      allocation = {},
      limit = null;

  // generate divisor-based number series for each party
  _.times(seats, function() {
    _.each(votes, function(num, party) {
      var score = (num / divisor);
      limit = Math.max(score, limit);
      values.push([party, score]);
    });
    divisor += 1;
  });
  limit += 1;

  // allocate seats by highest available number
  _.times(seats, function() {
    values = _.filter(values, function(v) {
      return v[1] < limit;
    });
    var highest = _.max(values, function(v) { return v[1]; }),
        party = highest[0];
    allocation[party] = allocation[party] ? allocation[party] + 1 : 1;
    limit = highest[1];
  });
  return allocation;
};

//console.log(saint_lague(15, {'X': 5200, 'Y': 1700, 'Z': 3100}));
