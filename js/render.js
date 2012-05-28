(function( window ){

	$p = window.Procila;
	$ = window.jQuery;

	var renderData = function( data ){

		console.log( data );

		var container = $("<div>", {
			"class" : "container"
		});
		var milestones = [];

		var len = data.length;
		for( var i = 0; i < len; i++){
			milestones.push( renderMilestone( data[i].title, data[i].columns ) );
		}

		publishArray( container, milestones );

		$(".container").remove();
		$("body").append(container);

	}
	$p.registerDataHandler( renderData );

	var renderMilestone = function( name, data ){

		var milestone = $("<div>", {
			"class" : "milestone"
		});

		$("<div>", {
			"class" : "milestone-header",
			"text" : name
		}).appendTo(milestone);

		var columns = [];
		var len = data.length;
		for( var i = 0; i < len; i++ ){
			columns.push( renderColumn( data[i] ) );
			if( (i + 1) % 3 == 0 ){
				columns.push( $("<div>", {
					"class" : "clr"
				}));
			}
		}
		columns.push( $("<div>", {
					"class" : "clr"
				}));

		publishArray( milestone, columns );
		return milestone;

	}

	var renderColumn = function( data ){
		console.log( "Column");
		var issues = data.issues;
		var column = $("<div>", {
			"class" : "column"
		});

		$("<div>", {
			"class" : "column-header",
			"style" : "background-color: #" + data.color,
			"html" : $("<div>", {
				"class" : "title",
				"html" : "<div class=\"name\">" + data.title + "</div>"
			})
		}).appendTo(column);

		var html = [];

		var len = issues.length;
		for( var i = 0; i < len; i++ ){
			var issue = renderIssue( issues[i] );
			html.push( issue );
		}

		publishArray( column, html );
		return column;

	}

	var publishArray = function ( parent, elements ){
		var len = elements.length;
		for( var i = 0; i < len; i++ ){
			$(parent).append( elements[i] );
		}
	}

	var renderIssue = function( issue ){

		var html = "<div class=\"number\"><span class=\"pound\">#</span>" + issue.number + "</div>";
		html += "<div class=\"title\"><a href=\"" + issue.html_url + "\">" + issue.title + "</a></div>";

		return $("<div>", {
			"class" : "issue",
			"html" : html
		});

	};

})( window );