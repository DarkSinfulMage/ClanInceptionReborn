// Crafting
/*jshint multistr:true*/

jewelryMods =["nipplerings","collar","headband","bellybuttonstud","clitcockring"];


function Craft()
{
	if ($("#craft_buttons").is(":visible")) {
		$("#camp_feed").html("");
		return;
	}
	if ($("#women_buttons").is(":visible")) resetRival();

	$("#camp_feed").html(
		"<div id='craft_buttons' class='push--top'></div>\
		<div id='craft_display'></div>");
	
	// Nipple Rings
	if (player.Mods.craftnipplerings > 0) {
		$("#craft_buttons").append("<button id='craft_btn_1' class='btn btn-woman push--right' title='Craft Nipple Rings'>Nipple Rings</button>");
		$("#craft_btn_1").click(
			function() {
				if (player.metal == 0) $("#craft_display").append("<p>You need metal to make this</p>");
				else CraftIt("Nipple Rings", "nipplerings", 1, "craftNippleRingsYou", "craftNippleRingsWoman");
			}
		);
	}
	// Collar
	if (player.Mods.craftcollar > 0) {
		$("#craft_buttons").append("<button id='craft_btn_2' class='btn btn-woman push--right' title='Craft a Torc Collar'>Torc</button>");
		$("#craft_btn_2").click(
			function() {
				if (player.metal == 0) $("#craft_display").append("<p>You need metal to make this</p>");
				else if (player.goods == 0) $("#craft_display").append("<p>You need a pretty gem to make this</p>");
				else CraftIt("Torc (Collar)", "collar", 1, "craftCollarYou", "craftCollarWoman");
			}
		);
	}
	// Head Band
	if (player.Mods.craftheadband > 0) {
		$("#craft_buttons").append("<button id='craft_btn_3' class='btn btn-woman push--right' title='Craft a Headband'>Headband</button>");
		$("#craft_btn_3").click(
			function(){
				if (player.metal == 0) $("#craft_display").append("<p>You need metal to make this</p>");
				else if (player.goods == 0) $("#craft_display").append("<p>You need a pretty gem to make this</p>");
				else CraftIt("Headband", "headband", 1, "craftHeadbandYou", "craftHeadbandWoman");
			}
		);
	}
	// Belly button Stud
	if (player.Mods.craftbellybuttonstud > 0) {
		$("#craft_buttons").append("<button id='craft_btn_4' class='btn btn-woman push--right' title='Craft a Belly Button Stud'>Belly Button Stud</button>");
		$("#craft_btn_4").click(
			function() {
				if (player.goods == 0) $("#craft_display").append("<p>You need a pretty gem to make this</p>");
				else CraftIt("Belly Button Stud", "bellybuttonstud", 1, "craftBellyButtonStudYou", "craftBellyButtonStudWoman");
			}
		);
	}
	// Clit/Cock Ring
	if (player.Mods.craftclitcockring > 0) {
		$("#craft_buttons").append("<button id='craft_btn_5' class='btn btn-woman push--right' title='Craft Clit/Cock Ring'>Clit/Cock Ring</button>");
		$("#craft_btn_5").click(
			function() {
				if (player.metal == 0) $("#craft_display").append("<p>You need metal to make this</p>");
				else if (player.goods == 0) $("#craft_display").append("<p>You need a pretty gem to make this</p>");
				else CraftIt("Clit Cock Ring", "clitcockring", 1, "craftClitCockRingYou", "craftClitCockRingWoman");
			}
		);
	}
	// Bracelet (left)
	if (player.Mods.craftleftbracelet > 0) {
		$("#craft_buttons").append("<button id='craft_btn_6' class='btn btn-woman push--right' title='Craft Red Bracelet'>Red Bracelet</button>");
		$("#craft_btn_6").click(
			function() {
				if (player.metal == 0) $("#craft_display").append("<p>You need metal to make this</p>");
				else CraftIt("Red Bracelet", "leftbracelet", 2, "craftLeftBraceletYou", "craftLeftBraceletWoman");
			}
		);
	}
}

