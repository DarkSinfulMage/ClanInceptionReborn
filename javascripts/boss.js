//
// Bosses
/*jshint multistr:true*/

function checkBoss1(plc)
{
	if (smith.checkSwitch(0) && plc === "chilly beach" && player.Mods.craftleftbracelet === 0) {
		// quest pending, so you have them?
		for (var index = 0; index < player.women.length; index++) {
			if (player.women[index].name == "Weshptah" && player.women[index].checkSwitch(0)) {
				// got him
				rival = player.women[index];
				break;
			}
		}
		if (rival === undefined) {
			// on quest
			createRival(30);

			rival.Mods.amazon = 1;
			rival.submissiveness = 0;
			rival.futa = 0;

			rival.Mods.perception = 2;
			rival.Mods.cock = 5;
			rival.Mods.pushsubmissiveness = 2;
			rival.Mods.pushallure = 2;
			rival.Mods.resistsubmissiveness = 2;
			rival.Mods.resistdomesticity = 1;
			rival.items.nipplerings = 1;
			rival.name = "Weshptah";
			rival.goods = 20;
			rival.Victory = Boss1Victory;
			rival.Defeat = RivalDefeat;
			rival.getTell = Boss1GetTell;
			rival.getRecognise = function() {
				return "you recognise him, he is " + smith.name + "'s man " + this.name;
			}
		} else rival = undefined; 
	} 
}

// You beat them
function Boss1Victory()
{
	updateRival();

	redraw();
	$("#output").html(
		"<h1>You Howl!</h1>\
		<p>And unleash your spirit Changra. The air smell of burning and lightning, and then your rival crumble, weeping like woman. Her Changra burned away. She yours, and soon she forget how to be what she was. You take what <i>she</i> was carrying from their hunt.</p>\
		<p>As she quiver and snivel, you have Weshptah to take back to " + smith.name + " when you ready.</p>\
		<button id='name_woman' class='btn'>Take Her</button>\
	");

	$("#name_woman").click(function() {
		player.women.push(rival);
		player.experience += minValue(Math.floor(rival.femininity() / 10), 5);
		player.goods += rival.goods;
		rival.goods = 0;
		rival.round = player.round;		// day captured
		rival.setSwitch(0, true);
		Camp();
	});
}

// The tells they give off
function Boss1GetTell(action) {

	var pushDescription = getRandomElem([
		"reach for you.",
		"chant words.",
		"grunt with effort.",
		"roars like lion.",
		"walk with purpose"
	]);

	var drainDescription = getRandomElem([
		"stare at you intently.",
		"watch you as if you prey.",
		"whisper quietly.",
		"eyes narrow and breathe deep.",
		"very still and staring at you."
	]);

	var reflectDescription = getRandomElem([
		"prepared for you.",
		"guarding for you attack.",
		"step back behind rock.",
		"crouch low, chanting.",
		"hiding with fingers laced."
	]);

	var restDescription = getRandomElem([
		"breathe deep.",
		"panting.",
		"look pale.",
		"wipe sweat face.",
		"very still."
	]);

	var hesitateDescription = getRandomElem([
		"looking for opening.",
		"looking for others."
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

/** NEW BOSS ====================================================*/

function checkBoss2(plc){}
function Boss2GetTell(action) {}
function Boss2Victory(){}