<?php
	$html = @file_get_contents($_POST["urlAjax"]);
	if (preg_match("/<title>(.*?)<\/title>/i", $html, $matches)) {
		$arrData = array('title'=>$matches[1]);
		echo json_encode($arrData);
	} else {
		echo "false";
	}
?>
