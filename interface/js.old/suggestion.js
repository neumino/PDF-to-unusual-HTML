var minX = Number.MAX_VALUE;
var maxX = -Number.MAX_VALUE;
var minY = Number.MAX_VALUE;
var maxY = -Number.MAX_VALUE;


function Suggestion(idRecommendation, idPub, distance, level, year, nbCitation, lastYearCited, ratio, lastNeighbor, title) {  
	this._idRecommendation = idRecommendation;
	this._idPublication = idPub;
	this._distance = distance;
	this._level = level;
	this._year = year;
	this._nbCitation = nbCitation;
	this._lastYearCited = lastYearCited;
	this._ratio = ratio;
	this._lastNeighbor = lastNeighbor;
	this._title = title;
	this._generated = false;
	this._drawn = false;
	this._drawnLine = false;
	this._x = 0;
	this._y = 0;
	this._size = 7;
	
	this.display = function() {
		var result = "";
		
		var newTitle = this._title;
		if (this._title.length > 26) {
			newTitle = this._title.substring(0, 26) + "...";
		}
		
		result = result + "<li class=\"suggestion\"><a href=\"default.jsp?idPublication="+this._idPublication+"\" id=\"recommendation"+idRecommendation+"\" title=\""+this._title+"\" class=\"loadPaper\">"+newTitle+"</a></li>";


		return 	result;
	};
	
	this.displayFull = function() {
		return "<li class=\"suggestionAllSingle\"><a href=\"default.jsp?idPublication="+this._idPublication+"\" id=\"recommendation"+idRecommendation+"\" title=\""+this._title+"\" class=\"loadPaper\">"+this._title+"</a></li>";
	};

	
	this.generateCoordinates = function() {

		var scaleX = 100;
		var scaleY = 100;
		var randomScale = 3/4;

		if (this._generated == false) {
	
			if (this._lastNeighbor == idPublication) {
				yPrevious = 0;
				x = parseInt((this._year-paper._year+Math.random()*randomScale)*scaleX);
	
				y = parseInt((this._level+Math.random()*randomScale)*scaleY);
				this._x = x;
				this._y = y;
				
				if (x < minX) {
					minX = x;
				}
				if (x > maxX) {
					maxX = x;
				}
				if (y < minY) {
					minY = y;
				}
				if (y > maxY) {
					maxY = y;
				}
			}
			else {
				var positionNeighbor = 0;
				for(var i=0; i<suggestions._suggestions.length; i++) {
					if (suggestions._suggestions[i]._idPublication == this._lastNeighbor) {
						positionNeighbor = i;
						if (suggestions._suggestions[positionNeighbor]._generated == false) {
							suggestions._suggestions[positionNeighbor].generateCoordinates();
						}
						break;
					}
				}
				yPrevious = suggestions._suggestions[positionNeighbor]._y;
				x = parseInt((this._year-paper._year+Math.random()*randomScale)*scaleX);
	
				var direction;
				if (this._level < suggestions._suggestions[positionNeighbor]._level) {
					direction = -1;
				}
				else {
					direction = 1;
				}
				
				//y = parseInt(((1-this._ratio)*direction+Math.random()*randomScale)*scaleY);
				y = yPrevious+parseInt((direction+Math.random()*randomScale)*scaleY);
				this._x = x;
				this._y = y;
				
				if (x < minX) {
					minX = x;
				}
				if (x > maxX) {
					maxX = x;
				}
				if (y < minY) {
					minY = y;
				}
				if (y > maxY) {
					maxY = y;
				}
			}
			this._generated = true;
		}
	};
	
	
	this.draw = function() {
		if (this._drawn == false) {
			if (this._lastNeighbor == idPublication) {
				var lastCited;
				if (this._lastYearCited == 0) {
					lastCited = "never";
				}
				else {
					lastCited = this._lastYearCited;
				}
				$("#graph").append("<div id=\"point"+this._idPublication+"\" title=\""+this._title+" - last cited "+lastCited+" - "+this._nbCitation+" citations\" class=\"point\" style=\"width: "+this._size+"; height: "+this._size+"; background: #"+this._color+"; margin-left: "+(this._x-parseInt(this._size/2))+"px; margin-top: "+(this._y-3)+"px;\"></div>");
			}
			else {
				var found = false;
				for(var i=0; i<suggestions._suggestions.length; i++) {
					if (suggestions._suggestions[i]._idPublication == this._lastNeighbor) {
						if (suggestions._suggestions[i]._drawn == false) {
							suggestions._suggestions[i].draw();
							found = true;
						}
						break;
					}
				}
				if (found == false) {
					$("#graph").append("<div id=\"point"+this._idPublication+"\" title=\""+this._title+" - last cited "+lastCited+" - "+this._nbCitation+" citations\" class=\"point\" style=\"width: "+this._size+"; height: "+this._size+"; background: #"+this._color+"; margin-left: "+(this._x-parseInt(this._size/2))+"px; margin-top: "+(this._y-3)+"px;\"></div>");
				}
				else {
					var lastCited;
					if (this._lastYearCited == 0) {
						lastCited = "never";
					}
					else {
						lastCited = this._lastYearCited;
					}
					$("#graph").append("<div id=\"point"+this._idPublication+"\" title=\""+this._title+" - last cited "+lastCited+" - "+this._nbCitation+" citations\" class=\"point\" style=\"width: "+this._size+"; height: "+this._size+"; background: #"+this._color+"; margin-left: "+(this._x-parseInt(this._size/2))+"px; margin-top: "+(this._y-3)+"px;\"></div>");
	
					//$("#graph").append("<div id=\"point"+this._idPublication+"\" title=\""+this._title+" - last cited "+lastCited+" - "+this._nbCitation+" citations\" class=\"point\" style=\"width: "+this._size+"; height: "+this._size+"; background: #"+this._color+"; margin-left: "+(this._x-parseInt(this._size/2))+"px; margin-top: "+(this._y-3)+"px;\"></div>");
				}
			}
			this._drawn = true;
		}
	};
	
	this.drawLink = function(bX, bY) {
		if (this._drawnLine == false) {

			if (this._lastNeighbor == idPublication) {
				$("#canvas").drawLine({
					  strokeStyle: "#999",
					  strokeWidth: 1,
					  strokeCap: "butt",
					  strokeJoin: "miter",
					  x1: this._x, y1: this._y,
					  x2: bX, y2: bY
				});
			}
			else {
				var positionNeighbor = 0;
				var found = false;
				for(var i=0; i<suggestions._suggestions.length; i++) {
					if (suggestions._suggestions[i]._idPublication == this._lastNeighbor) {
						if (this._drawnLine == false) {
							positionNeighbor = i;
							suggestions._suggestions[positionNeighbor].drawLink(bX, bY);
							found = true;
							break;
						}

					}
				}
				if (found == false) {
					$("#canvas").drawLine({
						  strokeStyle: "#999",
						  strokeWidth: 1,
						  strokeCap: "butt",
						  strokeJoin: "miter",
						  x1: this._x, y1: this._y,
						  x2: bX, y2: bY
					});
				}
				else {
					$("#canvas").drawLine({
						  strokeStyle: "#999",
						  strokeWidth: 1,
						  strokeCap: "butt",
						  strokeJoin: "miter",
						  x1: this._x, y1: this._y,
						  x2: suggestions._suggestions[positionNeighbor]._x, y2: suggestions._suggestions[positionNeighbor]._y
					});
				}
			}
			this._drawnLine = true;
		}
	};
}



