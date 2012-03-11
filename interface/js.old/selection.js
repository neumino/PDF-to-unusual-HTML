function Selection() {
	this._startX = 0;
	this._startY = 0;
	this._endX = 0;
	this._endY = 0;
	
	
	this.initiate = function(x, y) {
		this._startX = x-marginLeft+marginDestroyed;
		this._startY = y-marginTop;
	};
	
	this.update = function(x, y) {
		this._endX = x-marginLeft+marginDestroyed;
		this._endY = y-marginTop;
	};
	
	this.restart = function() {
		this._startX = 0;
		this._startY = 0;
		this._endX = 0;
		this._endY = 0;
	};
	
	this.fullUpdate = function(startX, startY, endX, endY) {
		this._startX = startX;
		this._startY = startY;
		this._endX = endX;
		this._endY = endY;
	};
	
	this.getSelection = function() {
		
		var startX = this._startX; 
		var endX = this._endX; 
		if (this._startX > this._endX) {
			startX = this._endX;
			endX = this._startX;
		}
		var startY = this._startY; 
		var endY = this._endY; 
		if (this._startY > this._endY) {
			startY = this._endY;
			endY = this._startY;
		}

		var orientationType = 1; 
		if ((this._startX == this._endX) && (this._startY == this._endY)) {
			orientationType = 5; // cursor
		}
		if ((this._startX < this._endX) && (this._startY < this._endY)) {
			orientationType = 1; // top left to bottom right
		}
		else if ((this._startX < this._endX) && (this._startY > this._endY)) {
			orientationType = 2; // bottom left to top right
		}
		else if ((this._startX > this._endX) && (this._startY < this._endY)) {
			orientationType = 3; // top right to bottom left
		}
		else if ((this._startX > this._endX) && (this._startY > this._endY)) {
			orientationType = 4; // bottom right to top left
		}

		 
		 
		return [startX, endX, startY, endY, orientationType];
	};
	
}

var selection = new Selection();
