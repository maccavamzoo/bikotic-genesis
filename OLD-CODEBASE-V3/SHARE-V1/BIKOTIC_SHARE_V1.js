
var share_win;
var share_cont;
var share_prevMessages;
var share_clearText = true;
var share_textArea;

function SHARE_ShowShare()
{
	if(share_win)
	{
		share_win.style.display = "block"; 	
	}
	else
	{
		SHARE_MakeWindow();
		SHARE_MakeCloseButton();
	} 
	
	SHARE_ListCurrentState();
}


function removeItsMe(str) {
  const target = 'itsme=true&';
  let index = str.indexOf(target);

  if (index !== -1) {
    return str.slice(0, index) + str.slice(index + target.length);
  }
  
  return str;
}

function SHARE_ShortenLink()
{
	var url = CODEBASE + "SHARE-V1/BIKOTIC_SHORTEN_URL.pl";
	
	var params = window.location.href.split("?")[1];
	
	//check if its me to remove it..
	params = removeItsMe(params);
	
	params = params.replace(/=/g, '~').replace(/&/g, '#'); 
	 
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{			
			if(this.responseText == "FAIL"){SHARE_Input.value = "ARE YOU A ROBOT!"; return;}
			if(this.responseText == "FAIL, Try again"){SHARE_Input.value = "FAILED, Try again"; return;}
			
			//it worked..
			SHARE_Input.value = "https://bikotic.com" + "?" + this.responseText;
			
		}
	};
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("url_params=" + params + "&ac=d6r5k4j8g1"); 
	
}

var SHARE_Input;
function SHARE_ListCurrentState()
{
	var starredAmount = 0;
	if(BIKOTIC_MyList != "286")
	{
		starredAmount = BIKOTIC_MyList.split(",").length;
	}
	
	share_cont.innerHTML = `
	<div>note: if you update the setup you will need to get a new link</div><br>
	<div><strong>BIKE COMPARISON VIEW:</strong></div>
	<div><strong>Bike 1:</strong> ${bike1.manufacturer} ${bike1.model_des}</div>
	<div><strong>Bike 2:</strong> ${bike2.manufacturer} ${bike2.model_des}</div><br>
	<div><strong>STARRED LIST:</strong> ${starredAmount} bikes</div>
	<br>
	
	`;
	
	var share_response = document.createElement("DIV");
	share_cont.append(share_response);
	
	var SHARE_InputCont = document.createElement("DIV");
	share_cont.append(SHARE_InputCont);
	
		SHARE_Input = document.createElement("INPUT");
		SHARE_Input.style.width = "50%";
		SHARE_Input.style.minWidth = "300px";
		SHARE_Input.style.fontSize = "14px";
		SHARE_Input.style.textAlign = "center";
		//SHARE_Input.value = window.location.href;
		SHARE_InputCont.append(SHARE_Input);
	
	var share_spacer = document.createElement("DIV");
	share_spacer.style.height = "10px";
	share_cont.append(share_spacer);
	
	var copyButt = document.createElement("BUTTON");
	copyButt.innerHTML = "COPY LINK";
	copyButt.onclick = function()
	{
		SHARE_Input.select();
		document.execCommand("copy");
		share_response.innerHTML = "COPIED";
	}
	share_cont.append(copyButt);
	
	//load the shortened link..
	SHARE_ShortenLink();
	
}

BIKOTIC_MyList
function SHARE_MakeWindow()
{
	share_win = document.createElement("DIV");
	share_win.style.position = "absolute";
	share_win.style.display = "block";
	share_win.style.zIndex = 98;
	share_win.style.width = "100%"; 
	share_win.style.backgroundColor = BIKOTIC_SubWinBkgColor;
	share_win.style.fontFamily = "Oswald";
	share_win.style.color = "#818181";
	share_win.style.textAlign = "center";
	share_win.style.padding = "0px";
	share_win.style.cursor = "default";
	share_win.style.fontSize = "26px";
	share_win.style.fontWeight = "700";
	share_win.style.paddingTop = "15px";
	document.body.append(share_win);
	
	var share_icon = document.createElement("IMG");
	share_icon.src = CODEBASE + "IMGz/BIKOTIC_SHARE_ICON.png";
	share_win.append(share_icon);
	
	var share_title = document.createElement("DIV");
	share_title.innerHTML = "SHARE CURRENT BIKOTIC SETUP";
	share_win.append(share_title);
	
	share_cont = document.createElement("DIV");
	share_cont.style.fontSize = "16px";
	share_cont.style.fontWeight = "400";
	share_cont.style.textAlign = "center";
	share_cont.style.padding = "10px";
	share_cont.style.paddingBottom = "126px";
	//share_cont.innerHTML =
	
	share_win.append(share_cont);
	
}

function SHARE_MakeCloseButton()
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
		share_win.style.display = "none";
		
		BIKOTIC_UpdatePageNameURL("BIKOTIC SUB WIN EXIT", true, "cb");
	}
	share_win.append(cB);
}








