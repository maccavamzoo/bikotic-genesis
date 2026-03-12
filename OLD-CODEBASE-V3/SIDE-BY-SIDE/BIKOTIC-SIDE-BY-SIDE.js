
var side_by_side_win;
var side_by_side_cont;

function SIDE_BY_SIDE_ShowSideBySide()
{
	if(side_by_side_win)
	{
		side_by_side_win.style.display = "block"; 	
	}
	else
	{
		SIDE_BY_SIDE_MakeWindow();
		SIDE_BY_SIDE_MakeCloseButton();
	} 
	
	SIDE_BY_SIDE_Compare();
}


function SIDE_BY_SIDE_MakeWindow()
{
	side_by_side_win = document.createElement("DIV");
	side_by_side_win.style.position = "absolute";
	side_by_side_win.style.display = "block";
	side_by_side_win.style.zIndex = 98;
	side_by_side_win.style.width = "100%"; 
	side_by_side_win.style.backgroundColor = "white";
	side_by_side_win.style.fontFamily = "Oswald";
	side_by_side_win.style.color = "#333333";
	document.body.append(side_by_side_win);
	
	side_by_side_cont = document.createElement("DIV");
	side_by_side_cont.style.textAlign = "center";

	side_by_side_win.append(side_by_side_cont);
}

function SIDE_BY_SIDE_MakeCloseButton()
{ 
	cB = document.createElement("DIV");
	cB.style.zIndex = "1000";
	cB.style.position = "fixed";
	cB.style.top = ".5vw";
	cB.style.right = ".5vw";
	cB.style.padding = "10px";
	cB.style.paddingTop = "5px";
	cB.style.paddingBottom = "5px";
	cB.style.backgroundColor = "white";
	cB.style.color = "#333333";
	cB.style.borderRadius = "10px";
	cB.style.borderStyle = "solid";
	cB.style.borderWidth= "thin";
	cB.style.fontSize = "1vw";
	cB.innerHTML = "X CLOSE";
	cB.style.cursor = "pointer";
		
	cB.onclick = function()
	{
		side_by_side_win.style.display = "none";
		
		BIKOTIC_UpdatePageNameURL("BIKOTIC SUB WIN EXIT", true, "cb");
	}
	side_by_side_win.append(cB);
}




