/* Copyright 2012 tuatha */
/* This function was originally written by Tuatha for the game Persephone.   */
/* After Tuatha left the TF Games Site community, the code was given to      */
/* Narse.  If you use this, you should acknowledge Tuatha for making it and  */
/* Narse for sharing it. Some other people did some bug fixes and other      */
/* modifications, but they make no claims and do not require attributions.   */
/*                                                                           */
		function drawfigure(canvasname, avatar) {


			function shadeCylinder(context, x, y, wid, hei, clr) {
				
				var gradient = context.createLinearGradient(x, y, x + wid, y);
				gradient.addColorStop(0, clr);
				gradient.addColorStop(0.25, $.xcolor.lighten(clr, 0.75));
				gradient.addColorStop(0.5, clr);
				gradient.addColorStop(0.75, $.xcolor.darken(clr, 0.33));
				gradient.addColorStop(1, clr);

				context.fillStyle = gradient;
				context.fill();
			}
			function drawEllipseByCenter(ctx, cx, cy, w, h) {
				drawEllipse(ctx, cx - w/2.0, cy - h/2.0, w, h);
			}

			function drawEllipse(ctx, x, y, w, h)
			{
				var kappa = 0.5522848,
						ox = (w / 2) * kappa, // control point offset horizontal
						oy = (h / 2) * kappa, // control point offset vertical
						xe = x + w,           // x-end
						ye = y + h,           // y-end
						xm = x + w / 2,       // x-middle
						ym = y + h / 2;       // y-middle

				ctx.beginPath();
				ctx.moveTo(x, ym);
				ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
				ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
				ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
				ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
				//ctx.closePath(); // not used correctly, see comments (use to close off open path)
				ctx.stroke();
			}

			function drawNippleRings(ctx, bsize, ypos)
			{
				ctx.strokeStyle = skin > 28 && skin < 100 ? SKINCB : "black";
				drawNippleRingsSingle(ctx, bsize, ypos, 0, 3);
				ctx.stroke();
				ctx.strokeStyle = "grey";
				drawNippleRingsSingle(ctx, bsize, ypos, 0.25, 1);
				ctx.stroke();
			}
			
			function drawNippleRingsSingle(ctx, bsize, ypos, offset, wid)
			{
				ctx.beginPath();
				ctx.lineWidth = wid;
				var xpos = bLeft ? -1 * offset : offset;
				
				/*Nipples*/
				var a = bsize;
				if (bsize >= 11) {
					if (bsize < 20) a = bsize - 11;
					else a = bsize-20;
				}
				a = a * 0.9;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var x = 0;
				if (shoulders < 10) x=shoulders * 6.3;
				else if (shoulders > 20) x = 33;
				else x = 73 - (shoulders * 2);
				var y = nipples / 3.5;
				if (y < 2) y = 2;
				var z = 18 / 3.5;
				
				if (bsize < 11) {
					xpos = 60 + (x / 10) - (e + (e / 2)) + xpos;
					ypos = 113 + b + e - (x / 3) + ypos + z/2 + y/4 + offset;
				} else if (bsize < 20) {
					xpos = 60.01 + (x / 10) - (b + (nipples / 10)) + xpos;
					ypos = 116.94 + a + d + (nipples / 10) - (x / 3) + ypos + z/2 + y/4 + offset;
				} else {
					xpos = 55.96 + (x / 10) - (c + (nipples / 10)) + xpos;
					ypos = 126.66 + (nipples / 10) + b - (x / 3) + ypos + z/2 + y/4 + offset;
				}
				
				ctx.arc(xpos, ypos, z, 1.6 * Math.PI,	1.4 * Math.PI, false);
			}
			
			function drawCollar(ctx)
			{
				ctx.strokeStyle = "black";
				if (avatar.items.collar == 1) ctx.fillStyle = "gold";
				else if (avatar.items.collar == 2) ctx.fillStyle = "copper";
				else ctx.fillStyle = "bronze";

				ctx.beginPath();
				ctx.lineWidth = 1.5;
				
				/*Collar*/
				var a = shoulders;
				if (a >= 11) {
					a = shoulders - 11;
					if (shoulders > 20) a = 9;
				}
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var f = a * 2;
				var y = 6;
				if (a < 11) {
					ctx.moveTo(60 + e + b + d, 58 - b + y);
					ctx.quadraticCurveTo(65 + e + b + d, 65 - b + y, 78, 65 - b + y);
					ctx.lineTo(78, 68 - b + y);
				} else {
					ctx.moveTo(69, 53 + y);
					ctx.quadraticCurveTo(74, 60 + y, 78, 74 + y);
					ctx.lineTo(78, 77 + y);
				}
				y += 3;
				if (a < 11) {
					ctx.quadraticCurveTo(65 + e + b + d, 65 - b + y, 60 + e + b + d, 58 - b + y);
					ctx.lineTo(60 + e + b + d, 58 - b + y - 3);
				} else {
					ctx.quadraticCurveTo(74, 60 + y, 69, 53 + y);
					ctx.lineTo(69, 53 + y - 3);
				}
				
				ctx.stroke();
				ctx.fill();
				ctx.beginPath();
				ctx.lineWidth = 0.5;
				ctx.fillStyle = avatar == player ? "blue" : "red";
				if (a < 11) ctx.arc(78, 63 - b + y, 2, 0, 2 * Math.PI, false);
				else ctx.arc(78, 72 + y, 2, 0, 2 * Math.PI, false);
				ctx.stroke();
				ctx.fill();
			}
			
			function drawHeadBand(ctx)
			{
				ctx.strokeStyle = "black";
				if (avatar.items.headband == 1) ctx.fillStyle = "silver";
				else if (avatar.items.headband == 2) ctx.fillStyle = "gold";
				else ctx.fillStyle = "copper";

				ctx.beginPath();
				ctx.lineWidth = 1.5;
				
				/*  Head Band */
				var a = face;
				if (a >= 11) {
					a = face - 11;
					if (face > 20) a = 9;
				}
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var y = 14;
				
				if (a < 11) {
					ctx.moveTo(59, 5 + c + y);
					ctx.quadraticCurveTo(64, 7 + c + y, 79, 7 + c + y);
					ctx.lineTo(79, 7 + c + y + 2);
				} else {
					ctx.moveTo(59 + d, 8.4 + e + y);
					ctx.quadraticCurveTo(64, 10.4 + c + y, 78, 8.4 + e + y);
					ctx.lineTo(79, 8.4 + e + y + 2);
				}
				y += 2;
				if (a < 11) {
					ctx.quadraticCurveTo(64, 7 + c + y, 59, 5 + c + y);
					ctx.lineTo(59, 5 + c + y - 2);
				} else {
					ctx.quadraticCurveTo(64, 10.4 + c + y, 59 + d, 8.4 + e + y);
					ctx.lineTo(59 + d, 8.4 + e + y - 2);
				}
				ctx.stroke();
				ctx.fill();
				ctx.beginPath();
				if (avatar.items.headband == 1) ctx.strokeStyle = "silver";
				else if (avatar.items.headband == 2) ctx.strokeStyle = "gold";
				else ctx.strokeStyle = "copper";
				ctx.lineWidth = 2;
				y -= 2;
				if (a < 11) {
					ctx.moveTo(79, 7 + c + y);
					ctx.lineTo(79, 7 + c + y + 2);
				} else {
					ctx.moveTo(78, 8.4 + e + y);
					ctx.lineTo(79, 8.4 + e + y + 2);
				}
				ctx.stroke();
			}
			
			function drawBellyButtonStud(ctx)
			{
				/*Belly Button Stud*/
				
				var a = 21 - waist;
				
				ctx.beginPath();
				ctx.lineWidth = 0.5;
				ctx.fillStyle = avatar == player ? "blue" : "red";
				ctx.strokeStyle = "black";
				
				ctx.arc(80, 162 + a/5, 3, 0, 2 * Math.PI, false);
				ctx.stroke();
				ctx.fill();
			}
			
			function drawClitCockRing(ctx, rot, size, cock)
			{
				ctx.strokeStyle = skin > 28 && skin < 100 ? SKINCB : "black";
				drawClitCockRingSingle(ctx, rot, size, cock, 0, 3);
				ctx.stroke();
				ctx.strokeStyle = "grey";
				drawClitCockRingSingle(ctx, rot, size, cock, 0.25, 1);
				ctx.stroke();
			}
			function drawClitCockRingSingle(ctx, rot, size, cock, offset, wid)
			{
				ctx.save();
				var erect = avatar.desire > 50 && cock === true;
				var xoff = 80;
				var yoff = 215;
				if (erect) yoff = yoff - 12;
				ctx.translate(xoff - (rot / 3), yoff);
				if (erect) ctx.scale(1, -1);
				ctx.rotate(rot*Math.PI/180);
				ctx.beginPath();
				
				var ap = size;
				if (cock) {
					if (avatar.isFutanari() && size > 10) ap = 11;
					ap -= avatar.Mods.cock;
				}
				var a = (21 - ap) / 13;
				if (a < 1) a = 1;
				else if (a > 2) a = 2;
				ctx.lineWidth = 2;
				
				// Sizings
				a = ap;
				a = a/1.15;
				var b = a / 2;
				var c = a / 7;
				var d = a / 5;
				var l = avatar.Mods.cock;
				var e;
				if (cock) e = a / (5 + (l / 2)); // width
				else e = a / 10;
								
				ctx.fillStyle = LIPCOLOR;
				ctx.strokeStyle = LIPCOLOR;
				ctx.beginPath();
				
				var xpos;
				var ypos;
				if (cock) {
					if (ap < 11) {
						xpos = 75 + d;
						xpos += (84 - (d + e) - xpos) / 2 - 0.5;
						ypos = 231 - (a + b) + 1;
						ypos += (241 - (a + b + b) + l - ypos) / 2;
						//ctx.arc(75 + d - (xoff + (84 - (d + e) - (75+d)) / 2 - 0.5),
						//				230 + f - (a + b) + 1 - yoff + (240 + f - (a + b + b) + l - (230+f - (a + b) + 1)) / 2, 4, 1.6 * Math.PI,	1.4 * Math.PI, false);
					} else {
						xpos = 76.7 + d - 0.5;
						ypos = 235 - (a + a + d);
					}
				} else {
					a = testes - 10;
					if (waist < 0) a += waist;
					if (a < 0) a = 0;
					b = a / 2;
					c = 0;
					if (legs > 10 && legs <= 20) c = (legs - 10) / 10;
					else if (legs > 20) c = 10 / 10;
					xpos = 79 + c - 1;
					ypos = 205 - b / 2;
				}
				ctx.arc(xpos - xoff, ypos - yoff, 4, 1.6 * Math.PI, 1.4 * Math.PI, false);
	
				ctx.stroke();
				ctx.restore();
			}
			
			function drawBracelet(ctx, left, off)
			{
				if (bLeft && left) return;
				ctx.beginPath();
				ctx.strokeStyle = "gold";
				ctx.lineWidth = 3;
				
				var a = shoulders;
				if (a >= 11) {
					a = shoulders - 11;
					if (shoulders > 20) a = 9;
				}
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var g = 0;
				var x = 0;
				var y = 0;
				var z = 0;
				if (shoulders < 11) {
					ctx.moveTo(9 + d + d - g, 211 - (a + d + b) - off);
					
					ctx.lineTo(19 + d - g, 202 - (b + c) - off);
				} else {
					if ((hips * 3) + (ass * 1.5) > 40) g = ((((hips * 3) + (ass * 1.5)) - 40) / 5);
					if (7 - legs > 0) g += (7 - legs);
					g *= a / 9;
					if (g > 13.5) g = 13.5;
					g += ((20 - waist) / 10) * (a / 9);
					z = g / 2;
					x = a;
					y = a / 2;
					var m = 0;
					if (shoulders > 10) m = (shoulders - 10) / 20;
					ctx.moveTo(14 + x + c + b - g + off / 2, 193 - z - off);

					ctx.lineTo(23 + x + y + c - (g + (z/2)) + off / 2, 194 + a + d - z - off);
				}
				ctx.stroke();
				
				ctx.beginPath();
				ctx.lineWidth = 0.5;
				ctx.fillStyle = "red";
				if (shoulders < 11) ctx.arc(19 + d - g, 202 - (b + c) - off, 2, 0, 2 * Math.PI, false);
				else ctx.arc(23 + x + y + c - (g + (z/2)) + off /2, 194 + a + d - z - off, 2, 0, 2 * Math.PI, false);
				ctx.stroke();
				ctx.fill();
			}
	
			function drawGenitals(ctx)
			{
				ctx.strokeStyle = SKINCB;
				ctx.fillStyle = SKINC;
				drawTestes(ctx);
				var hasc = avatar.hasCock();
				
				var ev = avatar.physique.gentialscnt - (Math.floor(avatar.physique.gentialscnt / 2) * 2);
				for (var i = avatar.physique.gentialscnt; i > 0; i--) {
					var evi = i - (Math.floor(i / 2) * 2);
					var ab = (evi == 1) ? 10 : -10;
					var ang = ev == 1 ? ab * Math.floor(i / 2) : ab * Math.floor((i + 1) / 2);
					drawPenis(ctx, ang, penis, hasc);
					if (avatar.items.clitcockring > 0) drawClitCockRing(ctx, ang, penis, hasc);
				}
			}
			
			function drawTestes(ctx)
			{
				ctx.beginPath();
				
				var a = (21 - testes) / 13;
				if (a < 1) a = 1;
				ctx.lineWidth = a;
				
				/*Testes*/
				a = testes;
				a = a/1.4;
				var b = a / 2;  //size
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var f = 1;
				var z;
				
				if (testes < 11)
				{
					// Balls
					ctx.lineWidth = 1.5;
					z = 0;
					if (waist < 0) z = waist * -0.15;
					ctx.moveTo(76 - d, 202 + f + z);
					// left
					ctx.bezierCurveTo(75 + b,
														204 + z + f - e,
														67 + a + b,
														215 + z + f - (a + b),
														70 + (c * 3),
														222 + z + f - (a + a + b)
														);
					ctx.quadraticCurveTo(74 + b,
															 225 + z + f - (a + a + b + c),
															 78 + e,
															 220 + z + f - (a + b + c) - c
															 );
					// right
					ctx.quadraticCurveTo(83 - a,
															 224 + z + f - (a + a + b + d) - b,
															 87 - a,
															 219 + z + f - (a + b + d)
															 );
					ctx.bezierCurveTo(87 - (b + c),
														214 + z + f - (a + d),
														84 - b,
														203 + z + f - e,
														83 + d,
														204 + z + f);
					// central line
					ctx.moveTo(78 + e, 220 + z + f - (a + b + c) - c);
					ctx.quadraticCurveTo(81 - d,
															 218 + z + f - (a + a + a) + a,
															 79,
															 212 + z + f - a + a);
					
				}	else {
					
					// Pussy
					if (testes>11) ctx.lineWidth = (testes-10) / 4.5;
					if (ctx.lineWidth < 1) ctx.lineWidth = 1;
					if (ctx.lineWidth > 2) ctx.lineWidth = 2;
					a = testes - 10;
					if (waist < 0) a += waist;
					if (a < 0) a = 0;
					b = a / 2;
					d = a / 5;
					e = a / 10;
					c = 0;
					z = 0;
					if (legs > 10 && legs <= 20) c = (legs - 10) / 10;
					else if (legs > 20) c = 10 / 10;
					ctx.moveTo(79, 204 + (f / 1.2));
					ctx.quadraticCurveTo(79 + c, 204 + (f / 1.2) - d, 79 + c, 204 + (f / 1.2) - b);
				}
				
				ctx.fill();
				ctx.stroke();
			}
			
			function drawPenis(ctx, rot, size, cock)
			{
				ctx.save();
				var erect = avatar.desire > 50 && cock === true;
				var xoff = 80;
				var yoff = 215;
				if (erect) yoff = yoff - 12;
				ctx.translate(xoff - (rot / 3), yoff);
				if (erect) ctx.scale(1, -1);
				ctx.rotate(rot*Math.PI/180);
				ctx.beginPath();
				
				var ap = size;
				if (cock) {
					if (avatar.isFutanari() && size > 10) ap = 11;
					ap -= avatar.Mods.cock;
				}
				var a = (21 - ap) / 13;
				if (a < 1) a = 1;
				else if (a > 2) a = 2;
				ctx.lineWidth = a;
				
				// Sizings
				a = ap;
				a = a/1.15;
				var b = a / 2;
				var c = a / 7;
				var d = a / 5;
				var l = avatar.Mods.cock;
				var e;
				if (cock) e = a / (5 + (l / 2)); // width

				else e = a / 10;
				var f = 1;
				var y = 0;
				var g = 0;
				
				/*Penis*/
				if (cock === true) {
					ctx.moveTo(75 + e - xoff, 200 + f - yoff);
					ctx.quadraticCurveTo(72 + e - xoff, 202 + f + l - yoff,
															 73 + d + e - xoff, 230 + f - (a + b) + l - yoff);
					ctx.lineTo(84 - (d + e) - xoff, 230 + f - (a + b) + l - yoff);
					ctx.quadraticCurveTo(83 - d - xoff, 202 + f + l - yoff,
															 83 - d - xoff, 200 + f - yoff);
					shadeCylinder(ctx, 75+e - xoff, 200+f - yoff, 84 - (d + e) - (75+e), 230 + f - (a + b) + l - (200+f), SKINC);
				} else {
					x = 0;
					ctx.moveTo(75 + e - xoff, 200 + f - yoff);
					ctx.quadraticCurveTo(76 + d - xoff, 202 + f - (d + d) - yoff, 73 + d + e - xoff, 234 + f - (a + a + d) - yoff);
					ctx.lineTo(84 - (d + e) - xoff, 234 + f - (a + a + d) - yoff);
					ctx.quadraticCurveTo(83 - d - xoff, 202 + f - (d + d) - yoff, 84 - d - xoff, 200 + f - yoff);
					ctx.fill();
				}
				ctx.stroke();
				
				/*Penis Head*/
				ctx.fillStyle = LIPCOLOR;
				ctx.strokeStyle = LIPCOLOR;
				ctx.beginPath();
				
				if (ap < 11) {
					ctx.moveTo(75 + d - xoff, 230 + f - (a + b) + l - yoff);
					ctx.lineTo(84 - (d + e) - xoff, 230 - (a + b) + l - yoff);
					ctx.quadraticCurveTo(78 + d - xoff, 240 + f - (a + b + b) + l - yoff, 73 + d - xoff, 230 + f - (a + b) + l - yoff);
					shadeCylinder(ctx, 75 + d - xoff, 230 + f - (a + b) + 1 - yoff, 84 - (d + e) - (75+d), 240 + f - (a + b + b) + l - (230+f - (a + b) + 1), LIPCOLOR);

				} else if (ap<20) {
					ctx.moveTo(76.7 + d - xoff, 234 + f - (a + a + d) - yoff);
					ctx.lineTo(84 - (d + e) - xoff, 234 - (a + a + d) - yoff);
					ctx.quadraticCurveTo(79 - xoff, 241 + f - (a + b + b + d + d) - yoff, 72 + d + e - xoff, 234 + f - (a + a + d) - yoff);
					ctx.fill();
				}
				ctx.stroke();
				ctx.restore();
			}
			
			function drawPecs(ctx)
			{
				ctx.beginPath();
				
				/*Pecs*/
				var a = shoulders;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var x = shoulders * 1.43;
				var y = shoulders * 0.43;
				var z = (breasts*((11-shoulders)*2))/20;
				
				if (shoulders <= 10) {
					ctx.lineWidth = (11-shoulders) / 10;
					ctx.moveTo(33 + x + y + (z/4), 95 + b + (z / 3));
					ctx.quadraticCurveTo(30 + x + y + c + c + (z / 4), 105 + z - y, 50 + c + y + (z / 4), 120 + z - (a + b + y));
					if (breasts < 14) ctx.quadraticCurveTo(63 + x - (c + (z / 2)), 120 + (z * 1.3) - (a + b + y), 78 - (a + c + (z / 4)), 117 + z + (z / 4) - (a + c + y));
				}
			}
			
			function drawAbs(ctx)
			{
				ctx.beginPath();
				
				/*Abs*/
				
				if (shoulders < 11) {
					var a = shoulders;
					var b = a / 2;
					var c = a / 3;
					var d = a / 5;
					var e = a / 10;
					var x = shoulders * 1.43;
					var y = shoulders * 0.43;
					var z = (breasts * ((11 - shoulders) * 2)) / 20;
				
					ctx.lineWidth = (12 - shoulders) / 12;
					if (waist < 1) ctx.lineWidth = 0.00001;
					else if (waist < 10 && ctx.lineWidth > waist / 10) ctx.lineWidth = waist / 10;
					ctx.moveTo(79, 125 - a);
					ctx.quadraticCurveTo(63 + c, 132 - a, 60 + c, 140 - a);
					ctx.quadraticCurveTo(62 + c, 146 - a, 63 + c, 160);
					
				}
			}
			
			function drawBelly(ctx)
			{
				ctx.beginPath();
				
				ctx.strokeStyle = SKINCB;
				ctx.fillStyle = SKINC;
				
				/*Belly*/
				var z = legs - 10;
				if (z < 0) z = 0;
				var a = ((waist - 10) + z) / 2;
				if (a < 0) a = 0;
				var b = a;
				if (legs >= 20) b = a / 5;
				else if (legs >= 19) b = a / 5;
				else if (legs >= 18) b = a / 2.8;
				else if (legs >= 17) b = a / 2.2;
				else if (legs >= 16) b = a / 1.8;
				else if (legs >= 15) b = a / 1.6;
				else if (legs >= 14) b = a / 1.5;
				else if (legs >= 13) b = a / 1.3;
				else if (legs >= 12) b = a / 1.2;
				else if (legs >= 11) b = a / 1.1;
				var c = hips / 4;
				
				ctx.lineWidth = 1;
				if (waist < -9) ctx.lineWidth = 0.00001;
				else if (waist < 0) ctx.lineWidth = (10 + waist) / 10;
				ctx.moveTo(85 + b + c, 200 - a);
				ctx.quadraticCurveTo(79, 209 + a, 74 - (b + c), 200 - a);
			}
			
			function drawPregs(ctx){
				ctx.beginPath();
				
				//Pregnancy
				
				if (waist<0){/*Upper Waist*/
					ctx.lineWidth = (waist * -1) / 10;
					if (ctx.lineWidth < 1) ctx.lineWidth = 1;
					else if (ctx.lineWidth > 1.8) ctx.lineWidth = 1.8;
					
					var a = shoulders;
					var b = a / 2;
					var c = a / 3;
					var d = a / 5;
					var e = a / 10;
					var f = a * 2;
					var g = 0;
					var x = 0;
					var y = 0;
					var z = 0;
					var h = 0;
					if (waist < 0) h = waist * -0.5;
					if (a < 11){
						ctx.moveTo(47 + (c * 3) - (h / 4), 149 - (h + a));
					}
					else{
						a = shoulders - 11;
						if (shoulders > 20) a = 9;
						a = a * 0.9;
						b = a / 2;
						c = a / 3;
						d = a / 5;
						e = a / 10;
						f = a * 2;
						g = 0;
						if ((hips * 3) + ass > 70) g = (a / 9) * ((((hips * 3) + ass) - 70) / 5);
						if (7 - legs > 0) g += (7 - legs);
						if (g > 14) g = 14;
						z = g / 2;
						x = a;
						y = x / 2;
						var m = 0;
						if (shoulders > 20) m = (shoulders - 20) / 10;
						ctx.moveTo(56 - (d + (h / 4)), 138 - (b + h));
					}
					
					
					/*Waist*/
					a = 0;
					if (shoulders < 11) {
						a = (11 - shoulders);
						if (waist < 1) {
							a += waist / 4;
							if (a < 0) a = 0;
						}
					}
					b = (hips + ass) * 3;
					if (ass > 20) b += (ass - 20) * 8;
					c = waist / 3;
					if (c < -5) c = -5;
					d = hips / 2;
					if (hips > 20) d = 10;
					f = 0;
					
					y = b;
					if (y > 100) y = 100;
					ctx.bezierCurveTo(53 + c - ((a / 1.2) + (y / 40.7) + (f / 5) + (b / 60)), 145 + (c / 5) + (y / 27.5), 52 + c - ((a / 1.6) + (f / 2) + (b / 40)), 161 - ((y / 6.875)),50.3 + (c / 2) - ((a / 2) + (b / 20) + (f / 2)), 175 - ((y / 22) + d));
					
					a = (hips + ass) / 2;
					if (a > 25) a = 25;
					if (legs < 5) a += 5 - legs;
					b = a / 2;
					c = a / 3;
					d = a / 5;
					e = a / 10;
					g = hips / 20;
					var h = waist * -1.7;
					var i = 0;
					var j = 0.0001;
					if (legs > 11) j = ((legs - 11) / 2) - ((21 - hips) / 4);
					if (j < 0.0001) j = 0.0001;
					if (legs > 11) i = (legs - 11) * 2;
					if (i > 9) i = 9;
					if (ass > hips) g = ass / 20;
					if (g > 1) g = 1;
					x = ass / 5;
					y = ass / 15;
					z = 0;
					if (legs < 11) z = (11 - legs) / 2;
					if (a > 15 && z > 20 - a) z = 20 - a;
					ctx.quadraticCurveTo(65 - ((ass / 8) + (hips / 12) + (h / 2) + f), 197 + f + f, 79, 206);
				}
				
				return ctx;
			}
			
			function drawBellyButton(ctx)
			{
				ctx.beginPath();
				
				/*BellyButton*/
				
				var a = 21 - waist;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				
				ctx.moveTo(80,160 + d);
				ctx.quadraticCurveTo(82, 162 + d, 80, 163 + d);
				
				ctx.stroke();
				
				if (avatar.items.bellybuttonstud > 0) drawBellyButtonStud(ctx);
			}
			
			function drawHips(ctx)
			{
				ctx.beginPath();
				
				//Hips
				
				if (legs <= 10) {
					var a = ((hips / 1) + ((10 - legs) / 4)) / 3;
					if (shoulders < 10) a -= shoulders / 1.2;
					else a -= 8.33;
					if (legs < 5) a += 5 - legs;
					var b = a / 2;
					var c = a / 3;
					var d = a / 5;
					var e = a / 10;
					var g = hips / 20;
					var h = 0;
					var i = 0;
					var j = 0.0001;
					if (legs > 11) j = ((legs - 11) / 2) - ((21 - hips) / 4);
					if (j < 0.0001) j = 0.0001;
					if (legs > 11) i = (legs - 11) * 2;
					if (i > 9) i = 9;
					if (waist < 11) h = (21 - waist) / 10;
					if (ass > hips) g = ass / 20;
					if (g > 1) g = 1;
					var x = ass / 5;
					var y = ass / 15;
					var z = 0;
					if (legs < 11) z = (11 - legs) / 2;
					
					ctx.lineWidth = 1;
					if (legs > 5) ctx.lineWidth = (11 - legs) / 6;
					if (waist < -9) ctx.lineWidth = 0.00001;
					else if (waist < 0 && ctx.lineWidth > (10 + waist) / 10) ctx.lineWidth = (10 + waist) / 10;
					ctx.moveTo(46+j - (b + d + (y / 3)), 174 + j - ((b / 2) + (y * 0.4) + g));
					ctx.quadraticCurveTo(55 + (hips / 4) - (b + d + (y / 3)), 180+h + (i / 2) - ((b / 2) + (y * 0.4) + g + (j / 1.2)), 60 + (hips / 4) - (b + d + (y / 3)), 180 + (i / 2) - ((b / 2) + (y * 0.4) + g));
					ctx.quadraticCurveTo(60 + (hips / 4) - (b + d + (y / 3)), 185 - ((i / 7) + (b / 2) + (y * 0.4) + g), 65 + (hips / 4) - ((i / 2) + b + d + (y / 3)), 195 - (i + (i / 4) + (b / 2) + (y * 0.4) + g));
				}
			}
			
			function drawLegMuscles(ctx)
			{
				ctx.beginPath();
				
				if (legs <= 8) {
					ctx.lineWidth = (9 - legs) / 9;
					
					var a = legs;
					var b = a / 2;
					var d = a / 5;
					var e = a / 10;
					ctx.moveTo(61 + e, 276 - a);
					ctx.quadraticCurveTo(67 - d, 260, 67 - d, 236);
					
					ctx.moveTo(61 + e, 276 - a);
					ctx.quadraticCurveTo(58 - e, 283 + b, 58 - e, 290 + b);
				}
			}
			
			function drawBoobs(ctx, bsize, ypos, row)
			{
				ctx.strokeStyle = SKINCB;
				ctx.fillStyle = SKINC;
				ctx.lineWidth = 1;
				drawBreastBlock(ctx, bsize, ypos);
				ctx.fill();
				drawBreasts(ctx, bsize, ypos);
				ctx.fill();
				drawBreasts(ctx, bsize, ypos);
				ctx.stroke();
				ctx.lineWidth = 1;
				
				ctx.fillStyle = LIPCOLOR;
				ctx.strokeStyle = LIPCOLOR;
				drawAreola(ctx, bsize, ypos);
				ctx.fill();
				drawAreola(ctx, bsize, ypos);
				ctx.stroke();
				ctx.strokeStyle = NIPPLESHADOW;
				drawNipples(ctx, bsize, ypos);
				ctx.stroke();
				if (avatar.items.nipplerings > row) drawNippleRings(ctx, bsize, ypos);
			}
			
			function drawBreasts(ctx, bsize, ypos)
			{
				ctx.beginPath();
				
				ctx.lineWidth = bsize / 13;
				if (ctx.lineWidth < 1) ctx.lineWidth = 1;
				else if (ctx.lineWidth > 1.8) ctx.lineWidth = 1.8;
				
				/*Breasts*/
				var a = bsize * 1.5;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var x = 0;
				if (shoulders < 10) x = shoulders * 6.3;
				else if (shoulders > 20) x = 33;
				else x = 73 - (shoulders * 2);
				
				if (bsize < 2) return;
				if (bsize < 11) {
					ctx.moveTo(60 + (x / 10) - b, 110 - (c + (x / 3)) + ypos);
					ctx.bezierCurveTo(60 + (x / 10) - (b + c), 110 - (d + (x / 3)) + ypos,
														60 + (x / 10) - (a + c), 110 + (a - (x / 3)) + ypos,
														60 + (x / 10) - d, 110 + (a + c - (x / 3)) + ypos
														);
					ctx.bezierCurveTo(60 + b, 110 + (a + c + e - (x / 3)) + ypos,
														60 + (b + c), 110 + (a + d + (e / 2) - (x / 3)) + ypos,
														60 + (b + c), 110 + (a + d + (e / 2) - (x / 3)) + ypos
														);
				} else if (bsize < 20) {
					a = (bsize - 11) * 1.5;
					b = a / 2;
					c = a / 3;
					d = a / 5;
					e = a / 10;
					ctx.moveTo(51.75 + (x / 10) - (e / 2), 104.5 - (x / 3) + ypos);
					ctx.bezierCurveTo(46.25 + (x / 10) - (e / 2), 106.7 + b - (x / 3) + ypos,
														38 + (x / 10) - d, 126.5 + d + d - (x / 3) + ypos,
														56.7 + (x / 10) - d, 132 + b + c - (x / 3) + ypos
														);
					var z = 73.75 + b;
					if (z > 78) z = 78;
					ctx.bezierCurveTo(68.25 - e, 133.65 + a - (x / 3) + ypos,
														73.75 - e, 130.625 + a - (x / 3) + ypos,
														z, 130.625 + b + d - (x / 3) + ypos
														);
				} else {
					a = (bsize - 20) / 2;
					b = a / 2;
					c = a / 3;
					d = a / 5;
					e = a / 10;
					f = a * 1.5;
					if (f > 20) f = 20;
					var g = a / 2;
					if (g > 30) g = 30;
					ctx.moveTo(51.075 + (x / 10), 104.5 - (x / 3) + ypos);
					ctx.bezierCurveTo(45.575 - a + (x / 10), 113.45 + a - (x / 3) + ypos,
														35.5 - a + (x / 10), 131.9 + a - (x / 3) + f + ypos,
														54 - a + (x / 10) + d, 143.25 + a + e - (x / 3) + f + ypos + d
														);
					ctx.bezierCurveTo(66.9 - a/2, 147.15 + a + a/2 - (x / 3) + f + ypos,
														72.4 - a/2 + f, 144.125 + a + a/2 - (x / 3) + (f * 1.5) + ypos,
														79.5, 140.075 + a - (x / 3) + ypos - g
														);
				}
			}
			
			function drawBreastBlock(ctx, bsize, ypos)
			{
				ctx.beginPath();
				
				var a = bsize*1.5;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var x = 0;
				if (shoulders < 10) x = shoulders * 6.3;
				else if (shoulders > 20) x = 33;
				else x = 73 - (shoulders * 2);
				
				if (bsize<2) return;
				if (bsize < 11) {
					ctx.moveTo(60 + (x / 10) - (b), 110 - (c + (x / 3)) + ypos);
					ctx.bezierCurveTo(60 + (x / 10) - (b + c), 110 - (d + (x / 3)) + ypos,
														60 + (x / 10) - (a + c), 110 + (a - (x / 3)) + ypos,
														60 + (x / 10) - d, 110 + (a + c - (x / 3)) + ypos
														);
					ctx.bezierCurveTo(60 + (b), 110 + (a + c + e - (x / 3)) + ypos,
														60 + (b + c), 110 + (a + d + (e / 2) - (x / 3)) + ypos,
														79,	110 + (a + d + (e / 2) - (x / 3)) + ypos
														);
					ctx.lineTo(79,110);
				} else if (bsize < 20) {
					a = (bsize - 11) * 1.5;
					b = a / 2;
					c = a / 3;
					d = a / 5;
					e = a / 10;
					ctx.moveTo(51.75 + (x / 10) - (e / 2), 104.5 - (x / 3) + ypos);
					ctx.bezierCurveTo(46.25 + (x / 10) - (e / 2), 106.7 + b - (x / 3) + ypos,
														38 + (x / 10) - d, 126.5 + d + d - (x / 3) + ypos,
														56.7 + (x / 10) - d, 132 + b + c - (x / 3) + ypos
														);
					ctx.bezierCurveTo(68.25 - e, 133.65 + a - (x / 3) + ypos,
														73.75 - e, 130.625 + a - (x / 3) + ypos,
														79, 130.625 + b + d - (x / 3) + ypos
														);
					ctx.lineTo(79,110 + ypos);
				} else {
					a = (bsize-20)/2;
					//a = (bsize-11)*1.5;
					b = a / 2;
					c = a / 3;
					d = a / 5;
					e = a / 10;
					f = a * 2;
					if (f > 10) f = 10;
					ctx.moveTo(51.075 + (x / 10),104.5 - (x / 3) + ypos);
					ctx.bezierCurveTo(45.575 + (x / 10), 113.45 - (x / 3) + ypos,
														35.5 + (x / 10), 131.9 - (x / 3) + f + ypos,
														54 + (x / 10),143.25 - (x / 3) + f + ypos
														);
					ctx.bezierCurveTo(66.9,147.15 - (x / 3) + f + ypos,
														72.4, 144.125 - (x / 3) + f + f + ypos,
														79, 140.075 - (x / 3) + ypos
														);
					ctx.lineTo(79,110 + ypos);
				}
			}
			
			function drawCleavage(ctx) {
				ctx.beginPath();
				
				ctx.lineWidth = breasts/15;
				if (ctx.lineWidth < 1) ctx.lineWidth = 1;
				else if (ctx.lineWidth > 1.5) ctx.lineWidth = 1.5;
				
				/*Cleavage*/
				var a = (breasts - 11) * 1.5;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var f = a / 1.2;
				var x = 0;
				if (shoulders < 10) x = shoulders * 6.3;
				else if (shoulders > 20) x = 33;
				else x = 73 - (shoulders * 2);
				
				if (breasts < 14) return;
				else if (breasts < 20) {
					ctx.moveTo(78.5, 121 + b + d - (x / 3));
					ctx.bezierCurveTo(79.5, 118 + b - (x / 3),
														79.5, 108 + b - (x / 3),
														78 - (e / 2), 105 + c - (x / 3)
														);
					ctx.moveTo(79.5, 121 + b + d - (x / 3));
					ctx.bezierCurveTo(78.5, 118 + b - (x / 3),
														78.5, 108 + b - (x / 3),
														80 + (e / 2), 105 + c - (x / 3)
														);
				} else {
					if (breasts >= 20) a = (breasts - 20) / 2;
					var g = a / 2;
					if (g > 30) g = 30;

					ctx.moveTo(78.5, 130.45 - (x / 3));
					ctx.bezierCurveTo(79.5, 124.75 - (x / 3) + f - g,
														79.5, 114.75 - (x / 3),
														77.325, 109.5 - (x / 3)
														);
					ctx.moveTo(79.5,130.45 - (x / 3));
					ctx.bezierCurveTo(78.5, 124.75 - (x / 3) + f - g,
														78.5, 114.75 - (x / 3),
														80.675, 109.5 - (x / 3));
				}
				ctx.stroke();
			}
			
			function drawAreola(ctx, bsize, ypos)
			{
				ctx.beginPath();
				
				/*Areola */
				ctx.lineWidth = (nipples - 11) / 7;
				if (ctx.lineWidth < 1) ctx.lineWidth = 1;
				else if (ctx.lineWidth > 1.5) ctx.lineWidth = 1.5;
				var a = bsize;
				a = a * 0.9;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var x = 0;
				if (shoulders < 10) x=shoulders * 6.3;
				else if (shoulders > 20) x = 33;
				else x = 73 - (shoulders * 2);
				var y = nipples / 3;
				if (y < 2) y = 2;
				
				
				if (bsize < 11) ctx.arc(60 + (x / 10) - e, 110 + b + e - (x / 3) + ypos, y, 0, Math.PI + (Math.PI), false);
				else if (bsize < 20) {
					var a = bsize-11;
					a = a * 0.9;
					var b = a / 2;
					var c = a / 3;
					var d = a / 5;
					var e = a / 10;
					ctx.arc(59.01 + (x / 10) - b, 115.94 + a + d - (x / 3) + ypos, y, 0, Math.PI + Math.PI, false);
				} else {
					var a = bsize-20;
					a = a * 0.9;
					var b = a / 2;
					var c = a / 3;
					var d = a / 5;
					var e = a / 10;
					ctx.arc(54.96 + (x / 10) - c, 125.66 + b - (x / 3) + ypos, y, 0 ,Math.PI + Math.PI, false);
				}
			}
			
			function drawNipples(ctx, bsize, ypos)
			{
				ctx.beginPath();
				
				/*Nipples*/
				var a = bsize;
				a = a * 0.9;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var x = 0;
				if (shoulders < 10) x=shoulders * 6.3;
				else if (shoulders > 20) x = 33;
				else x = 73 - (shoulders * 2);
				var y = nipples / 3.5;
				if (y < 2) y = 2;
				
				if (bsize < 11)ctx.arc(60 + (x / 10) - (e + (e / 2)), 111 + b + e - (x / 3) + ypos, y / 2 , 1 - (nipples / 20), 3 + (nipples / 20), false);
				else if (bsize < 20) {
					var a = bsize - 11;
					a = a * 0.9;
					var b = a / 2;
					var c = a / 3;
					var d = a / 5;
					var e = a / 10;
					ctx.arc(60.01 + (x / 10) - (b + (nipples / 10)), 114.94 + a + d + (nipples / 10) - (x / 3) + ypos, y / 2, 1.3 - (nipples / 20) ,3 + (nipples / 20), false);
				} else {
					var a = bsize-20;
					a = a * 0.9;
					var b = a / 2;
					var c = a / 3;
					var d = a / 5;
					var e = a / 10;
					ctx.arc(55.96 + (x / 10) - (c + (nipples / 10)), 124.66 + (nipples / 10) + b - (x / 3) + ypos, y / 2, 1.3 - (nipples / 20), 3 + (nipples / 20), false);
				}
			}
			
			function drawHead(ctx)
			{
				ctx.beginPath();
				
				ctx.lineWidth = (21 - face) / 10;
				if (ctx.lineWidth < 1.4) ctx.lineWidth = 1.4;
				
				/*Face*/
				var a = face;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var earbottom = 37;
				
				if (a < 11) {
					ctx.moveTo(79, 63 - e);
					ctx.quadraticCurveTo(75, 64 - d, 70 + b, 64 - d);
					ctx.quadraticCurveTo(68, 62 - b, 59, 47 - c);
					ctx.lineTo(59, earbottom);
					ctx.bezierCurveTo(56, earbottom, 55, earbottom - 8, 59, earbottom - 10);
					ctx.quadraticCurveTo(59, 5 + c, 79, 5 + c);
				} else {
					var a = face - 11;
					if (face > 20) a = 9;
					var b = a / 2;
					var c = a / 3;
					var d = a / 5;
					var e = a / 10;
					var earbottom = 37;
					var z = 0;
					if (face > 20) {
						z = face - 20;
						z = z / 2;
					}
					ctx.moveTo(79,62 - d);
					ctx.quadraticCurveTo(75 + d + d - (z / 3),62 - d, 75 + d + d - (z / 3), 62 - d);
					ctx.quadraticCurveTo(68 - e, 57 + b - z, 59 + d, 44 - c);
					ctx.lineTo(59 + d, earbottom + c);
					ctx.bezierCurveTo(56 + d, earbottom, 55 + d, earbottom-7, 59 + d, earbottom - 10);
					ctx.quadraticCurveTo(59 + d, 8.4 + e, 79, 8.4 + e);
				}
			}
			
			function drawEyes(ctx)
			{
				ctx.beginPath();
				ctx.lineWidth = 1;
				
				/*Eyes*/
				var a = eyes / 6;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var x = face / 20;
				var y = 27;
				
				ctx.moveTo(73 + x + c, y + 8);//(74.1111,28)
				
				ctx.quadraticCurveTo(69.333 + x,
														 y + 11,
														 64.666 + x,
														 y + 9);	//(69.3333,29,66.666,29)
				ctx.quadraticCurveTo(62.333 + x,
														 y + 8 - b,
														 64.333 + x,
														 y + 7.5 - c);	//(65.333,26.83333,64.333,26.888)
														
				ctx.bezierCurveTo(65.333 + x,
													y + 5.5 - (b + c) - 2,
													71 + x,
													y + 5.5 - (b + c) - 2,
													73.666 + x,
													y + 8.5 - d);	//(65.333,23.222,71,23.2222,72.666,25.888)

				ctx.lineTo(73 + x, y + 8);	//73,28)
			}
			
			function drawIris(ctx)
			{
				ctx.beginPath();
				
				/*Iris*/
				var a = eyes / 5.3;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = eyes / 80;
				var x = face / 20;
				var y = 27;
				
				ctx.moveTo(71.2 + x + e, y + 8);
				ctx.lineTo(67.5 + x - e, y + 8.8);
				ctx.quadraticCurveTo(65.4 + x - e, y + 6 - c, 66.8 + x - e, y + 6 - b);
				ctx.quadraticCurveTo(68.1 + x + e, y + 6 - (b + d), 71.2 + x + e, y + 6 - b);
				ctx.lineTo(71.2 + x + e, y + 8);
			}
			
			function drawLips(ctx)
			{
				ctx.fillStyle = LIPCOLOR;
				ctx.strokeStyle = LIPCOLOR;
				ctx.beginPath();
				
				/*Lips*/
				var a = lips / 2.4;
				if (a < 0.6) a = 0.6;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var y = -0.17;
				
				var ypos = 50;
				ctx.moveTo(79, ypos);
				ctx.quadraticCurveTo(77 + e, ypos - (e * 1.2), 76 - d, ypos - (y + (e / 2)));
				ctx.quadraticCurveTo(79, ypos + 1.1 + d, 82 + d, ypos - (y + (e / 2)));
				ctx.quadraticCurveTo(81 - e, ypos - (e * 1.2), 79, ypos);
				ctx.lineWidth = 2.3 + (lips / 40);
				
				ctx.stroke();
			}
			
			function drawNose(ctx)
			{
				ctx.beginPath();
				
				ctx.strokeStyle = SKINCB;
				ctx.fillStyle = SKINC;
				ctx.lineWidth = (21 - face) / 15;
				if (ctx.lineWidth < 1) ctx.lineWidth = 1;
				
				/*Nose*/
				var a = face;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var y = 23;
				
				if (a < 11) {
					ctx.moveTo(80, y + 8 + e);
					ctx.lineTo(83 - e, y + 20 - e);
					ctx.lineTo(80, y + 22 - e);
				} else{
					var a = face - 11;
					if (face > 20) a = 9;
					var b = a / 2;
					var c = a / 3;
					var d = a / 5;
					var e = a / 10;
					var z = 0;
					if (face > 20) {
						z = face - 20;
						z = z / 10;
					}
					ctx.moveTo(80, y + 9 + e);
					ctx.lineTo(82 - z, y + 19 - (e + z));
					ctx.lineTo(80 - e, y + 20 - z);
				}
				ctx.stroke();
			}
			
			function drawHairBack(ctx)
			{
				if (avatar.physique.hairstyle == 0) return;	// Bald
				
				ctx.fillStyle = HAIRCOLOR;
				ctx.strokeStyle = HAIRCOLORB;
				ctx.beginPath();
				
				/*Hairback*/
				var a = hairlength;
				if (a < 1) a = 1;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				
				ctx.moveTo(61, 26);
				ctx.quadraticCurveTo(60 - (c + e), 26 + (a + b), 60 - (d + e), 26 + (a * 3));
				ctx.quadraticCurveTo(79, 26 + (a * 4), 97 + d + e, 26 + (a * 3));
				ctx.quadraticCurveTo(97 + c + e, 26 + (a + b), 96, 26);
				ctx.lineTo(61,26);

				ctx.fill();
				ctx.stroke();
			}
			
			function drawHairFront(ctx)
			{
				if (avatar.physique.hairstyle == 0) return;	// Bald
				
				ctx.beginPath();
				
				ctx.fillStyle = HAIRCOLOR;
				ctx.strokeStyle = HAIRCOLORB;
				ctx.lineWidth = 1;
				
				/*Hairfront*/
				var a = hairlength;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var x = face / 7;
				
				if (hairlength < 2) {
					var z = (hairlength - 1) * 2;
					if (z > 1) z = 1;
					
					var facea = face - 11;
					if (face < 11) facea = face;
					var faceb = facea / 2;
					var facec = facea / 3;
					var faced = facea / 5;
					var facee = facea / 10;
					
					ctx.moveTo(79,8 + x + x);
					ctx.quadraticCurveTo(55 + (x * 3), 15 + b, 59, 27);
					ctx.quadraticCurveTo(59 + e, 27 + a + b, 59, 24 + (a * 3));
					if (face < 11) {
						ctx.lineTo(59 - a, 27);
						ctx.quadraticCurveTo(59 - (a + a), 5 + facec, 79, 5 + facec - (b + c));
					} else {
						ctx.lineTo(59 + faced - a, 27);
						ctx.quadraticCurveTo(59 + faced - (a + a), 8.4 + facee, 79, 8.4 + facee - (b + c));
					}
				} else {
					ctx.moveTo(79, 8 + x + x);
					if (a > 20) ctx.quadraticCurveTo(55 + (x * 3), 25, 59, 27);
					else ctx.quadraticCurveTo(55 + (x * 3), 15 + b, 59, 27);
					ctx.quadraticCurveTo(59 + e, 27 + a + b, 59, 24 + (a * 3));
					ctx.lineTo(57, 22 + (a * 3));
					ctx.quadraticCurveTo(57 - e, 25 + a + b, 57, 22);
					ctx.quadraticCurveTo(58 + x, 5 + x - (e / 2), 79, 5 + x - (e / 2));
					ctx.lineTo(79, 8 + x + x);
				}
				
				ctx.fill();
				ctx.stroke();
			}
			
			function drawThighLine(ctx)
			{
				ctx.beginPath();
				
				/*Thighline*/
				
				var hipthick = ((hips * 3) + ass) / 4;
				if (hipthick > 14) {
				
					ctx.lineWidth = hipthick / 14;
					
					/*Waist*/
					a = 0;
					if (shoulders < 11) {
						a = (11 - shoulders);
						if (waist < 1) {
							a += waist / 4;
							if (a < 0) a = 0;
						}
					}
					b = (hips + ass) * 3;
					if (ass > 20) b += (ass - 20) * 8;
					c = waist / 3;
					if (c < -5) c = -5;
					d = hips / 2;
					if (hips > 20) d = 10;
					f = 0;
					
					y = b;
					if (y > 100) y = 100;
					ctx.lineTo(50.3 + (c / 2) - ((a / 2) + (b / 20) + (f / 2)), 175 - ((y / 22) + d));
					
					/*Outer Leg*/
					if (legs < 11) {
						a = legs;
						b = a / 2;
						c = a / 3;
						var d = a / 5;
						var e = a / 10;
						f = hips / 5.5;
						var g = f * (1 / 9);
						ctx.quadraticCurveTo(25 + a + b + c - ((f * 4.5)), 227 - (a + b + (f * 2) + (ass / 10)), 36 + b + c, 269 + (d * 3));
					}
					else{
						if (legs <= 20) a = legs - 11;
						else a = 9;
						a = a * 0.8;
						b = a / 2;
						c = a / 3;
						var d = a / 5;
						var e = a / 10;
						f = hips / 5.5;
						var g = f * (a / 9);
						var z = 0;
						if (legs > 20) {
							z = legs - 20;
							z /= 2;
						}
						ctx.quadraticCurveTo(43.3 - (c + d + (f * 4.5) + z), 202 + a + z - ((f * 2) + (ass / 10)), 44 + (a + a + d) - e, 275);
					}
				}
			}
			
			function drawHipLine(ctx)
			{
				ctx.beginPath();
				
				/*Hipline*/
				
				var hipthick = ((hips * 3) + ass) / 4;
				if (hipthick > 17) {
				
					ctx.lineWidth = hipthick / 17;
					
					/*Upper Waist*/
					var a = shoulders;
					var b = a / 2;
					var c = a / 3;
					var d = a / 5;
					var e = a / 10;
					var f = a * 2;
					var g = 0;
					var x = 0;
					var y = 0;
					var z = 0;
					var h = 0;
					if (waist < 0) h = waist * -0.5;
					if (a < 11) ctx.moveTo(47 + (c * 3) - (h / 4), 149 - (h + a));
					else{
						a = shoulders - 11;
						if (shoulders > 20) a = 9;
						a = a * 0.9;
						b = a / 2;
						c = a / 3;
						d = a / 5;
						e = a / 10;
						f = a * 2;
						g = 0;
						if ((hips * 3) + ass > 70) g = (a / 9) * ((((hips * 3) + ass) - 70) / 5);
						if (7 - legs > 0) g += (7 - legs);
						if (g > 14) g = 14;
						z = g / 2;
						x = a;
						y = x / 2;
						var m = 0;
						if (shoulders > 20) m = (shoulders - 20) / 10;
						ctx.moveTo(56 - (d + (h / 4)), 138 - (b + h));
					}
					
					/*Waist*/
					a = 0;
					if (shoulders < 11) {
						a = (11 - shoulders);
						if (waist < 1) {
							a += waist / 4;
							if (a < 0) a = 0;
						}
					}
					b = (hips + ass) * 3;
					if (ass > 20) b += (ass - 20) * 8;
					c = waist / 3;
					if (c < -5) c =- 5;
					d = hips / 2;
					if (hips > 20) d = 10;
					f = 0;
					
					y = b;
					if (y > 100) y = 100;
					ctx.bezierCurveTo(53 + c - ((a / 1.2) + (y / 40.7) + (f / 5) + (b / 60)), 145 + (c / 5) + (y / 27.5), 52 + c - ((a / 1.6) + (f / 2) + (b / 40)), 161 - ((y / 6.875)), 50.3 + (c / 2) - ((a / 2) + (b / 20) + (f / 2)), 175 - ((y / 22) + d));
					
					/*Outer Leg*/
					if (legs < 11) {
						a = legs;
						b = a / 2;
						c = a / 3;
						d = a / 5;
						e = a / 10;
						f = hips / 5.5;
						g = f * (1 / 9);
						ctx.quadraticCurveTo(25 + a + b + c - ((f * 4.5)), 227 - (a + b + (f * 2) + (ass / 10)),36 + b + c,269 + (d * 3));
						ctx.quadraticCurveTo(26 + a, 307 - c, 34 + (d * 2), 319 + a + d);
					}
					else{
						if (legs <= 20) a = legs - 11;
						else a = 9;
						a = a * 0.8;
						b = a / 2;
						c = a / 3;
						d = a / 5;
						e = a / 10;
						f = hips / 5.5;
						g = f * (a / 9);
						z = 0;
						if (legs > 20) {
							z = legs - 20;
							z /= 2;
						}
						ctx.quadraticCurveTo(43.3 - (c + d + (f * 4.5) + z), 202 + a + z - ((f * 2) + (ass / 10)),44 + (a + a + d) - e, 275);
						ctx.quadraticCurveTo(36 + (a + a + c + d) - (b + f), 304 - (a + f), 38 + (a + a + b + d), 332);
					}
				}
			}
			
			
			function drawBody(ctx)
			{
				
				/*MAIN BODY*/
			
				ctx.beginPath();
				ctx.lineWidth = (41 - (shoulders+legs)) / 20;
				if (ctx.lineWidth < 1.4) ctx.lineWidth = 1.4;
				
				/*Neck*/
				var a = shoulders;
				var b = a / 2;
				var c = a / 3;
				var d = a / 5;
				var e = a / 10;
				var f = a * 2;
				var g = 0;
				var x = 0;
				var y = 0;
				var z = 0;
				if (a < 11) {
					ctx.moveTo(79, 48);
					ctx.lineTo(62 + b + d, 48);
					ctx.quadraticCurveTo(61 + e + b + d, 58 - b, 62 + b + d, 68 - b);
					ctx.lineTo(62 + b + d, 58 + b);
					ctx.quadraticCurveTo(50 + b, 64 + b, 41 + b, 72 - d);
					if (a < 6) ctx.quadraticCurveTo(39 + b, 70 + d + d, 37 + b, 72 + d);
					/*Outer Arm*/
					ctx.bezierCurveTo(16 + f, 74, 9 + f + a, 88 - a, 14 + f, 110 - (a + d));
					ctx.lineTo(13 + f + e, 100 - d);
					ctx.bezierCurveTo(4 + f + d + d + d, 127 - b - d, 14 + a + e, 130, 10 + a + b, 144 - (d * 3));
					ctx.quadraticCurveTo(0 + a + b + d - (g / 2), 160 - b, 9 + d + d - g, 211 - (a + d + b));
					/*Hands*/
					ctx.quadraticCurveTo(13-g,223 - (b + b + c), 20 - ((d*4) + g), 226 - (b + (d * 4)));
					ctx.quadraticCurveTo(23 - (d + g), 223 - (b + d), 26-g,222 - (b + c));
					ctx.quadraticCurveTo(22 + c - g, 212 + (d - b), 19 + e-g,213 - (b + e));
					ctx.lineTo(26 - g, 222 - (b + c));
					ctx.quadraticCurveTo(32 - g, 222 - (b + d), 19 + d - g, 202 - (b + c));
					/*Inner Arm*/
					ctx.quadraticCurveTo(17 + d - g, 195 + b, 19 + d - g, 186 + b);
					ctx.quadraticCurveTo(28 + b + d - (g / 2), 167 - (b + (c * 3)), 27 + a, 150 - (a + d + b));
					ctx.quadraticCurveTo(40, 140 - a, 44 + b + e, 115 - (a + a));
					ctx.lineTo(39 + (b + c), 132 - (f + b + d));
					var h = 0;
					if (waist < 0) h = waist * -0.5;
					ctx.quadraticCurveTo(43 + (c * 3), 145 - (h + a + b), 47 + (c * 3) - (h / 4), 149 - (h + a));
				} else {
					a = shoulders - 11;
					if (shoulders > 20) a = 9;
					a = a * 0.9;
					b = a / 2;
					c = a / 3;
					d = a / 5;
					e = a / 10;
					f = a * 2;
					g = 0;
					if ((hips * 3) + (ass * 1.5) > 40) g = ((((hips * 3) + (ass * 1.5)) - 40) / 5);
					if (7 - legs > 0) g += (7 - legs);
					g *= a / 9;
					if (g > 13.5) g = 13.5;
					g += ((20 - waist) / 10) * (a / 9);
					z = g / 2;
					x = a;
					y = x / 2;
					var m = 0;
					if (shoulders > 10) m = (shoulders - 10) / 20;
					ctx.moveTo(79, 48);
					ctx.lineTo(69, 48);
					ctx.quadraticCurveTo(69, 53, 69, 63);
					ctx.quadraticCurveTo(55 + c, 69 + c, 46 + a, 70 + b);
					/*Outer Arm*/
					ctx.bezierCurveTo(36 + m, 74 + a + e, 40 + m,77 + a, 34 + d + m + m + m, 97);
					ctx.quadraticCurveTo(28 + m + m + m + d + b, 115, 24 + b + m + m + b, 138);
					ctx.quadraticCurveTo(17 + a + c + m + m + m + b - (g / 2), 155 - z, 14 + x + m + m + c + b-g, 193 - z);
					/*Hands*/
					ctx.quadraticCurveTo(16 + x + y + (y/4) - (g + z),209 - (b + z), 15 + x + y + (y/3) - (g + z), 213 - (b + z));
					ctx.quadraticCurveTo(21 + x + y + (y/1.2) - (a + b + g + z + (z / 10)), 216 + b - (z/10),29 + x + y + (y/1.2) - (a + b + g + z + (z / 3)), 214 + a - z);
					ctx.quadraticCurveTo(28 + x + y - (g + z), 209 - z, 23 + x + (y * 1.5) - (b + g + z),207 - (e + z));
					ctx.lineTo(29 + x + (y*1.5) - (a + g + z), 214 - (b + c + z));
					ctx.quadraticCurveTo(35 + x + y - (a + e + g + z), 215 + e - z, 23 + x + y + c - (g + (z/2)),194 + a + d - z);
					/*Inner Arm*/
					ctx.quadraticCurveTo(22 + x + a - (d + g), 200 - z, 22 + (x / 2) + b + b + a - (g / 2),191 - (f + z));
					ctx.quadraticCurveTo(35 + c + b + b + c - ((x / 4)), 153 - b, 38 + b + d + b + d, 132);
					ctx.lineTo(50 + d - e, 95 + (c * 3));
					ctx.lineTo(46 + d + d + e, 108 + b);
					var h = 0;
					if (waist < 0) h = waist * -0.5;
					ctx.quadraticCurveTo(52 + d, 129 - h, 56 - (d + (h / 4)), 138 - (b + h));
				}
				/*Waist*/
				a = 0;
				if (shoulders < 11) {
					a = (11 - shoulders);
					if (waist < 1) {
						a+=waist / 4;
						if (a<0) a = 0;
					}
				}
				b = (hips + ass) * 3;
				if (ass > 20) b += (ass - 20) * 8;
				c = waist / 3;
				if (c < -5) c = -5;
				d = hips / 2;
				if (hips > 20) d = 10;
				f = 0;
				
				y = b;
				if (y > 100) y = 100;
				ctx.bezierCurveTo(53 + c - ((a / 1.2) + (y / 40.7) + (f / 5) + (b / 60)), 145 + (c / 5) + (y / 27.5), 52 + c - ((a / 1.6) + (f / 2) + (b / 40)), 161 - ((y / 6.875)),50.3 + (c / 2) - ((a / 2) + (b/20) + (f / 2)),175 - ((y / 22) + d));
				
				/*Outer Leg*/
				if (legs < 11) {
					a = legs;
					b = a / 2;
					c = a / 3;
					d = a / 5;
					e = a / 10;
					f = hips / 5.5;
					g = f * (1 / 9);
					ctx.quadraticCurveTo(25 + a + b + c - ((f * 4.5)), 227 - (a + b + (f * 2) + (ass / 10)),36 + b + c,269 + (d * 3));
					ctx.quadraticCurveTo(26 + a, 307 - c, 34 + (d * 2), 319 + a + d);
					ctx.quadraticCurveTo(34 + (d * 2), 335 + c, 41 - c, 354 - c);
					ctx.quadraticCurveTo(42 - c, 360 - c, 41 - d, 365 - e);
					ctx.quadraticCurveTo(39 - e, 367 - d, 41 - d, 370 - c);
					/*Foot*/
					ctx.quadraticCurveTo(34 + d, 386 - (a + c), 29 + e, 388 - (d * 2));
					ctx.quadraticCurveTo(29 + c, 389 - c, 29 + (d * 2), 390 - c);
					ctx.quadraticCurveTo(43 - c, 394 - c, 59 - (b + d), 389 - c);
					ctx.quadraticCurveTo(58 - (d * 2), 384, 58 - (d * 3), 383 - d);
					ctx.quadraticCurveTo(54 - (d * 3), 380 - c, 53 - b, 371 - c);
					/*Inner-Leg*/
					ctx.quadraticCurveTo(56 - b, 366 - d, 53 - c, 363 - d);
					ctx.lineTo(54 - (d * 2), 342 + a);
					ctx.bezierCurveTo(64, 308 - a, 67 - a, 297 - a, 61 + e, 276 - a);
					ctx.quadraticCurveTo(65 - d, 260 + d, 70 - (b + d), 250 + a);
					ctx.quadraticCurveTo(78 - (b + d), 230 + c, 78 - d, 205 - d);
					ctx.quadraticCurveTo(79, 208 - d, 79, 205 - d);
				} else {
					if (legs <= 20) a = legs - 11;
					else a = 9;
					a = a * 0.8;
					b = a / 2;
					c = a / 3;
					d = a / 5;
					e = a / 10;
					f = hips / 5.5;
					g = f * (a / 9);
					z = 0;
					if (legs > 20) {
						z = legs - 20;
						z /= 2;
					}
					ctx.quadraticCurveTo(43.3 - (c + d + (f * 4.5) + z), 202 + z - ((f * 2) + (ass / 10)), 44 + (a + a + d) - e, 275);
					ctx.quadraticCurveTo(36 + (a + a + c + d) - (b + f), 304 - (a + f), 38 + (a + a + b + d), 332);
					ctx.quadraticCurveTo(37 + e + (a + b + b + d + b), 338, 38 + e + (a + b + b + d + b), 351);
					ctx.quadraticCurveTo(38 + (a + b + b + d + b), 357, 39 + (a + b + b + d + b), 364);
					ctx.quadraticCurveTo(38 + (a + b + b + d + b), 365, 39 + (a + b + b + d + b), 367);
					/*Foot*/
					ctx.quadraticCurveTo(36 + (a + a + b + d + b), 372, 30 + (a + a + b + d + b), 384);
					ctx.quadraticCurveTo(32 + (a + a + b + d + b), 386, 33 + (a + a + b + d + b), 387);
					ctx.quadraticCurveTo(40 + (a + a + b + d + b), 391, 52 + (a + a + b + d + b), 386);
					ctx.quadraticCurveTo(54 + (a + a + b + d + b), 384, 52 + (a + a + b + d + b), 381);
					ctx.quadraticCurveTo(49 + (a + a + b + d + b), 377, 49 + (a + a + b + d + b), 368);
					/*Inner-Leg*/
					ctx.quadraticCurveTo(50 + (a + a + b + b + c), 364, 50 + (a + a + b + b + c), 361);
					ctx.lineTo(50 + b + (a + b + c + b), 353 - a);
					ctx.bezierCurveTo(64 + a + b + e + b + b, 297 - a, 56 + a + b + e + b, 286, 63 + a + b + e + b, 265);
					ctx.quadraticCurveTo(63 + a + b + e + b, 262, 63 + a + b + e + b, 261);
					ctx.quadraticCurveTo(71 + a + b + (z / 3), 233 + (z / 3) - b, 75 + d, 203);
					ctx.quadraticCurveTo(79, 206, 79, 203);
				}
			}
			
			function drawHorns(ctx)
			{
				var a = avatar.physique.horns;
				if (a == 0) return;
				ctx.lineWidth = 1.5;

				ctx.fillStyle = IRISCOLOR;
				ctx.strokeStyle = NIPPLESHADOW;
				ctx.beginPath();
				
				var b = a / 2;
				var c = avatar.physique.hornstype;
				
				if (c == 1) {
					// Cow
					ctx.moveTo(62, 1 - b);
					ctx.quadraticCurveTo(61, 20, 65, 20);
					ctx.moveTo(62, 8 - b);
					ctx.quadraticCurveTo(65, 15, 71, 15);
					ctx.lineTo(65, 20);
				} else if (c == 2) {
					// Demon
					ctx.moveTo(62, 1 - b);
					ctx.lineTo(65, 20);
					ctx.moveTo(62, 1 - b);
					ctx.lineTo(71, 15);
					ctx.lineTo(65, 20);
				}
				ctx.stroke();
				ctx.fill();
			}
			
			function drawTail(ctx)
			{
				var a = avatar.physique.tail;
				if (a == 0) return;
				ctx.lineWidth = 1.5;

				ctx.strokeStyle = SKINCB;
				ctx.fillStyle = SKINC;

				ctx.beginPath();
				
				var b = a * 2;
				var c = avatar.physique.tailtype;
				ctx.moveTo(75, 190);
				
				// 'Body' of tail
				if (c == 1 || c == 3) {
					// Cow
					ctx.quadraticCurveTo(20 - b, 280 + a, 20 - b, 240);
					ctx.lineTo(20 - b - 2, 245);
					ctx.quadraticCurveTo(20 - b, 285 + a, 75, 195);
					ctx.lineTo(75, 190);
				} else {
					// Demon
					ctx.quadraticCurveTo(20 - b, 280 + a, 20 - b, 240);
					ctx.lineTo(20 - b - 2, 245);
					ctx.quadraticCurveTo(20 - b, 285 + a, 75, 195);
					ctx.lineTo(75, 190);
				}
				ctx.stroke();
				ctx.fill();
				
				// 'End' of tail
				if (c == 1) {
					// Cow
					ctx.moveTo(20 - b, 242);
					ctx.lineTo(15 - b, 236);
					ctx.moveTo(20 - b, 242);
					ctx.lineTo(13 - b, 234);
					ctx.moveTo(20 - b, 242);
					ctx.lineTo(17 - b, 230);
					ctx.moveTo(20 - b, 242);
					ctx.lineTo(11 - b, 241);
					ctx.stroke();
				} else if (c == 2) {
					// Demon
					ctx.moveTo(22 - b, 243);
					ctx.lineTo(12 - b, 248);
					ctx.lineTo(12 - b, 235);
					ctx.lineTo(24 - b, 238);
					ctx.lineTo(22 - b, 243);
					ctx.stroke();
					ctx.fill();
				}
			}
			
			function drawWings(ctx)
			{
				var a = avatar.physique.wings;
				if (a == 0) return;
				ctx.lineWidth = 1.5;

				ctx.strokeStyle = "black";
				ctx.fillStyle = SKINC;

				ctx.beginPath();
				
				ctx.moveTo(73, 75);
				ctx.lineTo(3, 20);
				ctx.lineTo(22, 290);
				ctx.lineTo(60, 150);
				ctx.lineTo(63, 95);
				ctx.stroke();
				ctx.fill();
				
				ctx.stroke();
				ctx.fill();
			}
			
			
			function drawHalfFigure1(ctx)
			{
				ctx.fillStyle = SKINC;
				ctx.strokeStyle = SKINCB;
				drawBody(ctx);
				ctx.fill();
				ctx.stroke();
				drawHead(ctx);
				ctx.fill();
				ctx.stroke();
				drawPecs(ctx);
				ctx.fill();
				ctx.stroke();
				drawAbs(ctx);
				ctx.stroke();
				drawLegMuscles(ctx);
				ctx.stroke();
				drawHips(ctx);
				ctx.stroke();
				drawHipLine(ctx);
				ctx.stroke();
				drawThighLine(ctx);
				ctx.stroke();
				
				ctx.fillStyle = EYECOLOR;
				drawEyes(ctx);
				ctx.fill();
				ctx.fillStyle = IRISCOLOR;
				drawIris(ctx);
				ctx.fill();
				ctx.strokeStyle = EYELINER;
				drawEyes(ctx);
				ctx.stroke();
			}
			
			function drawHalfFigure2(ctx)
			{
				ctx.strokeStyle = SKINCB;
				ctx.fillStyle = SKINC;
				drawPregs(ctx);
				ctx.fill();
				drawPregs(ctx);
				ctx.stroke();
				
				for (var i = avatar.physique.breastrows; i > 0; i--) {
					var sz = breasts * (1.0 - (i * 0.1));
					if (sz < (breasts / 2)) sz = breasts / 2;
					var pos = (18 - i) * i;
					if (pos < 4) pos = 4;
					drawBoobs(ctx, sz, pos, i);
				}
				drawBoobs(ctx, breasts, 0, 0);
				
				if (avatar.items.headband > 0) drawHeadBand(ctx);
				if (avatar.items.collar > 0) drawCollar(ctx);
				
				drawHairFront(ctx);
				
				drawHorns(ctx);
				
				for (var i = 0; i < avatar.items.leftbracelet; i++) drawBracelet(ctx, true, i * 4.5);
			}
			
			var canvas = document.getElementById(canvasname);
			if (typeof canvas !== 'undefined') {
				var missingData = false;
				avatar.calcPhysique();
				var stats = avatar.physique;
				var height = typeof stats["height"] !== 'undefined' ? stats["height"] : missingData = true; //I apologize for bizarre way to do this, but it assigns missingData and height at the same time.
				var face = typeof stats["face"] !== 'undefined' ? stats["face"] : missingData = true;
				var eyes = typeof stats["eyes"] !== 'undefined' ? stats["eyes"] : missingData = true;
				var irisc = typeof stats["irisc"] !== 'undefined' ? stats["irisc"] : missingData = true;
				var lips = typeof stats["lips"] !== 'undefined' ? stats["lips"] : missingData = true;
				var skin = typeof stats["skin"] !== 'undefined' ? stats["skin"] : missingData = true;
				var hairlength = typeof stats["hairlength"] !== 'undefined' ? stats["hairlength"] : missingData = true;
				var hairc = typeof stats["hairc"] !== 'undefined' ? stats["hairc"] : missingData = true;
				var shoulders = typeof stats["shoulders"] !== 'undefined' ? stats["shoulders"] : missingData = true;
				var breasts = typeof stats["breasts"] !== 'undefined' ? stats["breasts"] : missingData = true;
				var nipples = typeof stats["nipples"] !== 'undefined' ? stats["nipples"] : missingData = true;
				var testes = typeof stats["testes"] !== 'undefined' ? stats["testes"] : missingData = true;
				var penis = typeof stats["penis"] !== 'undefined' ? stats["penis"] : missingData = true;
				var waist = typeof stats["waist"] !== 'undefined' ? stats["waist"] : missingData = true;
				var hips = typeof stats["hips"] !== 'undefined' ? stats["hips"] : missingData = true;
				var ass = typeof stats["ass"] !== 'undefined' ? stats["ass"] : missingData = true;
				var legs = typeof stats["legs"] !== 'undefined' ? stats["legs"] : missingData = true;
				if (missingData === false) {
					if (canvas.getContext) {
						var ctx = canvas.getContext("2d");
						canvas.width = canvas.width;
						var SKINC = "black";
						var SKINCB = "black";
						var LIPCOLOR = "black";
						var HAIRCOLOR = "black";
						var HAIRCOLORB = "black";
						var EYECOLOR = "white";
						var IRISCOLOR = "brown";
						var EYELINER = "black";
						var NIPPLESHADOW = "black";
						
						if (isNaN(irisc)) {
							IRISCOLOR = irisc;
						} else if (irisc < 11) {
							IRISCOLOR = "rgb(" + Math.floor(92 - (irisc*5.2)) + "," + Math.floor(64 + (irisc*5.1)) + "," + Math.floor(51 - (irisc*1.1)) + ")";
						}	else if (irisc < 100) {
							var a = irisc - 10;
							IRISCOLOR = "rgb(" + Math.floor(40 + (a * 4.9)) + "," + Math.floor(115 - (a * 2.6)) + "," + Math.floor(40 + (a * 13.1)) + ")";
						}
						
						if (isNaN(skin)) {
							SKINC = skin;
							SKINCB = skin;
							LIPCOLOR = skin;
							NIPPLESHADOW = skin;
							EYELINER = SKINCB;
						} else if (skin < 11) {
							SKINC = "rgb(" + Math.floor(255 - (skin*2.8)) + "," + Math.floor(214 - (skin*5.3)) + "," + Math.floor(180 - (skin*6.5)) + ")";
							SKINCB = "rgb(" + Math.floor(214 - (skin*5.1)) + "," + Math.floor(156 - (skin*4)) + "," + Math.floor(147 - (skin*6.4)) + ")";
							LIPCOLOR = "rgb(" + Math.floor(194 - (skin*4.1)) + "," + Math.floor(123 - (skin*4.1)) + "," + Math.floor(119 - (skin*4.1)) + ")";
							NIPPLESHADOW = "rgb(" + Math.floor(140 - (skin*4.1)) + "," + Math.floor(89 - (skin*4.1)) + "," + Math.floor(86 - (skin*4.1)) + ")";
							EYELINER = "rgb(" + Math.floor(128 - (skin*2.6)) + "," + Math.floor(91 - (skin*2.3)) + "," + Math.floor(65 - (skin*1.8)) + ")";
						}	else if (skin < 100) {
							var a = skin - 11;
							SKINC = "rgb(" + Math.floor(227 - (a * 9.6)) + "," + Math.floor(161 - (a * 9.1)) + "," + Math.floor(115 - (a * 6.3)) + ")";
							if (skin > 28) a = a - ((skin - 23) * 2.5);	// change colours to lighter so we do not get black on near black effects
							SKINCB = "rgb(" + Math.floor(163 - (a * 12)) + "," + Math.floor(116 - (a * 10.8)) + "," + Math.floor(83 - (a * 7.3)) + ")";
							LIPCOLOR = "rgb(" + Math.floor(153 - (a * 8.9)) + "," + Math.floor(82 - (a * 6.2)) + "," + Math.floor(78 - (a * 6.4)) + ")";
							NIPPLESHADOW = "rgb(" + Math.floor(99 - (a * 9.9)) + "," + Math.floor(48 - (a * 7.2)) + "," + Math.floor(45 - (a * 7.4)) + ")";
							EYELINER = "rgb(" + Math.floor(102 - (a * 8.9)) + "," + Math.floor(68 - (a * 6.6)) + "," + Math.floor(47 - (a * 4.4)) + ")";
						} else if (skin == 100) {
							SKINC = "rgb(211,130,136)";
							SKINCB = "rgb(184,45,45)";
							LIPCOLOR = SKINCB;
							NIPPLESHADOW = SKINCB;
							EYELINER = SKINCB;
						} else if (skin == 101) {
							SKINC = "rgb(174,187,254)";
							SKINCB = "rgb(32,40,64)";
							LIPCOLOR = SKINCB;
							NIPPLESHADOW = SKINCB;
							EYELINER = SKINCB;
						} else if (skin == 102) {
							SKINC = "rgb(114,224,114)";
							SKINCB = "rgb(82,115,84)";
							LIPCOLOR = SKINCB;
							NIPPLESHADOW = SKINCB;
							EYELINER = SKINCB;
						}
						
						if (isNaN(hairc)) {
							HAIRCOLOR = hairc;
							HAIRCOLORB = hairc;
						} else if (hairc < 6) {
							HAIRCOLOR = "rgb(" + Math.floor(36 + (hairc * 17.2)) + "," + Math.floor(7 + (hairc*10.6)) + "," + Math.floor(11 + (hairc*8.8)) + ")";
							HAIRCOLORB = "rgb(" + Math.floor(0 + (hairc * 11.8)) + "," + Math.floor(0 + (hairc*5.8)) + "," + Math.floor(0 + (hairc*5.2)) + ")";
						}	else if (hairc < 11) {
							var a = hairc - 6;
							HAIRCOLOR = "rgb(" + Math.floor(122 + (a * 8.2)) + "," + Math.floor(60 - (a * 12)) + "," + Math.floor(55 - (a * 10.8)) + ")";
							HAIRCOLORB = "rgb(" + Math.floor(59 + (a * 8.6)) + "," + Math.floor(29 - (a * 5.8)) + "," + Math.floor(26 - (a * 5)) + ")";
						}	else if (hairc < 16) {
							var a = hairc - 11;
							HAIRCOLOR = "rgb(" + Math.floor(163 + (a * 11.8)) + "," + Math.floor(0 + (a * 37.6)) + "," + Math.floor(1 + (a * 30.4)) + ")";
							HAIRCOLORB = "rgb(" + Math.floor(102 + (a * 11.2)) + "," + Math.floor(0 + (a * 26.8)) + "," + Math.floor(1 + (a * 21.6)) + ")";
						}	else {
							var a = hairc - 16;
							HAIRCOLOR = "rgb(" + Math.floor(222 + (a * 5.8)) + "," + Math.floor(188 + (a * 12.6)) + "," + Math.floor(153 + (a * 6.2)) + ")";
							HAIRCOLORB = "rgb(" + Math.floor(158 + (a * 6.2)) + "," + Math.floor(134 + (a * 5.8)) + "," + Math.floor(109 + (a * 0.4)) + ")";
						}
						
						var heightread = (height * 0.7) + 60;
						if (face < 10) heightread += ((11 - face) / 10);
						var heightft = "" + Math.floor(heightread / 12) + "\'";
						var heightin = "" + Math.floor(heightread - (Math.floor(heightread / 12) * 12)) + "\"";
						heightread = heightft + heightin;
						ctx.font = "bold 400 12px/2 Unknown Font, serif";
						ctx.fillText(heightread, 136, 19);
						ctx.font = "bold 18px Unknown Font, serif";
						ctx.fillText(avatar.isFutanari() ? String.fromCharCode(0x26a5) : avatar.isMale() ? String.fromCharCode(0x2642) : String.fromCharCode(0x2640), 6, 24);
						if (avatar.name != "Rival man" && avatar.name != "Rival woman") {
							ctx.font = "bold 18px Unknown Font, serif";
							ctx.fillText(avatar.name, 22, 24);
						}
						ctx.beginPath();
						var pos = 20;
						ctx.moveTo(130 + pos, 20);
						ctx.lineTo(158 + pos, 20);
						ctx.lineTo(158 + pos, 390);
						var dashes = 370 / 72;
						var i = 1;
						for (i = 1; i < 72; i++) {
							var v = 390 - (i * dashes);
							ctx.moveTo(158 + pos,v);
							if (i % 12 == 0) ctx.lineTo(144 + pos,v);
							else if (i % 6 == 0) ctx.lineTo(151 + pos,v);
							else if (i % 3 == 0) ctx.lineTo(153 + pos,v);
							else ctx.lineTo(155 + pos,v);
						}
						ctx.stroke();
						ctx.beginPath();
						ctx.strokeStyle = "red";
						ctx.lineWidth = 3;
						ctx.moveTo(159 + pos, 20);
						ctx.lineTo(159 + pos, 20 + (370 * (avatar.femininity() / 100)));
						ctx.stroke();

						
						var heightheight = (height*.0095) + 0.81;
						var heightscale = 1 - ((30 - height) / 250);
						var heightoffset = (0.3 * (30 - height)) + 4;
						ctx.translate(heightoffset, 400 - (heightheight * 400));
						ctx.scale(heightscale, heightheight);
						
						// Draw Wings
						drawWings(ctx);
						ctx.translate(78.6, 200);
						ctx.scale(-1, 1);
						ctx.translate(-78.6, -200);
						drawWings(ctx);
						ctx.translate(0, 0);
						
						// Draw Tail
						drawTail(ctx);
						
						// Draw hair
						drawHairBack(ctx)
						
						// Draw left side, part 1
						var bLeft = true;
						drawHalfFigure1(ctx);
						
						// Draw right side, part 1
						bLeft = false;
						ctx.translate(78.6, 200);
						ctx.scale(-1, 1);
						ctx.translate(-78.6, -200);
						drawHalfFigure1(ctx);
						
						ctx.translate(0, 0);
						
						// Draw central/common parts of the body, part 1
						drawBelly(ctx);
						ctx.fill();
						ctx.stroke();
						
						var hasc = avatar.hasCock();
						var erect = avatar.desire > 50 && hasc == true;
						if (hasc == true && erect == false) {
							if (avatar.physique.breasts < 80) drawBellyButton(ctx);
							drawGenitals(ctx);
						}
						
						// Draw left side, part 2
						bLeft = true;
						drawHalfFigure2(ctx);
						
						// Draw right side, part 2
						bLeft = false;
						ctx.translate(78.6, 200);
						ctx.scale(-1, 1);
						ctx.translate(-78.6, -200);
						drawHalfFigure2(ctx);
						
						ctx.translate(0,0);
						
						// Draw central/common parts of the body, part 2
						drawNose(ctx);
						drawCleavage(ctx)
						drawLips(ctx);
						if (hasc == false || erect) {
							drawGenitals(ctx);
							if (avatar.physique.breasts < 80) drawBellyButton(ctx);
						}
					
					}
				}
			}
		}
