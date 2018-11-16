// New round/game week
challengedYet=false;
showCamp = true;
challengeResult = "";
function advanceRound()
{
	challengedYet=false;
	showCamp=true;
	challengeResult="";
	player.pierceMessage=false;
	// Update player
	if(player===leader){
		player.rest();
	}
	player.round += 1;
	player.activity = "";
	player.doneTo = "";
	leader.activity="";
	leader.doneTo="";
	var enoughFood=true;

	// Update clan members
	leader.women.forEach(function(woman){woman.activity="";woman.doneTo="";});
	player.advancePregnancy();
	player.women.forEach(function(woman){
		woman.advancePregnancy();
		if(player===leader){
			woman.naughty=false;
			woman.setActivity();
			woman.advanceDesire();
			if(player.goods>=1){
				player.goods-=1;
			}else{
				woman.dysphoria+=10;
				enoughFood=false;
			}
		}
		if(woman.isMale()){woman.dysphoria+=5;}
	});
	if(player!==leader){
		player.dysphoria-=2;
		//leader.women.forEach(function(woman){woman.activity="";woman.doneTo="";});
		leader.women.forEach(function(woman){
			if(woman!==player){
				woman.setActivity();
				woman.advanceDesire();
			}
			if(woman.isMale()){woman.dysphoria+=0.5;}
		});
		leader.setActivity();
		if(player.socialActivity){
			console.log("trying social",player.socialActivity,player.socialTarget);
			player[player.socialActivity]([player.socialTarget])(player);
		}
		if(jewelryMods.filter(x=>player.items[x])){
			if(getRandomInt(1,10)==1){//DEBUG: set higher. Should be rareish event
				var mod = getRandomElem(jewelryMods.filter(x=>player.items[x]));
				player.dysphoria-=3;
				switch(mod){
					case "nipplerings":
						player.pierceMessage = "The rings on your nipples tug sometimes when you move. Makes you think of big, swolen breasts.";
						eatStatNut(player,"allure",3);
						eatStatNut(player,"maternalism",1);
						break;
					case "collar":
						player.pierceMessage = "You rub collar on neck. Think about being owned by chief.";
						eatStatNut(player,"submissiveness",4);
						break;
					case "headband":
						player.pierceMessage = "Pretty headband make you feel sexy.";
						eatStatNut(player,"allure",4);
						break;
					case "bellybuttonstud":
						player.pierceMessage = "Pretty gem in bellybutton make you think of having baby in belly.";
						eatStatNut(player,"maternalism",4);
						break;
					case "clitcockring":
						player.pierceMessage = "The ring between your legs rub sometimes in very good way. You think about maybe putting other things between legs.";
						eatStatNut(player,"orientation",4);
						break;
				}
			}
		}
	}

	// Update NPC's
	demon.advancePregnancy();
	smith.advancePregnancy();

	// Update any runaways
	runaways.forEach(function(run){
		run.advancePregnancy();
	});
	if(player===leader && !enoughFood){
		player.activity+="\nYou not have enough food for all tribe. Hungry womenfolk wonder if you real man after all.";
	}
	if((player!==leader)&&(leader.women.includes(thoth))){//advance Thoth plotline for submissives
		//ThothReact() //Trying out new storyline mode
	}
	player.socialActivity=false;
	player.socialTarget=false;
	
}
