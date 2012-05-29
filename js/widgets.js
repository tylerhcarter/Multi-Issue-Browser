(function(window){
	
	$p = window.Procila;

	$p.Search = (function(window){
		var obj = {};
		var $p = window.Procila;

		var display = function( sidebar ){

			var widget = $p.Sidebar.createWidget();

			$("<input>", {
				"type" : "text",
				"id" : "search",
				"keyup" : function(){
					$p.filters.search.searchTerm = $(this).val();
					$p.redraw();
				}
			}).appendTo(widget);

		}
		$p.Sidebar.register( display );

		return obj;
	})(window);

	$p.Repos = (function(window){
		var obj = {};
		var $p = window.Procila;

		var display = function( sidebar ){

			var widget = $p.Sidebar.createWidget();

			var dropdown = $("<select>", {
				"id" : "repository",
				"change" : function(){
					console.log($(this).val())
				}
			});
			$(dropdown).appendTo(widget);

			$("<option>", {
				"text" : "1.1",
				"value" : "8",
			}).appendTo(dropdown);
			$("<option>", {
				"text" : "1.0.1",
				"value" : "7",
			}).appendTo(dropdown);

		}
		$p.Sidebar.register( display );

		return obj;
	})(window);

	$p.Users = (function(window){
		var obj = {};
		var $p = window.Procila;
		var widget;

		var init = function( sidebar ){
			widget = $p.Sidebar.createWidget();
			 $("<select>", {
				"id" : "user",
				"change" : function(){
					$p.filters.user.searchUser = $(this).val();
					$p.redraw();
				}
			}).appendTo(widget);
		}
		$p.Sidebar.register( init );

		var display = function( data ){

			var users = grab_users($p.lastLoad);

			var dropdown = $("#user");
			dropdown.html("");
			

			$("<option>", {
				"text" : "",
				"value" : "",
			}).appendTo(dropdown);
			
			var len = users.length;
			for( var i = 0; i < len; i++ ){

				$("<option>", {
					"text" : users[i].login,
					"value" : users[i].login,
				}).appendTo(dropdown);

				if( $p.filters.user.searchUser == users[i].login ){
					$("#user").val(users[i].login);
				}
			}

		}
		$p.registerDataHandler( display );

		function grab_users( data ){

			var add_user = function ( user, users ){
				var len = users.length;
				if(len !== 0){
					for( var i = 0; i < len; i++ ){
						if( users[i].login == user.login )
							return; // already have them
					}
				}
				users.push( user );

			}

			var users = [];
			var len = data.length;
			for( var i = 0; i < len; i++ ){

				var issue = data[i];
				if( issue.assignee !== null ){
					add_user( issue.assignee, users);
				}

			}

			return users;

		}

		return obj;
	})(window);

	$p.Sort = (function(window){
		var obj = {};
		var $p = window.Procila;

		var display = function( sidebar ){

			var widget = $p.Sidebar.createWidget();

			$("<a>", {
				"text" : "User",
				"click" : function(){
					$p.Sorter.sortMethod = $p.Sorter.sorts.by_user;
					$p.redraw();
				}
			}).appendTo(widget);

			$("<a>", {
				"text" : "Label",
				"click" : function(){
					$p.Sorter.sortMethod = $p.Sorter.sorts.by_label;
					$p.redraw();
				}
			}).appendTo(widget);

		}
		$p.Sidebar.register( display );

		return obj;
	})(window);

	$p.Info = (function(window){
		var obj = {};
		var $p = window.Procila;

		var widget;

		var display = function( sidebar ){
			widget = $p.Sidebar.createWidget();
		}
		$p.Sidebar.register( display );

		$p.registerDataHandler( function(data){
			widget.text($p.lastLoad.length);
		});

		return obj;
	})(window);


})(window);