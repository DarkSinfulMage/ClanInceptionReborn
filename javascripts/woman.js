//Woman Functions
/*jshint multistr:true*/

// Get an unused name for a new woman, to limit cases of the same name being randomly chosen
function getUnusedFemaleName() {
  var ntry = 0;
  var str = "";
  var nok;
  var usedNames = [...player.women];
  if(player!==leader){
  	usedNames = usedNames.concat(leader.women);
  	usedNames.push(player);
  }
  while (ntry < 5) {  // try 5 times
		nok = true;
    str = randomFemaleName();
		for (var i = 0; i < usedNames.length; i += 1 ) {
      if (usedNames[i].name == str) {
				nok = false;
				break;
			}
		}
    if (nok === true) break;
    ntry += 1;
  }
  return str;
}


function displayWomen(){
	function displayWoman(index){
		rival = leader.women[index];
		var options = ""
		if(leader===player){
			options += " <button id='fuck_button' class='btn'>Fuck</button> ";
			if(leader.women[index].allowForage==true){
				options +=" <button id='let_forage_button' class='btn'>Stop Letting Forage</btn> ";
			}else{
				options +=" <button id='let_forage_button' class='btn'>Start Letting Forage</btn> ";
			}
			if(rival.masculinity()<leader.masculinity()){
				options +=" <button id='punish_woman_button' class='btn'>Punish</button>";
			}
			if((rival.masculinity()>leader.masculinity() || rival.isMale()) && (rival.dysphoria>0)){
				options += "&nbsp; <button id='challenge_woman_button' class='btn'>Challenge</btn> ";
			}
			if((rival.masculinity()>(leader.masculinity()*1.25))&&leader.isFemale()&&rival.isMale() && (rival.physique.penis<8) && (player.physique.breasts>4)){
				options += "&nbsp; <button id='submit_woman_button' class='btn'>Submit</btn> ";
			}
		}else{//Give player social options.
			if((rival!==player)&&(!player.socialActivity)){
				if((rival.isFemale()&&player.orientation<65)||(rival.isMale()&&player.orientation>45)){
					options += " <button id='social_flirt_button' class='btn'>Flirt</button>";
				}
				if(player.dysphoria<15&&((rival.isFemale()&&player.orientation<65)||(rival.isMale()&&player.orientation>45))){
					options += " <button id='social_seduce_button' class='btn'>Seduce</button>";
				}
				if(player.dysphoria>20){
					options += " <button id='social_complain_button' class='btn'>Complain</button>";
				}
				if(player.dysphoria<15 && player.domesticity>rival.domesticity){
					options += " <button id='social_teach_button' class='btn'>Teach</button>";
				}
			}
			
		}
		var socialOpts = {"flirt":"flirtWoman","seduce":"seduceWoman", "complain":"complainToOther", "teach":"teachWoman"};
		$("#woman_options").html(options);
		for(var opt in socialOpts){
			$("#social_"+opt+"_button").click({i:index,display:displayWoman,option:socialOpts[opt]},function(evt){
				player.socialActivity=evt.data.option;
				player.socialTarget=leader.women[evt.data.i];
				evt.data.display(evt.data.i);
			});
		};
		$("#punish_woman_button").click(index,function(evt){
			var response = "";
			rival=leader.women[evt.data];
			if(!rival.naughty){
				response = `"Why you punish?" ${rival.name} cry. "Me been good woman!"`;
				rival.dysphoria+=15;
			}else{
				response = `"Me sorry!" ${rival.name} cry, begging you to stop. "I be good from now on."`;
				rival.dysphoria-=getRandomInt(5,17);
			}
			var activity = `<p>Face stern, you call ${rival.name} over to face you.</p><p>"You have been bad!" you tell ${rival.youhimher}, "Now I punish you."</p>\
				<p>${rival.YouHeShe} protest, but you clan leader, so ${rival.youheshe} must obey when you pull her over knee and slap bottom. Soon ${rival.youheshe} crying womanly tears.</p>\
				<p>${response}</p>\
				<p>When you feel ${rival.youheshe} punished enough, you let ${rival.youhimher} off lap to rub sore bottom.</p>`;
			EndRound(Message(NextWindow,activity));
		});
		$("#let_forage_button").click({i:index,display:displayWoman},function(evt){
			console.log(evt.data);
			leader.women[evt.data.i].allowForage = !leader.women[evt.data.i].allowForage;
			evt.data.display(evt.data.i);
		});
		$("#fuck_button").click(index,function(evt){
			leader.women[evt.data].activity="";
			//leader.women[evt.data].fornicate();
			var activities = leader.fuckCharacter(leader.women[evt.data],true);
			leader.women[evt.data].doneTo=activities[1];
			console.log(activities[0]);
			EndRound(Message(NextWindow,activities[0],false,leader.women[evt.data]));
			//resetRival();
			$("#camp_feed").html("");
		});
		$("#submit_woman_button").click(index,function(evt){
			rival = player.women[evt.data];
			var newName = getUnusedFemaleName();
			makeLeader(player,rival,true,newName);
			player.dysphoria=3*player.masculinity()+10*player.Mods.ironwill;
			AVATAR_TRAITS.forEach(x=>player[x]<50?eatStatNut(player,x,getRandomInt(15,35)):eatStatNut(player,x,getRandomInt(5,20)));
			EndRound(Message(NextWindow,`<h1>Submit</h1><p>You try to be good leader and clanfather, but it is not working. Look at your body, it is soft and womanly. How can you be father when you not have man parts anymore? You look at ${rival.name}. He taken as woman, but instead become strong man. Maybe you not supposed to be clan father after all. Maybe your place is clanmother and woman to strong leader?</p><p>${rival.name} surprised when you drop to knees and take his man-thing in mouth, but soon he happily accept your submission. Now you not clan leader anymore. You just clan leader\'s woman like all the others. He thrust in and out of your hungry fuckhole, breeding you into new clan mother.</p><p>You not sure if this was best idea, but it is done. He is leader now, and will not give that up without fight.</p>`));
		});
		$("#challenge_woman_button").click(index,function(evt){
			var w = player.women[evt.data];
			function startFight(){
				function chVictory(){
					rival.dysphoria-=15;
					if(rival.dysphoria>0){rival.dysphoria=0;}
					EndRound(Message(NextWindow,`<h1>Victory</h1><p>Soon ${rival.heshe} no resist your powerful changra as you turn her into back into docile woman. You clanfather here, she your woman. Is good to remind her this. Soon she docile and happy like all the rest.</p>`));
				}
				function chDefeat(){
					var newName = getUnusedFemaleName();
					var oldName=player.name;
					makeLeader(player,rival,true,newName);
					player.dysphoria=3*player.masculinity()+10*player.Mods.ironwill;
					/*$.each(AVATAR_TRAITS, function(index, trait) {
						player.natural[trait] = player[trait];
					});*/
					EndRound(Message(NextWindow,`<h1>Defeat!</h1><p>"Ha!" say ${rival.name}. "You try make me your woman, but you wrong. You no man, you woman now. I call you ${newName}."</p>\
						<p>You try resist, say name is ${oldName}, not ${newName}, but it no use. Your changra slow, weak. It no listen when you try become man again. He man now, though. Can no fight him anymore, no resist. Only let him take you as woman and try escape later.</p>`));
				}
				rival = w;
				EncounterNamedRival(rival);
				for(var s in rival.natural){
					rival[s]=rival.natural[s];//restore rival for the challenge
				}
				rival.Victory = chVictory;
				rival.Defeat = chDefeat;
				$(".stats").show();
				Battle(rival,false);
			}
			Message(NextWindow,`<p>You challenge unruly ${w.name}, remind ${w.himher} that ${w.heshe} belong to you.</p><p>Thrill of battle revive ${w.hisher} dorman changra.</p>`);
		});
		if (player.Mods.craftleftbracelet > 0) $("#woman_display").html("<h2 style='margin-bottom:2px;'>"+rival.name+"</h2><font size='-1'>Children: " + rival.childrenboy + " boys, " + rival.childrengirl + " girls</font>");
		else $("#woman_display").html("<h2 style='margin-bottom:2px;'>"+rival.name+"</h2><font size='-1'>Children: " + rival.childrenboy + "</font>");
		if (rival.round > 0) $("#woman_display").append("<font size='-1'>, Brought to clan on week " + rival.round + "</font>");

		//editWoman();
		
		// Description
		var fate = rival.activity;
		$("#woman_display").append("<p>"+fate+"</p>");
		var acceptance="";
		if(rival.dysphoria<=0){
			acceptance=`${rival.HeShe} very happy in camp. Want nothing more than to be woman and mother for clan.`;
		}else if(rival.dysphoria<20){
			acceptance=`${rival.HeShe} hum happy song as ${rival.heshe} work.`;
		}else if(rival.dysphoria<45){
			acceptance=`${rival.name} mutter about becoming woman, but ${rival.heshe} smile while doing it.`;
		}else if(rival.dysphoria<75){
			acceptance=`${rival.name} stomp around camp unhappy. Say ${rival.heshe} not real woman, ${rival.heshe} man instead, but ${rival.heshe} look and act more like woman every day.`;
		}else{
			acceptance=`${rival.name} complain loudly to all that ${rival.heshe} is really big, strong man. ${rival.HeShe} vow to ancestors that ${rival.heshe} will become strong clanfather again one day.`;
		}
		$("#woman_display").append("<p>"+acceptance+"</p>");
		redraw();
	}
		
	if ($("#women_buttons").is(":visible")) {
		$("#camp_feed").html("");
		resetRival();
		return;
	}

	$("#camp_feed").html(
		"<div id='women_buttons' class='push--top'></div>\
		<div id='woman_options'></div>\
		<div id='woman_display'></div>");
		
	$.each(leader.women, function( index, value ) {
		var curBtn = $("<button id='woman_button_"+index+"' class='btn push--right'>"+value.name+"</button>");
		/*
			if (leader.women[index].isFutanari()) $("#women_buttons").append("<button id='woman_button_"+index+"' class='btn btn-futa push--right'>"+value.name+"</button>");
			else if (leader.women[index].isFemale()) $("#women_buttons").append("<button id='woman_button_"+index+"' class='btn btn-woman push--right'>"+value.name+"</button>");
			else $("#women_buttons").append("<button id='woman_button_"+index+"' class='btn btn-man push--right'>"+value.name+"</button>");
			$("#woman_button_"+index).click(function(){
				displayWoman(index);

			});*/
		if(leader.women[index].isFutanari()){curBtn.addClass("btn-futa");}
		else if (leader.women[index].isFemale()){curBtn.addClass("btn-woman");}
		else {curBtn.addClass("btn-man");}
		if(leader.women[index]===player){
			curBtn.addClass("btn-player");
		}
		$("#women_buttons").append(curBtn);
		$("#woman_button_"+index).click(function(){
			displayWoman(index);
		})
	});
}


