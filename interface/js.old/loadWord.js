function loadWord(idPublicationNew, height) {
	if (idPublicationNew != -1) {
		idStr = "" + idPublicationNew;
		
		sizeId = idStr.length;
		directoryTemp = "";
		for(var i =0; i< 9-sizeId; i++) {
			directoryTemp = directoryTemp + "0";
		}
		for(var i =0; i<sizeId; i++) {
			directoryTemp = directoryTemp + idStr.charAt(i);
		}
		
		directory = "PDF/";
		for(var i =0; i<directoryTemp.length; i++) {
			if ((i%3 == 0) && (i != 0)) {
				directory = directory + "/";
			}
			directory = directory + directoryTemp.charAt(i);

		}


		urlWord = directory+"/words.txt";

		
		
		lines = new Array();
		$("#loadWord").fadeIn();
		$.ajax({
			url: urlWord,
			context: document.body,
			success: function(data){
				var obj = jQuery.parseJSON(data);
				$("#highlightedTextOld").css("display", "none");
				for (var i in obj.structure) {
					var left = Math.round(obj.structure[i].startX/zoom-marginDestroyed);
					var top = Math.round(obj.structure[i].startY/zoom);
					
					var newLine = new Line(obj.structure[i].idLine, left, top, Math.round(obj.structure[i].width/zoom), Math.round(obj.structure[i].height/zoom));
					
					for (var j in obj.structure[i].words) {
						left = Math.round(obj.structure[i].words[j].startX/zoom-marginDestroyed);
						var newWord = new Word(obj.structure[i].words[j].word, left, Math.round(obj.structure[i].words[j].width/zoom));
						newLine.addWord(newWord);
					}
					
					lines[i] = newLine;
					//var left = newLine._startX + 300;
					//var top = newLine._startY + 30;
					//$("#highlightedText").append("<div class=\"highlight\" style=\"left:"+left+"px; top:"+top+"px; width:"+newLine._width+"px; height:"+newLine._height+"px;\"></div>");
				}
				
				if (($("#graph").length == 0) && ($("#nopaperParagraph").length == 0) && (idPublicationNew == paper._idPublication)) {
					$("#hlAllLi").html("<a href=\"#\" id=\"highlighAll\">Highlight comments</a>");
					highlightAllFunction();
					$("#highlightedTextOld").fadeIn();
				}
			},
			complete: function() {
				$("#loadWord").fadeOut();
			}
		});
	}
}

