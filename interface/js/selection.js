selection = function(spec) {
	var that = {};

	spec.start_x = spec.start_x || 0;
	spec.start_y = spec.start_y || 0;
	spec.end_x = spec.end_x || 0;
	spec.end_y = spec.end_y || 0;

	spec.start_is_zero = spec.start_is_zero || false;

	that.initiate = function(x, y) {
		spec.start_x = x;
		spec.start_y = y;

	}

	that.update = function(x, y) {
		spec.end_x = x;
		spec.end_y = y;
	};

	that.shrink_y = function(y) {
		spec.start_y -= y;
		spec.end_y -= y;
	}
	that.set_start_to_zero = function() {
		spec.start_is_zero = true;
	}
	that.reset_start_to_zero = function() {
		spec.start_is_zero = false;

	}


	that.get_type_selection = function() {
		if (spec.start_is_zero == true) {
			return 0;
		}

		if ((spec.start_x <= spec.end_x) && (spec.start_y <= spec.end_y)) {//-45
			return 0;
		}
		else if ((spec.start_x > spec.end_x) && (spec.start_y > spec.end_y)) {//-45
			return 0;
		}
		else if ((spec.start_x <= spec.end_x) && (spec.start_y > spec.end_y)) {//+45
			return 1;		
		}
		else if ((spec.start_x > spec.end_x) && (spec.start_y <= spec.end_y)) {//+45
			return 1;
		}
		return -1;
	};

	that.get_first_line = function() {
		var data = {};
		if (spec.start_is_zero == true) {
			data.x = 0;
			data.y = 0;
		}
		else {
			if ((spec.start_x <= spec.end_x) && (spec.start_y <= spec.end_y)) {//-45
				data.x = spec.start_x;
				data.y = spec.start_y;
			}
			else if ((spec.start_x > spec.end_x) && (spec.start_y > spec.end_y)) {//-45
				data.x = spec.end_x;
				data.y = spec.end_y;
			}
			else if ((spec.start_x <= spec.end_x) && (spec.start_y > spec.end_y)) {//+45
				data.x = spec.end_x;
				data.y = spec.end_y;
			}
			else if ((spec.start_x > spec.end_x) && (spec.start_y <= spec.end_y)) {//+45
				data.x = spec.start_x;
				data.y = spec.start_y;
			}
		}
		return data;
	}

	that.get_last_line = function() {
		var data = {};

		if ((spec.start_x <= spec.end_x) && (spec.start_y <= spec.end_y)) {
			data.x = spec.end_x;
			data.y = spec.end_y;
		}
		else if ((spec.start_x > spec.end_x) && (spec.start_y > spec.end_y)) {
			data.x = spec.start_x;
			data.y = spec.start_y;
		}
		else if ((spec.start_x <= spec.end_x) && (spec.start_y > spec.end_y)) {
			data.x = spec.start_x;
			data.y = spec.start_y;
		}
		else if ((spec.start_x > spec.end_x) && (spec.start_y <= spec.end_y)) {
			data.x = spec.end_x;
			data.y = spec.end_y;
		}

		return data;
	}

	that.get_end_selection = function() {
		var data = {}
		data.x = spec.end_x;
		data.y = spec.end_y;
		return data;
	}

	return that;
}
