btw13.js
========

JavaScript implementation of the German electoral system. As for now, its unclear
why this is needed, but its a quick way of tallying up the official prognoses 
published by the elections authority, and a painfully slow way to learn about 
the German election system.

This includes: 

* Parsing of `kerg.csv`, the interim results file of the elections authority.
* Tallying of votes and allocation of seats for the Bundestag (`Oberverteilung`).
* Distribution of party seats amongst state parties (`Unterverteilung`).
* Emitting a descriptive JavaScript object to describe the election results.

The algorithms used in this library are based off the descriptions on
[Wahlrecht.de](http://wahlrecht.de), as well as the [22. Law to Change the Federal
Election Law](http://dip21.bundestag.de/dip21/btd/17/118/1711819.pdf).

Licensed under MIT, contact: friedrich@pudo.org.
