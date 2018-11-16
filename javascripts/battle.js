/*jslint white: false, maxerr: 999, indent: 2 */
/*jshint multistr:true*/
var fBeforeBattle;
var fBefore;

function getPerceptionRate() {
	var perception = 75;
	var ratio = player.perception() - (rival.cunning() + rival.Mods.perception);
	if (ratio > 0) { perception += ratio / 3; }
	else if (ratio < 0) { perception += ratio / 3; }
	return perception;
}

function Battle(currrival, auto)
{
	rival = currrival;
	var pushCount = 0;
	var drainCount = 0;
	var reflectCount = 0;
	var playerDefeated = false;
	fBeforeBattle = player.isFemale();
	var rnd = 0;
	var autoTimer;
	var bAuto = auto;
	var nAccurateTell;
	var sTell;
  BattleActions = {
		"push":Push,
		"drain":Drain,
		"reflect":Reflect,
		"rest":Rest,
		"hesistat":Hesitate,
		"flee":Flee
	};

	var description = "";

	var rivalmanlwr = rival.name == "Rival man" || rival.name == "Rival woman" ? rival.name.toLowerCase() : rival.name;
	var rivalhe = rival.heshe;
	var rivalhim = rival.himher;
	if (rival.name == "Rival man" || rival.name == "Rival woman") {
		$("#rcwomen").html("Rival's Women: <span id='rival_women'>");
		$("#rcchangra").html("Rival's Changra: <span id='rival_changra'>");
	} else {
		$("#rcwomen").html(rival.name + "'s Women: <span id='rival_women'>");
		$("#rcchangra").html(rival.name + "'s Changra: <span id='rival_changra'>");
	}
	$("#rcwomen").show();
	$("#rcchangra").show();
	$("#goods").hide();
	var nextRivalAction = new RivalAction(rival, player);

	$("#output").html(
	"<div class='combat-controls'>\
		<div id='push_controls' class='combat-button-column'></div>\
		<div id='drain_controls' class='combat-button-column'></div>\
		<div id='support_controls' class='combat-button-column'></div>\
		<div id='victory_button_container'></div>\
	</div>\
	<div id='combat_feed'>\
	<div id='last_action'></div>\
	<hr/>\
	<div id='changes'></div>\
	</div>");
		
	if (!bAuto) {
		fillPushColumn();
		fillDrainColumn();
		fillSupportColumn();
	} else {
		fillManual();
		fillFlee();
	}
	
	redraw();

  var tell = rivalTell();
  $("#last_action").html("<p class='rival-tell'>" + tell + "</p>");
	
	if (bAuto) AutoBattleRound();

	function fillPushColumn() {
		$("#push_controls").html("<h2>Infuse</h2>");
		$.each(AVATAR_TRAITS, function( index, trait ) {
			traitName = trait === "orientation" ? "Attraction to &#9794;" : capitalize(trait);
			if (player[trait] > 50) {
			 $("#push_controls").append("<button id='push_" + trait + "' class='btn btn-combat btn-push'>&#955; " + traitName + "</button>");
			 if (player.changra < 13) {
				$("#push_" + trait).attr("disabled","disabled");
			 } else {
				$("#push_" + trait).click(function() { new Round(new Push(trait, player)); });
			 }
			} else {
			 $("#push_controls").append("<button id='push_" + trait + "' class='btn btn-combat btn-summon-maternal'>&#8756; " + traitName + "</button>");
			 if (player.changra < 7) {
				$("#push_" + trait).attr("disabled","disabled");
			 } else {
				$("#push_" + trait).click(function() { new Round(new Push(trait, player)); });
			 }
			}
		});
	}

	function fillDrainColumn() {
		$("#drain_controls").html("<h2>Drain</h2>");

		$.each(AVATAR_TRAITS, function(index, trait) {
			traitName = switchFemForMascTrait(trait);
			if (rival[trait] > 50) {
			 $("#drain_controls").append("<button id='drain_" + trait + "' class='btn btn-combat btn-summon-paternal'>&#8756; " + traitName + "</button>");
			 if (player.changra < 6) {
				$("#drain_" + trait).attr("disabled","disabled");
			 } else {
				$("#drain_" + trait).click(function() { new Round(new Drain(trait, player)); });
			 }
			}
			else{
			 $("#drain_controls").append("<button id='drain_" + trait + "' class='btn btn-combat btn-drain'>&#978; " + traitName + "</button>");
			 if (player.changra < 4) {
				$("#drain_" + trait).attr("disabled","disabled");
			 } else {
				$("#drain_" + trait).click(function() { new Round(new Drain(trait, player)); });
			 }
			}
		});
	}

	function fillFlee() {
		$("#support_controls").append("<button id='flee' class='btn btn-combat btn-support'>Flee</button>");
		$("#flee").click(function() { eval("new Round(new Flee(player));"); });
	}
	function fillManual() {
		$("#support_controls").append("<button id='manual' class='btn btn-combat btn-support'>Manual</button>");
		$("#manual").click(function() {
			clearTimeout(autoTimer);
			bAuto = false;
			fillPushColumn();
			fillDrainColumn();
			fillSupportColumn();
		});
	}
	
	function fillSupportColumn() {
		$("#support_controls").html("<h2>Other</h2>");
		$.each(["reflect", "rest"], function( index, action ) {
			$("#support_controls").append("<button id='" + action + "' class='btn btn-combat btn-support'>" + capitalize(action) + "</button>");
			$("#" + action).click(function() { eval("new Round(new " + capitalize(action) + "(player));"); });
		});
		fillFlee();
		$("#reflect").addClass("btn-reflect");
	}
	
  function standardChange() { return getRandomInt(7, 13); }

  function checkForVictoryButton() {
		if (rival["physique"].testes <= 11) {
			$("#victory_button_container").empty();
			return false;
		} else {
			$("#victory_button_container").html("<button id='victory_button' class='btn btn-victory'>Claim Her</button>");
			$("#victory_button").click(rival,
				function(evt) {
					clearTimeout(autoTimer);
					delete rival.currentAction;
					delete player.currentAction;
					evt.data.Victory();
					//eval("rival.Victory()");
				}
			);
			return true;
		}
	}

	function RivalAction(avatar, opponent) {

    this.action = "";
    this.trait = "";
		this.avatar = avatar;
		this.opponent = opponent;

		// Does they hesitate?
    if (this.avatar.submissiveness / 4 >= getRandomInt(0, 100) && this.avatar.Mods.ironwill < 4) {
			if ((this.avatar.Mods.ironwill * 25) < getRandomInt(1, 100)) return new Hesitate(this.avatar);
			else return new Rest(this.avatar);
    }
		
		// Is their opponent defeated
		// (rival vs player only)
		if (this.avatar == rival) {
			var tst = player.calcTestes(false);
			if (tst > 11 && player.submissiveness >= rival.desires["submissiveness"] && player.domesticity >= rival.desires["domesticity"] && player.maternalism >= rival.desires["maternalism"] && player.allure >= rival.desires["allure"] && player.orientation >= rival.desires["orientation"]) {
				playerDefeated = true;
				clearTimeout(autoTimer);
				delete rival.currentAction;
				delete player.currentAction;
				rival.Defeat();
				return new Rest(rival);
			}
		}
		
		// Do they Rest
		if (this.avatar.changra < getRandomInt(0, 70)) return new Rest(this.avatar);
		
		// They do another action
		var pushPropability = drainCount + this.avatar.pushPreference + getRandomInt(0, this.avatar.unpredictability);
		var drainProbability = reflectCount + this.avatar.drainPreference + getRandomInt(0, this.avatar.unpredictability);
		var reflectProbability = pushCount + this.avatar.reflectPreference + getRandomInt(0, this.avatar.unpredictability);
		var predictions = [{"action": "push", "val": pushPropability}, {"action": "drain", "val": drainProbability}, {"action": "reflect", "val": reflectProbability}];
		predictions = predictions.sort(function(a,b) {
			return b.val - a.val;
		});
		this.action = predictions[0].action;
		this.trait = rival.determineAttackTrait(this.avatar, this.opponent, this.action);
		return new BattleActions[this.action](this.trait,this.avatar);
		//return eval("new " + capitalize(this.action) + "('" + this.trait + "', this.avatar);" );
  }

  function processRound(playerAction, rivalAction) {
    if (playerAction.name === rivalAction.vulnerability) playerAction.special();
    else if (rivalAction.name === playerAction.vulnerability) rivalAction.special();
    else {
      playerAction.standard();
      rivalAction.standard();
    }
  }

  function describeTrait(trait) {

    function describeSubmissiveness() {
      switch (player.description[trait]) {
        case 10: return "Your eyes wet with tears. You stupid, scared. You only make mistake. You want dada. You want someone protect you.";
        case 9: return "You feel small, like child boy. But when you real child, father protect you. Nobody protect you now.";
        case 8: return rival.name + " stare at you, and " + rivalhe + " know. " + capitalize(rivalhe) + " know you stupid. You make mistake.";
        case 7: return "You pause, doubting last action. Did you make mistake? Are you stupid?";
        case 6: return "You hesitate, unsure what to do next.";

        case 5: return "You plant feet firm in ground. Shaken but ready.";
        case 4: return "You stand straight, roll shoulders, stare " + rivalmanlwr + " hard in eye.";
        case 3: return "You smile cocky at " + rival.name + ". " + capitalize(rivalhe) + " weak. You strong. You make him your woman.";
        case 2: return "You laugh at " + rival.name + ". " + capitalize(rivalhe) + " become like dog to you. All manfolk become like dog to you.";
        case 1: return "You roar at " + rival.name + ", beat your chest. He cower before you like dog man!";
      }
    }

    function describeDomesticity() {
      switch (player.description[trait]) {
        case 10: return "You want not be in forest. You want be in den. Den safe, warm, good. Forest scary and big.";
        case 9: return "Sun reaches high point, and you feel strange urgency. You should be back at den, cooking dinner. Chop vegetables, soften meat, boil water, stir patient.";
        case 8: return "Strange voice whisper in head. Tell you get back to den, tend to fire, clean floor, cook dinner, wash clothes, patch holes, sort berries, gather nuts.";
        case 7: return "You spot cedar berry, very good on meat. Without thinking you swipe handful of them.";
        case 6: return "You notice herb plant near foot. Very strange. Father never teach you of herb plants.";

        case 5: return "Ears perk up. You hear chitter of squirrels overhead.";
        case 4: return "You notice animal tracks everywhere. Once " + rivalmanlwr + " is womanfolk, you go hunt and bring food for everyone.";
        case 3: return "Nostrils flare. You catch whiff of musk in air. She-deer nearby.";
        case 2: return "You want get bow and stalk through snow, follow track until you kill big she-deer.";
        case 1: return "You part lips, move air across tongue like panther. You taste she-deer musk. You want follow trail, but must finish battle.";
      }
    }

    function describeMaternalism() {
      switch (player.description[trait]) {
        case 10: return "You want cradle baby in arms. You want coo at baby. Your nipples grow big and hard, and they want suckle baby.";
        case 9: return "You imagine self swelling with first baby. Without thinking, you cradle belly, but it is flat and you feel strange sadness.";

        case 5: return "Being father one day be fun. You play with child, teach him how wrestle. Make funny face. Child laugh easy.";
        case 4: return "When you have child, you be good father. You teach how hold bow, how walk quiet.";
        case 3: return "You imagine woman swelling with baby. Your baby. You grin satisfaction.";
        case 2: return "One day, you be good stern father. You show harshness like Iberninth, and son grow strong to survive.";
        case 1: return "You imagine whole tribe of womanfolk. All swelling with baby. All your baby. You father to whole clan!";
      }
    }

    function describeAllure() {
      switch (player.description[trait]) {
        case 10: return "You moving like she-cat in heat. Gestures slow, sensual, beckoning. You try stop, but within moments you doing it again.";
        case 9: return "You give " + rivalmanlwr + " flirt-like smile. Change posture so he get better look at chest. When you realize what you doing, you jerk straight up. " + rival.name + " give you bemused smile.";
        case 8: return "Without thinking you bat eyelashes at " + rivalmanlwr + ".";
        case 7: return "You think of womanfolk dress. How pretty and delicate and flowing. Blushing, you imagine self wearing their clothes.";
        case 6: return "You notice chipped fingernails, dirt underneath. You notice mud on hairy arms. Clothes stained.";

        case 5: return "You feel wind on lips, and you think of kiss from womanfolk. Always good.";
        case 4: return "You think of first time you have sex. Was slow and gentle and little scared.";
        case 3: return "Once, a clanswoman gave you love-handing. Was good.";
        case 2: return "You want fuck. Or love-handing. Maybe even you love-hand yourself.";
        case 1: return "You stare at " + rivalmanlwr + ". You want " + rivalhim + " ready for fucking.";
      }
    }

    function describeOrientation() {
      switch (player.description[trait]) {
        case 10: return rival["physique"].penis < 10 ? "You gaze at " + rivalmanlwr + "'s cock, imagining " + rivalhim + " thrusting it deep into you again and again while you bounce around and moan." : "You imagine being with man with big cock, him thrusting it deep into you again and again while you bounce around and moan.";
        case 9: return "You keep thinking of penises. Big erect penises.";
        case 8: return rival["physique"].penis < 10 ? "You gaze at " + rivalmanlwr + "'s penis, blushing deep as you imagine what it would feel like in your hand. He smirk at you knowing-like." : "You imagine what it would be like to have other man's penis in your hand. In your mouth.";
        case 7: return rival["physique"].penis < 10 ? "You find eyes gazing at " + rivalmanlwr + "'s penis." : "You find eyes gazing at " + rivalmanlwr + "'s crotch, remembering his penis.";
        case 6: return "You think of men with big arms, hard muscles.";

        case 5: return "You imagine threesome. You and other man with one big bottom woman.";
        case 4: return "You think of woman's breast. The feel of it in your hand.";
        case 3: return "You want throw woman on hay. Ride her from behind while she moan.";
        case 2: return "You imagine woman, heavy thighs wrapped around your waist, wet pussy riding up and down your cock, big ass squeezing in your hands.";
        case 1: return "You want four woman, all kissing and stroking and sucking and moaning. All their juices and their smells covering you, covering them, until world is warm and sweet and sticky.";
      }
    }

    switch (trait) {
      case "submissiveness":
        return describeSubmissiveness();
      case "domesticity":
        return describeDomesticity();
      case "maternalism":
        return describeMaternalism();
      case "allure":
        return describeAllure();
      case "orientation":
        return describeOrientation();
    }
  }

	function describeChange(avatar, trait) {
		if (avatar === player) {
			var description = "";
			var traitFraction = Math.floor(avatar[trait] / 10);
			if (traitFraction != avatar.description[trait]) {
				avatar.description[trait] = traitFraction;
				description = describeTrait(trait);
			}
			if (description !== undefined && description.length > 0) {
				$("#changes").prepend("<p class='change-feminine'>" + description + "</p>");
			}
		}
	}

	// Apply a change from combat where
	// avatar = affected party
	// trait = "submissiveness" etc
	// rate = amount
	// special
	function processAction(avatar, trait, rate, special) {
		rate = Math.ceil(rate);
		if (rate > 0) {
			var resist = rate > 0 ? avatar.Mods["resist" + trait] : 0;
			rate = rate - resist;
			if (rate < 2) rate = 2;		// minimum change
		}
		//alert(avatar.name + " " + trait + " changes " + rate);
		var projectedTotal = avatar[trait] + rate;
		if (special === true) {
			if (projectedTotal > avatar.maximums[trait]) {
				projectedTotal -= avatar.maximums[trait];
				projectedTotal /= 2;
				avatar.changeNatural(trait, projectedTotal);
				avatar[trait] = avatar.maximums[trait];
			} else if (projectedTotal < avatar.minimums[trait]) {
				projectedTotal = avatar.minimums[trait] - projectedTotal;
				projectedTotal /= 2;
				avatar.changeNatural(trait, -1 * projectedTotal);
				avatar[trait] = avatar.minimums[trait];
			} else {
				avatar[trait] = projectedTotal;
			}
			describeChange(avatar, trait);
		} else {
			if (projectedTotal > avatar.maximums[trait]) {
				avatar.changeNatural(trait, 2);
				avatar[trait] = avatar.maximums[trait];
			} else if (projectedTotal < avatar.minimums[trait]) {
				avatar.changeNatural(trait, -2);
				avatar[trait] = avatar.minimums[trait];
			} else {
				avatar[trait] = projectedTotal;
			}
		}
		avatar.capTraits();
	}
  function Push(trait, avatar) {
    this.avatar = avatar;
    this.opponent = this.avatar === player ? rival : player;

    this.name = "push";
    this.vulnerability = "reflect";
    this.trait = trait;

    this.avatar.currentAction = this;

    if (this.avatar[this.trait] > 50) this.avatar.changra -= 13;
    else this.avatar.changra -= 7;

    this.special = function() {
      var opponentActivity = this.avatar[this.trait] > 50 ? "listen to father ancestors" : "siphon masculinity";
			var rate;
      if (this.avatar[this.trait] > 50) {
        rate = standardChange() * (this.avatar[this.trait] / 25);
        if (this.avatar.Mods["push" + this.trait] !== 0) rate *= 1 + (0.2 * this.avatar.Mods["push" + this.trait]);
        processAction(this.opponent, this.trait, rate, true);
        processAction(this.avatar, this.trait, rate * -1, true);
        this.avatar[this.trait] = minValue(this.avatar[this.trait], 50);
        description += this.avatar === player ? rival.name + " attempt " + opponentActivity + ", but instead " + rivalhe + " vulnerable as you push " + rivalhim + " full of " + this.trait + ". " : "You attempt " + opponentActivity + ", but instead you vulnerable as " + rivalhe + " push you full of " + this.trait + ". ";
      } else {
        rate = standardChange() * 2;
        if (this.avatar.Mods["push" + this.trait] !== 0) rate *= 1 + (0.2 * this.avatar.Mods["push" + this.trait]);
        processAction(this.opponent, this.trait, rate, true);
        description += this.avatar === player ? rival.name + " attempt " + opponentActivity + ", but instead " + rivalhe + " soak in your mother ancestor's " + this.trait + " very fast. " : "You attempt " + opponentActivity + ", but instead you soak in " + this.trait + " from " + rivalmanlwr + "'s mother ancestors. ";
      }
    };

    this.standard = function() {
			var rate;
      if (this.avatar[this.trait] > 50) {
        rate = standardChange() * (this.avatar[this.trait] / 50);
        if (this.avatar.Mods["push" + this.trait] !== 0) rate *= 1 + (0.2 * this.avatar.Mods["push" + this.trait]);
        processAction(this.opponent, this.trait, rate);
        processAction(this.avatar, this.trait, rate * -1);
        this.avatar[this.trait] = minValue(this.avatar[this.trait], 50);
        description += this.avatar === player ? "You push " + this.trait + " into " + rivalmanlwr + ". " : rival.name + " push " + this.trait + " into you. ";
      } else {
				rate = standardChange();
        if (this.avatar.Mods["push" + this.trait] !== 0) rate *= 1 + (0.2 * this.avatar.Mods["push" + this.trait]);
        processAction(this.opponent, this.trait, rate);
        description += this.avatar === player ? "You summon mother ancestors, which fill " + rivalmanlwr + " with " + this.trait + ". " : rival.name + " summon mother ancestors, which whisper to you secrets of " + this.trait + ". ";
      }
    };
  }

  function Drain(trait, avatar) {
    this.avatar = avatar;
    this.opponent = this.avatar === player ? rival : player;

    this.name = "drain";
    this.vulnerability = "push";
    this.trait = trait;

    this.avatar.currentAction = this;

    if (this.avatar[this.trait] > 50) this.avatar.changra -= 6;
    else this.avatar.changra -= 4;

    this.special = function() {
      if (this.opponent[this.trait] > 50) {
        if (this.avatar.Mods["drain" + switchFemForMascTrait(this.trait)] !== 0) rate *= 1 + (0.2 * this.avatar.Mods["drain" + switchFemForMascTrait(this.trait)]);  //drain mod increase
        processAction(this.avatar, this.trait, standardChange() * -1, true);
        description += this.avatar === player ? rival.name + " attempt reflect, leaving you free to talk to father ancestors about " + switchFemForMascTrait(this.trait) + ". " : "You attempt reflect " + rival.name + "'s attack, leaving " + rivalhim + " free to talk with father ancestors about " + switchFemForMascTrait(this.trait) + ". ";
      } else {
        var rate = standardChange() * 2;
        processAction(this.opponent, this.trait, rate, true);
        processAction(this.avatar, this.trait, rate * -1, true);
        this.opponent[this.trait] = maxValue(this.opponent[this.trait], 51);
        description += this.avatar === player ? rival.name + " attempt reflect, make " + rivalhim + " easy prey as you drain " + rivalhim + " of " + switchFemForMascTrait(this.trait) + ". " : "You attempt reflect, making you easy prey as " + rivalmanlwr + " drain you of " + switchFemForMascTrait(this.trait) + ". ";
      }
    };

    this.standard = function() {
      if (this.opponent[this.trait] > 50) {
        processAction(this.avatar, this.trait, standardChange() * -1);
        description += this.avatar === player ? "You summon father ancestors and learn of " + switchFemForMascTrait(this.trait) + ". " : rival.name + " summon father ancestors and learn of " + switchFemForMascTrait(this.trait) + ". ";
      } else {
        var rate = standardChange() * 2;
        processAction(this.opponent, this.trait, rate);
        processAction(this.avatar, this.trait, rate * -1);
        this.opponent[this.trait] = maxValue(this.opponent[this.trait], 51);
        description += this.avatar === player ? "You drain " + rivalmanlwr + " of " + switchFemForMascTrait(this.trait) + ". " : rival.name + " drain you of " + switchFemForMascTrait(this.trait) + ". ";
      }
    };
  }
  

  function Reflect(avatar) {
    this.avatar = avatar;
    this.opponent = this.avatar === player ? rival : player;

    this.name = "reflect";
    this.vulnerability = "drain";

    this.avatar.currentAction = this;

    this.special = function() {
      this.trait = this.opponent.currentAction.trait;
      processAction(this.opponent, this.trait, standardChange() * 2, true);
      description += this.avatar === player ? rival.name + " attempt give you " + this.trait + ", but you reflect it back at " + rivalhim + ". " : "You attempt give " + rivalmanlwr + " " + this.trait + ", but " + rivalhe + " reflects it back at you. " ;
    };

    this.standard = function() {
      this.avatar.changra += getRandomInt(0, 5);
      description += this.avatar === player ? "You attempt reflect " + rivalmanlwr + "'s attack, but " + rivalhe + " no attack. " : rival.name + " attempt reflect your attack, but you no attack. ";
    };
  }
  

  function Rest(avatar) {
    this.avatar = avatar;
    this.opponent = this.avatar === player ? rival : player;

    this.name = "rest";
    this.vulnerability = "";

    this.avatar.currentAction = this;

    this.standard = function() {
      this.avatar.changra += getRandomInt(20, 30);
      $.each(AVATAR_TRAITS, function(index, trait) {
        if (avatar[trait] < avatar.natural[trait]) {
          avatar[trait] += getRandomInt(1, 3);
          avatar[trait] = maxValue(avatar[trait], avatar.natural[trait]);
        } else if (avatar[trait] > avatar.natural[trait]) {
          avatar[trait] -= getRandomInt(1, 3);
          avatar[trait] = minValue(avatar[trait], avatar.natural[trait]);
        }
      });
      description += this.avatar === player ? "You rest. " : rival.name + " rest. ";
    };
  }

  function Flee(avatar) {
		clearTimeout(autoTimer);
    this.avatar = avatar;
    this.opponent = this.avatar === player ? rival : player;

    this.name = "flee";
    this.vulnerability = "";

    this.avatar.currentAction = this;

    this.standard = function() {
			var val = rival.name == ("Rival man" || rival.name == "Rival woman") ? this.opponent.allure : 25;
      if (getRandomInt(0, 100) < val) {
        alert("You run like she-deer!");
        this.avatar.changra -= 15;
        Camp();
      } else {
        this.avatar.changra -= 5;
        description += "You attempt escape, but " + rivalmanlwr + " pursue you. ";
				if (bAuto) autoTimer = setTimeout(AutoBattleRound, 200);
      }
    };
  }

  function Hesitate(avatar) {
    this.avatar = avatar;
    this.opponent = this.avatar === player ? rival : player;

    this.name = "hesitate";
    this.vulnerability = "";

    this.avatar.currentAction = this;

    this.standard = function() {
      this.avatar.changra += getRandomInt(15, 20);
      description += this.avatar === player ? "You hesitate. " : rival.name + " hesitate. ";
    };
  }

  function processCounts(playerAction) {
    pushCount -= 1;
    drainCount -= 1;
    reflectCount -= 2;
    if (playerAction.name == "push") pushCount += 2;
    else if (playerAction.name == "drain") drainCount += 2;
    else if (playerAction.name == "reflect") reflectCount += 3;

    pushCount = minValue(pushCount, 0);
    drainCount = minValue(drainCount, 0);
    reflectCount = minValue(reflectCount, 0);
  }

  function rivalTell() {

    function accurateTell() { 
			nAccurateTell = 1;
			sTell = nextRivalAction.name;
			return rival.getTell(nextRivalAction.name);
		}

    function deceptiveTell() {
			nAccurateTell = 0;
      if (nextRivalAction.name === "rest") {
				sTell = "push";
				return rival.getTell("push");
			}
			sTell = nextRivalAction.vulnerability;
      return rival.getTell(nextRivalAction.vulnerability);
    }

    var perceptionRate = getPerceptionRate();

    // No tell 25 - perception/10
    if ((((25 - (player.perception() / 10)) > getRandomInt(0, 100)) && nAccurateTell == undefined) || nAccurateTell == -1) {
			nAccurateTell = -1;
			sTell = "";
			return "";
		}
		// generate true or deceptive tell based on perception
		if (perceptionRate >= getRandomInt(0, 100) || nAccurateTell == 1)  {
			return accurateTell();
    }
		if (player.Mods.perception < 4 || nAccurateTell == 0) return deceptiveTell();
		nAccurateTell = -1;
		sTell = "";
		return "";
  }

  function Round(playerAction) 
	{
    description = "";
		rnd++;

		if (!bAuto) {
			if ((player.submissiveness / 4) > getRandomInt(1, 100) && player.Mods.ironwill < 4) {
				if ((player.Mods.ironwill * 25) < getRandomInt(1, 100)) playerAction = new Hesitate(player);
			}
		}
		
    processRound(playerAction, nextRivalAction);
    processCounts(playerAction);
		player.capTraits();
    rival.capTraits();
		
		redraw();

    nextRivalAction = new RivalAction(rival, player);
		if (playerDefeated == true) return;
    var tell = rivalTell();
		nAccurateTell = undefined;

		if (!bAuto) {
			fillPushColumn();
			fillDrainColumn();
			fillSupportColumn();
		} else {
			fillManual();
			fillFlee();
		}
	
		redraw();
    var ret = checkForVictoryButton();
    $("#last_action").html("<p class='battle-description'>" + description + "</p><p class='rival-tell'>" + tell + "</p>");
		return ret;
  }

	function AutoBattleRound()
	{
		// Determine player action		
		var playeraction = undefined;
		var pexp = player.getTrainingRanks() * 5 + player.experience;
		var rexp = rival.getTrainingRanks() * 5;
		
		$("#support_controls").html("<h2>Other</h2>");

		if ((pexp / rexp * 66) > getRandomInt(0, 100)) {
			// Use accurate
			if (nAccurateTell == 1) {
				/*
				Action    	Vulnerability
				------			-------------
				"push"    	"reflect";
				"drain"			"push";
				"reflect"		"drain";
				"rest"			""
				"hesitate"	""
				*/
				var rtrait = AVATAR_TRAITS[getRandomInt(0, 4)];		//TODO: maybe select based on value etc
				if (sTell == "push") playeraction = new Reflect(player); 
				else if ((sTell == "drain" || sTell == "rest" || sTell == "hesitate") && player.changra > 6) playeraction = new Push(rtrait, player);
				else if (sTell == "reflect" && player.changra > 5) playeraction = new Drain(rtrait, player);
			}
		}
		if (playeraction == undefined) playeraction = new RivalAction(player, rival);
		if (playerDefeated == true) return;
		
		// Do the round
		if (Round(playeraction)) autoTimer = setTimeout(AutoBattleRound, 2000);
		else autoTimer = setTimeout(AutoBattleRound, 200);
	}
	
	
}
