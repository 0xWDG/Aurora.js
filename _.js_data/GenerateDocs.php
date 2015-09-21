<?php
/* GENERATE DOCUMENTATIONS */
/* PHPDOC STYLE            */
/* Q'N'D => QUICK&DIRTY.
   Don't blame anyone for this file.
*/

// Get the version (name of dir, splitted into dots)
$version 	 = end(explode("/",__dir__));
$version 	 = "v" . substr($version, 0, 1) . "." . substr($version, 1, 1) . "." . substr($version, 2, 1);

// WIKI WIKI!
$WIKI        = "                	     _    _____ \r\n";
$WIKI       .= "            	        | |  / ____|\r\n";
$WIKI       .= "        	            | |  | (___ \r\n";
$WIKI       .= "    	            _   | |  \\___ \\\r\n";
$WIKI       .= "  	 ______    _   | |__| |  ____) |\r\n";
$WIKI       .= " 	|______|  (_)   \\____/  |______/\r\n";
$WIKI       .= "# Function List ({$version})\r\n";
$WIKI       .= "\r\n";

// Get the file to parse
$file        = "_.js";
$file        = file_get_contents($file);

// Get the template!
$replace     = "../_.js_data/GenerateDocs.html";
$replace 	 = file_get_contents($replace);

// Make a nice array, that we gonna pare again?! (yes, terrible i know) Q'N'D
$functions   = array();

// is it a do we need to parse it, ignoring "/**", "*", "* " and "*/"
function isBlank ($s)
{
	return ($s == "* " Or $s == "*" Or $s == "/**" Or $s == "*/");
}

// oooh its a definition (annotation)
function isAnnotation ($s)
{
	return (substr($s,0,3) == "* @");
}

// Ok, sorry this is dirty stuff, but it works. (feel free to make it better ;))

// get all global things (:0)
preg_match_all("#this\.(.*)=(.*);#", 			$file, $thitest);

// Get the comments (yes)
preg_match_all("#/\*[^*]*\*+([^/][^*]*\*+)*/#", $file, $comtest);

// Get the function definitions (_.js)
preg_match_all("#(.*)\: function\s?\((.*)?\)#", $file, $rettest);

for ($i=0; $i < sizeof($rettest[0]); $i++) 
{
	// ok, re parsing function ;) 
	// -> remove : function, and spaces ;)
	$rettest[0][$i] = preg_replace("/\: function\s?/", null, $rettest[0][$i]);
	$rettest[0][$i] = preg_replace("/\s/", 	   		   null, $rettest[0][$i]);
	$rettest[1][$i] = preg_replace("/\s/", 			   null, $rettest[1][$i]);
	
	// Yeey! function!	
	$functions[$rettest[1][$i]]['function'] = $rettest[0][$i];

	// Exploding, a array, again, yes it are the annotation
	$ExplodeDataNow = explode("\n", $comtest[0][$i+1]);

	for ($x=0; $x < sizeof($ExplodeDataNow); $x++)
	{ 
		// Removing spaces, and retuns...
		$ExplodeDataNow[$x] = preg_replace("/         /", null, $ExplodeDataNow[$x]);
		$ExplodeDataNow[$x] = preg_replace("/\r/", 		  null, $ExplodeDataNow[$x]);

		// Do nothing...
		if ( isBlank($ExplodeDataNow[$x]) )
		{
			/* IGNORE ;) */
		}
		// Ok!, we got some annotation cool! parse it.
		elseif ( isAnnotation($ExplodeDataNow[$x]) )
		{
			$ExplodeDataNow[$x] = preg_replace("/\*\s/", null, $ExplodeDataNow[$x]);
			$functions[$rettest[1][$i]]['annotation'][] = $ExplodeDataNow[$x];
		}
		else 
		{ 
			// Ok, this looks weird, but this parses:
			// /**
			// * I WILL BE PARSED
			// *
			// * FUNCTION DEFINITION, TEXT BLA BLA
			$ExplodeDataNow[$x] = preg_replace("/\*\s/", null, $ExplodeDataNow[$x]);
			if ( $x > 2) 
				$functions[$rettest[1][$i]]['text'][] = $ExplodeDataNow[$x];
		}
	}
}

// The fun and tricky part, here we go processing the files! why here?, just becouse.
$replaceArray 		  = array();
$replaceArray['glob'] = null;
$replaceArray['menu'] = null;
$replaceArray['text'] = null;
$replaceArray['test'] = null;

for ($i=0; $i < sizeof($thitest[0])-1; $i++) 
{ 
	// 1 = DEF, 2 = VAL.

	// those regex things cause shit.
	if (!preg_match("/RX/", $thitest[1][$i]))
	{
		$replaceArray['glob'] .= "<li class=\"nav-chapter\"><a href=\"#def_".md5($thitest[1][$i])."\">{$thitest[1][$i]}</a></li>";
		$replaceArray['text'] .= "<a name=\"def_".md5($thitest[1][$i])."\"></a><h3 style='font-size: 200%;'>this.{$thitest[1][$i]}</h3><div style='background: lightyellow;'><p>{$thitest[2][$i]}</p></div><br /><br /><br /><br /><br />";
	}
}

// Put it in the layout (a sort of ;) )
foreach ($functions as $functionName => $functionValue) 
{
		# Terrible code... (did i say it before?)

		// Ok, the menu need some items (functions)
		$replaceArray['menu'] .= "<li class=\"nav-chapter\"><a href=\"#func_{$functionName}\">{$functionValue['function']}</a></li>";
		$WIKI				  .= "* {$functionValue['function']}\r\n";

		// And a 'a name' to navigate to
		$replaceArray['text'] .= "<a name=\"func_{$functionName}\">";
		$replaceArray['text'] .= "</a>";

		// ok, this terrible code is for showing it on the page
		$replaceArray['text'] .= "<h3 style='font-size: 200%;'>{$functionValue['function']}</h3><p>";
		$replaceArray['text'] .= implode("<br />", $functionValue['text']);
		$replaceArray['text'] .= "<br /><br /><div style='background: lightyellow;'><p>";
		$replaceArray['text'] .= implode("<br />", $functionValue['annotation']);
		$replaceArray['text'] .= "</p></div><br /><br /></p>";
		$replaceArray['text'] .= "<br /><br /><br /><br /><br />";
}

// Finally the end is coming, we'll putting it in the design
// $replace
$replace = preg_replace("/VERSION/", 	$version, 			   $replace);
$replace = preg_replace("/GLOBALS/", 	$replaceArray['glob'], $replace);
$replace = preg_replace("/MENU/", 		$replaceArray['menu'], $replace);
$replace = preg_replace("/CONTENT/", 	$replaceArray['text'], $replace);
$replace = preg_replace("/TESTS/", 		$replaceArray['test'], $replace);

// write it down.
file_put_contents("index.html", $replace);

// Update wiki!
file_put_contents("../_.js.wiki/Function List.md", $WIKI);

// i promise, that the _.js code is not so terrible as this one!
/// Changed: Added those nasty comments. (SEP'15)
?>