function editWoman()
{
		$("#woman_display").append(
		"<font size='-1'>\
		<a id='expandwoman' href='#'>Click Here To Edit " + rival.name + "</a>\
		<table class='slidertable3' id='womantable'>\
			<tr><td>Submissiveness</td><td><div id='slider_submissiveness'></div></td><td>Dominance</td></tr>\
			<tr><td>Domesticity</td><td><div id='slider_domesticity'></div></td><td>Adventurousness</td></tr>\
			<tr><td>Maternalism</td><td><div id='slider_maternalism'></div></td><td>Paternalism</td></tr>\
			<tr><td>Allure</td><td><div id='slider_allure'></div></td><td>Lustfulness</td></tr>\
			<tr><td>Homosexual</td><td><div id='slider_orientation'></div></td><td>Heterosexual</td></tr>\
			<tr><td>Boobs+</td><td><div id='slider_boobs'></div></td></tr>\
			<tr><td>Breast Rows</td><td><div id='slider_rows'></div></td></tr>\
			<tr><td>Genitals</td><td><div id='slider_cocks'></div></td></tr>\
			<tr><td>Cock+</td><td><div id='slider_cock'></div></td></tr>\
			<tr><td>Balls</td><td><div id='slider_balls'></div></td></tr>\
			<tr><td>Amazon+</td><td><div id='slider_amazon'></div></td></tr>\
			<tr><td>Horns</td><td><div id='slider_horns'></div></td></tr>\
			<tr><td>Tail</td><td><div id='slider_tail'></div></td></tr>\
			<tr><td>Pregnancy</td><td><div id='slider_pregnancy'></div></td></tr>\
		</table></font>\
		");
	$('#expandwoman').click(function(){
		$('#womantable').slideToggle('fast');
	});
	$("#slider_maternalism").slider({value:100 - rival.maternalism,min:0,max:100,slide:function(event, ui) {
		rival.maternalism=100-ui.value;
		redraw();
	}});
	$("#slider_submissiveness").slider({value:100-rival.submissiveness,min:0,max:100,slide:function(event, ui) {
		rival.submissiveness=100-ui.value;
		redraw();
	}});
	$("#slider_domesticity").slider({value:100-rival.domesticity,min:0,max:100,slide:function(event, ui) {
		rival.domesticity=100-ui.value;
		redraw();
	}});
	$("#slider_allure").slider({value:100-rival.allure,min:0,max:100,slide:function(event, ui) {
		rival.allure=100-ui.value;
		redraw();
	}});
	$("#slider_orientation").slider({value:100-rival.orientation,min:0,max:100,slide:function(event, ui) {
		rival.orientation=100-ui.value;
		redraw();
	}});
	$("#slider_boobs").slider({value:rival.Mods.breasts,min:-20,max:200,slide:function(event, ui) {
		rival.Mods.breasts = ui.value;
		redraw();
	}});
	$("#slider_amazon").slider({value:rival.Mods.amazon,min:0,max:20,slide:function(event, ui) {
		rival.Mods.amazon = ui.value;
		redraw();
	}});
	$("#slider_cock").slider({value:rival.Mods.cock,min:0,max:20,slide:function(event, ui) {
		rival.Mods.cock = ui.value;
		redraw();
	}});
	$("#slider_balls").slider({value:rival.Mods.balls,min:0,max:20,slide:function(event, ui) {
		rival.Mods.balls = ui.value;
		redraw();
	}});
	$("#slider_rows").slider({value:rival.physique.breastrows,min:0,max:6,slide:function(event, ui) {
		rival.physique.breastrows = ui.value;
		redraw();
	}});
	$("#slider_cocks").slider({value:rival.physique.gentialscnt,min:0,max:6,slide:function(event, ui) {
		rival.physique.gentialscnt = ui.value;
		redraw();
	}});
	$("#slider_horns").slider({value:rival.physique.horns,min:0,max:10,slide:function(event, ui) {
		rival.physique.horns = ui.value;
		redraw();
	}});
	$("#slider_tail").slider({value:rival.physique.tail,min:0,max:10,slide:function(event, ui) {
		rival.physique.tail = ui.value;
		redraw();
	}});
	$("#slider_pregnancy").slider({value:rival.pregnancy,min:0,max:100,slide:function(event, ui) {
		rival.pregnancy = ui.value;
		redraw();
	}});
}

