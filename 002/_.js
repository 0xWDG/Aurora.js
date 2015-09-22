/*

                         _    _____ 
                        | |  / ____|
                        | |  | (___  
                    _   | |  \___  \ 
     ______    _   | |__| |  ____) |
    |______|  (_)   \____/  |______/ 
                              v0.0.2
                              Stable

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
        var selector = document.querySelectorAll(params),i = 0;
        // Get selector length
        this.length     = selector.length;
        this.version    = '0.0.2';
        this.website    = 'http://www.wdgwv.com';
        this.revision   = 'r01'
        this.isCompiled = false;
        this.isStable   = true;
         
        // Add selector to object for method chaining
        for (; i < this.length; i++) {
            this[i] = selector[i];
        }
         
        // Return as object
        return this;        
    };
 
    // Extend the Library object.
    _.fn = Library.prototype =  
    {
        hide: function () {
            var len = this.length;
            while (len--) {
                this[len].style.display = 'none';
            }
             return this;
        },
        html: function (data) {
            var len = this.length;
            while (len--) {
                this[len].innerHTML = data;
            }
            return this;
        },
        show: function () {
            var len = this.length;
            while (len--) {
                this[len].style.display = 'block';
            }
            return this;
        },
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
        framebreak: function () {
            if (top.location != location)
            {
                top.location.href = document.location.href;
            }
            return this;
        },

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
                    if (elem[i].tagName == "SELECT") 
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
                        console.log(pst[i]);
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
        noConflict: function()
        {
            if (typeof old_js === 'object')
                window._ = old_js;

            return _;
        }
    };
    
    // Assign our _ object to global window object.
    if(!window._) {
        window._ = _;
    }
    else
    {
        var old_js = window._;
        window._ = _;
    }
    return _;
})();
