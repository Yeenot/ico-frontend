import Vue from 'vue'

var numeral = require('numeral')
var moment = require('moment')

const empty = "N/A";
const empties = [
  "-",
  ""
];

const helpers = {

  isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  },

  removeDuplicates(list) {
    return list.filter((el, i, a) => i === a.indexOf(el));
  },

  getProp(obj, key = "value") {
    let data = null;
    if (obj != null) {
      let temp = key;
      if (key == "new_value") {
        if (!obj.hasOwnProperty(key)) {
          temp = "value";
        }
      }
      const val = obj[temp];
      if (!this.isDetailEmpty(val)) {
        if (obj.type == "number" && (key == "value" || key == "new_value") && val != "?") {
          data = parseFloat(val);
        } else {
          data = val;
        }
      }
    }
    return data;
  },

  nullToZero(obj) {
    let value = -1
    if (obj != null) {
      value = obj
    }
    return value
  },

  isDetailEmpty(val) {
    let isEmpty = false;
    if (val == null || empties.includes(val)) {
      isEmpty = true;
    }
    return isEmpty;
  },

  isTba(val) {
    let tba = false;
    if (val == "?") {
      tba = true;
    }
    return tba;
  },

  getEmpty() {
    return empty;
  },

  getComputedTranslateXY(obj){
    const transArr = [];
      if(!window.getComputedStyle) return;
      const style = getComputedStyle(obj),
          transform = style.transform || style.webkitTransform || style.mozTransform;
      let mat = transform.match(/^matrix3d\((.+)\)$/);    
      if(mat) return parseFloat(mat[1].split(', ')[13]);
      mat = transform.match(/^matrix\((.+)\)$/);
      mat ? transArr.push(parseFloat(mat[1].split(', ')[4])) : 0;
      mat ? transArr.push(parseFloat(mat[1].split(', ')[5])) : 0;
      return transArr;
  },

  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  },

  xmlToJson(xml) {
  
    // Create the return object
    var obj = {};
  
    // console.log(xml.nodeType, xml.nodeName );
    
    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } 
    else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }
    else if (xml.nodeType == 4) { // cdata section
      obj = xml.nodeValue
    }
  
    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].length) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          if (typeof(obj[nodeName]) === 'object') {
            obj[nodeName].push(this.xmlToJson(item));
          }
        }
      }
    }
    return obj;
  },

  stripHTML(str) {
    var regex = /(<([^>]+)>)/ig
    return str.replace(regex, ' ')
  },

  trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },

  findPos(element) {
    var bodyRect = document.body.getBoundingClientRect(),
    elemRect = element.getBoundingClientRect(),
    top   = elemRect.top - bodyRect.top;
    return top
  },

  disableScroll() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only

  },

  enableScroll() {
    document.documentElement.style.overflow = 'auto';  // firefox, chrome
    document.body.scroll = "yes"; // ie only
  },

  formatContent(str) {
    return str.replace(
          /((http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?)/g,
          '<a href="$1" target="_blank">$1</a>'
          );
  },

  timeAgo(time) {

    var templates = {
      prefix: "",
      suffix: " ago",
      seconds: "less than a minute",
      minute: "about a minute",
      minutes: "%d minutes",
      hour: "about an hour",
      hours: "about %d hours",
      day: "a day",
      days: "%d days",
      month: "about a month",
      months: "%d months",
      year: "about a year",
      years: "%d years"
    };
    var template = function (t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    var timer = function (time) {
        if (!time) return;
        time = time.replace(/\.\d+/, ""); // remove milliseconds
        time = time.replace(/-/, "/").replace(/-/, "/");
        time = time.replace(/T/, " ").replace(/Z/, " UTC");
        time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
        time = new Date(time * 1000 || time);

        var now = new Date();
        var seconds = ((now.getTime() - time) * .001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

        return templates.prefix + (
        seconds < 45 && template('seconds', seconds) || seconds < 90 && template('minute', 1) || minutes < 45 && template('minutes', minutes) || minutes < 90 && template('hour', 1) || hours < 24 && template('hours', hours) || hours < 42 && template('day', 1) || days < 30 && template('days', days) || days < 45 && template('month', 1) || days < 365 && template('months', days / 30) || years < 1.5 && template('year', 1) || template('years', years)) + templates.suffix;
    };

    return timer(time);
  },
    
  getStyle(element) {
    return window.getComputedStyle(element)
  },

  getElement(query) {
    return document.querySelector(query)
  },

  lastChar(str) {
    return str.substr(str.length - 1);
  },

  clone(data) {
    const clone = []
    data.forEach(d => {
      clone.push(d)
    })
    return clone
  },

  capitalizeFirstLetter(string) {
    if (string && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return ''
    }
  },

  formatDate(date, format, timezone = false) {
    let formatted = null;
    if (timezone) {
      formatted = moment.parseZone(moment(date).format()).format(`${format} z`);
    } else {
      formatted = moment(date).format(format);
    }
    return formatted;
  },

  getDetailAttribute(field, attr) {
    let val = null
    const details = field.details
    if (details) {
      const attrib = details[attr]
      if (attrib) {
        val = attrib
      }
    }
    return val
  },

  getFieldAndAttribute(field, attr) {
    let value = ''
    if (field) {
      const details = field.details
      value = this.getAttribute(details, attr)
    }
    return value
  },

   getAttribute(details, attr) {
    let val = null
    if (details) {
      const attrib = details[attr]
      if (attrib) {
        val = attrib
      }
    }
    return val
  },

  regex(value, replace, pattern) {

    return value.replace(pattern, replace)
  },

  removeSpecialCharacters(value) {
    return value.toString().replace(/[^-\d\.]/g, '')
  },

  removeCharacter(value, character) {
    return value.replace(character, '')
  },

  scrollTo(pos) {
    window.scroll({
      top: pos, 
      behavior: 'smooth' 
    });
  },

  chunkArray(array, length) {
    var totalChunks = [];
    var chunkLength = parseInt(length, 10);

    if (chunkLength <= 0) {

      return array;
    }

    for (var i = 0; i < array.length; i += chunkLength) {
      totalChunks.push(array.slice(i, i + chunkLength));
    }

    return totalChunks;
  },

  getObjectByIndex(obj, index) {
    return obj[Object.keys(obj)[0]]
  },

  dateDiffInDays (a, b) {
    var _MS_PER_DAY = 1000 * 60 * 60 * 24;
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  },

  chunk ( obj, n ) {
    if ( !obj.length ) {
      return [];
    }
    return [ obj.slice( 0, n ) ].concat( this.chunk(obj.slice(n), 7) );
  },

  hasKey(obj, key) {
    return obj.hasOwnProperty(key)
  },

  toDate(value) {
    return new Date(value);
  },

  isNumber(value) {
    if (!value) {
      return false;
    }
    return isFinite(value.toString());
  },
  numberFormat(value) {
    if (value != null) {
      if (!isNaN(value)) {
        return numeral(value).format('0,0.[00]');
      }
    }
    return value;
  },

  naturalSorter(a, b) { 
    var x = a.split("/"); 
    var y = b.split("/"); 
    x = x[x.length-1].replace(/\\\s/g," ").split(/(\d )/); 
    y = y[y.length-1].replace(/\\\s/g," ").split(/(\d )/);
    for (var i in x) { 
      if (x[i] && !y[i] || isFinite(x[i]) && !isFinite(y[i])) { 
        return -1; 
      } else if (!x[i] && y[i] || !isFinite(y[i]) && isFinite(y[i])) { 
        return 1; 
      } else if (!isFinite(x[i]) && !isFinite(y[i])) { 
        x[i] = x[i].toLowerCase(); 
        y[i] = y[i].toLowerCase(); 
        if (x[i] < y[i]) return -1; 
        if (x[i] > y[i]) return 1; 
      } else { 
        x[i] = parseFloat(x[i]); 
        y[i] = parseFloat(y[i]); 
        if (x[i] < y[i]) return -1; 
        if (x[i] > y[i]) return 1; 
      } 
    } 
    return 0; 
  },

  formatNumber(number, isPercentage) {
    if (isNaN(number)) {
      return number
    } else {

      if (number > 1) {
        number = numeral(number).format('0,0.[00]')
      }

      return number + (isPercentage ? ' %' : '')
    }
  },
  toPercentage(value, format = false) {
    let percentageValue = '';
    if (typeof tvalue === 'string') {
      percentageValue = '0%';
    } else {
      percentageValue = (value * 100)
      if (format) {
        percentageValue = numeral(percentageValue).format('0,0.[00]')
      }
      percentageValue = percentageValue + '%';
    }

    return percentageValue;
  }
};

const plugin = (Vue) => {
  if (!Vue.prototype.hasOwnProperty('$util')) {
    Object.defineProperties(Vue.prototype, {
      $util: {
        get() {
          return helpers;
        }
      }
    });
  }
}

Vue.use(plugin)
