/**anhk.js
 * Extracting smith from people for later use as a fully realized character.

 * 
 */

function createSmith()
{
	createRival(20);
	smith = rival;
	
	smith.Mods.amazon = 2;
	smith.Mods.breasts = 6;
	smith.submissiveness = 0;
	smith.domesticity = 80;
  	smith.maternalism = 65;
  	smith.allure = 100;
  	smith.orientation = 80;
	smith.futa = 0;

	smith.Mods.infuse = 1;
	smith.Mods.craftnipplerings = 1;
	smith.items.nipplerings = 1;
	smith.name = "Anhk";
	smith.goods = 0;
}

// Meet Smith

function MeetSmith()
{
	rival = smith;
	rival.round = player.round;
	redraw();
	Message("Camp()", "<h1>Another Clan!</h1><p>You wander looking for man to claim for your clan \
		and you come across another clan, huts and fires. You cautious and approach,\
		but no man meet you but a woman!</p>\
		<p>You prepare your changra to fight for her but she speak</p>\
		<p>'Wait! This is my clan and you no beat me easily. Why not we trade, no fight!'</p>\
		<p>Strange woman, how a woman be head of clan? Still you can fight another time so you sit with her and talk. She know many things you do not and talks of how to make things and how to use your ancestors to make things stronger.</p>\
		<p>Maybe you return one day and learn more from her</p>\
	");
}


// Trade with the Smith
function TradeSmith()
{
	rival = smith;
	redraw();
	$(".stats").hide();
	$("#output").html("<h1>Trading</h1><p>You meet the woman and her clan again and talk of making and ancestors. She tell you she can teach you about</p>\
	<div id='teach_buttons' class='push--top'>");
	if (player.Mods.infuse === 0) {
		$("#output").append("<button id='teach_infuse' class='btn btn-woman push--right'>Infuse</button>");
	}
	if (player.Mods.craftnipplerings === 0) {
		$("#output").append("<button id='teach_rings' class='btn btn-woman push--right'>Nipple Rings</button>");
	} else {
		if (player.Mods.craftcollar === 0) {
			$("#output").append("<button id='teach_collar' class='btn btn-woman push--right'>Torc</button>");
		}
		if (player.Mods.craftbellybuttonstud === 0) {
			$("#output").append("<button id='teach_bellybuttonstud' class='btn btn-woman push--right'>Belly Button Stud</button>");
		}
		if (player.Mods.craftheadband === 0) {
			$("#output").append("<button id='teach_headband' class='btn btn-woman push--right'>Headband</button>");
		}
		if (player.Mods.craftclitcockring === 0) {
			$("#output").append("<button id='teach_clitcockring' class='btn btn-woman push--right'>Clit/Cock Ring</button>");
		}
		$("#output").append("<button id='buy_metal' class='btn btn-woman push--right'>Barter Metal</button>");
	}
	
	$("#output").append("<button id='talk_btn' class='btn btn-woman push--right'>Talk</button>");
	$("#output").append("<button id='leave_btn' class='btn btn-woman push--right'>Leave</button></div>");

	if (player.Mods.infuse === 0) $("#teach_infuse").click(function(){TeachInfuse();});
	if (player.Mods.craftnipplerings === 0) $("#teach_rings").click(function(){TeachNippleRings();});
	else {
		if (player.Mods.craftcollar === 0) $("#teach_collar").click(function(){TeachCollar();});
		if (player.Mods.craftheadband === 0) $("#teach_headband").click(function(){TeachHeadBand();});
		if (player.Mods.craftbellybuttonstud === 0) $("#teach_bellybuttonstud").click(function(){TeachBellyButtonStud();});
		if (player.Mods.craftclitcockring === 0) $("#teach_clitcockring").click(function(){TeachClitCockRing();});
		
		$("#buy_metal").click(function(){BuyMetal();});
	}
	
	$("#talk_btn").click(function(){TalkSmith();});
	$("#leave_btn").click(function(){Camp();});
	$("#output").append("<div id='trade_output'></div>");
}

function TeachInfuse()
{
	if (player.goods < 10) $("#trade_output").html("<p>You talk of this and she say you need to give her 2 hands of goods for her to teach you</p>");
	else if (player.experience < 5) $("#trade_output").html("<p>You not interested in training more now, maybe when you more of a man.</p>");
	else {
		player.goods -= 10;
		smith.goods += 10;
		player.experience -= 5;
		player.Mods.infuse = 1;
		Message("TradeSmith()", "<h1>Training</h1><p>She teach you how to cook things and chant over them to call the power of your ancestors into the thing and change it's power. You need to offer to your ancestors and give these things to the fire.</p><p>You leave her, knowing how to better build your clan.</p>");
	}
}

