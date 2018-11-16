const SexFlags = Enum([
	"gotPiV",
  	"gavePiV",
  	"gaveOral",
  	"gotOral",
  	"gotAnal",
  	"gaveAnal",
  	"gotFucked",//"generic" fucking that changes depending on participant genders
  	"didFuck", //will also set the relevant flags between sex and reflection steps.
  	"gaveHandjob",
  	"gotHandjob",
  	"onTop",
  	"onBottom",
  	"isSub",
  	"isDom",
  	"gotForced",
  	"didForce",
  	"isMan",
  	"isWoman",
  	"isFuta",
  	"didSuckCock",
  	"gotCockSucked",
  	"didLickPussy",
  	"gotPussyLicked",
  	"isPregnant",
]);

const SexEncounterFlags = Enum([
  	"iDom",
  	"rDom",
  	"mf",
  	"mm",
  	"ff",
  	"futa",
  	"iHot",
  	"iUg",
  	"refused",//successfully refused to fuck
  	"force",//encounter was forced (generally by leader). Maybe 
  	"wrongO",//target has wrong orientation for initiator
  	"lp",//leader/player interaction
  	"reversal",//submissiveness stat is different from leader/follower dynamic
  	"mDom",//male dominant
  	"fDom",//female dominant
  	"fSub",
  	"mSub",
  	"fRec",//female recipient
  	"mRec",
  	"mInit",//initiator is male
  	"fInit",
]);

var sexActs;
var sexReactions;

