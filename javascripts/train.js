// Training
/*jshint multistr:true*/

function Train()
{
	if ($("#train_buttons").is(":visible")) {
		$("#camp_feed").html("");
		return;
	}
	if ($("#women_buttons").is(":visible")) resetRival();

	$("#camp_feed").html(
		"<div id='train_buttons' class='push--top'></div>\
		<div id='train_display'></div>");
	
	// Iron Will
	if (player.Mods.ironwill < 6) {
		$("#train_buttons").append("<button id='train_button_12' class='btn btn-woman push--right' title='You more unstoppable!'>Iron Will+ (" + player.Mods.ironwill + ")</button>");
		$("#train_button_12").click(
			function(){
				if (player.experience >= 5 && player.Mods.ironwill < 4) {
					player.experience -= 5;
					player.Mods.ironwill += 1;
					$("#train_display").append("<p>You resist others domination better</p>");
					drawStats();
					$("#train_button_12").html("Iron Will+ (" + player.Mods.ironwill + ")");
				}
				IsDoneTraining();
			}
		);
	}
	
	// Breast size increase
	$("#train_buttons").append("<button id='train_button_1' class='btn btn-woman push--right' title='Increase way new women care for children'>Mother+ (" + (player.Mods.breasts / 10) + ")</button>");
	$("#train_button_1").click(
		function(){
			if (player.experience >= 5) {
				if (player.Mods.breasts < 100) {
					player.experience -= 5;
					player.Mods.breasts += 10;
					$("#train_display").append("<p>Your new Women will feed their children more</p>");
					drawStats();
					$("#train_button_1").html("Mother+ (" + (player.Mods.breasts / 10) + ")");
				} else $("#train_display").append("<p><b>No bigger possible.</b></p>");
			}
			IsDoneTraining();
		}
	);
	
	// Perception increase
	$("#train_buttons").append("<button id='train_button_2' class='btn btn-woman push--right' title='See though your enemies'>Perception+ (" + (player.Mods.perception / 5) + ")</button>");
	$("#train_button_2").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.perception += 5;
				$("#train_display").append("<p>You see more prey and enemies ways</p>");
				drawStats();
				$("#train_button_2").html("Perception+ (" + (player.Mods.perception / 5) + ")");
			}
			IsDoneTraining();
		}
	);
	
	// Changra increase
	$("#train_buttons").append("<button id='train_button_3' class='btn btn-woman push--right' title='More Power!'>Changra+ (" + (player.Mods.changra / 5) + ")</button>");
	$("#train_button_3").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.changra += 5;
				player.rest();
				$("#train_display").append("<p>You have more Power to expand clan</p>");
				drawStats();
				$("#train_button_3").html("Changra+ (" + (player.Mods.changra / 5) + ")");
			}
			IsDoneTraining();
		}
	);
	
	// Amazon
	$("#train_buttons").append("<button id='train_button_4' class='btn btn-woman push--right' title='Strong women!'>Amazon+ (" + (player.Mods.amazon / 2) + ")</button>");
	$("#train_button_4").click(
		function(){
			if (player.experience >= 5) {
					if (player.Mods.amazon < 20) {
					player.experience -= 5;
					player.Mods.amazon += 2;
					$("#train_display").append("<p>Your new women be stronger!</p>");
					drawStats();
					$("#train_button_4").html("Amazon+ (" + (player.Mods.amazon / 2) + ")");
				} else $("#train_display").append("<p><b>No more possible.</b></p>");
			}
			IsDoneTraining();
		}
	);
	
	// Cocks
	$("#train_buttons").append("<button id='train_button_5' class='btn btn-woman push--right' title='Big Cock!'>Cock+ (" + (player.Mods.cock / 2) + ")</button>");
	$("#train_button_5").click(
		function(){
			if (player.experience >= 5) {
				if (player.Mods.cock < 20) {
					player.experience -= 5;
					player.Mods.cock += 2;
					if (player.Mods.cock > 20) player.Mods.cock = 20;
					$("#train_display").append("<p>Your cock grow!</p>");
					redraw();
					$("#train_button_5").html("Cock+ (" + (player.Mods.cock / 2) + ")");
				} else $("#train_display").append("<p><b>No more possible.</b></p>");
			}
			IsDoneTraining();
		}
	);
	// Balls
	$("#train_buttons").append("<button id='train_button_18' class='btn btn-woman push--right' title='Big Balls!'>Balls+ (" + (player.Mods.balls / 2) + ")</button>");
	$("#train_button_18").click(
		function(){
			if (player.experience >= 5) {
				if (player.Mods.balls < 20) {
					player.experience -= 5;
					player.Mods.balls += 2;
					if (player.Mods.balls > 20) player.Mods.balls = 20;
					$("#train_display").append("<p>Your balls grow!</p>");
					redraw();
					$("#train_button_18").html("Cock+ (" + (player.Mods.balls / 2) + ")");
				} else $("#train_display").append("<p><b>No more possible.</b></p>");
			}
			IsDoneTraining();
		}
	);

	// Futa
	$("#train_buttons").append("<button id='train_button_6' class='btn btn-woman push--right' title='Futa!'>Futa+ (" + (player.Mods.futa / 2) + ")</button>");
	$("#train_button_6").click(
		function(){
			if (player.experience >= 5) {
				if (player.Mods.futa < 20) {
					player.experience -= 5;
					player.Mods.futa += 2;
					if (player.Mods.futa > 20) player.Mods.futa = 20;
					if (player.Mods.futa > 2) $("#train_display").append("<p>Your women will have bigger cocks!</p>");
					else $("#train_display").append("<p>Your women also have cocks!</p>");
					drawStats();
					$("#train_button_6").html("Futa+ (" + (player.Mods.futa / 2) + ")");
				} else $("#train_display").append("<p><b>No more possible.</b></p>");
			}
			IsDoneTraining();
		}
	);
	
	$("#train_buttons").append("<br>");
	
	// Push Dominance
	$("#train_buttons").append("<button id='train_button_8' class='btn btn-woman push--right' title='Force Submissiveness more!'>Submissiveness+ (" + (player.Mods.pushsubmissiveness / 2) + ")</button>");
	$("#train_button_8").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.pushsubmissiveness += 2;
				$("#train_display").append("<p>You make others submissive!</p>");
				drawStats();
				$("#train_button_8").html("Submissiveness+ (" + (player.Mods.pushsubmissiveness / 2) + ")");
			}
			IsDoneTraining();
		}
	);
	// Push Domesticity
	$("#train_buttons").append("<button id='train_button_9' class='btn btn-woman push--right' title='Force Domesticity more!'>Domesticity+ (" + (player.Mods.pushdomesticity / 2) + ")</button>");
	$("#train_button_9").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.pushdomesticity += 2;
				$("#train_display").append("<p>You make others domestic!</p>");
				drawStats();
				$("#train_button_9").html("Domesticity+ (" + (player.Mods.pushdomesticity / 2) + ")");
			}
			IsDoneTraining();
		}
	);
	// Push Maternalism
	$("#train_buttons").append("<button id='train_button_7' class='btn btn-woman push--right' title='Force Maternalism more!'>Maternalism+ (" + (player.Mods.pushmaternalism / 2) + ")</button>");
	$("#train_button_7").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.pushmaternalism += 2;
				$("#train_display").append("<p>You make others more mother!</p>");
				drawStats();
				$("#train_button_7").html("Maternalism+ (" + (player.Mods.pushmaternalism / 2) + ")");
			}
			IsDoneTraining();
		}
	);
	// Push Allure
	$("#train_buttons").append("<button id='train_button_10' class='btn btn-woman push--right' title='Force Alure more!'>Allure+ (" + (player.Mods.pushallure / 2) + ")</button>");
	$("#train_button_10").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.pushallure += 2;
				$("#train_display").append("<p>You make others pretty!</p>");
				drawStats();
				$("#train_button_10").html("Allure+ (" + (player.Mods.pushallure / 2) + ")");
			}
			IsDoneTraining();
		}
	);
	// Push Orientation
	$("#train_buttons").append("<button id='train_button_11' class='btn btn-woman push--right' title='Force Orientation more!'>Orientation+ (" + (player.Mods.pushorientation / 2) + ")</button>");
	$("#train_button_11").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.pushorientation += 2;
				$("#train_display").append("<p>You make others desire you!</p>");
				drawStats();
				$("#train_button_11").html("Orientation+ (" + (player.Mods.pushorientation / 2) + ")");
			}
			IsDoneTraining();
		}
	);
	
	$("#train_buttons").append("<br>");
	
	// Resist Dominance
	$("#train_buttons").append("<button id='train_button_13' class='btn btn-woman push--right' title='Resist Submissiveness!'>Resist Submissiveness (" + player.Mods.resistsubmissiveness + ")</button>");
	$("#train_button_13").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.resistsubmissiveness += 1;
				$("#train_display").append("<p>You not beome a follower so easily!</p>");
				drawStats();
				$("#train_button_13").html("Resist Submissiveness (" + player.Mods.resistsubmissiveness + ")");
			}
			IsDoneTraining();
		}
	);
	
	// Resist Domesticity
	$("#train_buttons").append("<button id='train_button_14' class='btn btn-woman push--right' title='Resist Domesticity!'>Resist Domesticity (" + player.Mods.resistdomesticity + ")</button>");
	$("#train_button_14").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.resistdomesticity += 1;
				$("#train_display").append("<p>You not become one to look after camp so easily!</p>");
				drawStats();
				$("#train_button_14").html("Resist Domesticity (" + player.Mods.resistdomesticity + ")");
			}
			IsDoneTraining();
		}
	);
	// Resist Maternalism
	$("#train_buttons").append("<button id='train_button_15' class='btn btn-woman push--right' title='Resist Maternalism!'>Resist Maternalism (" + player.Mods.resistmaternalism + ")</button>");
	$("#train_button_15").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.resistmaternalism += 1;
				$("#train_display").append("<p>You not become a mother so easily!</p>");
				drawStats();
				$("#train_button_15").html("Resist Maternalism (" + player.Mods.resistmaternalism + ")");
			}
			IsDoneTraining();
		}
	);
	// Resist Allure
	$("#train_buttons").append("<button id='train_button_16' class='btn btn-woman push--right' title='Resist Allure!'>Resist Allure (" + player.Mods.resistallure + ")</button>");
	$("#train_button_16").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.resistallure += 1;
				$("#train_display").append("<p>You not become pretty so easily!</p>");
				drawStats();
				$("#train_button_16").html("Resist Allure (" + player.Mods.resistallure + ")");
			}
			IsDoneTraining();
		}
	);
	// Resist Orientation
	$("#train_buttons").append("<button id='train_button_17' class='btn btn-woman push--right' title='Resist Orientation!'>Resist Orientation (" + player.Mods.resistorientation + ")</button>");
	$("#train_button_17").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.resistorientation += 1;
				$("#train_display").append("<p>You not gain desire as much</p>");
				drawStats();
				$("#train_button_17").html("Resist Orientation (" + player.Mods.resistorientation + ")");
			}
			IsDoneTraining();
		}
	);