function TeachNippleRings()
{
	if (player.goods < 10) $("#trade_output").html("<p>You talk of this and she say you need to give her 2 hands of goods for her to teach you</p>");
	else if (player.experience < 5) $("#trade_output").html("<p>You not interested in training more now, maybe when you more of a man.</p>");
	else {
		player.goods -= 10;
		smith.goods += 10;
		player.experience -= 5;
		player.Mods.craftnipplerings = 1;
		Message("TradeSmith()", "<h1>Training</h1><p>She teach you about a thing called 'metal' a yellow or red thing you can easily make things from. It rare and only a few know how to find or make it. She show you how to make rings you put in a piercing into nipples. They make people desire to fuck more. You need metal to make these and she sell you metal for one hand of goods.</p><p>You can now craft these back at camp</p>");
	}
}

function TeachCollar()
{
	if (player.goods < 10) $("#trade_output").html("<p>You talk of this and she say you need to give her 2 hands of goods for her to teach you</p>");
	else if (player.experience < 5) $("#trade_output").html("<p>You not interested in training more now, maybe when you more of a man.</p>");
	else {
		player.goods -= 10;
		smith.goods += 10;
		player.experience -= 5;
		player.Mods.craftcollar = 1;
		Message("TradeSmith()", "<h1>Training</h1><p>She teach you about how to make a collar out the yellow metal and a pretty stone, it make you a leader. It will stop any of your clan running away, especially if they men.</p><p>You can now craft these back at camp</p>");
	}
}

function TeachHeadBand()
{
	if (player.goods < 10) $("#trade_output").html("<p>You talk of this and she say you need to give her 2 hands of goods for her to teach you</p>");
	else if (player.experience < 5) $("#trade_output").html("<p>You not interested in training more now, maybe when you more of a man.</p>");
	else {
		player.goods -= 10;
		smith.goods += 10;
		player.experience -= 5;
		player.Mods.craftheadband = 1;
		Message("TradeSmith()", "<h1>Training</h1><p>She teach you about how to make a band to wear on head out the yellow metal, it make you more handsome.</p><p>You can now craft these back at camp</p>");
	}
}

function TeachBellyButtonStud()
{
	if (player.goods < 10) $("#trade_output").html("<p>You talk of this and she say you need to give her 2 hands of goods for her to teach you</p>");
	else if (player.experience < 5) $("#trade_output").html("<p>You not interested in training more now, maybe when you more of a man.</p>");
	else {
		player.goods -= 10;
		smith.goods += 10;
		player.experience -= 5;
		player.Mods.craftbellybuttonstud = 1;
		Message("TradeSmith()", "<h1>Training</h1><p>She teach you about how to make a stud you pierce into your belly button, very little metal and pretty stone needed it help your women to bear many children.</p><p>You can now craft these back at camp</p><p>She tell you things here big and confused, about how we only bear man children and maybe we talk more another time.</p>");
	}
}

function TeachClitCockRing()
{
	if (player.goods < 10) $("#trade_output").html("<p>You talk of this and she say you need to give her 2 hands of goods for her to teach you</p>");
	else if (player.experience < 5) $("#trade_output").html("<p>You not interested in training more now, maybe when you more of a man.</p>");
	else {
		player.goods -= 10;
		smith.goods += 10;
		player.experience -= 5;
		player.Mods.craftclitcockring = 1;
		Message("TradeSmith()", "<h1>Training</h1><p>She teach you about how to make a ring you pierce into your cock or a womans pussy, a little metal needed.</p><p>You can now craft these back at camp</p>");
	}
}

function BuyMetal()
{
	if (player.goods < 5) $("#trade_output").html("<p>You talk of this and she say you need to give her 1 hands of goods to buy metal</p>");
	else {
		player.goods -= 5;
		smith.goods += 5;
		player.metal += 1;
		$("#trade_output").append("<h2>Barter Metal</h2><p>You barter for a bit of metal</p>");
	}
}

