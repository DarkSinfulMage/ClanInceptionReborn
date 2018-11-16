/**area.js 
 * 
 * For the purpose of defining a wanderable area and extracting areas in the game. 
 * 
 * 
 */

function GameArea(name, desc, lvl, day){
	
	this.name = name;
	this.description = desc;
	this.dangerLevel = lvl;				//For the sake of difficulty and bonuses.
	this.minimumDayDiscoverable = day; 	//The day you can have the chance to discover.
	
	this.isDiscovered = 0;
}

var a_field = GameArea("Field", "", 0, 0);
var a_hills = GameArea("Hills", "", 0, 0);
var a_volcano = GameArea("Volcano", "", 2, 0);
var a_beach = GameArea("Beach", "", 1, 0);
var a_swamp = GameArea("Swamp", "", 2, 0);
