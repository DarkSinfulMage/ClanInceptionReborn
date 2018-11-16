// Save Object
// General container for all variables for a game in progress
function ASavedGame()
{
	// The player
	this.player = "";
	
	// some details on each visitable place
	this.places = "";
	
	//TODO: Thoth, always first.		this.thoth = "";
	
	
	// Demon
	this.demon = "";
	
	// Smith
	this.smith = "";
	
	// Runaways
	this.runaways = "";
}
	
// Load Games

function loadGame(cancel) 
{
	var cnt = 0;
	var id;
	var str;
	var sg;
	for (id = 1; id < 5; id++) {
		str = localStorage.getItem('clani' + id);
		sg = JSON.parse(str);
		if (sg !== undefined) cnt++;
	}
	if (cnt === 0) return 0;

	$("#output").html("<h1>Loading a game</h1><div id='loading'></div>");
	for (id = 1; id < 5; id++) {
		str = localStorage.getItem('clani' + id);
		if (str !== "" && str !== null) {
			sg = JSON.parse(str);
			if (sg !== undefined) {
				cnt++;
				var temp = JSON.parse(sg.player);
				$("#loading").append("<button myid='" + id + "' id='load_button_"+id+"' class='btn btn-woman push--right' title='" + temp.name + ", week " + temp.round + "'>Save Game "+id+"</button>");
				
				$("#load_button_"+id).click(
					function() { loadGameId($(this).attr("myid")); }
				);
			}
		}
	}
	$("#loading").append("<button id='load_button_import' class='btn btn-woman push--right' title='Import'>Import</button>");
	$("#load_button_import").click(
		function() {
			$("#loading").append("<br><textarea onclick='this.focus()' id='importtxt' cols='40' rows='10''></textarea>");
			$("#loading").append("<br><button id='load_export' class='btn btn-woman push--right' title='Load'>Load</button>");
			$("#load_export").click(
				function() { 
					var str = $('textarea#importtxt').val();
					loadGameString(str);
				}
			);				
		}
	);	
	$("#loading").append("<button id='load_button_cancel' class='btn btn-woman push--right' title='Cancel'>Cancel</button>");
	$("#load_button_cancel").click(
		function() { 
			eval(cancel);
		}
	);	

	return cnt;
}

function loadGameId(id) 
{
	var str = localStorage.getItem('clani' + id);
	loadGameString(str, id);
}
function loadGameString(str, id)
{
	function loadAvatar(temp){
		var ret = new Avatar(50,95,0,75,80);
		jQuery.extend(ret,temp);
		ret.upgradeSave();
		return ret;
	};
	if (str === undefined) {
		alert("Save not found.");
		return;
	}
	createRival(0);
	var sg = JSON.parse(str);
	var temp = JSON.parse(sg.player);
	sg.characters=JSON.parse(sg.characters);
	jQuery.extend(player, temp);
	var rawchars = sg.characters;
	console.log(rawchars);
	for(var i in sg.characters){
		console.log(sg.characters[i]);
		sg.characters[i] = loadAvatar(sg.characters[i]);
	}
	player = sg.characters[sg.player];
	demon = sg.characters[sg.demon];
	smith = sg.characters[sg.smith];
	if(sg.stories){
		for(var s in sg.stories){
			if(activeStories[s]){
				activeStories[s].deserialize(sg.stories[s]);
			}
		}
	}
	sg.runaways = JSON.parse(sg.runaways);
	console.log(sg.characters);
	for(var i in sg.characters){
		sg.characters[i].restoreRefs(sg.characters);
	}
	runaways = sg.runaways.map(function(i){return sg.characters[i];});
	places = { };
	if (sg.places !== undefined) {
		var tempplaces = JSON.parse(sg.places);
		$.each(tempplaces, function(index, place) {
			places[index] = tempplaces[index];
			if (isNaN(places[index])) places[index] = 0;
		});
	}
	/*
	if (sg.round !== undefined) player.round = sg.round;
	player.loadGame(temp);
		
	
	runaways = [];
	if (sg.runaways !== undefined && sg.runaways.length > 0) {
		var temprunaways = JSON.parse(sg.runaways);
		if (temprunaways !== "") {
			$.each(temprunaways, function(index, person) {
				runaways[index] = new Avatar(50, 95, 90, 75, 80);
				jQuery.extend(runaways[index], temprunaways[index]);
				runaways[index].upgradeSave();
			});
		}
	}
	
	createDemon();
	if (sg.demon !== undefined) {
		var tempdemon = JSON.parse(sg.characters[sg.demon]);
		jQuery.extend(demon, tempdemon);
		demon.loadGame(tempdemon);
	}
	createSmith();
	if (sg.smith !== undefined) {
		var tempsmith = JSON.parse(sg.characters[sg.smith]);
		jQuery.extend(smith, tempsmith);
		smith.loadGame(tempsmith);	
	}	*/
	resetRival();
	rival.name = "";
	console.log(sg.leader);
	if(sg.leader===undefined){
		leader=player;
	}else{
		leader=sg.characters[sg.leader];
	}
	if(sg.thoth){
		thoth = sg.characters[sg.thoth];
	}else{
		var res = sg.characters.filter(x=>x.maleName=="Thoth");
		if(res.length>0){
			thoth=res[0];
		}else{
			thoth=player.women[0];//Just making a guess for older saves.
		}
	}
	if (id === undefined) alert("Imported Game, week " + player.round);
	else alert("Loaded Game " + id + ", week " + player.round);
	ShowCamp();
}

