/*
	_.js
	v0.0.1

	https://www.github.com/wesdegroot/_.js/
	or https://www.wdgwv.com

	Git:     https://www.github.com/wesdegroot/_.js
	Todo: 	 https://www.github.com/wesdegroot/_.js/issues
	Licence: https://github.com/wesdegroot/_.js/blob/master/LICENCE.md
*/

// Anonymous function
(function () {
    // W returns new Library object that hold our selector. Ex: Q('.wrapper')
    var _ = function (params) {
        return new Library(params);
    };
     
    // In our Library we get our selector with querySelectorAll
    // We also add selector length, version and twitter/github or whatever you like as information about your library.
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
	}
    };
    
    // Assign our Q object to global window object.
    if(!window._) {
        window._ = _;
    }
    return _;
})();