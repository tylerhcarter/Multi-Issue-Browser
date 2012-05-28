(function( window ){

	$p = window.Procila;
	$ = window.jQuery;

	$p.Sorter = {};

	$p.Sorter.sort = function( data ){

		var sort_type = "label";

		var columns = sort_by_user(data);
		//var columns = sort_by_label(data);

		return[{
			"title" : "Milestone",
			"columns" : columns
		}];

	}

	function sort_by_user( data ){

		var new_user = function( title, users ){
			obj = $p.createColumn( title );
			users.push(obj);
			return obj;
		};

		var find_user = function ( title, users ){
			var len = users.length;
			for( var i = 0; i < len; i++ ){
				if( users[i].title == title )
					return users[i];
			}
			return false;
		}

		var users = [];
		var unassigned = $p.createColumn( "Unassigned" );

		var len = data.length;
		for( var i = 0; i < len; i++ ){

			var issue = data[i];

			var assignee = issue.assignee;
			if( assignee === null ){
				unassigned.issues.push(issue);
				continue;
			}

			var user = find_user( assignee.login, users );
			if( user === false ){
				user = new_user( assignee.login, users );
			}

			user.issues.push(issue);

		}

		if(unassigned.issues.length !== 0){
			users.push(unassigned);
		}

		console.log(users);

		return users;

	}

	function sort_by_label( data ){

		var new_label = function( title, color, labels ){
			obj = $p.createColumn( title, color );
			labels.push(obj);
			return obj;
		};

		var find_label = function ( title, labels ){
			var len = labels.length;
			for( var i = 0; i < len; i++ ){
				if( labels[i].title == title )
					return labels[i];
			}
			return false;
		}

		var labels = [];
		var unlabeled = $p.createColumn( "Unlabeled" );

		var len = data.length;
		for( var i = 0; i < len; i++ ){

			var issue = data[i];

			var count = issue.labels.length;
			if( count === 0 ){
				unlabeled.issues.push( issue );
			}

			for( var x = 0; x < count; x++ ){

				var label = issue.labels[x];
				var label_obj = find_label( label.name, labels);

				if( label_obj === false ){
					label_obj = new_label( label.name, label.color, labels);
				}

				label_obj.issues.push(issue);

			}

		}

		if(unlabeled.issues.length !== 0){
			labels.push(unlabeled);
		}

		return labels;

	}

})(window);