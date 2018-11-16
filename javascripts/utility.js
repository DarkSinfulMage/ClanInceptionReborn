// Common functions
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function minValue(val, min) { return val >= min ? val : min; }
function maxValue(val, max) { return val <= max ? val : max; }
function getRandomElem(array) { return array[Math.floor(Math.random()*array.length)]; }
function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
function differenceBetween(x, y) { return x > y ? x - y : y - x; }

function toCommaSeperatedList(array){
  if (array.length >= 3) return array.slice(0, array.length - 1).join(', ') + ", and " + array.slice(-1);
  else if (array.length === 2) return array[0] + " and " + array[1];
  else return array[0];
}

//accepts any value like '#ffffff', 'rgba(255,255,255,1)', 'hsl(0,100%,100%)', or 'white'
function toRGBA(c) {
    var can = document.createElement('canvasdummy'),
        ctx = can.getContext('2d');
    can.width = can.height = 1;
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, 1, 1); //paint the canvas
    var img = ctx.getImageData(0, 0, 1, 1),
        data = img.data,
        rgba = {
            r: data[0], //0-255 red
            g: data[1], //0-255 green
            b: data[2], //0-255 blue
            a: data[3]  //0-255 opacity (0 being transparent, 255 being opaque)
        };
    return rgba;
}


function isCyclic(obj) {
  var keys = [];
  var stack = [];
  var stackSet = new Set();
  var detected = false;

  function detect(obj, key) {
    if (typeof obj != 'object') { return; }

    if (stackSet.has(obj)) { // it's cyclic! Print the object and its locations.
      var oldindex = stack.indexOf(obj);
      var l1 = keys.join('.') + '.' + key;
      var l2 = keys.slice(0, oldindex + 1).join('.');
      console.log('CIRCULAR: ' + l1 + ' = ' + l2 + ' = ' + obj);
      console.log(obj);
      detected = true;
      return;
    }

    keys.push(key);
    stack.push(obj);
    stackSet.add(obj);
    for (var k in obj) { //dive on the object's children
      if (obj.hasOwnProperty(k)) { detect(obj[k], k); }
    }

    keys.pop();
    stack.pop();
    stackSet.delete(obj);
    return;
  }

  detect(obj, 'obj');
  return detected;
}
function Enum(members){
	if(members.length>32){
		throw(new RangeError("Enum must have no more than 32 members"));
	}
	var definitions = {};
	var lookup={};
	for(var i in members){
		definitions[members[i]]=2**i;
		lookup[2**i]=members[i];
	}
	Object.freeze(definitions);
	Object.freeze(lookup);
	var values = Object.values(definitions);
	var keys = Object.keys(definitions);
	Object.freeze(values);
	Object.freeze(keys);
	var ret={};
	for(let d in definitions){
		Object.defineProperty(ret,d,{get:function(){return definitions[d];}});
	}
	ret.lookup = function(val){
		let ret = [];
		for(let l in lookup){
			if(val&l){
				ret.push(lookup[l]);
			}
		}
		return ret.join("|");
	}
	ret.definition = definitions;
	ret.keys=keys;
	ret.values=values;
	ret=Object.freeze(ret);
	return ret;
}
