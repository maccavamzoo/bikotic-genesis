
var comments_win;
var comments_cont;
var comments_prevMessages;
var comments_clearText = true;
var comments_bikeImage;
var comments_bikeDetails;
var comments_commentsCont;
var comments_selectedBike;
var comments_COMMENTS_Textarea;

function COMMENTS_ShowComments()
{
	if(comments_win)
	{
		comments_win.style.display = "block"; 	
	}
	else
	{
		COMMENTS_MakeWindow();
		COMMENTS_MakeCloseButton();
	} 
	
	COMMENTS_Populate();
}

function COMMENTS_Populate()
{  
	var app_alpha_val = alpha;
	if(BIKOTIC_APP_TYPE == "MOBILE") app_alpha_val = CHT_AlphaValue;
	
	if(app_alpha_val < 0.5)
	{
		comments_bikeDetails.innerHTML = bike1.manufacturer.toUpperCase() + " " + bike1.model_des.toUpperCase();
		comments_bikeImage.src = pathToBikes + bike1.image_name + pathToBikesPost;
		comments_selectedBike = bike1;
		COMMENTS_GetMessages();
	}
	else
	{
		comments_bikeDetails.innerHTML = bike2.manufacturer.toUpperCase() + " " + bike2.model_des.toUpperCase();
		comments_bikeImage.src = pathToBikes + bike2.image_name + pathToBikesPost;		
		comments_selectedBike = bike2;
		COMMENTS_GetMessages();
	}
	
	//disable if comments for bike are full...
	if(comments_selectedBike.comment_count > 50) 
	{
		COMMENTS_Textarea.disabled = true;
		COMMENTS_Textarea.placeholder = `Sorry, we've reached the maximum number of comments allowed for this bike`;
		COMMENTS_PostButton.style.backgroundColor = '#cdcdcd';
		COMMENTS_PostButton.disabled = true;
	}
	else
	{
		COMMENTS_Textarea.disabled = false;
		COMMENTS_Textarea.placeholder = `Say something...`;
		COMMENTS_PostButton.style.backgroundColor = '#a274a1';
		COMMENTS_PostButton.disabled = false;
	}
}

function COMMENTS_MakeWindow()
{
	comments_win = document.createElement("DIV");
	comments_win.style.position = "absolute";
	comments_win.style.display = "block";
	comments_win.style.zIndex = 98;
	comments_win.style.width = "100%"; 
	comments_win.style.backgroundColor = "#ffffff";
	comments_win.style.fontFamily = "Oswald";
	comments_win.style.color = "#818181";
	comments_win.style.textAlign = "center";
	comments_win.style.padding = "0px";
	comments_win.style.cursor = "default";
	comments_win.style.fontSize = "26px";
	comments_win.style.fontWeight = "700";
	comments_win.style.paddingTop = "15px";
	document.body.append(comments_win);
	
	var msg_icon = document.createElement("IMG");
	msg_icon.src = CODEBASE + "IMGz/BIKOTIC_MSG_ICON.png";
	comments_win.append(msg_icon);
	
	var msg_title = document.createElement("DIV");
	msg_title.innerHTML = "COMMENTS";
	comments_win.append(msg_title);
	
	//msg cont..
	comments_cont = document.createElement("DIV");
	comments_cont.style.position = "relative";
	comments_cont.style.maxWidth = "500px";
	comments_cont.style.textAlign = "left";
	comments_cont.style.margin = "auto";
	comments_cont.style.fontSize = "16px";
	comments_cont.style.fontWeight = "400";
	comments_cont.style.padding = "10px";
	comments_cont.style.paddingBottom = "126px";
	comments_win.append(comments_cont);
	
	//the bike..
	comments_bikeDetails = document.createElement("DIV");	
	comments_bikeDetails.style.textAlign = "center";
	comments_bikeDetails.style.fontWeight = "bold";
	comments_bikeDetails.style.color = "#a274a1";
	comments_bikeDetails.style.fontSize = "22px";
	comments_bikeImage = document.createElement("IMG");
	comments_bikeImage.style.width = "100%";
	comments_bikeImage.style.maxWidth = "500px";
	comments_cont.append(comments_bikeImage);
	comments_cont.append(comments_bikeDetails);
	
	//container for the comments..
	comments_commentsCont = document.createElement("DIV");
	comments_commentsCont.innerHTML = "Comments";
	comments_commentsCont.style.height = "500px";
	comments_cont.append(comments_commentsCont);
	
	//create the bottom comment entry ui - created in chtGPT..
	createBottomDiv(comments_cont);
}

