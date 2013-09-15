
all: clean btw13.js worker.js bigboard

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

bigboard:
	curl -o - http://code.jquery.com/jquery-1.10.1.min.js >bigboard.js
	curl -o - http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0/js/bootstrap.min.js >>bigboard.js
	curl -o - http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min.js >>bigboard.js
	curl -o - http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min.js >>bigboard.js
	cat btw13.js >>bigboard.js
	cat js/bigboard.js >>bigboard.js
