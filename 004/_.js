/*

                         _    _____ 
                        | |  / ____|
                        | |  | (___  
                    _   | |  \___  \ 
     ______    _   | |__| |  ____) |
    |______|  (_)   \____/  |______/ 
                              v0.0.4

    https://www.github.com/wesdegroot/_.js/
    or https://www.wdgwv.com

    Git:     https://github.com/wesdegroot/_.js
    Todo:    https://github.com/wesdegroot/_.js/issues
    Licence: https://github.com/wesdegroot/_.js/blob/master/LICENCE.md (CC BY 4.0)
    Latest:  https://raw.githubusercontent.com/wesdegroot/_.js/master/latest/_.js
*/


// _ function
(function () {
    // _ returns new Library object that hold our selector. Ex: _('.wrapper')
    var _ = function (params) {
        return new Library(params);
    };
     
    // In our Library we get our selector with querySelectorAll
    var Library = function (params) {
        // We'll gonna select
        var selector     = document.querySelectorAll(params);

        // We gonna set the length
        this.length      = selector.length;

        // We'll gonna set the version (including: 
        // α = Alpha (alfa) [DO NOT USE]
        // ß = Beta, [SEMI-Stable]
        // s or nothing for stable!
        // )
        this.version     = '0.0.4';

        // We'll gonna set the revision (prefix: r)
        this.revision    = 'r0';

        // We'll gonna mix the version & revision (full build string)
        this.fullversion = this.version + this.revision;

        // is this a beta?
        this.isBeta      = (this.version.match(/ß/g) ) ? true : false;

        // is this a alpha?
        this.isAlpha     = (this.version.match(/α/g) ) ? true : false;

        // is this a compiled version
        // Please note that _.js is always uncompiled.
        // Compiled version = _.min.js
        this.isCompiled  = false;

        // is this a stable version?
        this.isStable    = (!this.isBeta && !this.isAlpha) ? true : false;
        
        // Script RegeX
        this.ScriptRX    = '<script[^>]*>([\\S\\s]*?)<\/script\\s*>';

        // JSON RegeX
        this.JSONRX      = '/^\/\*-secure-([\s\S]*)\*\/\s*$/';

        // Add selector to object for method chaining
        for(var i=0; i<this.length; i++)
        {
            this[i] = selector[i];
        }
        
        // Return as object
        return this;        
    };
 
    // Extend the Library object.
    _.fn = Library.prototype =  
    {
        /**
         * _
         *
         * Display/Set config
         *
         * @param object object
         * @param configKey config parameter
         * @example _()._('version');
         * @deprecated set SET WILL BE REMOVED.
         */
        _: function (configKey, set) {
            if (!set)
                return eval('this.' + configKey);
            else
            {
                console.error('[_.js Error: NOT SUPPORTED]\nError, Failed to set \'' + configKey + '\' to \'' + set + '\'.');
            }
        },

        /**
         * $
         *
         * Easter egg ;)
         *
         * @param object object
         * @example _().$();
         */
        $: function () {
            alert('Hi');
            var answer = confirm('Did you know that i\'m not jQuery?');

            if (answer)
                alert('Why did you even try this?');
            else
                alert('Nope, i\'m not jQuery');

            alert('Thanks for using \'_.js\'!\n' +
                  decodeURIComponent('%F0%9F%92%99'));
        },

        /**
         * require
         *
         * Load/Require a javascript file
         * if a file is starting with _ then it is a _.js module
         * DO not use _ as first character on own modules! (unless you do a pull request.)
         *
         * @param object object
         * @example _().require(['a','r','ra','y'], function(){doSomeThing();});
         */
        require: function (jsArray, Callback) {
            if (typeof(jsArray) === "object")
            {
                for (var i = jsArray.length - 1; i >= 0; i--) 
                {
                    if (!jsArray[i].match(/\.js/g))
                        jsArray[i] = jsArray[i] + ".js";

                    if (this.startsWith(jsArray[i], '_') && !this.isLocal() && this.isStable)
                        jsArray[i] = 'https://raw.githubusercontent.com/wesdegroot/_.js/master/latest/modules/' + jsArray[i];

                    var script                      = document.createElement('script');
                        script.type                 = 'text/javascript';
                        script.src                  = jsArray[i];

                    if (i == 1)
                        script.onreadystatechange   = Callback;
                    if (i == 1)
                        script.onload               = Callback;
                    
                    document.head.appendChild(script);
                };
            }
            else if (typeof(jsArray) === "string")
            {
                if (!jsArray.match(/\.js/g))
                    jsArray = jsArray + ".js";

                if (this.startsWith(jsArray, '_') && !this.isLocal() && this.isStable)
                    jsArray = 'https://raw.githubusercontent.com/wesdegroot/_.js/master/latest/modules/' + jsArray;

                var head                        = document.getElementsByTagName('head')[0];
                var script                      = document.createElement('script');
                    script.type                 = 'text/javascript';
                    script.src                  = jsArray;
                    script.onreadystatechange   = Callback;
                    script.onload               = Callback;
                head.appendChild(script);
            }
            else {
                console.error('Please use only a array, or a string.');
            }
        },

        /**
         * Hide
         *
         * Hide a object from the website
         *
         * @param object object
         * @example _('.wrapper').hide();
         */
        hide: function () {
            var len = this.length;
            while (len--) {
                this[len].style.display = 'none';
            }
             return this;
        },

        /**
         * html
         *
         * place html in a object from the website
         *
         * @param object object
         * @example _('.wrapper').html('hi, i\'m new'); //Write
         * @example _('.wrapper').html(); //Read
         */
        html: function (data) {
            var len = this.length;
            while (len--) 
            {
                if ( typeof(data) === "undefined" ) // Reading mode _().html()
                    return this[len].innerHTML;
                else
                    this[len].innerHTML = data;     // Writing mode _().html('hi, i write!')
            }
            return this;
        },

        /**
         * show
         *
         * show a object from the website
         *
         * @param object object
         * @example _('.wrapper').show();
         */
        show: function () {
            var len = this.length;
            while (len--) {
                this[len].style.display = 'block';
            }
            return this;
        },

        /**
         * Framebreak
         *
         * If i'm in a frame, please break out of it
         *
         * @param object object
         * @example _().framebreak();
         */
        framebreak: function () {
            if (top.location != location)
            {
                top.location.href = document.location.href;
            }
            return this;
        },

        /**
         * ajaxPost
         *
         * ajaxPost Posts a form, tru ajax.
         * Please not call this function yourself, unless you know what you are doing!
         *
         * @param object object
         * @example _('.wrapper').ajaxPost(form);
         */
        ajaxPOST: function (form, callback) 
        {
            var len = this.length;
            while (len--) 
            {
                var xmlPhttp, change = this[len], url = form.action;
            
                if (window.XMLHttpRequest)
                    xmlPhttp = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
                else
                    xmlPhttp = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5

                    var elem   = form.elements;
                    var url    = form.action;        
                    var params = "";
                    var value;
                    var empty;

                for (var i = 0; i < elem.length; i++) 
                {
                    if (elem[i].tagName.toLowerCase() == "select") // to lowercase, we don't want issues with SeLeCt
                        value = elem[i].options[elem[i].selectedIndex].value;
                    else
                        value = elem[i].value;

                    if (value)
                        params += elem[i].name + "=" + encodeURIComponent(value) + "&";
                }
                params += 'AJAXby=' + encodeURIComponent('_.js');

                xmlPhttp.open("POST", url, true);
                xmlPhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xmlPhttp.onreadystatechange=function()
                {
                    if (xmlPhttp.readyState==4 && xmlPhttp.status==200)
                    {
                      change.innerHTML = xmlPhttp.responseText;

                      //JavaScript Fix!
                      var js=change.getElementsByTagName('script');
                      for(var i=0,j=js.length;i<j;i++)
                      {
                        eval(js[i].innerHTML);
                      }

                      // fix posts also (.ajax)
                      var pst=change.getElementsByTagName('form');
                      for(var i=0,j=pst.length;i<j;i++)
                      {
                        if (pst[i].method.toLowerCase() == 'post')
                            pst[i].setAttribute("onsubmit", "event.preventDefault();_('." + change.className + "').ajaxPOST(this);");
                      }
                    }
                }
                    
                //All preperations are clear, send the request!
                xmlPhttp.send(params);
            }
            return false;
        },

        /**
         * Ajax
         *
         * Loads a page AJAX
         *
         * @param object object
         * @example _('.wrapper').ajax(url, options);
         */
        ajax: function (url, options)
        {
            var len = this.length;
            while (len--) 
            {
                var xmlhttp, change = this[len];

                if (window.XMLHttpRequest)
                    xmlhttp = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
                else
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5

                xmlhttp.onreadystatechange=function()
                {
                    if (xmlhttp.readyState==4 && xmlhttp.status==200)
                    {
                      change.innerHTML = xmlhttp.responseText;
                      
                      //JavaScript Fix!
                      var js=change.getElementsByTagName('script');
                      for(var i=0,j=js.length;i<j;i++)
                      {
                        eval(js[i].innerHTML);
                      }

                      // fix posts also (.ajax)
                      var pst=change.getElementsByTagName('form');
                      for(var i=0,j=pst.length;i<j;i++)
                      {
                        if (pst[i].method.toLowerCase() == 'post')
                            pst[i].setAttribute("onsubmit", "event.preventDefault();_('." + change.className + "').ajaxPOST(this);");
                      }
                    }
                }
            
                xmlhttp.open("GET",url,true);
                xmlhttp.send();
            }
            return this
        },

        /**
         * noConflict
         *
         * Enables noConflict mode, so _() can also be W()
         *
         * @param object object
         * @example var W = _().noConflict();
         */
        noConflict: function ()
        {
            if (typeof old_js === 'object')
                window._ = old_js;

            return _;
        },

        /**
         * isLocal
         *
         * Are we running local?
         *
         * @param object object
         * @return true/false
         * @example _().isLocal();
         */
        isLocal: function ()
        {
            if (window.location.protocol != 'file:')
            {
                if ( !window.location.href.match(/(localhost|127\.0\.0\.1|::1)/g) )
                    return false;
                else
                    return true;
            }
            else
                return true;
        },

        /**
         * requireSSL
         *
         * this make "SSL" / "HTTPS" required
         *
         * @param object object
         * @example _().requireSSL();
         */
        requireSSL: function ()
        {
            if (window.location.protocol != "https:" && window.location.protocol != 'file:')
            {
                // if not on localhost (testing)
                if ( !window.location.href.match(/(localhost|127\.0\.0\.1|::1)/g) )
                    window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
            }
            return;
        },

        /**
         * loadExtension
         *
         * loadExtension Tries to load a extension (module)
         *
         * @deprecated 0.0.4
         * @param object object
         * @example _().loadExtension(src, callback);
         */
        loadExtension: function(src, callback)
        {
            return this.require(src, callback);
        },

        /**
         * isUndefined
         *
         * isUndefined is a object undefined?
         *
         * @param object object
         * @param object to test
         * @return true / false
         * @example _().isUndefined(myObject);
         */
        isUndefined: function (thing)
        {
            return (typeof(thing) == "undefined");
        },

        /**
         * isEmpty
         *
         * isEmpty is a object empty?
         *
         * @param object object
         * @param object to test
         * @return true / false
         * @example _().isEmpty(myObject);
         */
        isEmpty: function (check) {
            return check == '';
        },

        /**
         * isBlank
         *
         * isBlank is a object blank?
         *
         * @param object object
         * @param object to test
         * @return true / false
         * @example _().isBlank(myObject);
         */
        isBlank: function ( check ) {
            return /^\s*$/.test(check);
        },

        /**
         * stripTags
         *
         * stripTags strip HTML tags of a object
         *
         * @param object object
         * @example _('.codeField').stripTags();
         */
        stripTags: function () {
            var len = this.length;
            while (len--) 
            {
                this[len].innerHTML = this[len].innerHTML.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
            }
        },

        /**
         * stripScripts
         *
         * stripScripts strip Scripts from a object
         *
         * @param object object
         * @example _('.codeField').stripScripts();
         */
        stripScripts: function () {
            var len = this.length;
            while (len--) 
            {
                this[len].innerHTML = this[len].innerHTML.replace(new RegExp(this.ScriptRX, 'img'), '');
            }
        },

        /**
         * css
         *
         * css read, or write css
         *
         * @param object object
         * @param string read what to read
         * @param string? write what to write
         * @example _('.wrapper').css('width', '10px');
         */
        css: function (read, write) {
            var len = this.length;
            while (len--) 
            {
                if(this.isUndefined(write))
                { //Read
                    return window.getComputedStyle(this[len]).getPropertyValue(read);
                }
                else
                { //Write
                    var _read = read;
                        _read = _read.replace(/-/g, '');

                    // this[len].style._read = write; // does edit the dom.
                    // this[len].setAttribute(_read, write); // does add... but not working
                    
                    this[len].setAttribute('style', read + ':' + write + ';'); // does edit the dom!
                    // ^^ NOT HAPPY W/ IT; i think it can be done better.

                    return this;//this.css(read);
                }
            }
        },

        /**
         * escapeHTML
         *
         * escape the HTML
         *
         * @param object object
         * @param string string to escape
         * @return string
         * @example _().escapeHTML(str);
         */
        escapeHTML: function (str) {
            return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        },

        /**
         * unescapeHTML
         *
         * unescape the HTML
         *
         * @param object object
         * @param string string to escape
         * @return string
         * @example _().unescapeHTML(str);
         */
        unescapeHTML: function (str) {
            return str.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
        },

        /**
         * toArray
         *
         * string to array
         *
         * @param object object
         * @param string string to put in the array
         * @return array
         * @example _().toArray(str);
         */
        toArray: function (str) {
            return str.split('');
        },

        /**
         * runTest
         *
         * runTest Run a test [internal, external use.]
         *
         * @param object object
         * @param object testCase test case
         * @param object expectedResult expected Result
         * @return true/false
         * @example _().runTest(_().someFunction(), 'haha');
         */
        runTest: function (testCase, expectedResult) {
            //.. ok, how to handle.. mmz :)
            // _().runTest(_().someFunction(), 'haha');
            // ..
            // _('.x').functionSome('isCool');
            // _().runTest(function(){return _('.x').html()}, 'isCool');

            if (typeof(testCase) != "function")
                return (testCase == expectedResult); // Pass!
            else
                return (testCase() == expectedResult); // Pass!
        },

        /**
         * includes
         *
         * includes does a string includes the thing?
         *
         * @param object object
         * @param string str the string
         * @param string pattern the pattern
         * @return true/false
         * @example _().includes('hi, i am wesley', 'hi');
         */
        includes: function(str, pattern) {
          return str.indexOf(pattern) > -1;
        },

        /**
         * startsWith
         *
         * startsWith does a string starts With the thing?
         *
         * @param object object
         * @param string str the string
         * @param string pattern the pattern
         * @return true/false
         * @example _().startsWith('hi, i am wesley', 'hi');
         */
        startsWith: function(str, pattern) {
          return str.lastIndexOf(pattern, 0) === 0;
        },

        /**
         * endsWith
         *
         * endsWith does a string ends With the thing?
         *
         * @param object object
         * @param string str the string
         * @param string pattern the pattern
         * @return true/false
         * @example _().endsWith('hi, i am wesley', 'wesley');
         */
        endsWith: function(str, pattern) {
          var d = str.length - pattern.length;
          return d >= 0 && str.indexOf(pattern, d) === d;
        },

        /**
         * capitalize
         *
         * capitalize a string
         *
         * @param object object
         * @param string str the string
         * @return string
         * @example _().capitalize('hi, i am wesley');
         */
        capitalize: function (str) {
            return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        },

        /**
         * camelize
         *
         * camelize a string
         *
         * @param object object
         * @param string str the string
         * @return string
         * @example _().camelize('hi, i am wesley');
         */
        camelize: function (str) {
            return str.replace(/-+(.)?/g, function(match, chr) {
                return chr ? chr.toUpperCase() : '';
            });
        },

        /**
         * scrollToBottom
         *
         * scroll To Bottom
         *
         * @param object object
         * @return true
         * @example _('.wrapper').scrollToBottom();
         */
        scrollToBottom: function () {
            var len = this.length;
            while (len--) 
            {
                this[len].scrollTop = 0;
            }
            return true;
        },

        /**
         * scrollToTop
         *
         * scroll To Bottom
         *
         * @param object object
         * @return true
         * @example _('.wrapper').scrollToTop();
         */
        scrollToTop: function () {
            var len = this.length;
            while (len--) 
            {
                this[len].scrollTop = this[len].scrollHeight;
            }
            return true;
        },
        
        /**
         * truncate
         *
         * truncate is a object undefined?
         *
         * @param object object
         * @param string length (default: 30)
         * @param string truncation after the truncate (default: ...)
         * @return true
         * @example _('.wrapper').truncate(length, truncation);
         */
        truncate: function (length, truncation)
        {
            var len = this.length;
            while (len--) 
            {
                length = length || 30;
                truncation = this.isUndefined(truncation) ? '...' : truncation;
    
                this[len].innerHTML = this[len].innerHTML.length > length ? 
                                                            this[len].innerHTML.substring(0, length) + truncation 
                                                           : 
                                                            String(this[len].innerHTML);
            }
            return true;
        }
    };
    
    // We'll parse the errors for you!
    window.onerror = function (msg, url, line, col, error) 
    {
        var extra = !col ? '' : ' (col: ' + col + ')';
           extra += !error ? '' : '\nerror: ' + error;

        console.error("[_.js INFORMATION]\nError: " + msg + "\nline: " + line + extra);
        return true; //let browser continue.
    };

    // Assign our _ object to global window object.
    if(!window._) {
        window._ = _;
    }
    else
    {
        //save the old, for _().noConflict()
        var old_js = window._;
        window._ = _;
    }
    return _;

})();