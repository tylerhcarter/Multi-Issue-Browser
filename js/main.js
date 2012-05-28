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
			"class" : "container"
		}).appendTo($("body"));
		$p.Sidebar.start();
		$p.load();

	};

	$p.load = function(){
		$.getJSON("api.php", function(data){
			$p.lastLoad = data;
			$p.drawData(data);
		});
	}

	$p.drawData = function( rawData ){

		filteredData = $p.filters.filter(rawData);
		sortedData = $p.Sorter.sort( filteredData );
		notify(sortedData);
		$p.data = {
			"raw" : rawData,
			"sorted" : sortedData
		};

	}
	$p.redraw = function(){
		$p.drawData($p.data.raw);
	}

} )( window );