
var CHT_image1 = new Image();
var CHT_image2 = new Image();
var CHT_ctx;
var CHT_canvasWidth;
var CHT_canvasHeight;
var CHT_imageWidth;
var CHT_imageHeight;
var CHT_offsetX;
var CHT_offsetY;
var CHT_scale;
var CHT_lastTouchDistance;
var CHT_lastX;
var CHT_lastY;
var CHT_isPanning;
var CHT_AlphaValue;

function MOBILE_Init()
{
	makeLoadingImage();
	
	CHT_AlphaValue = 0;
    
    const CHT_canvas = document.createElement("CANVAS");	
    CHT_canvas.style.position = "absolute";
	CHT_canvas.style.zIndex = 1;	
	CHT_ctx = CHT_canvas.getContext("2d");	
	CHT_ctx.imageSmoothingEnabled = false;
	mainDiv.appendChild(CHT_canvas);
    
    //get bikes..
    if(BIKOTIC_PreLoadBike1 != "empty")
	{
		var bits = BIKOTIC_PreLoadBike1.split(",");
		MOBILE_getBikeInfo(bits[3], "bike1");
	}
	else MOBILE_getBikeInfo(973, "bike1");
	
	if(BIKOTIC_PreLoadBike2 != "empty")
	{
		var bits = BIKOTIC_PreLoadBike2.split(",");
		MOBILE_getBikeInfo(bits[3], "bike2");
	}
	else MOBILE_getBikeInfo(16, "bike2");
    
    CHT_canvasWidth = window.innerWidth;
    CHT_canvasHeight = window.innerHeight;
    
    CHT_imageWidth = 16 * 50;
    CHT_imageHeight = 9 * 50;
    
    CHT_offsetX = (CHT_canvasWidth - CHT_imageWidth) / 2;
    CHT_offsetY = (CHT_canvasHeight - CHT_imageHeight) / 2;
    
    CHT_scale = 1;
    CHT_lastTouchDistance = 0;
    
    CHT_lastX = 0;
    CHT_lastY = 0;
    CHT_isPanning = false;

    CHT_canvas.width = CHT_canvasWidth;
    CHT_canvas.height = CHT_canvasHeight;
    
    //add the hamburger..
    CHT_addBurger();
    CHT_addStats();
    
    //add the mag..
    CHT_addMag();
    
    //add the slider..
    CHT_addCustomSlider();
    
    
    
    //do we have any starred bikes?
    CHT_addStarred();
    if(BIKOTIC_MyList != "286")
    {
		CHT_ShowStarred();
	}
    
    
    CHT_image1.onload = () => {
        CHT_Draw();
    };

    CHT_canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            let touch = e.touches[0];
            CHT_lastX = touch.clientX;
            CHT_lastY = touch.clientY;
            CHT_isPanning = true;
        }
    });

    CHT_canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();

        if (e.touches.length === 1 && CHT_isPanning) { // Panning
            let touch = e.touches[0];
            CHT_offsetX += touch.clientX - CHT_lastX;
            CHT_offsetY += touch.clientY - CHT_lastY;
            CHT_lastX = touch.clientX;
            CHT_lastY = touch.clientY;
            CHT_Draw();
        } else if (e.touches.length === 2) { // Pinching
            let x1 = e.touches[0].clientX;
            let y1 = e.touches[0].clientY;
            let x2 = e.touches[1].clientX;
            let y2 = e.touches[1].clientY;

            let CHT_currentTouchDistance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            
            if (CHT_lastTouchDistance) {
                let CHT_newScale = CHT_scale * (CHT_currentTouchDistance / CHT_lastTouchDistance);

                let touchMidPointX = (x1 + x2) / 2;
                let touchMidPointY = (y1 + y2) / 2;

                CHT_offsetX -= (touchMidPointX - CHT_offsetX) * (CHT_newScale - CHT_scale) / CHT_scale;
                CHT_offsetY -= (touchMidPointY - CHT_offsetY) * (CHT_newScale - CHT_scale) / CHT_scale;

                CHT_scale = CHT_newScale;
                CHT_Draw();
            }

            CHT_lastTouchDistance = CHT_currentTouchDistance;
        }
    });

    CHT_canvas.addEventListener('touchend', (e) => {
        if (e.touches.length <= 1) {
            CHT_lastTouchDistance = 0;
        }
        CHT_isPanning = false;
    });
    
    function CHT_addBurger()
    {
		const image = document.createElement('img');
		image.style.display = "block";
		image.src = CODEBASE + "IMGz/BIKOTIC_HAMBURGER.png"
		image.style.width = 'auto';
		image.style.height = 'auto';
		image.style.position = 'fixed';
		image.style.zIndex = 10;
		image.style.top = '10px';
		image.style.left = '10px';
		image.onclick = function(){createPopup();}
		mainDiv.append(image);
	}
	
	function CHT_addMag()
    {
		const image = document.createElement('img');
		image.style.display = "block";
		image.src = CODEBASE + "IMGz/BIKOTIC_MAG.png"
		image.style.width = 'auto';
		image.style.height = 'auto';
		image.style.position = 'fixed';
		image.style.zIndex = 10;
		image.style.top = '19px';
		image.style.left = '90px';
		image.onclick = function()
		{
			FILTER_ShowFilters(false); 
			BIKOTIC_UpdatePageNameURL("BIKE FINDER", true, "bf");
		}
		mainDiv.append(image);
	}
	
	function CHT_addStarred()
    {
		StarredUI_Image = document.createElement('img');
		StarredUI_Image.style.display = "none";
		StarredUI_Image.src = CODEBASE + "IMGz/main_starred.png"
		StarredUI_Image.style.position = 'fixed';
		StarredUI_Image.style.zIndex = 10;
		StarredUI_Image.style.top = '10px';
		StarredUI_Image.style.left = '55px';
		StarredUI_Image.onclick = function()
		{
			FILTER_ShowFilters(true); 
			BIKOTIC_UpdatePageNameURL("SHOW STARRED", true, "strd");
		}
		mainDiv.append(StarredUI_Image);
	}
	
	function CHT_addStats()
    {
		const image = document.createElement('img');
		image.style.display = "block";
		image.src = CODEBASE + "IMGz/BIKOTIC_STATS.png";
		image.style.width = 'auto';
		image.style.height = 'auto';
		image.style.position = 'fixed';
		image.style.zIndex = 10;
		image.style.top = '65px';
		image.style.left = '10px';
		image.onclick = function(){createStatsPopup();}
		mainDiv.append(image);
	}
	
	function CHT_addBottomDivWithImage(imageSrc) 
	{
		  const div = document.createElement('div');
		  div.style.position = 'fixed';
		  div.style.zIndex = 10;
		  div.style.bottom = '0';
		  div.style.left = '0';
		  div.style.width = '100%';
		
		  const image = document.createElement('img');
		  image.style.display = "block";
		  image.src = imageSrc;
		  image.style.width = '100%';
		  image.style.height = 'auto';
		
		  // Add touch event listeners
		  image.addEventListener('touchmove', (event) => {
		  const touchX = event.touches[0].clientX;
		  const rect = image.getBoundingClientRect();
		  const touchPosition = touchX - rect.left - (0.4 * rect.width); // Subtract 40% from the left
		  const touchRange = 0.2 * rect.width; // 20% width for the touchable range (60% - 40%)
		  
		  CHT_AlphaValue = Math.max(0, Math.min(1, touchPosition / touchRange));
		  CHT_Draw();
		});
	
		  div.appendChild(image);
		  document.body.appendChild(div);
	}
	
}//end mobile..


