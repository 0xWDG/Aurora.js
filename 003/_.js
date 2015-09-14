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
    Licence: https://github.com/wesdegroot/_.js/blob/master/LICENCE.md
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
        this.version     = '0.0.3ß';

        // We'll gonna set the revision (prefix: r)
        this.revision    = 'r01'

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

        // Un-used right now
        this.website     = 'http://www.wdgwv.com';
         
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
         */
        _: function(configKey, set) {
            if (!set)
                return eval('this.' + configKey);
            else
            {
                eval('this.' + configKey + '=\'' + set + '\';');
                
                // Why the error, this does not work ^^ EVAL ^^
                console.error('Error, Failed to set \'' + configKey + '\' to \'' + set + '\'');

                return eval('this.' + configKey);
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
         * @example _('.wrapper').html('hi, i\'m new');
         */
        html: function (data) {
            var len = this.length;
            while (len--) {
                this[len].innerHTML = data;
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
         * QR
         *
         * Will be deprecated as v0.0.2r2
         * Will be removed in v0.0.3 stable.
         *
         * @deprecated
         */
        qr: function (data) {
            var len = this.length;
            while (len--) {
                if (typeof(makeQRnow) == "function")
                    this[len].src = makeQRnow(data);
                else
                    return false;
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
                params += 'by=' + encodeURIComponent('_.js');

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
         * Loads a page tru AJAX
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
        noConflict: function()
        {
            if (typeof old_js === 'object')
                window._ = old_js;

            return _;
        },

        /**
         * requireSSL
         *
         * this make "SSL" / "HTTPS" required
         *
         * @param object object
         * @example _().requireSSL();
         */
        requireSSL: function()
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
         * @param object object
         * @example _().loadExtension(src, callback);
         */
        loadExtension: function(src, callback)
        {
            // Future. Experimental.
            this.addToBody('script', 'src=' + src);

            if(typeof callback === 'function')
            {
                eval(callback);
            }
        }
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
