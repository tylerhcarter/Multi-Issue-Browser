(function( window ){

	$p = window.Procila;
	$ = window.jQuery;

	var renderData = function( data ){

		var milestones = [];

		var len = data.length;
		for( var i = 0; i < len; i++ ){
			milestones.push( renderMilestone( data[i].title, data[i].issues ) );
		}

		$(".issue-data").html("");
		publishArray( ".issue-data", milestones );

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

		var issues = [];

		var len = data.length;
		for( var i = 0; i < len; i++ ){
			issues.push( renderIssue(data[i]) );
			issues.push( renderIssueData( data[i]) );
		}

		publishArray( milestone, issues );
		return milestone;

	}

	var publishArray = function ( parent, elements ){
		var len = elements.length;
		for( var i = 0; i < len; i++ ){
			$(parent).append( elements[i] );
		}
	}

	var renderIssue = function( issue ){

		var html = "<div class=\"number\"><span class=\"pound\">#</span>" + issue.number + "</div>";
		html += "<div class=\"title\">" + issue.title + "</div>";
		html += "<div class=\"author\">Created By " + issue.user.login + ".</div>";

		return $("<div>", {
			"class" : "issue",
			"html" : html,
			"click" : function(){
				$(this).next().toggle();
				$(this).toggleClass("expanded");
			}
		});

	};

	var renderIssueData = function( issue ){

		var html = ""

		var assignee = "Not currently assigned.";
		if( issue.assignee !== null ){
			assignee = "Assigned to <span class=\"user\">" + issue.assignee.login + ".</span>";
		}

		html += "<div class=\"issue-header\">";
			html += "<div class=\"author\">" + assignee + "</div>";
		html += "</div>";

		html += "<div class=\"issue-content\">";
			html += "<div class=\"description\">" + issue.body_html + "</div>";
		html += "</div>";

		return $("<div>", {
			"class" : "issue-meta",
			"html" : html
		});

	};

})( window );