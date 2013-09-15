
clean:
	rm btw13.js worker.js

btw13.js:
	echo "// Bundestagswahl Tabulator, MIT Licensed. (C) Friedrich Lindenberg" >btw13.js
	cat js/state_seats.js >>btw13.js
	cat js/saint_lague.js >>btw13.js
	cat js/parser.js >>btw13.js
	cat js/tabulator.js >>btw13.js

worker.js:
	curl -o - http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min.js >worker.js
	echo -en "\n\n" >>worker.js
	grep -v console btw13.js >>worker.js
	cat js/worker.js >>worker.js
