//     Underscore.js 1.5.1
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
!function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,v=e.reduce,h=e.reduceRight,d=e.filter,g=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,w=i.bind,j=function(n){return n instanceof j?n:this instanceof j?(this._wrapped=n,void 0):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.5.1";var A=j.each=j.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(j.has(n,a)&&t.call(e,n[a],a,n)===r)return};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var E="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduce===v)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(E);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduceRight===h)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(E);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:d&&n.filter===d?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:g&&n.every===g?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var O=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:O(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,function(n){return n[t]})},j.where=function(n,t,r){return j.isEmpty(t)?r?void 0:[]:j[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},j.findWhere=function(n,t){return j.where(n,t,!0)},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);if(!t&&j.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>e.computed&&(e={value:n,computed:a})}),e.value},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);if(!t&&j.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a<e.computed&&(e={value:n,computed:a})}),e.value},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e};var F=function(n){return j.isFunction(n)?n:function(t){return t[n]}};j.sortBy=function(n,t,r){var e=F(t);return j.pluck(j.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index<t.index?-1:1}),"value")};var k=function(n,t,r,e){var u={},i=F(null==t?j.identity:t);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};j.groupBy=function(n,t,r){return k(n,t,r,function(n,t,r){(j.has(n,t)?n[t]:n[t]=[]).push(r)})},j.countBy=function(n,t,r){return k(n,t,r,function(n,t){j.has(n,t)||(n[t]=0),n[t]++})},j.sortedIndex=function(n,t,r,e){r=null==r?j.identity:F(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var R=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return R(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.indexOf(t,n)>=0})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var M=function(){};j.bind=function(n,t){var r,e;if(w&&n.bind===w)return w.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));M.prototype=n.prototype;var u=new M;M.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:new Date,a=null,i=n.apply(e,u)};return function(){var l=new Date;o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u=null;return function(){var i=this,a=arguments,o=function(){u=null,r||(e=n.apply(i,a))},c=r&&!u;return clearTimeout(u),u=setTimeout(o,t),c&&(e=n.apply(i,a)),e}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){var t=[];for(var r in n)j.has(n,r)&&t.push(n[r]);return t},j.pairs=function(n){var t=[];for(var r in n)j.has(n,r)&&t.push([r,n[r]]);return t},j.invert=function(n){var t={};for(var r in n)j.has(n,r)&&(t[n[r]]=r);return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};I.unescape=j.invert(I.escape);var T={escape:new RegExp("["+j.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(I.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(T[n],function(t){return I[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}.call(this);
//# sourceMappingURL=underscore-min.map-en 


// Bundestagswahl Tabulator, MIT Licensed. (C) Friedrich Lindenberg
var Bundestagswahl = Bundestagswahl || {};

// Source: http://bundeswahlleiter.de/de/aktuelle_mitteilungen/downloads/20130902_Sitzkontingente.pdf
Bundestagswahl.STATE_SEATS = {
    1: 22,  // SH
    2: 13,  // HH
    3: 59,  // NI
    4: 5,   // BR
    5: 128, // NW
    6: 43,  // HE
    7: 30,  // RP
    8: 76,  // BW
    9: 92,  // BY
    10: 7,  // SL
    11: 24, // BE
    12: 19, // BB
    13: 13, // MV
    14: 32, // SN
    15: 15, // ST
    16: 17  // TH
};var Bundestagswahl = Bundestagswahl || {};

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
var Bundestagswahl = Bundestagswahl || {};

Bundestagswahl.Tabulator = function(results, result_type, regime) {
  var self = this;

  // the raw result objects from the interim tallies.
  self.results = results;
  self.regime = regime;

  self._filter_admin = function(level) {
    // find the distinct set of administrative regions
    var fres = _.filter(self.results, function(r) { return r.admin_level === level; }),
        regs = _.map(fres, function(r) {
          return {
            'id': r.admin_id,
            'label': r.admin_label,
            'parent_id': r.parent_id
          };
        });
    return _.uniq(regs, function(r) { return r.id; });
  };

  // get a list of all electoral districts
  self.districts = _.memoize(_.partial(self._filter_admin, 'district'));

  // get a list of all federal states
  self.states = _.memoize(_.partial(self._filter_admin, 'state'));

  self.regularSeatsCount = _.memoize(function() {
    // calculate the number of regular (i.e. non excess mandate) seats.
    return self.districts().length * 2;
  });

  self._admin_results = function(level, id) {
    // get all raw results for one particular administrative zone (state, district).
    return _.filter(self.results, function(r) {
      return r.admin_level === level && r.admin_id === id;
    });
  };

  self.parties = function() {
    // a list of all parties.
    return _.uniq(_.pluck(_.filter(results, function(r) { return r.is_party; }), 'group'));
  };

  self.directMandates = _.memoize(function() {
    // determine the party of the candidate that has won a direct mandate for
    // each district.
    var pairs = _.map(self.districts(), function(district) {
      // get all the relevant results for party candidates. 
      var results = _.filter(self._admin_results('district', district.id), function(r) {
        return r.is_party && r.vote_type == 'Erststimmen' && r.type == result_type;
      });
      var winner,
          bestResult = _.max(results, function(r) { return r.votes; });
      
      // if there is a primary vote candidate with the most votes:
      if (bestResult && bestResult.votes > 0) {
        winner = bestResult.group;
      }

      // TODO: maybe only call it if a certain percentage of voters have 
      // cast their ballot?
      return [district.id, winner];
    });
    return _.object(pairs);
  });

  self.directMandatesByParty = _.memoize(function() {
    // group direct mandates by party.
    return _.countBy(_.pairs(self.directMandates()), function(pair) {
      return pair[1];
    });
  });

  self.directMandatesByStateAndParty = _.memoize(function() {
    // group direct mandates by state, then grouped by party.
    var mandates = self.directMandates(),
        states = _.groupBy(self.districts(), function(d) { return d.parent_id; });
        seats = _.map(states, function(districts, state) {
          return [state, _.countBy(districts, function(d) { return mandates[d.id]; })];
        });
    return _.object(seats);
  });

  self.totalValidNationalSecondaryVotes = _.memoize(function() {
    // total number of valid secondary votes cast on the federal level
    var result = _.find(self._admin_results('federal', 99), function(r) {
        return r.vote_type == 'Zweitstimmen' && r.type == result_type && r.group == 'Gültige';
    });
    return result ? result.votes : 0;
  });

  self.totalNationalSecondaryVotesByParty = _.memoize(function() {
    // total number of secondary votes cast on the federal level for each party
    var results = _.filter(self._admin_results('federal', 99), function(r) {
        return r.vote_type == 'Zweitstimmen' && r.type == result_type && r.is_party;
    });
    return _.object(_.map(results, function(r) {
      return [r.group, r.votes];
    }));
  });

  self.secondaryResultsByState = _.memoize(function() {
    // per-party secondary votes, grouped by state.
    var counts = {};
    _.each(self.states(), function(state) {
      var results = _.filter(self._admin_results('state', state.id), function(r) {
        return r.vote_type == 'Zweitstimmen' && r.type == result_type && r.is_party;
      });
      counts[state.id] = _.object(_.map(results, function(r) {
        return [r.group, r.votes];
      }));
    });
    return counts;
  });

  self.factions = _.memoize(function() {
    // determine which parties have met the barring clause requirement.
    var parties = [];

    // check if any of the parties have three or more direct mandates
    _.each(self.directMandatesByParty(), function(count, party) {
      if (count >= 3) parties.push(party);
    });

    // check if any of the parties have 5% or more of the nation vote
    var total = self.totalValidNationalSecondaryVotes();
    _.each(self.totalNationalSecondaryVotesByParty(), function(votes, party) {
      if ((votes / total) >= 0.05) parties.push(party);
    });

    return _.uniq(parties);
  });

  self.nonFactionSeatsByState = _.memoize(function() {
    // calculate the number of seats per state which are allocated
    // directly to a party (or candidate) which doesn't meet the
    // barring clause.
    var fs = self.factions(),
        states = _.map(self.directMandatesByStateAndParty(), function(parties, state) {
          var count = _.reduce(_.pairs(parties), function(m, p) {
            return !_.contains(fs, p[0]) ? m + p[1] : m;
            }, 0);
          return [state, count];
        });
    return _.object(states);
  });

  self.nationalNonFactionSeats = function() {
    // calculate the total number of seats which are allocated directly to a
    // person which is part of no party or a party not meeting the barring 
    // clause.
    return _.reduce(_.values(self.nonFactionSeatsByState()),
      Bundestagswahl.reduce_sum, 0);
  };

  self.availableSeatsByState = _.memoize(function() {
    // calculate how many seats per state will go into saint lague distribution.
    var seats = _.map(self.nonFactionSeatsByState(), function(blocked, state) {
      return [state, Bundestagswahl.STATE_SEATS[state] - blocked];
    });
    return _.object(seats);
  });

  self.minimalSeatsByParty = _.memoize(function() {
    // in order to calculate the minimal number of seats which each faction is
    // to receive, all available seats per state are divvied up according to 
    // saint lague, then excess mandates are added and the resulting numbers are
    // added up on a nation level.
    var directMandates = self.directMandatesByStateAndParty(),
        stateSeats = self.availableSeatsByState(),
        fs = self.factions(),
        minimalSeats = {};

    var initalDistribution = _.map(self.secondaryResultsByState(), function(parties, state) {
      // count only parties meeting the barring condition:
      parties = _.object(_.filter(_.pairs(parties), function(p) { return _.contains(fs, p[0]); }));
      var seats = Bundestagswahl.saint_lague_iterative(parties, stateSeats[state], {});
      _.each(seats, function(s, p) {
        var mandates = directMandates[state][p]||0;
        // create excess mandates
        seats[p] = Math.max(s, mandates);
      });
      return seats;
    });

    // sum up party seats on a national level.
    _.each(initalDistribution, function(parties) {
      _.each(parties, function(seats, party) {
        minimalSeats[party] = minimalSeats[party] ? minimalSeats[party] + seats : seats;
      });
    });
    return minimalSeats;
  });

  self.make_divisor = function (votes, minimalSeats) {
    // based on http://www.wahlrecht.de/bundestag/index.htm ("Bundesdivisor").
    var divisors = _.map(votes, function(count, party) {
      return count / (minimalSeats[party]-0.5);
    });
    return _.min(divisors);
  };

  self.upperDistribution2013 = _.memoize(function() {
    // determine the number of seats available to each party on a national level, 
    // prior to their distribution to the states.

    // WARNING: does not include direct mandates gained by candidates without a 
    // faction.

    var seatsAvailable = self.regularSeatsCount() - self.nationalNonFactionSeats(),
        minimalSeats = self.minimalSeatsByParty(),
        fs = self.factions(),
        results = self.totalNationalSecondaryVotesByParty();

    // filter out non-faction secondary votes.
    results = _.object(_.filter(_.pairs(results), function(p) { return _.contains(fs, p[0]); }));

    // generate an appropriate divisor (i.e. voter per seat)
    var divisor = self.make_divisor(results, minimalSeats);
    var distribution = {};
    _.each(results, function(votes, party) {
      // TODO: handle 0.5 case.
      distribution[party] = Math.round(votes / divisor);
    });
    return distribution;
  });

  self.upperDistribution2009 = _.memoize(function() {
    var distribution = {};
    _.each(self.lowerDistribution(), function(states, party) {
      distribution[party] = _.reduce(states, function(m, n) { return n + m; }, 0);
    });
    return distribution;
  });

  self.upperDistribution = function() {
    var regimes = {
      '2009': self.upperDistribution2009,
      '2013': self.upperDistribution2013
    };
    return regimes[self.regime]();
  };

  self.directDistribution = _.memoize(function() {
    // Directly distribute seats on a federal level based on secondary vote results.
    // This method is only used in the 2009 law. 

    var seatsAvailable = self.regularSeatsCount() - self.nationalNonFactionSeats(),
        fs = self.factions(),
        results = self.totalNationalSecondaryVotesByParty();

    // filter out non-faction secondary votes.
    results = _.object(_.filter(_.pairs(results), function(p) { return _.contains(fs, p[0]); }));

    return Bundestagswahl.saint_lague_iterative(results, seatsAvailable, {});
  });

  self.lowerDistribution2013 = _.memoize(function() {
    // distribute the seats allocated to the parties in upperDistribution to
    // state lists and direct mandates.

    var results = self.secondaryResultsByState(),
        partySeats = self.upperDistribution(),
        distribution = {},
        directMandates = self.directMandatesByStateAndParty();
    
    _.each(partySeats, function(seats, party) {
      var stateVotes = {};
      _.each(results, function(votes, state) { stateVotes[state] = votes[party]; });
      var mandates = {};
      _.each(directMandates, function(ms, state) { mandates[state] = ms[party]; });
      distribution[party] = Bundestagswahl.saint_lague_iterative(stateVotes, seats, mandates);
    });

    return distribution;
  });

  self.lowerDistribution2009 = _.memoize(function() {
    // distribute the seats allocated to the parties in upperDistribution to
    // state lists and direct mandates.
    // cf. http://www.wahlrecht.de/bundestag/wahlsystem-2009.html

    var results = self.secondaryResultsByState(),
        partySeats = self.directDistribution(),
        distribution = {},
        directMandates = self.directMandatesByStateAndParty();
    
    _.each(partySeats, function(seats, party) {
      var stateVotes = {};
      _.each(results, function(votes, state) { stateVotes[state] = votes[party]; });
      var mandates = {};
      _.each(directMandates, function(ms, state) { mandates[state] = ms[party]; });
      var minimalDistribution = Bundestagswahl.saint_lague_iterative(stateVotes, seats, {});
      distribution[party] = {};
      _.each(minimalDistribution, function(seats, state) {
        distribution[party][state] = Math.max(seats, mandates[state] || 0);
      });
    });
    return distribution;
  });

  self.lowerDistribution = function() {
    var regimes = {
      '2009': self.lowerDistribution2009,
      '2013': self.lowerDistribution2013
    };
    return regimes[self.regime]();
  };

  self.tabulate = function() {
    // generate an object to interpret the vote results.
    
    // TODO: include more stats on participation, primary votes.
    var parties = {},
        states = {},
        upper = self.upperDistribution(),
        lower = self.lowerDistribution(),
        fs = self.factions(),
        total_seats = 0,
        directMandatesByParty = self.directMandatesByParty(),
        directMandatesByStateAndParty = self.directMandatesByStateAndParty(),
        nationalSecondaryVotes = self.totalNationalSecondaryVotesByParty(),
        stateSecondaryVotes = self.secondaryResultsByState();

    _.each(self.parties(), function(party) {
      var is_faction = _.contains(fs, party),
          seats = is_faction ? upper[party] : (directMandatesByParty[party] || 0);
      total_seats += seats;
      parties[party] = {
        is_faction: is_faction,
        total_seats: seats,
        direct_mandates: directMandatesByParty[party] || 0,
        secondary_votes: nationalSecondaryVotes[party]
      };
    });

    _.each(self.states(), function(state) {
      var parties = {};
      _.each(self.parties(), function(party) {
        var dm = directMandatesByStateAndParty[state.id][party] || 0,
            seats = lower[party] ? lower[party][state.id] || dm : dm;
        parties[party] = {
          total_seats: seats,
          direct_mandates: dm,
          secondary_votes: stateSecondaryVotes[state.id][party] || 0
        };
      });
      states[state.id] = {
        label: state.label,
        parties: parties
      };
    });

    return {
      summary: {
        total_seats: total_seats,
        election: self.results.election_name,
        result: self.results.result_type,
        valid_votes: self.totalValidNationalSecondaryVotes(),
        regular_seats: self.regularSeatsCount()
      },
      parties: parties,
      states: states
    };
  };

};

self.onmessage = function(event) {
    var tabulator = new Bundestagswahl.Tabulator(event.data, event.data.result_type, event.data.regime),
        previous_tabulator = new Bundestagswahl.Tabulator(event.data, 'Vorperiode', event.data.regime);
    postMessage({
        tab: tabulator.tabulate(),
        previous_tab: previous_tabulator.tabulate()
    });
};