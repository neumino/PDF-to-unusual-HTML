var directory = "data/";
var file_name = "test"
var words_file_name = "word.txt";

$(document).ready(function() {
	var url = directory+words_file_name;
	$.ajax({
		url: url,
		context: document.body,
		success: function(data){
			$("#loadingPaper").remove();
			var structure = jQuery.parseJSON(data);

			for(var i in structure) {
				var page = Page();
			}


		}
	});

















