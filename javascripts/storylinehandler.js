//How should storylines be formatted?

/*Hook object
{
	hook://certain spots prechecking in code
		//round_start
		//
	params://List of parameters set by hook
		//ex. mainCamp (roundstart, player is in their 'initial' camp)
	conditions:[condition]//
		{name:name of condition
			val,minV,maxV
*/


const comparisons={
	"<":(x,y)=>x<y,
	'<=':(x,y)=>x<=y,
	'==':(x,y)=>x==y,
	'===':(x,y)=>x===y,
	'!=':(x,y)=>x!=y,
	'!==':(x,y)=>x!==y,
	'>=':(x,y)=>x>=y,
	'>':(x,y)=>x>y,
	'isChar':function(x,y){
		return x.name==y;
	},
	'notChar':function(x,y){
		return x.name!=y;
	}
};
const changes={
	"=":(p,n,v)=>p[n]=v,
	'+':(p,n,v)=>p[n]=p[n]?p[n]+v:v,
	'-':(p,n,v)=>p[n]=p[n]?p[n]-v:-v,
	'*':(p,n,v)=>p[n]=p[n]?p[n]*v:v,
	'/':(p,n,v)=>p[n]=p[n]?p[n]/v:1/v
};

class StoryNode{
	constructor(def,id,story){
		this.hasRun=false;
		this.id=id;
		this.story=story;
		this.definition=def;
		const commonMistakes = {
			condition:"conditions",
			effect:"effects"
		}
		for(let m in commonMistakes){
			if(def[m]){
				console.warn("Story node ",id,"has a property named",m, ". Did you mean",commonMistakes[m],"instead?");
			}
		}
		for(var p of Object.keys(def)){
			this[p]=def[p];
		}
		if(this.title){
			this.title=Handlebars.compile(this.title);
		}
		if(this.text){
			this.text=Handlebars.compile(this.text);
		}
	}
	static checkVariable(v,def){
		if((v===undefined)&&(def!==undefined)){
			return false;
		}
		console.log("Checking variable",v,def);
		if(def instanceof Object){
			for(c in def){
				if(!comparisons[c](v,def[c])){
					return false;
				}
			}
		}else{
			return (def===v);
		}
		return true;
	}
	static alterVariable(parent,v,def){
		if(def instanceof Object){
			for(var o in def){//done in whatever order JS gives us.
				changes[o](parent,v,def[o]);
			}
		}else{
			if(typeof parent[v] == "number"){
				changes['+'](parent,v,def);
			}else{
				parent[v]=def;
			}
		}
	}
	static getCharacters(){
		var c = {
			player:player,
			rival:rival,
			leader:leader
		};
		if(thoth){
			c.thoth=thoth;
		}
		return c;
	}
	deserialize(def){
		var barred = new Set(["definition","title","text","story"]);
		for(var i in def){
			if(!barred.has(i)){
				this[i]=def[i];
			}
		}		
	}
	serialize(){
		var barred = new Set(["definition","title","text","story"]);
		var ret={};
		for(var d in this){
			if((typeof this[d] == "function")&&(!barred.has(d))){
				ret[d]=this[d];
			}
		}
		return ret;
	}
	checkCharacterCondition(chr,cond){
		console.log("Char check",chr,cond);
		if(chr===undefined){
			return false;
		}
		for(var c in cond){
			console.log("Character condition",c);			//TODO: Check this as part of Loop problem causing problems.
			if(c=="status"){
				let status = chr===leader?"leader":"follower"
				if(cond.status!=status){
					return false;
				}
			}else if(c=="camp"){
				if(cond.camp!=activeCamp){
					return false;
				}
			}else{
				if(!StoryNode.checkVariable(chr[c],cond[c])){
					return false;
				}
			}
		}
		console.log("Character condition true");
		return true;
	}
	checkCondition(){
		var ret = true;
		const chars=StoryNode.getCharacters();
		const charKeys = Object.keys(chars);
		console.log("Check Conditions for",this.id);
		console.log(chars);
		if(this.conditions){					//FIXME: Between here and Console log status, there is a bug that prevents this from exiting when some buttons are clicked - DSM
			for(var c in this.conditions){
				console.log("condition",c,ret);
				if(charKeys.includes(c)){
					console.log("checking character");
					ret = ret&&this.checkCharacterCondition(chars[c],this.conditions[c]);
				}else if(c=="story"){
					if(this.conditions.story.current){
						ret = ret && storyNode.checkVariable(this.story.current,this.conditions.story.current);
					}
					if(this.conditions.story.visited){
						let vis = this.conditions.story.visited;
						if(!(vis instanceof Array)){
							vis=[vis];
						}
						for(let v in vis){
							ret = ret && this.story.history.includes(vis[v]);
						}
					}
				}else{//otherwise treat as the story's variable.
					ret = ret && storyNode.checkVariable(this.story.variables[c],this.conditions[c]);
				}
			}
		}
		console.log("Final status",ret);
		return ret;
	}
	_handleEffects(effects){//need to pass effects to handle choice windows later
		const chars = StoryNode.getCharacters();
		const charKeys = Object.keys(chars);
		console.log("Called effects",effects);
		for(var e in effects){
			if(charKeys.includes(e)){
				console.log("Setting variable for",e);
				for(var v in effects[e]){
					if(v==="impregnate"){
						if(chars[e]&&chars[effects[e][v]]){
							chars[e].maybeImpregnate(chars[effects[e][v]]);
						}
					}else{
						StoryNode.alterVariable(chars[e],v,effects[e][v]);
						if(StoryNode.attributes.has(v)){
							StoryNode.alterVariable(chars[e].natural,v,effects[e][v]);
						}
					}
				}
			}else{
				for(var v in effects[e]){
					StoryNode.alterVariable(this.story.variables,v,effects[e][v]);
				}
			}
		}
	}
	handleHook(hook,interrupt){
		if(this.checkCondition()){
			var node = this;
			var chrs = StoryNode.getCharacters();
			var hbContext = {...chrs, ...this.story.variables};
			function callBack(){
				node._handleEffects(node.effects)
				node.story.history.push(node.id);
				if(!interrupt){
					node.story.unhook(hook,node.id);
				}else if(this.once){
					node.story.unhook(hook,node.id);
				}
				if(node.next){//will change for interrupts that set this, as well.
					node.story.current=node.next;
					node.story.hook(hook,node.next);
				}
				NextWindow();
			}
			var msg="";
			if (this.title){
				msg+=`<h1>${this.title(hbContext)}</h1>`;
			}
			if(this.text){
				msg+=this.text(hbContext);
			}
			Message(callBack,msg,false,chrs[this.showCharacter]);
			return true;
		}else{
			return false;
		}
	}
}
StoryNode.attributes = new Set(["orientation","submissiveness","domesticity","allure","maternalism"]);
Object.freeze(StoryNode.attributes);

