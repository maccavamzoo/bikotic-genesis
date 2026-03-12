

	//make sure we're on the right URL..
	if(window.location.origin != "https://bikotic.com")
	{ 
		window.location.replace("https://bikotic.com");
	}
	
	
	//listen for the onload & resize event..
	window.onresize = function(event) { resize(); }
	
	//key events..
	document.onkeydown = function(event){ keydown(event); }
	document.onkeyup = function(event){ keyup(event); }
	
	var hello;
	
	//fonts used..
	var fontName = "Oswald, sans-serif";

	//global vars..
	var CODEBASE = "https://bikotic.com/BIKOTIC-CODEBASE-V3/"; 
	var pathToBikes = "https://bikotic.com/SLRGT/BIKE-IMAGES/LRG-WEBP/"; 
	var	pathToBikesPost = "-LRG.webp";
	var mainDiv;
	var selectDiv;
	var selectDiv2;
	var showDiv;
	var imageTag1;
	var imageTag2;
	var logo1;
	var logo2;
	var BIKOTIC_LOGO;
	var bikotic_wipe = false;
	var bikotic_wipe_direction = "vert";
	var bikotic_wipe_first_touch = false;
	var bikotic_img1_invert = false;
	var bikotic_img2_invert = false;
	var BIKOTIC_SessionID = 0;
	var BIKOTIC_CanvasRotation = false;
	var BIKOTIC_RotAmount = 30;
	var BIKOTIC_RotZoomAmount = 0.7;
	var rotHill;
	
	//-----------------------------------INTERFACE VARS..
	
	var menu_main;
	var menu_main_starred;
	
	var BIKOTIC_SubWinBkgColor = "#e7e7e7";
	var BIKOTIC_SubWinTitleLilac = "#a274a1";
	
	//-----------------------------------INTERFACE VARS..
	
	var menuButtTopOffset = 0;
	
	var motor_icon;
	var battery_icon;
	var comments_icon;
	var similar_icon;

	var bike1;
	var bike2;
	var canvas;
	var ctx;
	var ratio = 0.5625;
	var alpha = 0;
	var oldAlpha;
	var dotAlpha = 0;
	var mouseIsDown = false;
	var xOrig;
	var xPanOrig;
	var yPanOrig;
	var xPrev;
	const grey  = "#818181";
	const getOptionsURL = CODEBASE + "PRL-SWORK/BIKOTIC_getOptions_V2.pl"; 
	var factor;
	const loadingBlobsAmount = 7;
	
	var bikeOneCurrentBlob = 1;
	var bikeOneTimer;
	
	var bikeTwoCurrentBlob = 1;
	var bikeTwoTimer;
	
	var zoomFactor = 1;
	var pan = false;
	var zOffsetX = 0;
	var zOffsetY = 0;
	
	var extraX1 = 0;
	var extraX2 = 0;
	var extraY1 = 0;
	var extraY2 = 0;
	
	//holders for the bike gallery images..
	var bike1_galPic0;	
	var bike1_galPic1;
	var bike1_galPic2;
	var bike1_galPic3;
	var bike1_galPic4;
	var bike2_galPic0;
	var bike2_galPic1;
	var bike2_galPic2;
	var bike2_galPic3;
	var bike2_galPic4;
	
	//colors..
	var BIKOTIC_Pink = "#8c0095";
	var BIKOTIC_LightGrey = "#c0c0c0";
	
	
	
//----------------------------------------------------------------------BIKE 1 TIMER..
	function stopBikeOneTimer(){
		clearInterval(bikeOneTimer);
		bikeOneCurrentBlob = 1; 
	}

	function onBikeOneTimer(){
		draw();
		bikeOneCurrentBlob++;
		if(bikeOneCurrentBlob > loadingBlobsAmount) bikeOneCurrentBlob = 1;		
	}
	
	function drawLoadingBike1(){
		var blobDiam = 7*factor; 
		var space = 25*factor; 
		var startX = ((canvas.width/2) - Math.floor((loadingBlobsAmount/2)*space)) - Math.floor(space/2); var middleY  = (canvas.height/2);
		var colorOff = "#a660ab";
		var colorOn  = "#8c0095";
		
		for(var i = 0; i < loadingBlobsAmount; i++)
		{
			var theColor = colorOff;
			var extra = 0;
			if(i+1 == bikeOneCurrentBlob) 
			{
				theColor = colorOn;
				extra+= 5;
			}
			ctx.beginPath(); ctx.arc(startX+(space*(i+1)), middleY, blobDiam+extra, 0, 2 * Math.PI); ctx.fillStyle = theColor; ctx.fill();			
		}
	}
	
//----------------------------------------------------------------------BIKE 2 TIMER
	
	function stopBikeTwoTimer(){
		clearInterval(bikeTwoTimer);
		bikeTwoCurrentBlob = 1;
	}

	function onBikeTwoTimer(){
		draw();
		bikeTwoCurrentBlob++;
		if(bikeTwoCurrentBlob > loadingBlobsAmount) bikeTwoCurrentBlob = 1;		
	}
	
	function drawLoadingBike2(){
		
		//need to draw a white rect to make up for the fact the image is now missing..
		ctx.globalAlpha = alpha; 
		ctx.beginPath();
		ctx.rect(0, 0, canvas.width, canvas.height); 
		ctx.fillStyle = "white";
		ctx.fill();
		
		var blobDiam = 7*factor; 
		var space = 25*factor; 
		var startX = ((canvas.width/2) - Math.floor((loadingBlobsAmount/2)*space)) - Math.floor(space/2); var middleY  = (canvas.height/2);
		var colorOff = "#a660ab";
		var colorOn  = "#8c0095";
		
		for(var i = 0; i < loadingBlobsAmount; i++)
		{
			var theColor = colorOff;
			var extra = 0;
			if(i == loadingBlobsAmount - bikeTwoCurrentBlob) 
			{
				theColor = colorOn;
				extra+= 5;
			}
			ctx.beginPath(); ctx.arc(startX+(space*(i+1)), middleY, blobDiam+extra, 0, 2 * Math.PI); ctx.fillStyle = theColor; ctx.fill();			
		}
	}
	

