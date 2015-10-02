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
	_.fn.md_str_repeat = function( str, num )
	{
    	return new Array( num + 1 ).join( str );
	};
	// Add a Plugin "Markdown"
	_.fn.markdown = function() {
        //var len = this.length;
        //while (len--) 
        var len=0;
        if ( true )
        {            
            var el = document.createElement('script');
                el.type = "text/javascript";
                el.src  = "https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js";
            document.head.appendChild(el);

            var mrk      = "";
            var codeOpen = false;
            var listOpen = false;
            var debug    = false;
            var openAt   = 0;

            // split all
            var parse    = this[len].innerHTML.split("\n");

            for (var i = 0; i < parse.length; i++)
            {
                //Check for general things
                //- Bold
                if(parse[i].match(/\*\*(.*)\*\*/g))
                {
                    if (!codeOpen)
                        parse[i] = parse[i].replace(/\*\*(.*)\*\*/g, "<b>$1</b>");
                }

                //- Italic
                if(parse[i].match(/\*(.*)\*/g))
                {
                    if (!codeOpen)
                        parse[i] = parse[i].replace(/\*(.*)\*/g, "<i>$1</i>");
                }

                //- Inline code!
                if(parse[i].match(/`(.*)`/g))
                {
                    if (!codeOpen)
                        parse[i] = parse[i].replace(/`(.*)`/g, "<style>pre.prettyprint{border:0 !important;}</style><div style='display:inline-block;word-break:break-all;word-wrap:break-word;white-space:pre;white-space:pre-wrap;background-color:#f5f5f5;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.15);-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;'><pre class=\"prettyprint\">$1</pre></div>");
                }

                //- image (![GitHub Logo](/images/logo.png))
                if(parse[i].match(/\(\!\[(.*)\]\((.*)\)\)/g))
                {
                    if (!codeOpen)
                        parse[i] = parse[i].replace(/\(\!\[(.*)\]\((.*)\)\)/g, "<img src='$2' alt='$1'>");
                }

                //- URL []()
                if(parse[i].match(/\[(.*)\]\((.*)\)/g))
                {
                    if (!codeOpen)
                        parse[i] = parse[i].replace(/\[(.*)\]\((.*)\)/g, "<a href='$2'>$1</a>");
                }

                //- URL
                if(parse[i].match(/(?![^<]*>|[^<>]*<\/(?!(?:p|pre)>))((https?:)\/\/[a-z0-9&#=.\/\-?_]+)/gi))
                {
                    if (!codeOpen)
                        parse[i] = parse[i].replace(/(?![^<]*>|[^<>]*<\/(?!(?:p|pre)>))((https?:)\/\/[a-z0-9&#=.\/\-?_]+)/gi, "<a href='$1'>$1</a>");
                }
                
                // OK parse the MarkDown ;)

                // Empty line (break)
                if (this.isEmpty(parse[i]))
                {
                    if (!this.isEmpty(parse[i-1]))
                        mrk += "<br />";
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
                            
                            if (debug)
                                console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                        }
                        mrk += "<br />";

                        if (debug)
                            console.log('[' + i + '] Rep-Empty: ' + parse[i]);
                    }

                    if (debug)
                        console.log('[' + i + '] Empty: ' + parse[i]);
                }

                // ##### H5
                else if (parse[i].substr(0,5) == "#####") 
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    mrk += "<h5>" + parse[i].substr(5, parse[i].length) + "</h5>";

                    if (debug)
                        console.log('[' + i + '] H5: ' + parse[i]);
                }

                // #### H4
                else if (parse[i].substr(0,4) == "####") 
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    mrk += "<h4>" + parse[i].substr(4, parse[i].length) + "</h4>";

                    if (debug)
                        console.log('[' + i + '] H4: ' + parse[i]);
                }

                // ### H3
                else if (parse[i].substr(0,3) == "###") 
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    mrk += "<h3>" + parse[i].substr(3, parse[i].length) + "</h3>";

                    if (debug)
                        console.log('[' + i + '] H3: ' + parse[i]);
                }

                // ## H2
                else if (parse[i].substr(0,2) == "##") 
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    mrk += "<h2>" + parse[i].substr(2, parse[i].length) + "</h2>";

                    if (debug)
                        console.log('[' + i + '] H2: ' + parse[i]);
                }

                // # H1
                else if (parse[i].substr(0,1) == "#") 
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    mrk += "<h1>" + parse[i].substr(1, parse[i].length) + "</h1>";

                    if (debug)
                        console.log('[' + i + '] H1: ' + parse[i]);
                }

                //Alt-H1
                //======
                else if (parse[i+1] == this.md_str_repeat('=', parse[i].length))
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    mrk += "<h1>" + parse[i] + "</h1>";
                    parse[i+1]='';

                    if (debug)
                        console.log('[' + i + '] ALT H1: ' + parse[i]);
                }

                //Alt-H2
                //------
                else if (parse[i+1] == this.md_str_repeat('-', parse[i].length))
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    mrk += "<h2>" + parse[i] + "</h2>";
                    parse[i+1]='';

                    if (debug)
                        console.log('[' + i + '] ALT-H2: ' + parse[i]);
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

                    if (debug)
                        console.log('[' + i + '] List: ' + parse[i]);
                }

                // \s\s\s\s CODE
                else if (parse[i].substr(0,4) == "    ") //Code
                {
                    if (!codeOpen)
                    {
                        mrk += "<style>pre.prettyprint{border:0 !important;}</style><div style='display:block;padding:9.5px;margin:0 0 10px;font-size:13px;line-height:20px;word-break:break-all;word-wrap:break-word;white-space:pre;white-space:pre-wrap;background-color:#f5f5f5;border:1px solid #ccc;border:1px solid rgba(0,0,0,0.15);-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;'><pre class=\"prettyprint\">";
                        codeOpen = true;
                        openAt   = i;
                        console.log('[' + i + '] Code Opened!!!');
                    }

                    mrk += "\r\n" + parse[i].substr(4,parse[i].length);	

                    if (debug)
                        console.log('[' + i + '] CS=' + ((codeOpen)?'Opened':'Closed') + '@' + openAt + '; Code: ' + parse[i]);
                }

                // --- (HR)
                // *** (HR)
                // ___ (HR)
                else if (parse[i].substr(0,3) == "---" ||
                         parse[i].substr(0,3) == "***" ||
                         parse[i].substr(0,3) == "___")
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    mrk += "<hr />";

                    if (debug)
                        console.log('[' + i + '] HR: ' + parse[i]);
                }

                //Checkbox (un-checked)
                else if (parse[i].substr(0,4) == "- []") 
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    mrk += "<br />";
                    mrk += "<input type='checkbox' disabled=''>" + parse[i].substr(4,parse[i].length);

                    if (debug)
                        console.log('[' + i + '] Checkbox (unchecked): ' + parse[i]);
                }

                //Checkbox (un-checked)
                else if (parse[i].substr(0,5) == "- [ ]") 
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    mrk += "<br />";
                    mrk += "<input type='checkbox' disabled=''>" + parse[i].substr(5,parse[i].length);

                    if (debug)
                        console.log('[' + i + '] Checkbox (unchecked): ' + parse[i]);
                }

                // Color!
                else if(parse[i].match(/\[c\=(.*)\](.*)\[\/c\]/g))
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    // Need to be a real, regex, since i'm not good with it.
                    // split split split.
                    var color = String(parse[i]).split('=');
                        color = String(color[1]).split(']')[0];
                    var texts = String(parse[i]).split(']');
                        texts = texts[1].split('[')[0];

                    mrk += "<font color='" + color + "'>" + texts + "</font>";

                    if (debug)
                        console.log('[' + i + '] Color: ' + parse[i]);
                }

                //Checkbox (checked)
                else if (parse[i].substr(0,5) == "- [x]") 
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    mrk += "<br />";
                    mrk += "<input type='checkbox' checked='' disabled=''>" + parse[i].substr(5,parse[i].length);

                    if (debug)
                        console.log('[' + i + '] Checkbox (checked): ' + parse[i]);
                }

                // Something we don't know.
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
                        
                        if (debug)
                            console.log('Code closed at ' + i + ' String: "' + parse[i] + '"');
                    }

                    mrk += parse[i];

                    if (debug)
                        console.log('[' + i + '] ??: ' + parse[i]);
                }

            };

            this[len].innerHTML = mrk;
        }
    };
}