function COMMENTS_MakeCloseButton()
{ 
	cB = document.createElement("DIV");
	cB.style.zIndex = "1000";
	cB.style.position = "fixed";
	cB.style.top = "16px";
	cB.style.right = "16px";
	cB.style.padding = "10px";
	cB.style.paddingTop = "5px";
	cB.style.paddingBottom = "5px";
	cB.style.backgroundColor = "#ffffff";
	cB.style.color = "#818181";
	cB.style.borderRadius = "10px";
	cB.style.borderStyle = "solid";
	cB.style.borderWidth= "thin";
	cB.style.fontSize = "16px";
	cB.innerHTML = "X CLOSE";
	cB.style.cursor = "pointer";
		
	cB.onclick = function()
	{
		
		comments_win.style.display = "none";
		
		//update the comments counter..
		COMMENTS_UpdateCommentsCounter();
		
		BIKOTIC_UpdatePageNameURL("BIKOTIC SUB WIN EXIT", true, "cb");
		
		if(BIKOTIC_APP_TYPE == "MOBILE") createStatsPopup();
	}
	comments_win.append(cB);
}

function COMMENTS_UpdateCommentsCounter()
{
	var url = CODEBASE + "COMMENTS/BIKOTIC_COMMENTS_GET_COUNT.pl";
	
	var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{ 
					comments_selectedBike.comment_count = this.responseText;
					draw();
				}
			};
			xhttp.open("POST", url, true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("model_id=" + comments_selectedBike.id);
}

function COMMENTS_GetMessages()
{
	var url = CODEBASE + "COMMENTS/BIKOTIC_COMMENTS_GET.pl";
	
	if(comments_selectedBike.comment_count == 0)
	{
		comments_commentsCont.innerHTML = "NO COMMENTS";
		return;
	}
	else
	{
		comments_commentsCont.innerHTML = "LOADING";
	}
	
	var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{ 
					comments_commentsCont.innerHTML = this.responseText; 
				}
			};
			xhttp.open("POST", url, true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send("id=" + comments_selectedBike.id);
}

function COMMENTS_checkForBannedWords(str, bannedWords) {
  const words = str.toLowerCase().split(' ');
  for (let i = 0; i < words.length; i++) {
    if (bannedWords.includes(words[i])) {
      return true;
    }
  }
  return false;
}

function COMMENTS_SendMessage()
{
	var itme = 0;
	if(BIKOTIC_ItsMe) itme = 1;
	
	//lets check the comment for profanity..
	if(COMMENTS_checkForBannedWords(comments_COMMENTS_Textarea.value, bannedWords))
	{
		alert("You have a banned word in your comment.");
		return;
	}
	
	//check for links..
	if(COMMENTS_checkForBikoticLinks(comments_COMMENTS_Textarea.value) && !BIKOTIC_ItsMe)
	{
		alert("You can't post URL's, other than Bikotic.com URL's created and shortened via the Share window. If you do have a relevant link, send it to Bikoitc via the Contact form. I will check it and add it.");
		return;
	}

	var url = CODEBASE + "COMMENTS/BIKOTIC_COMMENTS_SEND.pl";
	var query = "isitme=" + itme + "&model_id=" + comments_selectedBike.id + "&comment=" + comments_COMMENTS_Textarea.value;
	
	var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{ 
					comments_selectedBike.comment_count++;
					COMMENTS_Populate();
					comments_COMMENTS_Textarea.value = "";
				}
			};
			xhttp.open("POST", url, true);
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(query);
}

//chtGPT limit chars function..
function limitTextarea(COMMENTS_Textarea) {
  var maxLength = 255;
  var remainingChars = maxLength - COMMENTS_Textarea.value.length;

  var updateCharsLeft = function() {
    var remainingChars = maxLength - COMMENTS_Textarea.value.length;
    var charsLeftText = remainingChars + ' letters left';
    COMMENTS_Textarea.value = COMMENTS_Textarea.value.replace(/ \d+ letters left$/, '') + ' ' + charsLeftText;
  };

  COMMENTS_Textarea.addEventListener('input', function(event) {
    var value = COMMENTS_Textarea.value;
    if (value.length > maxLength) {
      COMMENTS_Textarea.value = value.slice(0, maxLength);
    }
    updateCharsLeft();
  });
}