function CraftIt(desc, itm, limit, actionyou, actionwoman)
{
	$("#output").html(desc);

	$("#output").append("<h2>Who you make for?</h2>\
	<div id='craft_buttons' class='push--top'>");
	if (player.items[itm] < limit) {
		$("#craft_buttons").append("<button id='craft_button_you' class='btn btn-woman push--right'>You</button></div>");
		$("#craft_button_you").click(function(){
			fBefore = player.isFemale();
			eval(actionyou + "()");
		});
	}
	$.each(player.women, function( index, value ) {
		if (player.women[index].items[itm] < limit) {
			if (player.women[index].isFemale()) $("#craft_buttons").append("<button id='woman_button_"+index+"' class='btn btn-woman push--right'>"+value.name+"</button>");
			else $("#craft_buttons").append("<button id='woman_button_"+index+"' class='btn btn-man push--right'>"+value.name+"</button>");
		
			$("#woman_button_"+index).click(function(){
			
				if ($("#woman_craft_buttons").is(":visible")) {
					$("#craft_button_Woman").unbind('click').click(function(){
						eval(actionwoman + "(" + index + ")");
					});
				} else {
					$("#craft_buttons").append("<div id='woman_craft_buttons' class='push--top'>\
					<button id='craft_button_Woman' class='btn btn-woman push--right'>Choose</button>\</div>");
				
					$("#craft_button_Woman").click(function(){
						eval(actionwoman + "(" + index + ")");
					});
				}
				
				rival = player.women[index];
				fBefore = rival.isFemale();
				$(".stats").show();
				$("#otherstats").show();
				redraw();
			});
		}
	});
	
	$("#craft_buttons").append("<button id='craft_button_noone' class='btn btn-woman push--right'>No-one</button></div>");
	$("#craft_button_noone").click(function(){
		Camp();
		Craft();
	});
}


// Nipple Rings

function craftNippleRingsYou()
{
	player.metal -= 1;
	player.items.nipplerings = 1;
	player.changeNatural("orientation", -5);
	player.orientation -= 5;
	player.capTraits();
	redraw();
	Message("ShowCamp();Craft()",
		"<h1>Nipple Rings</h1>\
		<p>You make the rings and with a sharp bone needle pierce your nipples and fit the rings!</p>");
}

function craftNippleRingsWoman(index)
{
	player.metal -= 1;
	rival = player.women[index];
	rival.items.nipplerings = 1;
	rival.changeNatural("orientation", 5);
	rival.orientation += 5;
	rival.capTraits();
	redraw();

	Message("ShowCamp();Craft()",
		"<h1>Nipple Rings</h1>\
		<p>You make the rings and with a sharp bone needle pierce " + rival.name + " nipples and fit the rings!</p>");
}


// Collar

function craftCollarYou()
{
	player.metal -= 1;
	player.goods -= 1;
	player.items.collar = 1;
	player.changeNatural("submissiveness", -5);
	player.submissiveness -= 5;
	player.capTraits();
	player.calcPhysique();
	redraw();
	Message("ShowCamp();Craft()",
		"<h1>Torc</h1>\
		<p>You make the torc and fit it around you neck, you feel more commanding!</p>");
}

function craftCollarWoman(index)
{
	player.metal -= 1;
	player.goods -= 1;
	rival = player.women[index];
	rival.items.collar = 1;
	rival.changeNatural("submissiveness", 5);
	rival.submissiveness += 5;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	Message("ShowCamp();Craft()",
		"<h1>Torc</h1>\
		<p>You make the torc at fit it around " + rival.name + "'s neck, marking them as yours!</p>");
}


// Head band

function craftHeadbandYou()
{
	player.metal -= 1;
	player.goods -= 1;
	player.items.headband = 1;
	player.changeNatural("allure", -5);
	player.allure -= 5;
	player.capTraits();
	player.calcPhysique();
	redraw();
	Message("ShowCamp();Craft()",
		"<h1>Headband</h1>\
		<p>You make the headband and wear it, you stand out more!</p>");
}

