// Exploring/Hunting
/*jshint multistr:true*/

function getPlaceCnt(place)
{
	if (isNaN(places[place])) return 0;
	return places[place];
}
function setPlaceVisited(place)
{
	if (isNaN(places[place])) places[place] = 1;
	else places[place] += 1;
}

function Forage()
{
	if ($("#forage_buttons").is(":visible")) {
		$("#camp_feed").html("");
		return;
	}
	if ($("#women_buttons").is(":visible")) resetRival();

	if (player.round > 10 && getPlaceCnt("Volcano") === 0) {
		setPlaceVisited("Volcano");
		Message(NextWindow, "<h2>Fire Mountain?</h2>\
		<p>You see a mountain smoking with red rivers flowing down it's side. Looks dangerous, but maybe you return there another time?");
		return;
	}

	$("#camp_feed").html(
		"<h2>Where do you forage?</h2>\
		<div id='forage_buttons' class='push--top'></div>\
		<div id='forage_display'></div>");

	// add places
	$("#forage_buttons").append("\
		<button id='forage_button_forest' class='btn btn-woman push--right' title='Forest'>Forest</button>\
		<button id='forage_button_hills' class='btn btn-woman push--right' title='Hills'>Hills</button>\
	");
	if (getPlaceCnt("Swamp") !== 0) {
		$("#forage_buttons").append("<button id='forage_button_swamp' class='btn btn-woman push--right' title='Explore the volcano'>Swamp</button>");
		$("#forage_button_swamp").click(
			function(){
				if (FindRandomEvent("Swamp")) return;
				var val = getRandomInt(1, 100);
				if (val < 10) WanderFood("<h1>Found: Small Melon</h1><p>You find small strange melon, it may feed your clan</p>", "eatSmallMelonYou", "eatSmallMelonWoman", 1);
				else if (val < 20) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman", 1);
				else if (val < 30) WanderFood("<h1>Found: Heavy Melon</h1><p>You find strange and heacy melon, it may feed your clan</p>", "eatMelonYou", "eatMelonWoman", 2);
				else if (val < 35) WanderFood("<h1>Found: Large Swollen Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatMaternalNutYou", "eatMaternalNutWoman", 2);
				else if (val < 55) WanderFood("<h1>Found: Tough Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDominationNutYou", "eatDominationNutWoman", 1);
				else if (val < 65) WanderFood("<h1>Found: Green Berry</h1><p>You find small green berry that smells strange, it may feed your clan</p>", "eatGreenBerryYou", "eatGreenBerryWoman", 1);
				else if (val < 75) WanderFood("<h1>Found: Pale Berry</h1><p>You find small pale berry that smells strange, it may feed your clan</p>", "eatPaleBerryYou", "eatPaleBerryWoman", 1);
				else if (val < 85) WanderFood("<h1>Found: Dark Berry</h1><p>You find small dark coloured berry that smells strange, it may feed your clan</p>", "eatDarkBerryYou", "eatDarkBerryWoman", 1);
				else if (val < 95) WanderFood("<h1>Found: Rainbow Flower</h1><p>You find small multicoloured flower that looks surprisingly edible, it may feed your clan</p>", "eatRainbowflowerYou", "eatRainbowflowerWoman", 1);
				else WanderBattle("cold swamp");
			}
		);
	};
	if (getPlaceCnt("Beach") !== 0) {
		$("#forage_buttons").append("<button id='forage_button_beach' class='btn btn-woman push--right' title='Explore the volcano'>Beach</button>");
		$("#forage_button_beach").click(
			function(){
				if (FindRandomEvent("Beach")) return;
				var val = getRandomInt(1, 100);
				if (val < 20) WanderFood("<h1>Found: Swollen Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatMaternalNutYou", "eatMaternalNutWoman", 1);
				else if (val < 35) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman", 1);
				else if (val < 50) WanderFood("<h1>Found: Pretty Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatAllureNutYou", "eatAllureNutWoman", 1);
				else if (val < 65) WanderFood("<h1>Found: Paw Fruit</h1><p>You find small fruit look like paw, you feel the force of your ancestors in it</p>", "eatPawFruitYou", "eatPawFruitWoman", 1);
				else if (val < 80) WanderFood("<h1>Found: Tri-Sea-thing</h1><p>You find strange sea creature, long and slimy with three bodies, it may feed your clan</p>", "eatTriCreatureYou", "eatTriCreatureWoman", 1);
				else if (val < 90) WanderFood("<h1>Found: Hairy Nut</h1><p>You find a large nut, it may feed your clan</p>", "eatHairyNutYou", "eatHairyNutWoman", 1);
				else if (val < 95) WanderNothing();
				else WanderBattle("chilly beach");
			}
		);
	};
	if (getPlaceCnt("Volcano") !== 0) {
		$("#forage_buttons").append("<button id='forage_button_volcano' class='btn btn-woman push--right' title='Explore the volcano'>Volcano</button>");
		$("#forage_button_volcano").click(
			function(){
				if (FindRandomEvent("Volcano")) return;
				var val = getRandomInt(1, 100);
				if (val < 20) WanderFood("<h1>Found: Tough Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDominationNutYou", "eatDominationNutWoman", 1);
				else if (val < 45) WanderFood("<h1>Found: Pretty Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatAllureNutYou", "eatAllureNutWoman", 1);
				else if (val < 65) WanderFood("<h1>Found: Long Nut</h1><p>You find long nut, you feel the force of your ancestors in it</p>", "eatOrientationNutYou", "eatOrientationNutWoman", 1);
				else if (val < 85) WanderFood("<h1>Found: Large Swollen Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatMaternalNutYou", "eatMaternalNutWoman", 2);
				else if (val < 95) WanderFood("<h1>Found: Red Nut</h1><p>You find small red nut that smells of fire, it may feed your clan</p>", "eatDemonNutYou", "eatDemonNutWoman", 1);
				else if (val < 95) WanderFood("<h1>Found: Split Mushroom</h1><p>You find strange mushroom, with long and stiff shape and two stalks, it may feed your clan</p>", "eatTwinMushroomYou", "eatTwinMushroomWoman", 1);
				else WanderBattle("hot volcano");
			}
		);
	}
	if (smith.goods > 0) {
		$("#forage_buttons").append("<button id='forage_button_smith' class='btn btn-woman push--right' title='Visit Smith'>Visit " + smith.name + "</button>");
		$("#forage_button_smith").click(function(){TradeSmith();});
	}

	$("#forage_button_forest").click(
		function(){
			if (FindRandomEvent("Forest")) return;
			var val = getRandomInt(1, 100);
			if (val < 20) WanderFood("<h1>Found: Tough Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDominationNutYou", "eatDominationNutWoman", 1);
			else if (val < 40) WanderFood("<h1>Found: Pretty Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatAllureNutYou", "eatAllureNutWoman", 1);
			else if (val < 50) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman", 1);
			else if (val < 70) WanderFood("<h1>Found: Grapes</h1><p>You find some odd grapes, with double berries, it may feed your clan</p>", "eatGrapesYou", "eatGrapesWoman", 1);
			else if (val < 95) WanderFood("<h1>Found: Melon</h1><p>You find strange melon, it may feed your clan</p>", "eatMelonYou", "eatMelonWoman", 1);
			else WanderBattle("snow forest");
		}
	);
	$("#forage_button_hills").click(
		function(){
			if (FindRandomEvent("Hills")) return;
			var val = getRandomInt(1, 100);
			if (val < 20) WanderFood("<h1>Found: Clean Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatDomesticNutYou", "eatDomesticNutWoman", 1);
			else if (val < 35) WanderFood("<h1>Found: Long Nut</h1><p>You find long nut, you feel the force of your ancestors in it</p>", "eatOrientationNutYou", "eatOrientationNutWoman", 1);
			else if (val < 50) WanderFood("<h1>Found: Mushroom</h1><p>You find strange mushroom, with long and stiff shape, it may feed your clan</p>", "eatMushroomYou", "eatMushroomWoman", 1);
			else if (val < 75) WanderFood("<h1>Found: White Nut</h1><p>You find small white nut that smells of milk, it may feed your clan</p>", "eatMilkNutYou", "eatMilkNutWoman", 1);
			else if (val < 85) WanderFood("<h1>Found: Melon</h1><p>You find strange melon, it may feed your clan</p>", "eatMelonYou", "eatMelonWoman", 1);
			else if (val < 95) {
				if (smith.goods > 0) WanderFood("<h1>Found: Pretty Nut</h1><p>You find small nut, you feel the force of your ancestors in it</p>", "eatAllureNutYou", "eatAllureNutWoman", 1);
				else if (smith.round > 0) TradeSmith();
				else MeetSmith();
			}
			else WanderBattle("snow hills");
		}
	);
}

