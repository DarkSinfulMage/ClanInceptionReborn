/*inventory.js
 * For showing/defining the inventory screen and its buttons
 * */

function showInventoryScreen(){

	//These thre statements - Boilerplate for transitioning?
	if ($("#item_buttons").is(":visible")) {
		$("#camp_feed").html("VVVVVVV"); //??
		return;
	}
	if ($("#women_buttons").is(":visible")) resetRival();

	$("#camp_feed").html( //??
			"<div id='item_buttons' class='push--top'></div>\
	<div id='Item_display'></div>");

	showItembuttons();

}


function showItembuttons(){

	if (camp_Mushrooms > 0) {
		$("#item_buttons").append("<button id='item_button_1' class='btn btn-woman push--right' title=''>Mushrooms (" + (camp_Mushrooms) + ")</button>");
		$("#item_button_1").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Mushroom", "eatMushroomYou", "eatMushroomWoman");
					//Decrease item count.
					camp_Mushrooms--;
				}
		);
	}


	if (camp_Grapes > 0){
		$("#item_buttons").append("<button id='item_button_2' class='btn btn-woman push--right' title=''>Grapes (" + (camp_Grapes) + ")</button>");
		$("#item_button_2").click(
				function(){
					//Use the item - try to be dramatic like using a melon.\
					showItemTargets("Grapes", "eatGrapesYou", "eatGrapesWoman");
					//Decrease item count
					camp_Grapes--;
				}
		);
	}

	if (camp_Melons > 0){
		$("#item_buttons").append("<button id='item_button_3' class='btn btn-woman push--right' title=''>Melons (" + (camp_Melons) + ")</button>");
		$("#item_button_3").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Melon", "eatMelonYou", "eatMelonWoman");
					//Decrease item count.
					camp_Melons--;
				}
		);
	}

	if (camp_SmallMelons > 0){
		$("#item_buttons").append("<button id='item_button_4' class='btn btn-woman push--right' title=''>Small Melons (" + (camp_SmallMelons) + ")</button>");
		$("#item_button_4").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Small Melon", "eatMelonYou", "eatMelonWoman");
					//Decrease item count.
					camp_SmallMelons--;
				}
		);
	}


	if (camp_ToughNuts > 0){
		$("#item_buttons").append("<button id='item_button_5' class='btn btn-woman push--right' title=''>Tough Nuts (" + (camp_ToughNuts) + ")</button>");
		$("#item_button_5").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Tough Nut", "eatDominationNutYou", "eatDominationNutWoman");
					//Decrease item count.
					camp_ToughNuts--;
				}
		);
	}

	if (camp_CleanNuts > 0){
		$("#item_buttons").append("<button id='item_button_6' class='btn btn-woman push--right' title=''>Clean Nuts (" + (camp_CleanNuts) + ")</button>");
		$("#item_button_6").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Clean Nut", "eatDomesticNutYou", "eatDomesticNutWoman");
					//Decrease item count.
					camp_CleanNuts--;
				}
		);
	}

	if (camp_SwolenNuts > 0){
		$("#item_buttons").append("<button id='item_button_7' class='btn btn-woman push--right' title=''>Swolen Nuts (" + (camp_SwolenNuts) + ")</button>");
		$("#item_button_7").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Swolen Nut", "eatMaternalNutYou", "eatMaternalNutWoman");
					//Decrease item count.
					camp_SwolenNuts--;
				}
		);
	}

	if (camp_PrettyNuts > 0){
		$("#item_buttons").append("<button id='item_button_8' class='btn btn-woman push--right' title=''>Pretty Nuts (" + (camp_PrettyNuts) + ")</button>");
		$("#item_button_8").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Pretty Nut", "eatAllureNutYou", "eatAllureNutWoman");
					//Decrease item count.
					camp_PrettyNuts--;
				}
		);
	}

	if (camp_LongNuts > 0){
		$("#item_buttons").append("<button id='item_button_9' class='btn btn-woman push--right' title=''>Long Nuts (" + (camp_LongNuts) + ")</button>");
		$("#item_button_9").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Long Nut", "eatOrientationNutYou", "eatOrientationNutWoman");
					//Decrease item count.
					camp_LongNuts--;
				}
		);
	}






	if (camp_RedNuts > 0){
		$("#item_buttons").append("<button id='item_button_10' class='btn btn-woman push--right' title=''>Red Nuts (" + (camp_RedNuts) + ")</button>");
		$("#item_button_10").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Red Nut", "eatDemonNutYou", "eatDemonNutWoman");
					//Decrease item count.
					camp_RedNuts--;
				}
		);
	}
	if (camp_WhiteNuts > 0){
		$("#item_buttons").append("<button id='item_button_11' class='btn btn-woman push--right' title=''>White Nuts (" + (camp_WhiteNuts) + ")</button>");
		$("#item_button_11").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("White Nut", "eatMelonYou", "eatMelonWoman");
					//Decrease item count.
					camp_WhiteNuts--;
				}
		);
	}
	if (camp_GreenBerries > 0){
		$("#item_buttons").append("<button id='item_button_12' class='btn btn-woman push--right' title=''>Green Berries (" + (camp_GreenBerries) + ")</button>");
		$("#item_button_12").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Green Berry", "eatMelonYou", "eatMelonWoman");
					//Decrease item count.
					camp_GreenBerries--;
				}
		);
	}


	if (camp_PawFruits > 0){
		$("#item_buttons").append("<button id='item_button_13' class='btn btn-woman push--right' title=''>Paw Fruits (" + (camp_PawFruits) + ")</button>");
		$("#item_button_13").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Paw Fruit", "eatPawFruitYou", "eatPawFruitWoman");
					//Decrease item count.
					camp_PawFruits--;
				}
		);
	}

	if (camp_TwinMushrooms > 0){
		$("#item_buttons").append("<button id='item_button_14' class='btn btn-woman push--right' title=''>Twin Mushrooms (" + (camp_TwinMushrooms) + ")</button>");
		$("#item_button_14").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Twin Mushroom", "eatTwinMushroomYou", "eatTwinMushroomWoman");
					//Decrease item count.
					camp_TwinMushrooms--;
				}
		);
	}

	if (camp_TriCreatures > 0){
		$("#item_buttons").append("<button id='item_button_15' class='btn btn-woman push--right' title=''>Tri-Sea-things (" + (camp_TriCreatures) + ")</button>");
		$("#item_button_15").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Tri-Sea-thing", "eatTriCreatureYou", "eatTriCreatureWoman");
					//Decrease item count.
					camp_TriCreatures--;
				}
		);
	}

	if (camp_HairyNuts > 0){
		$("#item_buttons").append("<button id='item_button_16' class='btn btn-woman push--right' title=''>Hairy Nuts (" + (camp_HairyNuts) + ")</button>");
		$("#item_button_16").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Hairy Nut", "eatHairyNutYou", "eatHairyNutWoman");
					//Decrease item count.
					camp_HairyNuts--;
				}
		);
	}


	if (camp_RainbowFlowers > 0){
		$("#item_buttons").append("<button id='item_button_18' class='btn btn-woman push--right' title=''>Rainbow Flowers (" + (camp_RainbowFlowers) + ")</button>");
		$("#item_button_18").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Rainbow Flower", "eatRainbowflowerYou", "eatRainbowflowerWoman");
					//Decrease item count.
					camp_RainbowFlowers--;
				}
		);
	}
	if (camp_DarkBerries > 0){
		$("#item_buttons").append("<button id='item_button_19' class='btn btn-woman push--right' title=''>Dark Berries (" + (camp_DarkBerries) + ")</button>");
		$("#item_button_19").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Dark Berry", "eatMelonYou", "eatMelonWoman");
					//Decrease item count.
					camp_DarkBerries--;
				}
		);
	}
	if (camp_PaleBerries > 0){
		$("#item_buttons").append("<button id='item_button_20' class='btn btn-woman push--right' title=''>Pale Berries (" + (camp_PaleBerries) + ")</button>");
		$("#item_button_20").click(
				function(){
					//Use the item - try to be dramatic like using a melon.
					showItemTargets("Pale Berry", "eatMelonYou", "eatMelonWoman");
					//Decrease item count.
					camp_PaleBerries--;
				}
		);
	}

}

