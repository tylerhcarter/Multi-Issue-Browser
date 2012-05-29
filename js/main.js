( function(window){

	var $p = window.Procila = {};
	var $ = window.jQuery;

	// Repainting happens when we update the data
	var data_callbacks = [];
	function notify( data ){
		var len = data_callbacks.length;
		for( var i = 0; i < len; i++ ){
			data_callbacks[i](data);
		}
	}

	$p.registerDataHandler = function( callback ){
		data_callbacks.push( callback );
	}

	$p.start = function(){

		$("<div>", {
			"class" : "container",
			"html" : $("<div>", {
				"class" : "issue-data"
			})
		}).appendTo($("body"));
		$p.Sidebar.start();
		$p.load();

	};

	$p.lastLoad = [];
	$p.load = function(){
		$.getJSON("api.php", $p.loadHandler);
	}
	$p.loadHandler = function(data){
		var issues = data.issues;
		var page = parseInt( data.page, 10 );
		var per_page = parseInt( data.per_page, 10 );

		$p.lastLoad = $p.lastLoad.concat(issues);
		$p.drawData($p.lastLoad);
		if( issues.length == per_page ){
			$.getJSON("api.php?page="+ ( page + 1 ), $p.loadHandler);
		}
	}

	$p.drawData = function( rawData ){

		filteredData = $p.filters.filter(rawData);
		sortedData = $p.Sorter.sort( filteredData );
		notify(sortedData);
		$p.data = {
			"raw" : rawData,
			"filtered" : filteredData,
			"sorted" : sortedData,
		};

	}
	$p.redraw = function(){
		$p.drawData($p.data.raw);
	}

} )( window );