function Hunt()
{
	if ($("#wander_buttons").is(":visible")) {
		$("#camp_feed").html("");
		return;
	}
	if ($("#women_buttons").is(":visible")) resetRival();

	if (player.round > 10 && getPlaceCnt("Volcano") === 0) {
		setPlaceVisited("Volcano");
		EndRound(Message(NextWindow, "<h2>Fire Mountain?</h2>\
		<p>You see a mountain smoking with red rivers flowing down it's side. Looks dangerous, but maybe you return there another time?"));
		return;
	}

	$("#camp_feed").html(
		"<h2>Where do you hunt?</h2>\
		<div id='wander_buttons' class='push--top'></div>\
		<div id='wander_display'></div>");
	//$.each(places, function(index, place) { $("#wander_display").append(index + ": " + place + ", ");	});

	// add places
	$("#wander_buttons").append("\
		<button id='wander_button_forest' class='btn btn-woman push--right' title='Forest'>Forest</button>\
		<button id='wander_button_hills' class='btn btn-woman push--right' title='Hills'>Hills</button>\
	");
	
	if (getPlaceCnt("Swamp") !== 0) {
		$("#wander_buttons").append("<button id='wander_button_swamp' class='btn btn-woman push--right' title='Swamp'>Swamp</button>");
		$("#wander_button_swamp").click(
			function(){
				if (FindRandomEvent("Swamp")) return;
				WanderBattle("cold swamp");
			}
		);
	};
	if (getPlaceCnt("Beach") !== 0) {
		$("#wander_buttons").append("<button id='wander_button_beach' class='btn btn-woman push--right' title='Beach'>Beach</button>");
		$("#wander_button_beach").click(
			function(){
				if (FindRandomEvent("Beach")) return;
				WanderBattle("chilly beach");
			}
		);
	};
	
	if (getPlaceCnt("Volcano") !== 0) {
		$("#wander_buttons").append("<button id='wander_button_volcano' class='btn btn-woman push--right' title='Explore the volcano'>Volcano</button>");
		$("#wander_button_volcano").click(
			function(){
				if (FindRandomEvent("Volcano")) return;
				var val = getRandomInt(1, 7);
				if (getPlaceCnt("Volcano") == 2) val = 0;
				if (val < 4) MeetDemon();
				else WanderBattle("hot volcano");
			}
		);
	}
	$("#wander_button_forest").click(
		function(){
			if (FindRandomEvent("Forest")) return;
			WanderBattle("snow forest");
		}
	);
	$("#wander_button_hills").click(
		function(){
			if (FindRandomEvent("Hills")) return;
			if (player.round > 15 && smith.round === 0) {
				MeetSmith();
				return;
			}
			var val = getRandomInt(1, 7);
			if (val < 3 && smith.round > 0 && smith.goods === 0) TradeSmith();
			else WanderBattle("snow hills");
		}
	);
}


