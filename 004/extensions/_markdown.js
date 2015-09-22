if(!window._) 
{
	alert("MISSING SOMETHING!");
}
else
{
	_.fn.md_str_repeat = function( str, num )
	{
    	return new Array( num + 1 ).join( str );
	};
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
    		var listOpen = false;
    		// split all
    		var parse    = this[len].innerHTML.split("\n");

    		for (var i = 0; i < parse.length; i++)
    		{
    			if (this.isEmpty(parse[i])) // Empty line (break)
    			{
    				mrk += "<br />";
    			}
    			// ##### H5
    			else if (parse[i].substr(0,5) == "#####") 
    			{
    				mrk += "<h5>" + parse[i].substr(5, parse[i].length) + "</h5>";
    			}
    			// #### H4
    			else if (parse[i].substr(0,4) == "####") 
    			{
    				mrk += "<h4>" + parse[i].substr(4, parse[i].length) + "</h4>";
    			}
    			// ### H3
    			else if (parse[i].substr(0,3) == "###") 
    			{
    				mrk += "<h3>" + parse[i].substr(3, parse[i].length) + "</h3>";
    			}
    			// ## H2
    			else if (parse[i].substr(0,2) == "##") 
    			{
    				mrk += "<h2>" + parse[i].substr(2, parse[i].length) + "</h2>";
    			}
    			// # H1
    			else if (parse[i].substr(0,1) == "#") 
    			{
    				mrk += "<h1>" + parse[i].substr(1, parse[i].length) + "</h1>";
    			}
    			// *bold* (need to be regex)
    			else if (parse[i].substr(0,1) == "*" && parse[i].substr(-1) == "*")
    			{
    				mrk += "<b>" + parse[i].substr(1, parse[i].length-1) + "</b>";
    			}
    			//Alt-H1
				//======
				else if (parse[i+1] == this.md_str_repeat('=', parse[i].length))
				{
					mrk += "<h1>" + parse[i] + "</h1>";
					parse[i+1]='';
				}
				//Alt-H2
				//------
				else if (parse[i+1] == this.md_str_repeat('-', parse[i].length))
				{
					mrk += "<h2>" + parse[i] + "</h2>";
					parse[i+1]='';
				}
				// * unordered list
    			else if (parse[i].substr(0,2) == "* ")
    			{
    				if(!listOpen)
    				{
    					mrk += "<ul>";
    					listOpen = true;
    				}
    				mrk += "<li>" + parse[i].substr(2, parse[i].length) + "</li>";
    			}
    			// \s\s\s\s CODE
    			else if (parse[i].substr(0,4) == "    ") //Code
    			{
    				if (!codeOpen)
    				{
    					mrk += "<div style='background:lightgrey;'><pre>";
    					codeOpen = true;
    				}
    				mrk += "\r\n" + parse[i].substr(4,parse[i].length);	
    			}
    			// --- (HR)
    			// *** (HR)
    			// ___ (HR)
    			else if (parse[i].substr(0,3) == "---" ||
    				     parse[i].substr(0,3) == "***" ||
						 parse[i].substr(0,3) == "___")
    			{
    				mrk += "<hr />";
    			}
    			//Checkbox (un-checked)
    			else if (parse[i].substr(0,4) == "- []") 
    			{
    				mrk += "<br />";
    				mrk += "<input type='checkbox' disabled=''>" + parse[i].substr(4,parse[i].length);		
    			}
    			//Checkbox (un-checked)
    			else if (parse[i].substr(0,5) == "- [ ]") 
    			{
    				mrk += "<br />";
    				mrk += "<input type='checkbox' disabled=''>" + parse[i].substr(5,parse[i].length);		
    			}
    			//Checkbox (checked)
    			else if (parse[i].substr(0,5) == "- [x]") 
    			{
    				mrk += "<br />";
    				mrk += "<input type='checkbox' checked='' disabled=''>" + parse[i].substr(5,parse[i].length);
    			}
    			else
    			{
    				if (listOpen)
    				{
    					mrk += "</ul>";
    					listOpen = false;
    				}
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