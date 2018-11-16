//
// rival object, generally your oponent in combat, but can also be used as in intermediate object when
// reviewing your clan or meeting other people
/*jshint multistr:true*/
var rival;

// Functions



function EncounterNamedRival(currentRival)
{
	// Standard Victory/Defeat/Tells for Generic man
	console.log(currentRival);
	if(typeof currentRival !=="undefined"){
		rival=currentRival;
	}
	console.log(rival);
	rival.Victory = RivalVictory;
	rival.Defeat = RivalDefeat;
	rival.getTell = RivalGetTell;
	rival.spendExperience = RivalSpendExperience;
	rival.determineAttackTrait = RivalDetermineAttackTrait;
	rival.goods += getRandomInt(3, 10);

	rival.spendExperience();
	rival.experience = 0;
}

function updateRival()
{
	rival.Mods.breasts = player.Mods.breasts;
	rival.Mods.amazon = player.Mods.amazon;
	rival.Mods.cock = player.Mods.futa;
	rival.capTraits();
	rival.calcPhysique();
}

// Reset to a average person, with stats all in the center, no bars shown
function resetRival()
{
	rival = new Avatar(50, 50, 50, 50, 50);
	redraw();
}


// Generic Man

// Create
function createRival(exp)
{
	// Stats
	var femininity = getRandomInt(15, 35) - (exp / 5);		// 15-35 median for stats
	if (femininity < 6) femininity = 6;
	var minTrait = femininity - 10;
	var maxTrait = femininity + 10;
	rival = new Avatar(getRandomInt(minTrait, maxTrait), getRandomInt(minTrait, maxTrait), getRandomInt(minTrait, maxTrait), getRandomInt(minTrait, maxTrait), getRandomInt(minTrait, maxTrait));

	// Standard Victory/Defeat/Tells for Generic man
	rival.Victory = RivalVictory;
	rival.Defeat = RivalDefeat;
	rival.getTell = RivalGetTell;
	rival.spendExperience = RivalSpendExperience;
	rival.determineAttackTrait = RivalDetermineAttackTrait;
	rival.experience = exp;
	rival.goods = getRandomInt(3, 10);
	// Can they be futa, yes if the player is or any of their women
	var iFuta = player.futa;
	$.each(player.women, function( index, value ) {
		iFuta += player.women[index].isFutanari() ? 1 : 0;
	});
	rival.futa = iFuta > 0 && Math.random() < 0.2 ? player.futa : 0;
	rival.name = rival.isFemale() || rival.futa > 0 ? "Rival woman" : "Rival man";		// Generic man

	rival.spendExperience();
	rival.experience = 0;
}

// allocate experience
function RivalSpendExperience()
{
	if (rival.experience === 0) return;

	// Ranks
	var ranks = rival.experience / 5;

	// divide ranks up
	// Perception 20%
	var used = 0;
	var val = Math.floor(ranks / 5);
	if (val > ((player.Mods.perception / 5) - 1)) val = (player.Mods.perception / 5) - 1;
	if (val > 0) {
		rival.Mods.perception += val * 5;
		used += val;
	}
	// Changra 20%
	val = Math.floor(ranks / 5);
	if (val > 0) {
		rival.Mods.changra += val * 5;
		used += val;
	}

	// Iron will
	if ((ranks - used) > 3) {
		rival.Mods.ironwill++;
		used++;
	}

	// Divide remaining between push and resist
	for (var i = ranks - used; i > 0; i--) {
		// TODO respect desires
		var trait = AVATAR_TRAITS[getRandomInt(1, 5)];
		if (getRandomInt(1, 100) < 50) rival.Mods["push" + trait] += 2;
		else rival.Mods["resist" + trait] += 1;
		used++;
	}
}

