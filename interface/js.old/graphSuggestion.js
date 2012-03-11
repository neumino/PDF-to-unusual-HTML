function drawGraph() {
	$("#hlAllLi").html("Highlight comments");

	$("#highlightedText").html("");
	$("#highlightedTextOld").html("");
	$("#suggestionAllBloc").html(("<p id=\"goBack\"><a href=\"default.jsp?idPublication="+idPublication+"\" id=\"\" class=\"loadPaper\">Return to the paper</a></p>"));

	$("#suggestionAllBloc").append(("<canvas id=\"canvas\" width=\"726\" height=\"500\"></canvas>"));

	
	$("#suggestionAllBloc").append(("<div id=\"graph\"></div>"));

	
	var width = widthPaper;
	var height = heightGraph;

	
	$("#canvas").drawLine({
		  strokeStyle: "#000",
		  strokeWidth: 2,
		  strokeCap: "butt",
		  strokeJoin: "miter",
		  x1: 30, y1: height/2,
		  x2: width-30, y2: height/2
	});
	$("#canvas").drawLine({
		  strokeStyle: "#000",
		  strokeWidth: 2,
		  strokeCap: "butt",
		  strokeJoin: "miter",
		  x1: width-40, y1: height/2-7,
		  x2: width-30, y2: height/2
	});
	$("#canvas").drawLine({
		  strokeStyle: "#000",
		  strokeWidth: 2,
		  strokeCap: "butt",
		  strokeJoin: "miter",
		  x1: width-40, y1: height/2+7,
		  x2: width-30, y2: height/2
	});
	$("#canvas").drawLine({
		  strokeStyle: "#000",
		  strokeWidth: 2,
		  strokeCap: "butt",
		  strokeJoin: "miter",
		  x1: width/2, y1: 30,
		  x2: width/2, y2: height-30
	});
	$("#canvas").drawLine({
		  strokeStyle: "#000",
		  strokeWidth: 2,
		  strokeCap: "butt",
		  strokeJoin: "miter",
		  x1: width/2-7, y1: height-40,
		  x2: width/2, y2: height-30
	});
	$("#canvas").drawLine({
		  strokeStyle: "#000",
		  strokeWidth: 2,
		  strokeCap: "butt",
		  strokeJoin: "miter",
		  x1: width/2+7, y1: height-40,
		  x2: width/2, y2: height-30
	});
	$("#canvas").drawLine({
		  strokeStyle: "#000",
		  strokeWidth: 2,
		  strokeCap: "butt",
		  strokeJoin: "miter",
		  x1: width/2-7, y1: 40,
		  x2: width/2, y2: 30
	});
	$("#canvas").drawLine({
		  strokeStyle: "#000",
		  strokeWidth: 2,
		  strokeCap: "butt",
		  strokeJoin: "miter",
		  x1: width/2+7, y1: 40,
		  x2: width/2, y2: 30
	});
	
	$("#suggestionAllBloc").append(("<span id=\"referencesLegend\">References</span>"));
	$("#suggestionAllBloc").append(("<span id=\"citiedByLegend\">Cited by</span>"));
	$("#suggestionAllBloc").append(("<span id=\"timeLegend\">Time</span>"));

	$("#suggestionAllBloc").append(("<div id=\"removeSuggestions\"><a href=\"#\" id=\"removeSuggestionsGraph\"><img src=\"images/removeSuggestions.png\" title=\"Remove points\" /></a></div><div id=\"addSuggestions\"><a href=\"#\" id=\"addSuggestionsGraph\"><img src=\"images/addSuggestions.png\" title=\"Add points\" /></a></div>"));
}

var startISuggestions = 0;
var endISuggestions = 25;

function cleanPaper() {
	$(".selectingText").remove();
	$(".backgroundPdf").remove();
	$("#nopaperParagraph").remove();
	$("#noPaperList").remove();
	cleanHighlightAll();
}
$(document).ready(function() {


	$("#viewAll").live('click', function(e) {
		cleanPaper();
		
		$("#paper").html(("<div id=\"suggestionAllBloc\"></div>"));
		$("#suggestionAllBloc").css("display", "none");
		


		drawGraph();
		
		//draw points
		suggestions.generateGraph();
		suggestions.drawGraph(startISuggestions, endISuggestions);

		$("#suggestionAllBloc").fadeIn();
		return false;
	});
	
	$(".point").live('mouseover', function(e) {
		$(this).animate({
		    width: '+=6',
		    height: '+=6',
		    "margin-left": '-=3',
		    "margin-top": '-=3'
		}, 80, function() {
		});
	});
		
	$(".point").live('mouseout', function(e) {
		$(this).animate({
		    width: '-=6',
		    height: '-=6',
		    "margin-left": '+=3',
		    "margin-top": '+=3'
		}, 80, function() {
		});
	});
	
	$("#removeSuggestionsGraph").live('click', function(e) {
		endISuggestions -= 5;
		cleanPaper();
		
		$("#paper").html(("<div id=\"suggestionAllBloc\"></div>"));

		drawGraph();
		
		//draw points
		suggestions.drawGraph(startISuggestions, endISuggestions);
		return false;
	});
	$("#addSuggestionsGraph").live('click', function(e) {
		endISuggestions += 5;
		cleanPaper();
		
		$("#paper").html(("<div id=\"suggestionAllBloc\"></div>"));
		drawGraph();
		
		//draw points
		suggestions.drawGraph(startISuggestions, endISuggestions);
		return false;
	});


	$(".point").live('click', function(e) {
		loadNewPaper($(this).attr("id").replace("point", ""), idPublication);
		return false;
	});
	

});