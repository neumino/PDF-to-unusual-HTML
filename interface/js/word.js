word = function(spec) {
	var that = {};

	spec.word = spec.word || "";
	spec.x = spec.x || -1;
	spec.width = spec.width || -1;

	that.set_word = function(word) {
		spec.word = word;
	}
	that.get_word = function() {
		return spec.word;
	}

	that.set_x = function(x) {
		spec.x = x;
	}
	that.get_x = function() {
		return spec.x;
	}

	that.set_width = function(width) {
		spec.width = width;
	}
	that.get_width = function() {
		return spec.width;
	}






	return that;
}