{
	/*Encounter Flags*/
  	const iDom = SexEncounterFlags.iDom;
  	const rDom = SexEncounterFlags.rDom;
  	const mf = SexEncounterFlags.mf;
  	const mm = SexEncounterFlags.mm;
  	const ff = SexEncounterFlags.ff;
  	const futa = SexEncounterFlags.futa;
  	const iHot = SexEncounterFlags.iHot;
  	const iUg = SexEncounterFlags.iUg;
  	const refused = SexEncounterFlags.refused;//successfully refused to fuck
  	const force = SexEncounterFlags.force;//encounter was forced (generally by leader). Maybe 
  	const wrongO = SexEncounterFlags.wrongO;//target has wrong orientation for initiator
  	const lp = SexEncounterFlags.lp;//leader/player interaction
  	const reversal = SexEncounterFlags.reversal;//submissiveness stat is different from leader/follower dynamic
  	const mDom = SexEncounterFlags.mDom;//male dominant
  	const fDom = SexEncounterFlags.fDom;//female dominant
  	const fSub = SexEncounterFlags.fSub;
  	const mSub = SexEncounterFlags.mSub;
  	const fRec = SexEncounterFlags.fRec;//female recipient
  	const mRec = SexEncounterFlags.mRec;
  	const mInit = SexEncounterFlags.mInit;//initiator is male
  	const fInit = SexEncounterFlags.fInit;
  	/*Character Flags*/  	
  	const gotPiV = SexFlags.gotPiV;
  	const gavePiV = SexFlags.gavePiV;
  	const gaveOral=SexFlags.gaveOral;
  	const gotOral =SexFlags.gotOral;
  	const gotAnal =SexFlags.gotAnal;
  	const gaveAnal =SexFlags.gaveAnal;
  	const gotFucked=SexFlags.gotFucked;//"generic" fucking that changes depending on participant genders
  	const didFuck=SexFlags.didFuck; //will also set the relevant flags between sex and reflection steps.
  	const gaveHandjob=SexFlags.gaveHandjob;
  	const gotHandjob=SexFlags.gotHandjob;
  	const onTop=SexFlags.onTop;
  	const onBottom=SexFlags.onBottom;
  	const isSub=SexFlags.isSub;
  	const isDom=SexFlags.isDom;
  	const gotForced=SexFlags.gotForced;
  	const didForce=SexFlags.didForce;
  	const isMan = SexFlags.isMan;
  	const isWoman = SexFlags.isWoman;
  	const isFuta = SexFlags.isFuta;
  	const didSuckCock =SexFlags.didSuckCock;
  	const gotCockSucked = SexFlags.gotCockSucked;
  	const didLickPussy = SexFlags.didLickPussy;
  	const gotPussyLicked=SexFlags.gotPussyLicked;
  	const isPregnant = SexFlags.isPregnant;
  	sexActs = [//note:refuseFuck will be added to notags by default if refused is not a tag. Just easier that way 
  		{
  			minD:50,
  			tags:rDom|refused,
  			activity:"{{initiator.YouHeShe}} back down when {{target.youheshe}} refuse",
  			dys:5,
  		},
  		{
  			notags:rDom,
  			tags:refused|force,
  			activity:"{{target.YouHeShe}} run away instead.",
  			dys:5,
  		},
  		{
  			tags:mf|fDom,
  			activity:"{{dominant.YouHeShe}} push {{submissive.youName}} down and ride cock hard. {{dominant.YouHeShe}} scream like shebeast as {{dominant.youheshe}} come.",
  			set_dominant:onTop|gotFucked,
  			set_submissive:onBottom|didFuck,
  		},
  		{
  			notags:force,
  			tags:fInit,
  			activity:"{{initiator.YouHeShe}} come to {{recipient.youName}} and spread legs. {{initiator.YouHeShe}} fuck like beast.",
  			set_initiator:gotFucked,
  			set_recipient:didFuck,
  			
  		},
  		{
  			tags:mf,
  			notags:fSub,
  			activity:"{{woman.YouName}} overwhelmed from lust. {{woman.YouHeShe}} spread legs for {{man.youhimher}} and get fucked.",
  			set_woman:gotFucked,
  			set_man:didFuck,
  		},
  		{
  			tags:lp|reversal|mf,
  			minD:40,
  			activity:"{{follower.YouName}} tell {{leader.youName}} to get on ground so {{follower.youheshe}} can fuck on top. {{leader.YouName}} argue, saying {{leader.youheshe}} clan leader, but {{leader.youheshe}} timid and soon back down. Soon {{follower.youheshe}} fucking {{leader.youhimher}} from on top until {{leader.youheshe}} scream in climax.",
  			dys:10,
  			set_woman:gotFucked,
  			set_follower:onTop,
  			set_leader:didFuck,
  			set_man:onBottom,
  		},
  		{
  			notags:wrongO,
  			tags:lp,
  			activity:"{{leader.YouName}} tell {{follower.youhimher}} to lie on ground and spread legs. {{leader.YouHeShe}} want taste {{follower.yourhisher}} {{follower.manwoman}} parts. {{follower.YouName}} do as told and lie down while {{leader.youName}} lick and suck. It feel strange for {{follower.youName}} to have {{leader.yourNames}} mouth on privates, but soon {{follower.youheshe}} scream in pleasure.",
  			set_leader:gaveOral,
  			set_follower:gotOral, 			
  		},
  		{
  			tags:reversal|mDom|lp|force,
  			minD:40,
  			minD:120,
  			activity:"{{follower.YouName}} agree, but only if {{follower.youheshe}} on top. {{leader.YouName}} unsure at first, but back down and agree. {{follower.YouName}} ride up and down on {{leader.yourNames}} cock, surprised that it feel so good",
  			dys:-4,
  			leader:isMan,
  			follower:isWoman,
  			set_leader:didFuck|onBottom,
  			set_follower:gotFucked|onTop,
  			
  		},
  		{
  			notags:rDom,
  			tags:ff,
  			activity:"{{initiator.YouName}} pull {{recipient.youName}} quietly behind tent. {{initiator.youheshe}} put hand on {{recipient.yourhisher}} thigh and gently slide up under clothes. Giving sly grin, {{initiator.youheshe}} slip fingers into {{recipient.yourNames}} wet pussy and begin rubbing. When {{recipient.youName}} start to make noise, {{initiator.youName}} silence with hard kiss until {{recipient.heshe}} scream climax into mouth.",
  			set_initiator:gaveHandjob,
  			set_recipient:gotHandjob,
  		},
  		{
  			notags:fDom,
  			tags:mDom,
  			maxD:120,
  			activity:"{{dominant.YouHeShe}} say for {{submissive.youName}} to get on ground, and {{submissive.youheshe}} {{eagerness}} obey. {{dominant.YouHeShe}} mount {{submissive.youhimher}} from behind and fuck {{submissive.yourhisher}} {{submissive.fuckhole}}.",
  			dys:-5,
  			set_dominant:didFuck|onTop,
  			set_submissive:gotFucked|onBottom,
  		},
  		{
  			notags:iDom,
  			tags:mm,
  			activity:"{{initiator.YouHeShe}} come to {{recipient.youName}} at night and in need. {{recipient.youName}} push {{initiator.himher}} on stomach and fuck manhole like pussy, releasing {{leader.yourhisher}} seed in it.",
  			set_initiator:gotAnal|onBottom,
  			set_recipient:gaveAnal|onTop,
  		},
  		{
  			tags:mDom,
  			activity:"{{dominant.YouHeShe}} throw {{submissive.youName}} to dirt and mount {{submissive.yourhisher}} {{submissive.fuckhole}}. {{dominant.YouHeShe}} fuck {{submissive.youName}} hard, making {{submissive.youName}} cry like shebeast in heat until {{submissive.youheshe}} cum. Soon {{dominant.YourHisHer}} seed erupt inside {{submissive.youhimher}}.",
  			set_dominant:didFuck|onTop,
  			set_submissive:gotFucked|onBottom,
  		},
  		{
  			tags:fRec,
  			maxD:40,
  			activity:"{{initiator.YouName}} make {{recipient.youhimher}} scream with tongue and finger. Then {{initiator.youheshe}} lick {{recipient.youName}} like shecat till {{recipient.youName}} scream like beast.",
  			set_initiator:gaveOral|gaveHandjob,
  			set_recipient:gotOral|gotHandjob
  			
  		},
  		{
  			activity:"{{first.YouName}} fuck {{second.youName}} all night long.",//Got to have some baseline default.,
  			set_first:didFuck|gotFucked,
  			set_second:gotFucked|didFuck,
  		},
  		{
  			notags:ff|reversal,
  			tags:mDom,
  			activity:"{{dominant.YouName}} motion to ground and command {{submissive.youhimher}} to get on knees. Because {{dominant.youheshe}} so dominant, {{submissive.youheshe}} quickly do what {{dominant.youheshe}} say. {{dominant.YouName}} take out man parts and motion for {{submissive.youhimher}} to suck, and soon {{submissive.youheshe}} take cock in mouth until {{dominant.youName}} baby juice fill mouth.",
  			set_dominant:gotOral,
  			set_submissive:gaveOral,
  		},
  		{
  			notags:fDom,
  			tags:mf,
  			activity:"{{man.YouHeShe}} pull {{woman.youName}} to furs and push {{woman.yourhisher}} legs apart. Soon {{man.youheshe}} enter {{woman.youhimher}} and begin to fuck {{woman.yourhisher}} pussy.",
  			set_man:didFuck|onTop,
  			set_woman:gotFucked|onBottom,
  		}
  	];
  	/*
  	*	REACTIONS
  	*/
	sexReactions=[
  		{
  			tags:mf,
  			activity:"Being on top make {{reactor.youName}} feel big and powerful, it only when {{other.yourhisher}} seed dribble down leg that {{reactor.youheshe}} realize {{reactor.youheshe}} still fucked as woman.",
  			reactor:gotFucked|onTop|isSub,
  			dys:3,
  		},
  		{
  			notags:refused,
  			minD:120,
  			activity:"{{reactor.YourHisHer}} body betray {{reactor.youhimher}} by responding to {{other.yourhisher}} touch, making {{reactor.youhimher}} squirm and moan with pleasure.",
  			reactor:gotFucked|isSub
  		},
  		{
  			minD:80,
  			activity:"{{reactor.YouHeShe}} still feel strange having this body and being fucked like womanfolk, but maybe {{reactor.youheshe}} start to like if it always feel this good.",
  			reactor:isWoman|gotFucked,
  		},
  		{
  			tags:lp,
  			minD:120,
  			activity:"{{reactor.YourHisHer}} body betray {{reactor.youhimher}} by responding to {{other.yourhisher}} touch, making you squirm and moan with pleasure as {{leader.heshe}} fuck you over and over until you filled with his seed",
  			reactor:isSub|gotForced,
  			dys:-5,
  		},
  		{
  			activity:"{{reactor.YouName}} smile to self afterwards. {{other.name}} good with mouth.",
  			reactor:gotOral,
  		},
  		{
  			tags:lp,
  			minD:140,
  			activity:"It make {{reactor.youhimher}} feel very ashamed. {{reactor.YouHeShe}} not supposed to be like woman. Why this feel so good?",
  			reactor:gotFucked|isSub,
  		},
  		{
  			minD:90,
  			activity:"{{reactor.YouName}} unhappily spit out fluids afterwards, and mutter to self. Can still taste {{other.yourNames}} {{other.manwoman}} parts in mouth for hours after.",
  			reactor:gaveOral|gotForced
  		},
  		{
  			minD:35,
  			maxD:120,
  			activity:"{{reactor.YouHeShe}} still {{reactor.hashave}} lingering taste of {{other.yourNames}} {{other.manwoman}} parts for hours after, but {{reactor.youName}} find that {{reactor.youheshe}} actually like it some.",
  			reactor:gaveOral,
  		},
  		{
  			maxD:45,
  			activity:"{{reactor.YouHeShe}} coo happily to self afterwards. It feel good to be fucked by {{other.youName}}.",
  			reactor:gotFucked|isSub
  		},
  		{
  			maxD:35,
  			activity:"{{reactor.YouName}} smile and thank {{other.youName}} for letting {{reactor.youhimher}} lick {{other.yourhisher}} {{other.genitals}}.",
  			reactor:gaveOral,
  			not_reactor:isDom,
  		},
  		{
  			tags:lp,
  			maxD:150,
  			minD:20,
  			activity:"It not feel right to get fucked like woman, but it also feel very good to obey strong leader commands.",
  			reactor:gotFucked|isSub
  		},
  		{
  			maxD:130,
  			activity:"{{other.YourHisHer}} {{other.genitals}} taste good.",
  			reactor:gaveOral
  		},
  		{
  			tags:lp|force,
  			minD:60,
  			maxD:200,
  			activity:"You still not happy to be used, but submitting to {{leader.name}} feel good.",
  			reactor:gotFucked|isSub,
  		},
  		{
  			minD:76,
  			activity:"{{reactor.YouHeShe}} feel ashamed, but also maybe bit turned on too.",
  			reactor:gotForced,
  		},
  		{
  			activity:"{{reactor.YouHeShe}} pat {{other.youName}} on head and tell {{other.youhimher}} {{other.youheshe}} did good job.",
  			not_reactor:isSub,
  			reactor:gotOral,
  		},
  		{
  			maxD:50,
  			activity:"{{reactor.YouName}} smile and pat belly. {{reactor.YouHeShe}} happy to be bred by {{other.youName}}.",
  			reactor:gotPiV,
  			not_reactor:isPregnant
  		},
  		{
  			maxD:50,
  			activity:"It felt very good. {{reactor.YouHeShe}} cannot wait to do again.",
  		},
  		{
  			tags:force,
  			minD:20,
  			maxD:140,
  			activity:"Maybe it not so bad to be womanfolk.",
  			reactor:gotFucked|isSub,
  		}
	];
	let setNotag = (x)=>(x.tags&refused==0)?x.notags|=refused:x;
 	sexReactions.forEach(setNotag);
  	sexActs.forEach(setNotag);
  	compileEncounterOptions(sexActs);
  	compileEncounterOptions(sexReactions);
}





