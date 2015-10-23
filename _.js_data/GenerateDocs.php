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
$LOGO        = "                	     _    _____ \r\n";
$LOGO       .= "            	        | |  / ____|\r\n";
$LOGO       .= "        	            | |  | (___ \r\n";
$LOGO       .= "    	            _   | |  \\___  \\\r\n";
$LOGO       .= "  	 ______    _   | |__| |  ____) |\r\n";
$LOGO       .= " 	|______|  (_)   \\____/  |______/\r\n";

$WIKI        = $LOGO;
$WIKI       .= "# Function List ({$version})\r\n";
$WIKI       .= "\r\n<table width='100%'><tr><td>Function</td><td>Documentation</td><td>Wiki</td></tr>";

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
	if (!preg_match("/RX/", $thitest[1][$i]) && !preg_match("/this\.(type|onerror|src)/", $thitest[1][$i]))
	{
		$replaceArray['glob'] .= "<li class=\"nav-chapter\"><a href=\"#def_".md5($thitest[1][$i])."\">{$thitest[1][$i]}</a></li>";
		$replaceArray['text'] .= "<a name=\"def_".md5($thitest[1][$i])."\"></a><h3 style='font-size: 200%;'>this.{$thitest[1][$i]}</h3><div style='background: lightyellow;'><p>{$thitest[2][$i]}</p></div><br /><br /><br /><br /><br />";
	}
}

// Put it in the layout (a sort of ;) )
foreach ($functions as $functionName => $functionValue) 
{
		# Terrible code... (did i say it before?)
		$isDeprecated  = false;
		$toDo          = false;
		$toDO_data     = null;
		$example       = null;
		$removedIn     = 0;
		$parameterlist = "# Parameter list\r\n<table><tr><td>Type</td><td>@var</td><td>Description</td><td>Required</td></tr>";
		for ($i=0; $i < sizeof($functionValue['annotation']); $i++) { 
			$a_data = explode(" ", $functionValue['annotation'][$i]);

			echo $a_data[0];

			if ($a_data[0] == "@deprecated")
			{
				$isDeprecated = true;
			}

			if ($a_data[0] == "@removed")
			{
				$removedIn    = $a_data[1];
			}

			if ($a_data[0] == "@return")
			{
				$return       = array($a_data[1], @$a_data[2]);
			}

			if ($a_data[0] == "@param")
			{
				$parameterlist .= "<tr>" .
									"<td>" . $a_data[1] . "</td>" .
									"<td>" . $a_data[2] . "</td>" .
									"<td>" . $a_data[3] . "</td>" .
									"<td>" . (preg_match("/\[/", $a_data[2])?'Optional':'Required') . "</td>" .
								  "</tr>";

								  echo "FOUND PARAM ($parameterlist)\r\n";
			}

			if ($a_data[0] == "@todo")
			{
				$toDo         = true;
				$toDO_data    = $a_data[1];
			}

			if ($a_data[0] == "@example")
			{
				$temp         = $functionValue['annotation'][$i];
				$temp         = preg_replace("/@example\s/",null, $temp);
				$example     .= "`" . $temp . "`<br><br>";
			}
		}

		$parameterlist = "</table>";

		$function_before = ($isDeprecated) ? '<s>'  : '';
		$function_after  = ($isDeprecated) ? '</s>' : '';

		// Ok, the menu need some items (functions)
		$replaceArray['menu'] .= "<li class=\"nav-chapter\"><a href=\"#func_{$functionName}\">{$function_before}{$functionValue['function']}{$function_after}</a></li>";
		$WIKI				  .= "<tr><td>{$functionValue['function']}</td><td><a target='_blank' href='https://wesdegroot.github.io/_.js/" . end(explode("/",__dir__)) . "/index.html#func_{$functionName}'>Documentation</td><td><a href='https://github.com/wesdegroot/_.js/wiki/function_{$functionName}'>Wiki</a></td></tr>";

		// And a 'a name' to navigate to
		$replaceArray['text'] .= "<a name=\"func_{$functionName}\">";
		$replaceArray['text'] .= "</a>";

		// ok, this terrible code is for showing it on the page
		$replaceArray['text'] .= "<h3 style='font-size: 200%;'>{$function_before}{$functionValue['function']}{$function_after}</h3><p>";
		$replaceArray['text'] .= implode("<br />", $functionValue['text']);
		$replaceArray['text'] .= "<br /><br /><div style='background: lightyellow;'><p>";
		$replaceArray['text'] .= implode("<br />", $functionValue['annotation']);
		$replaceArray['text'] .= "</p></div><br /><br /></p>";
		$replaceArray['text'] .= "<br /><br /><br /><br /><br />";

		 $extra                = null;
		 $extra               .= $parameterlist;
		 if ( $isDeprecated )
		 	$extra            .= "##### Deprecated!\r\nWarning will be removed in [{$removedIn}](https://github.com/wesdegroot/_.js/wiki/Changed_in_" . implode('',explode(".", $removedIn)) .")\r\n\r\n";
		 if ( $toDo )
		 	$extra            .= "##### Todo:\r\n{$toDO_data}\r\n\r\n";
		 $extra               .= "##### Example:\r\n{$example}\r\n\r\n";
		 
		 if(empty(parameterlist))
		 	exit('SHIT MISSING');

		 echo "\r\n-------------------------------------------------------\r\n";
		 echo $extra;
		 echo "-------------------------------------------------------\r\n";

		 writeToWiki($functionName, "#### {$function_before}`_('.wrapper').{$functionValue['function']}`{$function_after}\r\n<br />" .
			       				    implode("<br />", $functionValue['text'])."<br>\r\n* "   .
								    implode("\r\n* ", $functionValue['annotation']) . "\r\n" .
								    $extra													 .
								    "<br><br>[Back to function list](https://github.com/wesdegroot/_.js/wiki/Function%20List)\r\n");
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

$WIKI       .= "</table>\r\n";

// Update wiki! (Only if finial (final = one version behind.))
$ver = (end(explode("/",__dir__)))+1;
if (strlen($ver) == 1) $ver = "00".$ver;
if (strlen($ver) == 2) $ver = "0". $ver;
if ( file_exists ( '../' . $ver . '/_.js' ) )
	file_put_contents("../_.js.wiki/Function List.md", $WIKI);

// i promise, that the _.js code is not so terrible as this one!
/// Changed: Added those nasty comments. (SEP'15)

function writeToWiki($filename, $contents)
{
	global $LOGO;

	$write  = $LOGO;
	$write .= "# Function {$filename}\r\n\r\n";
	$write .= $contents;

	// Update wiki! (Only if finial (final = one version behind.))
	$ver = (end(explode("/",__dir__)))+1;
	if (strlen($ver) == 1) $ver = "00".$ver;
	if (strlen($ver) == 2) $ver = "0". $ver;
	if ( file_exists ( '../' . $ver . '/_.js' ) )
		file_put_contents("../_.js.wiki/functions/function_{$filename}.md", $write);
}
?>