// Find a rival

function WanderBattle(plc)
{
  if (player.women.length === 0) {
		MeetThoth();
		return;
	}
	if(player!==leader){//for now, no fights if not the leader of the camp.
		Message(NextWindow,`<p>You find nothing. Return to ${leader.name} empty handed.</p>`);
		EndRound();
		return;
	}
	rival = undefined;

	// A quest?
	// - Hunt for Weshptah
	checkBoss1(plc);
	
	if (rival === undefined) {
		// Any runaways
		if (runaways.length > 0 && getRandomInt(1, 100) < 10) {
			rival = runaways[getRandomInt(0, runaways.length - 1)];
			rival.experience += 5;
			EncounterNamedRival();
		} else {
			// Generic Rival
			var exp = Math.floor(player.getTrainingRanks() * (getRandomInt(40, 120) / 100)) * 5;
			createRival(exp);
		}
	}
	var bAvoid = player.Mods.perception > 0 && (player.Mods.perception * 5) >= getRandomInt(0, 100);
	var str = "<h1>Wandering</h1><p>You wander through " + plc + " until spot lone man";

	if (bAvoid) {
		// can avoid
		str += ". He no see you yet";
	}
	str += " " + rival.getRecognise();
	
	if (bAvoid) {
		str += ".<div id='fight_buttons' class='push--top'></div>" +
			"<button id='fight_button_fight' class='btn btn-woman push--right' title='Take him!'>Fight</button>" +
			"<button id='fight_button_leave' class='btn btn-woman push--right' title='Leave'>Leave</button>";
	} else {
		str += ". He see you and grin. He think you become womanfolk of his clan. He wrong.</p>";
		str += ".<div id='fight_buttons' class='push--top'></div>" +
			"<button id='fight_button_fight' class='btn btn-woman push--right' title='Take him!'>Fight</button>"
	}
	
	str += "<button id='fight_button_auto' class='btn btn-woman push--right' title='Auto Fight'>Quick Fight</button>";

	$("#output").html(str);
	$("#fight_button_fight").click(
		function(){
			Battle(rival, false);
		}
	);
	$("#fight_button_leave").click(
		function() {
			Message(NextWindow, "You no want this weakling and leave him.");
			EndRound();
		}
	);
	$("#fight_button_auto").click(
		function() {
			Battle(rival, true);
		}
	);
}



