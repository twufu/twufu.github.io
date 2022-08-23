var stone = new Decimal(0);
var picks = new Decimal(0);
var lean = new Decimal(0);

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

function max(x,y,z){ // x is current cost, y is what the cost is multiplied by, z is how much currency you have
    x = x * y
    if(z >= x){
        return [x, 1]
    }

}

function buyPick(){
    var pickCost = new Decimal(Math.floor(10 * Math.pow(1.1,picks)));  
    if(stone >= pickCost){                                
        picks = picks.plus(1);                                 
    	stone = stone.minus(pickCost)                     
        document.getElementById('picks').innerHTML = picks; 
        document.getElementById('stone').innerHTML = stone;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,picks));      
    document.getElementById('pickCost').innerHTML = nextCost;  
};

function buyLean(){
    var leanCost = Math.floor(300 * Math.pow(3,lean));     
    if(stone >= leanCost){                                  
        lean = lean + 1;                                
    	stone = stone - leanCost;                         
        document.getElementById('lean').innerHTML = lean;  
        document.getElementById('stone').innerHTML = stone; 
    };
    var nextCost = Math.floor(300 * Math.pow(3,lean));      
    document.getElementById('leanCost').innerHTML = nextCost;  
};

window.setInterval(function(){

	mine(picks/2)
    save()

    document.getElementById('picks').innerHTML = picks;
    document.getElementById('stone').innerHTML = stone;
    document.getElementById('lean').innerHTML = lean;
    document.getElementById('pickCost').innerHTML = Math.floor(10 * Math.pow(1.1,picks));
    if (lean > 1) {
        document.getElementById('leanCost').innerHTML = Math.floor(300 * Math.pow(3,lean)); 
    }

}, 1000);
