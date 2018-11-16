function displayLeader(){
	$("#camp_feed").html("<div id='leader_options' class='push--top'></div><div id='leader_display'>");
	rival=leader;
	$("#leader_display").append(leader.activity);
	buttons = "";
	if(player.orientation>=50){
		buttons+="<button id='fuck_button' class='btn'> Fuck "+leader.name+"</button>";
	}
	if(player.dysphoria>0){
		buttons += " <button id='challenge_button' class='btn'>Challenge</button>";
	}
	if(player.masculinity()>leader.masculinity()*1.6){
		buttons += " <button id='dominate_button' class='btn'>Dominate</button>";
	}
	$("#leader_options").html(buttons);	
	$("#dominate_button").click(function(){
		rival=leader;
		makeLeader(leader, player,true);
		EndRound(Message(NextWindow,`<h1>Domination</h1><p>You come to ${rival.name} and announce that you leader now. ${rival.heshe} look like ${rival.heshe} want to argue, and you ready for challenge, but then ${rival.heshe} take good look at you and hang head.</p>\
			<p>"Yes," ${rival.heshe} say. "You be leader. I only want be your woman from now on."</p>\
			<p>With whole clan watching, you get on top of ${rival.name} and begin to fuck her in front of everyone. Soon, all know that you leader again. ${rival.HeShe} cry out in pleasure when you release seed into her. ${rival.isMale()?"Maybe soon you turn him all the way to woman and breed baby in her.":"Hopefully she get pregnant now and add new baby for clan."}</p>`));	
	});
	$("#fuck_button").click(function(){
		eatStatNut(player,"maternalism",2,false);
		eatStatNut(player,"allure",3,false);
		eatStatNut(player,"orientation",3,false);
		eatStatNut(leader,"orientation",-3,false);
		player.dysphoria-=7;
		var intro = `You go to ${leader.name} and ask to fuck. `;
		var activities = player.fuckCharacter(leader);
		console.log(activities);
		EndRound(Message(NextWindow,intro+activities[0]));/*
		if(player.allure+getRandomInt(-80,0)>0){
			player.maybeImpregnate(leader);
		  	Message(NextWindow,`You go to ${leader.name} and beg him use you as woman. He bring you to furs, and you spread legs eagerly for him, happy to be fucked like woman.`);
		}else{
			Message(NextWindow,`You go to ${leader.name} and beg him use you as woman. He laugh and tell you to use mouth instead. You get on knees like good woman and open mouth. You lick his cock, then drink down seed. You hope he fuck you next time.</p>`);
		}*/
	});
	$("#challenge_button").click(function(){
		var victory = function(){
			var oldleader = leader;/*
			if(player.maleName){
				player.name=player.maleName;
			}
			if(!player.women.includes(leader)){
				player.women.push(leader);
			}
			if(player.women.includes(player)){player.women.splice(player.women.indexOf(player),1);}
			leader.women=[];//bye bye random other women.
			leader=player;*/
			var nm = getUnusedFemaleName();
			$("#output").html("<h1>Victory</h1><p>With loud roar, you stand over beaten rival. Your Changra too strong for him, you too strong for him. He think he can make you his woman, but he wrong.</p><p>Now he on ground crying as he realize he is your woman now. To show him he is woman now, you give new name: <input id='woman_name' value='" + nm + "'>\
				<button id='name_woman' class='btn'>Give Name</button>\
	  		");
	  		$('#woman_name').click(function() {
				$("#woman_name").focus();
			});

			$("#name_woman").click(function() {
				var newName = $("#woman_name").val().length > 0 ? $("#woman_name").val() : getUnusedFemaleName();			
				makeLeader(leader,player,true,newName);
				player.experience += minValue(Math.floor(rival.femininity() / 3), 15);
				player.goods += rival.goods;
				rival.goods = 0;
				rival.round = player.round;		// day captured
				Camp();
			});
		};
		var defeat = function(){
			player.dysphoria-=15;//penalty for losing fight. Large jump towards surrender.
			$.each(AVATAR_TRAITS, function(index, trait) {
				player.natural[trait] = player[trait];
			});
			EndRound(Message(NextWindow,`<h1>Defeat</h1><p>${leader.name} yell and point as powerful changra flow into you.</p>"Why you fight, ${player.name}?" ${leader.heshe} say. "You still my woman. No fight, just be mine."</p><p>You nod head, unable to disagree. What you thinking, trying to fight big strong man like that? All you are is woman. You just want stay in den, grow babies in belly and be mother for big clan.</p>`));
		};
		rival=leader;
		EncounterNamedRival(rival);
		$(".stats").show();
		rival.Victory=victory;
		rival.Defeat = defeat;
		Battle(rival,false);
	});
	redraw();
};

function makeLeader(oldLeader,newLeader,takeWomen,renameOld){
	if(takeWomen===undefined){//by default new leader takes old leader's women.
		takeWomen=true;
	}
	if(renameOld===undefined){renameOld=false;}
	if(newLeader.maleName){
		if(newLeader.name!==newLeader.maleName){newLeader.femaleName=newLeader.name;}
		newLeader.name=newLeader.maleName;
	}
	if(oldLeader.femaleName){
		if(!oldLeader.maleName){oldLeader.maleName=oldLeader.name;}
		oldLeader.name=oldLeader.femaleName;
	}
	if(takeWomen){
		newLeader.women = Array.from(new Set([...newLeader.women, ...oldLeader.women]));
	}
	if(oldLeader!==player){oldLeader.women=[];}
	if(newLeader.women.includes(newLeader)){newLeader.women.splice(newLeader.women.indexOf(newLeader),1);}
	if(!newLeader.women.includes(oldLeader)){newLeader.women.push(oldLeader);}
	if(newLeader===player){
		camp="main";
	}
	if(renameOld){
		oldLeader.maleName=oldLeader.name;
		if(renameOld===true){
			oldLeader.name=getUnusedFemaleName();
		}else{
			oldLeader.name=renameOld;
		}
		oldLeader.femaleName=oldLeader.name;
	}
	leader=newLeader;
	leader.women.filter(x=>x!==player).forEach(x=>x.dysphoria=x.dysphoria/1.75-4);
}
