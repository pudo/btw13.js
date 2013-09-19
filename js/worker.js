
self.onmessage = function(event) {
    var tabulator = new Bundestagswahl.Tabulator(event.data, event.data.result_type, event.data.regime),
        previous_tabulator = new Bundestagswahl.Tabulator(event.data, 'Vorperiode', '2009');
    postMessage({
        tab: tabulator.tabulate(),
        previous_tab: previous_tabulator.tabulate()
    });
};