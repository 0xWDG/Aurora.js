if(!window._) 
{
	alert("MISSING SOMETHING!");
}
else
{
	_.fn.myPlugin = function(name) { alert(name); };

	_("wrapper").myPlugin("Rambo");
}