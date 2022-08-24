var cookies = 0;
var cursors = 0;
var lean = 0;

function click(number){
    cookies = cookies + number*Math.pow(2, lean);
    console.log(cookies)
    document.getElementById("cookies").innerHTML = cookies;
};

function save(){
    var savegame = {
        cookies: cookies,
        cursors: cursors,
        lean: lean
    }

    localStorage.setItem("save",JSON.stringify(savegame));
}

window.onload = function load(){
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.cookies !== "undefined") cookies = savegame.cookies;
    if (typeof savegame.cursors !== "undefined") cursors = savegame.cursors;
    if (typeof savegame.lean !== "undefined") lean = savegame.lean;
}

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

window.setInterval(function(){

    click(cursors+1)
    save()

    document.getElementById('cursors').innerHTML = cursors;
    document.getElementById('cookies').innerHTML = cookies;
    document.getElementById('lean').innerHTML = lean;
    document.getElementById('cursorCost').innerHTML = Math.floor(10 * Math.pow(1.1,cursors));
    if (lean > 1) {
        document.getElementById('leanCost').innerHTML = Math.floor(300 * Math.pow(3,lean)); 
    }

}, 1000);

