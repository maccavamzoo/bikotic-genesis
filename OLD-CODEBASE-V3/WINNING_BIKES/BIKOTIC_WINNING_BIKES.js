
var winning_bikes_win;
var winning_bikes_cont;

function WINNING_BIKES_ShowWinningBikes()
{
	if(winning_bikes_win)
	{
		winning_bikes_cont.innerHTML = "<br><br>UNDER CONSTRUCTION<br><br><br><br><br>";
		winning_bikes_win.style.display = "block"; 	
	}
	else
	{
		WINNING_BIKES_MakeWindow();
		WINNING_BIKES_MakeCloseButton();
	} 
	
	//WINNING_BIKES_GetWinningBikes();
}

function WINNING_BIKES_GetWinningBikes()
{
	var url = "https://bikotic.com/SLRGT/WINNING_BIKES/BIKOTIC_WINNING_BIKES.pl";
	
	var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{ 
					winning_bikes_cont.innerHTML = this.responseText;
				}
			};
			xhttp.open("POST", url, true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send();
}

function WINNING_BIKES_MakeWindow()
{
	winning_bikes_win = document.createElement("DIV");
	winning_bikes_win.style.position = "absolute";
	winning_bikes_win.style.display = "block";
	winning_bikes_win.style.zIndex = 99;
	winning_bikes_win.style.width = "100%"; 
	winning_bikes_win.style.backgroundColor = BIKOTIC_SubWinBkgColor;
	winning_bikes_win.style.fontFamily = "Oswald";
	winning_bikes_win.style.color = "#818181";
	winning_bikes_win.style.textAlign = "center";
	winning_bikes_win.style.padding = "0px";
	winning_bikes_win.style.cursor = "default";
	winning_bikes_win.style.paddingTop = "15px";
	document.body.append(winning_bikes_win);
	
	var winning_icon = document.createElement("IMG");
	winning_icon.src = "https://bikotic.com/SLRGT/WINNING_BIKES/BIKOTIC_WINNING_ICON.png";
	winning_bikes_win.append(winning_icon);
	
	var WinningBikes_heading = document.createElement("DIV");
	WinningBikes_heading.style.fontSize = "26px";
	WinningBikes_heading.style.fontWeight = "700";
	WinningBikes_heading.innerHTML = "WORLD TOUR WINNING BIKE LEAGUE";
	winning_bikes_win.append(WinningBikes_heading);
	
	winning_bikes_cont = document.createElement("DIV");
	winning_bikes_cont.style.fontSize = "16px";
	winning_bikes_cont.style.fontWeight = "400";
	winning_bikes_cont.innerHTML = "<br><br>UNDER CONSTRUCTION<br><br><br><br><br>";
	winning_bikes_cont.style.textAlign = "left";
	winning_bikes_cont.style.maxWidth = "800px";
	winning_bikes_cont.style.margin = "auto";
	winning_bikes_cont.style.padding = "10px";
	winning_bikes_cont.style.paddingBottom = "100px";
	winning_bikes_win.append(winning_bikes_cont);
}

function WINNING_BIKES_MakeCloseButton()
{ 
	var cB = document.createElement("DIV");
	cB.style.zIndex = "1000";
	cB.style.position = "fixed";
	cB.style.top = ".5vw";
	cB.style.right = ".5vw";
	cB.style.padding = "10px";
	cB.style.paddingTop = "5px";
	cB.style.paddingBottom = "5px";
	cB.style.backgroundColor = BIKOTIC_SubWinBkgColor; 
	cB.style.color = "#818181";
	cB.style.borderRadius = "10px";
	cB.style.borderStyle = "solid";
	cB.style.borderWidth= "thin";
	cB.style.fontSize = "1vw";
	cB.innerHTML = "X CLOSE";
	cB.style.cursor = "pointer";
		
	cB.onclick = function()
	{
		winning_bikes_win.style.display = "none";
		
		BIKOTIC_UpdatePageNameURL("BIKOTIC SUB WIN EXIT", true, "cb");
	}
	winning_bikes_win.append(cB);
}
