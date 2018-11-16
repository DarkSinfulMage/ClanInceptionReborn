// At Camp
/*jshint multistr:true*/

// Return to Camp after a battle or foraging etc
// To allow for special events etc
var sexLastRound;

var activeCamp = "main";

//The camp now contains the inventory, which is usable by all. 
var camp_Mushrooms = 0;
var camp_Grapes = 0;

var camp_SmallMelons = 0;
var camp_Melons = 0;

var camp_ToughNuts = 0;
var camp_CleanNuts = 0;
var camp_SwolenNuts = 0;
var camp_PrettyNuts = 0;
var camp_LongNuts = 0;

var camp_RedNuts = 0;
var camp_WhiteNuts = 0;
var camp_GreenBerries = 0;
var camp_PawFruits = 0;
var camp_TwinMushrooms = 0;
var camp_TriCreatures = 0;

var camp_HairyNuts = 0;
var camp_RainbowFlowers = 0;
var camp_DarkBerries = 0;
var camp_PaleBerries = 0;


function Camp()
{
	triggerStoryHook("round");
	advanceRound();
	
	// Were you gender changed by the battle?
	if(showCamp){
		if(sexLastRound===undefined){
			sexLastRound = player.isFemale();
		}
		if (player.isFemale() !== sexLastRound) {
			Message(NextWindow, "<h1>You Changed!</h1><p>You now changed, you now " + (player.isFemale() ? "woman" : "man") + "!</p>");
			return;
		}
		sexLastRound = player.isFemale();
		
	}
	var blockShow=false;
	
	/*$.each(player.women, function( index, value ) {
		var rival = player.women[index];//moving to activity
		/*
		if (index > 0 && !rival.isFemale() && rival.items.collar === 0 && getRandomInt(1, 100) < (100 - rival.submissiveness)) {	
				//blockShow=true;
				//return false;
		}else{*/
			// They runaway!
			/*Message("ShowCamp()", "<h1>" + rival.name + " Run Away!</h1><p>" + player.women[0].name + " tell you how " + rival.name + " had talked about leaving to form his own clan! He gone now, run from you and your clan. Maybe you find him again and recapture!</p>");
			runaways.push(rival);
			player.women.splice(index, 1);
			$.each(AVATAR_TRAITS, function(idx, trait){
				rival[trait] = rival[trait] - 20;
			});
			return;*/
		//}
//	});

	
	// Actually enter camp and show the form
	//if(showCamp){//global value, reset each round. can be set by blocking activities. is there a cleaner way than global?
		//ShowCamp();
	//}
	NextWindow();
}
//will override showCamp and then run the function
function ForceShowCamp(){
	showCamp=true;
	ShowCamp();
}
// Show the camp form
function ShowCamp()
{
	$("#rcwomen").hide();
	$("#rcchangra").hide();
	$(".stats").show();
	$("#otherstats").show();
	$("#goods").show();
	
	$("#player_goods").html(Math.floor(player.goods));
	if (player.Mods.craftnipplerings === 0) {
		$("#metal_label").hide();
	} else {
		$("#metal_label").show();
		$("#player_metal").html(player.metal);
	}
	
	fBeforeBattle = player.isFemale();
	var chb = 0;
	var chg = 0;
	$.each(player.women, function( index, value ) {
		chb += player.women[index].childrenboy;
		chg += player.women[index].childrengirl;
	});
	if (player.Mods.craftleftbracelet > 0) {
		if (player.isFemale() || player.isFutanari()) $("#player_kids").html(player.childrenboy + "&#9794;," + player.childrengirl + "&#9792;/" + chb + "&#9794;," + chg + "&#9792;");
		else $("#player_kids").html(chb + "&#9794;," + chg + "&#9792;");
	} else {
		if (player.isFemale() || player.isFutanari()) $("#player_kids").html((player.childrenboy + player.childrengirl) + "/" + (chb + chg));
		else $("#player_kids").html(chb + chg);
	}

	resetRival();
	
	$("#output").html("<h1>Camp - Week " + player.round + "</h1>");
	
	var ps = false;
	if(challengeResult!=""){//someone tried to usurp npc leader.
		$('#output').append(`<p align='left'>${challengeResult}</p>`);
	}
	if (player.activity !== "") {
		$("#output").append("<p align='left'>" + player.activity+"</p>");
		//ps = true;
	}/* This is taken care of elsewhere for now. I think
	$.each(player.women, function( index, value ) {
		if (player.women[index].activity.indexOf("birth") != -1) {
			if (ps === false) {
				ps = true;
				$("#output").append("<p align='left'>");
			}
			$("#output").append(player.women[index].activity.split("She").join(player.women[index].name));
		}
		if (ps) $("#output").append("</p>");
	});*/
	if(player.doneTo){
		$("#output").append(`<p>${player.doneTo}</p>`);
	}
	if(player!==leader){
		var msg = "";
		if(player.dysphoria<8){
			msg=`You rub belly softly and think about carrying ${leader.name} baby inside. Maybe is good to be woman.`;
		}else if(player.dysphoria<20){
			msg=`Everything so different now that you not clan Father any more. You barely remember what it feel like to be man.`;
		}else if(player.dysphoria<60){
			msg=`You go around camp doing woman work, just like other women you take. Each day it becomes more natural to act like woman, think like woman. If you not careful, maybe you become one for real.`;
		}else{
			msg=`You stuck in woman body, maybe, but you not true woman yet. All you want do is fight hard, become man again and take ${leader.name} like the woman she is.`;
		}
		if(player.pierceMessage){
			$("#output").append(`<p>${player.pierceMessage}</p>`);
		}
		$("#output").append(`<p>${msg}</p>`);
	}
	
	//editPlayer();

	$("#output").append(
		"<button id='women_button' class='btn' title='Examine the women'>Women</button>\
		<button id='forage_button' class='btn' title='Forage!'>Forage</button>");
	if(leader===player){
		$("#output").append(" <button id='hunt_button' class='btn' title='Hunt!'>Hunt</button>");
	}else{
		$("#output").append(" <button id='tend_button' class='btn' title='Tend Camp'>Tend Camp</button>\
		 <button id='meditate_button' class='btn' title='Meditate'>Meditate</button>\
		 <button id='leader_button' class='btn' title='"+leader.name+"'>"+leader.name+"</button>");
	}
	if (player.experience > 0) {
		$("#output").append(" <button id='exp_button' class='btn' title='Train yourself'>Train</button>");
	}
	if (player.Mods.craftnipplerings > 0 && player===leader) {
		$("#output").append(" <button id='craft_button' class='btn' title='Craft'>Craft</button>");
	}
	
	//TODO: If the player is leader, they get access to the inventory.
	if (player===leader) {
		$("#output").append(" <button id='inventory_button' class='btn' title='Inventory'>Inventory</button>");
	}
	
	
	$("#output").append(
			" <button id='load_button' class='btn' title='Load the Saved game'>Load</button>\
			<button id='save_button' class='btn' title='Save the game'>Save</button>");
	
	$("#output").append("<div id='camp_feed'></div>");
		
  $("#meditate_button").click(function(){
  	for(var i in AVATAR_TRAITS){
  		eatStatNut(player,AVATAR_TRAITS[i],getRandomInt(-1*(1+player.Mods.ironwill),0));
  	}
  	player.dysphoria+=2;
  	EndRound(Message(NextWindow,"<p>You think deep, breath slow, try to kindle tiny changra into roaring flame.</p>"));
  });
  $("#women_button").click(displayWomen);
  $("#forage_button").click(Forage);
  $("#hunt_button").click(Hunt);
  $("#tend_button").click(function(){
  	eatStatNut(player,"submissiveness",3,false);
  	eatStatNut(player,"domesticity",5,false);
  	player.dysphoria-=3;
  	EndRound(Message(NextWindow,`You dutifully tend camp for ${leader.name}.`));
  });
  $("#leader_button").click(displayLeader);
  $("#load_button").click(function(){
		if (loadGame("ShowCamp()") === 0) alert("No saved games");
	});
  $("#save_button").click(function() {
		saveGame("ShowCamp()");
	});
	$("#exp_button").click(Train);
	$("#craft_button").click(Craft);
	
	//TODO: NEW INVY BUTTON
	$("#inventory_button").click(showInventoryScreen)
	
	if(player!==leader){//loss condition for submissive playstyle.
		console.log(player.dysphoria);
		if(player.dysphoria<=0){
			rival=leader;
			redraw();
			Message("location.reload()","<p>As you go sleep at night, you realize you not think all day about becoming man again. All you think about is tend camp, cook food, want babies.</p><p>You think about man. He big, powerful. You soft not like him at all, just soft, small woman. Why want fight him when you can be good clanmother for him instead.</p><p>By time you wake up next morning, you forget all silly dreams of becoming man. You woman now. That all you need to be happy.</p>",false,leader);
		}
	}
}
