/*

                         _    _____ 
                        | |  / ____|
                        | |  | (___  
                    _   | |  \___  \ 
     ______    _   | |__| |  ____) |
    |______|  (_)   \____/  |______/ 
                                    v0.0.1

    !!! NOT READY
    !!! THIS VERSION IS NOT YET READY FOR PRODUCTION

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
        this.version    = '0.0.1';
        this.website    = 'http://www.wdgwv.com';
        this.revision   = 'r01'
        this.isCompiled = false;
         
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
                      var l=change.getElementsByTagName('script');
                      for(var i=0,j=l.length;i<j;i++)
                      {
                        eval(l[i].innerHTML);
                      }
                    }
                }
            
                xmlhttp.open("GET",url,true);
                xmlhttp.send();
            }
            return this
        }
    };
    
    // Assign our _ object to global window object.
    if(!window._) {
        window._ = _;
    }
    return _;
})();