function Suggestions() {  
	this._suggestions = new Array();
	this._nextToDisplay = 0;
	this._index = 0;
	this._maxCitation = 0;
	this._minLastYearCited = Number.MAX_VALUE;
	
	this.add = function(reference) {
		this._suggestions[this._index] = reference;
		this._index += 1;
	};
	
	this.display = function() {
		var start;
		var numberReference;
		if (this._nextToDisplay == 0) {
			start = 0;
			numberReference = 7;
			this._nextToDisplay += 7;
		}
		else {
			start = this._nextToDisplay;
			numberReference = 5;
			this._nextToDisplay += 5;
		}
		
		if (this._suggestions.length == 0) {
			$("#suggestionList").slideUp('fast');
			$("#suggestionList").html("<ul id=\"noSuggestion\"><li class=\"suggestion\">» No suggestions available.</li></ul>");
			$("#suggestionList").slideDown();
			
		}
		else {
			if ($("#moreSuggestions").length > 0) {
				$("#moreSuggestions").remove();
			}
			if ($("#loadingSuggestions").length > 0) {
				$("#loadingSuggestions").remove();
			}

			$("#suggestionList").append("<ul id=\"suggestionList-"+start+"\"></ul>");
			$("#suggestionList-"+start).css("display", "none");
			
			var endI = min(start + numberReference, this._suggestions.length);
			for(var i=start; i<endI; i++) {
				$("#suggestionList-"+start).append(this._suggestions[i].display());
			}
			
			
			var moreString;
			if (endI < this._suggestions.length) {
				moreString = "<li class=\"suggestion moreMarginBottom\" id=\"moreSuggestions\"><a href=\"#\" id=\"moreSuggestionLink\">» More Suggestions</a></li>";
			}
			else {
				moreString = "<li class=\"suggestion moreMarginBottom\" id=\"moreSuggestions\">» No more suggestions</li>";
			}
			$("#suggestionList-"+start).append(moreString);
			
			
			if (start < this._suggestions.length) {
				$("#suggestionList-"+start).slideDown(function() {
					displayArrowBottom();
				});
			}

		}
	};

	this.showAll = function() {
		for(var i in this._suggestions) {
			$("#suggestionsAll").append(this._suggestions[i].displayFull());
		}
	};
	
	this.generateGraph = function() {
		minX = Number.MAX_VALUE;
		maxX = -Number.MAX_VALUE;
		minY = Number.MAX_VALUE;
		maxY = -Number.MAX_VALUE;
		

		for(var i = 0; i<this._suggestions.length; i++) {
			this._suggestions[i]._generated = false;
		}
		for(var i = 0; i<this._suggestions.length; i++) {
			this._suggestions[i].generateCoordinates();
			
			if (this._maxCitation < this._suggestions[i]._nbCitation) {
				this._maxCitation = this._suggestions[i]._nbCitation;
			}
			if ((this._suggestions[i]._lastYearCited != 0) && (this._minLastYearCited > this._suggestions[i]._lastYearCited)){
				this._minLastYearCited = this._suggestions[i]._lastYearCited;
			}
		}
		
		var todayYear = new Date().getFullYear();
		for(var i = 0; i<this._suggestions.length; i++) {
			var value;

			if (this._suggestions[i]._lastYearCited == 0) {
				value = 1;
			}
			else {
				value = (this._suggestions[i]._lastYearCited-todayYear)/(this._minLastYearCited-todayYear);
			}
			red = 255+value*(154-255);
			green = 0+value*154;
			blu = 0+value*154;
			
			
			this._suggestions[i]._color = rgb2hex(red, green, blu);
			this._suggestions[i]._size = 6+parseInt(this._suggestions[i]._nbCitation/this._maxCitation*9);
		}		
		
		this._maxCitation = 0;
		this._minLastYearCited = Number.MAX_VALUE;


		var width = widthPaper;
		var height = heightGraph;

		var aX = 0;
		if (Math.abs(minX) < Math.abs(maxX)) {
			aX = ((width-20)/2)/Math.abs(maxX);
		}
		else {
			aX = ((width-20)/2)/Math.abs(minX);
		}
		
		var aY = 0;
		if (Math.abs(minY) < Math.abs(maxY)) {
			aY = ((height-20)/2)/Math.abs(maxY);
		}
		else {
			aY = ((height-20)/2)/Math.abs(minY);
		}

		var bX = width/2;
		var bY = height/2;	
		
		for(var i = 0; i<this._suggestions.length; i++) {
			this._suggestions[i]._x = parseInt(aX*this._suggestions[i]._x+bX-3);
			this._suggestions[i]._y = parseInt(aY*this._suggestions[i]._y+bY-3);
		}
		
		
		
	};

	this.drawGraph = function(startI, endI) {
		if (endI >= this._suggestions.length) {
			endI = this._suggestions.length;
		}
		var width = widthPaper;
		var height = heightGraph;
		var bX = width/2;
		var bY = height/2;	
		$("#graph").append("<div id=\"point"+paper._idPublication+"\" class=\"centre\" style=\"margin-left: "+(bX-5)+"px; margin-top: "+(bY-5)+"px;\"></div>");


		for(var i = 0; i<this._suggestions.length; i++) {
			this._suggestions[i]._drawn = false;
			this._suggestions[i]._drawnLine = false;
		}

		for(var i = startI; i<endI; i++) {
			this._suggestions[i].draw();
		}
		
		
		for(var i = startI; i<endI; i++) {
			this._suggestions[i].drawLink(bX, bY);
		}		
	};
	
	
	this.getLevel = function(lastNeighbor) {
		for(var i in this._suggestions) {
			if (this._suggestions[i]._idPublication == lastNeighbor) {
				return this._suggestions[i]._level;
			}
		}
	};

	
	this.getY = function(lastNeighbor) {
		for(var i in this._suggestions) {
			if (this._suggestions[i]._idPublication == lastNeighbor) {
				return this._suggestions[i]._y;
			}
		}
	};


	



}

function incrementRecommendation(idRecommendation) {
	url = "incrementRecommendation.jsp?idRecommendation="+idRecommendation;
	$.ajax({
		url: url,
		context: document.body
	});
}



var suggestions = new Suggestions();