// Found a consumable item (common function)

function WanderFood(desc, actionyou, actionwoman, pow)
{
	$("#output").html(desc);

	$("#output").append("<h2>Who will eat it?</h2>\
	<div id='eat_buttons' class='push--top'>\
	<button id='eat_button_you' class='btn btn-woman push--right'>You (Raw)</button></div>");
	$("#eat_button_you").click(function(){eval(actionyou + "(false, " + pow + ")");EndRound();});
	if (player.Mods.infuse > 0 && player.goods > 0) {
		$("#eat_buttons").append("<button id='eat_button_you_infuse' class='btn btn-woman push--right'>You (Cooked)</button>");
		$("#eat_button_you_infuse").click(function(){
			fBefore = player.isFemale();
			eval(actionyou + "(true, " + pow + ")");
			EndRound();
		});
	}
	function drawEatButton(person,index){
		if (person.isFutanari()) {$("#eat_buttons").append("<button id='woman_button_"+index+"' class='btn btn-futa push--right'>"+person.name+"</button>");
			}else if (person.isFemale()) {$("#eat_buttons").append("<button id='woman_button_"+index+"' class='btn btn-woman push--right'>"+person.name+"</button>");
			}else {$("#eat_buttons").append("<button id='woman_button_"+index+"' class='btn btn-man push--right'>"+person.name+"</button>");}

		$("#woman_button_"+index).click(function(){
			if ($("#woman_eat_buttons").is(":visible")) {
					$("#eat_button_Woman").unbind('click').click(function(){
						eval(actionwoman + "(false, " + pow + ")");
						EndRound();
					});
					$("#eat_button_Woman_Cooked").unbind('click').click(function(){
						eval(actionwoman + "(true, " + pow + ")");
						EndRound();
					});
			} else {
				$("#eat_buttons").append("<div id='woman_eat_buttons' class='push--top'>\
				<button id='eat_button_Woman' class='btn btn-woman push--right'>Choose (Raw)</button>\</div>");

				$("#eat_button_Woman").click(function(){
					eval(actionwoman + "(false, " + pow + ")");
					EndRound();
				});
				if (player.Mods.infuse > 0 && player.goods > 0) {
					$("#woman_eat_buttons").append("<button id='eat_button_Woman_Cooked' class='btn btn-woman push--right'>Choose (Cooked)</button>");

					$("#eat_button_Woman_Cooked").click(function(){
						eval(actionwoman + "(true, " + pow + ")");
						EndRound();
					});
				}
			}

			rival = person;
			fBefore = rival.isFemale();
			$(".stats").show();
			$("#otherstats").show();
			redraw();
		});
	};
	if(player===leader){
		$.each(leader.women, function( index, value ) {
			drawEatButton(leader.women[index],index);
		});
	}else{
		drawEatButton(leader,"leader");
	}

	$("#eat_buttons").append("<button id='eat_button_throw' class='btn btn-woman push--right'>Other Use</button>");

	$("#eat_button_throw").click(function(){
		var bonus = leader.women.filter(x=>x.dysphoria-getRandomInt(0,30)<=0).reduce((x,w)=>w.domesticity/30+x,2);//get more if there's a bunch of women.
		player.goods += bonus;
		Message(NextWindow, "<h1>Other Use</h1><p>You store it away to be used as needed for crafting.</p>");
		EndRound();
	});
	
	//TODO: Store it as its own item!
	$("#eat_buttons").append("<button id='eat_button_store' class='btn btn-woman push--right'>Store it!!</button>");
	$("#eat_button_store").click( function(){
		//Depending on what it is, store it accordingly!
		if (actionyou == "eatMushroomYou") {
			camp_Mushrooms++;
		} else if (actionyou == "eatGrapesYou") {
			camp_Grapes++;
		} else if (actionyou == "eatMelonYou") {
			camp_Melons++;
		} else if (actionyou == "eatSmallMelonYou") {
			camp_SmallMelons++;
		} else if (actionyou == "eatDominationNutYou") {
			camp_ToughNuts++;
		} else if (actionyou == "eatDomesticNutYou") {
			camp_CleanNuts++;
		} else if (actionyou == "eatMaternalNutYou") {	
			camp_SwolenNuts++;
		} else if (actionyou == "eatAllureNutWoman") {
			camp_PrettyNuts++;
		} else if (actionyou == "eatOrientationNutYou") {
			camp_LongNuts++;
		} else if (actionyou == "eatPaleBerryYou") {
			camp_PaleBerries++;
		} else if (actionyou == "eatDarkBerryYou") {
			camp_DarkBerries++;
		} else if (actionyou == "eatTriCreatureYou") {
			camp_TriCreatures++;
		} else if (actionyou == "eatHairyNutYou") {
			camp_HairyNuts++;
		} else if (actionyou == "eatDemonNutYou") {	
			camp_RedNuts++;
		} else if (actionyou == "eatTwinMushroomYou") {
			camp_TwinMushrooms++;
		} else if (actionyou == "eatGreenBerryYou") {	
			camp_GreenBerries++;
		} else if (actionyou == "eatPawFruitYou") {	
			camp_PawFruits++;
		} else if (actionyou == "eatRainbowflowerYou") {	
			camp_RainbowFlowers++;
		} else {
			
		}
		Message("Camp()", "<h1>Store it</h1><p>You store it away. For keeping.</p>");
		EndRound();
	});
	
}

