function highlight(lines, startX, endX, startY, endY, orientationType, idComment) {
	if (orientationType == 5) {
		if (idComment == -1) {
			$("#highlightedText").append("<div class=\"cursor\" style=\"top:"+startY+"px; left:"+startX+"px;\"></div>");
		}
		else {
			$("#highlightedTextOld").append("<div class=\"cursor idComment"+idComment+"\" style=\"top:"+startY+"px; left:"+startX+"px;\"></div>");
		}
	}
	else {
		if (idComment == -1) {
			$(".cursor").remove();
		}
		var colorClass = "oldSelection";
		
		if (idComment == -1) {
			colorClass = "newSelection";
		}
		
		if ((orientationType == 1) || (orientationType == 4)) {
			var startId = -1;
			var endId = -1;
	
	
			for(var i in lines) {
				if (startId == -1) {
					if ((lines[i]._startX > endX) || (lines[i]._startX+lines[i]._width < startX) || (lines[i]._startY > endY) || (lines[i]._startY+lines[i]._height < startY)) {
						// the line is out of the selection
					}
					else {
						foundStart = true;
						startId = i;
						endId = i;
					}
				}
				else {
					if ((lines[i]._startX > endX) || (lines[i]._startX+lines[i]._width < startX) || (lines[i]._startY > endY) || (lines[i]._startY+lines[i]._height < startY)) {
						// the line is out of the selection
					}
					else {
						endId = i;
					}
				}
			}
	
			if ((startId != -1) && (endId != -1)) { 
	
				toCopy = "";
				for(var k=0; k<parseInt(startId); k++) {
					if (lines[k]._display == true) {
						$("#highlight"+k).remove();
						lines[k]._display = false;
					}
				}
				for(var k=parseInt(startId); k<=parseInt(endId); k++) {
					
					idStartWord = 1;
					idEndWord = lines[k]._words.length-1;
					startXLine = lines[k]._startX;
					widthLine = lines[k]._width;
					if (k == startId) {
						for(var j=1; j<lines[k]._words.length; j++) {
							if (lines[k]._words[j]._startX > startX) {
								idStartWord = j;
								break;
							}
						}
						startXLine = lines[k]._words[idStartWord-1]._startX;
						
						widthLine = lines[k]._startX + lines[k]._width - lines[k]._words[idStartWord-1]._startX;
	
					}
					
					if (k == endId) {
						for(var j in lines[k]._words) {
							if (lines[k]._words[j]._startX + lines[k]._words[j]._width > endX) {
								idEndWord = j;
								break;
							}
						}
	
						widthLine = lines[k]._words[idEndWord]._startX + lines[k]._words[idEndWord]._width - startXLine;
					}
					var startP = max(0,parseInt(idStartWord)-1);
					var endP = min(parseInt(idEndWord)+1, lines[k]._words.length);
					
					for(var p=startP; p<endP; p++) {
						toCopy = toCopy + lines[k]._words[p]._word;
					}
					
					
					if (idComment == -1) {
						if (lines[k]._display == true) {
							$("#highlight"+k).remove();
							lines[k]._display = false;
						}
	
						$("#highlightedText").append("<div id=\"highlight"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
						lines[k]._display = true;
					}
					else {
						if ($("#highlightOld"+k).length == 0) {
							$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
						}
						else {
							var endLine = startXLine + widthLine;
							if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", "")) > endLine) {
								endLine = parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", ""));
							}
							if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) < startXLine) {
								startXLine = parseInt($("#highlightOld"+k).css("left").replace("px", ""));
							}
	
							widthLine = endLine-startXLine;
							$("#highlightOld"+k).remove();
							$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
						}
					}
					
				}
				
				
				startK = parseInt(endId)+1;
				for(var k=startK; k<lines.length; k++) {
					if (lines[k]._display == true) {
						$("#highlight"+k).remove();
						lines[k]._display = false;
					}
				}
			}
	
			
		}
		else if (orientationType == 2) {// bottom left to top right
			var startId = -1;
			var endId = -1;
			
			toCopy = "";
			
			var otherStartId = -1;
			var otherEndId = -1;
			
			for(var i in lines) {
				if (startId == -1) {
					if ((lines[i]._startX > endX) || (lines[i]._startX+lines[i]._width < startX) || (lines[i]._startY > endY) || (lines[i]._startY+lines[i]._height < startY)) {
	
					}
					else {
						startId = i;
						endId = i;
	
					}
				}
				else {
					if ((lines[i]._startX > endX) || (lines[i]._startX+lines[i]._width < startX) || (lines[i]._startY > endY) || (lines[i]._startY+lines[i]._height < startY)) {
						// catch the first line that is not in the selection
						if ((startId != -1) && (otherStartId == -1)) {
							otherStartId = i-1;
						}
					}
					else {
						endId = i;
	
						if ((otherStartId != -1) && ((i < otherEndId) || (otherEndId == -1))) {
							otherEndId = i;
						}
					}
				}
			}
			
			if (otherEndId == -1) {
				if ((startId != -1) && (endId != -1)) { 
					
	
					
					for(var k=0; k<parseInt(startId); k++) {
						if (lines[k]._display == true) {
							$("#highlight"+k).remove();
							lines[k]._display = false;
						}
					}
			
					for(var k=parseInt(startId); k<=parseInt(endId); k++) {
						idStartWord = 1;
						idEndWord = lines[k]._words.length-1;
	
						startXLine = lines[k]._startX;
						widthLine = lines[k]._width;
						
						if (k == startId) {
							for(var j=1; j<lines[k]._words.length; j++) {
								if (lines[k]._words[j]._startX > endX) {
									idStartWord = j;
									break;
								}
							}
							startXLine = lines[k]._words[idStartWord-1]._startX;
							
							widthLine = lines[k]._startX + lines[k]._width - lines[k]._words[idStartWord-1]._startX;
	
						}
						
						
						if (k == endId) {
							for(var j in lines[k]._words) {
								if (lines[k]._words[j]._startX + lines[k]._words[j]._width > startX) {
									idEndWord = j;
									break;
								}
							}
	
							widthLine = lines[k]._words[idEndWord]._startX + lines[k]._words[idEndWord]._width - startXLine;
						}
						
						
						if (idComment == -1) {
							if (lines[k]._display == true) {
								$("#highlight"+k).remove();
								lines[k]._display = false;
							}
							$("#highlightedText").append("<div id=\"highlight"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
							lines[k]._display = true;
						}
						else {
							if ($("#highlightOld"+k).length == 0) {
								$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
							}
							else {
								var endLine = startXLine + widthLine;
								if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", "")) > endLine) {
									endLine = parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", ""));
								}
								if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) < startXLine) {
									startXLine = parseInt($("#highlightOld"+k).css("left").replace("px", ""));
								}
		
								widthLine = endLine-startXLine;
								$("#highlightOld"+k).remove();
								$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
							}
						}
	
						
						var startP = max(0,parseInt(idStartWord)-1);
						var endP = min(parseInt(idEndWord)+1, lines[k]._words.length);
						
						for(var p=startP; p<endP; p++) {
							toCopy = toCopy + lines[k]._words[p]._word;
						}
	
						
					}
					
	
					startK = parseInt(endId)+1;
					for(var k=startK; k<lines.length; k++) {
						if (lines[k]._display == true) {
							$("#highlight"+k).remove();
							lines[k]._display = false;
						}
					}
				}
			}
			else {
				// if otherEndId is initialized, so is otherStartId
				for(var k=0; k<otherStartId; k++) {
					if (lines[k]._display == true) {
						$("#highlight"+k).remove();
						lines[k]._display = false;
					}
				}
		
				for(var k=parseInt(otherStartId); k<=parseInt(otherEndId); k++) {
					idStartWord = 1;
					idEndWord = lines[k]._words.length-1;
	
					
					startXLine = lines[k]._startX;
					widthLine = lines[k]._width;
					if (k == otherStartId) {
						for(var j in lines[k]._words) {
							if (lines[k]._words[j]._startX > startX) {
								idStartWord = j;
								break;
							}
						}
						startXLine = lines[k]._words[idStartWord-1]._startX;
						
						widthLine = lines[k]._startX + lines[k]._width - lines[k]._words[idStartWord-1]._startX;
	
					}
					
					
					if (k == otherEndId) {
						for(var j in lines[k]._words) {
							if (lines[k]._words[j]._startX + lines[k]._words[j]._width > endX) {
								idEndWord = j;
								break;
							}
						}
	
						widthLine = lines[k]._words[idEndWord]._startX + lines[k]._words[idEndWord]._width - startXLine;
					}
					
					
					if (idComment == -1) {
						if (lines[k]._display == true) {
							$("#highlight"+k).remove();
							lines[k]._display = false;
						}
						$("#highlightedText").append("<div id=\"highlight"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
						lines[k]._display = true;
					}
					else {
						if ($("#highlightOld"+k).length == 0) {
							$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
						}
						else {
							var endLine = startXLine + widthLine;
							if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", "")) > endLine) {
								endLine = parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", ""));
							}
							if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) < startXLine) {
								startXLine = parseInt($("#highlightOld"+k).css("left").replace("px", ""));
							}
		
							widthLine = endLine-startXLine;
							$("#highlightOld"+k).remove();
							$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
						}
					}
					
					
					
					
					
					if (idComment == -1) {
						if (lines[k]._display == false) {
							$("#highlightedText").append("<div id=\"highlight"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+lines[k]._startX+"px; top:"+lines[k]._startY+"px; width:"+lines[k]._width+"px; height:"+lines[k]._height+"px;\"></div>");
							lines[k]._display = true;
						}
					}
					else {
						if ($("#highlightOld"+k).length == 0) {
							$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
						}
						else {
							startXLine = lines[k]._startX;
							widthLine = lines[k]._width;
							var endLine = startXLine + widthLine;
							if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", "")) > endLine) {
								endLine = parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", ""));
							}
							if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) < startXLine) {
								startXLine = parseInt($("#highlightOld"+k).css("left").replace("px", ""));
							}
		
							widthLine = endLine-startXLine;
							$("#highlightOld"+k).remove();
							$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
							//$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+"\" style=\"left:"+lines[k]._startX+"px; top:"+lines[k]._startY+"px; width:"+lines[k]._width+"px; height:"+lines[k]._height+"px;\"></div>");
						}
					}
					
					
					
					var startP = max(0,parseInt(idStartWord)-1);
					var endP = min(parseInt(idEndWord)+1, lines[k]._words.length);
					
					for(var p=startP; p<endP; p++) {
						toCopy = toCopy + lines[k]._words[p]._word;
					}
	
					
					
				}
				startK = parseInt(otherEndId)+1;
				for(var k=startK; k<lines.length; k++) {
					if (lines[k]._display == true) {
						$("#highlight"+k).remove();
						lines[k]._display = false;
					}
				}
			}
	
		}
		else if (orientationType == 3) {// top right to bottom left
			var startId = -1;
			var endId = -1;
			
			toCopy = "";
			
			var otherStartId = -1;
			var otherEndId = -1;
			
			for(var i in lines) {
				if (startId == -1) {
					if ((lines[i]._startX > endX) || (lines[i]._startX+lines[i]._width < startX) || (lines[i]._startY > endY) || (lines[i]._startY+lines[i]._height < startY)) {
	
					}
					else {
						startId = i;
						endId = i;
	
					}
				}
				else {
					if ((lines[i]._startX > endX) || (lines[i]._startX+lines[i]._width < startX) || (lines[i]._startY > endY) || (lines[i]._startY+lines[i]._height < startY)) {
						// catch the first line that is not in the selection
						if ((startId != -1) && (otherStartId == -1)) {
							otherStartId = i-1;
						}
					}
					else {
						endId = i;
	
						if ((otherStartId != -1) && ((i < otherEndId) || (otherEndId == -1))) {
							otherEndId = i;
						}
					}
				}
			}
			
			if (otherEndId == -1) {
				if ((startId != -1) && (endId != -1)) { 
					for(var k=0; k<parseInt(startId); k++) {
						if (lines[k]._display == true) {
							$("#highlight"+k).remove();
							lines[k]._display = false;
						}
					}
			
					for(var k=parseInt(startId); k<=parseInt(endId); k++) {
						idStartWord = 1;
						idEndWord = lines[k]._words.length-1;
	
						startXLine = lines[k]._startX;
						widthLine = lines[k]._width;
						if (k == startId) {
							for(var j in lines[k]._words) {
								if (lines[k]._words[j]._startX > endX) {
									idStartWord = j;
									break;
								}
							}
							startXLine = lines[k]._words[idStartWord-1]._startX;
							
							widthLine = lines[k]._startX + lines[k]._width - lines[k]._words[idStartWord-1]._startX;
						}
						
						
						if (k == endId) {
							for(var j in lines[k]._words) {
								if (lines[k]._words[j]._startX + lines[k]._words[j]._width > startX) {
									idEndWord = j;
									break;
								}
							}
	
							widthLine = lines[k]._words[idEndWord]._startX + lines[k]._words[idEndWord]._width - startXLine;
						}
						
						
						if (idComment == -1) {
							if (lines[k]._display == true) {
								$("#highlight"+k).remove();
								lines[k]._display = false;
							}
							$("#highlightedText").append("<div id=\"highlight"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
							lines[k]._display = true;
						}
						else {
							if ($("#highlightOld"+k).length == 0) {
								$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
							}
							else {
								var endLine = startXLine + widthLine;
								if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", "")) > endLine) {
									endLine = parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", ""));
								}
								if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) < startXLine) {
									startXLine = parseInt($("#highlightOld"+k).css("left").replace("px", ""));
								}
		
								widthLine = endLine-startXLine;
								$("#highlightOld"+k).remove();
								$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
							}
						}
						
						var startP = max(0,parseInt(idStartWord)-1);
						var endP = min(parseInt(idEndWord)+1, lines[k]._words.length);
						
						for(var p=startP; p<endP; p++) {
							toCopy = toCopy + lines[k]._words[p]._word;
						}
	
						
					}
					startK = parseInt(endId)+1;
					for(var k=startK; k<lines.length; k++) {
						if (lines[k]._display == true) {
							$("#highlight"+k).remove();
							lines[k]._display = false;
						}
					}
				}
			}
			else {
				// if otherEndId is initialized, so is otherStartId
				for(var k=0; k<parseInt(otherStartId); k++) {
					if (lines[k]._display == true) {
						$("#highlight"+k).remove();
						lines[k]._display = false;
					}
				}
		
				for(var k=parseInt(otherStartId); k<=parseInt(otherEndId); k++) {
					idStartWord = 1;
					idEndWord = lines[k]._words.length-1;
	
					startXLine = lines[k]._startX;
					widthLine = lines[k]._width;
					if (k == otherStartId) {
						for(var j in lines[k]._words) {
							if (lines[k]._words[j]._startX > startX) {
								idStartWord = j;
								break;
							}
						}
						startXLine = lines[k]._words[idStartWord-1]._startX;
						
						widthLine = lines[k]._startX + lines[k]._width - lines[k]._words[idStartWord-1]._startX;
	
					}

					
					if (k == otherEndId) {
						for(var j in lines[k]._words) {
							if (lines[k]._words[j]._startX + lines[k]._words[j]._width > endX) {
								idEndWord = j;
								break;
							}
						}
	
						widthLine = lines[k]._words[idEndWord]._startX + lines[k]._words[idEndWord]._width - startXLine;
					}
					
					
					if (idComment == -1) {
						if (lines[k]._display == true) {
							$("#highlight"+k).remove();
							lines[k]._display = false;
						}
						$("#highlightedText").append("<div id=\"highlight"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
						lines[k]._display = true;
						}
					else {
						if ($("#highlightOld"+k).length == 0) {
							$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
						}
						else {
							var endLine = startXLine + widthLine;
							if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", "")) > endLine) {
								endLine = parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", ""));
							}
							if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) < startXLine) {
								startXLine = parseInt($("#highlightOld"+k).css("left").replace("px", ""));
							}
		
							widthLine = endLine-startXLine;
							$("#highlightOld"+k).remove();
							$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
						}
					}
					
					
					
					
					
					if (idComment == -1) {
						if (lines[k]._display == false) {
							$("#highlightedText").append("<div id=\"highlight"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+lines[k]._startX+"px; top:"+lines[k]._startY+"px; width:"+lines[k]._width+"px; height:"+lines[k]._height+"px;\"></div>");
							lines[k]._display = true;
						}
					}
					else {
						startXLine = lines[k]._startX;
						widthLine = lines[k]._width;
						var endLine = startXLine + widthLine;
						if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", "")) > endLine) {
							endLine = parseInt($("#highlightOld"+k).css("left").replace("px", "")) + parseInt($("#highlightOld"+k).css("width").replace("px", ""));
						}
						if (parseInt($("#highlightOld"+k).css("left").replace("px", "")) < startXLine) {
							startXLine = parseInt($("#highlightOld"+k).css("left").replace("px", ""));
						}
	
						widthLine = endLine-startXLine;
						$("#highlightOld"+k).remove();
						$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+" idComment"+idComment+"\" style=\"left:"+startXLine+"px; top:"+lines[k]._startY+"px; width:"+widthLine+"px; height:"+lines[k]._height+"px;\"></div>");
						//$("#highlightedTextOld").append("<div id=\"highlightOld"+k+"\" class=\"highlight "+colorClass+"\" style=\"left:"+lines[k]._startX+"px; top:"+lines[k]._startY+"px; width:"+lines[k]._width+"px; height:"+lines[k]._height+"px;\"></div>");
					}
					
					var startP = max(0,parseInt(idStartWord)-1);
					var endP = min(parseInt(idEndWord)+1, lines[k]._words.length);
					
					for(var p=startP; p<endP; p++) {
						toCopy = toCopy + lines[k]._words[p]._word;
					}
					
				}
				startK = parseInt(otherEndId)+1;
				for(var k=startK; k<lines.length; k++) {
					if (lines[k]._display == true) {
						$("#highlight"+k).remove();
						lines[k]._display = false;
					}
				}
			}
			
	
		}
	//$("#test").html(toCopy);
	}
}






