function sendComment() {
	var name = $('#name').val();
	var comment = $('#commentTextarea').val();
	var email = $('#email').val();
	var website = $('#website').val();
	var noName = false;
	var error = false;
	
	$("#errorMessage").html("");
	if ((name == "") || (name == "Name")) {
		noName = true;
		error = true;
	}
	
	if ((comment == "") || (comment == "Comment")) {
		error = true;
		if (noName == true) {
			$("#errorMessage").append("Name and comment are required.");
		}
		else {
			$("#errorMessage").append("Comment is required.");
		}
	}
	else {
		if (noName == true) {
			$("#errorMessage").append("Name is required.");
		}
	}
	
	if ($("#errorMessage").css("display") == "none") {
		$("#errorMessage").slideDown();
	};
	
	
	if (error == false) {
		if (email == "Email") {
			email = "";
		}
		if (website == "http://") {
			website = "";
		}

		var result = selection.getSelection();
		var obj =  {idConvertedPaper: idConvertedPaper ,
				name: name, 
				comment: comment, 
				email: email, 
				website: website,
				startX: result[0],
				endX: result[1],
				startY: result[2],
				endY: result[3],
				orientationType: result[4],
				textSelected: true
				};
		
		var data = jQuery.param(obj);
	
		$.ajax({
			url: "addComment.jsp",
			type: "POST",
			data: data,
			context: document.body,
			success: function(data){
				var obj = jQuery.parseJSON(data);
				if (obj.answer == "fail") {
					$("#errorMessage").append("Error, could not save comment.");
					$("#errorMessage").slideDown();

				}
				else {
					$("#hideForm").slideUp();
					$("#commentTextarea").val("");
					displayForm = false;

					$("#successMessage").html("Comment saved");
					$("#successMessage").slideDown();

					var obj = jQuery.parseJSON(data);

					var i = 0;
					var newComment = new Comment(obj.comments[i].idComment, obj.comments[i].comment, obj.comments[i].idRegisteredAuthor, obj.comments[i].author, obj.comments[i].email, obj.comments[i].website, obj.comments[i].startX, obj.comments[i].endX, obj.comments[i].startY, obj.comments[i].endY, obj.comments[i].orientationType, obj.comments[i].textSelected);
					comments.add(newComment);


					if ($("#noComment").length) {
						$("#commentsList").html(newComment.display());
					}
					else {
						$("#newComment").append(newComment.display());
					}
					
			        $("#postComment").delay(1000).fadeOut();
			        $("#successMessage").delay(1000).fadeOut();

					
				}
				
		        $("#highlightedText").html("");
		        selection.restart();

			},
			error: function(data){
				$("#errorMessage").append("Error, could not save comment.");
				$("#errorMessage").slideDown();
			}
		});
	}
}


function restartForm() {
	$("#name").val("Name");
	$("#commentTextarea").val("Comment");
	$("#email").val("Email");
	$("#website").val("http://");
	$("#commentTextarea").css("height", "70px");
	$("#postCommentContent").css("height", "124px");
	$("#successMessage").html("");
	$("#successMessage").css("display", "none");
	
}


function restartSelection() {
    $("#highlightedText").html("");
    $("#highlightedTextOld").html("");
	
	if (highlightAll == true) {
		$("#highlighAll").html("Highlight all comments");
		highlightAll = false;
	}

	
	
    selection.restart();
    
	if (displayExtraInformation) {
		displayExtraInformation = false;
		$("#extraInformationLink").slideDown();
		$("#extraInformation").css("display", "none");
		$("#postCommentContent").animate({
		    height: '-=20'
		  }, 400, function() {
			  displayMoreInformation = false;
		  });
	}
}


