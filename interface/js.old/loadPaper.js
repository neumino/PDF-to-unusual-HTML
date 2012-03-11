function loadPaper(idPublicationNew, idOldPaper) {
	$("#paper").html("<div id=\"menu\"><ul><li id=\"menuCopy\">Copy</li><li id=\"menuAddComment\">Add a comment</li></ul></div><div id=\"postComment\" class=\"ui-draggable\"><div class=\"postTitleLeft\"></div><div class=\"postTitle\">New comment<div id=\"closeComment\"></div></div><div class=\"postTitleRight\"></div><div id=\"postCommentContent\"><div id=\"hideForm\"><div id=\"errorMessage\"></div><form><input type=\"text\" id=\"name\" name=\"name\" value=\"Name\" class=\"inputComment\" /><textarea id=\"commentTextarea\">Comment</textarea><span id=\"extraInformationLink\"><a href=\"#\" id=\"moreAboutYouLink\">More about you...</a></span><div id=\"extraInformation\"><input type=\"text\" id=\"email\" name=email value=\"Email\" class=\"inputComment\" /><input type=\"text\" id=\"website\" name=\"website\" value=\"http://\" class=\"inputComment\" /></div><input type=\"submit\" value=\"post\" id=\"postButton\" /></form></div><div id=\"successMessage\"></div></div></div>");
	//TODO test idConvertedPaper
	if (1 == 2) { // to use (idPublicationNew == idOldPaper) {
		//TODO if paper not found?
		idPublication = paper._idPublication;
		idConvertedPaper = paper._idConvertedPaper;
		pubkey = paper._pubkey;
		nbPage = paper._nbPage;
		height = paper._height;
		directory = paper._directory;

		if (idConvertedPaper == 0) {
			$("#paper").append("<p id=\"nopaperParagraph\">Sorry, your paper has not been converted yet.<br/>You can look for it on <a href=\"http://www.google.com/search?hl=en&q="+obj.title+"\">google</a>.</p>");
		}
		else {
			for(var i=1; i<=nbPage; i++) {
				var marginTop = height*(i-1);
				$("#paper").append("<div class=\"selectingText zoom15\" style=\"margin-top:"+marginTop+"px;\"></div>");
			}
			for(var i=0; i<nbPage; i++) {
		
				$("#paper").append("<img id=\"page"+i+"\" class=\"backgroundPdf zoom15img\" style=\"display: none;\" src=\"PDF/"+obj.directory+"images/2.0-"+i+".png\"></div>");
				$("#page"+i).bind("load", function () { $(this).fadeIn('10000'); });
			}	
			/*
			for(var i=0; i<nbPage; i++) {
				if (i==0) {
					$("#paper").append("<div class=\"backgroundPdf zoom15\" style=\"margin-top:24px; background: url('img/"+directory+idConvertedPaper+"-2.0-"+i+".png') top left no-repeat;\"></div>");
				}
				else {
					$("#paper").append("<div class=\"backgroundPdf zoom15\" style=\"background: url('img/"+directory+idConvertedPaper+"-2.0-"+i+".png') top left no-repeat;\"></div>");			
				}
			}	
			*/
			idPublication = idPublicationNew;
			//loadSuggestion(idPublicationNew);
			$("#hlAllLi").html("<a href=\"#\" id=\"highlighAll\">Highlight comments</a>");
		}

	}
	else {
		$("#paper").append("<div id=\"loadingPaper\">Loading</div>");
		url = "loadPaper.jsp?idPublication="+idPublicationNew;
		$.ajax({
			url: url,
			context: document.body,
			success: function(data){
				$("#loadingPaper").remove();
				var obj = jQuery.parseJSON(data);
	
				if (obj.type == 0) {
					$("#paper").append(("<p id=\"nopaperParagraph\">No paper has been selected.<br/>You can choose one of the last paper added.</p>"));
					$("#paper").append(("<ul id=\"noPaperList\">"));
					for(var i = 0; i<obj.idPublicationList.length; i++) {
						$("#noPaperList").append(("<li><a href=\"default.jsp?idPublication="+obj.idPublicationList[i]+"\" class=\"loadPaper\">"+obj.titleList[i]+"</a></li>"));
					}
					$("#paper").append(("</ul>"));
					$("#hlAllLi").html("Highlight comments");
				}
	
				else if (obj.type == 1) {
					var img  = new Image();
					img.src = "PDF/"+obj.directory+"images/2.0-0.png";
					//alert(img.src+' '+img.width +' '+ img.height);
					
					img.onload = function() {
						zoom = img.width/816;
						height = Math.round(img.height/zoom);
						
						//height: 1056px;

						
						paper = new Paper(obj.idPublication, obj.idConvertedPaper, obj.pubkey, obj.nbPage, obj.height, obj.directory, obj.year);
						
						idConvertedPaper = obj.idConvertedPaper;
						
						//maxHeight = (obj.nbPage-1) * obj.height+700;
						for(var i=1; i<=obj.nbPage; i++) {
							var marginTop = Math.round(img.height/zoom*(i-1));
							$("#paper").append("<div class=\"selectingText zoom15\" style=\"height: "+height+"px; margin-top:"+marginTop+"px;\"></div>");
						}
						for(var i=0; i<obj.nbPage; i++) { //<img id="page5" class="backgroundPdf zoom15img" style="" src="http://aminer.org/PDF/000/047/878//images/2.0-5.png">
							$("#paper").append("<img id=\"page"+i+"\" class=\"backgroundPdf zoom15img\" style=\"height: "+height+"px; display: none;\" src=\"PDF/"+obj.directory+"images/2.0-"+i+".png\"></div>");
							$("#page"+i).bind("load", function () { $(this).fadeIn('10000'); });
						}	
						idPublication = idPublicationNew;
						loadSuggestion(idPublicationNew);
						loadComment(idPublicationNew, img.height);
					};

					

				}
				else if (obj.type == 2) {
					if (idOldPaper == 0) {
						$("#paper").append("<p id=\"nopaperParagraph\">Sorry, your paper has not been converted yet.<br/>You can look for it on <a href=\"http://www.google.com/search?hl=en&q="+obj.title+"\">google</a>.</p>");
					}
					else {
						$("#paper").append("<p id=\"nopaperParagraph\">Sorry, your paper has not been converted yet.<br/>You go back clicking <a href=\"default.jsp?idPublication="+idOldPaper+"\" class=\"loadPaper\">here</a> or you can look for it on <a href=\"http://www.google.com/search?hl=en&q="+obj.title+"\">google</a>.</p>");
					}
					paper = new Paper(obj.idPublication, 0, obj.pubkey, 0, 0, 0, obj.year);
					idPublication = idPublicationNew;
					loadSuggestion(idPublicationNew);
					$("#hlAllLi").html("Highlight comments");
					


				}
				
			}
		});
	}

}


function loadNewPaper(idPublicationNew, oldPaper) {
	$(".selectingText").remove();
	$(".backgroundPdf").remove();
	$(".highlight").remove();
	$(".cursor").remove();

	$("#nopaperParagraph").remove();
	$("#noPaperList").remove();
	$("#suggestionAllBloc").fadeOut('fast', function() {
		$("#suggestionAllBloc").remove();
	});
	loadPaper(idPublicationNew, oldPaper);
	
}


var idPublication;
var idConvertedPaper;
$(document).ready(function() {
	idPublication = getUrlVars()["idPublication"];
	if (typeof(idPublication) == 'undefined') {
		idPublication = -1;
	}

	loadPaper(idPublication, 0);
	
});

