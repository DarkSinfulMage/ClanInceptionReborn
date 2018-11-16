var AVATAR_TRAITS = ["submissiveness", "domesticity", "maternalism", "allure", "orientation"];

function switchFemForMascTrait(trait) {
  switch(trait) {
    case "submissiveness": return "Dominance";
    case "domesticity": return "Adventurousness";
    case "maternalism": return "Paternity";
    case "allure": return "Lustfulness";
    case "orientation": return "Attraction to &#9792;";
  }
}

function Avatar(submissiveness, domesticity, maternalism, allure, orientation) {

	// Variables
	var that = this;

	// Identity
	this.name = "";			// special case for "Rival man" in battle and drawfigure.js
	this.round = 0;			// day of game for player, day of capture for a woman, day met for a NPC
	this.daysLeader =0; //Number of cumulative days they have spent as clan leader.

	// Futanari
	this.futa = 0;			// > 0 if a futa

	// Power
	this.changra = getRandomInt(75, 100);

	// Traits
	this.submissiveness = submissiveness;
	this.domesticity = domesticity;
	this.maternalism = maternalism;
	this.allure = allure;
	this.orientation = orientation;

	// Motherhood
	this.pregnancy = 0;
	this.childrenboy = 0;
	this.childrengirl = 0;
	
	this.childboysgrown=0;			//TODO: Aren't the two sets of values related, especially between two given characters?
	this.childgirlsgrown=0;
	
	this.pregnancyMessage = 0;
	this.impregnator=false;//Will be set to father of baby
	
	//fatherhood
	this.fatheredboy=0;
	this.fatheredgirl=0;
	
	this.fatheredboysgrown=0;
	this.fatheredgirlsgrown=0;

	
	// Desire
	this.desire = 0;

	this.description = { };
	this.activity = "";
	this.natural = { };
	this.minimums = { };
	this.maximums = { };
	
	//Permissions
	this.allowForage = false;
	
	// Trainings (via experience or some items)
	this.experience = 0;
	this.Mods = {
		"ironwill": 0,
		"breasts": 0,
		"changra": 0,
		"perception": 0,
		"amazon": 0,
		"cock": 0,
		"futa": 0,
		"balls": 0,
		// Bonuses to Push
		"pushsubmissiveness": 0,
		"pushdomesticity": 0,
		"pushmaternalism": 0,
		"pushallure": 0,
		"pushorientation": 0,
		// Resistances
		"resistsubmissiveness": 0,
		"resistdomesticity": 0,
		"resistmaternalism": 0,
		"resistallure": 0,
		"resistorientation": 0,
	   	// Bonuses to Drain	- FOR NEW DRAIN TALENTS
		"draindominance": 0,
		"drainadventureness": 0,
		"drainpaternalism": 0,
		"drainlust": 0,
		"drainorientation": 0,
		// Crafting
		"infuse": 0,
		"craftnipplerings": 0,
		"craftclitcockring": 0,
		"craftcollar": 0,
		"craftheadband": 0,
		"craftbellybuttonstud": 0,
		"craftleftbracelet": 0
	};
	this.getTrainingRanks = function(nc)
	{
		this.capTraits();	// ensure they are all initialised
		var val = this.Mods.ironwill + (this.Mods.perception / 5) + (this.Mods.changra / 5);
		if (nc === true) {
			// rank that do not affect combat
			val += (this.Mods.breasts / 10) + (this.Mods.amazon / 2) + (this.Mods.cock / 2) + (this.Mods.futa / 2);
			val += this.physique.breastrows + this.physique.horns + this.physique.tail + this.physique.wings;
		}
		val += (this.Mods.pushsubmissiveness / 2) + (this.Mods.pushdomesticity / 2) + (this.Mods.pushmaternalism / 2) + (this.Mods.pushallure / 2) + (this.Mods.pushorientation / 2);
		val += this.Mods.resistsubmissiveness + this.Mods.resistdomesticity + this.Mods.resistmaternalism + this.Mods.resistallure + this.Mods.resistorientation;
		return Math.ceil(val);
	};
	
	// Physique
	this.physique = {
		"hairc": getRandomInt(1, 20),
		"hairstyle": getRandomInt(0, 9),
		
		// special numbers 100 = red, 101 = blue
		"irisc": getRandomInt(1, 20),
		"skin": getRandomInt(1, 20),
		
		// Body parts
		"breastrows": 0,
		"hornstype": 0,
		"horns": 0,
		"tailtype": 0,
		"tail": 0,
		"wings": 0,
		"gentialscnt": 1,
		"twins" : 5
  };

	// Possessions
	
	// Your women
	this.women = [];

	// Goods
	this.goods = 0;
	this.metal = 0;

	// Items
	this.items = {
		"nipplerings": 0,
		"collar": 0,
		"headband": 0,
		"bellybuttonstud": 0,
		"clitcockring": 0,
		"leftbracelet": 0
	};
	this.isYourWoman = function(ps) {
		var index = 0;
		for (index = 0; index < women.length; index++) {
			if (women[index].name == ps) {
				// got them
				return player.women[index];
			}
		}
		return undefined;
	};
	
	// Switches, to use to events etc
	// value
	//	0 = Boss 1 fight assigned (true)
	// 1 = Osiris
	// 32 true/false flags, 0-31
	this.switches1 = 0;
	
	// Methods
	
	this.checkSwitch = function(nOffSet) {
		return ((this.switches1 & (1 << nOffSet)) !== 0) ? true : false;
	};

	this.setSwitch = function(nOffSet, nVal) {
		if (nVal === undefined || nVal === true) this.switches1 = this.switches1 | (1 << nOffSet);
		else this.switches1 = this.switches1 & (~(1 << nOffSet));
	};

		
	this.femininity = function() {
		var total = 0;
		var that = this;
		$.each(AVATAR_TRAITS, function(index, trait) {
		total += that[trait];
		});
		return total / AVATAR_TRAITS.length;
	};
	
	this.isFemale = function () { return this.femininity() > 49; };
	this.isMale = function () { return !(this.isFemale() || this.isFutanari()); };
	this.isFutanari = function () { return this.hasCock() && this.hasVagina(); };
	
	this.hasVagina = function () {
		var tst = this.calcTestes(false);
		return tst > 11 || this.futa > 0;
	};

	this.masculinity = function () { return 100 - this.femininity(); };

	this.hasCock = function () {
		var tst = this.calcTestes(false);
		return tst <= 11 || this.futa > 0 || this.Mods.cock > 0;
	};

	
	
	this.checkCockNonFuta = function()
	{
		// check cock
		var hasc = this.hasCock();
		if (this.Mods.cock === 0 && this.futa > 0) {
			player.futa = 0;
			// Femininise Stats
			$.each(AVATAR_TRAITS, function(index, trait){
				that[trait] = that[trait] + 50;
			});
			hasc = this.hasCock();
			// Femininise Stats
			$.each(AVATAR_TRAITS, function(index, trait){
				that[trait] = that[trait] - 50;
			});
			this.futa = 1;
		}
		return hasc;
	};
	
	this.unFuta = function()
	{
		if (this.futa > 0) {
			// No longer a futa!!!!!
			// Irreversible, as such, can grow a cock but not this.futa
			// Femininise Stats
			$.each(AVATAR_TRAITS, function(index, trait){
				that[trait] = that[trait] + 50;
				that.changeNatural(trait, 50);
			});
			this.futa = 0;
		}
	};
	//vim conversion regex: (for converting from function to properties)
	//.,$s/this.\(\a*\) *= *\(function[^;]*\)/Object.defineProperty(this,"\1",{get:\2})/c
	//remove function calls from templates (ALL templates. be careful)
	// %s/${\( *\a* *. *\a* *\| *\a* *\)() *}/${\1}/g
	//alternatively, here is one that finds and replaces every use of the function
	//(get all function names) grep -oP "Object.defineProperty\(this,\"\K[a-zA-Z]*" ./avatars.js |sort | uniq | tr '\n' '\\|'
	//fuckhole\|genitals\|heshe\|HeShe\|himher\|HimHer\|hisher\|HisHer\|hishers\|HisHers\|isare\|manwoman\|youheshe\|YouHeShe\|youhimher\|YouHimHer\|youName\|YouName\|yourhisher\|YourHisHer\|yourNames\|YourNames\|yourshishers\|YoursHisHers\|yoursNames\|YoursNames\|youthey\|YouThey
	// %s/\(fuckhole\|genitals\|heshe\|HeShe\|himher\|HimHer\|hisher\|HisHer\|hishers\|HisHers\|isare\|manwoman\|youheshe\|YouHeShe\|youhimher\|YouHimHer\|youName\|YouName\|yourhisher\|YourHisHer\|yourNames\|YourNames\|yourshishers\|YoursHisHers\|yoursNames\|YoursNames\|youthey\|YouThey\)()/\1/g
	
	
	
	Object.defineProperty(this,"arousedReaction",{get:function(){//will want to add more later probably. Just getting basics for now
		var options = ["body feel horny"];//best to have something generic always
		if(this.calcBreasts()>2){
			options.push("breasts tingle");
		}
		if(this.hasVagina()){
			options=options.concat(["pussy ache"]);
		}
		if(this.hasCock()){
			options=options.concat(["cock swell"]);
		}
		return getRandomElem(options);
	}});
	
	Object.defineProperty(this,"sex",{get:function(){
		if(this.isMale()){
			return "male";
		}else if(this.isFutanari()){
			return "futa";
		}else if(this.isFemale()){
			return "female";
		}else{
			return "neuter";//don't think this is even possible.
		}
	}});
	Object.defineProperty(this,"youName",{get:function(){return (player===this)?"you":this.name;}});
	Object.defineProperty(this,"YouName",{get:function(){return (player===this)?"You":capitalize(this.name);}});
	Object.defineProperty(this,"isare",{get:function(){return this===player?"are":"is";}});
	Object.defineProperty(this,"manwoman",{get:function(){return this.isMale()?"man":"woman";}});
	Object.defineProperty(this,"fuckhole",{get:function(){return this.hasVagina()?"pussy":"ass";}});
	Object.defineProperty(this,"genitals",{get:function(){return this.hasCock()?"cock":"pussy";}});
	Object.defineProperty(this,"yourNames",{get:function(){return this===player?"your":this.name+"'s";}});
	Object.defineProperty(this,"YourNames",{get:function(){return this===player?"Your":this.name+"'s";}});
	Object.defineProperty(this,"yoursNames",{get:function(){return this===player?"yours":this.name+"'s";}});
	Object.defineProperty(this,"YoursNames",{get:function(){return this===player?"Yours":this.name+"'s";}});
	
	/*Getting rid of unless we can find a way to make it a property. Normal functions don't work with handlebars*/
	/*Object.defineProperty(this,"YouThey",{get:function(other){return (this===player)||(other===player)?"You":"They";}});
	Object.defineProperty(this,"youthey",
`	{get:function(other){return (this===player)||(other===player)?"you":"they";}});*/

	Object.defineProperty(this,"hashave",{get:function(){ return this===player?"have":"has";}});

	
	Object.defineProperty(this,"heshe",{get:function() { return this.femininity() > 49 || this.futa > 0 ? "she" : "he"; ;}});
	Object.defineProperty(this,"HeShe",{get:function() { return this.femininity() > 49 || this.futa > 0 ? "She" : "He"; ;}});
	Object.defineProperty(this,"youheshe",{get:function(){return this===player?"you":this.heshe;}})
	Object.defineProperty(this,"YouHeShe",{get:function(){return this===player?"You":this.HeShe;}})
	Object.defineProperty(this,"himher",{get:function() { return this.femininity() > 49 || this.futa > 0 ? "her" : "him"; }});
	Object.defineProperty(this,"HimHer",{get:function() { return this.femininity() > 49 || this.futa > 0 ? "Her" : "Him"; }});
	Object.defineProperty(this,"youhimher",{get:function(){return this===player?"you":this.himher;}})
	Object.defineProperty(this,"YouHimHer",{get:function(){return this===player?"You":this.HimHer;}})
	Object.defineProperty(this,"hisher",{get:function() { return this.femininity() > 49 || this.futa > 0 ? "her" : "his"; }});
	Object.defineProperty(this,"HisHer",{get:function() { return this.femininity() > 49 || this.futa > 0 ? "Her" : "His"; }});
	Object.defineProperty(this,"YourHisHer",{get:function(){return this===player?"Your":this.HisHer;}})
	Object.defineProperty(this,"yourhisher",{get:function(){return this===player?"your":this.hisher;}})
	Object.defineProperty(this,"hishers",{get:function() { return this.femininity() > 49 || this.futa > 0 ? "hers" : "his"; }});
	Object.defineProperty(this,"HisHers",{get:function() { return this.femininity() > 49 || this.futa > 0 ? "Hers" : "His"; }});
	Object.defineProperty(this,"yourshishers",{get:function(){return this===player?"yours":this.hishers;}})
	Object.defineProperty(this,"YoursHisHers",{get:function(){return this===player?"Yours":this.HisHers;}})
	this.cunning = function() { return this.Mods.perception + ((this.femininity() + this.allure) / 2); };

	this.perception = function() { return this.Mods.perception + Math.ceil((this.femininity() + 100 - this.domesticity)/2); };
	
	this.changeNatural = function(trait, val)
	{
		this.maximums[trait] += val;
		this.minimums[trait] += val;
		this.natural[trait] += val;
	};

	this.rest = function() {
		this.changra = 500;
		$.each(AVATAR_TRAITS, function(index, trait) {
		that[trait] = that.natural[trait];
		});
		this.capTraits();
	};

	this.isPregnant = function() {
		return this.pregnancy > 0;
	};
	this.maybeImpregnate = function(man){
		if(this.isPregnant()){return;}
		var prob = this.maternalism +20 - getRandomInt(50,100);
		if (prob>0){this.pregnancy=2.5;this.impregnator=man;}
	}

	this.advancePregnancy = function ()
	{
		if(this===player){
			if(player.isFemale() && player.maternalism>50 && (player.childrenboy>0||player.childrengirl>0)){
				if(getRandomInt(0,200)< (player.femininity()-player.masculinity()+player.maternalism-50+5*player.childrengirl+5*player.childrenboy)){
					this.activity+="You clutch baby to chest, sighing as it suckle milk from swolen breast. Is good being mother.";
					player.dysphoria-=5;
				}
			}
		}
		if (!this.isPregnant()) return;

		this.pregnancy += 2.5;

		if (this.pregnancy >= 15 && this.pregnancy <= 25 && this.pregnancyMessage === 0) {

			this.pregnancyMessage += 1;
			//Player
			if (this == player) {

				this.activity += "You feel strange in belly. You put hand on it. Belly feels soft and warm with Changra... you are with child!";

				if (player.isFemale()) {
					if (player.isFutanari()) {
						this.activity += this.activity + " You smile and pat belly. You make clan greater breeding woman and getting bred!";
					} else {
						this.activity += this.activity + " You smile and pat belly. You make clan greater with breeding more children!";
					}
				}
				if (!player.isFemale()) {
					this.activity += this.activity + " You frown. You should seed woman! Not get seed like woman!";
				}
			}
			//NPC
			else
			{
				var activity = this.name + " come to you, " + this.himher + " hand on stomach. " + this.HeShe + " telling you that she is with child.";
				if((player===leader)||(this.impregnator===player)){
					activity+="You proudly rub " + this.himher + " belly.";
				}else{
					if(player.dysphoria+getRandomInt(-25,25)>50){
						activity+=` You angry that ${this.heshe} have baby with other man.`;
					}else{
						activity+=` You coo excitedly and rub ${this.hisher} belly, congratulating her on carrying ${this.impregnator.name}\'s child.`;
					}
				}
				this.activity+=activity;
				player.doneTo+=activity;
			}
		}

		if (this.pregnancy >= 48 && this.pregnancy <= 55 && this.pregnancyMessage == 1) {

			this.pregnancyMessage += 1;

			//Player
			if (this == player) {

				this.activity = "Your belly is big from child, but still growing!";

				if (player.isFemale()) {
					if (player.isFutanari()) {
							this.activity += this.activity + " Your cock grow hard thinking about having more children.";
					} else {
							this.activity += this.activity + " You can't wait to have more children.";
					}
				}
				if (!player.isFemale()) {
						this.activity += this.activity + " You swear to gods to be more careful and not get bred again.";
				}
			}
					//NPC
			else {
				var activity = "<p>You see " + this.name + " with big belly."
				if((player===leader)||(this.impregnator===player)){
					activity+=" You smile.";
				}else{
					if(player.dysphoria+getRandomInt(-25,25)>50){
						activity+=" Seeing other man baby grow in her stokes huge rage.";
						player.dysphoria+=3;						
					}else if((player.maternalism>75)&&(!player.isPregnant())){
						activity+=` You jealous of ${this.himher}.`;
					}else{
						activity+=` You happy for ${this.himher}.`;
					}
				}
				activity+="</p>";
				this.activity+=activity;
				player.doneTo+=activity;
			}
		}

		if (this.pregnancy >= 80 && this.pregnancyMessage == 2) {

			this.pregnancyMessage += 1;

			//Player
			if (this == player) {

				this.activity += "Your belly is huge from child, you can feel it moving inside you!";

				if (player.isFemale()) {
						if (player.isFutanari()) {
								this.activity += this.activity + " Soon your clan will grow! You feel getting hard, thinking about getting bred again.";
						} else {
								this.activity += this.activity + "  Soon your clan will grow! You feel getting wet, thinking about having another child right after this.";
						}
				}
				if (!player.isFemale()) {
						this.activity += this.activity + " You hate belly. It huge hinderance.";
				}
			}
					//NPC
			else {
				this.activity += this.HeShe + " is waddling, " + this.hisher + " belly huge. Soon clan will have more children.";
				if (player.hasCock()&&(leader===player)) { this.activity = this.activity + " Your cock hard, wanting to " + this.himher + " again."; }
			}
		}

		if (this.pregnancy >= getRandomInt(90, 105)) {
			//this.activity = this == player ? "You" : this.HeShe;
			var num = getRandomInt(1, 100) < this.physique.twins ? 2 : 1;
			var bBoy = (this.items.leftbracelet > 0) ? ((this.items.leftbracelet == 2) ? false : (Math.random() < 0.5)) : true;
			var csex = bBoy?"boy":"girl";
			var crel = bBoy?"son":"daughter";
			var cheshe = num>1?"They":(bBoy?"He":"She");
			var cplur = num>1?"s":"";
			var activity;
			var reactMsg;
			if(player==leader){
				reactMsg = "Your clan grow.";
			}else{
				if(this!==player){
					if(this.impregnator==player){
						reactMsg=`${cheshe} yours, you just wish you were father again for ${crel}.`;
						player.dysphoria+=10;
					}else{
						if(player.dysphoria+getRandomInt(-20,20)>45){
							reactMsg = `${cheshe} not fathered by you, though. ${this.name} supposed to be your woman, it make you mad to see ${this.himher} having other man\'s child.`;
							player.dysphoria+=3;
						}else{
							if(player.pregnancy>15){
								reactMsg = `You rub own growing belly and think about increasing clan.`;
							}else{
								reactMsg = `Your own belly flat and empty. You wonder if ${leader.name} will give you baby soon.`;
							}
						}
					}
				}else{
					if(player.dysphoria+getRandomInt(-20,20)>45){
						if(player.maternalism>70){//If player has high maternalism, having a baby makes them accept womanhood more
							reactMsg="You smile and lift baby to breast. You still not want be woman, but maybe it not so bad if it means you can be mother too.";
							player.dysphoria-=5;
						}else{
							reactMsg="This wrong. You supposed to be fathering babies, not giving birth to them.";
						}
					}else{
						reactMsg=`It still strange and painful to give birth, but you happy bearing ${crel}${cplur} for ${leader.name}.`
					}
				}
			}
			if (num > 1){
				activity= `<p>${this.YouName} give birth to twins last night, fine ${crel}s. ${reactMsg}</p>`;
			}else {
				activity=`<p>${this.YouName} give birth to fine ${crel} last night. ${reactMsg}</p>`;
			}
			this.pregnancy = 0;
			this.pregnancyMessage = 0;
			this["children"+csex]+=num;
			if(this.impregnator){
				this.impregnator["fathered"+csex]+=num;
			}			
			this.impregnator=false;
			console.log(activity);
			this.activity+=activity;
			player.doneTo+=activity;
		}
	};

  this.advanceDesire = function() {
    function calcDesire(subject, object) {
      var objectGender = object.masculinity() - 50;
      var desire = 0;
      if (subject.orientation < 50) {
       desire = (objectGender < 0) ? (objectGender * -2) : (objectGender * 2) * ((50 - subject.orientation) / 50);
      } else {
       desire = objectGender > 0 ? objectGender * 2 : (objectGender * -2) * ((subject.orientation - 50) / 50);
      }
      return (desire * ((110 - subject.submissiveness) / 100)) / 2;
    }

    var herDesire = calcDesire(this, player);
		if (this.items.nipplerings > 0 || this.items.clitcockring > 0) herDesire += 1;
    var playerDesire = calcDesire(player, this);

    this.desire += herDesire + playerDesire;
  };

  this.fornicate = function() {

	this.desire = 0;
    if(this.dysphoria>0){this.dysphoria-=getRandomInt(1,3+Math.round(this.desire/10));}

      //NPC only Vagina
      if (!this.hasCock() && this.hasVagina()) {
			if (leader.hasCock()) {
				 this.PCfucksNPCvaginal(this);
			} else {
				 this.activity += `${this.HeShe} come to ${leader.youName} and beg for release. ${leader.YouName} make ${this.himher} scream with tongue and finger. Then she lick ${this.youName} like shecat till ${this.youName} scream like beast.`;
			}
      }

      //NPC only Cock
      if (this.hasCock() && !this.hasVagina()) {

			if (leader.hasVagina() && !leader.hasCock()) {
				this.NPCfucksPCvaginal(this);
			}

			if (leader.hasCock()) {
				if (!leader.hasVagina()) {

					this.PCwithDickNPCwithDick(this);

				} else {

				  var probPCfuck2 = getRandomInt(1, 100);

				  if (!leader.isPregnant()) probPCfuck2 += 10;

				  if (probPCfuck2 > 60) {
						this.NPCfucksPCvaginal(this);

				  } else {
						this.PCwithDickNPCwithDick(this);
				  }
				}
			}
      }

		//NPC is futa
		if (this.hasCock() && this.hasVagina()) {

			var probPCfuck3 = getRandomInt(1, 100);

			//player is male
			if (leader.hasCock() && !leader.hasVagina()) {
				 if (probPCfuck3 < 80) { this.PCfucksNPCvaginal(this); }
				 else { this.PCwithDickNPCwithDick(this); }
			}
			//player is female
			if (!leader.hasCock() && leader.hasVagina()) {
				 this.NPCfucksPCvaginal(this);
			}

			//player is futa
			if (leader.hasCock() && leader.hasVagina()) {

				if (!leader.isPregnant()) probPCfuck3 += 10;

				if (probPCfuck3 < 70) {
				  this.PCfucksNPCvaginal(this);
				} else {
				  this.NPCfucksPCvaginal(this);
				}
			}
		}
    };

	this.PCwithDickNPCwithDick = function (avatar)
	{
		var probPCgetFucked = getRandomInt(1, 100);

		if (leader.hasVagina()) { probPCgetFucked -= 10; }

		if (probPCgetFucked > 70) {
			avatar.activity += ` ${avatar.HeShe} come to ${leader.youName} at night. ${leader.YouName} look at cock and turn around, moving ass like woman. ${avatar.HeShe} takes invitation and fucks ${leader.youName} in manhole. ${leader.YouName} moan like woman and release seed on ground.`;
			//avatar.dysphoria+=4;
		} else {
			avatar.activity += `${avatar.HeShe} come to ${leader.youName} at night and in need. ${leader.youName} push ${avatar.himher} on stomach and fuck manhole like pussy, releasing ${leader.yourhisher} seed in it.`;
		}
	};


	this.NPCfucksPCvaginal = function (avatar) {

		var probPCgetFucked = getRandomInt(1, 100);

		if (!player.isPregnant()) { probPCgetFucked += 20; }

		var prob2;
		if (player.submissiveness-avatar.submissiveness>20){
			avatar.activity += `${avatar.HeShe} throw ${leader.youName} to dirt and mount ${leader.yourhisher} pussy. ${avatar.HeShe} fuck ${leader.youName} hard, making ${leader.youName} cry like shebeast in heat until ${leader.youName} cum. Soon his seed erupt inside ${leader.youhimher}`;
			//avatar.dysphoria+=5;
			eatStatNut(leader,"submissiveness",2);
			eatStatNut(rival,"submissiveness",-10);
		}
		else if (probPCgetFucked < 70) {

			avatar.activity += `${leader.YouName} feel desire. ${leader.YouHeShe} push ${player===leader?avatar.himher:avatar.name} down and ride cock. ${avatar.YouHeShe} scream like shebeast as ${leader.youheshe}  come.`;

			if (player.hasCock()) { avatar.activity += avatar.activity + ` ${leader.YouName} coat ${avatar.hisher} stomach with ${leader.yourhisher} seed.`; }


			if (!player.isPregnant()) {

				 prob2 = (player.maternalism + 20) - getRandomInt(50, 100);

				 if (prob2 > 0) {
					  player.pregnancy = 2.5;
					  player.impregnator=leader;
					  avatar.activity += `${leader.youName} feel desire. ${leader.YouHeShe} push ${avatar.himher} down and ride cock. ${leader.YouHeShe} scream like shebeast as ${leader.youheshe} feel${avatar.hisher} seed flowing in you.`;
				 }
			}

	  } else {
			avatar.activity += `${leader.YouName} overwhelmed from lust. ${leader.YouHeShe} spread legs for ${avatar.himher} and get fucked.`;
			eatStatNut(leader,"submissiveness",3);
			eatStatNut(rival,"submissiveness",-5);

			if (!player.isPregnant()) {

				 prob2 = (player.maternalism + 50) - getRandomInt(50, 100);

				 if (prob2 > 0) {
					  player.pregnancy = 2.5;
					  player.impregnator=leader;
					  avatar.activity += `${leader.YouName} overwhelmed from lust. ${leader.YouHeShe} spread legs for ${avatar.himher} to get fucked. ${avatar.HeShe} push deep inside. ${leader.YouHeShe} moan like shebeast, as ${avatar.hisher} seed erupts from cock inside ${leader.youhimher} .`;
				 }
			}
	  }

	};

	this.PCfucksNPCvaginal = function (avatar) {
		avatar.activity += avatar.HeShe + ` come to ${leader.youName} and spread legs. ${leader.YouHeShe} fuck like beast.`;

		if (!this.isPregnant()) {
			var prob = this.maternalism - getRandomInt(50, 100);
			if (prob > 0) {
				 this.pregnancy = 2.5;
				 this.impregnator=leader;
				 avatar.activity += `${avatar.HeShe} come to ${leader.youName} and spread legs like shebeast in need. ${leader.YouHeShe} fuck like animal and fill ${avatar.himher} with seed.`;
			}
		}
	};


  this.confused = function(avatar) {
    avatar.activity += "<p>She spend week wandering camp, muttering to self about how she man. Strong man. But she walk more and more like woman. She cry easier and easier like woman. Soon she forget how be man and only be woman for you.</p>";
    avatar.dysphoria -= getRandomInt(1, 10);
  };

  this.tend = function(avatar) {
    avatar.activity += `<p>${avatar.HeShe} dutifully tend camp for ${leader.youName}.</p>`;
    player.goods+=1;
    if(avatar.dysphoria>0){avatar.dysphoria-=getRandomInt(0,2);}
  };

  this.fuck = function(avatar) {
  	var activities = avatar.fuckCharacter(leader);
  	var prelude = `${avatar.YouName} come to ${leader.youName} at night full of desire. `;
  	this.activity = prelude+activities[0];
  	leader.doneTo =prelude+activities[1];
    //avatar.activity += `<p>${avatar.HeShe} come to ${leader.youName} every night and spread legs. ${leader.YouHeShe} fuck like animal.</p>`;
    //avatar.fornicate();
  };
  this.detectTrap = function(avatar,difficulty){
  	var scoreT = this.perception()+this.domesticity-50+player.cunning();
  	var scoreA = difficulty*(avatar.domesticity-30+ avatar.cunning()+avatar.perception()+getRandomInt(-70,70));
  	console.log(scoreT,scoreA);
  	return scoreT>scoreA;
  };
  this.offerTrap = function(avatar){
  	avatar.activity+=`</p>${avatar.HeShe} found some nuts while foraging. ${avatar.HeShe} has offered it to ${leader.youName} as a meal.`;
  	if(leader.detectTrap(avatar,2)){
  		avatar.activity+=leader.YouHeShe+" have bad feeling, though, so don't eat.";
  		avatar.naughty=true;
  	}else {
  		avatar.activity+=`${leader.YouHeShe} feel weak after eating.`;
  		if(leader.detectTrap(avatar,0.8)){
  			avatar.activity+=`  ${leader.YouHeShe} think it maybe from bad food ${avatar.name} give ${leader.youhimher}.`;
  			avatar.naughty=true;
  		}
	  	var stat = getRandomElem(["submissiveness","domesticity","allure","orientation","maternalism"]);
	  	var amount = getRandomInt(1,6);
	  	leader.changeNatural(stat,amount);
	  	leader[stat]+=amount;
  	}
  	avatar.activity+="</p>"
  };
  this.bolsterSelf = function(avatar){
  	avatar.activity+=`<p>${avatar.HeShe} forage for food outside camp. Find nut to eat.`;
  	if(leader.detectTrap(avatar,0.8)){
  		avatar.activity+=`  ${leader.YouName} notice that ${avatar.youName} more like man after eating.`;
  		avatar.naughty=true;
  	}
  	var stat = getRandomElem(["submissiveness","domesticity","allure","orientation","maternalism"]);
  	var amount = getRandomInt(-20,-5);
  	avatar.changeNatural(stat,amount);
  	avatar[stat]+=amount;
  	avatar.activity+="</p>";
  };
  this.forageFood = function(avatar){
  	if(getRandomInt(-1,Math.floor(avatar.domesticity/15))>0){	
	  	avatar.activity += `<p>${avatar.HeShe} look around wild for root and nut and berry. Bring back to camp.</p>`;
	  	leader.goods+=getRandomInt(2,1+Math.floor(avatar.domesticity/15));
  	}else{
  		avatar.activity += `<p>${avatar.HeShe} search for food, but return empty.</p>`;
  	}  	
  };
  this.womanForage = function(avatar){
  	var activity = avatar.forageFood;
  	if(avatar.dysphoria<=0){
  		return avatar.forageFood(avatar);
  	}
  	var result = avatar.dysphoria+Math.floor(avatar.masculinity()/3)+getRandomInt(1,100);
  	if(result<70){
  		avatar.forageFood(avatar);
  	}else{
  		var self=0;
  		var other=1;
  		if(avatar.dysphoria>10){self-=1;}
  		if(avatar.masculinity()>avatar.femininity()){other+=1;}else{self-=1;}
  		if(getRandomInt(self,other)>0){
	  		avatar.offerTrap(avatar);
	  	}else{
	  		avatar.bolsterSelf(avatar);
	  	}
  	}
  };
  this.leaderHunt = function(avatar){
  	var success = Math.max(50,leader.submissiveness+leader.orientation+leader.allure-100);//always default 50% chance of winning
  	if(getRandomInt(1,100)<success){
	  	avatar.activity = `${avatar.HeShe} go on hunt. Find rival man and fight hard. Drive off and take his changra.`;
	  	eatStatNut(avatar,"submissiveness",getRandomInt(-15,2));
	  	eatStatNut(avatar,"allure",getRandomInt(-15,2));
	  	eatStatNut(avatar,"domesticity",getRandomInt(-15,2));
	  	eatStatNut(avatar,"orientation",getRandomInt(-15,2));
	  	eatStatNut(avatar,"maternalism",getRandomInt(-15,2));
	}else{
	  	avatar.activity = `${avatar.HeShe} ambushed on hunt, escape rival before he changed too much`;
	  	eatStatNut(avatar,"submissiveness",getRandomInt(-2,15));
	  	eatStatNut(avatar,"allure",getRandomInt(-2,15));
	  	eatStatNut(avatar,"domesticity",getRandomInt(-2,15));
	  	eatStatNut(avatar,"orientation",getRandomInt(-2,15));
	  	eatStatNut(avatar,"maternalism",getRandomInt(-2,15));
	}
  };
  this.leaderForage = function(avatar){
  	var success = avatar.perception();
  	if(getRandomInt(1,100)<success){
	  	avatar.activity += `<br/>${avatar.name} find nut in forest, give to you. Because you ${avatar.hisher} woman, you have no choice but eat. Power of ancestor in nut make you feel even more like woman.`;
	  	player.activity += avatar.activity;
	  	player.dysphoria-=2;
	  	eatStatNut(player,getRandomElem(["submissiveness","domesticity","allure","orientation","maternalism"]),getRandomInt(4,12));
	 }else{
	 	avatar.activity = `${avatar.HeShe} search for special food, but find nothing.`;
	 }
  };
  this.leaderPacify = function(avatar){
  	target = [...avatar.women.filter(x=>x!==player)].sort((a,b)=>b.masculinity()-a.masculinity())[0];
  	var targetNum = 21;
  	if(!target){
  		return;
  	}
  	if(leader.masculinity()-5>target.masculinity()){
  		targetNum=27;
  	}
  	challengedYet = true;
  	if(getRandomInt(1,30)<targetNum){
	  	challengeResult = `<br/>${avatar.name} think ${target.name} getting too disobedient. Challenge ${target.himher} to fight and show everyone that ${avatar.name} is real clan leader.`;
	  	eatStatNut(target,"submissiveness",getRandomInt(5,70));
	  	eatStatNut(target,"alure",getRandomInt(5,70));
	  	eatStatNut(target,"domesticity",getRandomInt(5,70));
	  	eatStatNut(target,"orientation",getRandomInt(5,70));
	  	eatStatNut(target,"maternalism",getRandomInt(5,75));
	  	target.dysphoria-=getRandomInt(30,70);
	  	leader.women.filter(x=>x!==player).forEach(x=>x.dysphoria=x.dysphoria/1.5-5);
	 }else{
		challengeResult = `<br/>${avatar.name} think ${target.name} too unruly and challenge ${target.himher} to fight. ${target.name} too strong, though, and make ${avatar.name} into woman.`;
	 	avatar.activity = `<br/>${avatar.HeShe} lose challenge and become ${target.name}\'s woman.`;	 	
	  	eatStatNut(leader,"submissiveness",getRandomInt(40,90));
	  	eatStatNut(leader,"alure",getRandomInt(44,90));
	  	eatStatNut(leader,"domesticity",getRandomInt(44,90));
	  	eatStatNut(leader,"orientation",getRandomInt(45,90));
	  	eatStatNut(leader,"maternalism",getRandomInt(45,90));
	  	makeLeader(leader,target,true);
	 }
  };
  this.fuckCharacter = function(target,forced){/*this is getting big enough that it should maybe go to its own file.*/
  	return initiateSex(this,target,forced)
  }
  this.fuckPlayer = function(avatar){
  	var activities = avatar.fuckCharacter(player,false);
  	var activity = activities[0];
  	var playerActivity = activities[1];
  	var intro = getRandomElem([
  		`${avatar.name} come to you wanting to fuck. `,
  		`${avatar.name} come say ${avatar.heshe} want fuck. `,
  		`${avatar.name} get horny and summon you to ${avatar.hisher} tent. `,
  	]);
  	player.dysphoria-=6;
  	player.doneTo+="<p>"+intro+playerActivity+"</p>";
  	avatar.activity+="<p>"+intro+activity+"</p>";
  	return
  	avatar.desire=0;
  	var activity;
  	var type = "other";
  	var playerFucked = true;
  	var leaderFucked = false;//if female leaderg fucked by male player.
  	var mL = leader.isMale();
  	var mP = player.isMale();
  	var diff = (player.submissiveness-leader.submissiveness);
  	if((diff>30)&&(player.submissiveness>60)){
  		type = "sub";
  	}else if((diff<-30)&&(player.submissiveness<40)){
  		type="dom";
  	}
  	if(player.dysphoria>150){/*
		switch(type){
			case "dom":
				if((diff>60)){
					activity = `<p>${avatar.name} come wanting to fuck you, but back down when you refuse.</p>`;
					player.dysphoria+=5;
					playerFucked=false;
				}else{
					if(mP){
						activity = `<p>${avatar.name} come wanting to fuck. You tell ${avatar.himher} to get on ground then. ${avatar.name} argue, saying ${avatar.heshe} clan leader, but ${avatar.heshe} timid and soon back down. Soon you fucking ${avatar.himher} from behind until ${avatar.heshe} scream in climax</p>`;
						playerFucked=false;
						if(!mL){
							leaderFucked=true;
						}
						player.dysphoria+=10;
						eatStatNut(leader,"orientation",5);
						eatStatNut(leader,"submissiveness",3);
					}else if(!mP && !mL){//ff						
						activity = `<p>${avatar.name} ask to fuck. Very soon ${leader.himher} head buried between your legs. It feel good when ${avatar.name}\'s tongue lick you.</p>`;
					}else{ //fm
						activity = `<p>${avatar.name} come wanting fuck. You argue, saying you not woman, but he point and say your body is woman body. Eventually you agree, but only if you on top. You ride up and down on ${avatar.name}\'s cock, surprised that it feel so good. Being on top make you feel big and powerful, it only when his seed dribble down leg that you realize you still fucked as woman.</p>`;
						eatStatNut(player,"submissiveness",-2);
					}
				}
				break;
			case "sub":
				if(mL){
					activity = `<p>${avatar.name} get horny and demand you fuck. You want protest that you not really woman, but ${avatar.heshe} clan leader. You just weak and timid 
				}
		}
  		if(dom>35){
  			activity = `${avatar.name}`
  		} */
  		avatar.activity += `<br/>${avatar.name} tell you he want fuck. You cry and say you not woman, but he point and say your body is woman body. Because he is powerful clan leader, you do what he say and let him fuck you like woman. As he does, you feel shame because your body acts like woman body, feel like woman body, respond to clan leader touch, making you wonder if you will ever be man again.`;
  	}else if(player.dysphoria>35){
	  	avatar.activity += `<br/>${avatar.name} come tell you to spread legs. As you fuck, you think maybe not so bad to be woman.`;
  	}else{
  		avatar.activity += `<br/>When ${avatar.name} come for fuck, you are very happy. It feel very good to be fucked like woman by clan leader.`;
  	}
  	if(playerFucked){
	  	eatStatNut(player,getRandomElem(["allure","maternalism","orientation"]),getRandomInt(3,7));
	  	avatar.activity+=activity;
	  	player.activity+=activity;
	  	player.maybeImpregnate(rival);
	  	player.dysphoria-=5;
	}
  };
  this.compareMods = function(defender){
  	return (this.pushsubmissiveness+this.pushdomesticity+this.pushorientation+this.pushallure+this.pushmaternalism-defender.resistsubmissiveness-defender.resistdomesticity-defender.resistorientation-defender.resistallure-defender.resistmaternalism);
  };
  this.compareMod = function(defender,stat){
  	var ret = Math.pow(1.25,this.Mods["push"+stat]-defender.Mods['resist'+stat]);
  	console.log(this.name,defender.name,stat,this.Mods["push"+stat],defender.Mods['resist'+stat],ret);
  	return ret;
  };
  this.compareStat = function(defender,stat){
  	var ret= (getRandomInt(0,this.compareMod(defender,stat)*this[stat]) - getRandomInt(defender.compareMod(this,stat)*defender[stat],0));
  	console.log(stat,ret);
  	return ret;
  };
  this.challengeLeader = function(avatar){
  	challengedYet=true;
  	console.log("Challengeing leader");
  	if(leader===player){
  		avatar.challengePlayer(avatar);
  		return;
  	}
  	var rawScore = AVATAR_TRAITS.map((s)=>leader.compareStat(avatar,s)).reduce( (x,s)=>x+s,0);
  	var lScore = rawScore-getRandomInt(-15,40);//randomize, but bias towards status quo
  	console.log(rawScore,lScore);
  	if(lScore>0){
  		$.each(AVATAR_TRAITS,(index,val)=>{avatar[val]-=getRandomInt(20,55);leader[val]=avatar.desires[val]+getRandomInt(-5,25);});
  		avatar.activity+=`<br/>${avatar.name} challenge ${leader.name}. ${avatar.HeShe} win challenge and become new leader.`;
  		leader.activity+=`<br/>${leader.name} lose challenge. He ${avatar.name} woman now.`;
  		//player.activity+=avatar.activity;
  		challengeResult=`<br/>${avatar.name} challenge ${leader.name} and defeat ${leader.himher} in front of whole clan. When ${avatar.heshe} done, ${avatar.heshe} use ${leader.name} like woman while everyone watch. Now ${avatar.name} Clan Father.`;
  		makeLeader(leader,avatar,true);
  	}else{
  		$.each(AVATAR_TRAITS,(index,val)=>{leader[val]-=getRandomInt(5,20);avatar[val]=leader.desires[val]+getRandomInt(-5,25);});
  		avatar.dysphoria/=2;
  		avatar.dysphoria-=25;
  		avatar.activity+=`<br/>${avatar.HeShe} try challenge ${leader.name}, but lose fight.`;
  		challengeResult = `<br/>${avatar.name} think ${avatar.heshe} strong enough to beat ${leader.name} and become new clan leader, but ${avatar.heshe} wrong. After fight is done, ${leader.name} throw ${avatar.name} to dirt and show everyone who is true woman.`;
  	}
  };
  this.seduceWoman = function(targets){
  	return function(avatar){
  		var target = getRandomElem(targets);
  		avatar.desire=0;
  		target.desire=0;
  		target.dysphoria -= getRandomInt(0,Math.round(100-target.orientation)/4);
  		var activity = `<br/>${avatar.YouName} decide to show ${target.youName} how good it feel to have woman body. Make ${target.youhimher} scream many time, until ${target.youheshe} think maybe it good thing to be woman.`;
  		avatar.activity += activity;
  		target.doneTo +=activity;
  	};
  };
  this.teachWoman = function(targets){
  	return function(avatar){
  		var target = getRandomElem(targets);
  		target.dysphoria -= getRandomInt(1,4);
  		eatStatNut(target,"domesticity",getRandomInt(1,5));
  		var activity = `<br/>${avatar.name} come to ${target.youName} and teach ${target.youhimher} how to be better at women work.`;
  		avatar.activity += activity;
  		target.dontTo += activity;
  	};
  };
  this.disciplineWoman = function(targets){
  	return function(avatar){
  		var target = getRandomElem(targets);
  		target.dysphoria -= getRandomInt(4,30);
  		eatStatNut(target,"submissiveness",getRandomInt(1,5));
  		var activity = `<br/>${avatar.name} notices ${target.youName} acting out. ${avatar.HeShe} spank ${target.youName} until ${target.youheshe} agree to behave like good woman.`;
  		avatar.activity+=activity;
		target.doneTo +=activity;
  	};
  };
  this.teachFuck = function(targets){
  	return function(avatar){
  		var target =getRandomElem(targets);
  		target.dysphoria -=getRandomInt(1,6);
  		eatStatNut(target,"orientation",getRandomInt(1,3));
  		var protest;
  		if(target.dysphoria>60){
  			protest= `${target.YouHeShe} beg and plead, but ${avatar.name} no listen. S`;
  		}else if(target.dysphoria>20){
  			protest = `${target.YouHeShe} protest, but s`;
  		}else{
  			protest="S";
  		}
  		var activity = `<br/>${avatar.name} come to ${target.youName} at night. "${target.name}! You woman now. Time learn how womanfolk fuck." ${protest}he bring ${target.youheshe} to ${leader.name} and teach ${target.youhimher} to pleasure a man.`;
  		avatar.activity+=activity;
  		target.doneTo += activity;
  	};
  };
  this.flirtWoman = function(targets){
  	return function(avatar){
  		var target=  getRandomElem(targets);
  		if(target){
  			var flirtAction = avatar.allure<35?"flex muscles":"bat eyelashes";
  			var flirtResult = "";
  			if(avatar!==leader){
  				var score = getRandomInt(0,6)+4*(avatar.submissiveness<50)+4*(avatar.allure<50)+4*(avatar.maternalism<50);
  				if((score>=10)&&(target.isFemale())){
  					flirtResult = `Loving womanfolk is nice, ${avatar.youheshe} think. Would be good to be clan leader and have many women.`;
  					avatar.dysphoria+=10;
  				}else{
  					flirtResult = `${avatar.YouHeShe} all warm and happy from flirt. It nice to be woman.`;
  					avatar.dysphoria-=1;
  				}
  			}else{
  			}
  			var activity = `<br/>${avatar.YouName} smile at ${target.youName} and ${flirtAction} at ${avatar.youhimher}. ${flirtResult}`
  			eatStatNut(avatar,"orientation",target.isMale()?3:-3);
  			eatStatNut(target,"orientation",avatar.isMale()?1:-1);
  			avatar.activity+=activity;
  			target.doneTo+=activity;
  		}
  	};
  };
  this.complainToOther = function(targets){
  	return function(avatar){
	  	var target = getRandomElem(targets);
	  	avatar.dysphoria += getRandomInt(1,3);
	  	if((target===thoth)&&(avatar===player)){
	  		if(thoth.reactionProgress<4){
	  			response = `"It be ok, ${player.maleName}," ${thoth.name} say, "Soon you get strong and become clanfather again. Then everything will be good again.`;
	  			avatar.dysphoria+=4;
	  		}else if(thoth.reactionProgress<5){
	  			response = `"Why you complain, ${player.maleName}?" ${thoth.name} ask, "If you not want be bred like woman, then maybe you should become leader again?`;
	  		}else{
	  			response = `"Stop complaining!" ${thoth.name} say. "You had chance to be leader, but now you exactly what you supposed to be, ${leader.yourNames} woman. So shut mouth, spread legs, and get baby for clan like the good breeder you are."`;
	  			avatar.dysphoria-=6;
	  		}
	  		avatar.activity=response;
	  	}else if(target){
	  		var rScore = target.dysphoria+getRandomInt(-25,50);
	  		var response;
	  		if(rScore<0){
	  			response = `${target.YouHeShe} scold ${avatar.youhimher}, telling ${avatar.youhimher} to be better woman for ${leader.name}. ${target.YouHeShe} then go tell ${leader.youName} what ${avatar.youName} said.`;
	  			target.dysphoria-=2;
	  			avatar.naughty;
	  			avatar.dysphoria-=getRandomInt(1,6);
	  		}else if(rScore<20){
	  			response = `${target.YouName} talk about how good it feel to be woman.`;
	  			target.dysphoria-=2;
	  			avatar.dysphoria-=getRandomInt(1,4);
	  		}else if(rScore<35){
	  			response = `${target.YouHeShe} no listen`;
	  		}else if(rScore<45){
	  			response = `${target.YouHeShe} not agree, but think about words.`;
	  			target.dysphoria+=getRandomInt(0,2);
	  		}else if(rScore<75){
	  			response = `${target.YouHeShe} agree.`;
	  			target.dysphoria+=getRandomInt(1,5);
	  			avatar.dysphoria+=1;
	  		}else{
	  			response = `${target.YouHeShe} agree loudly, saying that ${target.youheshe} not happy being treated like woman.`;
	  			target.dysphoria+=getRandomInt(2,16);
	  			avatar.dysphoria+=getRandomInt(3,7);
	  		}
	  		var activity = `<br/>${avatar.YouName} go to ${target.youName} and complain about becoming womanfolk of clan. ${response}`;
	  		avatar.activity +=activity;
	  		target.doneTo+=activity;
	  	}else{
	  		avatar.activity+=`<br/>${avatar.YouName} complain to anyone who listen, saying ${avatar.youheshe} unhappy being woman.`;
	  		avatar.dysphoria+=getRandomInt(0,3);
	  	}
	  };
  };
  this.rabbleRouse = function(avatar){
  	var target = getRandomElem(leader.women.filter(x=>x!=avatar));
  	if(target){
  		avatar.naughty=true;
	  	var activity = `<br/>${avatar.name} not happy being clan woman. ${avatar.HeShe} come to ${target.youName} and convince ${target.youhimher} that ${leader.youName} not good leader.`;
	  	target.dysphoria += getRandomInt(5,20);
	  	avatar.dysphoria += getRandomInt(2,9);
	  	avatar.activity +=activity;
	  	target.doneTo+=activity;
	  }
  };
  this.challengePlayer = function(avatar){
  	rival=avatar;
  	console.log("challenging player");
  	console.log(rival);
  	console.log("leader is player",leader===player, avatar.masculinity(),player.masculinity());
  	//rival must be more masculine than player.
  	//must have cock
  	//must have low enough submissiveness
	if(leader===player && (avatar.masculinity()>50)&&rival.hasCock()&&rival.submissiveness<50){
		console.log("Doing challenge");
  		showCamp=false;
		//npc tries to switch roles.
		//$("#rcwomen").show();
		function pretendSubmit(){
			makeLeader(player,rival,true,getUnusedFemaleName());
			player.maybeImpregnate(rival);
			player.dysphoria=3*player.masculinity()+30*player.Mods.ironwill;
			player.orientation=Math.max(50,player.orientation);
			player.submissiveness=Math.max(50,player.submissiveness);
			player.domesticity=Math.max(50,player.domesticity);
			player.allure=Math.max(50,player.allure);
			Message(NextWindow,`<p>You no want be woman, but ${rival.name} too strong for you to fight. You tell ${rival.name} that you woman now, he man, but you not really mean it.</p><p>He bring you to center of camp, throw you to dirt and show everyone that he man now, you just his woman. Soon, he enter and fuck you wild, make you cry out like deer in heat. He bellow loud like powerful beast. It make you feel strange. You think of babies now, maybe want become clan mother.<p><p>But you strong, you rememember how it feels to be man. You no stay woman, you become big strong man again. But first, must be patient.</p><p>And maybe get fucking from rival again too.</p>`);
			EndRound();
		}
		function doFight(){
			var challengeVictory = function(){
				rival.submissiveness=100;
				Message(NextWindow,"<p>You unleash your changra as "+rival.name+" falls in defeat, no longer able to resist. You show her that she is weak, remind her who is leader of Clan. Soon she forget all about wanting to fight and remember that she belong to you.</p>");
				EndRound();
			}
			var challengeDefeat = function(){
				makeLeader(player,rival,true,getUnusedFemaleName());
				Message(NextWindow,"<p>"+rival.name+" changra too strong for you. He laugh hearty as he absorb the last of your changra. You collapse like weak little girl at his feet. You no more fight. He too big and powerful. He strong man and you just his woman now.</p>\
				<p>He bring you in front of camp and mount you while everyone watches, so everyone knows that he chief and you just another woman. Soon you forget all about becoming chief and man again, want only to be good, obedient woman to powerful chief.</p>");
				EndRound();
			}
			EncounterNamedRival(rival);
			rival.Victory=challengeVictory;
			rival.Defeat = challengeDefeat;
			$(".stats").show();
			Battle(rival,false);
		}
		function actualSubmit(){
			var otherwomen="";
			if(player.women.length>1){
				otherwomen="<p>He bring you in front of clan, show you to all of the clan womenfolk. They confused, not understanding, but when he claims you as his woman, they begin to understand that they are all his women now. Just like you.</p>";
			}
			Message("location.reload()","<h1>"+rival.name+" Camp</h1>\
				<p>You no want fight. He big, powerful man, you little woman. When you submit, he turn you over and mount you like she-beast, making you how with pleasure as he takes you hard. Soon, all thought of becoming man or clan leader melts away, until all you think is woman thoughts.</p>"+otherwomen);
		}
		var options = {
			"pretend_button":{
				text:"Pretend Submit",
				action:pretendSubmit
			},
			"fight_button_fight":{
				text:"Fight!",
				action:doFight
			}
		}
		var msg = "<p>You not call "+rival.name+" for fucking, but he come to you at night anyway.</p><p>'"+
			player.name+"!', he say. 'I strong, you weak. I man, you woman. You no lead clan. You be my woman now!</p>\
			<p>You feel weak, confused. Head swims and make your thoughs full of giving him many babies. He steps forward, to mount you and breed you as his womanfolk. If you do not fight him, he will take clan and women, and make them his.</p>";
		if(player.submissiveness>55){
			msg+="<p>He so strong, powerful. Make you feel weak and uncertain. Maybe you want become his womanfolk. Become part of his new clan, get bred with many strong sons like good clan mother.";
			options.submit_button = {
				text:"Submit",
				action:actualSubmit
			}
		}
		ChoiceMessage(msg,rival.name+" Visits",options);
	}else{//backed down from high submissiveness, but will decrease for making the attempt.
		eatStatNut(avatar,"submissiveness",-7);
		challengedYet=false;
	}
  };
  this.gossip = function(targets){
  	return function(avatar){
	  	var target = getRandomElem(targets);
	  	if (target){
		  	avatar.activity+=`<br/>${avatar.name} spend time talking with ${target.youName}`; 
	  	}
	 }
  };
  this.leaderPiercePlayer = function(craftTargets){
  	return function(avatar){
  		if(craftTargets.length>0){
  			//showCamp=false;
  			var target = getRandomElem(craftTargets);
  			var desc = "";
  			switch(target){
  				case "nipplerings":
  					desc = "a pair of nipple rings through your womanly teats.";
  					player.items.nipplerings=1;
  					player.changeNatural("orentation",5);
  					player.orientation+=5;
  					break;
  				case "collar":
  					desc = "a lovely collar around your neck, to show the world you belong to him.";
  					player.items.collar=1;
					player.changeNatural("submissiveness", 5);
					player.submissiveness += 5;
					break;
				case "headband":
					desc = "an alluring headband.";
					player.items.headband=1;
					player.changeNatural("allure",5);
					player.allure+=5;
					break;
				case "bellybuttonstud":
					desc = "a pretty stud in your bellybutton, to draw attention to your "+(player.isPregnant()?"pregnant":"fertile")+" belly.";
					player.items.bellybuttonstud=1;
					player.changeNatural("maternalism",5);
					player.maternalism+=5;
					break;
				case "clitcockring":
					desc = "a cute piercing in your clit.";
					player.items.clitcockring=1;
					player.changeNatural("orientation",5);
					player.orientation+=5;
					break;
				default:
					desc = "some womanly jewelry.";
					break;
  			}
  			player.calcPhysique();
  			rival=leader;
  			redraw();
  			var msg = `${leader.name} decides you would look better with ${desc}`;
  			player.activity +="<br/>"+msg;
  			leader.activity+=msg;
  			Message(NextWindow,`<h1>Pierced</h1><p>${msg}</p>`);
  		}
  	}
  };  
  this.setActivity = function() {
  	var cannotChallenge = challengedYet||this.dysphoria<=0;
  	var mascMult = -1;
  	var weeks = player.round-this.round;
  	if(leader.isMale()){mascMult-=0.25;}//easier to avoid challenge if you are male
  	if(this.isMale()){mascMult+=0.5;}//much more likely to chalenge if they are male
  	var seduceTargets = leader.women.filter(x=>(x!==this) && (x.orientation<60)&&(x.dysphoria>10)&&(x.desires.allure<this.allure || this.allure>50) && (!x.isMale()));
  	var canSeduce = this.dysphoria<=1 && seduceTargets.length>0;
  	var teachTargets = leader.women.filter(x=>x!==this &&  (this.domesticity -x.domesticity)>=10);
  	var canTeach  = this.dysphoria<=1 && teachTargets.length>0 && domesticity>50;
  	var disciplineTargets = leader.women.filter(x=> x!==this && x.submissiveness>35 && x.submissiveness>this.submissiveness && x.dysphoria>15);
  	var canDiscipline = this.submissiveness<=40 && this.dysphoria<=0 && disciplineTargets.length>0;
  	var canRabbleRouse = this.dysphoria>10 && this.submissiveness<50;
  	var teachFuckTargets = leader.women.filter(x=>x.dysphoria>15);
  	var canTeachFuck = (teachFuckTargets.length>0)&&(this.dysphoria<1)&&(this.desire>20)&&(this.allure>50)&&(!leader.isFemale());
  	var pierceTargets = jewelryMods.filter(x=>player.Mods["craft"+x]>0 && player.items[x]<1);
  	var canPierce = (pierceTargets.length>0);
  	var pacifyTargets = leader.women.filter(x=>(x!==player)&&(x.isMale() || x.masculinity>45)&&(x.dysphoria>5));
  	var canPacify = pacifyTargets.length>0
    var probs = [
      { action: this.confused, prob: this.dysphoria>10?getRandomInt(-25,40)-10*(weeks>2)-15*(weeks>10):-29 },
      { action: this.tend, prob: getRandomInt(-25, 25)-12*(this.dysphoria>10)-20*(this.dysphoria>60)+3*(this.domesticity>50)+7*(this.domesticity>75) },
      { action: this.womanForage, prob:(this.allowForage?30*(player.goods<10)+10*(player.goods<30)+getRandomInt(-25,25)+8*(this.domesticity>60)/*(this.domesticity+(30*(player.goods<10))+this.dysphoria/2+getRandomInt(-25,25))*/:-30)},
      { action: this.challengeLeader, prob:(cannotChallenge?-35:mascMult*leader.masculinity()+this.masculinity()+getRandomInt(0,this.dysphoria)+getRandomInt(-25,10))},//bias against. should be rareish,
     /* { action:this.offerTrap, prob:(this.masculinity()/5+this.unpredictability*this.dysphoria/2+getRandomInt(-25,25))*(player.round-this.round>10)},
      { action:this.bolsterSelf, prob:(this.femininity()/5+this.unpredictability*this.dysphoria/2+getRandomInt(-25,25))*(player.round-this.round>10)}*/
    ];
    if(this===leader){
    	probs = [
    		{action:this.leaderHunt,prob:getRandomInt(-25,25)},
    		{action:this.leaderForage, prob:getRandomInt(-25,35)},
    		{action:this.fuckPlayer,prob:Math.floor(leader.desire/5)+getRandomInt(-25,25)},
    		{action:this.leaderPacify,prob:canPacify?getRandomInt(-25,25):-33},
    		{action:this.leaderPiercePlayer(pierceTargets), prob:(canPierce?getRandomInt(-30,10):-36)},//placeholder, lower prob once tested.

    	];
    }
    var thothFuck = (this!==thoth || leader===player || thoth.progress>4);
    socialProbs = [    	
      { action: this.fuck, prob: (this!==thoth || leader===player || thoth.reactionProgress>4)?this.desire/6 + getRandomInt(-25, 30*(this==thoth&&thoth.reactionProgress>4)):-30, choice:"fuck"},//thoth should avoid fucking leader until the thoth story progresses. After that she should be more likely than most
      { action: this.seduceWoman(seduceTargets), prob:canSeduce?getRandomInt(-25,25):-32, choice:"seduce"},
      {action: this.teachWoman(teachTargets), prob:canTeach?getRandomInt(-25,25):-30, choice:"teach"},
      {action: this.disciplineWoman(disciplineTargets),prob:canDiscipline?getRandomInt(-25,25):-33, choice:"discipline"},
      {action: this.rabbleRouse, prob:(canRabbleRouse?getRandomInt(-25,25)+this.submissiveness/10:-35),choice:"rabbleRouse"},
      {action:this.gossip(leader.women.filter(x=>x!=this)), prob:getRandomInt(-25,15), choice:"gossip"},
      {action:this.complainToOther(leader.women.filter(x=>x!=this)), prob:(this.dysphoria>5?getRandomInt(-25,25):-30), choice:"complain"},
      {action:this.teachFuck(teachFuckTargets), prob:(canTeachFuck?getRandomInt(-25,25):-33), choice:"teachFuck"},
      
    ];

    probs = probs.sort(function(a,b) {
      return b.prob - a.prob;
    });
    //console.log(probs);
    probs[0].action(this);
    if(this!==leader){		//FIXME: There is a bug here that may contribute to unresponsive and infinite buttons. - DSM
    	socialProbs=socialProbs.sort((a,b)=>b.prob-a.prob);
    	console.log(socialProbs[0]);
    	this.socialActivity=socialProbs[0].choice;
    	socialProbs[0].action(this);
    }
  };
	
	// Physique
	
	this.calcTestes = function(nb) {
		
		var val	= (this.submissiveness + this.domesticity + this.maternalism*4 + this.allure*2)/40;
		if (this.Mods.balls > 0 && nb !== false) val = val > 0 ? this.Mods.balls * -2 : (val + this.Mods.balls * -2);
		return val;
	};

  this.calcPhysique = function() {
		
		this.getSubmissiveness = function() {
			if (this.futa > 0 && this.submissiveness < 49) return this.submissiveness + 50;
			return this.submissiveness;
		};
		this.getAllure = function() {
			if (this.futa > 0 && this.allure < 49) return this.allure + 50;
			return this.allure;
		};
		this.getDomesticity = function() {
			if (this.futa > 0 && this.domesticity < 49) return this.domesticity + 50;
			return this.domesticity;
		};
		this.getMaternalism = function() {
			if (this.futa > 0 && this.maternalism < 49) return this.maternalism + 50;
			return this.maternalism;
		};
		this.getOrientation = function() {
			if (this.futa > 0 && this.orientation < 49) return this.orientation + 50;
			return this.orientation;
		};

    this.calcHeight = function() {
			if (this.futa > 0 || this.femininity() > 49) return maxValue(20 - (this.submissiveness/5) + this.Mods.amazon, 20);
      return maxValue(20 - (this.getSubmissiveness()/5), 20);
    };

    this.calcFace = function() {
      return ((this.getAllure() * 2) + this.getSubmissiveness())/10;
    };

    this.calcEyes = function() {
      return ((this.getSubmissiveness() * 2) + this.getAllure())/10;
    };

    this.calcLips = function() {
      return (this.getAllure() * 3)/10;
    };

    this.calcHairLength = function() {
      return ((this.getAllure() * 2) + this.getDomesticity())/10;
    };

    this.calcShoulders = function() {
      var val = ((this.getSubmissiveness() * 1.5) + (this.getDomesticity() * 1.5) )/10;
			if (this.femininity() > 49 || this.futa > 0) val = val - (this.Mods.amazon * 4);
			if (val < 0) val = 0;
			return val;
    };

   this.calcBreasts = function() {
      var val;
		if (this.isFutanari() || this.femininity() > 49) val = ((((this.getAllure() + this.Mods.breasts) - 50) * 4) + (((this.getMaternalism() + this.Mods.breasts) - 50) * 2 ))/10;
		else val = (((this.getAllure() - 50) * 4) + ((this.getMaternalism() - 50) *2))/10;
      return minValue(val, 0);
    };

    this.calcNipples = function() {
      var val = (((this.getMaternalism() - 50) * 4) + ((this.getAllure() - 50) *2 ))/10;
      return minValue(val, 0);
    };

    this.calcPenis = function() {
      return (this.orientation + this.allure + this.submissiveness)/10;
    };

    this.calcWaist = function() {
      return ((this.getAllure() * 3) - this.pregnancy * 5)/10;
    };

    this.calcHips = function() {
      return (this.getMaternalism() * 3)/10;
    };

    this.calcAss = function() {
      return ((this.getMaternalism() * 2) + this.getAllure())/10;
    };

    this.calcLegs = function() {
      return ((this.getDomesticity() * 2) + this.getAllure())/10;
    };

	this.capTraits();
    this.physique.height = this.calcHeight();
    this.physique.face = this.calcFace();
    this.physique.eyes = this.calcEyes();
    this.physique.lips = this.calcLips();
    this.physique.hairlength = this.calcHairLength();
    this.physique.shoulders = this.calcShoulders();
    this.physique.breasts = this.calcBreasts();
    this.physique.nipples = this.calcNipples();
    this.physique.testes = this.calcTestes();
    this.physique.penis = this.calcPenis();
    this.physique.waist = this.calcWaist();
    this.physique.hips = this.calcHips();
    this.physique.ass = this.calcAss();
    this.physique.legs = this.calcLegs();
  };
	
	// Traits
	this.capTraits = function()
	{
		$.each(AVATAR_TRAITS, function( index, trait ) {
			that[trait] = minValue(that[trait], -4);
			that.minimums[trait] = minValue(that.minimums[trait], -4);
			that.minimums[trait] = maxValue(that.minimums[trait], 100);
			that.natural[trait] = minValue(that.natural[trait], -4);
			that[trait] = maxValue(Math.floor(that[trait]), 100);
			that.maximums[trait] = minValue(Math.floor(that.maximums[trait]), -4);
			that.maximums[trait] = maxValue(Math.floor(that.maximums[trait]), 100);
			that.natural[trait] = maxValue(Math.floor(that.natural[trait]), 100);
		});
		
		that.changra = minValue(that.changra, 0);
		that.changra = Math.floor(maxValue(that.changra, 120 + that.Mods.changra + (that.women.length / 2) - that.femininity()));
	};
	
	// Initialise
	this.calcPhysique();
	
	$.each(AVATAR_TRAITS, function(index, trait) {
    that.natural[trait] = that[trait];
    that.minimums[trait] = that[trait] - 15;
    that.maximums[trait] = that[trait] + 35;
  });
	
	
	// Rival details
	// Unused for player or their women
	
	this.desires = {
    "submissiveness": getRandomInt(35, 95),
    "domesticity": getRandomInt(35, 95),
    "maternalism": getRandomInt(35, 95),
    "allure": getRandomInt(35, 95),
    "orientation": getRandomInt(50, 95)
  };

  this.dysphoria = this.masculinity();
	
  this.pushPreference = getRandomInt(0, 2);
  this.drainPreference = getRandomInt(0, 2);
  this.reflectPreference = getRandomInt(0, 1);
  var preferenceDifference = differenceBetween(this.pushPreference, this.drainPreference);
  this.unpredictability = getRandomInt(preferenceDifference, preferenceDifference + 2);
  this.offensiveness = getRandomInt(0, 10);
  this.defensiveness = getRandomInt(0, 10);

  this.currentAction = "";
	
	// Combat functions
	this.Victory = function() { };
	this.Defeat = function() { };
	this.spendExperience = function() { };
	this.getTell = function(action) { };
	this.getRecognise = function() {
		if (this.round > 0) return "you recognise him, he is " + this.name;
		return "";
	}
	this.determineAttackTrait = function(avatar, opponent, action) {return "submissiveness";}
	
	// Save/Load
	this.upgradeSave = function()
	{
		// Following needed to upgrade save games
		if (isNaN(that.Mods.changra)) that.Mods.changra = 0;
		if (isNaN(that.Mods.breasts)) that.Mods.breasts = 0;
		if (isNaN(that.Mods.perception)) that.Mods.perception = 0;
		if (isNaN(that.Mods.amazon)) that.Mods.amazon = 0;
		if (isNaN(that.Mods.cock)) that.Mods.cock = 0;
		if (isNaN(that.Mods.futa)) that.Mods.futa = 0;
		if (isNaN(that.Mods.balls)) that.Mods.balls = 0;
		if (isNaN(that.Mods.infuse)) that.Mods.infuse = 0;
		if (isNaN(that.Mods.craftnipplerings)) that.Mods.craftnipplerings = 0;
		if (isNaN(that.Mods.craftclitcockring)) that.Mods.craftclitcockring = 0;
		if (isNaN(that.Mods.craftcollar)) that.Mods.craftcollar = 0;
		if (isNaN(that.Mods.craftheadband)) that.Mods.craftheadband = 0;
		if (isNaN(that.Mods.craftbellybuttonstud)) that.Mods.craftbellybuttonstud = 0;
		if (isNaN(that.Mods.craftleftbracelet)) that.Mods.craftleftbracelet = 0;
		if (isNaN(that.Mods.pushsubmissiveness)) that.Mods.pushsubmissiveness = 0;
		if (isNaN(that.Mods.pushdomesticity)) that.Mods.pushdomesticity = 0;
		if (isNaN(that.Mods.pushmaternalism)) that.Mods.pushmaternalism = 0;
		if (isNaN(that.Mods.pushallure)) that.Mods.pushallure = 0;
		if (isNaN(that.Mods.pushorientation)) that.Mods.pushorientation = 0;
		if (isNaN(that.Mods.ironwill)) that.Mods.ironwill = 0;
		if (isNaN(that.physique.breastrows)) that.physique.breastrows = 0;
		if (isNaN(that.physique.gentialscnt)) that.physique.gentialscnt = 1;
		if (isNaN(that.physique.twins)) that.physique.twins = 5;
		if (isNaN(that.physique.horns)) {
			that.physique.horns = 0;
			that.physique.hornstype = 0;
		}
		if (isNaN(that.physique.tail)) {
			that.physique.tail = 0;
			that.physique.tailtype = 0;
		}
		if (isNaN(that.physique.wings)) that.physique.wings = 0;
		if (isNaN(that.physique.hairstyle)) that.physique.hairstyle = 1;
		if (isNaN(that.Mods.resistsubmissiveness)) that.Mods.resistsubmissiveness = 0;
		if (isNaN(that.Mods.resistdomesticity)) that.Mods.resistdomesticity = 0;
		if (isNaN(that.Mods.resistmaternalism)) that.Mods.resistmaternalism = 0;
		if (isNaN(that.Mods.resistallure)) that.Mods.resistallure = 0;
		if (isNaN(that.Mods.resistorientation)) that.Mods.resistorientation = 0;
		if (isNaN(that.futa)) that.futa = 0;
		//I don't understand why this is set, rather than saved
		/*
		if (that != player) {
			if (that.activity === "") that.setActivity();
			if (that.Mods.futa > 0) {
				that.Mods.cock = that.Mods.futa;
				that.Mods.futa = 0;
			}
		} else {
			if (that.activity.indexOf("birth") == -1) that.activity = "";
		}*/
		if (that.futa > 0 && that.Mods.cock === 0) that.Mods.cock = 1;
		if(that.allowForage===undefined){that.allowForage=false;}
		if (that.name === "") that.name = getUnusedFemaleName();
		if (isNaN(that.pregnancy)) {
			that.pregnancy = 0;
			that.impregnator=false;
			that.childrenboy = 0;
			that.childrengirl = 0;
		} else if (that.pregnancy > 0 && !that.hasVagina()) {
			that.pregnancy = 0;
		}
		if (isNaN(that.childrenboy) || (that["children"] !== undefined && that["children"] !== 0)) {
			that.childrenboy = that["children"];
			if (isNaN(that.childrenboy)) that.childrenboy = 0;
			delete that["children"];
		}
		if (isNaN(that.childrengirl)) that.childrengirl = 0;
				
		if (isNaN(that.round)) that.round = 0;
		
		if (isNaN(that.goods)) that.goods = 0;
		if (isNaN(that.metal)) that.metal = 0;
		if (isNaN(that.items.nipplerings)) {
			if (that == smith) that.items.nipplerings = 1;
			else that.items.nipplerings = 0;
		}
		if (isNaN(that.items.collar)) that.items.collar = 0;
		if (isNaN(that.items.headband)) that.items.headband = 0;
		if (isNaN(that.items.bellybuttonstud)) that.items.bellybuttonstud = 0;
		if (isNaN(that.items.clitcockring)) that.items.clitcockring = 0;
		if (isNaN(that.items.leftbracelet)) that.items.leftbracelet = 0;
		
		if (isNaN(that.switches1)) {
			if (!isNaN(that.switches)) that.switches1 = that.switches;
			if (!isNaN(that.switches1)) that.switches1 = 0;
		
			// remove duplicate entries
			// Once off fix
			for (var index = 0; index < that.women.length; index++) {
				var wm = that.women[index];
				for (var idx = 0; idx < that.women.length; itx++) {
					if (idx === index) continue;
					if (that.women[idx] === wm) {
						// duplicate entry
						that.women.splice(idx, 1);
						index = -1; // reset to start of loop!
						break;
					}
				}
			}
		}
	};
	this.replaceRefs = function(charTable){
		var tmp = this.women.map(function(woman){
			return charTable.indexOf(woman);
		});
		this.women=tmp;
		if(this.impregnator){
			this.impregnator=charTable.indexOf(this.impregnator);
		}
	};
	this.restoreRefs =function(charTable){
		var tmp = this.women;
		this.women = this.women.map(function(index){
			return charTable[index];
		});
		if(this.impregnator===undefined){
			if(this.pregnancy>0){
				this.impregnator=leader;//just make an assumption. Quite possibly wrong, but best one we can. Only matters for old saves
			}else{
				this.impregnator=false;
			}
		}
		if(this.impregnator!==false){
			this.impregnator=charTable[this.impregnator];
		}
	};
	this.loadGame = function(save,charTable)
	{
		this.women = [];
		for (var i = 0; i < save.women.length; i += 1 ) {
			this.women[i] = new Avatar(50, 95, 90, 75, 80);
			jQuery.extend(this.women[i], save.women[i]);
			this.women[i].upgradeSave();
		}
		this.upgradeSave();
	};
}