var StarredUI_Image;
function CHT_ShowStarred()
{
	StarredUI_Image.style.display = "block";
}

function CHT_HideStarred()
{
	StarredUI_Image.style.display = "none";
}

function CHT_addCustomSlider() 
{
    // Create a slider container div
    const sliderContainer = document.createElement('div');
    sliderContainer.style.position = 'fixed';
    sliderContainer.style.zIndex = 10;
    sliderContainer.style.bottom = '0';
    sliderContainer.style.left = '0';  // Starts at the beginning
    sliderContainer.style.width = '100%'; // Spans the full width
    sliderContainer.style.backgroundColor = '#ccc';  // Gray background
    sliderContainer.style.padding = '10px';  // Padding for visual separation
    sliderContainer.style.paddingBottom = '20px';

    // Create a div to wrap the actual slider
    const sliderWrapper = document.createElement('div');
    sliderWrapper.style.width = '33.33%'; // Takes up one-third of the screen width
    sliderWrapper.style.margin = 'auto'; // Center the slider

    // Create the actual slider
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.01';
    slider.value = '0';
    slider.style.width = '100%';

    // Event Listener for Slider
    slider.addEventListener('input', (event) => {
        CHT_AlphaValue = parseFloat(event.target.value);
        CHT_Draw();
    });

    // Append the slider to the slider wrapper
    sliderWrapper.appendChild(slider);

    // Append the slider wrapper to the container
    sliderContainer.appendChild(sliderWrapper);

    // Append the container to the body
    document.body.appendChild(sliderContainer);
}








	//******************************************************************
    function CHT_Draw() 
    {
		//clear the canvas..
        CHT_ctx.clearRect(0, 0, CHT_canvasWidth, CHT_canvasHeight);
        
        //set alpha..
        CHT_ctx.globalAlpha = 1;
        
        //draw image 1..
        CHT_ctx.drawImage(CHT_image1, CHT_offsetX, CHT_offsetY, CHT_imageWidth * CHT_scale, CHT_imageHeight * CHT_scale);
        
        //set alpha..
        CHT_ctx.globalAlpha = CHT_AlphaValue;
        
        //draw image 2..
        CHT_ctx.drawImage(CHT_image2, CHT_offsetX, CHT_offsetY, CHT_imageWidth * CHT_scale, CHT_imageHeight * CHT_scale);
        
    }
    //******************************************************************

	function MOBILE_getBikeInfo(id, bikeNo)
	{
		//generate the query string..
		var hitAppVersion = "&app_version=mobile";
		if(BIKOTIC_ItsMe) hitAppVersion = "";
		var query = "id=" + id + hitAppVersion + "&session_id=" + BIKOTIC_SessionID;
		
		var url = CODEBASE + "PRL-SWORK/BIKOTIC_getBike_V2.pl";
		
		//image loading..
		backgroundDiv.style.display = "block";
		MOBILE_ImagesLoading++; 

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200) 
			{  
				//ready the bike obj..
				if(bikeNo == "bike1")	
				{
					bike1 = JSON.parse(this.responseText); 
					CHT_image1.src = pathToBikes + bike1.image_name + pathToBikesPost;
					CHT_image1.onload = MOBILE_OnloadImages;
				}	
				else
				{
					bike2 = JSON.parse(this.responseText); 
					CHT_image2.src = pathToBikes + bike2.image_name + pathToBikesPost;
					CHT_image2.onload = MOBILE_OnloadImages;
				}
				
				//update page name..
				BIKOTIC_UpdatePageNameURL(BIKOTIC_GetComparisonViewPageTitle(), true, "gbi");	 					
			}
		};
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(query);
	}
	
	function MOBILE_OnloadImages()
	{
		MOBILE_ImagesLoading--;
		
		if(MOBILE_ImagesLoading < 1) 
		{
			backgroundDiv.style.display = "none";
			CHT_Draw();
		}
	}
	
	
	
