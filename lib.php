<?php

function get_header( $header_key, $headers_strings ){
	
	$headers = get_headers_array( $headers_strings );
	return $headers[ $header_key ];

}

function get_headers_array( $headers ){

	$headers_arr = array();
	foreach( $headers as $header_string ){
		$parts = explode ( ":", $header_string );

		if( isset($parts[1]) )
			$headers_arr[ $parts[0] ] = $parts[1];
		else
			$headers_arr[] = $parts[0];
	}

	return $headers_arr;

}

function generate_color($text,$min_brightness=100,$spec=10)
{
	// Check inputs
	if(!is_int($min_brightness)) throw new Exception("$min_brightness is not an integer");
	if(!is_int($spec)) throw new Exception("$spec is not an integer");
	if($spec < 2 or $spec > 10) throw new Exception("$spec is out of range");
	if($min_brightness < 0 or $min_brightness > 255) throw new Exception("$min_brightness is out of range");


	$hash = md5($text);  //Gen hash of text
	$colors = array();
	for($i=0;$i<3;$i++)
		$colors[$i] = max(array(round(((hexdec(substr($hash,$spec*$i,$spec)))/hexdec(str_pad('',$spec,'F')))*255),$min_brightness)); //convert hash into 3 decimal values between 0 and 255

	if($min_brightness > 0)  //only check brightness requirements if min_brightness is about 100
		while( array_sum($colors)/3 < $min_brightness )  //loop until brightness is above or equal to min_brightness
			for($i=0;$i<3;$i++)
				$colors[$i] += 10;	//increase each color by 10

	$output = '';

	for($i=0;$i<3;$i++)
		$output .= str_pad(dechex($colors[$i]),2,0,STR_PAD_LEFT);  //convert each color to hex and append to output

	return '#'.$output;
}

function getContrast($hexcolor){

	$r = hexdec(substr($hexcolor,0,2));
	$g = hexdec(substr($hexcolor,2,2));
	$b = hexdec(substr($hexcolor,4,2));
	$yiq = (($r*299)+($g*587)+($b*114))/1000;
	return ($yiq >= 128) ? 'black' : 'white';
}