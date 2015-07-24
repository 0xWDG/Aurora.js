if(!window._) 
{
	alert("MISSING SOMETHING!");
}
else
{
	// Add a Plugin "MyPlugin"
	_.fn.myPlugin = function(name) { console.log("myPlugin: " + name); };

	// Call the new "Plugin"
	_("wrapper").myPlugin("WDGWV.com");
}