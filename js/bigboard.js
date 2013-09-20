$(function() {
  var STATES = {
      1: {seats: 22, code: 'SH'},
      2: {seats: 13, code: 'HH'},
      3: {seats: 59, code: 'NI'},
      4: {seats: 5, code: 'BR'},
      5: {seats: 128, code: 'NW'},
      6: {seats: 43, code: 'HE'},
      7: {seats: 30, code: 'RP'},
      8: {seats: 76, code: 'BW'},
      9: {seats: 92, code: 'BY'},
      10: {seats: 7, code: 'SL'},
      11: {seats: 24, code: 'BE'},
      12: {seats: 19, code: 'BB'},
      13: {seats: 13, code: 'MV'},
      14: {seats: 32, code: 'SN'},
      15: {seats: 15, code: 'ST'},
      16: {seats: 17, code: 'TH'}
  };

  var RELEVANT_PARTIES = ['CDU/CSU', 'SPD', 'FDP', 'DIE LINKE', 'GRÜNE', 'PIRATEN', 'AfD'];


  var template = Handlebars.compile($('#bigboard-template').html()),
      currentRegime = '2013',
      $spinner = $('#loading-spinner'),
      worker;

  function numericTrend(n) {
    if (n===0) return 'neutral';
    if (n>0) return 'increase';
    return 'decrease';
  }

  function trendText(n) {
    if (parseFloat(n)===0) return '';
    if (parseFloat(n)>0) return '+' + n;
    return '' + n;
  }

  function partySlug(name) {
    name = name.toLowerCase().replace(/ü/g, 'u').replace(/ä/g, 'a');
    return name.replace(/ö/g, 'o').replace(/[^a-zA-Z0-9]/g, '');
  }

  function summarizeCduCsu(tab) {
    var cdu = tab.parties.CDU,
        csu = tab.parties.CSU,
        cdu_csu = {
          secondary_votes: cdu.secondary_votes + csu.secondary_votes,
          total_seats: cdu.total_seats + csu.total_seats,
          direct_mandates: cdu.direct_mandates + csu.direct_mandates,
        };
    delete tab.parties.CDU;
    delete tab.parties.CSU;
    tab.parties['CDU/CSU'] = cdu_csu;
  }

  function handleData(data) {
    var results = Bundestagswahl.parseResults(data);
    results.regime = currentRegime;
    if (window.Worker) {
      if (!worker) {
        worker = new Worker('worker.js');
        worker.onmessage = function(event) {
          render(event.data.tab, event.data.previous_tab);
        };
      }
      worker.postMessage(results);
    } else {
      var tabulator = new Bundestagswahl.Tabulator(results, results.result_type, results.regime),
          previous_tabulator = new Bundestagswahl.Tabulator(results, 'Vorperiode', '2009');
      render(
        tabulator.tabulate(),
        previous_tabulator.tabulate());
    }
  }

  
  function render(tab, previous_tab) {
    summarizeCduCsu(tab);
    summarizeCduCsu(previous_tab);
    
    tab.summary.total_seats_diff = tab.summary.total_seats - previous_tab.summary.total_seats;
    tab.summary.total_seats_trend = numericTrend(tab.summary.total_seats_diff);
    tab.summary.total_seats_diff_text = trendText(tab.summary.total_seats_diff);

    // Format party results.
    tab.parties = _.map(tab.parties, function(v, k) {
      var pv = previous_tab.parties[k];
      v.name = k;
      v.slug = partySlug(k);

      v.percentage_num = (v.secondary_votes / tab.summary.valid_votes*100);
      v.prev_percentage = (pv.secondary_votes / previous_tab.summary.valid_votes*100);
      v.percentage = v.percentage_num.toFixed(1);

      v.percentage_diff = v.percentage_num - v.prev_percentage;
      v.percentage_trend = numericTrend(v.percentage_diff);
      v.percentage_diff_text = trendText(v.percentage_diff.toFixed(1));

      v.total_seats_diff = v.total_seats - pv.total_seats;
      v.total_seats_trend = numericTrend(v.total_seats_diff);
      v.total_seats_diff_text = trendText(v.total_seats_diff);

      v.direct_mandates_diff = v.direct_mandates - pv.direct_mandates;
      v.direct_mandates_trend = numericTrend(v.direct_mandates_diff);
      v.direct_mandates_diff_text = trendText(v.direct_mandates_diff);

      //console.log(v);
      v.classes = [];
      if (v.total_seats > 0) v.classes.push('elected');
      if (v.is_fraktion > 0) v.classes.push('faction');
      v.classes = v.classes.join(' ');
      return v;
    });
    tab.parties = _.filter(tab.parties, function(e) {
      return e.percentage_num > 0.4;
    });
    tab.parties = _.sortBy(tab.parties, function(e) {
      return e.percentage_num * -1;
    });

    tab.states = _.map(tab.states, function(v, k, i) {
      summarizeCduCsu(v);
      //summarizeCduCsu(previous_tab);
      v.id = k;
      v.label = v.label.replace(/"/g, '');
      v.code = STATES[k].code;
      v.seats = STATES[k].seats;
      //console.log(v);

      v.relevant_parties = _.map(RELEVANT_PARTIES, function(party) {
        var data = v.parties[party];
        data.slug = partySlug(party);
        data.name = party;

        data.percentage_num = (data.secondary_votes / v.secondary_votes) * 100;
        data.percentage = Math.round(data.percentage_num);
        return data;
      });
      return v;

    });
    tab.states = _.sortBy(tab.states, function(e) {
      return e.code;
    });
    console.log(tab);
    $('#airlock').html(template(tab));

    var $toggleRegime = $('.toggle-regime');

    $toggleRegime.removeClass('active');
    $('.toggle-regime[data-regime="' + currentRegime + '"]').addClass('active');

    $toggleRegime.click(function(e) {
      currentRegime = $(e.target).data('regime');
      $('.regime-change').html('Wird berechnet...');
      $spinner.slideDown(100, function() {
        reload();
      });
      return false;
    });

    $spinner.slideUp();
  }

  function reload() {
    $.ajax({
      url: 'data/kerg.csv',
      dataType: 'text',
      cache: false,
      success: handleData,
      mimeType: 'text/plain; charset=iso-8859-1'
    });
  }

  function init() {
    setInterval(function() {
      $spinner.slideDown(100, function() {
        reload();
        //_gaq.push(['_trackEvent', 'Reload', 'ReloadData', null]);
      });
    }, 3*60*1000);
    reload();
  }

  init();
  
});