function SIDE_BY_SIDE_Compare()
{
	if(bike1 && bike2)
	{		
		side_by_side_cont.innerHTML = "";
		
		var frameMaterial = `<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Frame: ${bike1.frame_material} | Fork: ${bike1.fork_material}</div>`;		
		var brakeType = `<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Brake type: ${bike1.brake_type.toUpperCase()}</div>`
		var wheels = `<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Wheels: ${bike1.wheels_make.toUpperCase()} ${bike1.wheels_name.toUpperCase()} ${bike1.wheels_weight}g £${numberWithCommas(bike1.wheels_price)}</div>`;
		var tyres = `<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Tyres: ${bike1.tyres_make.toUpperCase()} ${bike1.tyres_name.toUpperCase()} ${bike1.tyres_weight}g £${numberWithCommas(bike1.tyres_price)}</div>`;
		
		if(bike1.bike_type_main == "MTB")
		{
			frameMaterial = `<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Frame: ${bike1.frame_material} | Dropper: ${bike1.dropper}</div>`;		
			brakeType = `<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Front: ${bike1.suspension_travel_front}mm ${bike1.suspension_front} | Rear: ${bike1.suspension_travel_rear}mm ${bike1.suspension_rear}`;				
		}
		if(bike1.mixed_wheels.toLowerCase() != "") wheels =`<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Wheels: ${bike1.mixed_wheels}`;
		if(bike1.mixed_tyres.toLowerCase() != "")  tyres  =`<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Tyres: ${bike1.mixed_tyres}`;
		
		//bike 1..	
		var bike1Price = numberWithCommas(bike1.price);
		if(bike1.price == -999999.00) bike1Price = "?";
		var bike1Weight = bike1.weight;
		if(bike1.weight == 99) bike1Weight = "?";
		
		//add html to div bike1..
		side_by_side_cont.innerHTML+= `<div style="display: inline-block; padding-right:10px; vertical-align:top; width:48%;">	
		<div style="text-align:right; display: inline-block;"><img style="width:100%;" src = "${pathToBikes}${bike1.image_name}${pathToBikesPost}"></div>
		<div style="text-align:right; font-size:.8vw; font-style:italic;">${bike1.model_year} | ${bike1.bike_type_main.toUpperCase()} | ${bike1.bike_type_sub.toUpperCase()}</div>
		<div style="text-align:right; color:#${bike1.color}; font-size:1vw;">${bike1.manufacturer.toUpperCase()} - ${bike1.model_des.toUpperCase()}</div>
		<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">£${bike1Price}</div>
		<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Weight: ${bike1Weight}kg</div>
		${frameMaterial}
		${brakeType}
		<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Groupset: ${bike1.groupset.toUpperCase()}</div>
		<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Gearing: ${bike1.chainring_large}/${bike1.chainring_small} ${bike1.cassette_small}-${bike1.cassette_large} | Power meter:${bike1.power_meter}</div>
		${wheels}
		${tyres}
		<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Photo size: ${bike1.photo_frame_size} | *Geo size: ${bike1.geo_size}</div>
		<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Top Tube: ${bike1.horizontal_top_tube}</div>
		<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Reach: ${bike1.reach}</div>
		<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Stack: ${bike1.stack}</div>
		<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Wheelbase: ${bike1.wheelbase}</div>
		<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Head angle: ${bike1.head_angle}</div>
		<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">Chainstay: ${bike1.chainstay}</div>
		<div style="text-align:right; color:#${bike1.color}; font-size:.8vw;">BB drop: ${bike1.bb_drop}</div>
		<div style="float:right; text-align:right; color:#${bike1.color}; font-size:.8vw; width:20vw;">notes: ${bike1.notes}</div>
		</div>`;
		
		
		
		
		var frameMaterial = `<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Frame: ${bike2.frame_material} | Fork: ${bike2.fork_material}</div>`;		
		var brakeType = `<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Brake type: ${bike2.brake_type.toUpperCase()}</div>`
		var wheels = `<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Wheels: ${bike2.wheels_make.toUpperCase()} ${bike2.wheels_name.toUpperCase()} ${bike2.wheels_weight}g £${numberWithCommas(bike2.wheels_price)}</div>`;
		var tyres = `<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Tyres: ${bike2.tyres_make.toUpperCase()} ${bike2.tyres_name.toUpperCase()} ${bike2.tyres_weight}g £${numberWithCommas(bike2.tyres_price)}</div>`;
		
		if(bike2.bike_type_main == "MTB")
		{
			frameMaterial = `<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Frame: ${bike2.frame_material} | Dropper: ${bike2.dropper}</div>`;		
			brakeType = `<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Front: ${bike2.suspension_travel_front}mm ${bike2.suspension_front} | Rear: ${bike2.suspension_travel_rear}mm ${bike2.suspension_rear}`;				
		}
		if(bike2.mixed_wheels.toLowerCase() != "") wheels =`<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Wheels: ${bike2.mixed_wheels}`;
		if(bike2.mixed_tyres.toLowerCase() != "")  tyres  =`<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Tyres: ${bike2.mixed_tyres}`;
		
		//bike 2..
		var bike2Price = numberWithCommas(bike2.price);
		if(bike2.price == -999999.00) bike2Price = "?";
		var bike2Weight = bike2.weight;
		if(bike2.weight == 99) bike2Weight = "?";
		
		//add html to div bike2..
		side_by_side_cont.innerHTML+= `<div style="display: inline-block; padding-left:10px; vertical-align:top;  width:48%;">	
		<div style="text-align:left; display: inline-block;"><img style="width:100%;" src = "${pathToBikes}${bike2.image_name}${pathToBikesPost}"></div>
		<div style="text-align:left; font-size:.8vw; font-style:italic;">${bike2.model_year} | ${bike2.bike_type_main.toUpperCase()} | ${bike2.bike_type_sub.toUpperCase()}</div>
		<div style="text-align:left; color:#${bike2.color}; font-size:1vw;">${bike2.manufacturer.toUpperCase()} - ${bike2.model_des.toUpperCase()}</div>
		<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">£${bike2Price}</div>
		<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Weight: ${bike2Weight}kg</div>
		${frameMaterial}
		${brakeType}
		<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Groupset: ${bike2.groupset.toUpperCase()}</div>
		<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Gearing: ${bike2.chainring_large}/${bike2.chainring_small} ${bike2.cassette_small}-${bike2.cassette_large} | Power meter:${bike2.power_meter}</div>
		${wheels}
		${tyres}
		<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Photo size: ${bike2.photo_frame_size} | *Geo size: ${bike2.geo_size}</div>
		<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Top Tube: ${bike2.horizontal_top_tube}</div>
		<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Reach: ${bike2.reach}</div>
		<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Stack: ${bike2.stack}</div>
		<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Wheelbase: ${bike2.wheelbase}</div>
		<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Head angle: ${bike2.head_angle}</div>
		<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">Chainstay: ${bike2.chainstay}</div>
		<div style="text-align:left; color:#${bike2.color}; font-size:.8vw;">BB drop: ${bike2.bb_drop}</div>
		<div style="width:20vw; text-align:left; color:#${bike2.color}; font-size:.8vw;">notes: ${bike2.notes}</div>
		</div>`;
		
		//geo note..
		side_by_side_cont.innerHTML+= '<p style="text-align:center; font-size:.8vw; padding-bottom:25px;">*GEO SIZE AS PER MANUFACTURER RECOMMENDATION, TO FIT ME 177.8cm<br>(DH geo is out of the scope of this website)</p>';
		
	}
}

