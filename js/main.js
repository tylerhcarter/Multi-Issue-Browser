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
		createInfoBar();
		$p.load();
	};

	$p.load = function(){
		$.getJSON("api.php", function(data){
			$p.lastLoad = data;
			$p.drawData(data);
		});
	}

	$p.drawData = function( rawData ){

		sortedData = $p.Sorter.sort( rawData );
		notify(sortedData);
		$p.data = {
			"raw" : rawData,
			"sorted" : sortedData
		};

	}
	$p.redraw = function(){
		$p.drawData($p.data.raw);
	}

	var searchTerm = '';
	function filterByText( text ){

		if( text == searchTerm ){
			return;
		}else{
			searchTerm = text;
		}

		var data = $p.lastLoad;
		var results = [];

		var len = data.length;
		for( var i = 0; i < len; i++ ){

			var issue = data[i];
			if( issue.title.toUpperCase().indexOf( text.toUpperCase() ) !== -1 ){
				results.push(issue);
				continue;
			}

			if( issue.assignee !== null){
				if( issue.assignee.login.toUpperCase().indexOf( text.toUpperCase() ) !== -1 ){
					results.push(issue);
					continue;
				}
			}

			if( issue.labels.length !== 0 ){

				var c = issue.labels.length;
				for( var x = 0; x < c; x++ ){
					if( issue.labels[x].name.toUpperCase().indexOf( text.toUpperCase() ) !== -1 ){
						results.push(issue);
						continue;
					}
				}

			}

		}

		$p.drawData(results);

	}

	function createInfoBar(){

		var bar = $("<div>", {
			"class" : "content"
		});

		$("<a>", {
			"text" : "User",
			"click" : function(){
				$p.sortType = "user",
				$p.redraw();
			}
		}).appendTo(bar);

		$("<a>", {
			"text" : "Label",
			"click" : function(){
				$p.sortType = "label",
				$p.redraw();
			}
		}).appendTo(bar);

		$("<input>", {
			"type" : "text",
			"id" : "search",
			"keyup" : function(){
				var text = $(this).val();
				filterByText(text);
			}
		}).appendTo(bar);

		$("<div>", {
			"class" : "info-bar",
			"html" : bar
		}).appendTo($("body"));

	}

} )( window );