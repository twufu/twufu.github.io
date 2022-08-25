var cookies = 0;
var cursors = 0;
var lean = 0;
var dabloons = 0;

function save(){
    var savegame = {
        cookies: cookies,
        cursors: cursors,
        lean: lean,
		dabloons: dabloons
    }

    localStorage.setItem("save",JSON.stringify(savegame));
}

window.onload = function load(){
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies;
    if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
    if (typeof savegame.lean !== "undefined") lean = savegame.lean;
	if (typeof savegame.dabloons !== "undefined") dabloons = savegame.dabloons;
}

function calc(opt){
	if (opt == "dabloons") return Math.pow(cookies, 0.5)/1000;
}

function updateGui() {
	document.getElementById('cursors').innerHTML = cursors;
    document.getElementById('cookies').innerHTML = cookies;
    document.getElementById('lean').innerHTML = lean;
    document.getElementById('cursorCost').innerHTML = Math.floor(10 * Math.pow(1.1,cursors));
	document.getElementById('dabloons').innerHTML = dabloons;
	
	if (calc("dabloons") > 0.01) {
		document.getElementById('dabloonsOnDabloon').innerHTML = calc("dabloons")
        document.getElementById('dabloonBtn').textContent = "GET DABLOONS!!!!"
	} else {
        document.getElementById('dabloonsOnDabloon').innerHTML = 0
        document.getElementById('dabloonBtn').textContent = "Reach 1 dabvloonm to get Them"
    }

    if (lean > 1) {
        document.getElementById('leanCost').innerHTML = Math.floor(300 * Math.pow(3,lean)); 
    }
}

function gain(number){
    if (number == "undefined") {number = 1}
    cookies = cookies + number*Math.pow(2, lean);
    console.log(cookies);
    document.getElementById("cookies").innerHTML = cookies;
};


function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));  
    if(cookies >= cursorCost){                                
        cursors = cursors + 1;
    	cookies = cookies - cursorCost;
        document.getElementById('cursors').innerHTML = cursors; 
        document.getElementById('cookies').innerHTML = cookies;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));   
    document.getElementById('cursorCost').innerHTML = nextCost;  
};

function buyLean(){
    var leanCost = Math.floor(300 * Math.pow(3,lean));     
    if(cookies >= leanCost){                                  
        lean = lean + 1;                                
    	cookies = cookies - leanCost;                         
        document.getElementById('lean').innerHTML = lean;  
        document.getElementById('cookies').innerHTML = cookies; 
    };
    var nextCost = Math.floor(300 * Math.pow(3,lean));      
    document.getElementById('leanCost').innerHTML = nextCost;  
};

function dabloon(){
    if (calc("dabloons") > 1) {
        dabloons += calc("dabloons")
        cookies = 0;
        cursors = 0;
        lean = 0;
        updateGui()
    }
}

window.setInterval(function(){
    gain(cursors)
    updateGui()
}, 1000)

window.onbeforeunload = closingCode;
function closingCode(){
   save()
   return null;
}