function createStatsPopup() {
  // Create the div that will serve as the pop-up
  const popupDiv = document.createElement('div');
  
  // Apply styles to make the div full-screen and center content
  popupDiv.style.position = 'relative';
  popupDiv.style.zIndex = 1100;
  popupDiv.style.top = '0';
  popupDiv.style.left = '0';
  popupDiv.style.width = '100%';
  popupDiv.style.height = '100%';
  popupDiv.style.backgroundColor = 'white';
  popupDiv.style.textAlign = "center";
  
	//row one - pics..
	var r1 = document.createElement('div');
	r1.style.width = "50%";
	r1.style.backgroundColor = 'white';
	r1.style.textAlign = "center";
	r1.style.display = "inline-block";
	var i1 = document.createElement('img');
	i1.src = pathToBikes + bike1.image_name + pathToBikesPost;
	i1.style.maxWidth = "100%";
	i1.style.verticalAlign = "bottom";
	r1.append(i1);
	popupDiv.append(r1);
	
	var r1 = document.createElement('div');
	r1.style.width = "50%";
	r1.style.backgroundColor = 'white';
	r1.style.textAlign = "center";
	r1.style.display = "inline-block";
	var i1 = document.createElement('img');
	i1.src = pathToBikes + bike2.image_name + pathToBikesPost;
	i1.style.maxWidth = "100%";
	i1.style.verticalAlign = "bottom";
	r1.append(i1);
	popupDiv.append(r1);
	
	//manufacturer..
	MOBILE_MakeRow(bike1.model_year + " " + bike1.manufacturer, bike2.model_year + " " + bike2.manufacturer, popupDiv, mBlack, lightCol);
	
	//model des..
	MOBILE_MakeRow(bike1.model_des, bike2.model_des, popupDiv, mPink, lightCol);
	
	//spacer..
	MOBILE_MakeSpacer("15px", lightCol, popupDiv);
	
	//groupset..
	MOBILE_MakeRow(bike1.groupset, bike2.groupset, popupDiv, mBlack, darkCol);
	
	//price..
	MOBILE_MakeRow(MOBILE_CheckPrice(bike1, bike2), MOBILE_CheckPrice(bike2, bike1), popupDiv, mBlack, lightCol);
	
	//weight..
	MOBILE_MakeRow(MOBILE_CheckWeight(bike1, bike2), MOBILE_CheckWeight(bike2, bike1), popupDiv, mBlack, darkCol);
	
	//frame_material..
	MOBILE_MakeRow(bike1.frame_material, bike2.frame_material, popupDiv, mBlack, lightCol);
	
	//groupset_speed..
	MOBILE_MakeRow(bike1.groupset_speed, bike2.groupset_speed, popupDiv, mBlack, darkCol, "", "SPD");
	
	//gear stats..
	MOBILE_MakeRow(MOBILE_MakeGearStats(bike1), MOBILE_MakeGearStats(bike2), popupDiv, mBlack, lightCol);
	
	//gear ratios..
	MOBILE_MakeRow(MOBILE_MakeGearRatios(bike1), MOBILE_MakeGearRatios(bike2), popupDiv, mBlack, lightCol);
	
	//power_meter..
	MOBILE_MakeRow(bike1.power_meter, bike2.power_meter, popupDiv, mBlack, darkCol, "Power meter: ");
	
	//wheels..
	MOBILE_MakeRow(MOBILE_Wheels(bike1), MOBILE_Wheels(bike2), popupDiv, mBlack, lightCol);
	
	//tyres..
	MOBILE_MakeRow(MOBILE_Tyres(bike1), MOBILE_Tyres(bike2), popupDiv, mBlack, darkCol);
	
	//clearance..
	MOBILE_MakeRow(MOBILE_Clearance(bike1), MOBILE_Clearance(bike2), popupDiv, mBlack, darkCol);
	
	//spacer..
	MOBILE_MakeSpacer("25px", lightCol, popupDiv);
	
	//geo..
	MOBILE_MakeRow(MOBILE_TopTube(bike1), MOBILE_TopTube(bike2), popupDiv, mBlack, lightCol);
	MOBILE_MakeRow(MOBILE_Reach(bike1), MOBILE_Reach(bike2), popupDiv, mBlack, lightCol);
	MOBILE_MakeRow(MOBILE_Stack(bike1), MOBILE_Stack(bike2), popupDiv, mBlack, lightCol);
	MOBILE_MakeRow(MOBILE_Wheelbase(bike1), MOBILE_Wheelbase(bike2), popupDiv, mBlack, lightCol);
	MOBILE_MakeRow(MOBILE_Headangle(bike1), MOBILE_Headangle(bike2), popupDiv, mBlack, lightCol);
	MOBILE_MakeRow(MOBILE_Chainstay(bike1), MOBILE_Chainstay(bike2), popupDiv, mBlack, lightCol);
	MOBILE_MakeRow(MOBILE_BBD(bike1), MOBILE_BBD(bike2), popupDiv, mBlack, lightCol);
	
	//spacer..
	MOBILE_MakeSpacer("25px", lightCol, popupDiv);
	
	//e-bike?..
	MOBILE_MakeRow(MOBILE_ebike(bike1), MOBILE_ebike(bike2), popupDiv, mBlack, lightCol);
	
	//spacer..
	MOBILE_MakeSpacer("15px", lightCol, popupDiv);
	
	//comments..
	MOBILE_Comments(popupDiv);
	
	//spacer..
	MOBILE_MakeSpacer("50px", lightCol, popupDiv);
	
 
  // Append the popup div to the body
  document.body.appendChild(popupDiv);
  
  // Add click event to close the popup when clicked
  popupDiv.addEventListener('click', () => {
    document.body.removeChild(popupDiv);
  });
  
  
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
  popupDiv.appendChild(CHT_closePopupBtn);
  
  
}


