
var messenger_win;
var messenger_cont;
var messenger_prevMessages;
var messenger_clearText = true;
var messenger_textArea;
var email_text;

function MESSENGER_ShowMessenger()
{
	if(messenger_win)
	{
		messenger_win.style.display = "block"; 	
	}
	else
	{
		MESSENGER_MakeWindow();
		MESSENGER_MakeCloseButton();
	} 
}


function MESSENGER_MakeWindow()
{
	messenger_win = document.createElement("DIV");
	messenger_win.style.position = "absolute";
	messenger_win.style.display = "block";
	messenger_win.style.zIndex = 98;
	messenger_win.style.width = "100%"; 
	messenger_win.style.backgroundColor = BIKOTIC_SubWinBkgColor;
	messenger_win.style.fontFamily = "Oswald";
	messenger_win.style.color = "#818181";
	messenger_win.style.textAlign = "center";
	messenger_win.style.padding = "0px";
	messenger_win.style.cursor = "default";
	messenger_win.style.fontSize = "26px";
	messenger_win.style.fontWeight = "700";
	messenger_win.style.paddingTop = "15px";
	document.body.append(messenger_win);
	
	var msg_icon = document.createElement("IMG");
	msg_icon.src = CODEBASE + "IMGz/BIKOTIC_MSG_ICON.png";
	messenger_win.append(msg_icon);
	
	var msg_title = document.createElement("DIV");
	msg_title.innerHTML = "CONTACT BIKOTIC";
	messenger_win.append(msg_title);
	
	//msg cont..
	messenger_cont = document.createElement("DIV");
	messenger_cont.style.maxWidth = "300px";
	messenger_cont.style.textAlign = "left";
	messenger_cont.style.margin = "auto";
	messenger_cont.style.fontSize = "16px";
	messenger_cont.style.fontWeight = "400";
	messenger_cont.style.padding = "10px";
	messenger_cont.style.paddingBottom = "126px";
	messenger_win.append(messenger_cont);
	
	/*
	//email..
	var msg_email_title = document.createElement("DIV");
	msg_email_title.innerHTML = "Email required if you need a reply:";
	messenger_cont.append(msg_email_title);
	
	var email_text_cont = document.createElement("DIV");
		email_text = document.createElement("INPUT");
		email_text.style.width = "300px";
		email_text.style.borderRadius = "6px";
		email_text.style.borderStyle = "solid";
		email_text.style.borderWidth = "thin";
		email_text.style.padding = "5px";
		email_text.style.marginTop = "5px";
		email_text.placeholder = "Enter email address";
		email_text.onkeydown = function(){event.stopPropagation();}
		email_text_cont.append(email_text);
	messenger_cont.append(email_text_cont);
	
	//spacer..
	var spacer = document.createElement("DIV");
	spacer.style.height = "10px";
	messenger_cont.append(spacer);
	
	//msg..
	var msg_text_title = document.createElement("DIV");
	msg_text_title.innerHTML = "If you're requesting a bike(s) to be added to BIKOTIC, please add a URL(s):";
	messenger_cont.append(msg_text_title);
	*/
	messenger_textArea = document.createElement("TEXTAREA");
	messenger_textArea.style.width = "300px";
	messenger_textArea.placeholder = "Enter message...";
	messenger_textArea.style.borderRadius = "6px";
	messenger_textArea.style.borderStyle = "solid";
	messenger_textArea.style.borderWidth = "thin";
	messenger_textArea.style.height = "150px";
	messenger_textArea.style.padding = "5px";
	messenger_textArea.style.marginTop = "5px";
	messenger_textArea.onkeydown = function(){event.stopPropagation();}
	messenger_cont.append(messenger_textArea);
	
	//send button..
	var button_cont = document.createElement("DIV");
	button_cont.style.textAlign = "center";
		var msg_send_button = document.createElement("BUTTON");
		msg_send_button.innerHTML = "SEND";
		msg_send_button.style.width = "100px";
		msg_send_button.style.fontSize = "22px";
		msg_send_button.style.padding = "3px";
		msg_send_button.style.marginTop = "5px";
		msg_send_button.onclick = MESSENGER_SendMessage;
		button_cont.append(msg_send_button);
	messenger_cont.append(button_cont);
	
	//msg footer..
	var msg_footer = document.createElement("DIV");
	msg_footer.style.textAlign = "center";
	var ytpic = CODEBASE + "IMGz/BIKOTIC_Youtube.png";
	msg_footer.innerHTML = `
	<br>
	<a href="https://www.youtube.com/@bikotic" target="_blank"><img src="${ytpic}"></a>
	`
	messenger_cont.append(msg_footer);
	
}

function MESSENGER_MakeCloseButton()
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
		messenger_win.style.display = "none";
		
		BIKOTIC_UpdatePageNameURL("BIKOTIC SUB WIN EXIT", true, "cb");
	}
	messenger_win.append(cB);
}


function MESSENGER_SendMessage()
{

	var url = CODEBASE + "MESSENGER-V2/BIKOTIC_MESSENGER_SEND.pl";
	var query = "email=xxx&message=" + messenger_textArea.value;
	
	var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{ 
					//email_text.value = "";
					messenger_textArea.value = this.responseText;
				}
			};
			xhttp.open("POST", url, true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(query);
}









