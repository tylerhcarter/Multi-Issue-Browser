(function(window){
	
	$p = window.Procila;

	$p.createMilestone = function( title ){

		title = title || "";

		return {
			"title" : "",
			"class" : "milestone",
			"columns" : []
		};
	}

	$p.createColumn = function( title, color, avatar ){

		title = title || "";
		color = color || intToARGB(hashCode(title)).substring(0, 6);
		avatar = avatar || "";
		
		return {
			"title" : title,
			"color" : color,
			"avatar" : avatar,

			"class" : "column",
			"header-class" : "column-header",

			"issues" : []
		};
	}

	function hashCode(str) {
	    var hash = 0;
	    for (var i = 0; i < str.length; i++) {
	       hash = str.charCodeAt(i) + ((hash << 5) - hash);
	    }
	    return hash;
	} 

	function intToARGB(i){
	    return ((i>>24)&0xFF).toString(16) + 
	           ((i>>16)&0xFF).toString(16) + 
	           ((i>>8)&0xFF).toString(16) + 
	           (i&0xFF).toString(16);
	}

})(window);