function MOBILE_MakeRow(info1, info2, parent, colour, bkgCol, pre = "", post = "")
{
	var r1 = document.createElement('div');
	r1.style.width = "50%";
	r1.style.backgroundColor = bkgCol;
	r1.style.textAlign = "center";
	r1.style.display = "inline-block";
	r1.style.fontFamily = "JetBrains Mono, monospace";
	r1.style.fontSize = "14px";
	r1.style.color = colour;
	r1.style.paddingBottom = "2px";
	r1.style.paddingTop = "2px";
	r1.innerHTML = pre + info1 + post;
	parent.append(r1);
	
	var r1 = document.createElement('div');
	r1.style.width = "50%";
	r1.style.backgroundColor = bkgCol;
	r1.style.textAlign = "center";
	r1.style.display = "inline-block";
	r1.style.fontFamily = "JetBrains Mono, monospace";
	r1.style.fontSize = "14px";
	r1.style.color = colour;
	r1.style.paddingBottom = "2px";
	r1.style.paddingTop = "2px";
	r1.innerHTML = pre + info2 + post;
	parent.append(r1);
}

function MOBILE_MakeSpacer(height, bkgCol, parent)
{
	var r1 = document.createElement('div');
	r1.style.width = "100%";
	r1.style.height = height;
	r1.style.backgroundColor = bkgCol;
	parent.append(r1);
}

