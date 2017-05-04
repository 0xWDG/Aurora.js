<?php
/* GENERATE DOCUMENTATIONS */
/* PHPDOC STYLE            */
/* Q'N'D => QUICK&DIRTY.
   Don't blame anyone for this file.
*/

$debug=false;

function fullText ( $fromArray, $start )
{
	$myTemp=null;
	for ($i=$start; $i < sizeof($fromArray); $i++) { 
		$myTemp .= " " . $fromArray[$i];
	}
	return substr($myTemp, 1);
}

function isBeta ( )
{
	$ver = (@end(@explode("/",__dir__)))+1;
	if (strlen($ver) == 1) $ver = "00".$ver;
	if (strlen($ver) == 2) $ver = "0". $ver;

	return !file_exists('../' . $ver . '/_.js'); // !exists = beta
}

// Get the version (name of dir, splitted into dots)
$version 	 = @end(explode("/",__dir__));
$version 	 = "v" . substr($version, 0, 1) . "." . substr($version, 1, 1) . "." . substr($version, 2, 1);

// WIKI WIKI!
if(isBeta())
$LOGO        = "                         _          \r\n".
			   "                        (_)         \r\n";
else
$LOGO        = ""."".""."".""."".""."".""."".""."".""."";
$LOGO       .= "                         _    _____ \r\n";
$LOGO       .= "                        | |  / ____|\r\n";
$LOGO       .= "                        | |  | (___ \r\n";
$LOGO       .= "                    _   | |  \\___  \\\r\n";
$LOGO       .= "     ______    _   | |__| |  ____) |\r\n";
$LOGO       .= "    |______|  (_)   \\____/  |______/\r\n";
if(isBeta())                               //v.0.0.0
$LOGO       .= "                         " . $version . " Beta\r\n";
else
$LOGO       .= "                        " . $version . " Final\r\n";

$WIKI        = $LOGO;
$WIKI       .= "# Function List ({$version})\r\n";
$WIKI       .= "\r\n<table width='100%'><tr><td>For</td><td>Function</td><td>Documentation</td><!--<td>Wiki</td>--></tr>";

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
	$MyStar = explode("*", $s);
	$MyStar = "*".$MyStar[1];
	return (substr($MyStar,0,3) == "* @");
}

// Ok, sorry this is dirty stuff, but it works. (feel free to make it better ;))

// get all global things (:0)
preg_match_all("#this\.(.*)=(.*);#", 			$file, $thitest);

// Get the comments (yes)
preg_match_all("#/\*[^*]*\*+([^/][^*]*\*+)*/#", $file, $comtest);

// Get the function definitions (_.js)
preg_match_all("#(.*)\: function\s?\((.*)?\)#", $file, $rettest);

if ( sizeof($rettest) == 0) exit('WTF? No functions?');