function craftHeadbandWoman(index)
{
	player.metal -= 1;
	player.goods -= 1;
	rival = player.women[index];
	rival.items.headband = 1;
	rival.changeNatural("allure", 5);
	rival.allure += 5;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	Message("ShowCamp();Craft()",
		"<h1>Torc</h1>\
		<p>You make the headband and put it on " + rival.name + "'s head!</p>");
}


// Belly Button Stud

function craftBellyButtonStudYou()
{
	player.goods -= 1;
	player.items.bellybuttonstud = 1;
	player.changeNatural("maternalism", -5);
	player.maternalism -= 5;
	player.capTraits();
	player.calcPhysique();
	redraw();
	Message("ShowCamp();Craft()",
		"<h1>Belly Button Stud</h1>\
		<p>You make the stud and with a sharp bone needle pierce your belly button and fit the stud.</p>");
}

function craftBellyButtonStudWoman(index)
{
	player.goods -= 1;
	rival = player.women[index];
	rival.items.bellybuttonstud = 1;
	rival.changeNatural("maternalism", 5);
	rival.maternalism += 5;
	rival.capTraits();
	rival.calcPhysique();
	redraw();

	Message("ShowCamp();Craft()",
		"<h1>Belly Button Stud</h1>\
		<p>ou make the stud and with a sharp bone needle pierce " + rival.name + "'s belly button and fit the stud.</p>");
}


// Clit cock ring
function craftClitCockRingYou()
{
	player.metal -= 1;
	player.items.clitcockring = 1;
	player.changeNatural("orientation", -5);
	player.orientation -= 5;
	player.capTraits();
	redraw();
	if (player.hasCock()) {
		Message("ShowCamp();Craft()",
			"<h1>Cock Ring</h1>\
			<p>You make the ring and with a sharp bone needle pierce your cock and fit the ring!</p>");
	} else {
			Message("ShowCamp();Craft()",
		"<h1>Clit Ring</h1>\
		<p>You make the ring and with a sharp bone needle pierce your clit and fit the ring!</p>");
	}
}

function craftClitCockRingWoman(index)
{
	player.metal -= 1;
	rival = player.women[index];
	rival.items.clitcockring = 1;
	rival.changeNatural("orientation", 5);
	rival.orientation += 5;
	rival.capTraits();
	redraw();

	if (rival.hasCock()) {
		Message("ShowCamp();Craft()",
			"<h1>Cock Ring</h1>\
			<p>You make the ring and with a sharp bone needle pierce " + rival.name + " cock and fit the ring!</p>");
	} else {
			Message("ShowCamp();Craft()",
		"<h1>Clit/Cock Ring</h1>\
		<p>You make the ring and with a sharp bone needle pierce " + rival.name + " clit and fit the ring!</p>");
	}
}


// Red Bracelet

function craftLeftBraceletYou()
{
	player.goods -= 1;
	player.metal -= 1;
	player.items.leftbracelet += 1;
	player.changeNatural("maternalism", 5);
	player.maternalism += 5;
	player.capTraits();
	player.calcPhysique();
	redraw();
	Message("ShowCamp();Craft()",
		"<h1>Red Bracelet</h1>\
		<p>You make the bracelet and put it on your wrist.</p>");
}

function craftLeftBraceletWoman(index)
{
	player.goods -= 1;
	player.metal -= 1;
	rival = player.women[index];
	rival.items.leftbracelet += 1;
	rival.changeNatural("maternalism", 5);
	rival.maternalism += 5;
	rival.capTraits();
	rival.calcPhysique();
	player.changeNatural("maternalism", 10);
	player.maternalism += 10;
	player.capTraits();
	player.calcPhysique();
	redraw();

	Message("ShowCamp();Craft()",
		"<h1>Belly Button Stud</h1>\
		<p>You make the bracelet and put it on " + rival.name + "'s wrist.</p>");
}
