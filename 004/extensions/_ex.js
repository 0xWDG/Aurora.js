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

if(!window._) 
{
	alert("MISSING SOMETHING!");
}
else
{
	// Add a Plugin "MyPlugin"
	_.fn.myPlugin = function(name) { console.log("myPlugin: " + name); };
	_.fn.equalHeight = function() {
           // find the tallest height in the collection
           // that was passed in (.column)
            tallest = 0;
            this.each(function(){
                thisHeight = _(this).height();
                if( thisHeight > tallest)
                    tallest = thisHeight;
            });

            // set each items height to use the tallest value found
            this.each(function(){
                _(this).height(tallest);
            });
        },
        _.fn.isExtra = function() {
            console.log('in-a-function-function-call-thing-test');
        },
        _.fn.loadExtra = function() {
            this.isExtra();
        }
	// Call the new "Plugin"
	_("wrapper").myPlugin("WDGWV.com");

    _("wrapper").loadExtra(); /// Plugin, in a plugin thing?
}