$("#train_buttons").append("<br>");
//==========================================
//TODO: For some reason, these buttons do not appear. I might have missed a copypasta when moving the feature over. - DSM
//class='btn btn-combat btn-drain'


	// Drain Dominance
	$("#train_buttons").append("<button id='train_button_38' class='btn btn-drain push--right' title='Drain Dominance more!'>D-Dominance+ (" + (player.Mods.draindominance / 2) + ")</button>");
	$("#train_button_38").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.draindominance += 2;
				$("#train_display").append("<p>You drain others' bigness more!</p>");
				drawStats();
				$("#train_button_38").html("D-Dominance+ (" + (player.Mods.draindominance / 2) + ")");
			}
			IsDoneTraining();
		}
	);
	// Drain Adventureness
	$("#train_buttons").append("<button id='train_button_39' class='btn btn-drain push--right' title='Drain Adventureness more!'>D-Adventureness+ (" + (player.Mods.drainadventureness / 2) + ")</button>");
	$("#train_button_39").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.drainadventureness += 2;
				$("#train_display").append("<p>You drain others' strength more!</p>");
				drawStats();
				$("#train_button_39").html("D-Adventureness+ (" + (player.Mods.drainadventureness / 2) + ")");
			}
			IsDoneTraining();
		}
	);
	// Drain Maternalism
	$("#train_buttons").append("<button id='train_button_40' class='btn btn-drain push--right' title='Drain Paternalism more!'>D-Paternalism+ (" + (player.Mods.drainpaternalism / 2) + ")</button>");
	$("#train_button_40").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.drainpaternalism += 2;
				$("#train_display").append("<p>You drain others' fatherhood more!</p>");
				drawStats();
				$("#train_button_40").html("D-Paternalism+ (" + (player.Mods.drainpaternalism / 2) + ")");
			}
			IsDoneTraining();
		}
	);
	// Drain Lust
	$("#train_buttons").append("<button id='train_button_41' class='btn btn-drain push--right' title='Drain Lust more!'>D-Lust+ (" + (player.Mods.drainlust / 2) + ")</button>");
	$("#train_button_41").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.drainlust += 2;
				$("#train_display").append("<p>You drain others lust more!</p>");
				drawStats();
				$("#train_button_41").html("D-Allure+ (" + (player.Mods.drainlust / 2) + ")");
			}
			IsDoneTraining();
		}
	);
	// Drain Orientation
	$("#train_buttons").append("<button id='train_button_42' class='btn btn-drain push--right' title='Drain Orientation more!'>D-Orientation+ (" + (player.Mods.drainorientation / 2) + ")</button>");
	$("#train_button_42").click(
		function(){
			if (player.experience >= 5) {
				player.experience -= 5;
				player.Mods.drainorientation += 2;
				$("#train_display").append("<p>You Drain others lust more!</p>");
				drawStats();
				$("#train_button_42").html("D-Orientation+ (" + (player.Mods.drainorientation / 2) + ")");
			}
			IsDoneTraining();
		}
	);


	$("#train_buttons").append("<br>"); 

}
//==========================================

function IsDoneTraining()
{
	if (player.experience <= 0) {
		$("#exp_button").hide();
		$("#train_buttons").hide();
		$("#train_display").append("<p><b>You no can train more.</b></p>");
	}
}
