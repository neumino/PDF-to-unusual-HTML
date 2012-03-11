function Word(word, startX, width) {
	this._word = word;
	this._startX = startX;
	this._width = width;
}

function Line(idLine, startX, startY, width, height) {  
	this._idLine = idLine;
	this._startX = startX;
	this._startY = startY;
	this._width = width;
	this._height = height;
	this._words = new Array();
	this._indexWords = 0;
	this._display = false;


	this.addWord = function(word) {
		this._words[this._indexWords] = word;
		this._indexWords = this._indexWords+1; 
	};
	
	this.removeDisplay = function() {
		this._display = false;
	};
}


var lines = new Array();
