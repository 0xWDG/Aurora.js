/*

                         _    _____ 
                        | |  / ____|
                        | |  | (___  
                    _   | |  \___  \ 
     ______    _   | |__| |  ____) |
    |______|  (_)   \____/  |______/ 
                              v0.0.3

    https://www.github.com/wesdegroot/_.js/
    or https://www.wdgwv.com

    Git:     https://github.com/wesdegroot/_.js
    Todo:    https://github.com/wesdegroot/_.js/issues
    Licence: https://github.com/wesdegroot/_.js/blob/master/LICENCE.md (CC BY 4.0)
    Latest:  https://raw.githubusercontent.com/wesdegroot/_.js/master/latest/_.js
*/

if(!window._) 
{
	alert("MISSING SOMETHING!");
}
else
{
	// Add a a few plugins For some THANKS 2 phpjs.org!

  /**
   * base64_decode
   *
   * Decode base64 encoded data
   *
   * @param object object
   * @param data the base64 string
   * @example _().base64_decode('dGVzdA==');
   */
	_.fn.base64_decode = function(data) {
        // @see http://phpjs.org/functions/base64_decode/
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = '', tmp_arr = [];

        if (!data)
            return data;

        data += '';

        do { // unpack four hexets into three octets using index points in b64
            h1 = b64.indexOf(data.charAt(i++));
            h2 = b64.indexOf(data.charAt(i++));
            h3 = b64.indexOf(data.charAt(i++));
            h4 = b64.indexOf(data.charAt(i++));

            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

            o1 = bits >> 16 & 0xff;
            o2 = bits >> 8 & 0xff;
            o3 = bits & 0xff;

            if (h3 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1);
            } else if (h4 == 64) {
                tmp_arr[ac++] = String.fromCharCode(o1, o2);
            } else {
                tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
            }
        } while (i < data.length);

        dec = tmp_arr.join('');

        return dec.replace(/\0+$/, '');
    },

  /**
   * base64_encode
   *
   * Encode to base64
   *
   * @param object object
   * @param data the plain string
   * @example _().base64_encode('test');
   */
    _.fn.base64_encode = function(data) {
        // @see http://phpjs.org/functions/base64_encode/

        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = '', tmp_arr = [];

        if (!data)
            return data;

        do { // pack three octets into four hexets
          o1 = data.charCodeAt(i++);
          o2 = data.charCodeAt(i++);
          o3 = data.charCodeAt(i++);
        
          bits = o1 << 16 | o2 << 8 | o3;
        
          h1 = bits >> 18 & 0x3f;
          h2 = bits >> 12 & 0x3f;
          h3 = bits >> 6 & 0x3f;
          h4 = bits & 0x3f;
        
          // use hexets to index into b64, and append result to encoded string
          tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);
        
        enc = tmp_arr.join('');
        
        var r = data.length % 3;
        
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    },

  /**
   * implode
   *
   * Implode to one string
   *
   * @param object object
   * @param glue the 'glue'
   * @param pieces the array
   * @example _().impode(';', myArray);
   */
    _.fn.implode = function(glue, pieces) {
        // @see http://phpjs.org/functions/implode/
        var i = '',
          retVal = '',
          tGlue = '';
        if (arguments.length === 1) {
          pieces = glue;
          glue = '';
        }
        if (typeof pieces === 'object') {
          if (Object.prototype.toString.call(pieces) === '[object Array]') {
            return pieces.join(glue);
          }
          for (i in pieces) {
            retVal += tGlue + pieces[i];
            tGlue = glue;
          }
          return retVal;
        }
        return pieces;
    },

  /**
   * chr
   *
   * PHP's function chr()
   *
   * @param object object
   * @param codePr the charCode
   * @example _().chr('test');
   */
    _.fn.chr = function(codePt) {
        // @see http://phpjs.org/functions/chr/
        if (codePt > 0xFFFF) {
          codePt -= 0x10000;
          return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
        }
        return String.fromCharCode(codePt);
    },

  /**
   * ord
   *
   * PHP's function ord()
   *
   * @param object object
   * @param string the string
   * @example _().ord('test');
   */
    _.fn.ord = function (string) {
        // @see: http://phpjs.org/functions/ord/

        var str = string + '',
          code = str.charCodeAt(0);
        if (0xD800 <= code && code <= 0xDBFF) {
          var hi = code;
          if (str.length === 1) {
            return code;
          }
          var low = str.charCodeAt(1);
          return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
        }
        if (0xDC00 <= code && code <= 0xDFFF) {
          return code;
        }
        return code;
    },

  /**
   * bin2hex
   *
   * PHP's function bin2hex()
   *
   * @param object object
   * @param s the bin
   * @example _().bin2hex('test');
   */
    _.fn.bin2hex = function(s) {
        // @see http://phpjs.org/functions/bin2hex/
        var i, l, o = '', n;
        s += '';
        for (i = 0, l = s.length; i < l; i++) {
          n = s.charCodeAt(i)
            .toString(16);
          o += n.length < 2 ? '0' + n : n;
        }
        
        return o;
    },

  /**
   * sprintf
   *
   * PHP's function sprintf()
   *
   * @param object object
   * @example _().sprintf('test');
   */
    _.fn.sprintf = function() {
        // @see http://phpjs.org/functions/sprintf/

        var regex = /%%|%(\d+\$)?([\-+\'#0 ]*)(\*\d+\$|\*|\d+)?(?:\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
        var a = arguments;
        var i = 0;
        var format = a[i++];
        
        // pad()
        var pad = function(str, len, chr, leftJustify) {
          if (!chr) {
            chr = ' ';
          }
          var padding = (str.length >= len) ? '' : new Array(1 + len - str.length >>> 0)
            .join(chr);
          return leftJustify ? str + padding : padding + str;
        };
        
        // justify()
        var justify = function(value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
          var diff = minWidth - value.length;
          if (diff > 0) {
            if (leftJustify || !zeroPad) {
              value = pad(value, minWidth, customPadChar, leftJustify);
            } else {
              value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
            }
          }
          return value;
        };
        
        // formatBaseX()
        var formatBaseX = function(value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
          // Note: casts negative numbers to positive ones
          var number = value >>> 0;
          prefix = (prefix && number && {
            '2'  : '0b',
            '8'  : '0',
            '16' : '0x'
          }[base]) || '';
          value = prefix + pad(number.toString(base), precision || 0, '0', false);
          return justify(value, prefix, leftJustify, minWidth, zeroPad);
        };
        
        // formatString()
        var formatString = function(value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
          if (precision !== null && precision !== undefined) {
            value = value.slice(0, precision);
          }
          return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
        };
        
        // doFormat()
        var doFormat = function(substring, valueIndex, flags, minWidth, precision, type) {
        var number, prefix, method, textTransform, value;
        
        if (substring === '%%') {
           return '%';
        }
        
        // parse flags
        var leftJustify = false;
        var positivePrefix = '';
        var zeroPad = false;
        var prefixBaseX = false;
        var customPadChar = ' ';
        var flagsl = flags.length;
        var j;
        for (j = 0; flags && j < flagsl; j++) {
          switch (flags.charAt(j)) {
          case ' ':
            positivePrefix = ' ';
            break;
          case '+':
            positivePrefix = '+';
            break;
          case '-':
            leftJustify = true;
            break;
          case "'":
            customPadChar = flags.charAt(j + 1);
            break;
          case '0':
            zeroPad = true;
            customPadChar = '0';
            break;
          case '#':
            prefixBaseX = true;
            break;
          }
        }
        
        // parameters may be null, undefined, empty-string or real valued
        // we want to ignore null, undefined and empty-string values
        if (!minWidth) {
          minWidth = 0;
        } else if (minWidth === '*') {
          minWidth = +a[i++];
        } else if (minWidth.charAt(0) === '*') {
          minWidth = +a[minWidth.slice(1, -1)];
        } else {
          minWidth = +minWidth;
        }
        
        // Note: undocumented perl feature:
        if (minWidth < 0) {
          minWidth = -minWidth;
          leftJustify = true;
        }
        
        if (!isFinite(minWidth)) {
          throw new Error('sprintf: (minimum-)width must be finite');
        }
        
        if (!precision) {
          precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined;
        } else if (precision === '*') {
          precision = +a[i++];
        } else if (precision.charAt(0) === '*') {
          precision = +a[precision.slice(1, -1)];
        } else {
          precision = +precision;
        }
        
        // grab value using valueIndex if required?
        value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];
        
        switch (type) {
            case 's':
              return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
            case 'c':
              return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
            case 'b':
              return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'o':
              return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'x':
              return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'X':
              return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad)
                .toUpperCase();
            case 'u':
              return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
            case 'i':
            case 'd':
              number = +value || 0;
              // Plain Math.round doesn't just truncate
              number = Math.round(number - number % 1);
              prefix = number < 0 ? '-' : positivePrefix;
              value = prefix + pad(String(Math.abs(number)), precision, '0', false);
              return justify(value, prefix, leftJustify, minWidth, zeroPad);
            case 'e':
            case 'E':
            case 'f': // Should handle locales (as per setlocale)
            case 'F':
            case 'g':
            case 'G':
              number = +value;
              prefix = number < 0 ? '-' : positivePrefix;
              method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
              textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
              value = prefix + Math.abs(number)[method](precision);
              return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
            default:
              return substring;
            }
        };
        
        return format.replace(regex, doFormat);
    },

  /**
   * nl2br
   *
   * PHP's function nl2br()
   *
   * @param object object
   * @param str the string
   * @example _().nl2br('test');
   */
    _.fn.nl2br = function(str) {
        return str.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
    },

  /**
   * strlen
   *
   * PHP's function strlen()
   *
   * @param object object
   * @param str the string
   * @example _().strlen('test');
   */
    _.fn.strlen = function(string) {
        return string.length;
    },

  /**
   * strtolower
   *
   * PHP's function strtolower()
   *
   * @param object object
   * @param str the string
   * @example _().strtolower('test');
   */
    _.fn.strtolower = function(str) {
        return str.toLowerCase();
    },

  /**
   * strtoupper
   *
   * PHP's function strtoupper()
   *
   * @param object object
   * @param str the string
   * @example _().strtoupper('test');
   */
    _.fn.strtoupper = function(str) {
        return str.toUpperCase();
    },

  /**
   * explode
   *
   * PHP's function explode()
   *
   * @param object object
   * @param str the string
   * @example _().explode('t;e;s;t;', ';');
   */
    _.fn.explode = function(str, delimiter) {
      return str.split(delimiter);
    },

  /**
   * join
   *
   * PHP's function join()
   *
   * @param object object
   * @param str the string
   * @example _().join(';', myArray);
   */
    _.fn.join = function(glue, pieces) {
        return this.implode(glue, pieces);
    }
}