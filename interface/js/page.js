//TODO max height for better user interface
//TODO if start selection is above the first line
page = function(spec) {
	var that = {};

	spec.width = spec.width || -1;
	spec.height = spec.height || -1;
	spec.margin_top = spec.margin_top || -1;

	spec.lines = spec.lines || [];
	spec.displayed_lines = {};


	that.get_id = function() {
		return spec.id;
	};

	that.set_width = function(width) {
		spec.width = width;
	};
	that.get_width = function() {
		return spec.width;
	};
	that.set_height = function(height) {
		spec.height = height;
	};
	that.get_height = function() {
		return spec.height;
	};

	that.set_margin_top = function(margin_top) {
		spec.margin_top = margin_top;
	};
	that.get_margin_top = function() {
		return spec.margin_top;
	};


	that.add_line = function(line) {
		spec.lines.push(line);
	};

	that.highlight = function(selection, text_already_selected) {

		first_line_x = selection.get_first_line().x;
		first_line_y = selection.get_first_line().y-spec.margin_top;
		last_line_x = selection.get_last_line().x;
		last_line_y = selection.get_last_line().y-spec.margin_top;



		if (last_line_y < 0) {
			for(key in spec.displayed_lines) {
				$("#highlight_"+spec.id+"-"+key).remove();
				delete spec.displayed_lines[key];
			}	
		}
		if (first_line_y > spec.height) {
			for(key in spec.displayed_lines) {
				$("#highlight_"+spec.id+"-"+key).remove();
				delete spec.displayed_lines[key];
			}	
		}

		var first_line = -1;
		var last_line = -1;
		if (selection.get_type_selection() == 0) { // -45° (trigo)
			for(var i=0; i<spec.lines.length; i++) {
				if (first_line == -1) {
					if ((last_line_x < spec.lines[i].get_x()) || (first_line_x > spec.lines[i].get_x()+spec.lines[i].get_width()) || (last_line_y < spec.lines[i].get_y()) || (first_line_y > spec.lines[i].get_y()+spec.lines[i].get_height())) {
						//intersection empty
					}
					else {
						first_line = i;
						last_line = i;
					}
				}
				else {
					if ((last_line_x < spec.lines[i].get_x()) || (first_line_x > spec.lines[i].get_x()+spec.lines[i].get_width()) || (last_line_y < spec.lines[i].get_y()) || (first_line_y > spec.lines[i].get_y()+spec.lines[i].get_height())) {
						//intersection empty
					}
					else {
						last_line = i;
					}
					//we can not break in case of multi column pdf
				}
			}
		}
		else { // +45° (trigo)
			var found_empty_line = true;
			var found_end = false;

			for(var i=0; i<spec.lines.length; i++) {
				if (found_empty_line == true) {
					if ((first_line_x < spec.lines[i].get_x()) || (last_line_x > spec.lines[i].get_x()+spec.lines[i].get_width()) || (first_line_y > spec.lines[i].get_y()) || (last_line_y < spec.lines[i].get_y()+spec.lines[i].get_height())) {
						//intersection empty
					}
					else {
						first_line = i;
						found_empty_line = false;
						if (found_end == false) {
							last_line = i;
						}
					}
				}
				else {
					if ((first_line_x < spec.lines[i].get_x()) || (last_line_x > spec.lines[i].get_x()+spec.lines[i].get_width()) || (first_line_y > spec.lines[i].get_y()) || (last_line_y < spec.lines[i].get_y()+spec.lines[i].get_height())) {
						//intersection empty
						found_empty_line = true;
						found_end = true;
					}
					else {
						if (found_end == false) {
							last_line = i;
						}
					}
					//we can not break in case of multi column pdf
				}
			}
			if (first_line > 0) {
				first_line--;
			}
			if (last_line < spec.lines.length-1) {
				last_line += 1;
			}
		}

		if ((first_line != -1) && (last_line != -1)) {

			//in case the whole page is selected
			if (last_line_y >= spec.height) {
				last_line = spec.lines.length-1;
			}

			if (first_line > last_line) {
				var temp = last_line;
				last_line = first_line;
				first_line = temp;

				temp = first_line_x;
				first_line_x = last_line_x;
				last_line_x = temp;

			}

			text_already_selected = true;
			var selected_text = "";
			for(var j=0; j<first_line; j++) {
				if (spec.lines[j].is_displayed() == true) {
					$("#highlight_"+spec.id+"-"+j).remove();
					spec.lines[j].hide();
					delete spec.displayed_lines[j];
				}
			}

			for(j=first_line; j<=last_line; j++) {
				if (spec.lines[j].is_displayed() == true) {
					$("#highlight_"+spec.id+"-"+j).remove();
					spec.lines[j].hide();
					delete spec.displayed_lines[j];
				}

				var highlight_start_x = spec.lines[j].get_x();
				var highlight_width = spec.lines[j].get_width();

				if (j == first_line) {
					if (j == last_line) {
						spec.lines[j].display_only_line(spec.id, first_line_x, last_line_x);
					}
					else {
						spec.lines[j].display_start_line(spec.id, first_line_x);
					}
				}
				else {
					if (j == last_line) {
						if ((j == spec.lines.length-1) && (last_line_y >= spec.lines[j].get_y() + spec.lines[j].get_height())) {
							spec.lines[j].display(spec.id);
						}
						else {
						
							spec.lines[j].display_last_line(spec.id, last_line_x);
						}
					}
					else {
						spec.lines[j].display(spec.id);
					}
				}
				spec.displayed_lines[j] = true;

			}

			for(j=last_line+1; j<spec.lines.length; j++) {
				if (spec.lines[j].is_displayed() == true) {
					$("#highlight_"+spec.id+"-"+j).remove();
					spec.lines[j].hide();
					delete spec.displayed_lines[j];
				}
			}			
		}

		return text_already_selected;

	};

	return that;

};
