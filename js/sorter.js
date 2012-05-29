(function( window ){

	$p = window.Procila;
	$ = window.jQuery;

	$p.Sorter = {};
	$p.Sorter.sortMethod;

	$p.Sorter.sort = function( data ){

		var milestones = $p.Sorter.sorts.by_milestone( data );
		return milestones;

		var len = milestones.length;
		for( var i = 0; i < len; i++){

			var milestone = milestones[i];
			milestone.columns = $p.Sorter.sortMethod( milestone.issues );

		}

		return milestones;

	}

})(window);

(function( window ){

	$p.Sorter.sorts = {};

	$p.Sorter.sorts.by_milestone = function( data ){

		var milestones = [];

		var new_milestone = function( milestone, milestones ){
			obj = {
				"title" : milestone.title,
				"issues" : [],
				"columns" : []
			};
			milestones.push(obj);
			return obj;
		};

		var find_milestone = function ( title, milestones ){
			var len = milestones.length;
			for( var i = 0; i < len; i++ ){
				if( milestones[i].title == title )
					return milestones[i];
			}
			return false;
		}

		var unassigned = {
			"title" : "Unassigned",
			"issues" : [],
			"columns" : []
		};

		var len = data.length;
		for( var i = 0; i < len; i++ ){

			var issue = data[i];

			var search = issue.milestone;
			if( search === null ){
				unassigned.issues.push(issue);
				continue;
			}

			var milestone = find_milestone( search.title, milestones );
			if( milestone === false ){
				milestone = new_milestone( search, milestones );
			}

			milestone.issues.push(issue);

		}

		if(unassigned.issues.length !== 0){
			milestones.push(unassigned);
		}

		return milestones;

	}

	$p.Sorter.sorts.by_user = function ( data ){

		var new_user = function( title, avatar, users ){
			obj = $p.createColumn( title, '', avatar );
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
				user = new_user( assignee.login, assignee.avatar_url, users );
			}

			user.issues.push(issue);

		}

		if(unassigned.issues.length !== 0){
			users.push(unassigned);
		}

		return users;

	}

	$p.Sorter.sorts.by_label = function( data ){

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

	$p.Sorter.sortMethod = $p.Sorter.sorts.by_user;

})(window);