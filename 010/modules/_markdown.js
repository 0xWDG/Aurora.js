/*
                         _
                        (_)
                         _    _____
                        | |  / ____|
                        | |  | (___
                    _   | |  \___  \
     ______    _   | |__| |  ____) |
    |______|  (_)   \____/  |______/
                              v0.1.0

    https://www.github.com/wesdegroot/_.js/
    or https://www.wdgwv.com

    Git:     https://github.com/wesdegroot/_.js
    Todo:    https://github.com/wesdegroot/_.js/issues
    Licence: https://github.com/wesdegroot/_.js/blob/master/LICENCE.md (CC BY 4.0)
    Latest:  https://raw.githubusercontent.com/wesdegroot/_.js/master/latest/_.js
*/
if (typeof _ !== 'function') {
  window.alert('Please make sure _.js is loaded!')
} else {
  /**
   * md_str_repeat
   *
   * MARKDOWN: STRING REPEAT
   *
   * @internal
   * @param object object
   * @param string string
   * @param int times
   * @see https://github.com/wesdegroot/_.js/wiki/module_markdown
   * @example _('.wrapper').md_str_repeat('x', 5)
   */
  window._.fn.md_str_repeat = function (str, num) {
    return new Array(num + 1).join(str)
  }

  /**
   * markdown
   *
   * convert from markdown to Markdown
   *
   * @param object object
   * @param data the configuration array.
   * @see https://github.com/wesdegroot/_.js/wiki/module_markdown
   * @example _('.wrapper').markdown()
   */
  window._.fn.markdown = function () {
    var len = 0
    if (true) {
      var el = document.createElement('script')
      el.type = 'text/javascript'
      el.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js'
      document.head.appendChild(el)

      var mrk = ''
      var codeOpen = false
      var listOpen = false

      // split all
      var parse = this[len].innerHTML.split('\n')

      for (var i = 0; i < parse.length; i++) {
        // Check for general things
        // - Bold
        if (parse[i].match(/\*\*(.*)\*\*/g)) {
          if (!codeOpen) parse[i] = parse[i].replace(/\*\*(.*)\*\*/g, '<b>$1</b>')
        }

        // - Italic
        if (parse[i].match(/\*(.*)\*/g)) {
          if (!codeOpen) parse[i] = parse[i].replace(/\*(.*)\*/g, '<i>$1</i>')
        }

        // - Inline code!
        if (parse[i].match(/`(.*)`/g)) {
          if (!codeOpen) parse[i] = parse[i].replace(/`(.*)`/g, '<style>pre.prettyprint{border:0 !important;}</style><div style=\'display:inline-block;word-break:break-all;word-wrap:break-word;white-space:pre;white-space:pre-wrap;background-color:#f5f5f5;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.15);-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;\'><pre class="prettyprint">$1</pre></div>')
        }

        // - image (![GitHub Logo](/images/logo.png))
        if (parse[i].match(/\(\!\[(.*)\]\((.*)\)\)/g)) {
          if (!codeOpen) parse[i] = parse[i].replace(/\(\!\[(.*)\]\((.*)\)\)/g, "<img src='$2' alt='$1'>")
        }

        // - URL []()
        if (parse[i].match(/\[(.*)\]\((.*)\)/g)) {
          if (!codeOpen) parse[i] = parse[i].replace(/\[(.*)\]\((.*)\)/g, "<a href='$2'>$1</a>")
        }

        // - URL
        if (parse[i].match(/(?![^<]*>|[^<>]*<\/(?!(?:p|pre)>))((https?:)\/\/[a-z0-9&#=.\/\-?_]+)/gi)) {
          if (!codeOpen) parse[i] = parse[i].replace(/(?![^<]*>|[^<>]*<\/(?!(?:p|pre)>))((https?:)\/\/[a-z0-9&#=.\/\-?_]+)/gi, "<a href='$1'>$1</a>")
        }

        // OK parse the MarkDown ;)

        // Empty line (break)
        if (this.isEmpty(parse[i])) {
          if (!this.isEmpty(parse[i - 1])) {
            mrk += '<br />'
          } else {
            if (listOpen) {
              mrk += '</ul>'
              listOpen = false
            }
            if (codeOpen) {
              mrk += '</pre></div>'
              codeOpen = false
            }
            mrk += '<br />'
          }
        } else if (parse[i].substr(0, 5) === '#####') {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }

          mrk += '<h5>' + parse[i].substr(5, parse[i].length) + '</h5>'
        } else if (parse[i].substr(0, 4) === '####') {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }

          mrk += '<h4>' + parse[i].substr(4, parse[i].length) + '</h4>'
        } else if (parse[i].substr(0, 3) === '###') {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }
          mrk += '<h3>' + parse[i].substr(3, parse[i].length) + '</h3>'
        } else if (parse[i].substr(0, 2) === '##') {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }
          mrk += '<h2>' + parse[i].substr(2, parse[i].length) + '</h2>'
        } else if (parse[i].substr(0, 1) === '#') {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }
          mrk += '<h1>' + parse[i].substr(1, parse[i].length) + '</h1>'
        } else if (parse[i + 1] === this.md_str_repeat('=', parse[i].length)) {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }
          mrk += '<h1>' + parse[i] + '</h1>'
          parse[i + 1] = ''
        } else if (parse[i + 1] === this.md_str_repeat('-', parse[i].length)) {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }
          mrk += '<h2>' + parse[i] + '</h2>'
          parse[i + 1] = ''
        } else if (parse[i].substr(0, 2) === '* ') {
          if (!listOpen) {
            mrk += '<ul>'
            listOpen = true
          }
          mrk += '<li>' + parse[i].substr(2, parse[i].length) + '</li>'
        } else if (parse[i].substr(0, 4) === '    ') {
          if (!codeOpen) {
            mrk += '<style>pre.prettyprint{border:0 !important;}</style><div style=\'display:block;padding:9.5px;margin:0 0 10px;font-size:13px;line-height:20px;word-break:break-all;word-wrap:break-word;white-space:pre;white-space:pre-wrap;background-color:#f5f5f5;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.15);-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;\'><pre class="prettyprint">'
            codeOpen = true
          }
          mrk += '\r\n' + parse[i].substr(4, parse[i].length)
        } else if (parse[i].substr(0, 3) === '---' ||
          parse[i].substr(0, 3) === '***' ||
          parse[i].substr(0, 3) === '___') {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }
          mrk += '<hr />'
        } else if (parse[i].substr(0, 4) === '- []') {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }
          mrk += '<br />'
          mrk += "<input type='checkbox' disabled=''>" + parse[i].substr(4, parse[i].length)
        } else if (parse[i].substr(0, 5) === '- [ ]') {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }
          mrk += '<br />'
          mrk += "<input type='checkbox' disabled=''>" + parse[i].substr(5, parse[i].length)
        } else if (parse[i].match(/\[c\=(.*)\](.*)\[\/c\]/g)) {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }
          // Need to be a real, regex, since i'm not good with it.
          // split split split.
          var color = String(parse[i]).split('=')
          color = String(color[1]).split(']')[0]
          var texts = String(parse[i]).split(']')
          texts = texts[1].split('[')[0]
          mrk += "<font color='" + color + "'>" + texts + '</font>'
        } else if (parse[i].substr(0, 5) === '- [x]') {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }
          mrk += '<br />'
          mrk += "<input type='checkbox' checked='' disabled=''>" + parse[i].substr(5, parse[i].length)
        } else {
          if (listOpen) {
            mrk += '</ul>'
            listOpen = false
          }
          if (codeOpen) {
            mrk += '</pre></div>'
            codeOpen = false
          }
          mrk += parse[i]
        }
      }
      this[len].innerHTML = mrk
    }
  }
}
