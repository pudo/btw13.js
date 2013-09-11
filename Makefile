
all:
	echo "// Bundestagswahl Tabulator, MIT Licensed. (C) Friedrich Lindenberg" >tmp.js
	cat js/state_seats.js >>tmp.js
	cat js/saint_lague.js >>tmp.js
	cat js/parser.js >>tmp.js
	cat js/tabulator.js >>tmp.js
	uglifyjs tmp.js >btw13.min.js
	rm tmp.js
