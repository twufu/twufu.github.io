var stone = 0;
var picks = 0;
var lean = 0;

function mine(number){
    stone = stone + number*(Math.pow(2,lean+1)/2);
    document.getElementById("stone").innerHTML = stone;
};

function save(){
    var savegame = {
        stone: stone,
        picks: picks,
        lean: lean
    }

    localStorage.setItem("save",JSON.stringify(savegame));
}

window.onload = function load(){
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (typeof savegame.stone !== "undefined") stone = savegame.stone;
    if (typeof savegame.picks !== "undefined") picks = savegame.picks;
    if (typeof savegame.lean !== "undefined") lean = savegame.lean;
}

function buyPick(){
    var pickCost = Math.floor(10 * Math.pow(1.1,picks));     //works out the cost of this cursor
    if(stone >= pickCost){                                   //checks that the player can afford the cursor
        picks = picks + 1;                                   //increases number of cursors
    	stone = stone - pickCost;                          //removes the cookies spent
        document.getElementById('picks').innerHTML = picks;  //updates the number of cursors for the user
        document.getElementById('stone').innerHTML = stone;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,picks));       //works out the cost of the next cursor
    document.getElementById('pickCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

function buyLean(){
    var leanCost = Math.floor(300 * Math.pow(3,lean));     //works out the cost of this cursor
    if(stone >= leanCost){                                   //checks that the player can afford the cursor
        lean = lean + 1;                                   //increases number of cursors
    	stone = stone - leanCost;                          //removes the cookies spent
        document.getElementById('lean').innerHTML = lean;  //updates the number of cursors for the user
        document.getElementById('stone').innerHTML = stone;  //updates the number of cookies for the user
    };
    var nextCost = Math.floor(300 * Math.pow(3,lean));        //works out the cost of the next cursor
    document.getElementById('leanCost').innerHTML = nextCost;  //updates the cursor cost for the user
};

window.setInterval(function(){
	
	mine(picks);
    save()
    document.getElementById('picks').innerHTML = picks;
    document.getElementById('stone').innerHTML = stone;
    document.getElementById('lean').innerHTML = lean;
    document.getElementById('pickCost').innerHTML = Math.floor(10 * Math.pow(1.1,picks));
    if (lean > 1) {
        document.getElementById('leanCost').innerHTML = Math.floor(300 * Math.pow(3,lean)); 
    }

}, 1000);
