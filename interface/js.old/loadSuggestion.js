function loadSuggestion(idPublication) {
	//references = new References();
	//citedBys = new CitedBys();
	//byRelatedAuthorsList = new ByRelatedAuthorsList();
	suggestions = new Suggestions();
	
	//TODO test idConvertedPaper
	if (idPublication == -1) {
		//suggestions.display(0, 0, 2);
	}
	else {
		
		//$("#referencesList").html("<ul class=\"list\" id=\"loadingReferences\"><li class=\"suggestion\">»  Loading references</li></ul>");
		//$("#citedByList").html("<ul class=\"list\" id=\"loadingCitedBy\"><li class=\"suggestion\">»  Loading cited by</li></ul>");
		//$("#relatedAuthorsList").html("<ul class=\"list\" id=\"loadingRelatedAuthors\"><li class=\"suggestion\">»  Loading from related authors</li></ul>");
		$("#suggestionList").html("<ul class=\"list\" id=\"loadingSuggestions\"><li class=\"suggestion\">»  Loading suggestions</li></ul>");
		
		//getReferences(idPublication);
		//getCitedBy(idPublication);
		//getByRelatedAuthors(idPublication);
		getSuggestions(idPublication);
		/*
		suggestions = new Suggestions();
		url = "loadSuggestions.jsp?idPublication="+idPublication+"&type="+type;
		for(var type=1; type<4; type++) {
			querySuggestion(idPublication, type);
		}
		*/
	}
}

function getReferences(idPublicationNew) {
	url = "loadReferences.jsp?idPublication="+idPublicationNew;
	$.ajax({
		url: url,
		context: document.body,
		success: function(data){
			var obj = jQuery.parseJSON(data);

			for(var i in obj.references) {
				var newReference = new Reference(obj.references[i].idPublication, obj.references[i].title, obj.references[i].year, obj.references[i].ncitation);
				references.add(newReference);
				sizeReferences += 1;
			}
			references.display();
		}
	});
}


function getCitedBy(idPublicationNew) {
	url = "loadCitedBy.jsp?idPublication="+idPublicationNew;
	$.ajax({
		url: url,
		context: document.body,
		success: function(data){
			var obj = jQuery.parseJSON(data);

			for(var i in obj.citedBys) {
				var newCitedBy = new Reference(obj.citedBys[i].idPublication, obj.citedBys[i].title, obj.citedBys[i].year, obj.citedBys[i].ncitation);
				citedBys.add(newCitedBy);
				sizeCitedBys += 1;
			}
			citedBys.display();
		}
	});
}


function getByRelatedAuthors(idPublicationNew) {
	url = "loadByRelatedAuthors.jsp?idPublication="+idPublicationNew;
	$.ajax({
		url: url,
		context: document.body,
		success: function(data){
			var obj = jQuery.parseJSON(data);

			for(var i in obj.byRelatedAuthors) {
				var newByRelatedAuthors = new ByRelatedAuthors(obj.byRelatedAuthors[i].idPublication, obj.byRelatedAuthors[i].title, obj.byRelatedAuthors[i].year, obj.byRelatedAuthors[i].ncitation,  obj.byRelatedAuthors[i].similarityAuthor,  obj.byRelatedAuthors[i].author);
				byRelatedAuthorsList.add(newByRelatedAuthors);
				sizeByRelatedAuthors += 1;
			}
			byRelatedAuthorsList.display();
		}
	});
}

function getSuggestions(idPublicationNew) {
	url = "loadSuggestions.jsp?idPublication="+idPublicationNew;
	suggestions = new Suggestions();
	$.ajax({
		url: url,
		context: document.body,
		success: function(data){
			var obj = jQuery.parseJSON(data);

			for(var i in obj.suggestions) {
				if ((paper._year-obj.suggestions[i].year<10) &&  (paper._year-obj.suggestions[i].year>-10)) {
					var newSuggestion = new Suggestion(obj.suggestions[i].idRecommendation, obj.suggestions[i].idPublication, obj.suggestions[i].distance, obj.suggestions[i].level, obj.suggestions[i].year,  obj.suggestions[i].nbCitation,  obj.suggestions[i].lastYearCited,  obj.suggestions[i].ratio,  obj.suggestions[i].lastNeighbor,  obj.suggestions[i].title);
					suggestions.add(newSuggestion);
					sizeByRelatedAuthors += 1;
				}
			}
			$("#subSuggestion").html("<div id=\"viewAll\"><ul class=\"list\" id=\"allSuggestion\"><li class=\"suggestion extraLeftPadding\"><a href=\"#\" id=\"allSuggestionLink\">» View graph</a></li></ul></div><div id=\"suggestionList\"><ul class=\"list\" id=\"loadingSuggestions\"><li class=\"suggestion\">» No suggestions</li></ul></div>");

			suggestions.display();
		}
	});
}





var sizeReferences = 0;
var sizeCitedBys = 0;
var sizeByRelatedAuthors = 0;
var sizeSuggestion = 0;

var more = 0;
var sizeSuggestions = new Array(0,0,0,0);
var startSuggestion = new Array(0,0,0,0);

$(document).ready(function() {
	//loadSuggestion(idPublication);
	
	$("#moreReferencesLink").live('click', function(e) {
		references.display();
		return false;
	});
	$("#moreCitedBy").live('click', function(e) {
		citedBys.display();
		return false;
	});
	$("#moreByRelatedAuthorsLink").live('click', function(e) {
		byRelatedAuthorsList.display();
		return false;
	});
	$("#moreSuggestionLink").live('click', function(e) {
		suggestions.display();
		return false;
	});
	
	
	$(".loadPaper").live('click', function(e) {
		if ($(this).attr("id") != "") {
			if ($(this).attr("id")) {
				incrementRecommendation($(this).attr("id").replace("recommendation", ""));
			}
		}
		loadNewPaper($(this).attr("href").replace("default.jsp?idPublication=", ""), idPublication);
		return false;
	});
	
});

