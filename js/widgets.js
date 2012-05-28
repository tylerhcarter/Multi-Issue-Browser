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

		var display = function( sidebar ){

			var widget = $p.Sidebar.createWidget();

			var dropdown = $("<select>", {
				"id" : "user",
				"change" : function(){
					$p.filters.user.searchUser = $(this).val();
					$p.redraw();
				}
			});
			$(dropdown).appendTo(widget);

			$("<option>", {
				"text" : "",
				"value" : "",
			}).appendTo(dropdown);
			$("<option>", {
				"text" : "Tyler Carter",
				"value" : "chacha",
			}).appendTo(dropdown);
			$("<option>", {
				"text" : "Shannon Dunn",
				"value" : "shannondunn",
			}).appendTo(dropdown);

		}
		$p.Sidebar.register( display );

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


})(window);