(function(window){
	
	$p = window.Procila;
	$p.Sidebar = {};

	var sidebar;

	// Repainting happens when we update the data
	var callbacks = [];
	function notify(){
		var len = callbacks.length;
		for( var i = 0; i < len; i++ ){
			callbacks[i]( sidebar );
		}
	}

	$p.Sidebar.register = function( callback ){
		callbacks.push( callback );
	}

	$p.Sidebar.start = function(){

		sidebar = $("<div>", {
			"class" : "content",
			"id" : "sidebar"
		});

		$("<div>", {
			"class" : "info-bar",
			"html" : sidebar
		}).appendTo($(".container"));

		notify();

	}

	$p.Sidebar.createWidget = function(){

		var widget = $("<div>", {
			"class" : "widget"
		});

		$(widget).appendTo(sidebar);

		return widget;

	}

})(window);