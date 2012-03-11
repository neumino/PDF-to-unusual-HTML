function moveSide() {
	if ($(window).width() < 1000) {
		var sideMarginLeft = 726-$(window).scrollLeft()+10; // 10 is the margin
		$("#side").css("margin-left", sideMarginLeft+"px");
	}
}



function displayArrowBottom() {
	if ($("#side").height()+121 - $(window).height()+scaleDown > 0) {
		$("#arrowBottom").css("display", "block");
	}
	else {
		$("#arrowBottom").css("display", "none");
	}
}


function displayArrowTop() {
	$("#arrowTop").css("display", "block");
}



function hideArrowBottom() {
	var slide = -72 - $("#side").css("margin-top").replace("px", "");
	var maxSlide = $("#side").height() - $(window).height() + 50 + 10;
	if (slide >= maxSlide) {
		$("#arrowBottom").css("display", "none");
	}
}

function hideArrowTop() {
	if ($(window).scrollTop() > 121) {
		if ($("#side").css("margin-top").replace("px", "") >= -152) {
			$("#arrowTop").css("display", "none");
		}
	}
	else {
		if ($("#side").css("margin-top").replace("px", "") >= -72) {
			$("#arrowTop").css("display", "none");
		}
	}
}

function positionArrows() {
	var marginBank = Math.round(($(window).width()-1000)/2);
	if (marginBank >= 0) {
		var sideMarginLeft = marginBank+10+726;
		$("#arrowTop").css("margin-left", sideMarginLeft+"px");
		$("#arrowBottom").css("margin-left", sideMarginLeft+"px");
	}
	else {
		var sideMarginLeft = 10+726+20-$(window).scrollLeft();
		$("#arrowTop").css("margin-left", sideMarginLeft+"px");
		$("#arrowBottom").css("margin-left", sideMarginLeft+"px");
	}
	
	$("#arrowBottom").css("top", "100%");
	$("#arrowBottom").css("margin-top", "-50px");
	
	
}





var lastScrollTop = 0;

var canGoDown = true;
var canGoUp = true;

var scaleDown = 0;
var slideSize = 160;

$(document).ready(function() {
	moveSide();
	
	positionArrows();
	
	
	$("#arrowBottom").click(function() {
		if (canGoDown == true) {
			canGoDown = false;
			
			displayArrowTop();
			
			$("#side").animate({
				'margin-top': "-="+slideSize
			}, 300, function() {
				scaleDown -= slideSize;
				hideArrowBottom();
				canGoDown = true;
			});
		}
	});
	
	
	$("#arrowTop").click(function() {
		if (canGoUp == true) {
			canGoUp = false;
			
			if (parseInt($("#side").css("margin-top").replace("px", ""))+slideSize>-72) {
				newMarginTop = -parseInt($("#side").css("margin-top").replace("px", ""))-72;
				$("#side").animate({
					'margin-top': "+="+newMarginTop
				}, 300, function() {
					scaleDown += newMarginTop;
					hideArrowTop();
					displayArrowBottom();
					canGoUp = true;
				});
			}
			else {
				$("#side").animate({
					'margin-top': "+="+slideSize
				}, 300, function() {
					scaleDown += slideSize;
					hideArrowTop();
					displayArrowBottom();
					canGoUp = true;
				});
			}
			

		}
	});
});




$(window).scroll(function() {
	moveSide();
	positionArrows();
	
	lastScrollTop = $(window).scrollTop();

});

$(window).resize(function() {
	moveSide();
	
	positionArrows();
	displayArrowBottom();
});



$(document).ready(function() {
	$("#reduceComment").click(function() {
		if ($("#subComment").css("display") == "none") {
			$("#subComment").slideDown();
			$(this).css("background", "url(images/reduce.png) center center no-repeat");
		}
		else {
			$("#subComment").slideUp();
			$(this).css("background", "url(images/expand.png) center center no-repeat");
		}
	});
	
	$("#reduceSuggestion").click(function() {
		if ($("#subSuggestion").css("display") == "none") {
			$("#subSuggestion").slideDown();
			$(this).css("background", "url(images/reduce.png) center center no-repeat");
		}
		else {
			$("#subSuggestion").slideUp();
			$(this).css("background", "url(images/expand.png) center center no-repeat");
		}
	});
	
	
	$("#reduceInformation").click(function() {
		if ($("#subInformation").css("display") == "none") {
			$("#subInformation").slideDown();
			$(this).css("background", "url(images/reduce.png) center center no-repeat");
		}
		else {
			$("#subInformation").slideUp();
			$(this).css("background", "url(images/expand.png) center center no-repeat");
		}
	});
	$("#reduceTool").click(function() {
		if ($("#subTools").css("display") == "none") {
			$("#subTools").slideDown();
			$(this).css("background", "url(images/reduce.png) center center no-repeat");
		}
		else {
			$("#subTools").slideUp();
			$(this).css("background", "url(images/expand.png) center center no-repeat");
		}
	});
});

