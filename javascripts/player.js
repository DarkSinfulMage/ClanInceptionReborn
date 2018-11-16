//
// Your player character
/*jshint multistr:true*/

var player = new Avatar(getRandomInt(23, 28),
                        getRandomInt(23, 28),
                        getRandomInt(23, 28),
                        getRandomInt(23, 28),
                        getRandomInt(23, 28)
                        );
// Initialise player specific variables
player.experience = 5;
player.daysWoman = 0;


function editPlayer()
{
	$("#output").append(
			"<font size='-2'>\
			<a id='expandplayer' href='#'>Click Here To Edit Player</a>\
		  <table class='slidertable3' id='playertable'>\
				<tr><td>Submissiveness</td><td><div id='slider_submissiveness_p'></div></td><td>Dominance</td></tr>\
				<tr><td>Domesticity</td><td><div id='slider_domesticity_p'></div></td><td>Adventurousness</td></tr>\
				<tr><td>Maternalism</td><td><div id='slider_maternalism_p'></div></td><td>Paternalism</td></tr>\
				<tr><td>Allure</td><td><div id='slider_allure_p'></div></td><td>Lustfulness</td></tr>\
				<tr><td>Homosexual</td><td><div id='slider_orientation_p'></div></td><td>Heterosexual</td></tr>\
				<tr><td>Boobs+</td><td><div id='slider_boobs_p'></div></td></tr>\
				<tr><td>Breast Rows</td><td><div id='slider_rows_p'></div></td></tr>\
				<tr><td>Cock+</td><td><div id='slider_cock_p'></div></td></tr>\
				<tr><td>Genitals</td><td><div id='slider_cocks_p'></div></td></tr>\
				<tr><td>Balls+</td><td><div id='slider_balls_p'></div></td></tr>\
				<tr><td>Futa+</td><td><div id='slider_futa_p'></div></td></tr>\
				<tr><td>Amazon+</td><td><div id='slider_amazon_p'></div></td></tr>\
				<tr><td>Push Submissiveness</td><td><div id='slider_psubmissiveness_p'></div></td></tr>\
				<tr><td>Push Domesticity</td><td><div id='slider_pdomesticity_p'></div></td></tr>\
				<tr><td>Push Maternalism</td><td><div id='slider_pmaternalism_p'></div></td></tr>\
				<tr><td>Push Allure</td><td><div id='slider_pallure_p'></div></td></tr>\
				<tr><td>Push Orientation</td><td><div id='slider_porientation_p'></div></td></tr>\
				<tr><td>Iron Will+</td><td><div id='slider_ironwill_p'></div></td></tr>\
				<tr><td>Resist Submissiveness</td><td><div id='slider_psubmissiveness_r'></div></td></tr>\
				<tr><td>Resist Domesticity</td><td><div id='slider_pdomesticity_r'></div></td></tr>\
				<tr><td>Resist Maternalism</td><td><div id='slider_pmaternalism_r'></div></td></tr>\
				<tr><td>Resist Allure</td><td><div id='slider_pallure_r'></div></td></tr>\
				<tr><td>Resist Orientation</td><td><div id='slider_porientation_r'></div></td></tr>\
			</table></font><br/>\
	");
	
	$('#expandplayer').click(function(){
    $('#playertable').slideToggle('fast');
	});
		
	$("#slider_maternalism_p").slider({value:100-player.maternalism,min:0,max:100,slide:function(event, ui) {
		player.maternalism = 100 - ui.value; 
		redraw();
	}});
	$("#slider_submissiveness_p").slider({value:100-player.submissiveness,min:0,max:100,slide:function(event, ui) {
		player.submissiveness = 100 - ui.value; 
		redraw();
	}});
	$("#slider_domesticity_p").slider({value:100-player.domesticity,min:0,max:100,slide:function(event, ui) {
		player.domesticity = 100 - ui.value; 
		redraw();
	}});
	$("#slider_allure_p").slider({value:100-player.allure,min:0,max:100,slide:function(event, ui) {
		player.allure = 100 - ui.value; 
		redraw();
	}});
	$("#slider_orientation_p").slider({value:100-player.orientation,min:0,max:100,slide:function(event, ui) {
		player.orientation = 100 - ui.value; 
		redraw();
	}}); 
	$("#slider_boobs_p").slider({value:player.Mods.breasts,min:-20,max:200,slide:function(event, ui) {
		player.Mods.breasts = ui.value; 
		redraw();
	}}); 
	$("#slider_amazon_p").slider({value:player.Mods.amazon,min:0,max:20,slide:function(event, ui) {
		player.Mods.amazon = ui.value; 
		redraw();
	}});
	$("#slider_cock_p").slider({value:player.Mods.cock,min:0,max:20,slide:function(event, ui) {
		player.Mods.cock = ui.value; 
		redraw();
	}});	
	$("#slider_balls_p").slider({value:player.Mods.balls,min:0,max:20,slide:function(event, ui) {
		player.Mods.balls = ui.value;
		redraw();
	}});
	$("#slider_futa_p").slider({value:player.Mods.futa,min:0,max:20,slide:function(event, ui) {
		player.Mods.futa = ui.value; 
		redraw();
	}});
	$("#slider_psubmissiveness_p").slider({value:player.Mods.pushsubmissiveness,min:0,max:20,slide:function(event, ui) {
		player.Mods.pushsubmissiveness = ui.value; 
		redraw();
	}});
	$("#slider_pdomesticity_p").slider({value:player.Mods.pushdomesticity,min:0,max:20,slide:function(event, ui) {
		player.Mods.pushdomesticity = ui.value; 
		redraw();
	}});
	$("#slider_pmaternalism_p").slider({value:player.Mods.pushmaternalism,min:0,max:20,slide:function(event, ui) {
		player.Mods.pushmaternalism = ui.value; 
		redraw();
	}});	
	$("#slider_pallure_p").slider({value:player.Mods.pushallure,min:0,max:20,slide:function(event, ui) {
		player.Mods.pushallure = ui.value; 
		redraw();
	}});	
	$("#slider_porientation_p").slider({value:player.Mods.pushorientation,min:0,max:20,slide:function(event, ui) {
		player.Mods.pushorientation = ui.value; 
		redraw();
	}});
	$("#slider_ironwill_p").slider({value:player.Mods.ironwill,min:0,max:4,slide:function(event, ui) {
		player.Mods.ironwill = ui.value; 
		redraw();
	}});
	$("#slider_psubmissiveness_r").slider({value:player.Mods.resistsubmissiveness,min:0,max:20,slide:function(event, ui) {
		player.Mods.resistsubmissiveness = ui.value; 
		redraw();
	}});
	$("#slider_pdomesticity_r").slider({value:player.Mods.resistdomesticity,min:0,max:20,slide:function(event, ui) {
		player.Mods.resistdomesticity = ui.value; 
		redraw();
	}});
	$("#slider_pmaternalism_r").slider({value:player.Mods.resistmaternalism,min:0,max:20,slide:function(event, ui) {
		player.Mods.resistmaternalism = ui.value; 
		redraw();
	}});	
	$("#slider_pallure_r").slider({value:player.Mods.resistallure,min:0,max:20,slide:function(event, ui) {
		player.Mods.resistallure = ui.value; 
		redraw();
	}});	
	$("#slider_porientation_r").slider({value:player.Mods.resistorientation,min:0,max:20,slide:function(event, ui) {
		player.Mods.resistorientation = ui.value; 
		redraw();
	}});	
	$("#slider_rows_p").slider({value:player.physique.breastrows,min:0,max:6,slide:function(event, ui) {
		player.physique.breastrows = ui.value; 
		redraw();
	}});
	$("#slider_cocks_p").slider({value:player.physique.gentialscnt,min:0,max:6,slide:function(event, ui) {
		player.physique.gentialscnt = ui.value; 
		redraw();
	}});	
}
