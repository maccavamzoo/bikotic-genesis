
var similar_win;
var similar_cont;

function SIMILAR_ShowSimilar()
{
	if(similar_win)
	{
		similar_cont.innerHTML = "<br><br>LOADING<br><br><br><br><br>";
		similar_win.style.display = "block"; 
	}
	else
	{
		SIMILAR_MakeWindow();
		SIMILAR_MakeCloseButton();
	} 
	
	SIMILAR_LoadSimilar();
}


function SIMILAR_MakeWindow()
{
	similar_win = document.createElement("DIV");
	similar_win.style.position = "absolute";
	similar_win.style.display = "block";
	similar_win.style.zIndex = 98;
	similar_win.style.width = "100%"; 
	similar_win.style.backgroundColor = BIKOTIC_SubWinBkgColor;
	similar_win.style.fontFamily = "Oswald";
	similar_win.style.color = "#818181";
	similar_win.style.textAlign = "center";
	similar_win.style.padding = "0px";
	similar_win.style.cursor = "default";
	similar_win.style.paddingTop = "15px";
	document.body.append(similar_win);
	
	var similar_icon = document.createElement("IMG");
	similar_icon.src = CODEBASE + "IMGz/BIKOTIC_SEARCH_ICON.png";
	similar_win.append(similar_icon);
	
	var similar_heading = document.createElement("DIV");
	similar_heading.style.fontSize = "26px";
	similar_heading.style.fontWeight = "700";
	similar_heading.innerHTML = "SIMILAR BIKES";
	similar_win.append(similar_heading);
	
	similar_cont = document.createElement("DIV");
	similar_cont.style.fontSize = "16px";
	similar_cont.style.fontWeight = "400";
	similar_cont.style.textAlign = "center";
	similar_cont.style.padding = "10px";
	similar_cont.style.paddingBottom = "126px";

	similar_win.append(similar_cont);
}

function SIMILAR_MakeCloseButton()
{ 
	cB = document.createElement("DIV");
	cB.style.zIndex = "1000";
	cB.style.position = "fixed";
	cB.style.top = "16px";
	cB.style.right = "16px";
	cB.style.padding = "10px";
	cB.style.paddingTop = "5px";
	cB.style.paddingBottom = "5px";
	cB.style.backgroundColor = BIKOTIC_SubWinBkgColor;
	cB.style.color = "#818181";
	cB.style.borderRadius = "10px";
	cB.style.borderStyle = "solid";
	cB.style.borderWidth= "thin";
	cB.style.fontSize = "16px";
	cB.innerHTML = "X CLOSE";
	cB.style.cursor = "pointer";
		
	cB.onclick = function()
	{
		similar_win.style.display = "none";
		
		BIKOTIC_UpdatePageNameURL("BIKOTIC SUB WIN EXIT", true, "cb");
	}
	similar_win.append(cB);
}

function SIMILAR_LoadSimilar()
{
		
	//calculate the bike details..
	var aBike = bike1;
	if(alpha > 0.5) aBike = bike2;
	
	var query = "id=" + aBike.id;
		
	var url = CODEBASE + "SIMILAR_BIKES/BIKOTIC_SIMILAR_BIKES.pl";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function()
	{
		if (this.readyState == 4 && this.status == 200) 
		{ 	
			similar_cont.innerHTML = "";
			var similarBikes = JSON.parse(this.responseText); 				
			
			for(var i = 0; i < similarBikes.bikes.length; i++)
			{
				var bike = similarBikes.bikes[i];
				var box = document.createElement("DIV");
				box.id = bike.id;
				box.style.position = "relative";
				box.setAttribute("class", "box");
				
				var img = document.createElement("IMG");
				img.src = "https://bikotic.com/SLRGT/BIKE-IMAGES/THUMBS-WEBP/" + bike.imagename + "-SML.webp";
				box.append(img);
				
				var man = document.createElement("DIV");
				man.innerHTML = "<strong>" + bike.model_year + " " + bike.manufacturer.toUpperCase() + "</strong>";
				man.style.fontSize = "14px";
				man.style.fontWeight = "normal";
				box.append(man);
				//man.style.marginTop = "-15px";
				
				var model = document.createElement("DIV");
				model.innerHTML = truncate(bike.model_des.toUpperCase()); 
				model.style.fontSize = "16px";
				box.append(model);
				model.style.marginTop = "-5px";
				
				
				var group = document.createElement("DIV");
				group.innerHTML = bike.groupset + " " + bike.groupset_speed + "spd";
				group.style.fontSize = "14px";
				group.style.fontWeight = "normal";
				box.append(group);
				group.style.marginTop = "-5px";
				
				var price = document.createElement("DIV");
				var pT = bike.price;
				if(pT == -999999.00){ pT = "£?"; price.style.color = "grey"; }
				else
				{ 
					pT = "£" + numberWithCommas(bike.price);
					price.style.color = "#aa8694";
				}
				
				//add weight to price..
				var wT = bike.weight;
				if(wT == 99) wT = "?";
				pT+= " | " + wT + "kg"; 
				
				//add clearance..
				if(bike.clearance != 0) pT+= " | " + bike.clearance + "mm"; 
				
				price.innerHTML = pT; 
				price.style.fontSize = "14px";
				price.style.fontWeight = "bold";
				box.append(price);
				price.style.marginTop = "-5px";
				
				
				
				
				var dateBits = bike.date.split(" ");
				var date = document.createElement("DIV");
				date.innerHTML = "Added: " + dateBits[0] + "<br>" + bike.hits + "HTS"; 
				date.style.fontSize = "11px";
				date.style.position = "absolute";
				date.style.textAlign = "left";
				date.style.left = "5px";
				date.style.top = "2px";
				box.append(date);
				
				//check if bike is an e bike..
				if(bike.motor_nm > 0)
				{
					//add the ranger exists button..
					var isAnE_Bike = document.createElement("IMG"); 
					isAnE_Bike.style.position = "absolute";
					isAnE_Bike.style.bottom = "6px";
					isAnE_Bike.style.left = "6px";
					isAnE_Bike.src = CODEBASE + "IMGz/electric_bike_icon.png";
					box.append(isAnE_Bike);
				}
				
				SIMILAR_Onclick(bike, box);
				
				similar_cont.append(box);
				
			}
			
		}
	};
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(query);					
}

function SIMILAR_Onclick(bike, aBikeDiv)
{
	aBikeDiv.onclick = function()
	{ 
		if(BIKOTIC_APP_TYPE == "DESKTOP")
		{
			openRecentBike1(bike.manufacturer_id, bike.model_id, bike.model_year, bike.id);
			similar_win.style.display = "none";
		}
		if(BIKOTIC_APP_TYPE == "MOBILE")
		{
			if(CHT_AlphaValue < 0.5)
			{
				MOBILE_getBikeInfo(bike.id, "bike1"); 
				similar_win.style.display = "none";
			}
			else
			{
				MOBILE_getBikeInfo(bike.id, "bike2"); 
				similar_win.style.display = "none";
			}
		}
	}
}