function TalkSmith()
{
	var str;
	if (player.Mods.craftbellybuttonstud === 1 && player.Mods.craftleftbracelet === 0) {
		if (smith.checkSwitch(0)) {
			// quest pending, so you have them?
			rival = undefined;
			var index = 0;
			for (index = 0; index < player.women.length; index++) {
				if (player.women[index].name == "Weshptah" && player.women[index].checkSwitch(0)) {
					// got him
					rival = player.women[index];
					break;
				}
			}
			if (rival !== undefined) {
				if (rival.pregnancy != 0 ||	rival.childrenboy != 0 ||	rival.childrengirl != 0) {
					var str = "<h1>Talking</h1><p>You have Weshptah and hand " + rival.himher() + " over to " + smith.name + ". She look at Weshptah and at you, and say,</p><p>&quot;You took Weshptah as your woman, you want her? Give me 2 hands of goods and keep her&quot;</p>";
					if (player.goods > 9) {
						str += "<p>You have the goods and Weshptah now yours! You pay " + smith.name + " and she says she find a stonger man!";
						player.goods -= 10;
					} else {
						str += "<p>You no have the goods so " + smith.name + " slap Weshptah as say they will no leave again. She puts a collar around Weshptah's neck and turns to you<p>";
						player.women.splice(index, 1);
						smith.women.push(rival);
					}
					str += "<p>&quot;You did as you said me now teach you the great secret.&quot; She show you how to make a bracelet that allow the wearer to bear a female child! It take a lot of the power of the person who makes it, and weakens them much. It also need a bit of metal and stone to craft.</p><p>A person can wear two bracelets and this means their children will always be female.</p><p>You can now craft these back at camp.</p>";
					Message("Camp()", str);
				} else {
					player.women.splice(index, 1);
					smith.women.push(rival);
					Message("Camp()", "<h1>Talking</h1><p>You have Weshptah and hand " + rival.himher() + " over to " + smith.name + ". She happy to see Weshptah but she slap them as say they will no leave again. She puts a collar around Weshptah's neck and turns to you<p><p>You did as you said me now teach you the great secret. She show you have to make a bracelet that allow the wearer to bear a female child! It take a lot of the power of the person who makes it, and weakens them much. It also need a bit of metal and stone to craft.</p><p>A person can wear two bracelets and this means their children will always be female</p><p>You can now craft these back at camp</p>");
				}
				player.Mods.craftleftbracelet = 1;
			} else Message("Camp()", "<h1>Talking</h1><p>You talk to " + smith.name + " but you no have her man yet, so she tell you to go</p>");
			return;
		}
		smith.advanceDesire();
		if (smith.desire < 90) Message("Camp()", "<h1>Talking</h1><p>You talk to " + smith.name + " about her clan and yours, she want to talk more about you and your hunting. She once say about woman child but say she talk more later.</p>");
		else {
			smith.desire = 0;
			smith.setSwitch(0, true);
			str = "<h1>Talking</h1><p>You talk to " + smith.name + " about her clan and she stop you, and say 'No more talking, we fuck!</p>";
			if (!player.hasCock()) str += "<p>She make you lay down and using tongue and fingers make you cry with pleasure. You then do the same to her</p>";
			else {
				str += "<p>She lie you back and mount your hard cock and make you scream with pleasure as you cum hard into her</p>";
				if (!smith.isPregnant()) smith.pregnancy = 2.5;
			}
			str += "<p>After she tell you that she had a man who she was making a strong man to father her children. He come to her as told her he no want to be her man and ran away to found his own clan! " + smith.name + " say if you return this man, name Weshptah back to her, she teach you a great secret, how to make you women bear girl children. It powerful secret of her ancestors but for this she teach you!</p><p>She tell you Weshptah like the sea and he a cunning hunter so be careful with him! You ask what is 'sea' and she tell you about the great water and where it is.</p>";
			setPlaceVisited("Beach");
			Message("Camp()", str);
		}
	} else {
		smith.advanceDesire();
		if (player.Mods.craftleftbracelet === 1) {
			if (smith.desire < 90) {
				if (smith.isPregnant()) Message("Camp()", "<h1>Talking</h1><p>You talk to " + smith.name + " about her clan and yours, about your ancestors and many other things.</p><p>She hold her belly as you talk, filling with your child</p>");
				else Message("Camp()", "<h1>Talking</h1><p>You talk to " + smith.name + " about her clan and yours, about your ancestors and many other things.</p>");
			} else {
				smith.desire = 0;
				str = "<h1>Talking</h1><p>You talk to " + smith.name + " about her clan and she stop you, and say 'No more talking, we fuck!</p>";
				if (!player.hasCock()) str += "<p>She make you lay down and using tongue and fingers make you cry with pleasure. You then do the same to her</p>";
				else {
					str += "<p>She lie you back and mount your hard cock and make you scream with pleasure as you cum hard into her</p>";
					if (!smith.isPregnant()) smith.pregnancy = 2.5;
				}
				Message("Camp()", str);
			}
		} else {
			Message("Camp()", "<h1>Talking</h1><p>You talk to " + smith.name + " about her clan and yours, about your ancestors and many other things.</p>");
		}
	}
}