// Save Games

function saveGame(cancel) 
{
	$("#output").html("<h1>Saving a game</h1><div id='saving'></div>");
	for (var id = 1; id < 5; id++) {
		$("#saving").append("<button myid='" + id + "' id='save_button_"+id+"' class='btn btn-woman push--right'>Save Game "+id+"</button>");
		
		$("#save_button_"+id).click(
			function() { saveGameId($(this).attr("myid")); }
		);
	}
	$("#saving").append("<button id='save_button_export' class='btn btn-woman push--right' title='Export'>Export</button>");
	$("#save_button_export").click(
		function() { 
			$("#saving").append("<br><textarea onclick='this.select()' cols='40' rows='10'>" + saveString() + "</textarea>");
		}
	);
	$("#saving").append("<button id='save_button_cancel' class='btn btn-woman push--right' title='Cancel'>Cancel</button>");
	$("#save_button_cancel").click(
		function() { 
			eval(cancel);
		}
	);
}

function saveString()
{
	var sg = new ASavedGame();
	var charTable = [player,demon,smith];
	
	sg.player = 0;//JSON.stringify(JSON.decycle(player));
	sg.demon = 1;//JSON.stringify(JSON.decycle(demon));
	sg.smith = 2;//JSON.stringify(JSON.decycle(smith));
	sg.places = JSON.stringify(JSON.decycle(places));
	sg.thoth=-1;
	charTable=charTable.concat(player.women);
	if(leader!==player){
		if(!player.women.includes(leader)){
			charTable.push(leader);
		}
		for(var w in leader.women){
			if(!charTable.includes(leader.women[w])){
				charTable.push(leader.women[w]);
			}
		}
	}
	charTable=charTable.concat(runaways);
	for(var c in charTable){
		if((thoth!==undefined)&&(charTable[c]===thoth)){
			sg.thoth=c;
		}
		delete charTable[c].currentAction;//the cause of so many circular references. useless, delete
		charTable[c].replaceRefs(charTable);
	}
	/*if(charTable.length>3){
		console.log(JSON.stringify(charTable[4].women,2));
	}*/
	sg.runaways = JSON.stringify(runaways.map(function(r){return charTable.indexOf(r);}));//JSON.decycle(runaways));
	sg.leader=charTable.indexOf(leader);
	isCyclic(charTable);
	sg.characters  = JSON.stringify(charTable);
	sg.stories = {};
	for(var s in activeStories){
		sg.stories[s]=activeStories[s].serialize();
	}
	var ret =JSON.stringify(JSON.decycle(sg));
	for(var c in charTable){//easier to do in place, but need to restore after so we can keep playing. 
		charTable[c].restoreRefs(charTable);
	}
	return ret;
}

function saveGameId(id) 
{
	var str = saveString();
	localStorage.setItem('clani' + id, str);
	alert("Saved.");
	resetRival();
	rival.name = "";
	ShowCamp();
}
