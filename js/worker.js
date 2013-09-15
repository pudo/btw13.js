
self.onmessage = function(event) {
    var tabulator = new Bundestagswahl.Tabulator(event.data, event.data.result_type),
        previous_tabulator = new Bundestagswahl.Tabulator(event.data, 'Vorperiode');
    postMessage({
        tab: tabulator.tabulate(),
        previous_tab: previous_tabulator.tabulate()
    });
};