// You beat them
function RivalVictory()
{
	updateRival();

	// remove from runaway list
	for (var index = 0; index < runaways.length; index++) {
		if (runaways[index] === rival) {
			runaways.splice(index, 1);
			break;
		}
	}
	redraw();
	var nm = rival.name == "Rival man" || rival.name == "Rival woman" ? getUnusedFemaleName() : rival.name;
  $("#output").html(
    "<h1>You Howl!</h1>\
    <p>And unleash your spirit Changra. The air smell of burning and lightning, and then your rival crumble, weeping like woman. Her Changra burned away. She yours, and soon she forget how to be what she was. You take what <i>she</i> was carrying from their hunt.</p>\
    <p>As she quiver and snivel, you must decide on name for her.</p>\
    <input id='woman_name' value='" + nm + "'>\
    <button id='name_woman' class='btn'>Give Name</button>\
		<button id='reject_woman' class='btn'>Reject Woman</button>\
  ");

  $('#woman_name').click(function() {
    $("#woman_name").focus();
	});

  $("#name_woman").click(function() {
    rival.name = $("#woman_name").val().length > 0 ? $("#woman_name").val() : getUnusedFemaleName();
    rival.femaleName=rival.name;
	 var bAlready = false;
	 for (var index = 0; index < runaways.length; index++) {
		if (player.women[index] === rival) {
			bAlready = true;
			break;
		}
	 }
		if (!bAlready) player.women.push(rival);
		player.experience += minValue(Math.floor(rival.femininity() / 3), 15);
		player.goods += rival.goods;
		rival.goods = 0;
		rival.round = player.round;		// day captured
	EndRound();
  });
  $("#reject_woman").click(function() {
    player.experience += minValue(Math.floor(rival.femininity() / 3), 15);
	 player.goods += rival.goods;
    EndRound(Message(NextWindow, "You no want this weakling and leave her to be claimed by another."));
  });
}

// You lost
function RivalDefeat()
{
	var rivalhis = rival.hisher;
	var rivalhim = rival.himher;
	var fates = [];
	if (player.submissiveness > 75) {
		fates.push("meekly obeying " + rivalhis + " wishes");
	}
	if (player.domesticity > 75) {
		fates.push("spending your days tending to " + rivalhis + " household");
	}
	if (player.allure > 75) {
		fates.push("spreading your legs for " + rivalhim + " every night");
	}
	if (player.maternalism > 75) {
		fates.push("bearing " + rivalhim + " healthy sons");
	}
	if (fates.length === 0) {
		fates.push("sneaking away, though. You not man, but you refuse to be woman of this one");
	}
	var fate = toCommaSeperatedList(fates);
	var rivalhe = rival.heshe;
	var playerFemaleName = randomFemaleName();
	var rivalmanlwr = rival.name == "Rival man" || rival.name == "Rival woman" ? rival.name.toLowerCase() : rival.name;
	fate = "<p>With mighty howl, " + rivalmanlwr + " stomp and point palm at you, " + rivalhis + " Changra surge into you, and your Changra evaporate like mist in sunlight. You collapse at " + rivalmanlwr + "'s feet, and he stare down as you pant and try collect your Changra. Finally " + rivalhe + " laugh and offer you hand.</p>\
	<p>'You have no Changra,' " + rivalhe + " say, pulling you up. 'You womanfolk. You mine now, and you be called "+playerFemaleName+".'</p>\
	<p>You very confused, and you follow " + rivalhim + " back to clan. You struggle remember what was to be man, but those thoughts become strange to you, until finally all you know is to be woman.</p>\
	<p>" + rival.name + " in your thoughts always now. Soon, you " + fate + ".</p>";

	if (fates.length === 0) {
		// Escape, not feminine enough
		Message(NextWindow, fate);
		return false;
	}

	// Captured
	$(".stats").hide();
	$("#output").html("<div id='message'>" + fate + "</div>\
		<div id='end_buttons' class='push--top'></div>\
		");

	// add choices
	$("#end_buttons").append("<button id='end_button_submit' class='btn btn-woman push--right' title='Submit'>Submit</button>");
	$("#end_button_submit").click(
		function(){
			Message("location.reload();", "You give up and submit to your man");
		}
	);
	$("#end_buttons").append("<button id='end_button_pretend' class='btn btn-woman' title='Pretend'>Pretend Submit</button>");
	$("#end_button_pretend").click(playerFemaleName,
		function(evt){
			camp="captured";
			makeLeader(player,rival,false,evt.data);
			/*leader=rival;
			leader.women=[player];//todo: generate some women for him, maybe?
			
			if(player===leader){//otherwise we lose male name forever if captured twice
				player.oldName=player.name;
			}
			player.name=evt.data;*/
			//player.women.push(rival);//we need to do this so saves work. Fixed now with new save system, but maybe keep?
			rival.name=randomMaleName();
			rival.maleName=rival.name;
			player.dysphoria=3*player.masculinity()+20*player.Mods.ironwill;
			rival.rest();
			/*$.each(AVATAR_TRAITS, function(index, trait) {
				player.natural[trait] = player[trait];
			});*///removed rest step if not leader. should no longer revert without intervention.
			EndRound(Message(NextWindow,"He bring you back to camp as his woman, but you only pretending."));
		}
	);
	if (player.Mods.ironwill > 0) {
		$("#end_buttons").append("<button id='end_button_resist' class='btn btn-woman push--right' title='Resist'>Resist</button>");
			$("#end_button_resist").click(
			function() {
				player.Mods.changra -= 5;
				EndRound(Message(NextWindow, "You resist you desire for the " + rivalmanlwr + " and run away, you weaker for this"));
			}
		);
	} else $("#end_buttons").append("<p><b>You not strong in will enough to do anything else.</b></p>");
	return true;
}