for ($i=0; $i < sizeof($rettest[2]); $i++) 
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

		// Ok!, we got some annotation cool! parse it.
		// Do nothing...
		if ( isBlank($ExplodeDataNow[$x]) )
		{
			/* IGNORE ;) */
		}		
		elseif ( isAnnotation($ExplodeDataNow[$x]) )
		{
			$ExplodeDataNow[$x] = preg_replace("/\*\s/", null, $ExplodeDataNow[$x]);
			$functions[$rettest[1][$i]]['annotation'][] = $ExplodeDataNow[$x];

			if ($debug) echo "ANO({$rettest[1][$i]}): " . $ExplodeDataNow[$x] . PHP_EOL;
		}
		else 
		{ 
			// Ok, this looks weird, but this parses:
			// /**
			// * I WILL BE PARSED
			// *
			// * FUNCTION DEFINITION, TEXT BLA BLA

			// echo $ExplodeDataNow[$x] . PHP_EOL;
			// $ExplodeDataNow[$x] = preg_replace("/\*\s/", null, $ExplodeDataNow[$x]);
			// echo $ExplodeDataNow[$x] . PHP_EOL;

			if ($debug) echo "SOMETHING({$rettest[1][$i]}): " . $ExplodeDataNow[$x] . PHP_EOL;
			$ExplodeDataNow[$x] = explode("*", $ExplodeDataNow[$x]);
			$ExplodeDataNow[$x] = $ExplodeDataNow[$x][1];

			if ( $x > 1 && $ExplodeDataNow[$x] !== "/") 
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
		$functionValue['function'] = implode(", ", explode(",", $functionValue['function'])); //Preg fun :P
		
		# Terrible code... (did i say it before?)
	    $needsWrapper  = true;
	    $isCLIOnly     = false;
	    $isWebOnly     = false;
	    $isUniversal   = true;
		$isDeprecated  = false;
		$alternative   = false;
		$toDo          = false;
		$isNew         = false;
		$isInternal    = false;
		$warning       = false;
		$warning_data  = null;
		$toDO_data     = null;
		$example       = null;
		$removedIn     = @end(@explode("/",__dir__));
		$parameterlist = "\r\n#### Parameter list\r\n<table><tr><td>Type</td><td>@var</td><td>Description</td><td>Required</td></tr>";

		if ($debug) 
		{
			$ex = explode("(", $functionValue['function']);

			if ( sizeof($functionValue['annotation']) == 0)
				echo('[' . $ex[0] . '] ERROR ANNOTATION FAIL'.PHP_EOL.'GOT:' . print_r($functionValue) . PHP_EOL);
		}
		for ($i=0; $i < sizeof($functionValue['annotation']); $i++) 
		{ 
			$a_data = explode("@", $functionValue['annotation'][$i]);
			$a_data = "@".$a_data[1];			
			$a_data = explode(" ", $a_data);

			if ($a_data[0] == "@cli")
			{
				$isCLIOnly   = true;
				$isUniversal = false;
			}

			if ($a_data[0] == "@web")
			{
				$isWebOnly   = true;
				$isUniversal = false;
			}

			if ($a_data[0] == "@universal")
			{
				$isUniversal  = true;
			}

			if ($a_data[0] == "@deprecated")
			{
				$isDeprecated  = true;
			}

			if ($a_data[0] == "@alternative")
			{
				$alternative   = $a_data[1];
			}

			if ($a_data[0] == "@removed")
			{
				$removedIn     = $a_data[1];
			}

			if ($a_data[0] == "@return")
			{
				$returning     = $a_data[1];
			}

			if ($a_data[0] == "@internal")
			{
				$isInternal     = true;
			}
			if ($a_data[0] == "@param")
			{
				$parameterlist .= "<tr>" . 
									"<td>" . $a_data[1] . "</td>" .
									"<td>" . $a_data[2] . "</td>" .
									"<td>" . fullText($a_data, 3) . "</td>" .
									"<td>" . (preg_match("/\[/", $a_data[2])?'Optional':'Required') . "</td>" .
								  "</tr>";

				if(@$a_data[3] == "Wrapper" && (preg_match("/\[/", $a_data[2])?'o':'r') == "o" )
					$needsWrapper = false;
			}

			if ($a_data[0] == "@todo")
			{
				$toDo         = true;
				$toDO_data    = fullText($a_data, 1);
			}

			if ($a_data[0] == "@warning")
			{
				$warning      = true;
				$warning_data = fullText($a_data, 1);
			}

			if ($a_data[0] == "@new" Or $a_data[0] == "announce")
			{
				$isNew        = true;
				if ( isset ( $a_data[1] ) )
				{
					if ($version === $a_data[1]) //version_compare(substr($version, 1), substr($a_data[1], 1)) === 0
						$isNew = true;
					else
						$isNew = false;
				}
			}

			if ($a_data[0] == "@example")
			{
				$temp         = $functionValue['annotation'][$i];
				$temp         = preg_replace("/@example\s/",null, $temp);
				$example     .= "`" . $temp . "`<br><br>";
			}
		}

		$parameterlist .= "</table>";

		if ($isUniversal) $icon = '🌍';
		if ($isCLIOnly)   $icon = '🖥';
		if ($isWebOnly)   $icon = '🕸';
		// $function_before .= ' | ';

		$function_before = ($isDeprecated) ? '⚠️ <s>'  : '';
		$function_after  = ($isDeprecated) ? '</s>' : '';

		if($function_before=='' && $toDo)  $function_before .= '📝 '; // Is under construction
		if($function_before=='' && $isNew) $function_before .= '💡 '; // Light bulb (new)
		if($isInternal)					   $function_before .= '⛔️ '; // Internal use, Overwrite all others

		// Ok, the menu need some items (functions)
		$replaceArray['menu'] .= "<li class=\"nav-chapter\"><a href=\"#func_{$functionName}\">{$function_before}{$functionValue['function']}{$function_after}</a></li>";

		if ( !isBeta() )
			$WIKI				  .= "<tr><td>{$icon}</td><td>{$function_before}{$functionValue['function']}{$function_after}</td><!--<td><a target='_blank' href='https://wdg.github.io/_.js/" . @end(@explode("/",__dir__)) . "/index.html#func_{$functionName}'>Documentation</td>--><td><a href='https://github.com/wdg/_.js/wiki/function_{$functionName}'>Documentation</a></td></tr>";
		else
			$WIKI				  .= "<tr><td>{$icon}</td><td>{$function_before}{$functionValue['function']}{$function_after}</td><!--<td><a target='_blank' href='https://wdg.github.io/_.js/" . @end(@explode("/",__dir__)) . "/index.html#func_{$functionName}'>Documentation</td>--><td><a href='https://github.com/wdg/_.js/wiki/flbeta_function_{$functionName}'>Documentation</a></td></tr>";

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
		 if ( $isDeprecated )
		 	$extra            .= "\r\n## Deprecated!\r\nWarning will be removed in [v{$removedIn}](https://github.com/wdg/_.js/wiki/Changed_in_" . implode('',explode(".", $removedIn)) .")\r\n";
		 if ( $alternative != false )
		 	$extra            .= "\r\nUse [_.{$alternative}(...)](https://github.com/wdg/_.js/wiki/" . (isBeta()?'flbeta_':'') . "function_{$alternative}) as alternative.\r\n";
		 	$extra 			  .= "\r\n<br>\r\n";
		 //⛔️
		 if ( $isInternal )
		 	$extra            .= "\r\n## Internal Function!\r\n⛔️ Please do **not** use for plugins!\r\n\r\n<br>\r\n";
		 if ( $isCLIOnly )
		 	$extra            .= "\r\n### 🖥 CLI Only\r\nThis function is only for the Command Line Interface\r\n\r\n<br>\r\n";
		 if ( $isWebOnly )
		 	$extra            .= "\r\n### 🕸 Web Only\r\nThis function is only for websites\r\n\r\n<br>\r\n";
		 if ( $isUniversal )
		 	$extra            .= "\r\n### 🌍 Universal function\r\nThis function is for the Command Line Interface and Websites!\r\n\r\n<br>\r\n";

		 $extra               .= $parameterlist . "<br>\r\n";
		 
		 if ( $toDo )
		 	$extra            .= "\r\n#### Todo:\r\n{$toDO_data}\r\n\r\n<br>\r\n";
		 if ( $warning )
		 	$extra            .= "\r\n#### ⚠️\r\n{$warning_data}\r\n\r\n<br>\r\n";
		 $extra               .= "\r\n#### Example:\r\n{$example}\r\n\r\n<br>\r\n";
		 if ( isset ( $returning ) )
		 $extra               .= "\r\n#### Returns:\r\n{$returning}\r\n\r\n<br>\r\n";

		 $_wrapper             = ($needsWrapper) ? "('.wrapper')" : null;

		 writeToWiki($functionName, "#### {$function_before}`_{$_wrapper}.{$functionValue['function']}`{$function_after}\r\n<br />" .
		 							($isDeprecated ? "\r\n" . '##### 🚧 DO NOT USE ANYMORE!!!<br>' . "\r\n" : "") 									.
			       				    implode("<br />", $functionValue['text'])."<br>\r\n"   											.
								    $extra													 										.
								    (isBeta() 
								    	? "<br><br>[Back to function list](https://github.com/wdg/_.js/wiki/Function%20List%20(Beta))\r\n"
								    	: "<br><br>[Back to function list](https://github.com/wdg/_.js/wiki/Function%20List)\r\n")
								    );
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
if ( !isBeta() )
	file_put_contents("../_.js.wiki/Function List.md", $WIKI);
else
	file_put_contents("../_.js.wiki/Function List (Beta).md", $WIKI);

// i promise, that the _.js code is not so terrible as this one!
/// Changed: Added those nasty comments. (SEP'15)
function writeToWiki($filename, $contents)
{
	global $LOGO;

	$write  = $LOGO;
	// if ( preg_match("/⚠️/", $contents) )
		// $write .= "# ⚠️ Function {$filename}\r\n\r\n";
	// elseif ( preg_match("/🚧/", $contents))
		// $write .= "# 🚧 Function {$filename}\r\n\r\n";
	// elseif ( preg_match("/📝/", $contents))
		// $write .= "# 📝 Function {$filename}\r\n\r\n";
	// elseif ( preg_match("/💡/", $contents))
		// $write .= "# 💡 Function {$filename}\r\n\r\n";
	// else
		$write .= "# Function {$filename}\r\n\r\n";
	$write .= $contents;

	// Update wiki! (Only if finial (final = one version behind.))
	if ( !isBeta() )
		file_put_contents("../_.js.wiki/functions/function_{$filename}.md", $write);
	else
		file_put_contents("../_.js.wiki/functions/flbeta_function_{$filename}.md", $write);
}
?>