$(document).ready(function() {
	$('body').mouseup(function(e) {
		if (event.which == 1) {
			$("#menu").fadeOut('fast');
		}
	});
	
	
	//$('.selectingText').live('mousedown', function(e) {
	$('.selectingText').live('mousedown', function(e) {
		mouseDown = true;
		
		restartSelection();
		
		selection.initiate(e.pageX, e.pageY);
		
		otherStartId = -1;
		otherEndId = -1;
		return false;
	});

	
	$('.oldSelection').live('mousedown', function(e) {
		highlighComment($(this).attr("class"));
		return false;
	});
	$('.cursor').live('mousedown', function(e) {
		highlighComment($(this).attr("class"));
		return false;
	});

	
	$('.selectingText').live('contextmenu', function(e) {
		var top = e.pageY-marginTop;
		var left = e.pageX - marginLeft+marginDestroyed;
		$("#menu").css("top", top+"px");
		$("#menu").css("left", left+"px");

		selection.initiate(e.pageX-4, e.pageY-7);
		selection.update(e.pageX-4, e.pageY-7);
		
		var result = selection.getSelection();
		highlight(lines, result[0], result[1], result[2], result[3], result[4], -1);



		
		$("#menu").fadeIn('fast');
		
		

		return false;
	});
	
	$('.highlight').live('contextmenu', function(e) {
		var top = e.pageY-marginTop;
		var left = e.pageX - marginLeft+marginDestroyed;
		$("#menu").css("top", top+"px");
		$("#menu").css("left", left+"px");

		var id = $(this).attr('class').replace("highlight oldSelection idComment", ""); //TODO extract it properly...

		for(var i in comments._comments) {
			if (comments._comments[i]._idComment == id) {
				startX = comments._comments[i]._startX;
				endX = comments._comments[i]._endX;
				startY = comments._comments[i]._startY;
				endY = comments._comments[i]._endY;
				orientationType = comments._comments[i]._orientationType;
				textSelected = comments._comments[i]._textSelected;
				
				selection.fullUpdate(startX, startY, endX, endY);
				
				break;
			}
		}

		$("#menu").fadeIn('fast', function() {
			clip.glue('menuCopy');
			clip.setText(toCopy);
			clip.addEventListener( 'onMouseOver', highlightCopy );
			function highlightCopy( client ) {
				$("#menuCopy").css('background', '#b1dbfc');
			}
			clip.addEventListener( 'onMouseOut', removeHighlightCopy );
			function removeHighlightCopy(client) {
				$("#menuCopy").css('background', '#fff');
			}
			clip.addEventListener( 'onMouseDown', hideMenu );       
			function hideMenu(client) {
				$("#menu").fadeOut();
			}

		});
		
		return false;
	});

	
	
    $("#postComment").draggable();
	
	
	$('#menuAddComment').live('click', function(e) {
    //$("#menuAddComment").click(function(e) {
		e.stopPropagation();


		var topPosition = e.pageY - marginTop;
		var leftPosition = e.pageX - marginLeft;

		$("#postComment").css('top', topPosition+"px");
		$("#postComment").css('left', leftPosition+"px");
		
		
		$("#postComment").fadeIn('fast');

		//if (!displayForm) {
			displayForm = true;
			$('#hideForm').slideDown();
			$("#menu").fadeOut('fast');
		//}	
	});
    $("#closeComment").live('click', function(e) {
        $("#postComment").css("display", "none");
        
        
        restartSelection();
        restartForm();
    });

    $('body').click(function(event) {
        if (!$(event.target).closest('#postComment').length) {
            if ($("#postComment").css("display") != "block") {

                $('#postComment').hide();
            }
        };
    });
	$('#menuCopy').live('click', function(e) {
	//$("#menuCopy").click(function(e) {

		$("#menu").fadeOut('fast');
		e.stopPropagation();
	});
	
	/*
    var ctrlDown = false;
    var ctrlKey = 17, vKey = 86, cKey = 67;

    $(document).keydown(function(e)
    {
        if (e.keyCode == ctrlKey) ctrlDown = true;
    }).keyup(function(e)
    {
        if (e.keyCode == ctrlKey) ctrlDown = false;
    });

    $(document).keydown(function(e)
    {
        if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) {
    		e.stopPropagation();
    		clip.setText(textToCopy);
        }
    });
	*/
	
	$('body').mouseup(function() {
		/*// TODO Test it
		selection.update(e.pageX, e.pageY);
		var result = selection.getSelection();

		highlight(lines, result[0], result[1], result[2], result[3], result[4], true);
		*/
		mouseDown = false;

	});

	
	$('body').mousemove(function(e) {
		if (mouseDown) {
			selection.update(e.pageX, e.pageY);
			var result = selection.getSelection();

			highlight(lines, result[0], result[1], result[2], result[3], result[4], -1);
		}
	});
	$('.selectingText').live('mouseup', function(e) {
		mouseDown = false;
	});
	$('.highlight').live('mouseup', function(e) {
		mouseDown = false;
	});

	$('textarea#commentTextarea').autoResize({
	    onResize : function() {
	        $(this).css({});
	    },
	    animateCallback : function() {
	        $(this).css({opacity:1});
	    },
	    animateDuration : 300,
	    extraSpace : 20
	});
	
	$('#moreAboutYouLink').live('click', function(e) {

		if (!displayExtraInformation) {
			displayExtraInformation = true;
			$("#extraInformationLink").slideUp();
			$("#extraInformation").slideDown();
			$("#postCommentContent").animate({
			    height: '+=40'
			  }, 400, function() {
				  displayMoreInformation = true;
			  });
		}
		return false;
	});
	
	
	$('#name').focus(function() {
		  if ($('#name').val() == "Name") {
			  $('#name').val("");
		  }
	});

	$('#commentTextarea').focus(function() {
		  if ($('#commentTextarea').val() == "Comment") {
			  $('#commentTextarea').val("");
		  }
	});

	
	$('#email').focus(function() {
		  if ($('#email').val() == "Email") {
			  $('#email').val("");
		  }
	});

	$('#website').focus(function() {
		  if ($('#website').val() == "Website") {
			  $('#website').val("");
		  }
	});

	
	$('#postButton').live('click', function(e) {
		sendComment();
		return false;
	});

	
	$('#addCommentHelp').click(function() {
		$('#blackout').fadeIn('fast');
		$('#howTo').slideDown('fast');
		return false;
	});

	$('#blackout').click(function() {
		$('#blackout').fadeOut('fast');
		$('#howTo').slideUp('fast');
		return false;
	});
	$('#closeHowTo').click(function() {
		$('#blackout').fadeOut('fast');
		$('#howTo').slideUp('fast');
		return false;
	});
	$('#howTo').click(function() {
		return false;
	});

});