class Story{
	constructor(def,id,initial,hooks){
		this.hooks={};
		this.id=id;
		this.nodes={};
		this.variables={};
		this.interrupts={};
		this.current=initial;
		this.history=[];
		for(var h in hooks){
			this.hooks[h]={
				name:h,
				hook:hooks[h],
				active:(new Set())
			}
		}
		for(var n in def){
			let node = new StoryNode(def[n],n,this);
			this.nodes[n]=node;
			if(def[n].interrupt){
				this.interrupts[n]=node;
				this.hook(this.hooks[node.hook],node.id);
			}
		}
		if(this.nodes[initial]){
			//console.log(this.nodes[initial].hook,this.hooks,this.hooks[this.nodes[initial].hook],initial);
			this.hook(this.hooks[this.nodes[initial].hook],initial);
		}
	}
	serialize(){
		var ret={}
		const barred = new Set(["hooks","id","nodes","interrupts"]);
		for(var i in this){
			if(((typeof this[i] !=="function")) && (!barred.has(i))){
				ret[i]=this[i];
			}
		}
		ret.nodes={};
		for(var n in this.nodes){
			ret.nodes[n]=this.nodes[n].serialize();
		}
		ret.interrupts=[];
		for(var i in this.interrupts){
			ret.interrupts.push(this.interrupts[i].id);
		}
		ret.hooks={};
		for(var h in this.hooks){
			ret.hooks[h]=Array.from(this.hooks[h].active);
		}
		return ret;
	}
	deserialize(def){
		console.log("deserializing",def);
		const barred = new Set(["hooks","id","nodes","interrupts"]);
		for(var i in def){
			if(!barred.has(i)){
				this[i]=def[i];
			}
		}
		for(var n in def.nodes){
			this.nodes[n].deserialize(def.nodes[n]);
		}
		this.interrupts = def.interrupts.map( (x)=>this.nodes[x]);
		this.unhookall();
		for(var h in def.hooks){
			for(var n in def.hooks[h]){
				this.hook(this.hooks[h],def.hooks[h][n]);
			}
		}
	}
	handleHook(hookName){
		console.log("Handling hook ",hookName);
		var ranOnce=false;//if a node is marked as "sole", it will only run if it is the only node IN THIS STORYLINE to pop
		var currentHook = this.hooks[hookName];
		var hookNodes = this.hooks[hookName].active;
		if(hookNodes.has(this.current)){//always to "main" node first if it runs
			ranOnce = ranOnce || this.nodes[this.current].handleHook(currentHook);
		}
		for(var n of hookNodes){
			if((n != this.current) && ((!ranOnce) || (!this.nodes[n].sole))){
				ranOnce = ranOnce || this.nodes[n].handleHook(currentHook);
			}
		}
	}
	unhookall(){
		for(var h in this.hooks){
			this.hooks[h].hook.delete(this);
			this.hooks[h].active=new Set();
		}
	}
	hook(hook,node){
		hook.active.add(node);
		hook.hook.add(this);
		console.log("adding",node,hook.hook.size);
	}
	unhook(hook,node){
		var did = hook.active.delete(node);
		console.log("deleting",node.toString(),node,hook.active.size,did,hook.active);
		if(hook.active.size==0){
			hook.hook.delete(this);
			console.log("deleting",node,hook.hook.size);
		}
	}
}

var activeStories={};
const storyHooks = {
	"round":new Set(),
	"gameover":new Set(),
}
Object.freeze(storyHooks);
function loadStory(storyDef,id,initial){
	var story = new Story(storyDef,id,initial,storyHooks);
	activeStories[id]=story;
}
function triggerStoryHook(hookName){
	for(var s of storyHooks[hookName]){
		s.handleHook(hookName);
	}
}





