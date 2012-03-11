function loadComment(idPublication, height) {
	comments = new Comments();

	//TODO test idConvertedPaper
	url = "loadComments.jsp?idPublication="+idPublication;
	
	$("#commentsList").html("<ul class=\"list\" id=\"loadingComment\"><li class=\"comment\">» No comments</li></ul>");

	if ($("#moreComment").length >0) {
		$("#moreComment").html("Loading comments");
	}
	
	$.ajax({
		url: url,
		context: document.body,
		success: function(data){
			var obj = jQuery.parseJSON(data);
			for(var i in obj.comments) {
				var newComment = new Comment(obj.comments[i].idComment, obj.comments[i].comment, obj.comments[i].idRegisteredAuthor, obj.comments[i].author, obj.comments[i].email, obj.comments[i].website, obj.comments[i].startX, obj.comments[i].endX, obj.comments[i].startY, obj.comments[i].endY, obj.comments[i].orientationType, obj.comments[i].textSelected);
				comments.add(newComment);
			}

			if ($("#moreComment").length > 0) {
				$("#moreComment").remove();
			}
			comments.display();
			$("#commentsList").slideDown('slow');
			loadWord(idPublication, height);

		},
		error: function(data){
			$("#commentsList").html("<li class=\"comment\" id=\"noComment\">Comments could not be loaded .</li>");
		}
		

	});
	
	return false;
}


$(document).ready(function() {
	
	$("#moreCommentLink").live('click', function(e) {
		comments.display();
		return false;
	});
});

