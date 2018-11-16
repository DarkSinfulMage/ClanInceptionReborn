/*
	Encounter definition:
	{
		tags:integer with initial tags preloaded,
		charactersTags:
	}
	Encounter stage definition: (processed in order)
	{
		name:
		possibilities:list of objects with following definition:
			{
				activity:precompiled handlebars template,,
				definition:original template,
				cond: optional condition function
				minD:minimum dysphoria to allow
				maxD: maximum dysphoria to allow
				tags:all tags must be set to allow
				notags:not allowed if any tags are set
				set:these tags will be set after
				set_{character}:these character tags will be set
				unset_{character}:these character tags will be unset
				{character}:these character tags must be set to allow
				not_{character}:these character tags must not be set to allow
			}
		tagsFromStage:if set will use (encounter) tags from named (previous) stage. Otherwise will use from immediately prior stage.
		characters:object with {charactername:character} as k:v. May be aliases
		uniqueCharacters:object with {charactername:character}. Each should be unique;
		variables:other variables that are preset by the calling function and accessible to templates
		characterTags:string with variable to use for character tags (should be preloaded)
		characterTagsDest:place to save character tags (if different from read) (null means will not write at all)
		useDysphoria:function(characters,tags){} will only worry about dysphoria if this is not false. Will return character whose dysphoria is to be used
		handleTags:optional function(character){} will process tags after text is generated
	}
	Results [{template string}], where each template has results of each encounter stage as its definition.
*/


function generateStage(stageDefinition,tags){
	var characters = stageDefinition.characters;
	var uniqueCharacters = stageDefinition.uniqueCharacters;
	var tagName = stageDefinition.characterTags;
	var useDysphoria = stageDefinition.useDysphoria;
	var characterTags = stageDefinition.characterTags;
	var writeCharacterTags = stageDefinition.characterTagsWrite !==null;
	var characterTagsDest = stageDefinition.characterTagsDest?stageDefinition.characterTagsDest:characterTags;
	var otherVariables = stageDefinition.variable?stageDefinition.variables:{};
	function checkChoice(choice){
		//console.log(choice);
		//console.log(choice.tags, tagmask,choice.tags&tagmask);
		if(choice.tags&&((choice.tags&tags)!==choice.tags)){
			//console.log("Failed to match choice mask",tags,choice.tags,tags&choice.tags);
			return false;
		}
		if(choice.notags && ((choice.notags &tags) !==0)){
			//console.log("Notags was set",choice.notags,tags,tags&choice.notags);
			return false;
		}
		if(choice.cond && (!choice.cond(stageDefinition.characters))){
			//console.log("condition returned false");
			return false;
		}
		var chooser;
		if(useDysphoria&&(chooser=useDysphoria(characters,tags))){//Deliberately assigning to chooser here. NOT an equality test
	  		if(choice.minD && (chooser.dysphoria<choice.minD)){
	  			//console.log("Failed minimum dysphoria. Current:",chooser.dysphoria,"Minimum",choice.minD)
	  			return false;
	  		}
	  		if(choice.maxD && (chooser.dysphoria>choice.maxD)){
	  			//console.log("Over maximum dysphoria. Current:",chooser.dysphoria,"Maximum",choice.maxD);
	  			return false;
	  		}
	  	}
	  	for(var x in characters){
  			if(characters[x] !==undefined){
	  			if(choice[x]){//will also skip if choice is zero
	  				//console.log("checking condition",x,reactCharacters[x].currentSexActs,choice[x],reactCharacters[x].currentSexActs&choice[x]);
	  					//console.log(reactCharacters[x].currentSexActs & choice[x]);
  					if((characters[x][tagName] & choice[x])!=choice[x]){
  						//console.log("returning false");
  						//console.log(`false because flag not set for ${x}.`,tagName,SexFlags.lookup(characters[x][tagName]),SexFlags.lookup(choice[x]),characters[x][tagName]&choice[x]);
  						//console.log(choice.activity);
  						return false;//did not do the act this requires
  					}
  				}
  				if(choice["not_"+x]){
  					if(characters[x][tagName] & choice["not_"+x]){//false if any flag is set.
  						//console.log(`option false because not_${x} flags are set: `,choice.definition);
  						return false;
  					}
  				}
  			}
  		}
  		//console.log("Choice is true:",choice.definition);
  		return true;
	}
  	function handleResult(choice){
  		if(choice===undefined){
  			return "";
  		}
  		if(choice.dys&&useDysphoria&&useDysphoria(characters,tags)){
  			player.dysphoria+=choice.dys;
  		}
  		if(choice.set){
  			tags |= choice.set;
  		}
  		for(var x in characters){
  			if(choice["set_"+x]&&characters[x]){
  				characters[x][characterTagsDest] |= choice["set_"+x];
  			}
  		}
	  	if(stageDefinition.handleTags){
	  		for(let c in uniqueCharacters){
		  		stageDefinition.handleTags(uniqueCharacters[c],uniqueCharacters);
		  	}
	  	}
  		//console.log(choice);
  		return choice.activity?choice.activity({...characters,...otherVariables}):"";
  	}
  	var choice = getRandomElem(stageDefinition.possibilities.filter(checkChoice));
  	return {name:stageDefinition.name,activity:handleResult(choice),tags:tags};
}
function generateEncounter(initialTags,encounterStages,encounterResults){
	var completedStages = {};
	var stageActivity = {};
	var previousTags = initialTags;
	for(var s in encounterStages){
		var def = encounterStages[s];
		let tags = previousTags;
		if(def.tagsFromStage&&completedStages[def.tagsFromStage]){
			tags=completedStages[def.tagsFromStage].tags;
		}
		let result = generateStage(def,tags);
		completedStages[result.name]=result;
		stageActivity[result.name]=result.activity;
		previousTags = result.tags;
	}
	var results = [];
	for(let r in encounterResults){
		results.push(Handlebars.compile(encounterResults[r])(stageActivity));
	}
	return results;
}


function compileEncounterOptions(options){
	for(let o in options){
		if(options[o].activity){
			if(options[o].activity.constructor===String){
				options[o].definition=options[o].activity;
				options[o].activity=Handlebars.compile(options[o].activity,{noEscape:true});
			}
		}
	}
}