/*
 * jQuery autoResize (textarea auto-resizer)
 * @copyright James Padolsey http://james.padolsey.com
 * @version 1.04
 */

(function($){
    
    $.fn.autoResize = function(options) {
        
        // Just some abstracted details,
        // to make plugin users happy:
        var settings = $.extend({
            onResize : function(){},
            animate : true,
            animateDuration : 150,
            animateCallback : function(){},
            extraSpace : 20,
            limit: 1000
        }, options);
        
        // Only textarea's auto-resize:
        this.filter('textarea').each(function(){
            
                // Get rid of scrollbars and disable WebKit resizing:
            var textarea = $(this).css({resize:'none','overflow-y':'hidden'}),
            
                // Cache original height, for use later:
                origHeight = textarea.height(),
                
                // Need clone of textarea, hidden off screen:
                clone = (function(){
                    
                    // Properties which may effect space taken up by chracters:
                    var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
                        propOb = {};
                        
                    // Create object of styles to apply:
                    $.each(props, function(i, prop){
                        propOb[prop] = textarea.css(prop);
                    });
                    
                    // Clone the actual textarea removing unique properties
                    // and insert before original textarea:
                    return textarea.clone().removeAttr('id').removeAttr('name').css({
                        position: 'absolute',
                        top: 0,
                        left: -9999
                    }).css(propOb).attr('tabIndex','-1').insertBefore(textarea);
					
                })(),
                lastScrollTop = null,
                updateSize = function() {
					
                    // Prepare the clone:
                    clone.height(0).val($(this).val()).scrollTop(10000);
					
                    // Find the height of text:
                    var scrollTop = Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
                        toChange = $(this).add(clone);

                    // Don't do anything if scrollTip hasen't changed:
                    if (lastScrollTop === scrollTop) { return; }
                    
                    lastScrollTop = scrollTop;
                    
                    // Check for limit:
                    if ( scrollTop >= settings.limit ) {
                        $(this).css('overflow-y','');
                        return;
                    }
                    else {
                    	var height;
                    	if (displayMoreInformation) {
                        	height = scrollTop + 100;
                    	}
                    	else {
                        	height = scrollTop + 60;
                    	}
                        $("#postCommentContent").css("height", height+"px");
                    }
                    // Fire off callback:
                    settings.onResize.call(this);
					
                    // Either animate or directly apply height:
                    settings.animate && textarea.css('display') === 'block' ?
                        toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback)
                        : toChange.height(scrollTop);
                };
            
            // Bind namespaced handlers to appropriate events:
            textarea
                .unbind('.dynSiz')
                .bind('keyup.dynSiz', updateSize)
                .bind('keydown.dynSiz', updateSize)
                .bind('change.dynSiz', updateSize);
            
        });
        
        // Chain:
        return this;
        
    };
    
    
    
})(jQuery);