function removeDisplayAllLines() {
	for(var i in lines) {
		lines[i].removeDisplay();
	}
}





function highlighComment(classCss) {
	var idCommentClicked = classCss.substr(classCss.lastIndexOf(" ")+10, classCss.length);
	if ($("#comment"+idCommentClicked).length > 0) {
		$("#comment"+idCommentClicked).effect("highlight", {color: '#f2d39d'}, 1500);
	}
	else {
		comments.displayUntil(idCommentClicked);
	}
}

function highlightAllFunction() {
	if ((highlightAll == false) && ($("#graph").length == 0) && $("#nopaperParagraph").length == 0) {
		$("#highlightedText").html("");
		$("#highlightedTextOld").html("");

		for(var i in comments._comments) {
			startX = comments._comments[i]._startX;
			endX = comments._comments[i]._endX;
			startY = comments._comments[i]._startY;
			endY = comments._comments[i]._endY;
			orientationType = comments._comments[i]._orientationType;
			textSelected = comments._comments[i]._textSelected;


			highlight(lines, startX, endX, startY, endY, orientationType, comments._comments[i]._idComment);
		}
		$("#highlighAll").html("Remove highlights");
		highlightAll = true;
	}
	else{
		cleanHighlightAll();
	}
}

function cleanHighlightAll() {
	$("#highlightedText").html("");
	$("#highlightedTextOld").html("");
	
	$("#highlighAll").html("Highlight comments");
	highlightAll = false;
}

$(document).ready(function() {

	$(".comment").live('click', function(e) {
		
		var id = $(this).attr('id').replace("comment", ""); //TODO extract it properly...

		
		for(var i in comments._comments) {
			if (comments._comments[i]._idComment == id) {
				startX = comments._comments[i]._startX;
				endX = comments._comments[i]._endX;
				startY = comments._comments[i]._startY;
				endY = comments._comments[i]._endY;
				orientationType = comments._comments[i]._orientationType;
				textSelected = comments._comments[i]._textSelected;
				
				
				break;
			}
		}
		if (textSelected) {
			$("#highlightedText").html("");
			$("#highlightedTextOld").html("");
			highlight(lines, startX, endX, startY, endY, orientationType, comments._comments[i]._idComment);
			

			var toScroll = (startY + endY)/2 + marginTop - $(window).height()/2;
			$('html,body').animate({
				scrollTop: toScroll
			}, 500);
			
			$("#highlighAll").html("Highlight all comments");
			highlightAll = false;
		}
	});
	
	
	$("#highlighAll").live('click', function() {
		highlightAllFunction();
		return false;
	});
});