//conversion from template string to handlebars:
//%s/${\([^}]*}\)/{{\1}}/gc



function initiateSex(initiator,target,forced){
  	initiator.currentSexActs = 0;
  	target.currentSexActs = 0;
	if(forced===undefined){
		forced=false;
	}
  	var activity;
  	var type = "other";
  	var initiator = initiator;
  	var recipient = target;
  	var man;//only used when mixed sex couples
  	var woman;
  	if((target.isMale()||initiator.isMale())&&(target.isFemale()||initiator.isFemale())){
  		if(target.isMale()){
  			man=target;
  			woman=initiator;
  		}else{
  			man=initiator;
  			woman=target;
  		}
  	}
  	var submissive;
  	var dominant;
  	if((initiator==leader)||(target==leader)||(Math.abs(target.submissiveness-initiator.submissiveness)>40)){
  		if((initiator==leader)||((target.submissiveness-initiator.submissiveness)>40)){
  			dominant=initiator;
  			submissive=target;
  		}else{
  			dominant=target;
  			submissive=initiator;
  		}
  	}
  	var first;//scenes that can work either way and we want to randomize a bit
  	var second;
  	if(Math.random()>0.5){
  		first=initiator;
  		second=target;
  	}else{
  		first=target;
  		second=initiator;
  	}
  	var notsub;//if a role can be either normal or dom/sub, but should never be done by the sub in a scene.
  	var notdom;
  	if(dominant){
  		notsub = dominant;
  		notdom = submissive;
  	}else{//if there is no dom and sub, the order does not matter. can be either
  		notsub=first;
  		notdom=second;
  	}
  	var follower;
  	var playerHere = (initiator===player)||(target===player);
  	var leaderHere = (initiator===leader)||(target===leader);
  	if(leaderHere){
  		if(initiator===leader){
  			follower=target;
  		}else{
  			follower=initiator;
  		}
  	}
  	var genitalReact = (chr=>chr.isMale()?"cock swell":"pussy ache");
  	var playerFucked = true;
  	var leaderFucked = false;//if female leaderg fucked by male player.
  	/*These are set here for convenience in definitions*/
  	const iDom = SexEncounterFlags.iDom;
  	const rDom = SexEncounterFlags.rDom;
  	const mf = SexEncounterFlags.mf;
  	const mm = SexEncounterFlags.mm;
  	const ff = SexEncounterFlags.ff;
  	const futa = SexEncounterFlags.futa;
  	const iHot = SexEncounterFlags.iHot;
  	const iUg = SexEncounterFlags.iUg;
  	const refused = SexEncounterFlags.refused;//successfully refused to fuck
  	const force = SexEncounterFlags.force;//encounter was forced (generally by leader). Maybe 
  	const wrongO = SexEncounterFlags.wrongO;//target has wrong orientation for initiator
  	const lp = SexEncounterFlags.lp;//leader/player interaction
  	const reversal = SexEncounterFlags.reversal;//submissiveness stat is different from leader/follower dynamic
  	const mDom = SexEncounterFlags.mDom;//male dominant
  	const fDom = SexEncounterFlags.fDom;//female dominant
  	const fSub = SexEncounterFlags.fSub;
  	const mSub = SexEncounterFlags.mSub;
  	const fRec = SexEncounterFlags.fRec;//female recipient
  	const mRec = SexEncounterFlags.mRec;
  	const mInit = SexEncounterFlags.mInit;//initiator is male
  	const fInit = SexEncounterFlags.fInit;
  	/*
  	*Character Flags
  	*/
  	
  	const gotPiV = SexFlags.gotPiV;
  	const gavePiV = SexFlags.gavePiV;
  	const gaveOral=SexFlags.gaveOral;
  	const gotOral =SexFlags.gotOral;
  	const gotAnal =SexFlags.gotAnal;
  	const gaveAnal =SexFlags.gaveAnal;
  	const gotFucked=SexFlags.gotFucked;//"generic" fucking that changes depending on participant genders
  	const didFuck=SexFlags.didFuck; //will also set the relevant flags between sex and reflection steps.
  	const gaveHandjob=SexFlags.gaveHandjob;
  	const gotHandjob=SexFlags.gotHandjob;
  	const onTop=SexFlags.onTop;
  	const onBottom=SexFlags.onBottom;
  	const isSub=SexFlags.isSub;
  	const isDom=SexFlags.isDom;
  	const gotForced=SexFlags.gotForced;
  	const didForce=SexFlags.didForce;
  	const isMan = SexFlags.isMan;
  	const isWoman = SexFlags.isWoman;
  	const isFuta = SexFlags.isFuta;
  	const didSuckCock =SexFlags.didSuckCock;
  	const gotCockSucked = SexFlags.gotCockSucked;
  	const didLickPussy = SexFlags.didLickPussy;
  	const gotPussyLicked=SexFlags.gotPussyLicked;
  	const isPregnant = SexFlags.isPregnant;
  	/*Flag Checks*/ 
  	var isIDom = (dominant&&(dominant==initiator))?iDom:0;
  	var isRDom = (dominant&&(dominant==target))?rDom:0;
  	var isMF = ((man!==undefined)&&(woman!==undefined))?mf:0;
  	var isMM = target.isMale()&&initiator.isMale()?mm:0;
  	var isFF = target.isFemale()&&initiator.isFemale()?ff:0;
  	var isFutaEncounter = target.isFutanari()||initiator.isFutanari()?futa:0;
  	var isIHot = ((target.orientation<30)&&(initiator.femininity()>80))||((target.orientation>70)&&(initiator.masculinity()>80))?iHot:0;
  	var isIUg = ((target.orientation<30)&&(initiator.masculinity()>60))||((target.orientation>70)&&(initiator.femininity()>60))?iUg:0;
  	var isForced = forced?force:0;
  	var isLP = (leaderHere&&playerHere)?lp:0;
  	var isReversal = (dominant&&((dominant.submissiveness-submissive.submissiveness)>20))?reversal:0;//leader is always the "dominant" if available, but submissiveness can potentially be reversed
  	if(isReversal){//but go ahead and swap so generic dom/sub can be used
  		let tmp = dominant;
  		dominant=submissive;
  		submissive=tmp;
  	}
  	var isWrongO = (((initiator.orientation<35)&&(target.hasCock() || target.isMale()))||
  		((initiator.orientation>65)&&(target.hasVagina() || target.isFemale()))) ? wrongO:0;
  	/*console.log("reversal",isReversal,dominant.submissiveness,submissive.submissiveness);
  	console.log(dominant.name,submissive.name);*/
  	var isMDom = dominant&&dominant.isMale()?mDom:0;
  	var isFDom = dominant&&dominant.isFemale()?fDom:0;
  	var isFSub = submissive&&submissive.isFemale()?fSub:0;
  	var isMSub = submissive&&submissive.isMale()?mSub:0;
  	var isFRec = recipient&&recipient.isFemale()?fRec:0;
  	var isMRec = recipient&&recipient.isMale()?mRec:0;
  	var isFInit = initiator&&initiator.isFemale()?fInit:0;
  	var isMInit = initiator&&initiator.isMale()?mInit:0;
  	var tagmask = isIDom|isRDom|isMF|isMM|isFF|isFutaEncounter|isIHot|isIUg|isForced|isLP|isReversal|isWrongO|isMDom|isFDom|isFSub|isMSub|isFRec|isMRec|isMInit|isFInit;
  	var argue;
  	var react;
  	var act;
  	var dys = player.dysphoria;
  	var characters = {
  		player:player,
  		leader:leader,
  		follower:follower,
  		initiator:initiator,
  		recipient:recipient,
  		target:target,
  		man:man,
  		woman:woman,
  		submissive:submissive,
  		dominant:dominant,
  		notsub:notsub,
  		notdom:notdom,
  		first:first,
  		second:second,
  	}
  	if(dominant){
  		dominant.currentSexActs |= isDom;
  	}
  	if(submissive){
  		submissive.currentSexActs |= isSub;
  	}
  	function setSexMask(chr){
  		chr.currentSexActs |= chr.isMale()?isMan:0;
  		chr.currentSexActs |= chr.isFemale()?isWoman:0;
  		chr.currentSexActs |= chr.isFutanari()?isFuta:0;
  		chr.currentSexActs |= chr.isPregnant()?isPregnant:0;
  	}
  	setSexMask(initiator);
  	setSexMask(target);
  	/*Initialize unused people.
  	Templates will error otherwise.
  	in theory these shouldn't get used ever if created here like initiator
  	aside from templates
  	could maybe get better solution if we used some other form of templating that explicitly resolved later*/
  	if(!submissive){submissive=leader;}
  	if(!dominant){dominant=second;}
  	if(!follower){follower=second;}
  	if(!woman){woman=first;}
  	if(!man){man=second;}
  	var eagerness = "quickly";
  	if(isIHot){
  		eagerness="eagerly";
  	}
  	if(isIUg){
  		eagerness="reluctantly";
  	}
  	if(forced){
  		let reluctance = target.dysphoria;
  		if(isIHot){
  			reluctance-=50;
  		}
  		if(isIUg){
  			reluctance+=50;
  		}
  		if(reluctance>170){
  			eagerness="angrily";  			
  		}else if(reluctance>100){
  			eagerness="grudgingly";
  		}else if(reluctance<50){
  			eagerness="quickly";
  		}else if(reluctance<20){
  			eagerness="eagerly";
  		}
  	}
  	
  	var argues = [
  		{
  			tags:rDom|force,
  			minD:150,
  			set:refused,
  			activity: "{{target.YouHeShe}} shout at {{initiator.youName}}, yelling that {target.youheshe} not {{initiator.yourshishers}} to use",
  		},
  		{
  			tags:iUg|force,
  			notags:iDom,
  			minD:40,
  			set:refused,
  			activity:"{{initiator.YouHeShe}} so hideous that {{target.youheshe}} refuse to fuck {{initiator.youhimher}}",
  		},  		
  		{
  			tags:iHot|force,
  			minD:75,
  			activity:"{{target.YouHeShe}} think about refusing, but {{initiator.heshe}} so hot it make {{target.yourhisher}} {{target,arousedReaction}}.",		
  		},
  		{
  			tags:force|fSub,
  			minD:120,
  			activity:"{{target.YouHeShe}} argue, saying {{target.youheshe}} not woman, but {{initiator.heshe}} point and say {target.yourhisher} body is woman body, so {{target.youheshe}} fuck like woman.",
  		},
  		{
  			notags:force,
  			tags:iUg,
  			set:refused,
  			minD:40,
  			activity:"{{target.YouName}} curl lips in disgust, saying {{target.youheshe}} never fuck {{initiator.youName}}."
  		}
  	];
  	function setActMasks(character,others){
  		var other;
  		for(let o in others){
  			if(others[o]!==character){
  				other=others[o];
  			}
  		}
  		var setGeneric=true;
  		var mask= character.currentSexActs;
  		const othermask = other.currentSexActs;
  		if(mask & (gaveAnal|gavePiV)){
  			setGeneric=false;
  			mask|=gotFucked;
  		}
  		if(mask & (gaveAnal|gavePiV)){
  			setGeneric=false;
  			mask|=didFuck;
  		}
  		if(mask& (didLickPussy|didSuckCock)){
  			setGeneric=false;
  			mask|=gaveOral;
  		}
  		if(mask & (gotCockSucked|gotPussyLicked)){
  			setGeneric=false;
  			mask |= gotOral; 
  		}
  		if(setGeneric){
  			if(mask&gotFucked){
  				if(tagmask&mf){
  					mask|=gotPiV;  				
  				}
  				if(tagmask&mm){
  					mask|=gotAnal;
  				}//what, if anything, should ff produce?
  			}
  			if(mask&didFuck){
  				if(tagmask&mf){
  					mask|=gavePiV;
  				}
  				if(tagmask&mm){
  					mask|=gaveAnal;
  				}
  			}
  			if(mask&gaveOral){
  				if(othermask&isWoman){
  					mask|=didLickPussy;
  				}
  				if(othermask&isMan){
  					mask|=didSuckCock;
  				}
  				if(othermask&isFuta){
  					mask|=didSuckCock;//Will also get pussy licked from above. Is that correct?
  				}
  			}
  			if(mask&gotOral){
  				if(mask&isFuta){
  					mask|=gotCockSucked;
  				}
  				if(mask&isMan){
  					mask|=gotCockSucked;
  				}
  				if(mask&isWoman){
  					mask|=gotPussyLicked;
  				}
  			}
  		}
  		if((tagmask&force) && (!(tagmask&(refused|reversal)))){
  			if(mask&isSub){
  				mask|=gotForced;
  			}else if(mask&isDom){
  				mask|=didForce;
  			}else if(mask&(gotPiV|gotFucked|gotAnal)){
  				mask|=gotForced;
  			}else if(mask&(gavePiV|didFuck|gaveAnal)){
  				mask|=didForce;
  			}
  		}
  		character.currentSexActs=mask;
  		//console.log(mask);
  	}
  	//var argueScore = getRandomInt(4,8) - 1*(player.dysphoria>15)-1*(player.dysphoria>60)-1*(player.dysphoria>100)-1*(player.dysphora>160);
  	//if(argueScore<4){/*/*
  	/*if(!forced){
	  	argue = handleResult(getRandomElem(argues.filter(checkChoice)));
	}else{
		argue="";
	}*/
  	//}
  	//act = handleResult(getRandomElem(acts.filter(checkChoice,follower)));
  	//console.log("initiator",initiator.name,"recipient",recipient.name);
  	var uniqueCharacters = {initiator:initiator,target:target};
  	var useDys = function(characters,tags){
  		if((tags&lp)){
  			return follower;
  		}else{
  			return false;
  		}
  	}
  	var activities = generateEncounter(tagmask,[
  		{
  			name:"act",
  			possibilities:sexActs,
  			characters:characters,
  			uniqueCharacters:uniqueCharacters,
  			characterTags:"currentSexActs",
  			handleTags:setActMasks,
  			useDysphoria:useDys,
  		},
  		{
  			name:"initiatorReaction",
  			possibilities:sexReactions,
  			characters:{reactor:initiator,other:target,...characters},
  			uniqueCharacters:uniqueCharacters,
  			characterTags:"currentSexActs",
  			useDysphoria:useDys,
  		},
  		{
	  		name:"targetReaction",
	  		possibilities:sexReactions,
	  		characters:{reactor:target,other:initiator,...characters},
	  		uniqueCharacters:uniqueCharacters,
	  		characterTags:"currentSexActs",
	  		useDysphoria:useDys,
	  	}],["{{act}} {{initiatorReaction}}","{{act}} {{targetReaction}}"]);
  	
  	/*initiatorReact = handleResult(getReaction(initiator,recipient),true);
  	recipientReact = handleResult(getReaction(recipient,initiator),true);
  	var initiatorActivity = argue+" "+act;
  	var recipientActivity = argue+" "+act;
  	if(initiatorReact!==undefined){
  		initiatorActivity+= " "+initiatorReact;
  	}
  	if(recipientReact!==undefined){
  		recipientActivity+=" "+recipientReact;
  	}*/
  	if(initiator.currentSexActs&(gotFucked|didFuck|gotOral)){
  		initiator.desire=0;
  		if(initiator.currentSexActs&gotPiV){
  			initiator.maybeImpregnate(target);
  		}
  	}
  	if(target.currentSexActs&(gotFucked|didFuck|gotOral)){
  		target.desire=0;
  		if(target.currentSexActs&gotPiV){
  			target.maybeImpregnate(initiator);
  		}
  	}
  	
  	/* Maybe later
  	if((tagmask&fuckLtP)==fuckLtP){
	  	eatStatNut(player,getRandomElem(["allure","maternalism","orientation"]),getRandomInt(3,7));
	  	avatar.activity+=activity;
	  	//player.activity+=activity;
	  	//player.dysphoria-=5;
	  	if((tagmask&(mL|fP))==(mL|fP)){
		  	player.maybeImpregnate(avatar);
	  	}
  	}
  	if((tagmask&fuckPtL)==fuckPtL){
	  	eatStatNut(player,getRandomElem(["allure","maternalism","orientation"]),getRandomInt(-3,-1));
	  	eatStatNut(avatar,getRandomElem(["allure","orientation","submissiveness"]),getRandomInt(2,4));
	  	//avatar.activity+=activity;
	  	//player.activity+=activity;
	  	if((tagmask&(mP|fL))==(mP|fL)){
	  		avatar.maybeImpregnate(player);
	  	}	  	
  	}*/
  	
  	return activities;
}