var lightCol = "#FFFFFF";
var darkCol = "#f4f4f4";
var mBlack = "#333333";
var mPink = "#8c0095";
var mRed = "#b0236f";
var mGreen = "#23b094";
function MOBILE_CheckPrice(mBike1, mBike2)
{ 
	if(mBike1.price == "-999999.00") return "£?";
	if(mBike2.price == "-999999.00") return "£" + mBike1.price;
	
	if(mBike1.price == mBike2.price) return "£" + mBike1.price;
	
	if(parseFloat(mBike1.price) > parseFloat(mBike2.price)) return `<span style="color:${mRed}">£` + mBike1.price + ` <span style="font-size:11px">+£${parseFloat(mBike1.price) - parseFloat(mBike2.price)}</span></span>`;
	if(parseFloat(mBike2.price) > parseFloat(mBike1.price)) return `<span style="color:${mGreen}">£` + mBike1.price + ` <span style="font-size:11px">-£${parseFloat(mBike2.price) - parseFloat(mBike1.price)}</span></span>`;
}

function MOBILE_CheckWeight(mBike1, mBike2)
{ 
	if(mBike1.weight == "99.00") return "?kg";
	if(mBike2.weight == "99.00") return mBike1.weight + "kg";
	
	if(mBike1.weight == mBike2.weight) return mBike1.weight + "kg";
	
	if(mBike1.weight > mBike2.weight) return `<span style="color:${mRed}">` + mBike1.weight + `kg <span style="font-size:11px">+${(mBike1.weight - mBike2.weight).toFixed(2)}</span></span>`;
	if(mBike2.weight > mBike1.weight) return `<span style="color:${mGreen}">` + mBike1.weight + `kg <span style="font-size:11px">-${(mBike2.weight - mBike1.weight).toFixed(2)}</span></span>`;
}	

function MOBILE_MakeGearStats(bike)
{
	var by = "T/" + bike.chainring_small + "T";
	if(bike.chainring_small < 1) by = "T 1by";
	
	var op = bike.chainring_large + by + " " + bike.cassette_small + "-" + bike.cassette_large;
	
	return op;
}

function MOBILE_MakeGearRatios(bike)
{
	var by = bike.chainring_small;
	if(bike.chainring_small < 1) by = bike.chainring_large;
	return `<span style="font-size:11px">Hard:` + (bike.chainring_large / bike.cassette_small).toFixed(2) + ":1 - Easy:" + (by / bike.cassette_large).toFixed(2) + ":1</span>";
}

function MOBILE_Wheels(bike)
{
	var wheels = bike.mixed_wheels; 
	if(wheels == "")
	{
		wheels = bike.wheels_make + " " + bike.wheels_name + " " + bike.wheels_weight + "g £" + bike.wheels_price;
	}
	return "Wheels: " + wheels;	
}
	
function MOBILE_Tyres(bike)
{
	var tyres = bike.mixed_tyres; 
	if(tyres == "")
	{
		tyres = bike.tyres_make + " " + bike.tyres_name + " " + bike.tyres_weight + "g £" + bike.tyres_price;
	}
	return "Tyres: " + tyres;	
}	

function MOBILE_Clearance(bike)
{
	var cl = bike.clearance;
	if(cl == 0) cl = "?";
	
	return `Clearance: ${cl}mm`;
}

