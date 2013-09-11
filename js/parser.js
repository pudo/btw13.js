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
