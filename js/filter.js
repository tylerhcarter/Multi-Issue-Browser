(function( window ){
	
	$p = window.Procila;
	$p.filters = {};

	var callbacks = [];
	$p.filters.filter = function( data ){
		var len = callbacks.length;
		for( var i = 0; i < len; i++ ){
			data = callbacks[i](data);			
		}
		return data;
	}

	$p.filters.register = function( callback ){
		callbacks.push( callback );
	}


})(window);

(function( window ){
	
	$p = window.Procila;
	
	$p.filters.search = {
		"searchTerm" : "",
		"filter" : function( data ){

			var results = [];
			var text = $p.filters.search.searchTerm;

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

			return results;
		}
	};
	$p.filters.register( $p.filters.search.filter );

	$p.filters.user = {
		"searchUser" : "",
		"filter" : function( data ){

			var results = [];
			var user = $p.filters.user.searchUser;

			if( user == "" ){
				return data;
			}

			var len = data.length;
			for( var i = 0; i < len; i++ ){

				var issue = data[i];
				if( issue.assignee === null ){
					continue;
				}

				if( issue.assignee.login.toUpperCase() === user.toUpperCase() ){
					results.push( issue );
				}

			}

			return results;
		}
	};
	$p.filters.register( $p.filters.user.filter );


})(window);