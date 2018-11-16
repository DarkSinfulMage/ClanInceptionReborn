const thothStory = {
	start:{
		hook:"round",
		type:"text",
		next:'1',
		showCharacter:"thoth",
		conditions:{
			player:{
				status:"follower",
				camp:"main",
			},
			thoth:{
				status:"follower",
			}
		},
		effect:{
			player:{
				dysphoria:25
			}
		},
		title:"Thoth Come",
		text:`<p>Oh no! "What you do, {{player.maleName}}?" she cry, "You supposed to father many children and save clan. How you do that if you woman instead? Now you spreading legs for other man. Soon you get baby in belly and give birth to new clansmen for him, and our old clan all forgotten.</p>\
			<p>With tear in eye, you try to explain that it only accident. You still strong, soon you will be man again and restore clan like promised. You not sure you know how, or even really believe it, but {{thoth.name}} does. She cheer and hug you close. It feel weird, with woman chest touching her, but it still make you happy.</p>\
			<p>"We do this, {{player.maleName}}," {{thoth.name}} say. "I help you become man again, then you save clan."</p>`		
	},
	1:{
		hook:"round",
		type:"text",
		next:'2',
		chance:0.5,
		showCharacter:"thoth",
		conditions:{
			player:{
				status:"follower",
				camp:"main",
			},
			thoth:{
				status:"follower",
			}
		},
		effects:{
			player:{
				dysphoria:20,
				allure:-25,
				submissiveness:-25,
				domesticity:-25,
				maternalism:-25,
				orientation:-25,
			}
		},
		title:"Thoth Come",
		text:`<p>{{thoth.name}} bring you large basket of cooked nuts. They smell savory and potent, just scent of them make you feel powerful and alive.</p>\
					<p>"I search all week to find for you, {{player.maleName}}, and cook in secret so {{leader.name}} not know. Eat quick. These powerful foods, make you strong like man again."</p>\
					<p>You eat the food she made, and quickly feel power swell inside. All the power of male ancestors calling to you, reminding you what it feel like to be man.</p>`,
	},
	2:{
		hook:"round",
		type:"text",
		chance:0.25,
		showCharacter:"thoth",
		next:'3',
		conditions:{
			player:{
				status:"follower",
				camp:"main",
			},
			thoth:{
				status:"follower",
			}
		},
		effects:{
			player:{
				orientation:-5,
				maternalism:-5,
				domesticity:-5,
				allure:-5,
				submissiveness:-5,
				dysphoria:35,
			}
		},
		title:"Thoth Come",
		text:`<p>Once more {{thoth.name}} come to you with secret basket.</p>\
					<p>"These all I find," she say, "hurry and eat."</p>\
					<p>There not very many in basket, but food still revitalize weak changra.</p>\
					<p>"Why you still not clan leader?" she ask, upset. "Sometimes I feel...."</p>\
					<p>Her voice trail off. She bring hand up to breast and let out long sigh, only to shake off like bad dream.</p>\
					<p>"It no matter," she says, "Just hurry. Please. I need you become man again."</p>`
	},
	3:{
		hook:"round",
		type:"text",
		chance:0.25,
		showCharacter:"thoth",
		next:'4',
		conditions:{
			player:{
				status:"follower",
				camp:"main",
			},
			thoth:{
				status:"follower",
			}
		},
		title:"You Spot Thoth",
		text:`<p>Wandering through camp, you see {{thoth.name}} ahead. It suprise you to see her with {{leader.name}}, and even more when she begin to giggle and flirt with him. She smile and touch arm, rubbing against him like she cat in heat.</p>\
			<p>When she realize you spot her, she pull away embarassed.</p>`
	},
	4:{
		hook:"round",
		type:"text",
		chance:0.25,
		showCharacter:"thoth",
		conditions:{
			player:{
				status:"follower",
				camp:"main",
			},
			thoth:{
				status:"follower",
			}
		},
		next:'5',
		title:"Confronting Thoth",
		text:`<p>You find {{thoth.name}} in camp and ask her why she flirt with bad leader.</p>\
					<p>"Because he strong man and you not!" she say, "I try help you, but you not become leader yet. Maybe I wrong. Maybe you not supposed to be man after all?"</p>\
					<p>Before you can argue, she cuts you off.</p>\
					<p>"You think I the only one?" she asks, "You think you not get silly smile when he look at you? Think your woman parts not all wet when you think about him? I hear you scream his name like wild beast.</p>\
					<p>"You not man, {{thoth.name}}, maybe you never man again. Maybe you supposed to be woman. I have needs, need strong man to hold. I try to make that you, but maybe I make mistake."</p>`
	},
	5:{
		hook:"round",
		type:"text",
		chance:0.1,
		showCharacter:"thoth",
		next:'6',
		conditions:{
			player:{
				status:"follower",
				camp:"main",
			},
			thoth:{
				status:"follower",
			}
		},
		effects:{
			thoth:{
				impregnate:"leader",
			},
			player:{
				dysphoria:-5,
				orientation:10,
			}
		},
		title:"Catch Thoth Fucking",
		text:`<p>As you walk in camp, you hear grunting noise in bush. When you look, you see {{thoth.name}} on ground with legs wrapped around {{leader.name}} waist.</p>\
				<p>You angry that she betray you and fuck {{leader.name}}. She supposed to be your woman, but now she with {{leader.name}} instead.</p>\
				<p>The two no notice as you watch them from bushes. Before long, you maybe start to feel funny. You angry, yes, but maybe also something else. Thoth look so happy, all gasping and moaning as {{leader.name}} fill her. You think, maybe it would be nice if you were in her place.</p>\
				<p>After they come to finish, {{thoth.name}} head rolls back and her eye catches yours. Before you run away, you see knowing smirk on her face.</p>`
	},
	6:{
		hook:"round",
		type:"text",
		chance:0.1,
		showCharacter:"thoth",
		next:'7',
		conditions:{
			player:{
				status:"follower",
				camp:"main",
			},
			thoth:{
				status:"follower",
			}
		},
		effects:{
			player:{
				dysphoria:-5,
				submissiveness:15,
				allure:15,
				orientation:15,
				maternalism:15,
				domesticity:15,
			}
		},
		title:"Thoth Come",
		text:`<p>{{thoth.name}} come to you with another basket of food.</p>\
					<p>"Eat," she tell you.</p>\
					<p>Happy that she no longer upset, you take the nuts and fruit and begin to eat. But when you do, you realize something wrong. You not feel powerful and manly. Instead you feel soft, meek, want to stay in den and have baby.</p>\
					<p>"What you do!" you ask.</p>\
					<p>"This what you are now," she say, and her voice much scarier and harder to ignore since you ate fruit, "We both {{leader.name}}\'s women, {{player.name}}. Now we both need be good women and make him happy."</p>`
	},
	7:{
		hook:"round",
		type:"text",
		chance:0.1,
		showCharacter:"thoth",
		next:'7',
		conditions:{
			player:{
				status:"follower",
				camp:"main",
			},
			thoth:{
				status:"follower",
			}
		},
		effects:{
			thoth:{
				impregnate:"leader",
			},
			player:{
				impregnate:"leader",
			}
		},
		title:"Thoth Comes",
		text:`<p>You busy working in camp when {{thoth.name}} find you. Her furs all loose, like they ready to fall at any second. Make her look sexy, like she was for you back when you were man.</p>\
					<p>"Follow me, {{player.maleName}}," she say all sexy, "I have surprise for you."</p>\
					<p>Unable to resist, you follow her to tent. Inside, you find {{leader.name}} lying naked on furs. You try step away, but Thoth block you from leaving tent. You want look away, but you cannot. {{leader.name}}\'s cock is out and erect, and the sight of it entrances you. Makes you think many strange thoughts.</p>\
					<p>"Go on, {{player.name}}, you know you want."</p>\
					<p>She push you forward, but you barely need it. The sight of him transfixes you. Can barely remember being man now, your body feel all woman, and it want the man in front of you. Both of you kneel down, and you not fight as she bring your head to his cock.</p>\
					<p>"This our place now," she say while stroking and fondling your womanly body. "We both women, it our job to give our man pleasure. Together.</p>\
					<p>True to her word, you spend rest of night sucking and fucking {{leader.name}}, pleasuring your powerful clan leader over and over. By time sun come up, he breed both of you many times.</p>`
	},
	carryPlayerChild:{
		hook:"round",
		sole:true,
		interrupt:true,
		once:true,
		type:"text",
		chance:0.7,
		showCharacter:"thoth",
		conditions:{
			player:{
				status:"follower",
				camp:"main",
			},
			thoth:{
				status:"follower",
				pregnancy:{">=":50},
				impregnator:{isChar:"player"}
			}			
		},
		title:"Thoth Come",
		text:`{{thoth.name}) come to you with hand rubbing belly.</p>\
					<p>"Look {{player.maleName}}," {{thoth.heshe}} say, "I going to have baby, and you the father. Hurry and become clanfather again, so you can be good father to new son.</p>`
	},
	pregnancy:{
		hook:"round",
		sole:true,
		interrupt:true,
		once:true,
		type:"text",
		chance:0.2,
		showCharacter:"thoth",
		conditions:{
			player:{
				status:"follower",
				camp:"main",
			},
			story:{
				visited:['4'],
			},
			thoth:{
				status:"follower",
				pregnancy:{">=":40},
				impregnator:{notChar:"player"}
					
			}
		},
		title:"Thoth Come",
		text:`<p>"Do you see my belly, {{player.name}}? {{thoth.impregnator.name}} put baby in me.</p>\
				<p>"If you were actually man, that could have been you, but you not. {{#if player.pregnancy}}You just woman, with own baby in belly.{{else}}How long until {{leader.name}} put baby in you?{{/if}}</p>\
				<p>"That your place now, {{leader.name}}. You clan mother, just like me. I bet you happier with baby suckling from milky breast than you ever were as clan father anyway."</p>`
		
	}
	
}
loadStory(thothStory,"thothStory","start");