// The tells they give off
function RivalGetTell(action) {

	var pushDescription = getRandomElem([
		"pound chest.",
		"yell powerful.",
		"bellow laugh.",
		"flare nostrils like dragon.",
		"stomp ground"
	]);

	var drainDescription = getRandomElem([
		"close eyes and hum to self.",
		"quiet and focus.",
		"whisper to self.",
		"close eyes and breathe deep.",
		"focused and very still."
	]);

	var reflectDescription = getRandomElem([
		"plant feet in ground and stare at you defiant.",
		"cross arms over chest.",
		"step back, arms crossed in front of face.",
		"crouch low, arms crossed in front of face.",
		"crouched and very still."
	]);

	var restDescription = getRandomElem([
		"breathe deep.",
		"panting.",
		"look pale.",
		"wipe sweat face.",
		"very still."
	]);

	var hesitateDescription = getRandomElem([
		"look uncertain.",
		"look confused.",
		"bite lip.",
		"look at ground.",
		"chew lip."
	]);

	switch(action) {
		case "push": return rival.name + " " + pushDescription;
		case "drain": return rival.name + " " + drainDescription;
		case "reflect": return rival.name + " " + reflectDescription;
		case "rest": return rival.name + " " + restDescription;
		case "hesitate": return rival.name + " " + hesitateDescription;
	}
	return "";
}

function RivalDetermineAttackTrait(avatar, opponent, action) {
	var viableTraits = [];
	$.each(AVATAR_TRAITS, function(index, trait) {
	if (opponent[trait] < 100) {
		viableTraits.push(trait);
	}
	});

	var desiredTraits = [];
	$.each(viableTraits, function(index, trait) {
		var defensiveIncentive;
		if (action === "push" && avatar[trait] < 50) defensiveIncentive = 0;
		else defensiveIncentive = (avatar[trait] / 100) * avatar.defensiveness;
		var offensiveIncentive;
		if (action === "drain" && opponent[trait] > 50) offensiveIncentive = 0;
		else offensiveIncentive = ((avatar.desires[trait] - opponent[trait]) / 50) * avatar.offensiveness;
		desiredTraits.push({"trait": trait, "desire": offensiveIncentive + defensiveIncentive + getRandomInt(0, avatar.unpredictability * 2)}); 
	});
	desiredTraits = desiredTraits.sort(function(a,b) {
		return b.desire - a.desire;
	});
	if (desiredTraits.length > 0) return desiredTraits[0].trait;
	return "submissiveness";
};
