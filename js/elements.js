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
		color = color || "CCCCCC";
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

})(window);