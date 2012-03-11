function Reference(idPublication, title, year, ncitation) {  
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


function References() {  
	this._references = new Array();
	this._nextToDisplay = 0;
	this._index = 0;

	
	this.add = function(reference) {
		this._references[this._index] = reference;
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
		
		if (this._references.length == 0) {
			$("#referencesList").slideUp('fast');
			$("#referencesList").html("<ul id=\"noSuggestion\"><li class=\"suggestion\">» No references available.</li></ul>");
			$("#referencesList").slideDown();
			
		}
		else {
			if ($("#moreReferences").length > 0) {
				$("#moreReferences").remove();
			}
			if ($("#loadingReferences").length > 0) {
				$("#loadingReferences").remove();
			}

			$("#referencesList").append("<ul id=\"referencesList-"+start+"\"></ul>");
			$("#referencesList-"+start).css("display", "none");
			
			var endI = start + numberReference;
			for(var i=start; i<endI; i++) {
				$("#referencesList-"+start).append(this._references[i].display());
			}
			
			
			var moreString;
			if (endI < this._references.length) {
				moreString = "<li class=\"suggestion moreMarginBottom\" id=\"moreReferences\"><a href=\"#\" id=\"moreReferencesLink\">» More references</a></li>";
			}
			else {
				moreString = "<li class=\"suggestion moreMarginBottom\" id=\"moreReferences\">» No more references</li>";
			}
			$("#referencesList-"+start).append(moreString);
			
			
			if (start < this._references.length) {
				$("#referencesList-"+start).slideDown(function() {
					displayArrowBottom();
				});
			}

		}
	};

	this.showAll = function() {
			for(var i in this._references) {
			$("#referencesAll").append(this._references[i].displayFull());
		}
	};
	
	
}


var references = new References();