//----------------------------------------------------------------------DRAW..
	function gearingStats(bike, gAlpha)
	{
		var gRectWidth = 200*factor; 
		var gRectHalf  = 100*factor;
		var gRectHeight = 13*factor; 
		var halfCanvas = (canvas.width/2)-15;
		var tOff = 25;
		
		//text..
		var fSize = 13 * factor;
		ctx.font = fSize + "px " + "JetBrains Mono, monospace";
		
		
		//ratios..
		var hardestRatio = bike.chainring_large / bike.cassette_small;
		var easiestRing = bike.chainring_small;
		if(bike.chainring_small == 0) easiestRing = bike.chainring_large;
		var easiestRatio = easiestRing / bike.cassette_large;
		 
		/*
		var radius = 0; 
		if(bike.tyres_width > 0) radius = (bike.wheel_size/2) + parseFloat(bike.tyres_width); 
		var circumference = ((2) * (Math.PI) * (radius)); 
		var hardMeters = (hardestRatio * circumference)/1000;
		var easyMeters = (easiestRatio * circumference)/1000;
		*/
		
		var diameter = 0; 
		if(bike.tyres_width > 0) diameter = parseFloat(bike.wheel_size) + (parseFloat(bike.tyres_width)*2); 
		var circumference = Math.PI * diameter; 
		var hardMeters = (hardestRatio * circumference)/1000.0;
		var easyMeters = (easiestRatio * circumference)/1000.0;
		
		ctx.fillStyle = "#b0236f";
		ctx.fillText("HARDEST " + bike.chainring_large + "|" + bike.cassette_small, halfCanvas-gRectHalf-(110*factor), (980+tOff)*factor);
		ctx.fillText(hardestRatio.toFixed(2) + " (" + hardMeters.toFixed(2) + "m)", halfCanvas+gRectHalf+5, (980+tOff)*factor);
		
		ctx.fillStyle = "#23b094";
		ctx.fillText("EASIEST " + easiestRing + "|" + bike.cassette_large, halfCanvas-gRectHalf-(110*factor), (1000+tOff)*factor);		
		ctx.fillText(easiestRatio.toFixed(2) + " (" + easyMeters.toFixed(2) + "m)", halfCanvas+gRectHalf+5, (1000+tOff)*factor);
		
		ctx.fillStyle = "#858585";
		ctx.fillText("C:(" + bike.wheel_size + "|" + bike.tyres_width + ")", halfCanvas-gRectHalf-(110*factor), (1020+tOff)*factor);
		
		//rectangle grey..
		ctx.fillStyle = "#c8c8c8";
		ctx.beginPath();
		ctx.fillRect(halfCanvas-gRectHalf, (969+tOff)*factor, gRectWidth, gRectHeight);
		ctx.beginPath();
		ctx.fillRect(halfCanvas-gRectHalf, (989+tOff)*factor, gRectWidth, gRectHeight);
		
		//rectangle color..
		var biggestHardest = 10.8 - 5;
		var smallestEasiest = 4.6 - .5;
		var hrWidth = (((hardMeters)-5)/biggestHardest)*gRectWidth;
		var erWidth = (((easyMeters)-.5)/smallestEasiest)*gRectWidth;
		
		ctx.fillStyle = "#8c0095";
		ctx.beginPath();
		ctx.fillRect(halfCanvas-gRectHalf, (969+tOff)*factor, hrWidth, gRectHeight);
		
		ctx.fillStyle = "#8c0095";
		ctx.beginPath();
		ctx.fillRect(halfCanvas-gRectHalf, (989+tOff)*factor, erWidth, gRectHeight);
		

		//meters travelled..
		var fSize = 11 * factor;
		ctx.font = fSize + "px " + "JetBrains Mono, monospace";
		ctx.fillStyle = "white";
		
		//hardest kph @ 90rpm..
		var hKphAt80RPM = ((hardMeters*(90*60))/1000 ).toFixed(1);
		var eKphAt80RPM = ((easyMeters*(90*60))/1000 ).toFixed(1);
		
		//add the text for gear ratios..
		ctx.fillText(hKphAt80RPM + "kph", (halfCanvas-gRectHalf)+5, (979+tOff)*factor);
		ctx.fillText(eKphAt80RPM + "kph", (halfCanvas-gRectHalf)+5, (999+tOff)*factor);
		
		ctx.fillStyle = "#aaaaaa";
		ctx.fillText("*kph AT 90RPM", (halfCanvas-gRectHalf), (1016+tOff)*factor);	
	}
	
	var leftGalPos = 25;
	var topGalPos = 455;
	var galSpacer = 53;
	function AddBike1Gallery()
	{	
		if(bike1.gal_pics > 0) ctx.drawImage(bike1_galPic0, leftGalPos*factor, topGalPos*factor, bike1_galPic1.width*factor, bike1_galPic1.height*factor);
		if(bike1.gal_pics > 0) ctx.drawImage(bike1_galPic1, leftGalPos*factor, (topGalPos+galSpacer)*factor, bike1_galPic1.width*factor, bike1_galPic1.height*factor);
		if(bike1.gal_pics > 1) ctx.drawImage(bike1_galPic2, leftGalPos*factor, (topGalPos+(galSpacer*2))*factor, bike1_galPic1.width*factor, bike1_galPic1.height*factor);
		if(bike1.gal_pics > 2) ctx.drawImage(bike1_galPic3, leftGalPos*factor, (topGalPos+(galSpacer*3))*factor, bike1_galPic1.width*factor, bike1_galPic1.height*factor);
		if(bike1.gal_pics > 3) ctx.drawImage(bike1_galPic4, leftGalPos*factor, (topGalPos+(galSpacer*4))*factor, bike1_galPic1.width*factor, bike1_galPic1.height*factor);
		
	}
	function AddBike2Gallery()
	{
		if(bike2.gal_pics > 0) ctx.drawImage(bike2_galPic0, leftGalPos*factor, topGalPos*factor, bike2_galPic1.width*factor, bike2_galPic1.height*factor);
		if(bike2.gal_pics > 0) ctx.drawImage(bike2_galPic1, leftGalPos*factor, (topGalPos+galSpacer)*factor, bike2_galPic1.width*factor, bike2_galPic1.height*factor);
		if(bike2.gal_pics > 1) ctx.drawImage(bike2_galPic2, leftGalPos*factor, (topGalPos+(galSpacer*2))*factor, bike2_galPic1.width*factor, bike2_galPic1.height*factor);
		if(bike2.gal_pics > 2) ctx.drawImage(bike2_galPic3, leftGalPos*factor, (topGalPos+(galSpacer*3))*factor, bike2_galPic1.width*factor, bike2_galPic1.height*factor);	
		if(bike2.gal_pics > 3) ctx.drawImage(bike2_galPic4, leftGalPos*factor, (topGalPos+(galSpacer*4))*factor, bike2_galPic1.width*factor, bike2_galPic1.height*factor);	
	}

	function draw()
	{
		if(!canvas) return;

		//set var for the offset of the motor and battery icons..
		var tOffSet = 766;
		
		//set canvas width & height..
		canvas.width = window.innerWidth; canvas.height = window.innerWidth * ratio;
		factor = window.innerWidth/1920.0;
		
		//clear the canvas..
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		//calc draw dimensions..
		var zWidth = canvas.width*zoomFactor;
		var zHeight = canvas.height*zoomFactor;
		var zX = ((canvas.width/2)-(zWidth/2)) + (zOffsetX*zoomFactor);
		var zY = ((canvas.height/2)-(zHeight/2)) + (zOffsetY*zoomFactor);
		
		//draw bike1 & logo image..
		if(bike1 && bike1.loading)
		{
			drawLoadingBike1();
		}
		else
		{ 
			if(imageTag1.width > 0) 
			{
				if(bikotic_img1_invert) ctx.filter = "invert(100%)";
				
				
				if(BIKOTIC_CanvasRotation == false)
				{
					ctx.drawImage(imageTag1,zX + (extraX1*zoomFactor), zY + (extraY1*zoomFactor), zWidth, zHeight);
				}
				else	
				{
					// Save the canvas state
					ctx.save();
					
					// Move the origin to the center of the image
					ctx.translate(zX + (extraX1 * zoomFactor) + zWidth / 2, zY + (extraY1 * zoomFactor) + zHeight / 2);
					
					// Rotate the canvas
					var angleInRadians = Math.PI / degreesToRadians(BIKOTIC_RotAmount);
					ctx.rotate(angleInRadians);
					
					// Scale the image (Zoom out)
					var scaleWidth = BIKOTIC_RotZoomAmount;  
					var scaleHeight = BIKOTIC_RotZoomAmount; 
					ctx.scale(scaleWidth, scaleHeight);
					
					// Draw the image
					ctx.drawImage(imageTag1, -zWidth / 2, -zHeight / 2, zWidth, zHeight);
					
					//draw the hill..
					ctx.drawImage(rotHill, -zWidth / 2, -zHeight / 2, zWidth, zHeight);
					
					// Restore the canvas state
					ctx.restore();
				}	
				
				
				if(bikotic_img1_invert) ctx.filter = "none";
			}
			if(logo1.width > 0) ctx.drawImage(logo1, 0, 0, canvas.width, canvas.height);
			
			if(bike1 && bike1.model_des == "DUMMY")
			{
				selectDiv.style.display = "none";
			}
			else
			{
				selectDiv.style.opacity = 1 - alpha;
				selectDiv.style.display = "block";
			}
			
			//draw the gearing stats..
			if(bike1 && bike1.model_des != "DUMMY") gearingStats(bike1, 1);
			
			//gallery button if bike 1 has extra images..
			if(bike1 && bike1.gal_pics > 0) AddBike1Gallery();
			
			//motor and battery icons..
			if(bike1 && bike1.motor_nm != 0)
			{
				ctx.drawImage(motor_icon, 840*factor, (911-tOffSet)*factor, motor_icon.width*factor, motor_icon.height*factor);
				ctx.drawImage(battery_icon, 968*factor, (911-tOffSet)*factor, battery_icon.width*factor, battery_icon.height*factor);
				var fSize = 20 * factor;
				ctx.font = fSize + "px " + "JetBrains Mono, monospace";
				ctx.fillStyle = "#818181";
				ctx.fillText(bike1.motor_nm + "Nm", 881*factor, (938-tOffSet)*factor);
				ctx.fillText(bike1.battery_wh + "Wh", 1002*factor, (938-tOffSet)*factor);
			}

		}
		//bike 1 text..
		var fSize = 22 * factor;
		ctx.font = fSize + "px " + "JetBrains Mono, monospace";
		ctx.fillStyle = "#8c0095";
		var xt1 = "| Bike 1 | X:" + extraX1 + " Y:" + extraY1;
		ctx.fillText(xt1, (canvas.width/2)-(ctx.measureText(xt1).width/2), 75*factor);
		
		
		
		//draw bike2 & logo image..
		if(bike2 && bike2.loading)
		{
			drawLoadingBike2();
		}
		else
		{
			//draw bike2 image..
			ctx.globalAlpha = alpha; 
			
			if(bikotic_wipe)
			{
				//create a clipping rectangle to create the wipe as per the position of alpha..					
				ctx.save();
				ctx.beginPath();	
				ctx.fillStyle = "#ffffff";	
				
				var clip_width = canvas.width*alpha;
				var clip_height = canvas.height;
				if(bikotic_wipe_direction == "horiz")
				{
					clip_width = canvas.width;
					clip_height = canvas.height*alpha;
				}		
				ctx.rect(0, 0, clip_width, clip_height);
				ctx.fill();
				ctx.closePath();
			    ctx.clip();
			    
			    ctx.globalAlpha = 1;
			    if(imageTag2.width > 0) 
			    {
					if(bikotic_img2_invert) ctx.filter = "invert(100%)";
					
					
					if(BIKOTIC_CanvasRotation == false)
					{
						ctx.drawImage(imageTag2, zX + (extraX2*zoomFactor), zY + (extraY2*zoomFactor), zWidth, zHeight);
					}
					else	
					{
						// Save the canvas state
						ctx.save();
						
						// Move the origin to the center of the image
						ctx.translate(zX + (extraX2 * zoomFactor) + zWidth / 2, zY + (extraY2 * zoomFactor) + zHeight / 2);
						
						// Rotate the canvas
						var angleInRadians = Math.PI / degreesToRadians(BIKOTIC_RotAmount);
						ctx.rotate(angleInRadians);
						
						// Scale the image (Zoom out)
						var scaleWidth = BIKOTIC_RotZoomAmount;  
						var scaleHeight = BIKOTIC_RotZoomAmount; 
						ctx.scale(scaleWidth, scaleHeight);
						
						// Draw the image
						ctx.drawImage(imageTag2, -zWidth / 2, -zHeight / 2, zWidth, zHeight);
						
						//draw the hill..
						ctx.drawImage(rotHill, -zWidth / 2, -zHeight / 2, zWidth, zHeight);
						
						// Restore the canvas state
						ctx.restore();
					}	
						
					
					if(bikotic_img2_invert) ctx.filter = "none";
				}
			    
			    //draw the logo..
				if(logo2.width > 0) ctx.drawImage(logo2, 0, 0, canvas.width, canvas.height);
				
				//draw the gearing stats..
				if(bike2 && bike2.model_des != "DUMMY") gearingStats(bike2, alpha);
				
				//gallery button if bike 2 has extra images..
				if(bike2 && bike2.gal_pics > 0) AddBike2Gallery();
			    
			    //add line to edge..
			    ctx.globalAlpha = 0.8;
			    ctx.beginPath();
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#333333";
				if(bikotic_wipe_direction == "vert") ctx.moveTo(clip_width, 0);
				if(bikotic_wipe_direction == "horiz") ctx.moveTo(0, clip_height);
				ctx.lineTo(clip_width, clip_height);
				ctx.stroke();
				
				ctx.restore();
			}
			else
			{
				//draw the image..
				if(imageTag2.width > 0) 
				{
					if(bikotic_img2_invert) ctx.filter = "invert(100%)";
					
					if(BIKOTIC_CanvasRotation == false)
					{
						ctx.drawImage(imageTag2, zX + (extraX2*zoomFactor), zY + (extraY2*zoomFactor), zWidth, zHeight);
					}
					else	
					{
						// Save the canvas state
						ctx.save();
						
						// Move the origin to the center of the image
						ctx.translate(zX + (extraX2 * zoomFactor) + zWidth / 2, zY + (extraY2 * zoomFactor) + zHeight / 2);
						
						// Rotate the canvas
						var angleInRadians = Math.PI / degreesToRadians(BIKOTIC_RotAmount);
						ctx.rotate(angleInRadians);
						
						// Scale the image (Zoom out)
						var scaleWidth = BIKOTIC_RotZoomAmount;  
						var scaleHeight = BIKOTIC_RotZoomAmount; 
						ctx.scale(scaleWidth, scaleHeight);
						
						// Draw the image
						ctx.drawImage(imageTag2, -zWidth / 2, -zHeight / 2, zWidth, zHeight);
						
						//draw the hill..
						ctx.drawImage(rotHill, -zWidth / 2, -zHeight / 2, zWidth, zHeight);
						
						// Restore the canvas state
						ctx.restore();
					}	
					
					
					if(bikotic_img2_invert) ctx.filter = "none";
				}
				
				//draw the logo..
				if(logo2.width > 0) ctx.drawImage(logo2, 0, 0, canvas.width, canvas.height);
				
				//draw the gearing stats..
				if(bike2 && bike2.model_des != "DUMMY") gearingStats(bike2, alpha);
				
				//gallery button if bike 2 has extra images..
				if(bike2 && bike2.gal_pics > 0) AddBike2Gallery();
			}
			
			//info panel..
			if(bike2 && bike2.model_des == "DUMMY")
			{
				selectDiv2.style.display = "none";
			}
			else
			{
				selectDiv2.style.opacity = alpha;
				selectDiv2.style.display = "block";
			}
			
			//motor and battery icons..
			if(bike2 && bike2.motor_nm != 0)
			{
				ctx.drawImage(motor_icon, 840*factor, (911-tOffSet)*factor, motor_icon.width*factor, motor_icon.height*factor);
				ctx.drawImage(battery_icon, 968*factor, (911-tOffSet)*factor, battery_icon.width*factor, battery_icon.height*factor);
				var fSize = 20 * factor;
				ctx.font = fSize + "px " + "JetBrains Mono, monospace";
				ctx.fillStyle = "#818181";
				ctx.fillText(bike2.motor_nm + "Nm", 881*factor, (938-tOffSet)*factor);
				ctx.fillText(bike2.battery_wh + "Wh", 1002*factor, (938-tOffSet)*factor);
			}
			
		}
		//bike 2 text..
		ctx.font = fSize + "px " + "JetBrains Mono, monospace";
		ctx.fillStyle = "#8c0095";
		var xt2 = "| Bike 2 | X:" + extraX2 + " Y:" + extraY2;
		ctx.fillText(xt2, (canvas.width/2)-(ctx.measureText(xt1).width/2), 75*factor);
		
		
		
		//switch the info z index for user entry..
		if(alpha == 0)
		{
			selectDiv.style.zIndex = 3;
			selectDiv2.style.zIndex = 2;
		}
		else
		{
			selectDiv.style.zIndex = 2;
			selectDiv2.style.zIndex = 3;
		}
		
		//fade graphic dots..
		ctx.globalAlpha = 1; 
		//var color = "#" + hexMix("8c0095", "c0c0c0", alpha);	
			
		
		var amount = 21;
		var space  = 24 * factor;	
		var dmeter = 6  * factor;
		var start  = ((window.innerWidth/2) - ((amount/2)*space)) + (space/2);
		var top    = 35 * factor;
		
		//grey blobs..
		for(var i = 0; i < amount; i++)
		{
			var color = "#c0c0c0";
			var newDi = dmeter; 
			ctx.beginPath(); ctx.arc(start + (i*space), top, newDi, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.fill();			
		}
		
		//main blobs..
		for(var i = 0; i < amount; i++)
		{	
			if(i == Math.round((amount-1) * alpha))
			{
				
				//light blob 1..
				color = "#" + hexMix("c0c0c0", "8c0095", .5); newDi = dmeter+(3 * factor);				
				if(i > 0 && i < amount-1)
				{
					ctx.beginPath(); ctx.arc(start + ((i-1)*space), top, newDi, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.fill();
					ctx.beginPath(); ctx.arc(start + ((i+1)*space), top, newDi, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.fill();
				}
				
				color = "#" + hexMix("c0c0c0", "8c0095", .25); newDi = dmeter+(2 * factor);	
				if(i > 1 && i < amount-2)
				{			
					ctx.beginPath(); ctx.arc(start + ((i-2)*space), top, newDi, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.fill();
					ctx.beginPath(); ctx.arc(start + ((i+2)*space), top, newDi, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.fill();
				}
				
				//main blob..
				color = "#8c0095"; newDi = dmeter+(4 * factor);				
				ctx.beginPath(); ctx.arc(start + (i*space), top, newDi, 0, 2 * Math.PI); ctx.fillStyle = color; ctx.fill();
								
			}
		}
		
		//percentaged text..		
		var fSize = 24 * factor;
		ctx.font = fSize + "px " + "JetBrains Mono, monospace";
		
		if(alpha == 0) ctx.fillStyle = "#8c0095"; else ctx.fillStyle = "#c0c0c0";
		ctx.fillText(Math.round(((1-alpha)*100)) + "%", start - (75*factor), top + (9*factor));
		
		if(alpha == 1) ctx.fillStyle = "#8c0095"; else ctx.fillStyle = "#c0c0c0";
		var percentTxt = Math.round((alpha*100)) + "%";
		ctx.fillText(percentTxt, start + ((amount*space)-3), top + (9*factor));
		var percentTxtWidth = ctx.measureText(percentTxt).width;
		
		//price and weight text..
		if(bike1 && bike2)
		{
			if(bike1.model_des != "DUMMY" && bike2.model_des != "DUMMY" && bike1.price != -999999.00 && bike2.price != -999999.00)
			{
				var dif = (bike1.price - bike2.price).toFixed(2); 
				var per;
				var fSize = 28 * factor;
				ctx.font = "bold " + fSize + "px " + "JetBrains Mono, monospace";
				var txt = ""; var txtWidth;
				if(alpha == 0)
				{
					per = Math.round((dif/bike2.price)*100); if(per < 0) per = 0 - per;
					if(dif > 0)
					{
						ctx.fillStyle = "#b0236f";
						txt = "+£" + numberWithCommas(dif) + " (" + per + "%)"; 
					}
					else
					{
						ctx.fillStyle = "#23b094";
						txt = "-£" + numberWithCommas(0-dif) + " (" + per + "%)";
					}
					//price..
					var tmpPrice = "£" + numberWithCommas(bike1.price);
					txtWidth = ctx.measureText(tmpPrice).width;
					ctx.fillText(tmpPrice, start - ((90*factor)+txtWidth), top + (11*factor));
					//diff..
					fSize = 18 * factor;
					ctx.font = "bold " + fSize + "px " + "JetBrains Mono, monospace";
					txtWidth = ctx.measureText(txt).width;
					ctx.fillText(txt, start - ((90*factor)+txtWidth), top + (33*factor));
				}
				if(alpha == 1)
				{
					per = Math.round((dif/bike1.price)*100); if(per < 0) per = 0 - per;
					if(dif < 0)
					{
						ctx.fillStyle = "#b0236f";
						txt = "+£" + numberWithCommas(0-dif) + " (" + per + "%)"; 
					}
					else
					{
						ctx.fillStyle = "#23b094";
						txt = "-£" + numberWithCommas(dif) + " (" + per + "%)";
					}
					//price..
					var tmpPrice = "£" + numberWithCommas(bike2.price);
					txtWidth = ctx.measureText(tmpPrice).width;
					ctx.fillText(tmpPrice, start + ((15*factor)+(amount*space)+percentTxtWidth), top + (11*factor));
					//diff..
					fSize = 18 * factor;
					ctx.font = "bold " + fSize + "px " + "JetBrains Mono, monospace";
					txtWidth = ctx.measureText(txt).width;
					ctx.fillText(txt, start + ((15*factor)+(amount*space)+percentTxtWidth), top + (33*factor));
				}
			}
			
			//weight difference..
			if(bike1.model_des != "DUMMY" && bike2.model_des != "DUMMY" && bike1.weight != 99 && bike2.weight != 99)
			{
				var dif = ((bike1.weight*1000) - (bike2.weight*1000)).toFixed(2); 
				var fSize = 18 * factor;
				ctx.font = "bold " + fSize + "px " + "JetBrains Mono, monospace";
				var txt = ""; var txtWidth;
				if(alpha == 0)
				{
					//bike 1 weight difference..
					if(dif > 0)
					{
						ctx.fillStyle = "#b0236f";
						txt = "+" + dif + "g"; 
						txtWidth = ctx.measureText(txt).width;
					}
					else
					{
						ctx.fillStyle = "#23b094";
						txt = "-" + (0-dif) + "g";
						txtWidth = ctx.measureText(txt).width;
					}
					ctx.fillText(txt, start - ((90*factor)+txtWidth), top + (51*factor));															
				}
				if(alpha == 1)
				{
					//bike 2 weight difference..
					if(dif < 0)
					{
						ctx.fillStyle = "#b0236f";
						txt = "+" + (0-dif) + "g"; 
						txtWidth = ctx.measureText(txt).width;
					}
					else
					{
						ctx.fillStyle = "#23b094";
						txt = "-" + dif + "g";
						txtWidth = ctx.measureText(txt).width;
					}
					ctx.fillText(txt, start + ((15*factor)+(amount*space)+percentTxtWidth), top + (51*factor));
				}
			}
			
			//geo differences..
			if(bike1.model_des != "DUMMY" && bike2.model_des != "DUMMY")
			{
				var fSize = 16 * factor;
				var spc = 20;
				var tp = 846;
				ctx.font = "bold " + fSize + "px " + "JetBrains Mono, monospace";							
				
				var xBK1; var xBK2; var doGEO = false;
				if(alpha == 0){xBK1 = bike1; xBK2 = bike2; doGEO = true;}
				if(alpha == 1){xBK1 = bike2; xBK2 = bike1; doGEO = true;}
				
				if(doGEO)
				{
					//size check..
					var b1_match = "";
					var b2_match = "";
					if(bike1.photo_frame_size != bike1.geo_size) b1_match = "!";
					if(bike2.photo_frame_size != bike2.geo_size) b2_match = "!";
					
					//caption..
					ctx.fillStyle = "#7e7e7e";
					ctx.fillText("GEO: " + b1_match + bike1.geo_size + " vs " + b2_match + bike2.geo_size, 24*factor, (tp+(spc*1))*factor);
					
					//VTT..
					ctx.fillText("VTT: " + geoDiffer(xBK1.horizontal_top_tube,xBK2.horizontal_top_tube, "mm"), 24*factor, (tp+(spc*2))*factor);
					
					//Reach..
					ctx.fillText("RCH: " + geoDiffer(xBK1.reach,xBK2.reach, "mm"), 24*factor, (tp+(spc*3))*factor);
					
					//Stack..
					ctx.fillText("STK: " + geoDiffer(xBK1.stack,xBK2.stack, "mm"), 24*factor, (tp+(spc*4))*factor);
					
					//wheelbase..
					ctx.fillText("WHB: " + geoDiffer(xBK1.wheelbase,xBK2.wheelbase, "mm"), 24*factor, (tp+(spc*5))*factor);
					
					//Head angle..
					ctx.fillText("HDA: " + geoDiffer(xBK1.head_angle,xBK2.head_angle, "°"), 24*factor, (tp+(spc*6))*factor);
					
					//Chainstay..
					ctx.fillText("CHS: " + geoDiffer(xBK1.chainstay,xBK2.chainstay, "mm"), 24*factor, (tp+(spc*7))*factor);
					
					//BB Drop..
					ctx.fillText("BBD: " + geoDiffer(xBK1.bb_drop,xBK2.bb_drop, "mm"), 24*factor, (tp+(spc*8))*factor);
					
					//if the sizes dont match..
					if(alpha < .5 && b1_match != "")
					{
						ctx.fillStyle = "red";
						ctx.fillText("photo and GEO size don't match", 24*factor, (tp+(spc*9))*factor);
					}
					if(alpha > .5 && b2_match != "")
					{
						ctx.fillStyle = "red";
						ctx.fillText("photo and GEO size don't match", 24*factor, (tp+(spc*9))*factor);
					}
										
				}			
				
				function geoDiffer(s1, s2, txt)
				{
					if(s1 == 0 || s2 == 0) 
					{
						ctx.fillStyle = "#7e7e7e";
						return "n/a";
					}
					
					//straight forward difference..
					var dif = (s1 - s2).toFixed(1);
								
					
					//s1 is smaller than s2..
					if(dif < 0)
					{
						//red..
						ctx.fillStyle = "#b0236f";
						
						//percent..
						var dif = (s2-s1).toFixed(2);
						
						return "-" + dif + txt;
					}
					
					//s1 is bigger than s2..
					if(dif > 0)
					{
						//green..
						ctx.fillStyle = "#23b094";
						
						//percent..
						var dif = (s1-s2).toFixed(2);
						
						return "+" + dif + txt;
					}
					
					//same..
					if(dif == 0)
					{
						//grey..
						ctx.fillStyle = "#7e7e7e";
						return "same";
					}
				}
			}			
		}
		
		//draw the BIKOTIC LOGO..
		ctx.drawImage(BIKOTIC_LOGO, 0, 0, canvas.width, canvas.height);	
		
		//draw the similar bikes button..
		if(bike1 && alpha < 0.5 && bike1.model_des != "DUMMY")
		{
			ctx.drawImage(similar_icon, 1706*factor, 183*factor, similar_icon.width*factor, similar_icon.height*factor);
		}
		if(bike2 && alpha > 0.5 && bike2.model_des != "DUMMY")
		{
			ctx.drawImage(similar_icon, 1706*factor, 183*factor, similar_icon.width*factor, similar_icon.height*factor);
		}
		
		//data dsclaimer..
		fSize = 14 * factor;
		ctx.font = fSize + "px " + "JetBrains Mono, monospace";
		ctx.fillStyle = "#bbbbbb";
		var dTxt = "*Every effort is made to ensure the accuracy of the data collected on this site, on the date of capture. Specifications and prices change over time, check the manufacturer’s website for updates";
		ctx.fillText(dTxt, 6*factor, canvas.height - (6*factor));
		
		
		
		
		
		//--------------------------------------------------------------DRAW INTERFACE..
				
		//main menu..
		ctx.drawImage(menu_main, 1837*factor, (menuButtTopOffset+132)*factor, menu_main.width*factor, menu_main.height*factor);
		
		//the starred indicator..
		if(BIKOTIC_MyList != "286") ctx.drawImage(menu_main_starred, 1822*factor, 201*factor, menu_main_starred.width*factor, menu_main_starred.height*factor);
		
		
		//--------------------------------------------------------------INTERFACE..
		
		//wipe first touch..
		if(bikotic_wipe_first_touch)
		{
			ctx.drawImage(wipe_first_touch_image, 785*factor, 305*factor, wipe_first_touch_image.width*factor, wipe_first_touch_image.height*factor);
		}
		
		//warning that pre loaded bikes are loading..
		if(BIKOTIC_PreLoadingBike1Warning || BIKOTIC_PreLoadingBike2Warning)
		{
			var tmpAlpha = ctx.globalAlpha;
			ctx.globalAlpha = .8;
			
			fSize = 85 * factor;
			ctx.font = fSize + "px " + "JetBrains Mono, monospace";
			var tmpW = "LOADING BIKES";
			
			BIKOTIC_DrawRoundedRect(ctx, (canvas.width/2)-(ctx.measureText(tmpW).width/2), (canvas.height/2)-(120*factor), ctx.measureText(tmpW).width+(6*factor), 80*factor, 12*factor, "white", "#333333", 4*factor);
			
			ctx.fillStyle = "#333333";
			ctx.fillText(tmpW, (canvas.width/2)-(ctx.measureText(tmpW).width/2), (canvas.height/2)-(50*factor));
			
			ctx.globalAlpha = tmpAlpha;
		}
		
		
		//edit dot - was the last frame different? if it was don't edit..
		if(dotAlpha != alpha)
		{
			//draw the dot to stop the auto edit..
			ctx.fillStyle = "#818181";
			ctx.fillRect(1*factor, 1*factor, 5*factor, 5*factor);
			
			//set dotAlpha..
			dotAlpha = alpha;
		}
		
		
		//draw the comments button..
		if(bike1 && bike1.model_des != "DUMMY" && alpha == 0) 
		{
			//comment button..
			ctx.drawImage(comments_icon, 887*factor, 945*factor, comments_icon.width*factor, comments_icon.height*factor);
			
			//add the amount of comment..
			ctx.fillStyle = "#32b59b";
			ctx.fillText(bike1.comment_count, 924*factor, 950*factor);	
		}
		if(bike2 && bike2.model_des != "DUMMY" && alpha == 1) 
		{
			//comment button..
			ctx.drawImage(comments_icon, 887*factor, 945*factor, comments_icon.width*factor, comments_icon.height*factor);
			
			//add the amount of comment..
			ctx.fillStyle = "#32b59b";
			ctx.fillText(bike2.comment_count, 924*factor, 950*factor);
		}
		
		
	}
	
	
	function BIKOTIC_DrawRoundedRect(ctx, left, top, width, height, radius, color, borderColor, borderWidth)
	{
		ctx.beginPath();
		ctx.moveTo(left + radius, top);
		ctx.lineTo(left + width - radius, top);
		ctx.quadraticCurveTo(left + width, top, left + width, top + radius);
		ctx.lineTo(left + width, top + height - radius);
		ctx.quadraticCurveTo(left + width, top + height, left + width - radius, top + height);
		ctx.lineTo(left + radius, top + height);
		ctx.quadraticCurveTo(left, top + height, left, top + height - radius);
		ctx.lineTo(left, top + radius);
		ctx.quadraticCurveTo(left, top, left + radius, top);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
		ctx.lineWidth = borderWidth;
		ctx.strokeStyle = borderColor;
		ctx.stroke();
	}

	
	function hexMix(colorFrom, colorTo, ratio) {
		const hex = function(x) {
			x = x.toString(16);
			return (x.length == 1) ? '0' + x : x;
		};
	
		let r = Math.ceil(parseInt(colorTo.substring(0, 2), 16) * ratio + parseInt(colorFrom.substring(0, 2), 16) * (1 - ratio)),
			g = Math.ceil(parseInt(colorTo.substring(2, 4), 16) * ratio + parseInt(colorFrom.substring(2, 4), 16) * (1 - ratio)),
			b = Math.ceil(parseInt(colorTo.substring(4, 6), 16) * ratio + parseInt(colorFrom.substring(4, 6), 16) * (1 - ratio));
	
		return hex(r) + hex(g) + hex(b);
	}
	
	function BIKOTIC_ContainsOnlyNumbersAndCommas(str) 
	{
		return /^(?:\d+,)*\d+$/.test(str);
	}

	function BIKOTIC_UnshortenUrl(origin, code)
	{
		var url = CODEBASE + "SHARE-V1/BIKOTIC_GET_URL.pl";
	
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{			
				var tmpDIV = document.createElement("DIV");
				tmpDIV.innerHTML = this.responseText;
				var tmp = origin + "?" + tmpDIV.innerHTML.replace(/~/g, '=').replace(/#/g, '&');
				document.title = "LOAD SHORT URL";
				window.history.pushState({}, "", tmp);
				init(false);
			}
		};
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("cid=" + code); 
		
	}
	
	
	var BIKOTIC_ItsMe = false;
	var BIKOTIC_ShowNotPublished = false;
	var BIKOTIC_PreLoadBike1 = "empty";
	var BIKOTIC_PreLoadBike2 = "empty";
	var BIKOTIC_MyList = "286";
	var BIKOTIC_Origin; //URL minus parameters..
	var BIKOTIC_APP_TYPE = "DESKTOP";
	function init(showPopup = true)
	{ 
		var bits = window.location.href.split(/[?&]/);
		
		//get origin URL..
		BIKOTIC_Origin = bits[0];
		
		//check if we have a shortened url..
		if(bits[1] && bits[1].length === 8)
		{
			BIKOTIC_UnshortenUrl(bits[0], bits[1]); 
			return;
		}
		
		//extract any vars from the URL..
		const urlParams = new URLSearchParams(window.location.search);
		if(urlParams.get('itsme') == "true") BIKOTIC_ItsMe = true; 
		if(urlParams.get('menu') == "false") 
		{
			bikotic_wipe = true; 
			bikotic_wipe_direction = "vert";
			bikotic_wipe_first_touch = true;
			alpha = 0.5;
			showPopup = false; 
		}
		if(urlParams.get('show_unpublished') == "true") BIKOTIC_ShowNotPublished = true; 
		
		//load bikes from url if any..
		if(BIKOTIC_ContainsOnlyNumbersAndCommas(urlParams.get('bike1'))) 
		{
			BIKOTIC_PreLoadBike1 = urlParams.get('bike1');
		}
		if(BIKOTIC_ContainsOnlyNumbersAndCommas(urlParams.get('bike2'))) 
		{
			BIKOTIC_PreLoadBike2 = urlParams.get('bike2');
		}
		
		//load starred from URL, if a valid series of ids..
		if(BIKOTIC_ContainsOnlyNumbersAndCommas(urlParams.get('starred'))) 
		{
			BIKOTIC_MyList = urlParams.get('starred'); 
			
			if(FILTER_SplitMyList() > 29)
			{
				alert("Starred list is invalid");
				window.location.href = "https://bikotic.com";
				return;
			}
		}
		
		//get main div..
		mainDiv = document.getElementById("BIKOTIC-BIKE-VIEWER");
		mainDiv.style.position = "relative";	
		
		//make the session id..
		BIKOTIC_SessionID = generateSessionID(new Date()); 

		//decide if we go mobile..
		if(window.innerWidth < 1024)
		{
			//initialise mobile version..
			MOBILE_Init();
			BIKOTIC_APP_TYPE = "MOBILE";
		}
		else
		{
			//fully initialise BIKOTIC..
			
			// Add mouse event to detect exit intent
			document.addEventListener("mouseleave", function(event) 
			{ 
				if(event.clientY <= 0) showExitIntentPopup();
			});
			
			init2();
			BIKOTIC_APP_TYPE = "DESKTOP";
		}
		
		//do we want the intro pop up?..
		if(showPopup) createPopup();
		
	}
	
	
	
	function generateSessionID(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    
    const sessionId = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    return sessionId;
}
	
	
	
	//youtube pop up..
	function createYouTubeVideoPopup(videoId) {
    // Step 1: Create the overlay div
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    
    // Step 2: Create the popup div
    const popup = document.createElement('div');
    popup.style.position = 'relative';
    popup.style.width = '80%';
    popup.style.maxWidth = '640px';
    popup.style.backgroundColor = 'white';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    popup.style.padding = '20px';
    popup.style.zIndex = '1001';

    // For responsive design, maintaining 16:9 aspect ratio
    const aspectRatioBox = document.createElement('div');
    aspectRatioBox.style.position = 'relative';
    aspectRatioBox.style.width = '100%';
    aspectRatioBox.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
    popup.appendChild(aspectRatioBox);
    
    // Step 3: Embed the YouTube video
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    aspectRatioBox.appendChild(iframe);
    
    // Step 4: Close functionality when clicking outside the popup
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
    
    // Append the popup to the overlay and the overlay to the body
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}




	
	//pop up intro window..
	function createPopup() {
  // Create the overlay div
  const CHT_popupOverlay = document.createElement('div');
  CHT_popupOverlay.style.position = 'absolute';
  CHT_popupOverlay.style.top = '0';
  CHT_popupOverlay.style.left = '0';
  CHT_popupOverlay.style.width = '100%';
  CHT_popupOverlay.style.height = '100%';
  //CHT_popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  CHT_popupOverlay.style.zIndex = '1000';

  // Create the popup window div
  const CHT_popupWindow = document.createElement('div');
  CHT_popupWindow.style.position = 'relative';
  CHT_popupWindow.style.width = '80%';
  CHT_popupWindow.style.maxWidth = '400px';
  CHT_popupWindow.style.margin = '100px auto';
  CHT_popupWindow.style.padding = '20px';
  CHT_popupWindow.style.backgroundColor = '#fff';
  CHT_popupWindow.style.border = '1px solid #ccc';
  CHT_popupWindow.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  CHT_popupWindow.style.borderRadius = '20px';
  CHT_popupWindow.style.zIndex = '1001';

  // Create and append the logo
  const CHT_logo = document.createElement('img');
  CHT_logo.src = CODEBASE + "IMGz/HOME_POP_BIKOTIC_LOGO.png";
  CHT_logo.style.display = 'block';
  CHT_logo.style.margin = '0 auto 20px auto';
  CHT_popupWindow.appendChild(CHT_logo);

  // Create the close button
  const CHT_closePopupBtn = document.createElement('span');
  CHT_closePopupBtn.innerText = 'X';
  CHT_closePopupBtn.style.position = 'absolute';
  CHT_closePopupBtn.style.top = '10px';
  CHT_closePopupBtn.style.right = '15px';
  CHT_closePopupBtn.style.cursor = 'pointer';
  CHT_closePopupBtn.style.fontSize = '20px';
  CHT_closePopupBtn.style.color = '#afafaf';
  CHT_closePopupBtn.style.fontFamily = 'sans-serif';

  // Append the close button to the popup window
  CHT_popupWindow.appendChild(CHT_closePopupBtn);

  // Create buttons with specified titles
  const titles = ['QUICK START HOW TO VIDEO', 'SEARCH FOR BIKES', 'RECENTLY ADDED BIKES', 'HOT KEYS', 'CONTACT BIKOTIC', 'LINK & SHARE CURRENT SETUP', 'BUY ME A COFFEE'];
  const imagePaths = [
    CODEBASE + "IMGz/HOME_POP_PLAY.png",
    CODEBASE + "IMGz/HOME_POP_SEARCH.png",
    CODEBASE + "IMGz/HOME_POP_RECENT.png",
    CODEBASE + "IMGz/HOME_POP_HOTKEYS.png",
    CODEBASE + "IMGz/HOME_POP_CONTACT.png",
    CODEBASE + "IMGz/HOME_POP_SHARE.png",
    CODEBASE + "IMGz/HOME_POP_COFFEE.png"
  ];

  titles.forEach((title, index) => {
    const CHT_button = document.createElement('button');
    CHT_button.innerText = title;
    CHT_button.style.display = 'flex';
    CHT_button.style.alignItems = 'center';
    CHT_button.style.width = '100%';
    CHT_button.style.margin = (index === 0 ? '20px auto 10px auto' : '10px auto');
    CHT_button.style.padding = '20px 20px';
    CHT_button.style.border = '1px solid #afafaf';
    CHT_button.style.backgroundColor = 'white';
    CHT_button.style.color = '#333333';
    CHT_button.style.fontSize = '18px';
    CHT_button.style.borderRadius = '10px';
    CHT_button.style.cursor = 'pointer';
    CHT_button.style.textAlign = 'left';

    // Create an image (icon) element
    const CHT_icon = document.createElement('img');
    CHT_icon.src = imagePaths[index];
    CHT_icon.style.width = '30px';
    CHT_icon.style.height = '30px';
    CHT_icon.style.marginRight = '10px';

    // Add the icon to the button
    CHT_button.insertBefore(CHT_icon, CHT_button.firstChild);

    CHT_button.addEventListener('click', () => 
    {
		if(title == "QUICK START HOW TO VIDEO")
		{
			createYouTubeVideoPopup("60eQLtPf108");
			fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=QUICK START VIDEO');
		}
		if(title == "SEARCH FOR BIKES")
		{
			CHT_popupOverlay.style.display = 'none';
			FILTER_ShowFilters(false); 
			BIKOTIC_UpdatePageNameURL("BIKE FINDER", true, "bf");
			fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=SEARCH');
		}
		if(title == "RECENTLY ADDED BIKES")
		{
			CHT_popupOverlay.style.display = 'none';
			RECENT_ShowRecent(); 
			BIKOTIC_UpdatePageNameURL("RECENT BIKES", true, "rb");
			fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=RECENT');
		}
		if(title == "HOT KEYS")
		{
			createHotkeyPopup();
			fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=HOTKEYS');
		}
		if(title == "CONTACT BIKOTIC")
		{
			CHT_popupOverlay.style.display = 'none';
			MESSENGER_ShowMessenger(); 
			BIKOTIC_UpdatePageNameURL("MESSAGE", true, "msg");
			fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=CONTACT');
		}
		if(title == "LINK & SHARE CURRENT SETUP")
		{
			CHT_popupOverlay.style.display = 'none';
			SHARE_ShowShare(); 
			BIKOTIC_UpdatePageNameURL("SHARE BIKOTIC", true, "shr");
			fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=SHARE');
		}
		if(title == "BUY ME A COFFEE")
		{
			CHT_popupOverlay.style.display = 'none';
			donate(); 
			BIKOTIC_UpdatePageNameURL("DONATE", true, "dnt");
			fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=BUY ME  A COFFEE');
		}
		
    });

	if(BIKOTIC_APP_TYPE == "MOBILE" && title == "HOT KEYS")
	{
		//no hot keys on mobile..
	}
	else
	{
		CHT_popupWindow.appendChild(CHT_button);
	}
  });

  // Create links
  const CHT_privacyLink = document.createElement('a');
  CHT_privacyLink.innerText = 'Privacy Policy';
  CHT_privacyLink.href = CODEBASE + "PRIVACY_POLICY/BIKOTIC_PRIVACY_POLICY.html";
  CHT_privacyLink.style.display = 'block';
  CHT_privacyLink.style.margin = '20px auto';
  CHT_privacyLink.style.fontSize = '14px';
  CHT_privacyLink.style.textAlign = 'center';
  CHT_privacyLink.style.color = '#333333';
  CHT_privacyLink.style.fontFamily = 'sans-serif';
  CHT_privacyLink.style.textDecoration = 'none';

  const CHT_aboutLink = document.createElement('a');
  CHT_aboutLink.innerText = 'About bikotic';
  CHT_aboutLink.href =  CODEBASE + "ABOUT_BIKOTIC/ABOUT_BIKOTIC.html";
  CHT_aboutLink.style.display = 'block';
  CHT_aboutLink.style.margin = '20px auto';
  CHT_aboutLink.style.fontSize = '14px';
  CHT_aboutLink.style.textAlign = 'center';
  CHT_aboutLink.style.color = '#333333';
  CHT_aboutLink.style.fontFamily = 'sans-serif';
  CHT_aboutLink.style.textDecoration = 'none';

  const CHT_linkContainer = document.createElement('div');
  CHT_linkContainer.style.display = 'flex';
  CHT_linkContainer.style.justifyContent = 'center';
  CHT_linkContainer.style.marginTop = '20px';

  CHT_linkContainer.appendChild(CHT_privacyLink);
  CHT_linkContainer.appendChild(CHT_aboutLink);

  // Append the links to the popup window
  CHT_popupWindow.appendChild(CHT_linkContainer);

  // Append the popup window to the overlay
  CHT_popupOverlay.appendChild(CHT_popupWindow);

  // Append the overlay to the body of the document
  document.body.appendChild(CHT_popupOverlay);

  // Close the popup when the close button is clicked
  CHT_closePopupBtn.addEventListener('click', () => {
    CHT_popupOverlay.style.display = 'none';
  });

  // Close the popup when clicking outside the window
  CHT_popupOverlay.addEventListener('click', (e) => {
    if (e.target === CHT_popupOverlay) {
      CHT_popupOverlay.style.display = 'none';
    }
  });
}


//----------------------------------------------------------------------HOT KEYS..
function createHotkeyPopup()
{
	
  // Create the overlay div
  const CHT_popupOverlay = document.createElement('div');
  CHT_popupOverlay.style.position = 'absolute';
  CHT_popupOverlay.style.top = '0';
  CHT_popupOverlay.style.left = '0';
  CHT_popupOverlay.style.width = '100%';
  CHT_popupOverlay.style.height = '100%';
  //CHT_popupOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  CHT_popupOverlay.style.zIndex = '2000';

  // Create the popup window div
  const CHT_popupWindow = document.createElement('div');
  CHT_popupWindow.style.position = 'relative';
  CHT_popupWindow.style.width = '80%';
  CHT_popupWindow.style.maxWidth = '400px';
  CHT_popupWindow.style.margin = '100px auto';
  CHT_popupWindow.style.padding = '20px';
  CHT_popupWindow.style.backgroundColor = '#fff';
  CHT_popupWindow.style.border = '1px solid #ccc';
  CHT_popupWindow.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  CHT_popupWindow.style.borderRadius = '20px';
  CHT_popupWindow.style.zIndex = '1001';

  // Create and append the logo
  const CHT_logo = document.createElement('img');
  CHT_logo.src = CODEBASE + "IMGz/HOME_POP_BIKOTIC_LOGO.png";
  CHT_logo.style.display = 'block';
  CHT_logo.style.margin = '0 auto 20px auto';
  CHT_popupWindow.appendChild(CHT_logo);
  
  CHT_popupWindow.innerHTML += `
  
<table style="height: 425px; border-collapse: collapse; width: 261px; margin-left: auto; margin-right: auto; font-family: oswald; font-size:20px" border="1">
<tbody>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>F</strong></span></td>
<td style="width: 220.125px;">&nbsp;Fade</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>V</strong></span></td>
<td style="width: 220.125px;">&nbsp;Vertical wipe</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>H</strong></span></td>
<td style="width: 220.125px;">&nbsp;Horizontal wipe</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>I</strong></span></td>
<td style="width: 220.125px;">&nbsp;Invert image</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>S</strong></span></td>
<td style="width: 220.125px;">&nbsp;Silhouettes</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>Z</strong></span></td>
<td style="width: 220.125px;">&nbsp;Zoom in+</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>X</strong></span></td>
<td style="width: 220.125px;">&nbsp;Zoom out-</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>SPACE</strong></span></td>
<td style="width: 220.125px;">&nbsp;Pan</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>C</strong></span></td>
<td style="width: 220.125px;">&nbsp;Reset zoom</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>&larr;</strong></span></td>
<td style="width: 220.125px;">&nbsp;Move left</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>&rarr;</strong></span></td>
<td style="width: 220.125px;">&nbsp;Move right</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>&uarr;</strong></span></td>
<td style="width: 220.125px;">&nbsp;Move up</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>&darr;</strong></span></td>
<td style="width: 220.125px;">&nbsp;Move down</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>R</strong></span></td>
<td style="width: 220.125px;">&nbsp;Reset move</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>/</strong></span></td>
<td style="width: 220.125px;">&nbsp;Hill</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>.</strong></span></td>
<td style="width: 220.125px;">&nbsp;Clockwise</td>
</tr>
<tr>
<td style="width: 33.875px; text-align: center;"><span style="color: #333333;"><strong>,</strong></span></td>
<td style="width: 220.125px;">&nbsp;Anticlockwise</td>
</tr>
</tbody>
</table>
<br><br>
  
  `;

  // Create the close button
  const CHT_closePopupBtn = document.createElement('span');
  CHT_closePopupBtn.innerText = 'X';
  CHT_closePopupBtn.style.position = 'absolute';
  CHT_closePopupBtn.style.top = '10px';
  CHT_closePopupBtn.style.right = '15px';
  CHT_closePopupBtn.style.cursor = 'pointer';
  CHT_closePopupBtn.style.fontSize = '20px';
  CHT_closePopupBtn.style.color = '#afafaf';
  CHT_closePopupBtn.style.fontFamily = 'sans-serif';

  // Append the close button to the popup window
  CHT_popupWindow.appendChild(CHT_closePopupBtn);
  
  // Close the popup when the close button is clicked
  CHT_closePopupBtn.addEventListener('click', () => {
    CHT_popupOverlay.style.display = 'none';
  });
  
  // Close the popup when clicking outside the window
  CHT_popupOverlay.addEventListener('click', (e) => {
    if (e.target === CHT_popupOverlay) {
      CHT_popupOverlay.style.display = 'none';
    }
  });
  
  // Append the popup window to the overlay
  CHT_popupOverlay.appendChild(CHT_popupWindow);

  // Append the overlay to the body of the document
  document.body.appendChild(CHT_popupOverlay);

}
//----------------------------------------------------------------------HOT KEYS..


	var BIKOTIC_PreLoadingBike1Warning = false;
	var BIKOTIC_PreLoadingBike2Warning = false;
	function init2()
	{
		
		//create tags to load and hold bike & logo images..
		imageTag1 		= document.createElement("IMG"); 
		imageTag2 		= document.createElement("IMG"); 
		logo1			= document.createElement("IMG");
		logo2			= document.createElement("IMG");
		BIKOTIC_LOGO	= document.createElement("IMG");
		BIKOTIC_LOGO.src = CODEBASE + "IMGz/BIKOTIC-LOGO-V2.png";
		
		rotHill			= document.createElement("IMG");
		rotHill.src		= CODEBASE + "IMGz/BIKOTIC_Ground.png";
		
		
		//--------------------------------------------------------------LOAD INTERFACE ELEMENTS..
		
		menu_main = document.createElement("IMG");
		menu_main.src = CODEBASE + "IMGz/menu_main_2.5.png";	
		
		menu_main_starred = document.createElement("IMG");
		menu_main_starred.src = CODEBASE + "IMGz/main_starred.png";	
		
		wipe_first_touch_image = document.createElement("IMG");
		wipe_first_touch_image.src = CODEBASE + "IMGz/BIKOTIC-Splitter.png";	
		
		//--------------------------------------------------------------LOAD INTERFACE ELEMENTS..
		
		motor_icon = document.createElement("IMG");
		motor_icon.src = CODEBASE + "IMGz/motor_icon.png";
		
		battery_icon = document.createElement("IMG");
		battery_icon.src = CODEBASE + "IMGz/battery_icon.png";
		
		comments_icon = document.createElement("IMG");
		comments_icon.src = CODEBASE + "IMGz/BIKOTIC_COMMENTS.png";
		
		similar_icon = document.createElement("IMG");
		similar_icon.src = CODEBASE + "IMGz/BIKOTIC_Similar_butt.png";
		
		//image gallery image holders..
		bike1_galPic0 = document.createElement("IMG");
		bike1_galPic1 = document.createElement("IMG");
		bike1_galPic2 = document.createElement("IMG");
		bike1_galPic3 = document.createElement("IMG");
		bike1_galPic4 = document.createElement("IMG");
		bike2_galPic0 = document.createElement("IMG");
		bike2_galPic1 = document.createElement("IMG");
		bike2_galPic2 = document.createElement("IMG");
		bike2_galPic3 = document.createElement("IMG");
		bike2_galPic4 = document.createElement("IMG");
		
		//image gallery assign draw onload..
		bike1_galPic1.onload = draw;
		bike1_galPic2.onload = draw;
		bike1_galPic3.onload = draw;
		bike1_galPic4.onload = draw;
		bike2_galPic1.onload = draw;
		bike2_galPic2.onload = draw;
		bike2_galPic3.onload = draw;
		bike2_galPic4.onload = draw;
								
		//get bikes..
		getBikeInfo(973, "bike1");
		getBikeInfo(16, "bike2");
		
		//reset the main div..
		mainDiv.innerHTML = "";	
		
	//BIKE 1 SETUP...................................................
		//create the selction div and stuff..
		selectDiv = document.createElement("DIV");	
		selectDiv.id = "selectDiv";	
		selectDiv.style.position = "absolute";
		selectDiv.style.paddingLeft = "1vw";
		selectDiv.style.zIndex = 3;	
		selectDiv.style.userSelect = "none";
		mainDiv.appendChild(selectDiv);			
		
		//make AJAX call to get manufacturers..
		requestAJAX(getOptionsURL, "table=manufacturers", "items=name,id", "", "", "", "", "direction=ASC", doNext);
		function doNext(aJSON)
		{
			//create the man select for bike 1..
			createSelect(onManufacturerSelect, aJSON, selectDiv, "bike1Manufacturer_selectID", "MANUFACTURER", "manufacturer");
			
			//check to see if there are any bikes to pre load from the URL..
			if(BIKOTIC_PreLoadBike1 != "empty")
			{
				alpha = 0;
				var bits = BIKOTIC_PreLoadBike1.split(",");
				openRecentBike1(bits[0], bits[1], bits[2], bits[3]);
				
				BIKOTIC_PreLoadingBike1Warning = true;
			}
		}		
		
	//BIKE 2 SETUP...................................................
		//create the selction div and stuff..
		selectDiv2 = document.createElement("DIV");
		selectDiv2.id = "selectDiv2";
		selectDiv2.style.position = "absolute";
		selectDiv2.style.paddingLeft = "1vw";
		selectDiv2.style.zIndex = 2;	
		selectDiv2.style.userSelect = "none";
		mainDiv.appendChild(selectDiv2);			
		
		//selectDiv2.style.left = "500px"; 
		//selectDiv2.style.backgroundColor = "red";
		
		//make AJAX call to get manufacturers..
		requestAJAX(getOptionsURL, "table=manufacturers", "items=name,id", "", "", "", "", "direction=ASC", doNext2);
		function doNext2(aJSON)
		{
			createSelect(onManufacturerSelectBike2, aJSON, selectDiv2, "bike2Manufacturer_selectID", "MANUFACTURER", "manufacturer");
			
			//check to see if there are any bikes to pre load from the URL..
			if(BIKOTIC_PreLoadBike2 != "empty")
			{
				alpha = 1;
				var bits = BIKOTIC_PreLoadBike2.split(",");
				openRecentBike1(bits[0], bits[1], bits[2], bits[3]);
				
				BIKOTIC_PreLoadingBike2Warning = true;
			}
		}		
		
		
		//create a canvas to draw on..					
		canvas = document.createElement("CANVAS");	
		canvas.style.position = "absolute";
		canvas.style.zIndex = 1;	
		canvas.onmousedown 	= mouseDown;
		canvas.onmousemove 	= mouseMove;
		canvas.onmouseup 	= mouseUp;
		canvas.onmouseleave	= mouseUp;
		canvas.ontouchstart = touchDown;
		canvas.ontouchmove 	= touchMove;
		ctx = canvas.getContext("2d");	
		ctx.imageSmoothingEnabled = false;
		mainDiv.appendChild(canvas);
		
	}
	
	function onManufacturerSelect() //this happens when manufacturer select changes..
	{			
		//tidy up an previous selects..
		removeOldSelects(["bike1Des_selectID", "bike1Year_selectID", "bike1Model_selectID", "br1", "br2"], "info_div");
		
		//return if value is void..
		if(document.getElementById("bike1Manufacturer_selectID").value == "void") return;
		
		//create a new line..
		var br = document.createElement("BR"); br.id = "br1"; selectDiv.append(br);		
		
		//make AJAX call to get models..
		requestAJAX(getOptionsURL, "table=models", "items=name,id", "whereX=manufacturer_id", "whereY=" + document.getElementById("bike1Manufacturer_selectID").value, "", "", "direction=ASC", doNext);
		function doNext(aJSON){createSelect(onModelSelect, aJSON, selectDiv, "bike1Model_selectID", "MODEL?", "model");}		
	}
	
	function onManufacturerSelectBike2() //this happens when manufacturer select changes..
	{			
		//tidy up an previous selects..
		removeOldSelects(["bike2Des_selectID", "bike2Year_selectID", "bike2Model_selectID", "br11", "br22"], "info_div2");
		
		//return if value is void..
		if(document.getElementById("bike2Manufacturer_selectID").value == "void") 
		{
			return;
		}
		
		//create a new line..
		var br = document.createElement("BR"); br.id = "br11"; selectDiv2.append(br);		
		
		//make AJAX call to get models..
		requestAJAX(getOptionsURL, "table=models", "items=name,id", "whereX=manufacturer_id", "whereY=" + document.getElementById("bike2Manufacturer_selectID").value, "", "", "direction=ASC", doNext2);
		function doNext2(aJSON){createSelect(onModelSelectBike2, aJSON, selectDiv2, "bike2Model_selectID", "MODEL?", "model");}		
	}
	
	function onModelSelect() //this happens when model select changes..
	{
		//tidy up an previous selects..
		removeOldSelects(["bike1Des_selectID", "bike1Year_selectID"], "info_div");
		
		//return if value is void..
		if(document.getElementById("bike1Model_selectID").value == "void") return;
		
		//make AJAX call to get years..
		requestAJAX(getOptionsURL, "table=bikes", "items=model_year,model_year", "whereX=model_id", "whereY=" + document.getElementById("bike1Model_selectID").value, "", "", "direction=DESC", doNext);
		function doNext(aJSON){createSelect_Year(onYearSelect, aJSON, selectDiv, "bike1Year_selectID");}		
	}
	
	function onModelSelectBike2() //this happens when model select changes..
	{
		//tidy up an previous selects..
		removeOldSelects(["bike2Des_selectID", "bike2Year_selectID"], "info_div2");
		
		//return if value is void..
		if(document.getElementById("bike2Model_selectID").value == "void") return;
		
		//make AJAX call to get years..
		requestAJAX(getOptionsURL, "table=bikes", "items=model_year,model_year", "whereX=model_id", "whereY=" + document.getElementById("bike2Model_selectID").value, "", "", "direction=DESC", doNext2);
		function doNext2(aJSON){createSelect_Year(onYearSelectBike2, aJSON, selectDiv2, "bike2Year_selectID");}		
	}
	
	function onYearSelect() //this happens when year select changes..
	{
		//tidy up an previous selects..
		removeOldSelects(["bike1Des_selectID", "br2"], "info_div");
		
		//return if value is void..
		if(document.getElementById("bike1Year_selectID").value == "void") return;
		
		//create a new line..
		var br = document.createElement("BR"); br.id = "br2"; selectDiv.append(br);
		
		//make AJAX call to get relevant bikes..
		var bikeModel = document.getElementById("bike1Model_selectID").value;
		var bikeYear  = document.getElementById("bike1Year_selectID").value;
		
		var sup = "no";
		if(BIKOTIC_ShowNotPublished) sup = "yes";
		
		requestAJAX(getOptionsURL, "table=bikes&showUnpulished=" + sup, "items=price,model_des,id", "whereX=model_id", "whereY=" + bikeModel, "andX=model_year", "andY=" + bikeYear, "direction=DESC", doNext);
		function doNext(aJSON){createSelect_Bikes(onBikeSelect, aJSON, selectDiv, "bike1Des_selectID");}		
	}
	
	function onYearSelectBike2() //this happens when year select changes..
	{
		//tidy up an previous selects..
		removeOldSelects(["bike2Des_selectID", "br22"], "info_div2");
		
		//return if value is void..
		if(document.getElementById("bike2Year_selectID").value == "void") return;
		
		//create a new line..
		var br = document.createElement("BR"); br.id = "br22"; selectDiv2.append(br);
		
		//make AJAX call to get relevant bikes..
		var bikeModel = document.getElementById("bike2Model_selectID").value;
		var bikeYear  = document.getElementById("bike2Year_selectID").value;
		
		var sup = "no";
		if(BIKOTIC_ShowNotPublished) sup = "yes";
		
		requestAJAX(getOptionsURL, "table=bikes&showUnpulished=" + sup, "items=price,model_des,id", "whereX=model_id", "whereY=" + bikeModel, "andX=model_year", "andY=" + bikeYear, "direction=DESC", doNext2);
		function doNext2(aJSON){createSelect_Bikes(onBikeSelectBike2, aJSON, selectDiv2, "bike2Des_selectID");}		
	}
	
	function onBikeSelect() //this happens when model des select changes..
	{ 
		//tidy up an previous selects..
		removeOldSelects([], "info_div");
		
		//return if value is void..
		if(document.getElementById("bike1Des_selectID").value == "void") return;
		
		//load a new bike..
		getBikeInfo(document.getElementById("bike1Des_selectID").value, "bike1"); 
	}
	
	function onBikeSelectBike2() //this happens when model des select changes..
	{
		//tidy up an previous selects..
		removeOldSelects([], "info_div2");
		
		//return if value is void..
		if(document.getElementById("bike2Des_selectID").value == "void") return;
		
		//load a new bike..
		getBikeInfo(document.getElementById("bike2Des_selectID").value, "bike2");
	}
	
	function removeOldSelects(selectsToRemoveArray, infoDiv)
	{
		//remove bike info..
		var elem = document.getElementById(infoDiv);
		if(elem) elem.parentNode.removeChild(elem);
		
		for(var i = 0; i < selectsToRemoveArray.length; i++)
		{
			var elem = document.getElementById(selectsToRemoveArray[i]);
			if(elem) elem.parentNode.removeChild(elem);
		}
	}
	
	function resize()
	{
		draw();
	}
	
	function BIKOTIC_LimitString(str) 
	{
		if (str.length <= 10) 
		{
			return str;
		} 
		else 
		{
			return str.substring(0, 10) + "...";
		}
	}

	var BIKOTIC_AppInitialLoad = 0;
	function BIKOTIC_GetComparisonViewPageTitle()
	{
		var ptTmp = "ALMOST THERE"; //only one bike loaded..
		
		//when we init the app the DUMMY image gets loaded twice, so we need to count this and then trigger the app version event..
		if(BIKOTIC_AppInitialLoad < 2) 
		{
			ptTmp = "DESKTOP APP LOADED"; 
			BIKOTIC_AppInitialLoad++; 
			return ptTmp;
		}
		
		if(bike1 && bike2)
		{
			//are both bikes loaded..
			if(bike1.model_des != "DUMMY" && bike2.model_des != "DUMMY")
			{
				//create the page title..
				var b1 = document.createElement("DIV");
				b1.innerHTML = BIKOTIC_LimitString(bike1.model_des.toUpperCase()) + " " + bike1.id;
				var b2 = document.createElement("DIV");
				b2.innerHTML = BIKOTIC_LimitString(bike2.model_des.toUpperCase()) + " " + bike2.id;
				ptTmp = b1.innerHTML + " vs " + b2.innerHTML;
			}
		}
		return ptTmp;
	}
	
	function BIKOTIC_GetComparisonViewUrlSegment()
	{
		var tmpBike1 = "bike1=empty";
		var tmpBike2 = "bike2=empty";
		
		if(bike1 && bike2)
		{
			if(bike1.model_des != "DUMMY")
			{
				//create bikes part of URL..
				tmpBike1 = "bike1=" + bike1.manufacturer_id + "," + bike1.model_id + "," + bike1.model_year + "," + bike1.id;
			}
			if(bike2.model_des != "DUMMY")
			{
				//create bikes part of URL..
				tmpBike2 = "bike2=" + bike2.manufacturer_id + "," + bike2.model_id + "," + bike2.model_year + "," + bike2.id;
			}
		}
		return tmpBike1 + "&" + tmpBike2;
	}
	
	
	/*==================================================================TRIGGERED EVENT LIST..
	
	1) *bikotic.com - automatically triggered - EVENT: BIKOTIC CHOOSE VERSION..
	2) *which version of the app was selected - IN: (DESKTOP ONLY) getBikeInfo(id, bikeNo) EVENT: DESKTOP APP LOADED | PAGE_NAME: "gbi"..
	3) *open bike finder - IN: (this js doc)xDown(clientX, clientY) EVENT: BIKE FINDER | PAGE_NAME :"bf"..
	4) *load a bike (so one side is still DUMMY) - IN: getBikeInfo(id, bikeNo) EVENT: ALMOST THERE | PAGE_NAME: "gbi"..
	5) *load a bike (both sides loaded) - IN: getBikeInfo(id, bikeNo) EVENT: bike 1 model_des vs bike 2 model_des | PAGE_NAME: "gbi"..
	6) *close any overlay windows with the close button - IN: FILTER_MakeCloseButton() EVENT: BIKOTIC SUB WIN EXIT | PAGE_NAME: "cb"..
	7) *side by side comparison - IN: (this js doc)xDown(clientX, clientY) EVENT: COMPARE STATS | PAGE_NAME: "sbs"..
	8) open the recent - IN: (this js doc)xDown(clientX, clientY) EVENT: RECENT BIKES | PAGE_NAME: "rb"..
	9) etc...
	
	==================================================================TRIGGERED EVENT LIST..*/
	
	function BIKOTIC_UpdatePageNameURL(pageTitle, updateURL, pageName)
	{ 
		
		//--------------------------------------------------------------PAGE TITLE..
		document.title = pageTitle;
		
		//--------------------------------------------------------------BUILD URL..
		if(updateURL)
		{
			var tmp = BIKOTIC_Origin + "?";
			
			if(BIKOTIC_ItsMe) tmp+= "itsme=true&";
			if(BIKOTIC_ShowNotPublished) tmp+= "show_unpublished=true&";
			
			//add the bikes to url..
			tmp+= BIKOTIC_GetComparisonViewUrlSegment() + "&";
			
			//create starred part of URL..
			tmp+= "starred=" + BIKOTIC_MyList + "&";
			
			//add the page name so the URL changes even when nothing happens..
			tmp+= "page_name=" + pageName;
		
			//update the URL..
			window.history.pushState({}, "", tmp);
		}
		
	}
	
	function BIKOTIC_RemoveNone(str) 
	{
		if (str === "none") 
		{
			return "none";
		} 
		else if(str.startsWith("none,")) 
		{
			return str.slice(5);
		} 
		else 
		{
			return str;
		}
	}
	
	function getBikeInfo(id, bikeNo)
	{ 
		//generate the query string..
		var hitAppVersion = "&app_version=desktop";
		if(BIKOTIC_ItsMe) hitAppVersion = "";
		var query = "id=" + id + hitAppVersion + "&session_id=" + BIKOTIC_SessionID;		
				
		var url = CODEBASE + "PRL-SWORK/BIKOTIC_getBike_V2.pl";

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200) 
			{  
				//ready the bike obj..
				if(bikeNo == "bike1")	
				{
					bike1 = JSON.parse(this.responseText); 
					bikeOneLoadImages(imageTag1, logo1, selectDiv, "info_div"); 
					extraX1 = 0; extraY1 = 0; 
				}	
				else
				{
					bike2 = JSON.parse(this.responseText); 
					bikeTwoLoadImages(imageTag2, logo2, selectDiv2, "info_div2"); 
					extraX2 = 0; extraY2 = 0;
				}
				
				//update page name..
				BIKOTIC_UpdatePageNameURL(BIKOTIC_GetComparisonViewPageTitle(), true, "gbi");	 					
			}
		};
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(query);
	}
	
	
	
	
//----------------------------------------------------------------------BIKE 1 LOAD IMAGES..
	function bikeOneLoadImages(imageTag, logoTag, whereToPutInfo, infoDivId)
	{
		imageTag.src = pathToBikes + bike1.image_name + pathToBikesPost; 
		
		bike1.loading = true; 
		bikeOneTimer = setInterval(onBikeOneTimer, 100);
		draw();
		imageTag.onload = function(){loadedBike1(); if(bike1.model_des != "DUMMY") BIKOTIC_PreLoadingBike1Warning = false; if(bikotic_wipe == true) alpha = 0.5; draw();}
		
		//load the man logo and display info..
		if(bike1.model_des != "DUMMY") 
		{
			displayBikeInfo(bike1, whereToPutInfo, infoDivId);
			logoTag.src = "https://bikotic.com/SLRGT/MANUFACTURER-LOGOS/SML/" + bike1.manufacturer + ".png";
			logoTag.onload = function(){draw();}
		}
		
		//load the gallery images..
		if(bike1.gal_pics > 0) bike1_galPic0.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/THUMBS/" + bike1.image_name + "-gal0.webp";
		if(bike1.gal_pics > 0) bike1_galPic1.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/THUMBS/" + bike1.image_name + "-gal1.webp";
		if(bike1.gal_pics > 1) bike1_galPic2.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/THUMBS/" + bike1.image_name + "-gal2.webp";
		if(bike1.gal_pics > 2) bike1_galPic3.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/THUMBS/" + bike1.image_name + "-gal3.webp";
		if(bike1.gal_pics > 3) bike1_galPic4.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/THUMBS/" + bike1.image_name + "-gal4.webp";
	
	}
	
	function loadedBike1(){
		//turn off loading..
		bike1.loading = false; 
		stopBikeOneTimer();
		canvas.style.cursor = "e-resize";		
				
		//draw..
		draw(); 
	}
	
	
//----------------------------------------------------------------------BIKE 2 LOAD IMAGES..	
	function bikeTwoLoadImages(imageTag, logoTag, whereToPutInfo, infoDivId)
	{
		imageTag.src = pathToBikes + bike2.image_name + pathToBikesPost;
		 
		bike2.loading = true; 
		bikeTwoTimer = setInterval(onBikeTwoTimer, 100);
		draw();
		imageTag.onload = function(){loadedBike2(); if(bike2.model_des != "DUMMY") BIKOTIC_PreLoadingBike2Warning = false; if(bikotic_wipe == true) alpha = 0.5; draw();}
		
		//load the man logo and display info..
		if(bike2.model_des != "DUMMY") 
		{
			displayBikeInfo(bike2, whereToPutInfo, infoDivId);
			logoTag.src = "https://bikotic.com/SLRGT/MANUFACTURER-LOGOS/SML/" + bike2.manufacturer + ".png";
			logoTag.onload = function(){draw();}
		}
		
		//load the gallery images..
		if(bike2.gal_pics > 0) bike2_galPic0.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/THUMBS/" + bike2.image_name + "-gal0.webp";
		if(bike2.gal_pics > 0) bike2_galPic1.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/THUMBS/" + bike2.image_name + "-gal1.webp";
		if(bike2.gal_pics > 1) bike2_galPic2.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/THUMBS/" + bike2.image_name + "-gal2.webp";
		if(bike2.gal_pics > 2) bike2_galPic3.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/THUMBS/" + bike2.image_name + "-gal3.webp";
		if(bike2.gal_pics > 3) bike2_galPic4.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/THUMBS/" + bike2.image_name + "-gal4.webp";
	}
	
	function loadedBike2(){
		//turn off loading..
		bike2.loading = false; 
		stopBikeTwoTimer();
		canvas.style.cursor = "e-resize";
				
		//draw..
		draw();
	}
	
	
	
	
//----------------------------------------------------------------------DISPLAY INFO..
	function displayBikeInfo(bike, whereToPutInfo, infoDivId)
	{
		//color based on bkg..
		var bCol = BIKOTIC_Pink;
		if(bike.bkg_tone == "dark") 
		{
			bCol = BIKOTIC_LightGrey;
			
			if(bike == bike1) document.getElementById("bike1Des_selectID").style.color = bCol;
			if(bike == bike2) document.getElementById("bike2Des_selectID").style.color = bCol;
		}
		
		//add the info from the bike to the panel under the selects..
		var info = document.createElement("DIV");		
		info.id = infoDivId;
		info.setAttribute("class", "info_div");
		info.style.color = "#" + bike.color;
		whereToPutInfo.append(info);
		
		var slot3 = ` | Max:${bike.clearance}mm`;
		if(bike.clearance == 0) slot3 = "";
		
		//slots, if mtb or not..
		var slot1 = `<span class="titch">Wheels: </span>${bike.wheels_make} ${bike.wheels_name} | ${bike.wheels_weight}g | £${numberWithCommas(bike.wheels_price)}<br>`;
		var slot2 = `<span class="titch">Tyres: </span>${bike.tyres_make} ${bike.tyres_name} | ${bike.tyres_weight}g | £${numberWithCommas(bike.tyres_price)}${slot3}<br>`;
		
		if(bike.mixed_wheels.toLowerCase() != "") slot1 = `<span class="titch">Wheels: </span>${bike.mixed_wheels}<br>`;
		if(bike.mixed_tyres.toLowerCase() != "") slot2 = `<span class="titch">Tyres: </span>${bike.mixed_tyres}${slot3}<br>`;
		
		if(bike.bike_type_main == "MTB")
		{
			slot1 = `<span class="titch">Sus: </span>Front ${bike.suspension_travel_front}mm | Rear ${bike.suspension_travel_rear}mm<br>`;
			slot2 = `<span class="titch">Wheels: </span>${bike.wheel_size} <span class="titch">Dropper: </span>${bike.dropper}<br>`;
		}
				
		//add info..
		var bikeWeight = bike.weight;
		if(bikeWeight == 99) bikeWeight = "?";
		info.innerHTML+= 	`
							<span class="titch" style="pointer-events:none; color:${bCol}; line-height: 1.6;">${bike.bike_type_main} | ${bike.bike_type_sub}</span><br>
							<span class="titch">Weight: </span>${bikeWeight}kg 
							<span class="titch">Material: </span>${bike.frame_material}<br>
							<span class="titch">Group: </span>${bike.groupset} | ${bike.groupset_speed}SP (PM:${bike.power_meter})<br>
							<span class="titch">Gears: </span>${bike.chainring_large}/${bike.chainring_small}T ${bike.cassette_small}-${bike.cassette_large}
							<span class="titch">Brakes: </span>${bike.brake_type}<br>
							${slot1}
							${slot2}
							<span class="date" style="color:${bCol}">photo frame size:  ${bike.photo_frame_size} | </span>							
							<span class="date" style="color:${bCol}">*data collected:  ${bike.data_collection_date}</span>							
							`;
		
		//man link out..
		var manLinkIcon = CODEBASE + "IMGz/manLink.png";
		if(bike.link != "na") info.innerHTML+= `<br><a class="man_link" style="padding-top: 3px; color:${bCol}" target="_blank" href="${bike.link}"><img style="padding-right: .2vw; width: .7vw;" src="${manLinkIcon}">View on ${bike.manufacturer} site</a>`
		
		
	}
	
	function numberWithCommas(x)
	{
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	function checkIfCanvasButton(x,y,w,h,mx,my)
	{				
		var rect = canvas.getBoundingClientRect(); 
		mx = mx - rect.left; 
		my = my - rect.top; 
		
		if(mx > x*factor && mx < (x+w)*factor && my > y*factor && my < (y+h)*factor) return true;		
		else return false;
	}
	
	
	//mouse event functions..
	function xMove(clientX, clientY)
	{				
		if(canvas.style.cursor == "wait") return;
		if(!bike1 || !bike2) return;
			
		if(checkIfCanvasButton(1838,menuButtTopOffset+135,55,310,clientX,clientY)){canvas.style.cursor = "pointer"; return;} //main over..
		if(checkIfCanvasButton(1821,200,32,32,clientX,clientY) && BIKOTIC_MyList != 286){canvas.style.cursor = "pointer"; return;} //starred..
		if(checkIfCanvasButton(1706,183,131,35,clientX,clientY)){canvas.style.cursor = "pointer"; return;} //similar bikes..
		
		//comments button..
		if(alpha == 0) 
		{
			if(checkIfCanvasButton(885,943,151,36,clientX,clientY)){canvas.style.cursor = "pointer"; return;} 
		} 
		if(alpha == 1) 
		{
			if(checkIfCanvasButton(885,943,151,36,clientX,clientY)){canvas.style.cursor = "pointer"; return;} 
		} 
		
		//gallery clicks..
		if(alpha < 0.5)
		{
			if(bike1.gal_pics > 0 && checkIfCanvasButton(25,455,76,43,clientX,clientY)){canvas.style.cursor = "pointer"; return;} //bike 1 galpic 0..
			if(bike1.gal_pics > 0 && checkIfCanvasButton(25,508,76,43,clientX,clientY)){canvas.style.cursor = "pointer"; return;} //bike 1 galpic 1..
			if(bike1.gal_pics > 1 && checkIfCanvasButton(25,561,76,43,clientX,clientY)){canvas.style.cursor = "pointer"; return;} //bike 1 galpic 2..
			if(bike1.gal_pics > 2 && checkIfCanvasButton(25,614,76,43,clientX,clientY)){canvas.style.cursor = "pointer"; return;} //bike 1 galpic 3..
			if(bike1.gal_pics > 3 && checkIfCanvasButton(25,667,76,43,clientX,clientY)){canvas.style.cursor = "pointer"; return;} //bike 1 galpic 4..
		}
		else
		{
			if(bike2.gal_pics > 0 && checkIfCanvasButton(25,455,76,43,clientX,clientY)){canvas.style.cursor = "pointer"; return;} //bike 1 galpic 0..
			if(bike2.gal_pics > 0 && checkIfCanvasButton(25,508,76,43,clientX,clientY)){canvas.style.cursor = "pointer"; return;} //bike 1 galpic 1..
			if(bike2.gal_pics > 1 && checkIfCanvasButton(25,561,76,43,clientX,clientY)){canvas.style.cursor = "pointer"; return;} //bike 1 galpic 2..
			if(bike2.gal_pics > 2 && checkIfCanvasButton(25,614,76,43,clientX,clientY)){canvas.style.cursor = "pointer"; return;} //bike 1 galpic 3..
			if(bike2.gal_pics > 3 && checkIfCanvasButton(25,667,76,43,clientX,clientY)){canvas.style.cursor = "pointer"; return;} //bike 1 galpic 4..		
		}
		
		canvas.style.cursor = "e-resize";
			
		//execute mix if mouse is down....
		if(mouseIsDown){
			
			//are we panning?..
			if(pan)
			{
				zOffsetX+= clientX - xPanOrig; xPanOrig = clientX;
				zOffsetY+= clientY - yPanOrig; yPanOrig = clientY;
				
			}
			else
			{
				//calc new alpha..
				var range = canvas.width / 3;
				var value = clientX - xOrig;
				var mapVal = value / range;
				alpha = oldAlpha + mapVal;
				if(alpha > 1){ alpha = 1; if(clientX < xPrev){ xOrig = clientX; oldAlpha = 1.0; } }
				if(alpha < 0){ alpha = 0; if(clientX > xPrev){ xOrig = clientX; oldAlpha = 0.0; } }
				xPrev = clientX;
				
				
			}
			
			//refresh canvas..
			draw();
		}
		
	}
	

	
	function openRecentBike1(man_id, model_id, year, version_id)
	{ 
		var xMan = "bike1Manufacturer_selectID";
		var xMod = "bike1Model_selectID";
		var xYer = "bike1Year_selectID";
		var xVer = "bike1Des_selectID";
		
		//decide which bike gets it!..
		if(alpha > 0.5)
		{
			xMan = "bike2Manufacturer_selectID";
			xMod = "bike2Model_selectID";
			xYer = "bike2Year_selectID";
			xVer = "bike2Des_selectID";
		}
		
		//get the man select..
		var man = document.getElementById(xMan)		
	
		man.value = man_id;
		man.dispatchEvent(new Event('change'));
		
		//--------------------------------------------------------------WAIT FOR MODEL SELECT TO BE MADE..
		var timer = setInterval(function()
		{
			var modelSelect = document.getElementById(xMod);
			if(modelSelect)
			{
				//stop the timer..
				clearTimeout(timer);
				
				//change the model select..
				modelSelect.value = model_id;
				modelSelect.dispatchEvent(new Event('change'));
				
				//------------------------------------------------------WAIT FOR YEAR TO BE MADE..
				var timer2 = setInterval(function()
				{ 
					var yearSelect = document.getElementById(xYer);
					if(yearSelect)
					{
						//stop the timer..
						clearTimeout(timer2);
						
						//change the year select..
						yearSelect.value = year; 
						yearSelect.dispatchEvent(new Event('change'));
					
						//------------------------------------------------------WAIT FOR YEAR TO BE MADE..
						var timer3 = setInterval(function()
						{ 
							var versionSelect = document.getElementById(xVer);
							if(versionSelect)
							{
								//stop the timer..
								clearTimeout(timer3);
								
								//change the model des select..
								versionSelect.value = version_id; 
								versionSelect.dispatchEvent(new Event('change'));
							}
							
						},25);
					
					}
				
				},25); 
			}
									
		},25);
								
	}
	
	function makeFullscreen()
	{
		if(document.fullscreenElement){document.exitFullscreen();}
		else{document.documentElement.requestFullscreen();}
		draw(); 
	}
	
	function donate()
	{
		window.open("https://www.paypal.com/donate/?hosted_button_id=TVGZDF6ASAT2A");
	}
	
	function xDown(clientX, clientY)
	{	
			
		bikotic_wipe_first_touch = false;	
				
		if(checkIfCanvasButton(1821,200,32,32,clientX,clientY) && BIKOTIC_MyList != 286){canvas.style.cursor = "pointer"; FILTER_ShowFilters(true); BIKOTIC_UpdatePageNameURL("SHOW STARRED", true, "strd"); fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=STARRED'); return;} //starred..
		if(checkIfCanvasButton(1706,183,131,35,clientX,clientY)){canvas.style.cursor = "pointer"; SIMILAR_ShowSimilar(); BIKOTIC_UpdatePageNameURL("SHOW SIMILAR", true, "sim"); fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=SIMILAR BIKES'); return;} //similar bikes..
		if(checkIfCanvasButton(1838,menuButtTopOffset+135,55,42,clientX,clientY))
		{
			createPopup();
			fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=BURGER MENU');
			return;
		} //burger..
		if(checkIfCanvasButton(1838,menuButtTopOffset+179,55,42,clientX,clientY)){canvas.style.cursor = "pointer"; FILTER_ShowFilters(false); BIKOTIC_UpdatePageNameURL("BIKE FINDER", true, "bf"); fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=SEARCH SIDE MENU'); return;} //search..
		if(checkIfCanvasButton(1838,menuButtTopOffset+219,55,42,clientX,clientY)){canvas.style.cursor = "pointer"; RECENT_ShowRecent(); BIKOTIC_UpdatePageNameURL("RECENT BIKES", true, "rb"); fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=RECENT SIDE MENU'); return;} //recently added..	
		if(checkIfCanvasButton(1838,menuButtTopOffset+261,55,42,clientX,clientY)){canvas.style.cursor = "pointer"; SIDE_BY_SIDE_ShowSideBySide(); BIKOTIC_UpdatePageNameURL("COMPARE STATS", true, "sbs"); fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=COMPARE SIDE MENU'); return;} //compare..	
		if(checkIfCanvasButton(1838,menuButtTopOffset+305,55,42,clientX,clientY)){canvas.style.cursor = "pointer"; makeFullscreen(); fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=FULLSCREEN SIDE MENU'); return;} //fullscreen..	
		if(checkIfCanvasButton(1838,menuButtTopOffset+350,55,42,clientX,clientY))
		{
			canvas.style.cursor = "pointer"; 
			alphaAnim = alpha; 
			if(playAnim) playAnim = false;
			else playAnim = true;
			playFade(); 
			fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=PLAY SIDE MENU');
			return;		
		} //play..	
		if(checkIfCanvasButton(1838,menuButtTopOffset+394,55,42,clientX,clientY)){canvas.style.cursor = "pointer"; SHARE_ShowShare(); BIKOTIC_UpdatePageNameURL("SHARE BIKOTIC", true, "shr"); fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=SHARE SIDE MENU'); return;} //share..	
		
		//gallery clicks..
		if(alpha < 0.5)
		{
			if(bike1.gal_pics > 0 && checkIfCanvasButton(25,455,76,43,clientX,clientY)){canvas.style.cursor = "wait"; imageTag1.src = pathToBikes + bike1.image_name + pathToBikesPost; fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=GAL0'); return;} //bike 1 galpic 0..
			if(bike1.gal_pics > 0 && checkIfCanvasButton(25,508,76,43,clientX,clientY)){canvas.style.cursor = "wait"; imageTag1.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/" + bike1.image_name + "-gal1.webp"; fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=GAL1'); return;} //bike 1 galpic 1..
			if(bike1.gal_pics > 1 && checkIfCanvasButton(25,561,76,43,clientX,clientY)){canvas.style.cursor = "wait"; imageTag1.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/" + bike1.image_name + "-gal2.webp"; fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=GAL2'); return;} //bike 1 galpic 2..
			if(bike1.gal_pics > 2 && checkIfCanvasButton(25,614,76,43,clientX,clientY)){canvas.style.cursor = "wait"; imageTag1.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/" + bike1.image_name + "-gal3.webp"; fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=GAL3'); return;} //bike 1 galpic 3..
			if(bike1.gal_pics > 3 && checkIfCanvasButton(25,667,76,43,clientX,clientY)){canvas.style.cursor = "wait"; imageTag1.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/" + bike1.image_name + "-gal4.webp"; fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=GAL4'); return;} //bike 1 galpic 4..
		}
		else
		{
			if(bike2.gal_pics > 0 && checkIfCanvasButton(25,455,76,43,clientX,clientY)){canvas.style.cursor = "wait"; imageTag2.src = pathToBikes + bike2.image_name + pathToBikesPost; fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=GAL0'); return;} //bike 1 galpic 0..
			if(bike2.gal_pics > 0 && checkIfCanvasButton(25,508,76,43,clientX,clientY)){canvas.style.cursor = "wait"; imageTag2.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/" + bike2.image_name + "-gal1.webp"; fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=GAL1'); return;} //bike 2 galpic 1..
			if(bike2.gal_pics > 1 && checkIfCanvasButton(25,561,76,43,clientX,clientY)){canvas.style.cursor = "wait"; imageTag2.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/" + bike2.image_name + "-gal2.webp"; fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=GAL2'); return;} //bike 2 galpic 2..
			if(bike2.gal_pics > 2 && checkIfCanvasButton(25,614,76,43,clientX,clientY)){canvas.style.cursor = "wait"; imageTag2.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/" + bike2.image_name + "-gal3.webp"; fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=GAL3'); return;} //bike 2 galpic 3..
			if(bike2.gal_pics > 3 && checkIfCanvasButton(25,667,76,43,clientX,clientY)){canvas.style.cursor = "wait"; imageTag2.src = "https://bikotic.com/SLRGT/EXTRA-IMAGES/" + bike2.image_name + "-gal4.webp"; fetch('https://bikotic.com/BIKOTIC-CODEBASE-V3/PRL-SWORK/BIKOTIC_ADD_SHOOTOUT_VIEW.pl?title=GAL4'); return;} //bike 2 galpic 4..
		}
		
		//comments button..
		if(alpha == 0) 
		{
			if(checkIfCanvasButton(885,943,151,36,clientX,clientY)){COMMENTS_ShowComments(); return;} 
		} 
		if(alpha == 1) 
		{
			if(checkIfCanvasButton(885,943,151,36,clientX,clientY)){COMMENTS_ShowComments(); return;} 
		} 
				
		mouseIsDown = true;
		xOrig = clientX;
		xPanOrig = clientX; yPanOrig = clientY;
		oldAlpha = alpha;
		
		//disable the select divs..
		selectDiv.style.pointerEvents = "none";
		selectDiv2.style.pointerEvents = "none";
		
		//refresh canvas..
		draw();
	}
	
	var fadeInc = 0.01;
	var alphaAnim;
	var playAnim = false;
	var timerPlay;
	function playFade()
	{
		if(playAnim)
		{
			timerPlay = setInterval(function()
			{
				//inc alpha..
				alphaAnim+= fadeInc;
				if(alphaAnim > 1.3){fadeInc = -0.01;}
				if(alphaAnim < -0.3){fadeInc =  0.01;}
					
				alpha = alphaAnim;
				if(alphaAnim < 0) alpha = 0;
				if(alphaAnim > 1) alpha = 1;	
					
				//draw..
				draw();
					
			}, 10);
		}
		else
		{
			//stop the timer..
			clearTimeout(timerPlay);
			draw();
		}	
	}
	
	function mouseUp()
	{
		mouseIsDown = false;
		
		//enable the select divs..
		selectDiv.style.pointerEvents = "auto";
		selectDiv2.style.pointerEvents = "auto";
		
		draw();
	}
	
	//sudo mouse events..
	function mouseMove(e)
	{
		xMove(e.clientX, e.clientY);
	}
	
	function mouseDown(e)
	{ 
		xDown(e.clientX, e.clientY);
		e.preventDefault();
	}
	
	//touch events..
	function touchDown(e)
	{ 
		xDown(e.touches[0].clientX, e.touches[0].clientY);
		e.preventDefault();
	}
	
	function touchMove(e)
	{
		xMove(e.touches[0].clientX, e.touches[0].clientY);
		e.preventDefault();
	}
	
	var man1_LOADED = false;
	var man2_LOADED = false;
	function createSelect(onChangeFunction, aJSON, whereToPutIt, selectID, initialTxt, className)
	{
		//create a select..
		var select = document.createElement("SELECT");
		select.id = selectID;
		select.setAttribute("class", className);
		select.onchange = onChangeFunction;		
		
		//create select option label..
		var anOption = document.createElement("OPTION");
		anOption.innerHTML 	= initialTxt;
		anOption.value = "void";
		anOption.style.color = "#a2a2a2";
		select.appendChild(anOption);
		
		//create the options..
		for(var i = 0; i < aJSON.options.length; i++)
		{
			var anOption = document.createElement("OPTION");
			anOption.value 		= aJSON.options[i].id;
			anOption.innerHTML 	= aJSON.options[i].name;
			select.appendChild(anOption);
		}
		
		//add the selector to the select div..		
		whereToPutIt.appendChild(select);
		
		draw(); 
		
		
	}
	
	function createSelect_Year(onChangeFunction, aJSON, whereToPutIt, selectID)
	{
		//create a select..
		var select = document.createElement("SELECT");
		select.id = selectID;
		select.setAttribute("class", "model");
		select.onchange = onChangeFunction;
		
		//create select option label..
		var anOption = document.createElement("OPTION");		
		anOption.innerHTML 	= "MODEL YEAR?";
		anOption.value	 	= "void";
		anOption.style.color = "#a2a2a2";
		select.appendChild(anOption);
		
		//weed the years to one for each year..
		var years = [];
		if(aJSON.options.length > 0) years.push(aJSON.options[0].model_year);
		for(var i = 0; i < aJSON.options.length; i++)
		{		
			var doWeHaveThisYear = false;				
			for(var j = 0; j < years.length; j++)
			{
				if(aJSON.options[i].model_year == years[j]){doWeHaveThisYear = true; break;}
			}
			if(doWeHaveThisYear) continue;
			else years.push(aJSON.options[i].model_year); 
		}
		
		//create the options..
		for(var i = 0; i < years.length; i++)
		{
			var anOption = document.createElement("OPTION");
			anOption.value 		= years[i];
			anOption.innerHTML 	= years[i];
			select.appendChild(anOption);
		}
		
		//add the selector to the select div..		
		whereToPutIt.appendChild(select);
		
		draw();
	}
	
	function createSelect_Bikes(onChangeFunction, aJSON, whereToPutIt, selectID)
	{
		//create a select..
		var select = document.createElement("SELECT");
		select.id = selectID;
		select.setAttribute("class", "model_des");
		select.onchange = onChangeFunction;
		
		//create select option label..
		var anOption = document.createElement("OPTION");
		anOption.innerHTML 	= "VERSION?";
		anOption.value	 	= "void";
		anOption.style.color = "#a2a2a2";
		select.appendChild(anOption);
		
		//create the options..
		for(var i = 0; i < aJSON.options.length; i++)
		{
			var anOption = document.createElement("OPTION");
			anOption.value 		= aJSON.options[i].id;
			
			var pPrice = numberWithCommas(aJSON.options[i].price);
			if(aJSON.options[i].price == -999999.00) pPrice = "?";
			anOption.innerHTML 	= aJSON.options[i].model_des + " | £" + pPrice;
			
			select.appendChild(anOption);
		}
		
		//add the selector to the select div..		
		whereToPutIt.appendChild(select);
		
		draw();
	}	
	
	var lastZF = 1; var lastZoFFSetX = 0; var lastZoFFSetY = 0;
	var overBikeBox;
	var overlayWindow = false;
	var inptFocus = false;
	function keydown(e)
	{
		
		//if comment window open..
		if(comments_win && comments_win.style.display == "block") return;
		
		//if filter win open and enter button pressed get the bikes..
		if(overlayWindow)
		{
			if(win && win.style.display == "block" && e.key == "Enter")
			{
				makeYears = true;
				GetTheBikes("all");
			}
			
			//color boxes..
			var theBox = document.getElementById(overBikeBox); 
			if(theBox)
			{
				if(e.key == "0") theBox.style.backgroundColor = "white";
				if(e.key == "1") theBox.style.backgroundColor = "#fdf8da";
				if(e.key == "2") theBox.style.backgroundColor = "#ffe6f1";
				if(e.key == "3") theBox.style.backgroundColor = "#ffdccf";
				if(e.key == "4") theBox.style.backgroundColor = "#e4f3ff";
				if(e.key == "5") theBox.style.backgroundColor = "#e0dbed";
				if(e.key == "6") theBox.style.backgroundColor = "#f0f1f5";
				if(e.key == "7") theBox.style.backgroundColor = "#daede1";
				if(e.key == "8") theBox.style.backgroundColor = "#d5f7f2";
				if(e.key == "9") theBox.style.backgroundColor = "#e3cbf3";
			}
			return;
		}	
		
		//wipe vert..
		if(e.key == "v"){bikotic_wipe = true; bikotic_wipe_direction = "vert"; draw();}
		
		//wipe horiz..
		if(e.key == "h"){bikotic_wipe = true; bikotic_wipe_direction = "horiz"; draw();}
		
		//fade..
		if(e.key == "f"){bikotic_wipe = false; draw();}
		
		//invert..
		if(e.key == "i")
		{
			if(alpha < 0.5)
			{
				if(bikotic_img1_invert) bikotic_img1_invert = false;
				else bikotic_img1_invert = true;
				draw();
			}
			else
			{
				if(bikotic_img2_invert) bikotic_img2_invert = false;
				else bikotic_img2_invert = true;
				draw();
			}
		}
		
		var scaleAmount = 0.5;
			
		//is it the space bar to pan around?..
		if(e.key == " ") pan = true;
		
		//increase zoom..
		if(e.key == "z") 
		{
			e.preventDefault();
			zoomFactor+= scaleAmount;
		}
		
		//reduce zoom..
		if(e.key == "x")
		{ 
			e.preventDefault();
			zoomFactor-= scaleAmount;
			if(zoomFactor < 1) zoomFactor = 1;
		}
		
		//reset zoom..
		if(e.key == "c")
		{
			lastZF = zoomFactor;
			lastZoFFSetX = zOffsetX;
			lastZoFFSetY = zOffsetY;
			
			zoomFactor = 1;
			zOffsetX = 0;
			zOffsetY = 0;
		}
		
		//x pos left..
		if(e.key == "ArrowLeft")
		{				
			if(alpha > 0.5) extraX2--;
			else extraX1--;		
		}
		
		//x pos right..
		if(e.key == "ArrowRight")
		{				
			if(alpha > 0.5) extraX2++;
			else extraX1++;			
		}
		
		
		//y pos up..
		if(e.key == "ArrowUp")
		{				
			if(alpha > 0.5) extraY2--;
			else extraY1--;		
		}
		
		//y pos up..
		if(e.key == "ArrowDown")
		{				
			if(alpha > 0.5) extraY2++;
			else extraY1++;			
		}
		
		//reset pos..
		if(e.key == "r")
		{				
			extraX1 = 0;
			extraX2 = 0;
			extraY1 = 0;
			extraY2 = 0;
		}
		
		if(e.key == "s")
		{
			if(silhouette_mode)
			{
				imageTag1.src = pathToBikes + bike1.image_name + pathToBikesPost;
				imageTag2.src = pathToBikes + bike2.image_name + pathToBikesPost;
				silhouette_mode = false;
			}
			else
			{
				CHT_createColoredImageV1(imageTag1, "#FFFFFF", .2);
				CHT_createColoredImageV1(imageTag2, "#ffff62", .2);
				silhouette_mode = true;
			}	
		}
		
		//rotate canvas..
		if(e.key == "/")
		{
			if(BIKOTIC_CanvasRotation == false) BIKOTIC_CanvasRotation = true;
			else BIKOTIC_CanvasRotation = false;
		}
		
		if(e.key == ",")
		{
			BIKOTIC_RotAmount+=.3;
		}
		if(e.key == ".")
		{
			BIKOTIC_RotAmount-=.3;
		}
		
		draw();
		
	}
	
	function degreesToRadians(degrees) {
		return degrees * (Math.PI / 180);
	}

	
	function keyup(e)
	{
		//space bar..
		if(e.keyCode == 32) pan = false;
	}
	
	
	var silhouette_mode = false;
	function CHT_createColoredImageV1(CHT_imageTag1, CHT_fillColorHex = '#00FF00', CHT_gamma = 1.0) {
    const CHT_canvas = document.createElement('canvas');
    const CHT_ctx = CHT_canvas.getContext('2d');

    CHT_canvas.width = CHT_imageTag1.width;
    CHT_canvas.height = CHT_imageTag1.height;

    CHT_ctx.drawImage(CHT_imageTag1, 0, 0);
    const CHT_imgData1 = CHT_ctx.getImageData(0, 0, CHT_canvas.width, CHT_canvas.height);
    const CHT_outputData = CHT_ctx.createImageData(CHT_canvas.width, CHT_canvas.height);

    // Convert hex color to RGB
    const CHT_fillColor = [
        parseInt(CHT_fillColorHex.slice(1, 3), 16),
        parseInt(CHT_fillColorHex.slice(3, 5), 16),
        parseInt(CHT_fillColorHex.slice(5, 7), 16)
    ];

    for (let CHT_i = 0; CHT_i < CHT_imgData1.data.length; CHT_i += 4) {
        let CHT_brightness = (0.299 * CHT_imgData1.data[CHT_i] + 0.587 * CHT_imgData1.data[CHT_i + 1] + 0.114 * CHT_imgData1.data[CHT_i + 2]) / 255;

        // Apply gamma correction to brightness
        CHT_brightness = Math.pow(CHT_brightness, 1 / CHT_gamma);

        CHT_outputData.data[CHT_i] = CHT_fillColor[0] * (1 - CHT_brightness) + 51 * CHT_brightness;
        CHT_outputData.data[CHT_i + 1] = CHT_fillColor[1] * (1 - CHT_brightness) + 51 * CHT_brightness;
        CHT_outputData.data[CHT_i + 2] = CHT_fillColor[2] * (1 - CHT_brightness) + 51 * CHT_brightness;
        CHT_outputData.data[CHT_i + 3] = 255;
    }

    CHT_ctx.putImageData(CHT_outputData, 0, 0);

    // Update the src of the input image
    CHT_imageTag1.src = CHT_canvas.toDataURL();
}



//exit popup..
// Adds the title and star rating container to a given parent element
function addStarRatingSection(parentElement) {
  // Title for the star rating
  const ratingTitle = document.createElement('p');
  ratingTitle.innerText = 'Please take a moment to rate your experience: Did BIKOTIC help you make a buying decision? Click on the stars to rate';
  ratingTitle.style.fontSize = '18px';
  ratingTitle.style.textAlign = 'center';
  ratingTitle.style.fontFamily = 'Oswald';
  ratingTitle.style.marginTop = '-5px';  // Reduced margin-top
  parentElement.appendChild(ratingTitle);

  // Star rating container
  const starContainer = document.createElement('div');
  starContainer.className = 'star-container';
  starContainer.style.textAlign = 'center';
  starContainer.style.fontSize = '40px';
  starContainer.style.color = '#bfbfbf';
  starContainer.style.marginTop = '-25px';  // Reduced margin-top
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.innerHTML = '&#9733;'; // Unicode for a star
    star.dataset.rating = i;
    star.style.cursor = 'pointer';
    star.addEventListener('click', function() {
      // Highlight stars up to clicked one
      stars.forEach((s, index) => {
        s.style.color = index < i ? '#ffa200' : '#bfbfbf';
      });
    });
    stars.push(star);
    starContainer.appendChild(star);
  }

  parentElement.appendChild(starContainer);
}


// Adds the title and input box for bike suggestions to a given parent element
function addBikeSuggestionSection(parentElement) {
  // Title for the bike suggestion
  const bikeTitle = document.createElement('p');
  bikeTitle.innerText = 'Any bikes you want added? (optional)';
  bikeTitle.style.fontSize = '18px';
  bikeTitle.style.textAlign = 'center';
  bikeTitle.style.fontFamily = 'Oswald';
  bikeTitle.style.marginTop = "8px";
  parentElement.appendChild(bikeTitle);

  // Input for bike suggestion
  const bikeInput = document.createElement('input');
  bikeInput.type = 'text';
  bikeInput.placeholder = 'Enter bike names here...';
  bikeInput.style.width = '100%';
  bikeInput.style.padding = '12px 20px';
  bikeInput.style.margin = '8px 0';
  bikeInput.style.marginTop = "-15px";
  bikeInput.style.boxSizing = 'border-box';
  parentElement.appendChild(bikeInput);
}

// Adds the title and input box for video ideas to a given parent element
function addVideoIdeaSection(parentElement) {
  // Title for video ideas
  const videoIdeaTitle = document.createElement('p');
  videoIdeaTitle.innerText = 'How could BIKOTIC be better? (optional)';
  videoIdeaTitle.style.fontSize = '18px';
  videoIdeaTitle.style.textAlign = 'center';
  videoIdeaTitle.style.fontFamily = 'Oswald';
  videoIdeaTitle.style.marginTop = "8px";
  parentElement.appendChild(videoIdeaTitle);

  // Input for video ideas
  const videoIdeaInput = document.createElement('input');
  videoIdeaInput.type = 'text';
  videoIdeaInput.placeholder = 'Enter your ideas here...';
  videoIdeaInput.style.width = '100%';
  videoIdeaInput.style.padding = '12px 20px';
  videoIdeaInput.style.margin = '8px 0';
  videoIdeaInput.style.marginTop = "-15px";
  videoIdeaInput.style.boxSizing = 'border-box';
  parentElement.appendChild(videoIdeaInput);
}

// Adds the title and input box for the optional email to a given parent element
function addEmailSection(parentElement) {
  // Title for the optional email
  const emailTitle = document.createElement('p');
  emailTitle.innerText = 'Email (optional)';
  emailTitle.style.fontSize = '18px';
  emailTitle.style.textAlign = 'center';
  emailTitle.style.fontFamily = 'Oswald';
  emailTitle.style.marginTop = "8px";
  parentElement.appendChild(emailTitle);

  // Input for the optional email
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'Enter your email here...';
  emailInput.style.width = '100%';
  emailInput.style.padding = '12px 20px';
  emailInput.style.margin = '8px 0';
  emailInput.style.marginTop = "-15px";
  emailInput.style.boxSizing = 'border-box';
  parentElement.appendChild(emailInput);
}

// Adds a "Send" button to a given parent element
function addSendButton(parentElement) {
  // Create the "Send" button
  const sendButton = document.createElement('button');
  sendButton.innerText = 'SEND FEEDBACK';
  sendButton.style.backgroundColor = "#b0236f";
  sendButton.style.color = "white";
  sendButton.style.width = '100%';
  sendButton.style.padding = '12px 20px';
  sendButton.style.margin = '8px 0';
  sendButton.style.boxSizing = 'border-box';
  sendButton.style.cursor = 'pointer';
  sendButton.style.fontFamily = 'Oswald';
  sendButton.style.fontSize = '18px';
  sendButton.style.border = '1px solid #333333';

  // Add event listener for button click (you can add your logic here)
  sendButton.addEventListener('click', function() {
    // Implement your send logic here
    sendFeedback(parentElement);
  });

  parentElement.appendChild(sendButton);
}

function addInputElements(parentElement) {
  addStarRatingSection(parentElement);
  addBikeSuggestionSection(parentElement);
  addVideoIdeaSection(parentElement);
  addEmailSection(parentElement);
  addSendButton(parentElement);  // Add the "Send" button
}


var BIKOTIC_ExitIntentWinShow = true;
function showExitIntentPopup() 
{
	//check if this session has seen this box already dont show again..
	if(BIKOTIC_ExitIntentWinShow) BIKOTIC_ExitIntentWinShow = false;
	else return;
	
  // Check if the popup already exists
  if (document.getElementById('exitIntentOverlay')) 
  {
    return;
  }

  // Create the overlay div
  const exitIntentOverlay = document.createElement('div');
  exitIntentOverlay.id = 'exitIntentOverlay';
  exitIntentOverlay.style.position = 'absolute';
  exitIntentOverlay.style.top = '0';
  exitIntentOverlay.style.left = '0';
  exitIntentOverlay.style.width = '100%';
  exitIntentOverlay.style.height = '100%';
  exitIntentOverlay.style.zIndex = '1000';

  // Create the popup window div
  const exitIntentWindow = document.createElement('div');
  exitIntentWindow.style.position = 'relative';
  exitIntentWindow.style.width = '80%';
  exitIntentWindow.style.maxWidth = '400px';
  exitIntentWindow.style.margin = '100px auto';
  exitIntentWindow.style.padding = '20px';
  exitIntentWindow.style.backgroundColor = '#fff';
  exitIntentWindow.style.border = '1px solid #ccc';
  exitIntentWindow.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
  exitIntentWindow.style.borderRadius = '20px';
  exitIntentWindow.style.zIndex = '1001';

  // Create and append the image at the top
  const topImage = document.createElement('img');
  topImage.src = CODEBASE + "IMGz/BIKOTIC_NeedsYourHelp.jpg";
  topImage.style.display = 'block';
  topImage.style.margin = '0 auto 20px auto';
  topImage.style.marginTop = "-10px";
  exitIntentWindow.appendChild(topImage);

  // Create the close button
  const exitIntentCloseBtn = document.createElement('span');
  exitIntentCloseBtn.innerText = 'X';
  exitIntentCloseBtn.style.position = 'absolute';
  exitIntentCloseBtn.style.top = '10px';
  exitIntentCloseBtn.style.right = '15px';
  exitIntentCloseBtn.style.cursor = 'pointer';
  exitIntentCloseBtn.style.fontSize = '20px';
  exitIntentCloseBtn.style.color = '#afafaf';
  exitIntentCloseBtn.style.fontFamily = 'sans-serif';

  // Append the close button to the popup window
  exitIntentWindow.appendChild(exitIntentCloseBtn);

	const exitIntentOverlayCONT = document.createElement('div');
	exitIntentOverlayCONT.id = "exitIntentOverlayCONT";
	  // Add input elements (star rating and text input)
	  addInputElements(exitIntentOverlayCONT);
	exitIntentWindow.append(exitIntentOverlayCONT);

  // Append the popup window to the overlay
  exitIntentOverlay.appendChild(exitIntentWindow);

  // Append the overlay to the body
  document.body.appendChild(exitIntentOverlay);
  
  exitIntentOverlay.addEventListener('keydown', function(event) {
  event.stopPropagation();
});

  // Close the popup when the close button is clicked
  exitIntentCloseBtn.addEventListener('click', () => {
    exitIntentOverlay.style.display = 'none';
    document.body.removeChild(exitIntentOverlay); // Remove the overlay from DOM
  });

  // Close the popup when clicking outside the window
  exitIntentOverlay.addEventListener('click', (e) => {
    if (e.target === exitIntentOverlay) {
      exitIntentOverlay.style.display = 'none';
      document.body.removeChild(exitIntentOverlay); // Remove the overlay from DOM
    }
  });
}

// Function to send feedback
function sendFeedback() {
  // Get the email input value
  const emailInput = document.querySelector('input[type="email"]');
  const emailValue = emailInput ? emailInput.value : '';

  // Get the star rating
	const stars = document.querySelectorAll('span[data-rating]');
	let starRating = 0; 
	for (let i = 0; i < stars.length; i++) { 
	  if (stars[i].style.color === 'rgb(255, 162, 0)') {
	    starRating = i + 1; 

	  } else {
	    break; // Stop the loop once you find a star that is not #ffa200
	  }
	}

  // Get the bike suggestion input value
  const bikeSuggestionInput = document.querySelector('input[placeholder="Enter bike names here..."]');
  const bikeSuggestionValue = bikeSuggestionInput ? bikeSuggestionInput.value : '';

  // Get the video idea input value
  const videoIdeaInput = document.querySelector('input[placeholder="Enter your ideas here..."]');
  const videoIdeaValue = videoIdeaInput ? videoIdeaInput.value : '';

  // Create the message combining star rating and all input values
  const message = "Star Rating:" + starRating + "<br>Bike Suggestions:" + bikeSuggestionValue + "<br>Video Ideas:" + videoIdeaValue;

  // Create the URL for the Perl script
  const url = `${CODEBASE}MESSENGER-V2/BIKOTIC_MESSENGER_SEND.pl?email=${encodeURIComponent(emailValue)}&message=${encodeURIComponent(message)}`;

  // Create a new XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open('GET', url, true);

  // Set up a function to run when the request is complete
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // This block will run when the request is successful
	    var cont = document.getElementById("exitIntentOverlayCONT")
	    cont.style.fontSize = '60px';
		cont.style.textAlign = 'center';
		cont.style.fontFamily = 'Oswald';
		cont.style.marginTop = "50px";
		cont.style.marginBottom = "80px";
		cont.style.color = "#643f6b";
	    cont.innerHTML = "<strong>" + xhr.responseText + "</strong>";
    }
  };

  // Send the request
  xhr.send();
}

	
	//..................................................................AJAX..
	function requestAJAX(url, table, items, whereX, whereY, andX, andY, direction, doNext)
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{			
				doNext(JSON.parse(this.responseText));	
			}
		};
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(table + "&" + items + "&" + whereX + "&" + whereY + "&" + andX + "&" + andY + "&" + direction); 
	}
	//..................................................................AJAX..
	
	function log(txt){console.log(txt);}
