function CitedBy(idPublication, title, year, ncitation) {  
	this._idPublication = idPublication;
	this._title = title;
	this._year = year;
	this._ncitation = ncitation;
	
	
	this.display = function() {
		
		var newTitle = this._title;
		if (this._title.length > 28) {
			newTitle = this._title.substring(0, 28) + "...";
		}
		
		return "<li class=\"suggestion\"><a href=\""+this._idPublication+"\" title=\""+this._title+"\" class=\"loadPaper\">"+newTitle+"</a></li>";

	};
	
	this.displayFull = function() {
		return "<li class=\"suggestionAllSingle\"><a href=\""+this._idPublication+"\" title=\""+this._title+"\" class=\"loadPaper\">"+this._title+"</a></li>";
	};


}


function CitedBys() {  
	this._citedBys = new Array();
	this._nextToDisplay = 0;
	this._index = 0;

	
	this.add = function(citedBy) {
		this._citedBys[this._index] = citedBy;
		this._index = this._index+1;
	};
	
	this.display = function() {
		var start;
		var numberCitedBy;
		if (this._nextToDisplay == 0) {
			start = 0;
			numberCitedBy = 2;
			this._nextToDisplay += 2;
		}
		else {
			start = this._nextToDisplay;
			numberCitedBy = 5;
			this._nextToDisplay += 5;
		}
		
		if (this._citedBys.length == 0) {
			$("#citedByList").slideUp('fast');
			$("#citedByList").html("<ul id=\"noSuggestion\"><li class=\"suggestion\">» No Cited By available.</li></ul>");
			$("#citedByList").slideDown();
			
		}
		else {
			if ($("#moreCitedBy").length > 0) {
				$("#moreCitedBy").remove();
			}
			if ($("#loadingCitedBy").length > 0) {
				$("#loadingCitedBy").remove();
			}

			$("#citedByList").append("<ul id=\"citedByList-"+start+"\"></ul>");
			$("#citedByList-"+start).css("display", "none");
			
			var endI = start + numberCitedBy;
			for(var i=start; i<endI; i++) {
				$("#citedByList-"+start).append(this._citedBys[i].display());
			}
			
			
			var moreString;
			if (endI < this._citedBys.length) {
				moreString = "<li class=\"suggestion moreMarginBottom\" id=\"moreCitedBy\"><a href=\"#\" id=\"moreCitedByLink\">» More Cited By</a></li>";
			}
			else {
				moreString = "<li class=\"suggestion moreMarginBottom\" id=\"moreCitedBy\">» No more Cited By</li>";
			}
			$("#citedByList-"+start).append(moreString);
			
			
			if (start < this._citedBys.length) {
				$("#citedByList-"+start).slideDown(function() {
					displayArrowBottom();
				});
			}

		}
	};

	this.showAll = function() {
		for(var i in this._citedBys) {
			$("#citedByAll").append(this._citedBys[i].displayFull());
		}
	};
	
	
}


var citedBys = new CitedBys();