/**Displays item target selection similar to existing implementation. Look at WanderFood*/
function showItemTargets(description, itemAction, actionwoman){

	$("#output").html("<h1>"+description+"</h1>");

	$("#output").append("<h2>Who will eat it?</h2>\
			<div id='eat_buttons' class='push--top'>\
	<button id='eat_button_you' class='btn btn-woman push--right'>You (Raw)</button></div>");
	$("#eat_button_you").click(function(){eval(itemAction + "(false, " + 1 + ")");});
	if (player.Mods.infuse > 0 && player.goods > 0) {
		$("#eat_buttons").append("<button id='eat_button_you_infuse' class='btn btn-woman push--right'>You (Cooked)</button>");
		$("#eat_button_you_infuse").click(function(){
			fBefore = player.isFemale();
			eval(actionyou + "(true, " + 1 + ")");
		});
	}
	function drawEatButton(person,index){
		if (person.isFutanari()) {$("#eat_buttons").append("<button id='woman_button_"+index+"' class='btn btn-futa push--right'>"+person.name+"</button>");
		}else if (person.isFemale()) {$("#eat_buttons").append("<button id='woman_button_"+index+"' class='btn btn-woman push--right'>"+person.name+"</button>");
		}else {$("#eat_buttons").append("<button id='woman_button_"+index+"' class='btn btn-man push--right'>"+person.name+"</button>");}

		$("#woman_button_"+index).click(function(){
			if ($("#woman_eat_buttons").is(":visible")) {
				$("#eat_button_Woman").unbind('click').click(function(){
					eval(actionwoman + "(false, " + 1 + ")");
				});
				$("#eat_button_Woman_Cooked").unbind('click').click(function(){
					eval(actionwoman + "(true, " + 1 + ")");
				});
			} else {
				$("#eat_buttons").append("<div id='woman_eat_buttons' class='push--top'>\
				<button id='eat_button_Woman' class='btn btn-woman push--right'>Choose (Raw)</button>\</div>");

				$("#eat_button_Woman").click(function(){
					eval(actionwoman + "(false, " + 1 + ")");
				});
				if (player.Mods.infuse > 0 && player.goods > 0) {
					$("#woman_eat_buttons").append("<button id='eat_button_Woman_Cooked' class='btn btn-woman push--right'>Choose (Cooked)</button>");

					$("#eat_button_Woman_Cooked").click(function(){
						eval(actionwoman + "(true, " + 1 + ")");
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
}


