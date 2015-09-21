if(!window._) 
{
	alert("MISSING SOMETHING!");
}
else
{
	// Add a Plugin "Markdown"
	_.fn.markdown = function() {
        var len = this.length;
        while (len--) 
        {
        	// Crazy markdown parser (demodemodemo)
        	_('.md').hide(); // HIDE OLD ONE TEST MODE
    		var md       = document.getElementById('md-test');
    		var mrk      = "";
    		var codeOpen = false;
    		// split all
    		var parse    = this[len].innerHTML.split("\n");

    		for (var i = 0; i < parse.length; i++) {
    			if (this.isEmpty(parse[i])) // Empty line (break)
    			{
    				mrk += "<br />";
    			}
    			else if (parse[i].substr(0,5) == "#####") // H5
    			{
    				mrk += "<h5>" + parse[i].substr(5,parse[i].length) + "</h5>";
    			}
    			else if (parse[i].substr(0,4) == "####") // H4
    			{
    				mrk += "<h4>" + parse[i].substr(4,parse[i].length) + "</h4>";
    			}
    			else if (parse[i].substr(0,3) == "###") // H3
    			{
    				mrk += "<h3>" + parse[i].substr(3,parse[i].length) + "</h3>";
    			}
    			else if (parse[i].substr(0,2) == "##") // H2
    			{
    				mrk += "<h2>" + parse[i].substr(2,parse[i].length) + "</h2>";
    			}
    			else if (parse[i].substr(0,1) == "#") // H1
    			{
    				mrk += "<h1>" + parse[i].substr(1,parse[i].length) + "</h1>";
    			}
    			else if (parse[i].substr(0,4) == "    ") //Code
    			{
    				if (!codeOpen)
    				{
    					mrk += "<div style='background:lightgrey;'><pre>";
    					codeOpen = true;
    				}
    				mrk += "\r\n" + parse[i].substr(4,parse[i].length);	
    			}
    			else if (parse[i].substr(0,3) == "---" ||
    				     parse[i].substr(0,3) == "***" ||
						 parse[i].substr(0,3) == "___")
    			{
    				mrk += "<hr />";
    			}
    			else if (parse[i].substr(0,4) == "- []") //Checkbox (un-checked)
    			{
    				mrk += "<br />";
    				mrk += "<input type='checkbox' disabled=''>" + parse[i].substr(4,parse[i].length);		
    			}
    			else if (parse[i].substr(0,5) == "- [ ]") //Checkbox (un-checked)
    			{
    				mrk += "<br />";
    				mrk += "<input type='checkbox' disabled=''>" + parse[i].substr(5,parse[i].length);		
    			}
    			else if (parse[i].substr(0,5) == "- [x]") //Checkbox (checked)
    			{
    				mrk += "<br />";
    				mrk += "<input type='checkbox' checked='' disabled=''>" + parse[i].substr(5,parse[i].length);
    			}
    			else
    			{
    				if (codeOpen)
    				{
    					mrk += "</pre></div>";
    					codeOpen = false;
    				}
    				mrk += parse[i];
    			}
    		};

    		console.log(mrk);
    		md.innerHTML = mrk;
    	}
    }

    _('.md').markdown();
}