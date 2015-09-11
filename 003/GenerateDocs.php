<?php
/* GENERATE DOCUMENTATIONS */
/* PHPDOC STYLE            */
/* QUICK&DIRTY.
   Don't blame anyone for this file.
*/

$version 	 = end(explode("/",__dir__));
$version 	 = "v" . substr($version, 0, 1) . "." . substr($version, 1, 1) . "." . substr($version, 2, 1);

$file        = "_.js";
$file        = file_get_contents($file);

$replace     = "GenerateDocs.html";
$replace 	 = file_get_contents($replace);

$functions   = array();

function isBlank ($s)
{
	return ($s             == "* "  Or // *\s
			$s             == "*"   Or // *
		    $s             == "/**" Or // /**
		    $s             == "*/"  ); // */
}

function isAnnotation ($s)
{
	return (substr($s,0,3) == "* @");
}

	preg_match_all("#/\*[^*]*\*+([^/][^*]*\*+)*/#", $file, $comtest);
	preg_match_all("#(.*)\: function\s?\((.*)?\)#", $file, $rettest);

	for ($i=0; $i < sizeof($rettest[0]); $i++) {
		$rettest[0][$i] = preg_replace("/\: function\s?/", null, $rettest[0][$i]);
		$rettest[0][$i] = preg_replace("/\s/", 	   		   null, $rettest[0][$i]);
		$rettest[1][$i] = preg_replace("/\s/", 			   null, $rettest[1][$i]);
		
		$functions[$rettest[1][$i]]['function'] = $rettest[0][$i];
		$ExplodeDataNow = explode("\n", $comtest[0][$i+1]);

		for ($x=0; $x < sizeof($ExplodeDataNow); $x++) 
		{ 
			$ExplodeDataNow[$x] = preg_replace("/         /", null, $ExplodeDataNow[$x]);
			$ExplodeDataNow[$x] = preg_replace("/\r/", 		  null, $ExplodeDataNow[$x]);

			if ( isBlank($ExplodeDataNow[$x]) )
			{
				/* IGNORE ;) */
			}
			elseif ( isAnnotation($ExplodeDataNow[$x]) )
			{
				$ExplodeDataNow[$x] = preg_replace("/\*\s/", null, $ExplodeDataNow[$x]);
				$functions[$rettest[1][$i]]['annotation'][] = $ExplodeDataNow[$x];
			}
			else 
			{ 
				$ExplodeDataNow[$x] = preg_replace("/\*\s/", null, $ExplodeDataNow[$x]);
				if ( $x > 2) 
					$functions[$rettest[1][$i]]['text'][] = $ExplodeDataNow[$x];
			}
		}
	}

	// The fun and tricky part, here we go processing the files! why here?, just becouse.
	$replaceArray 		  = array();
	$replaceArray['menu'] = null;
	$replaceArray['text'] = null;

	foreach ($functions as $functionName => $functionValue) 
	{
		# code...
		$replaceArray['menu'] .= "<li class=\"nav-chapter\"><a href=\"#func_{$functionName}\">{$functionValue['function']}</a></li>";

		$replaceArray['text'] .= "<a name=\"func_{$functionName}\">";
		$replaceArray['text'] .= "</a>";

		$replaceArray['text'] .= "<h3 style='font-size: 200%;'>{$functionValue['function']}</h3><p>";
		$replaceArray['text'] .= implode("<br />", $functionValue['text']);
		$replaceArray['text'] .= "<br /><br /><div style='background: lightyellow;'><p>";
		$replaceArray['text'] .= implode("<br />", $functionValue['annotation']);
		$replaceArray['text'] .= "</p></div><br /><br /></p>";
		$replaceArray['text'] .= "<br /><br /><br /><br /><br />";
	}

	// $replace
	$replace = preg_replace("/VERSION/", 	$version, 			   $replace);
	$replace = preg_replace("/MENU/", 		$replaceArray['menu'], $replace);
	$replace = preg_replace("/CONTENT/", 	$replaceArray['text'], $replace);

	echo $replace;

	file_put_contents("index.html", $replace);

?>