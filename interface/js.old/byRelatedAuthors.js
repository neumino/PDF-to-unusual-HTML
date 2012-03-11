function ByRelatedAuthors(idPublication, title, year, ncitation, similarityAuthor, author) {  
	this._idPublication = idPublication;
	this._title = title;
	this._year = year;
	this._ncitation = ncitation;
	this._similarityAuthor = similarityAuthor;
	this._author = author;
	
	
	this.display = function() {
		
		var newTitle = this._title;
		if (this._title.length > 28) {
			newTitle = this._title.substring(0, 28) + "...";
		}
		
		return "<li class=\"suggestion\"><a href=\""+this._idPublication+"\" title=\""+this._title+"\" class=\"loadPaper\">"+newTitle+"</a></li>";

	};
	
	this.displayFull = function() {
		return "<li class=\"suggestionAllSingle\"><a href=\""+this._idPublication+"\" title=\""+this._title+"\" class=\"loadPaper\">"+this._title+"</a><em>("+this._author+")</em></li>";
	};
}



function ByRelatedAuthorsList() {  
	this._byRelatedAuthors = new Array();
	this._nextToDisplay = 0;
	this._index = 0;

	
	this.add = function(reference) {
		this._byRelatedAuthors[this._index] = reference;
		this._index = this._index+1;
	};
	
	this.display = function() {
		var start;
		var numberReference;
		if (this._nextToDisplay == 0) {
			start = 0;
			numberReference = 2;
			this._nextToDisplay += 2;
		}
		else {
			start = this._nextToDisplay;
			numberReference = 5;
			this._nextToDisplay += 5;
		}
		
		if (this._byRelatedAuthors.length == 0) {
			$("#byRelatedAuthorsList").slideUp('fast');
			$("#byRelatedAuthorsList").html("<ul id=\"noSuggestion\"><li class=\"suggestion\">» No references available.</li></ul>");
			$("#byRelatedAuthorsList").slideDown();
			
		}
		else {
			if ($("#moreByRelatedAuthors").length > 0) {
				$("#moreByRelatedAuthors").remove();
			}
			if ($("#loadingByRelatedAuthors").length > 0) {
				$("#loadingByRelatedAuthors").remove();
			}

			$("#byRelatedAuthorsList").append("<ul id=\"byRelatedAuthorsList-"+start+"\"></ul>");
			$("#byRelatedAuthorsList-"+start).css("display", "none");
			
			var endI = start + numberReference;
			for(var i=start; i<endI; i++) {
				$("#byRelatedAuthorsList-"+start).append(this._byRelatedAuthors[i].display());
			}
			
			
			var moreString;
			if (endI < this._byRelatedAuthors.length) {
				moreString = "<li class=\"suggestion moreMarginBottom\" id=\"moreByRelatedAuthors\"><a href=\"#\" id=\"moreByRelatedAuthorsLink\">» More by related authors</a></li>";
			}
			else {
				moreString = "<li class=\"suggestion moreMarginBottom\" id=\"moreByRelatedAuthors\">» No more by related authors</li>";
			}
			$("#byRelatedAuthorsList-"+start).append(moreString);
			
			
			if (start < this._byRelatedAuthors.length) {
				$("#byRelatedAuthorsList-"+start).slideDown(function() {
					displayArrowBottom();
				});
			}

		}
	};

	this.showAll = function() {
		for(var i in this._byRelatedAuthors) {
			$("#friendsAll").append(this._byRelatedAuthors[i].displayFull());
		}
	};
	
	
}


var byRelatedAuthorsList = new ByRelatedAuthorsList();