var COMMENTS_Textarea;
var COMMENTS_PostButton;
function createBottomDiv(parent) {
  // create the outer div element
  const bottomDiv = document.createElement('div');
  bottomDiv.style.position = 'fixed';
  bottomDiv.style.bottom = '0';
  bottomDiv.style.left = '0';
  bottomDiv.style.width = '100%';
  bottomDiv.style.backgroundColor = '#e3cae2';
  parent.appendChild(bottomDiv);

  // create the child div element with max width of 500px
  const childDiv = document.createElement('div');
  childDiv.style.maxWidth = '500px';
  childDiv.style.margin = '0 auto';
  childDiv.style.paddingTop = '20px';
  childDiv.style.display = 'flex';
  childDiv.style.justifyContent = 'space-evenly';
  bottomDiv.appendChild(childDiv);

  // create the COMMENTS_Textarea element on the left
  COMMENTS_Textarea = document.createElement('textarea');
  COMMENTS_Textarea.style.width = '78%';
  COMMENTS_Textarea.style.height = '70px';
  COMMENTS_Textarea.style.padding = '5px';
  COMMENTS_Textarea.style.boxSizing = 'border-box';
  COMMENTS_Textarea.style.border = 'none';
  COMMENTS_Textarea.style.borderRadius = '5px';
  COMMENTS_Textarea.style.resize = 'none';
  COMMENTS_Textarea.style.fontSize = '16px';
  COMMENTS_Textarea.style.backgroundColor = '#f1f1f1';
  COMMENTS_Textarea.placeholder = 'Say something...';
  childDiv.appendChild(COMMENTS_Textarea);
  comments_COMMENTS_Textarea = COMMENTS_Textarea;

  // create the COMMENTS_PostButton element on the right
  COMMENTS_PostButton = document.createElement('button');
  COMMENTS_PostButton.style.marginRight = "0px";
  COMMENTS_PostButton.style.width = '17%';
  COMMENTS_PostButton.style.height = '70px';
  COMMENTS_PostButton.style.border = 'none';
  COMMENTS_PostButton.style.borderRadius = '5px';
  COMMENTS_PostButton.style.backgroundColor = '#a274a1';
  COMMENTS_PostButton.style.color = '#fff';
  COMMENTS_PostButton.style.fontSize = '16px';
  COMMENTS_PostButton.style.cursor = 'pointer';
  COMMENTS_PostButton.textContent = 'Post';
  COMMENTS_PostButton.addEventListener('click', () => {
    // handle COMMENTS_PostButton click event
    COMMENTS_SendMessage();
  });
  childDiv.appendChild(COMMENTS_PostButton);

  // create the counter div element below the COMMENTS_Textarea and COMMENTS_PostButton
  const counterDiv = document.createElement('div');
  counterDiv.style.width = '100%';
  counterDiv.style.padding = '5px';
  counterDiv.style.boxSizing = 'border-box';
  counterDiv.style.fontSize = '14px';
  counterDiv.style.color = '#a274a1';
  counterDiv.style.textAlign = 'center';
  counterDiv.textContent = '255 characters left';
  bottomDiv.appendChild(counterDiv);

  COMMENTS_Textarea.addEventListener('input', () => {
    const remainingChars = 255 - COMMENTS_Textarea.value.length;
    counterDiv.textContent = `${remainingChars} characters left`;
    if (remainingChars <= 0) {
      COMMENTS_Textarea.value = COMMENTS_Textarea.value.substring(0, 255);
      counterDiv.textContent = '0 characters left';
      COMMENTS_Textarea.removeEventListener('input', null);
    }
  });
  
  // create the spacer div element with a height of 100px
  const spacerDiv = document.createElement('div');
  spacerDiv.style.height = '50px';
  spacerDiv.style.textAlign = "center";
  spacerDiv.style.color = "#ffffff";
  spacerDiv.style.padding = "3px";
  spacerDiv.innerHTML = "Keep it respectful and friendly, and don't post any personal information....or I will delete it!";
  bottomDiv.appendChild(spacerDiv);

}

function COMMENTS_checkForBikoticLinks(comment) {
  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Check if the comment contains any URLs
  if (urlRegex.test(comment)) {
    // URLs found in the comment
    const urls = comment.match(urlRegex);

    // Loop through the URLs and check if they match the bikotic.com domain and have an 8 character code at the end
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const urlRegex2 = /^https?:\/\/bikotic\.com\/\?[\w\d]{8}$/;

      if (urlRegex2.test(url)) {
        return 0; //has a bikoitc URL..
      } else {
        return 1; //has bad URL..
      }
    }
  } else {
    return 0; //no URLS's in comment..
  }
}



const bannedWords = [
						'fuck', 
						'shit',
						'piss',
						'cunt'
					];



















