/*jshint multistr:true*/
var ITEM_STATCHANGE = 10;		// constant
var ITEM_STATCHANGE2 = 9;		// constant

function YouEatTitle(bCooked, pow) { return bCooked ? "Eat Cooked" : "Eat"; }
function YouEatDescription(bCooked, pow) { return !bCooked ? "You eat the" : "You call on your ancestors and eat the"; }
function WomanEatTitle(bCooked, pow) { return bCooked ? "Eats Cooked" : "Eats"; }
function WomanEatDescription(bCooked, pow) { return !bCooked ? rival.name + " eats" : "You call on your ancestors and " + rival.name + " eats"; }


function eatStatNut(char,stat,val,changeNatural){
	if(changeNatural==undefined || changeNatural){char.changeNatural(stat, val);}
	char[stat] += val;
	char.capTraits();
	char.calcPhysique();
}


// Breast Melon

function eatMelonYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	if (player.Mods.breasts < 200) {
		// Can benefit
		player.Mods.breasts += pow + pow + bCooked ? 5 : 3;
		if (player.Mods.breasts > 200) player.Mods.breasts = 200;
		Message(NextWindow,
			"<h1>" + YouEatTitle(bCooked, pow) + " Melon</h1>\
			<p>" + YouEatDescription(bCooked, pow) + " melon and feel your ancestors spirit, teaching you how to make your women feed your children better.</p>");
	} else {
		// No effect
		Message(NextWindow,
			"<h1>" + YouEatTitle(bCooked, pow) + " Melon</h1>\
			<p>" + YouEatDescription(bCooked, pow) + " melon and your belly full</p>");
	}
}

function eatMelonWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	redraw();
	if (rival.Mods.breasts < 200) {
		// Can benefit
		rival.Mods.breasts += pow + pow + bCooked ? 5 : 3;
		if (rival.Mods.breasts > 200) rival.Mods.breasts = 200;
		var ch = bCooked ? 80 : 20;
		if (rival.physique.breasts > 30 && getRandomInt(1, 100) < ch) {
			rival.physique.breastrows += 1;
			Message("",
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Melon</h1>\
				<p>" + WomanEatDescription(bCooked, pow) + " the melon....</p>", true);
			setTimeout(function() {
				$("#message").append("and " + rival.hisher + " breasts swell a little and grow a new set of breasts.</p>\
				<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
			}, 1000);
		} else {
			Message("",
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Melon</h1>\
				<p>" + WomanEatDescription(bCooked, pow) + " the melon....</p>", true);
			setTimeout(function() {
				$("#message").append("and " + rival.hisher + " breasts swell a little.</p>\
				<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
			}, 1000);
		}
	} else {
		// No effect
		Message(NextWindow,
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Melon</h1>\
			<p>" + WomanEatDescription(bCooked, pow) + " the melon and " + rival.hisher + " belly full</p>");
	}
}

// Small Breast Melon

function eatSmallMelonYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	if (player.Mods.breasts > -20) {
		// Can benefit
		player.Mods.breasts -= bCooked ? 7 : 5;
		if (player.Mods.breasts < -20) player.Mods.breasts = -20;
		Message(NextWindow,
			"<h1>" + YouEatTitle(bCooked, pow) + " Small Melon</h1>\
			<p>" + YouEatDescription(bCooked, pow) + " melon and feel your bad ancestors spirit, you forget how to make your women feed your children.</p>");
	} else {
		// No effect
		Message(NextWindow,
			"<h1>" + YouEatTitle(bCooked, pow) + " Small Melon</h1>\
			<p>" + YouEatDescription(bCooked, pow) + " small melon and your belly full</p>");
	}
}

function eatSmallMelonWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	redraw();
	if (rival.Mods.breasts > -20) {
		// Can benefit
		rival.Mods.breasts -= bCooked ? 7 : 5;
		if (rival.Mods.breasts < -20) rival.Mods.breasts = -20;
		Message("",
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Small Melon</h1>\
			<p>" + WomanEatDescription(bCooked, pow) + " the small melon....</p>", true);
		setTimeout(function() {
			$("#message").append("and " + rival.hisher + " breasts shrink a little.</p>\
			<p align='center'><font size='-4'>click to continue</font></p>");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		Message(NextWindow,
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Small Melon</h1>\
			<p>" + WomanEatDescription(bCooked, pow) + " the melon and " + rival.hisher + " belly full</p>");
	}
}

// Paw Fruit

function eatPawFruitYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	player.physique.breastrows += bCooked ? 2 : 1;
	if (player.physique.tail < 20) {
		player.physique.tail += 1;
		player.physique.tailtype = 3;
	}
	redraw();
	Message(NextWindow,
			"<h1>" + YouEatTitle(bCooked, pow) + " Fruit</h1>\
			<p>" + YouEatDescription(bCooked, pow) + " melon and feel your ancestors spirit, your chest and rear feel strange.</p>");
}

function eatPawFruitWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	redraw();
	rival.physique.breastrows += bCooked ? 2 : 1;
	if (rival.physique.tail < 20) {
		rival.physique.tail += 1;
		rival.physique.tailtype = 3;
	}
	Message("",
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Fruit</h1>\
		<p>" + WomanEatDescription(bCooked, pow) + " the fruit....</p>", true);
	setTimeout(function() {
		$("#message").append("and row a new set of breasts");
		if (rival.physique.tail == 1) $("#message").append(" and grows a furry tail");
		$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}

// Cock Mushroom

function eatMushroomYou(bCooked, pow)
{
	if (!bCooked) {
		if (player.Mods.cock < 20) {
			// Can benefit
			player.Mods.cock += 1;
			redraw();
			if (player.Mods.cock == 1) {
				Message(NextWindow,
					"<h1>" + YouEatTitle(bCooked, pow) + " Mushroom</h1>\
					<p>" + YouEatDescription(bCooked, pow) + " mushroom and you feel the power of your ancestors surge in your groin and you grow a cock!</p>");
				
			} else {
				Message(NextWindow,
					"<h1>" + YouEatTitle(bCooked, pow) + " Mushroom</h1>\
					<p>" + YouEatDescription(bCooked, pow) + " mushroom and you feel your cock stiffen and swells with the power of your ancestors!</p>");
			}
			return;
		}
	} else {
		player.goods--;
		if (player.Mods.cock > 0) {
			// Can benefit
			player.Mods.cock -= 1;
			// check cock
			if (player.Mods.cock === 0 && !player.checkCockNonFuta()) {
				// No longer has a cock
				player.unFuta();
				player.capTraits();
				player.calcPhysique();
				redraw();
				Message(NextWindow,
					"<h1>" + YouEatTitle(bCooked, pow) + " Mushroom</h1>\
					<p>" + YouEatDescription(bCooked, pow) + " mushroom and you feel your cock soften and shrink with the power of your ancestors! Your cock vanishes and you now a woman!!</p>");
			} else {
				redraw();
				Message(NextWindow,
					"<h1>" + YouEatTitle(bCooked, pow) + " Mushroom</h1>\
					<p>" + YouEatDescription(bCooked, pow) + " mushroom and you feel your cock soften and shrink with the power of your ancestors!</p>");
			}
			return;
		}
	}
	// No effect
	Message(NextWindow,
		"<h1>" + YouEatTitle(bCooked, pow) + " Mushroom</h1>\
		<p>" + YouEatDescription(bCooked, pow) + " mushroom and your belly full</p>");
}

function eatMushroomWoman(bCooked, pow)
{
	redraw();
	if (bCooked) {
		player.goods--;
		if (rival.Mods.cock > 0) {
			// Can benefit
			rival.Mods.cock -= 1;
			Message("",
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Mushroom</h1>\
				<p>" + WomanEatDescription(bCooked, pow) + " the mushroom....</p>", true);
			setTimeout(function() {
				if (rival.Mods.cock === 0 && !rival.checkCockNonFuta()) {
					rival.unFuta();
					rival.capTraits();
					rival.calcPhysique();
					$("#message").append("and the power of your ancestors fill " + rival.himher + " and " + rival.hisher() + " cock vanishes.</p>");
				} else $("#message").append("and " + rival.hisher + " cock shrinks.</p>");
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	} else {
		if (rival.Mods.cock < 20) {
			// Can benefit
			rival.Mods.cock += 1;
			Message("",
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Mushroom</h1>\
				<p>" + WomanEatDescription(bCooked, pow) + " the mushroom....</p>", true);
			setTimeout(function() {
				if (rival.Mods.cock == 1 && rival.isFemale()) $("#message").append("and the power of your ancestors fill " + rival.himher + " and " + rival.heshe + " grows a cock.</p>");	//FIXME: FREEZE on rival.heshe because rival does not inherit the function - DSM
				else $("#message").append("and " + rival.hisher + " cock swells.</p>");
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	}
	// No effect
	Message(NextWindow,
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Mushroom</h1>\
		<p>" + WomanEatDescription(bCooked, pow) + " the mushroom and " + rival.hisher + " belly full</p>");
}

// Twin Cock Mushroom

function eatTwinMushroomYou(bCooked, pow)
{
	if (bCooked) {
		player.goods--;
		if (player.physique.gentialscnt == 2 || player.physique.gentialscnt == 3) {
			// Can benefit
			if (player.physique.gentialscnt == 3) player.physique.gentialscnt = 2;
			else player.physique.gentialscnt = 1;
			redraw();
			if (player.physique.gentialscnt == 2) {
				Message(NextWindow,
					"<h1>" + YouEatTitle(bCooked, pow) + " Split Mushroom</h1>\
					<p>" + YouEatDescription(bCooked, pow) + " mushroom and you feel your cocks stiffen and they merge into a pair of cocks!</p>");
			} else {
				Message(NextWindow,
					"<h1>" + YouEatTitle(bCooked, pow) + " Split Mushroom</h1>\
					<p>" + YouEatDescription(bCooked, pow) + " mushroom and you feel your cocks stiffen and they merge into a single cock!</p>");
			}
			return;
		}
	} else {
		if (player.physique.gentialscnt != 2) {
			// Can benefit
			if (player.Mods.cock < 20) player.Mods.cock += 1;
			if (player.physique.gentialscnt == 1) {
				Message(NextWindow,
					"<h1>" + YouEatTitle(bCooked, pow) + " Split Mushroom</h1>\
					<p>" + YouEatDescription(bCooked, pow) + " mushroom and you feel your cock stiffen and swells with the power of your ancestors, but then it splits in two!</p>");
			} else {
				Message(NextWindow,
					"<h1>" + YouEatTitle(bCooked, pow) + " Split Mushroom</h1>\
					<p>" + YouEatDescription(bCooked, pow) + " mushroom and you feel your cocks stiffen and swells with the power of your ancestors, but then they merge into two cocks!</p>");
			}
			player.physique.gentialscnt = 2;
			redraw();
			return;
		}
	}
	// No effect
	Message(NextWindow,
		"<h1>" + YouEatTitle(bCooked, pow) + " Mushroom</h1>\
		<p>" + YouEatDescription(bCooked, pow) + " mushroom and your belly full</p>");
}

function eatTwinMushroomWoman(bCooked, pow)
{
	redraw();
	if (bCooked) {
		player.goods--;
		if (rival.physique.gentialscnt == 2 || rival.physique.gentialscnt == 3) {
			// Can benefit
			Message("",
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Twin Mushroom</h1>\
				<p>" + WomanEatDescription(bCooked, pow) + " the twin mushroom....</p>", true);
			setTimeout(function() {
				if (rival.physique.gentialscnt == 3) $("#message").append("and " + rival.hisher + " cocks shrink and merge into a two cocks!</p>");
				else if (rival.physique.gentialscnt == 2) $("#message").append("and " + rival.hisher + " cocks swells and join until you have a single cock only!</p>");
				else $("#message").append("and " + rival.hisher + " cock shrinks.</p>");
				if (rival.physique.gentialscnt == 3) rival.physique.gentialscnt = 2;
				else rival.physique.gentialscnt = 1;
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	} else {
		if (rival.physique.gentialscnt != 2) {
			// Can benefit
			if (rival.Mods.cock < 20) rival.Mods.cock += 1;
			Message("",
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Twin Mushroom</h1>\
				<p>" + WomanEatDescription(bCooked, pow) + " the twin mushroom....</p>", true);
			setTimeout(function() {
				if (rival.Mods.cock == 1) $("#message").append("and the power of your ancestors fill " + rival.himher + " and " + rival.heshe + " grows a pair of cocks.</p>");
				else {
					if (rival.physique.gentialscnt == 1) $("#message").append("and " + rival.hisher + " cock swells and splits in two!</p>");
					else if (rival.physique.gentialscnt == 3) $("#message").append("and " + rival.hisher + " cocks swells and join until there are only two!</p>");
					else $("#message").append("and " + rival.hisher + " cock swells.</p>");
				}
				rival.physique.gentialscnt = 2;
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	}
	// No effect
	Message(NextWindow,
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Mushroom</h1>\
		<p>" + WomanEatDescription(bCooked, pow) + " the mushroom and " + rival.hisher + " belly full</p>");
}

// Tri Creature

function eatTriCreatureYou(bCooked, pow)
{
	if (bCooked) {
		player.goods--;
		if (player.physique.gentialscnt == 2 || player.physique.gentialscnt == 3) {
			// Can benefit
			if (player.physique.gentialscnt == 3) player.physique.gentialscnt = 2;
			else player.physique.gentialscnt = 1;
			redraw();
			if (player.physique.gentialscnt == 2) {
				Message(NextWindow,
					"<h1>" + YouEatTitle(bCooked, pow) + " Split Mushroom</h1>\
					<p>" + YouEatDescription(bCooked, pow) + " mushroom and you feel your cocks stiffen and they merge into a pair of cocks!</p>");
			} else {
				Message(NextWindow,
					"<h1>" + YouEatTitle(bCooked, pow) + " Split Mushroom</h1>\
					<p>" + YouEatDescription(bCooked, pow) + " mushroom and you feel your cocks stiffen and they merge into a single cock!</p>");
			}
			return;
		}
	} else {
		if (player.physique.gentialscnt != 3) {
			// Can benefit
			player.Mods.cock += 1;
			player.physique.gentialscnt = 3;
			redraw();
			Message(NextWindow,
				"<h1>" + YouEatTitle(bCooked, pow) + " Tri-Seathing</h1>\
				<p>" + YouEatDescription(bCooked, pow) + " sea creature and you feel your cock stiffen and swells with the power of your ancestors, but then it splits into three cocks!</p>");
			return;
		}
	}
	
	// No effect
	Message(NextWindow,
		"<h1>" + YouEatTitle(bCooked, pow) + " Thing</h1>\
		<p>" + YouEatDescription(bCooked, pow) + " thing and your belly full</p>");
}

function eatTriCreatureWoman(bCooked, pow)
{
	redraw();
	if (bCooked) {
		player.goods--;
		if (rival.physique.gentialscnt == 2 || rival.physique.gentialscnt == 3) {
			// Can benefit
			Message("",
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Tri-Seacreature</h1>\
				<p>" + WomanEatDescription(bCooked, pow) + " the seathing....</p>", true);
			setTimeout(function() {
				if (rival.physique.gentialscnt == 3) $("#message").append("and " + rival.hisher + " cocks shrink and merge into a two cocks!</p>");
				else if (rival.physique.gentialscnt == 2) $("#message").append("and " + rival.hisher + " cocks swells and join until you have a single cock only!</p>");
				else $("#message").append("and " + rival.hisher + " cock shrinks.</p>");
				if (rival.physique.gentialscnt == 3) rival.physique.gentialscnt = 2;
				else rival.physique.gentialscnt = 1;
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	} else {
		if (rival.physique.gentialscnt != 3) {
			// Can benefit
			if (rival.Mods.cock < 20) rival.Mods.cock += 1;
			Message("",
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Tri-Seacreature</h1>\
				<p>" + WomanEatDescription(bCooked, pow) + " the seathing....</p>", true);
			setTimeout(function() {
				if (rival.Mods.cock == 1) $("#message").append("and the power of your ancestors fill " + rival.hisher + " and " + rival.heshe + " grows three cocks.</p>");
				else {
					if (rival.physique.gentialscnt == 1) $("#message").append("and " + rival.hisher + " cock swells and splits into three!</p>");
					else if (rival.physique.gentialscnt == 2) $("#message").append("and " + rival.hisher + " cocks swells and split into three!</p>");
					else $("#message").append("and " + rival.hisher + " cock swells.</p>");
				}
				rival.physique.gentialscnt = 3;
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	}
	// No effect
	Message(NextWindow,
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Thing</h1>\
		<p>" + WomanEatDescription(bCooked, pow) + " the sae creature and " + rival.hisher + " belly full</p>");
}


// Balls Grapes

function eatGrapesYou(bCooked, pow)
{
	if (bCooked) {
		player.goods--;
		if (player.Mods.balls > 0) {
			// Can benefit
			player.Mods.balls -= 1;
			redraw();
			Message(NextWindow,
				"<h1>" + YouEatTitle(bCooked, pow) + " Grapes</h1>\
				<p>" + YouEatDescription(bCooked, pow) + " grapes and you feel your balls shrink with the power of your ancestors!</p>");
			return;
		}
	} else {
		if (player.Mods.balls < 20) {
			// Can benefit
			player.Mods.balls += 1;
			redraw();
			Message(NextWindow,
				"<h1>" + YouEatTitle(bCooked, pow) + " Grapes</h1>\
				<p>" + YouEatDescription(bCooked, pow) + " grapes and you feel your balls swell with the power of your ancestors!</p>");
			return;
		}
	}
	// No effect
	Message(NextWindow,
		"<h1>" + YouEatTitle(bCooked, pow) + " Grapes</h1>\
		<p>" + YouEatDescription(bCooked, pow) + " grapes and your belly full</p>");
}

function eatGrapesWoman(bCooked, pow)
{
	redraw();
	
	if (bCooked) {
		player.goods--;
		if (rival.Mods.balls > 0) {
			// Can benefit
			rival.Mods.balls -= 1;
			Message("",
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Grapes</h1>\
				<p>" + WomanEatDescription(bCooked, pow) + " the grapes....</p>", true);
			setTimeout(function() {
				if (rival.Mods.balls === 0) $("#message").append("and the power of your ancestors fill " + rival.hisher + " and " + rival.hisher() + " balls vanish.</p>");
				else $("#message").append("and " + rival.hisher + " balls shrink.</p>");
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	} else {
		if (rival.Mods.balls < 20) {
			// Can benefit
			rival.Mods.balls += 1;
			Message("",
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Grapes</h1>\
				<p>" + WomanEatDescription(bCooked, pow) + " the grapes....</p>", true);
			setTimeout(function() {
				if (rival.Mods.balls == 1) $("#message").append("and the power of your ancestors fill " + rival.hisher + " and " + rival.heshe + " grows a set of balls.</p>");
				else $("#message").append("and " + rival.hisher + " balls swell.</p>");
				$("#message").append("<p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
				return;
			}, 1000);
			return;
		}
	}
	// No effect
	Message(NextWindow,
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Grapes</h1>\
		<p>" + WomanEatDescription(bCooked, pow) + " the grapes and " + rival.hisher + " belly full</p>");
}

// Domination Nut

function eatDominationNutYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;
	player.changeNatural("submissiveness", val);
	player.submissiveness += val;
	player.capTraits();
	player.calcPhysique();
	redraw();
	var str = "<h1>" + YouEatTitle(bCooked, pow) + " Nut</h1>" +
		"<p>" + YouEatDescription(bCooked, pow) + " strong nut, but you feel your ancestors power " + (bCooked ? "strengthen" : "weaken") + " you!</p>";

	if (player.isFemale() != fBefore) str += "<p>You now changed, you now " + (player.isFemale() ? "woman" : "man") + "!</p>";
	Message(NextWindow, str);
}

function eatDominationNutWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;
	rival.changeNatural("submissiveness", val);
	rival.submissiveness += val;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	var str = "<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Nut</h1>" +
		"<p>" + WomanEatDescription(bCooked, pow) + " the nut and the power of the nut makes " + rival.himher + " more " + (bCooked ? "dominant" : "obedient") + ".</p>";
	if (rival.isFemale() != fBefore) str += "<p>" + rival.name + " now changed, " + rival.heshe + " now " + (rival.isFemale() ? "woman" : "man") + "!</p>";
	Message(NextWindow, str);
}


// Domestic Nut

function eatDomesticNutYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;
	player.changeNatural("domesticity", val);
	player.domesticity += val;
	player.capTraits();
	player.calcPhysique();
	redraw();
	var str = "<h1>" + YouEatTitle(bCooked, pow) + " Nut</h1>" +
		"<p>" + YouEatDescription(bCooked, pow) + " nut, but you feel your ancestors power " + (bCooked ? "strengthen" : "weaken") + " you!</p>";
	if (player.isFemale() != fBefore) str += "<p>You now changed, you now " + (player.isFemale() ? "woman" : "man") + "!</p>";
	Message(NextWindow, str);

}

function eatDomesticNutWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;
	rival.changeNatural("domesticity", val);
	rival.domesticity += val;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	var str = "<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Nut</h1>" +
		"<p>" + WomanEatDescription(bCooked, pow) + " the nut and the power of the nut teaches " + rival.himher + " to " + (bCooked ? "to explore and hunt" : "better clean your camp") + ".</p>";
	if (rival.isFemale() != fBefore) str += "<p>" + rival.name + " now changed, " + rival.heshe + " now " + (rival.isFemale() ? "woman" : "man") + "!</p>";
	Message(NextWindow, str);
}


// Maternal Nut

function eatMaternalNutYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * (ITEM_STATCHANGE2 + pow) : ITEM_STATCHANGE2 + pow;
	if (player.pregnancy > 0) player.pregnancy += pow * 5;
	player.changeNatural("maternalism", val);
	player.maternalism += val;
	if (pow == 2) {
		if (bCooked) player.physique.twins /= 2;
		else player.physique.twins *= 2;
		if (player.physique.twins > 100) player.physique.twins = 100;
		else if (player.physique.twins < 5) player.physique.twins = 5;
	}
	player.capTraits();
	player.calcPhysique();
	redraw();
	var str = "<h1>" + YouEatTitle(bCooked, pow) + " Nut</h1>" +
		"<p>" + YouEatDescription(bCooked, pow) + " nut, but you feel your ancestors power " + (bCooked ? "strengthen" : "weaken") + " you!</p>";
	if (!player.isMale() && pow == 2) str += "<p>You feel a change in you, you make more children for your clan!</p>";
	if (player.pregnancy > 0) str += "<p>You feel a change as your belly swells, your child arrive sooner!</p>";
	if (player.isFemale() != fBefore) str += "<p>You now changed, you now " + (player.isFemale() ? "woman" : "man") + "!</p>";
	Message(NextWindow, str);
		
}

function eatMaternalNutWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * (ITEM_STATCHANGE2 + pow) : ITEM_STATCHANGE2 + pow;
	if (rival.pregnancy > 0) rival.pregnancy += pow * 5;
	rival.changeNatural("maternalism", val);
	rival.maternalism += val;
	if (pow == 2) {
		if (bCooked) rival.physique.twins /= 2;
		else rival.physique.twins *= 2;
		if (rival.physique.twins > 100) rival.physique.twins = 100;
		else if (rival.physique.twins < 5) rival.physique.twins = 5;
	}
	rival.capTraits();
	rival.calcPhysique();

	var str = "<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Nut</h1>" +
		"<p>" + WomanEatDescription(bCooked, pow) + " the nut  and the power of the nut makes " + rival.himher + " " + (bCooked ? "better to father children" : "better to bear your children") + ".</p>";
	if (!rival.isMale() && pow == 2) str += "<p>" + rival.name + " feel a change in her, she make more children for you!</p>";
	if (rival.pregnancy > 0) str += "<p>" + rival.name + " feel a change as " + rival.hisher + " belly swells, your child arrive sooner!</p>";
	if (rival.isFemale() != fBefore) str += "<p>" + rival.name + " now changed, " + rival.heshe + " now " + (rival.isFemale() ? "woman" : "man") + "!</p>";
	Message(NextWindow, str);
	redraw();
}


// Allure Nut

function eatAllureNutYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;
	player.changeNatural("allure", val);
	player.allure += val;
	player.capTraits();
	player.calcPhysique();
	redraw();
	var str = "<h1>" + YouEatTitle(bCooked, pow) + " Nut</h1>" +
		"<p>" + YouEatDescription(bCooked, pow) + " nut, but you feel your ancestors power " + (bCooked ? "strengthen" : "weaken") + " you!</p>";
	if (player.isFemale() != fBefore) str += "<p>You now changed, you now " + (player.isFemale() ? "woman" : "man") + "!</p>";
	Message(NextWindow, str);
}

function eatAllureNutWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;
	rival.changeNatural("allure", val);
	rival.allure += val;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	var str = "<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Nut</h1>" +
		"<p>" + WomanEatDescription(bCooked, pow) + " the pretty nut and the power of the nut make " + rival.himher + " " + (bCooked ? "handsome" : "prettier") + ".</p>";
	if (rival.isFemale() != fBefore) str += "<p>" + rival.name + " now changed, " + rival.heshe + " now " + (rival.isFemale() ? "woman" : "man") + "!</p>";
	Message(NextWindow, str);
}


// Orientation Nut

function eatOrientationNutYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;
	player.changeNatural("orientation", val);
	player.orientation += val;
	player.capTraits();
	player.calcPhysique();
	redraw();
	var str = "<h1>" + YouEatTitle(bCooked, pow) + " Nut</h1>" +
		"<p>" + YouEatDescription(bCooked, pow) + " nut, but you feel your ancestors power " + (bCooked ? "strengthen" : "weaken") + " you!</p>";
	str+="<p>"
	if((player.orientation>=0)&& !bCooked){
		str += "Women folk less interesting now.";
	}
	else if(player.orientation>=0){
		str+="You think of soft, pretty women and want more.";
	}
	else if((player.orienation<0)&&!bCooked){
		str+="You think of big, strong men and want make love all night.";
	}
	else if(player.orientation<0){
		str+="Men not so interesting now. Maybe you try woman instead?";
	}
	str+="</p>";
	if (player.isFemale() != fBefore) str += "<p>You now changed, you now " + (player.isFemale() ? "woman" : "man") + "!</p>";
	Message(NextWindow, str);
		
}

function eatOrientationNutWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	var val = bCooked ? -1 * ITEM_STATCHANGE : ITEM_STATCHANGE;
	rival.changeNatural("orientation", val);
	rival.orientation += val;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	var str = "<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Nut</h1>" +
		"<p>" + WomanEatDescription(bCooked, pow) + " the long nut and the power of the nut make " + rival.himher + " " + (bCooked ? "no desire" : "desire") + " "+ (player.isFemale()?"men":"you.")+"</p>";
	if (rival.isFemale() != fBefore) str += "<p>" + rival.name + " now changed, " + rival.heshe + " now " + (rival.isFemale() ? "woman" : "man") + "!</p>";
	Message(NextWindow, str);
}


// MilkNut

function eatMilkNutYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	if (player.Mods.breasts < 200) {
		// Can benefit
		player.Mods.breasts += bCooked ? 7 : 5;
		if (player.Mods.breasts > 200) player.Mods.breasts = 200;
		if (player.physique.horns < 20) {
			player.physique.horns += 1;
			player.physique.hornstype = 1;
		}
		if (player.physique.tail < 20) {
			player.physique.tail += 1;
			player.physique.tailtype = 1;
		}
		var ch = bCooked ? 80 : 20;
		if (player.physique.breasts > 25 && getRandomInt(1, 100) < ch) player.physique.breastrows += 1;

		Message(NextWindow,
			"<h1>" + YouEatTitle(bCooked, pow) + " White Nut</h1>\
			<p>" + YouEatDescription(bCooked, pow) + " nut and feel your ancestors spirit, teaching you how to make your women feed your children better.</p>");
	} else {
		// No effect
		Message(NextWindow,
			"<h1>" + YouEatTitle(bCooked, pow) + " White Nut</h1>\
			<p>" + YouEatDescription(bCooked, pow) + " nut and your belly full</p>");
	}
	redraw();
}

function eatMilkNutWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	redraw();
	if (rival.Mods.breasts < 200) {
		// Can benefit
		rival.Mods.breasts += bCooked ? 3 : 2;
		if (rival.Mods.breasts > 200) rival.Mods.breasts = 200;
		if (rival.physique.horns < 20) {
			rival.physique.horns += 1;
			rival.physique.hornstype = 1;
		}
		if (rival.physique.tail < 20) {
			rival.physique.tail += 1;
			rival.physique.tailtype = 1;
		}
		var ch = bCooked ? 80 : 20;
		if (rival.physique.breasts > 25 && getRandomInt(1, 100) < ch) {
			rival.physique.breastrows += 1;
			Message("",
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " White Nut</h1>\
				<p>" + WomanEatDescription(bCooked, pow) + " the nut....</p>", true);
			setTimeout(function() {
				$("#message").append("and her breasts swell a little and grow a new set of breasts");
				if (rival.physique.horns == 1) $("#message").append(" and grows a set of cow horns.");
				$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
			}, 1000);
		} else {
			Message("",
				"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " White Nut</h1>\
				<p>" + WomanEatDescription(bCooked, pow) + " the nut....</p>", true);
			setTimeout(function() {
				$("#message").append("and her breasts swell a little");
				if (rival.physique.horns == 1) $("#message").append(" and grows a set of cow horns.");
				$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
				$("#message").click(function() { $(".stats").show(); Camp(); });
				redraw();
			}, 1000);
		}
	} else {
		// No effect
		Message(NextWindow,
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " White Nut</h1>\
			<p>" + WomanEatDescription(bCooked, pow) + " the nut and " + rival.hisher + " belly full</p>");
	}
}

// Red Nut

function eatDemonNutYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	if (player.physique.skin < 100 || player.physique.wings < 20 || player.physique.hornstype != 2 || player.physique.tailtype != 2) {
		// Can benefit
		if (player.physique.skin < 100) player.physique.skin = Math.floor(Math.random() * 2) + 100;
		if (player.physique.wings < 10) player.physique.wings++;
		if (player.physique.hornstype != 2) player.physique.hornstype = 2;
		player.physique.horns += 2;
		if (player.physique.tailtype != 2) player.physique.tailtype = 2;
		player.physique.tail += 2;

		Message(NextWindow,
			"<h1>" + YouEatTitle(bCooked, pow) + " Red Nut</h1>\
			<p>" + YouEatDescription(bCooked, pow) + " nut and feel a surge of heat from the fires of the mountain.</p>");
	} else {
		// No effect
		Message(NextWindow,
			"<h1>" + YouEatTitle(bCooked, pow) + " Red Nut</h1>\
			<p>" + YouEatDescription(bCooked, pow) + " nut and your belly full</p>");
	}
	redraw();
}

function eatDemonNutWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	redraw();
	if (rival.physique.skin < 100 || rival.physique.wings < 20 || rival.physique.hornstype != 2 || rival.physique.tailtype != 2) {
		// Can benefit
		if (rival.physique.skin < 100) {
			if (player.physique.skin > 99) rival.physique.skin = player.physique.skin;
			else rival.physique.skin = Math.floor(Math.random() * 2) + 100;
		}
		if (rival.physique.wings < 10) rival.physique.wings++;
		if (rival.physique.hornstype != 2) rival.physique.hornstype = 2;
		rival.physique.horns += 2;
		if (rival.physique.tailtype != 2) rival.physique.tailtype = 2;
		rival.physique.tail = 2;
		Message("",
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Red Nut</h1>\
			<p>" + WomanEatDescription(bCooked, pow) + " the nut....</p>", true);
		setTimeout(function() {
			$("#message").append("and the fire of the mountain changes " + rival.hisher + " body");
			$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		Message(NextWindow,
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Red Nut</h1>\
			<p>" + WomanEatDescription(bCooked, pow) + " the nut and " + rival.hisher + " belly full</p>");
	}
}

// Green Berry

function eatGreenBerryYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	if (player.physique.skin != 102) {
		// Can benefit
		player.physique.skin = 102;

		Message(NextWindow,
			"<h1>" + YouEatTitle(bCooked, pow) + " Berry</h1>\
			<p>" + YouEatDescription(bCooked, pow) + " berry and feel a flush of cold.</p>");
	} else {
		// No effect
		Message(NextWindow,
			"<h1>" + YouEatTitle(bCooked, pow) + " Green Berry</h1>\
			<p>" + YouEatDescription(bCooked, pow) + " berry and your belly full</p>");
	}
	redraw();
}

function eatGreenBerryWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	redraw();
	if (rival.physique.skin != 102) {
		// Can benefit
		rival.physique.skin = 102;
		Message("",
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Green Berry</h1>\
			<p>" + WomanEatDescription(bCooked, pow) + " the berry....</p>", true);
		setTimeout(function() {
			$("#message").append("and a wave of green spreads over " + rival.hisher + " skin.");
			$("#message").append("</p><p align='center'><font size='-4'>click to continue</font></p>");
			$("#message").click(function() { $(".stats").show(); Camp(); });
			redraw();
		}, 1000);
	} else {
		// No effect
		Message(NextWindow,
			"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Green Berry</h1>\
			<p>" + WomanEatDescription(bCooked, pow) + " the berry and " + rival.hisher + " belly full</p>");
	}
}

// Pale Berry

function eatPaleBerryYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	player.physique.skin = bCooked ? 1 : getRandomInt(1, 10);

	Message(NextWindow,
		"<h1>" + YouEatTitle(bCooked, pow) + " Pale Berry</h1>\
		<p>" + YouEatDescription(bCooked, pow) + " berry and feel a flush of warmth.</p>");
	redraw();
}

function eatPaleBerryWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	redraw();
	rival.physique.skin = bCooked ? 1 : getRandomInt(1, 10);
	Message("",
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Pale Berry</h1>\
		<p>" + WomanEatDescription(bCooked, pow) + " the berry....</p>", true);
	setTimeout(function() {
		$("#message").append("and a wave of colour spreads over " + rival.hisher + " skin.");
		$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}

// Dark Berry

function eatDarkBerryYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	player.physique.skin = bCooked ? 25 : getRandomInt(10, 20);

	Message(NextWindow,
		"<h1>" + YouEatTitle(bCooked, pow) + " Dark Berry</h1>\
		<p>" + YouEatDescription(bCooked, pow) + " berry and feel a flush of warmth.</p>");
	redraw();
}

function eatDarkBerryWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	redraw();
	rival.physique.skin = bCooked ? 35 : getRandomInt(10, 20);
	Message("",
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Dark Berry</h1>\
		<p>" + WomanEatDescription(bCooked, pow) + " the berry....</p>", true);
	setTimeout(function() {
		$("#message").append("and a wave of colour spreads over " + rival.hisher + " skin.");
		$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}

// Hairy Nut

function eatHairyNutYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	var style = player.physique.hairstyle;
	var conclusion;
	if (style === 0) {
			player.physique.hairstyle = getRandomInt(1, 9);
			conclusion = "you feel like your skull is on fire";
	}
	else if (style >= 1) {
			player.physique.hairstyle = 0;
			conclusion = "you feel your hair fall out";
	}
	Message(NextWindow,
			"<h1>" + YouEatTitle(bCooked, pow) + " Hairy Nut</h1>\
			<p>" + YouEatDescription(bCooked, pow) + " nut and " + conclusion + "</p>");
	redraw();
}

function eatHairyNutWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	var style = rival.physique.hairstyle;
	var conclusion;
	redraw();
	if (style === 0) {
			rival.physique.hairstyle = getRandomInt(1, 9);
			conclusion = "hair grows from " + rival.hisher + " head.";
	}
	else if (style >= 1) {
			rival.physique.hairstyle = 0;
			conclusion = rival.hisher + " hair falls out.";
	}
	Message("",
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Hairy Nut</h1>\
		<p>" + WomanEatDescription(bCooked, pow) + " the nut....</p>", true);
	setTimeout(function() {
		$("#message").append("and you watch as " +conclusion);
		$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}

function eatRainbowflowerYou(bCooked, pow)
{
	if (bCooked) player.goods--;
	player.physique.hairc = getRandomInt(1, 16);
	Message(NextWindow,
		"<h1>" + YouEatTitle(bCooked, pow) + " Rainbow Flower</h1>\
		<p>" + YouEatDescription(bCooked, pow) + " flower and feel warmth on your scalp.</p>");
	redraw();
}

function eatRainbowflowerWoman(bCooked, pow)
{
	if (bCooked) player.goods--;
	redraw();
	rival.physique.hairc = getRandomInt(1, 16);
	Message("",
		"<h1>" + rival.name + " " + WomanEatTitle(bCooked, pow) + " Rainbow Flower</h1>\
		<p>" + WomanEatDescription(bCooked, pow) + " the berry....</p>", true);
	setTimeout(function() {
		$("#message").append("and a wave of colour spreads over " + rival.hisher + " hair.");
		$("#message").append(".</p><p align='center'><font size='-4'>click to continue</font></p>");
		$("#message").click(function() { $(".stats").show(); Camp(); });
		redraw();
	}, 1000);
}