function FindRandomEvent(plc)
{
	setPlaceVisited(plc);
		
	if (getRandomInt(1, 100) > 10) return false;	// No event
	
	var val = getRandomInt(1, 100);

	if (val < 10 && getPlaceCnt("Swamp") == 0) {
		setPlaceVisited("Swamp");
		Message(NextWindow, "<h1>Swamp</h1><p>You find a foul smelling wet place, full of many things to hunt, you must return here</p>");
	} else if (val < 50) FindAbandonedCamp();
	else WanderNothing();
	EndRound();
	
	return true;
}

// Find nothing
function WanderNothing()
{
	Message(NextWindow, "<h1>Failure</h1><p>You failed to hunt anything or anyone, and return to camp</p>");
}

// find abandoned camp
function FindAbandonedCamp()
{
	player.goods += getRandomInt(1, 10);
	var val = getRandomInt(1, 100);
	if (val < 25) Message(NextWindow, "<h1>Abandoned Camp</h1><p>You find a camp for a clan, look like it not used for long time. You find some things left behind and take back to your camp.</p>");
	else if (val < 50) Message(NextWindow, "<h1>Raided Camp</h1><p>You find a camp for a clan, it damaged, most things are burned. You see signs of people dragged away. You find some things left behind and take back to your camp.</p>");
	else if (val < 75) {
		if (getPlaceCnt("Volcano") !== 0 && !player.checkSwitch(1)) {
			rival = new Avatar(20, 60, 70, 70, 80);
			rival.Mods.breasts = 200;
			rival.name = "Osiris";
			redraw();
			$("#output").html(
				'<h1>Raided Camp</h1><p>You find a camp for a clan, it damaged, most things are burned. You look and find some things left behind and take back to your camp.</p>\
				<p>As you gather a woman challenges you!<br>\
				"Stop, this not your clan!"<br>\
				She has huge breasts, and looks at you defiantly<br>\
				"My man..was taken by a red woman away to the mountain of fire..but he return..soon"<p>\
				<p>You see she not believe it, and you think her man now serving that woman, as slave or full of her babies. You tell woman you take care of her and she become member of your clan. She look confused, wanting to wait for her man, but wanting safety of a clan</p>\
				<button id="take_woman" class="btn">Take Woman</button>\
				<button id="reject_woman" class="btn">Reject Woman</button>\
				');
			redraw();
			//TODO: This should be extracted into a separate file if we wish to make this character their own thing. - DSM 
			$("#take_woman").click(function () {
				rival.dysphoria = 0;
				redraw();
				$(".stats").hide();
				player.women.push(rival);
				Message(NextWindow, "<h1>" + rival.name + "</h1>\
				<p>You tell her that she now your woman! Her man now slave of red woman, and no hope for him. She say,<br>\
				<p>&quot;Me be your woman if you give me oath on your anccestors, take that red woman as slave!</p>\
				<p>This your desire so you give oath on ancestors spirits. She laugh in joy and tell you her name 'Osiris'</p>\
				");
			});
			$("#reject_woman").click(function() {
				Message(NextWindow, "You tell her to wait for her man. She look hopeful, you doubt you see her again.");
			});
			player.setSwitch(1);
		} else Message(NextWindow, "<h1>Raided Camp</h1><p>You find a camp for a clan, it damaged, most things are burned. You see signs of people dragged away. You find some things left behind and take back to your camp.</p>");
	}
	else Message(NextWindow, "<h1>A Clan No More</h1><p>You find a camp for a clan, it is empty, and you think it one that died out in the long winter and no women-folk. Sadly you look around and find some things abandoned and take back to your camp.</p>");
}