function MOBILE_TopTube(bike)
{
	return "VTT:" + bike.horizontal_top_tube + "mm";
}
	
function MOBILE_Reach(bike)
{
	return "RCH:" + bike.reach + "mm";
}	
	
function MOBILE_Stack(bike)
{
	return "STK:" + bike.stack + "mm";
}	
	
function MOBILE_Wheelbase(bike)
{
	return "WHB:" + bike.wheelbase + "mm";
}		
	
function MOBILE_Headangle(bike)
{
	return "HDA:" + bike.head_angle + "°";
}		
		
function MOBILE_Chainstay(bike)
{
	return "CHS:" + bike.chainstay + "mm";
}		
		
function MOBILE_BBD(bike)
{
	return "BBD:" + bike.bb_drop + "mm";
}	

function MOBILE_ebike(bike)
{
	if(bike.motor_nm > 1 || bike.battery_wh > 1)
	{
		return `<img src="${CODEBASE}IMGz/electric_bike_icon.png"><br>Motor: ${bike.motor_nm}nm<br>Battery: ${bike.battery_wh}Wh`;
	}
	else
	{
		return "";
	}
}

function MOBILE_Comments(parent)
{
	//bike 1 comments..
	var r1 = document.createElement('div');
	r1.style.width = "50%";
	r1.style.backgroundColor = lightCol;
	r1.style.textAlign = "center";
	r1.style.display = "inline-block";
	r1.style.fontFamily = "JetBrains Mono, monospace";
	r1.style.fontSize = "14px";
	r1.style.color = mPink;
	r1.style.paddingBottom = "2px";
	r1.style.paddingTop = "2px";
	
	var tmp = document.createElement('div');
		tmp.style.display = "flex";
		tmp.style.alignItems = "center";
		tmp.style.justifyContent = "center";
		tmp.innerHTML = `<img style="padding-right:5px;" src="${CODEBASE}IMGz/HOME_POP_CONTACT.png">Comments ${bike1.comment_count}`;
		tmp.onclick = function(event){CHT_AlphaValue = 0; COMMENTS_ShowComments();}
	r1.append(tmp);
	
	parent.append(r1);
	
	//bike 2 comments..
	var r1 = document.createElement('div');
	r1.style.width = "50%";
	r1.style.backgroundColor = lightCol;
	r1.style.textAlign = "center";
	r1.style.display = "inline-block";
	r1.style.fontFamily = "JetBrains Mono, monospace";
	r1.style.fontSize = "14px";
	r1.style.color = mPink;
	r1.style.paddingBottom = "2px";
	r1.style.paddingTop = "2px";
	
	var tmp = document.createElement('div');
		tmp.style.display = "flex";
		tmp.style.alignItems = "center";
		tmp.style.justifyContent = "center";
		tmp.innerHTML = `<img style="padding-right:5px;" src="${CODEBASE}IMGz/HOME_POP_CONTACT.png">Comments ${bike2.comment_count}`;
		tmp.onclick = function(){CHT_AlphaValue = 1; COMMENTS_ShowComments();}
	r1.append(tmp);
	
	parent.append(r1);
}

var MOBILE_ImagesLoading = 0;
var backgroundDiv;
function makeLoadingImage() {
  
  const imagePath = CODEBASE + "IMGz/BIKOTIC_Loading.gif";

  // Create background div
  backgroundDiv = document.createElement("div");
  backgroundDiv.style.position = 'fixed';
  backgroundDiv.style.zIndex = '1999';
  backgroundDiv.style.left = '0';
  backgroundDiv.style.top = '0';
  backgroundDiv.style.width = '100%';
  backgroundDiv.style.height = '100%';
  backgroundDiv.style.backgroundColor = 'white';
  backgroundDiv.style.display = "none";
  if(document.body) document.body.appendChild(backgroundDiv);

  // Create new image element
  const imgElement = document.createElement("img");

  // Load image first to get dimensions
  imgElement.onload = () => {
    // Set the attributes
    imgElement.style.position = 'fixed';
    imgElement.style.zIndex = '2000';
    imgElement.style.left = '50%';
    imgElement.style.top = '50%';
    imgElement.style.transform = 'translate(-50%, -50%)';

    // Append to the background div
    backgroundDiv.appendChild(imgElement);
  };

  // Set the image source
  imgElement.src = imagePath;
}






	
	
	
	
