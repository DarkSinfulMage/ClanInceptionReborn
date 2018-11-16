/**anhk.js
 * Extracting smith from people for later use as a fully realized character.

 * 
 */

function createDemon()
{
	demon = new Avatar(0, 50, 100, 100, 50);
	demon.physique.skin = 100;
	demon.physique.horns = 10;
	demon.physique.hornstype = 2;
	demon.physique.tail = 10;
	demon.physique.tailtype = 2;
	demon.physique.wings = 1;
	demon.physique.hairc = "black";
	demon.physique.irisc = "red";
	demon.Mods.ironwill = 4;
	demon.Mods.breasts = 12;
	demon.Mods.changra = 100;
	demon.Mods.perception = 10;
	demon.Mods.amazon = 1;
	demon.Mods.pushsubmissiveness = 10;
	demon.Mods.pushdomesticity = 10;
	demon.Mods.pushmaternalism = 10;
	demon.Mods.pushallure = 10;
	demon.Mods.pushorientation = 10;
	demon.Mods.resistsubmissiveness = 20;
	demon.Mods.resistdomesticity = 20;
	demon.Mods.resistmaternalism = 20;
	demon.Mods.resistallure = 20;
	demon.Mods.resistorientation = 20;
	demon.name = "Demona";
}

// Meet Demon
function MeetDemon()
{
	rival = demon;
	redraw();
	if (getPlaceCnt("Volcano") == 2) {
		Message("Camp()", "<h1>Demon!</h1><p>After wander near the fire mountain \
			day, you find tracks in the scortched earth, barefoot and a womans!\
			You hunt her, to claim her as a new woman for you clan!</p>\
			<p>You charge and she moves away, staying from your grasp and that of your ancestors. She speak oddly</p>\
			<p>'You are a new one for me to prey on, but you do seem stronger than most who become my toys.\
			I will let you go for now. Come back when you are stronger, then we will fight, either I will enslave you \
			or you will enslave me as your woman'</p>\
			<p>She laughs amused at the idea you defeat her. You furious and decide to attack any way. She smiles and her wings stretch out, she flies away!!!</p>\
			<p>You will return to capture this woman!</p>\
		");
	} else {
			Message("Camp()", "<h1>Nothing</h1><p>You failed to hunt anything but you do see the red woman far away, you could not catch her.</p>");
	}
}