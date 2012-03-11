function Comment(idComment, comment, idRegisteredAuthor, author, email, website, startX, endX, startY, endY, orientationType, textSelected) {
	this._idComment = idComment;
	this._comment = comment;
	this._idRegisteredAuthor = idRegisteredAuthor;
	this._author = author;
	this._email = email;
	this._website = website;
	this._startX = startX;
	this._endX = endX;
	this._startY = startY;
	this._endY = endY;
	this._orientationType = orientationType;
	this._textSelected = textSelected;
	
	this.display = function() {
		var result = "";
		
		result = result + "<li class=\"comment\" id=\"comment"+this._idComment+"\"><p class=\"paragraphComment\">";
		if (this._email != "") {
			result = result + "<a href=\"mailto:"+this._email+"\">" + this._author + "</a>";
		}
		else {
			result = result + "<strong>" + this._author + "</strong>";
		}
		if (this._website != "") {
			result = result + " - <a href=\""+this._website+"\">www</a>";
		}
		result = result + "<br />"+this._comment+"</p></li>";
		return 	result;
	};
	
}



function Comments() {
	this._comments = new Array();
	this._index = 0;
	this._startDisplay = 0;
	
	this.add = function(comment) {
		this._comments[this._index] = comment;
		this._index = this._index+1;
	};
	
	
	this.display = function() {
		if ($("#loadingComment").length > 0) {
			$("#loadingComment").remove();
		}
		if ($("#moreComment").length > 0) {
			$("#moreComment").remove();
		}
		
		if (this._comments.length == 0) {
			$("#commentsList").append("<ul id=\"noComment\"><li class=\"comment\">No comment has been posted.</li></ul>");
		}
		else {
			$("#commentsList").append("<ul id=\"commentsList"+this._startDisplay+"\"></ul>");
			$("#commentsList"+this._startDisplay).css("display", "none");
			
			if ($("#loadingComment").length > 0) {
				$("#loadingComment").remove();
			}
			
			var endId = min(this._startDisplay+5, this._comments.length);
			for(var i = this._startDisplay; i<endId; i++) {
				$("#commentsList"+this._startDisplay).append(this._comments[i].display());
			}

				
			if (this._startDisplay+5 < this._comments.length) {
				$("#commentsList"+this._startDisplay).append("<li class=\"comment\" id=\"moreComment\"><a href=\"#\" id=\"moreCommentLink\">» More</a></li>");
			}
			
			if (this._startDisplay != 0) {
				var height = $("#commentsList"+this._startDisplay).height();
				$("#side").animate({
					'margin-top': '-='+height
				}, 1000);
				$("#commentsList"+this._startDisplay).slideDown('slow', function() {
					displayArrowBottom();
					displayArrowTop();
				});

			}
			else {
				$("#commentsList"+this._startDisplay).slideDown('slow', function() {
					displayArrowBottom();
				});
			}
		}
		
		
		this._startDisplay += min(5, this._comments.length - this._startDisplay);


	};
	
	
	this.displayUntil = function(idComment) {
		if ($("#moreComment").length > 0) {
			$("#moreComment").remove();
		}

		
		var count = 0;
		
		$("#commentsList").append("<ul id=\"commentsList"+this._startDisplay+"\"></ul>");
		$("#commentsList"+this._startDisplay).css("display", "none");
		
		for(var i = this._startDisplay; i<this._comments.length; i++) {
			$("#commentsList"+this._startDisplay).append(this._comments[i].display());
			count += 1;

			if (this._comments[i]._idComment == idComment) {
				break;
			}
		}
		
		if (this._startDisplay+count < this._comments.length) {
			$("#commentsList"+this._startDisplay).append("<li class=\"comment\" id=\"moreComment\"><a href=\"#\" id=\"moreCommentLink\">» More</a></li>");
		}

		if (this._startDisplay != 0) {
			var height = $("#commentsList"+this._startDisplay).height();
			$("#side").animate({
				'margin-top': '-='+height
			}, 1000);
			$("#commentsList"+this._startDisplay).slideDown('slow', function() {
				$("#comment"+idComment).effect("highlight", {color: '#f2d39d'}, 1500);
				displayArrowBottom();
				displayArrowTop();
			});

		}
		else {
			$("#commentsList"+this._startDisplay).slideDown('slow', function() {
				$("#comment"+idComment).effect("highlight", {color: '#f2d39d'}, 1500);
				displayArrowBottom();
			});
		}

		this._startDisplay += count;
		


	};
	
	
}

var comments = new Comments();
