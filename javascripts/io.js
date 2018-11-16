function redraw() 
{
	drawfigure("player_avatar", player);
	if (rival.name !== "") drawfigure("rival_avatar", rival);
	else {
		var canvas = document.getElementById("rival_avatar");
		var ctx = canvas.getContext("2d");
		ctx.beginPath();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.beginPath();
		var w = canvas.width;
		canvas.width = 1;
		canvas.width = w;
	}
	drawStats();
}

var defaultWindow = ShowCamp;
var windows = [];
function NextWindow(){
	if(windows.length>0){
		var nxt =windows.pop();
		nxt();
	}else{//next round?
		defaultWindow();
	}
}
function newWindow(windowFunc){
	windows.unshift(windowFunc);
}

function drawStats() 
{
  function calcStatWidth(stat) { return stat >= 50 ? (stat - 50) * 2 : (50 - stat) * 1.9; }

  function appendStat(elem, type, avatar){
    var avatarObj = eval(avatar);
		var appendTo;
		if (avatarObj == player) {
			appendTo = ".stat-bar--masc";	
			$(elem).children(appendTo).first().append("<div class='avatar-stat avatar-stat--maxmin'></div>");
			$(elem).children(appendTo).first().children(".avatar-stat--maxmin").first().css("width", calcStatWidth(avatarObj.minimums[type])+"%");
			appendTo = ".stat-bar--fem";
			$(elem).children(appendTo).first().append("<div class='avatar-stat avatar-stat--maxmin'></div>");		
			$(elem).children(appendTo).first().children(".avatar-stat--maxmin").first().css("width", calcStatWidth(avatarObj.maximums[type])+"%");
		}
		appendTo = avatarObj[type] >= 50 ? ".stat-bar--fem" : ".stat-bar--masc";			
    $(elem).children(appendTo).first().append("<div class='avatar-stat avatar-stat--"+avatar+"'></div>");
    $(elem).children(appendTo).first().children(".avatar-stat--"+avatar).first().css("width", calcStatWidth(avatarObj[type])+"%");
  }

  $(".stat-bar-container").each(function(){
    $(this).empty();
    $(this).append("<span class='stat-bar stat-bar--fem'></span><span class='stat-bar stat-bar--masc'></span>");
    var type = $(this).attr("id");
    appendStat(this, type, "player");
    appendStat(this, type, "rival");
  });

  $("#player_changra").html(player.changra);
	if (getPerceptionRate() >= getRandomInt(0, 100)) $("#rival_changra").html(rival.changra);
	else $("#rival_changra").html("?");

  $("#player_women").html(player.women.length);
  $("#rival_women").html(rival.women.length);

  $("#player_perception").html(player.perception());
	$("#player_experience").html(player.experience);
}

function ChoiceMessage(message,title,options){
	var wnd= function(){
		var buttons = "";
		for(var o in options){
			buttons+=`<button id="${o}" class="btn push--right" title=${options[o].text}>${options[o].text}</button>`;
		}
		var msg = `<h1>${title}</h1>${message}`;
		$(".stats").hide();
		$("#output").html("<div id='message'></div>\
			<div id='end_buttons' class='push--top'></div>");
		$("#message").html(msg);
		$("#end_buttons").html(buttons);
		for(var o in options){
			$("#"+o).click(options[o].action);
		}
		redraw();
	}
	newWindow(wnd);
}

function EndRound(){
	Camp();
}


function Message(action, message, noclick,character){
	var wnd = function(){
		$(".stats").hide();
		$("#output").html("<div id='message' class='clickable'>"+message+"</div>");
		if(character){
			rival=character;
			redraw();
		}
		if (noclick !== true) {
			$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");

			$("#message").click(
				function() {
					$(".stats").show();
					if(typeof action=="string"){
						eval(action);
					}else if(typeof action=="function"){
						action();
					}
				}
			);
		}
	}
	newWindow(wnd);
}
