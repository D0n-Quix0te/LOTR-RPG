// Week-4 RPG-Game using jQuery

/*Pseudocode-----------------
1> Create an object, call it Character; include name, hp, damage, isHero(boolean), isEnemy(boolean), inBattle (boolean), isAlive (boolean)
	-Make it so fuctions are part of the object, the core function will be the Attack(damage). This will be called when the character is  itself being "getting attacked". Damage parameter is insterted when the character(hero) attacks.
		-When the Attack(damage) is activated
				-It will lower hero's hp by an amount that is called in by dmg
				-If the hp <=0, then isAlive will be set to false;

2> Create an array to hold charactersa and enemy objects
3> Create an intialize function that will be called from the body.onload event using jquery
	-This will poupulate the chracter array with the 4 character objects

4> Create 3 new display functions for each of the div sections
	-ShowCharacters():
		-At the start every hero will be set to 'true', so that they all show up in the display (along with the name,hp)
	-ShowEnemies():
		This will be empty at the start. It will populate with the remaning heros after a champion is selected (also with name,hp)
	-ShowBattleArena():
		-This will also be blank at the start, but will display the enemy hero after the user picks which character to battle.

5> Create an "attack button" using onClick function
	-Create it so that this function will loop thru the character
	-isHero==true and isAlive==true, set a var to the object.
	   	-var currentHero = charArray[i]
	-isEnemy==true and inBattle==true and isAlive==true, set var to this object ( var currentEnemy = charArray[i] )
	This should make is so the current hero and enemy in battle
		-Call thier attack functions 
				-currentHero.attack(currentEnemy.damage);
				-currentEnemy.attack(currentHero.damage);
				-At the end of this loop, check to see if either are still isAlive==true

6> Create a function to update the damage and txt in the current battle
*/

// a global array to hold the Character Objects
var CharArray = new Array();
// This holds the name of the currently selected Hero
var currentHero = null;
// This holds the name of the currently selected Enemy
var currentEnemy = null;

// This will hold the index of the selected Hero and make it an integer. CharArray[currentHeroIndex] gives us the current Hero.
var currentHeroIndex = null;
// Holds index of the selected Enemy Hero.
var currentEnemyIndex = null;

// This will set itself to 'true' whe the Hero dies or the Enemies are all defeated.
var gameOver = false;


// character function (holds name,hp,damage,isHero,isAlive,isBattle, and the Hero pictures)
function Character(name, hp, damage, isHero, isAlive, isBattle, pic) {

    this.name = name;
    this.hp = hp;
    this.damage = damage;
    this.isHero = isHero;
    this.isAlive = isAlive;
    this.isBattle = isBattle;
    this.pic = pic;
    this.Attack = function(hitDamage) {

        this.hp = this.hp - hitDamage;

        // This will check and see if the player is dead.
        if (this.hitpoints <= 0) {

            this.isAlive = false;
            return;
        }
    }
}

function Attack() {

    var str;

    if (gameOver == true)
        return;

    //This is the start. The player needs to select a Hero. 
    if ($(".hero-div img").length > 1) {

        $(".defender-div").html("<p class= 'action-text-p'></p>");
        $(".action-text-p").html("Choose your Champion to begin the battle.");
        return;
    }

    // Player needs to choose an oppoent to battle
    if (!currentEnemy && $(".enemy-div img").length > 0) {

        $(".defender-div").html("<p class='action-text-p></p>");
        $(".action-text-p").html("Choose your challanger");
        return;
    }

    // This is the core code. When the Hero is attacked, the Enemy gets attacked
    CharArray[currentHeroIndex].Attack(CharArray[currentEnemyIndex].damage);
    CharArray[currentEnemyIndex].Attack(CharArray[currentHeroIndex].damage);

    // This will update the Hero/Enemy hp's on the screen.
    $(".hero-damage").text(CharArray[currentHeroIndex].hp);
    $(".defender-damage").text(CharArray[currentEnemyIndex].hp);

    // Maybe insert some soundeffects?
    // var audio = new Audio("assests/sounds/#.mp3")''
    // audio.play();

    // This will write a message in an area showing the results for each attack. I used if/else so I could check for defeats/game over.
    if (CharArray[currentHeroIndex].isAlive == true && CharArray[currentEnemyIndex].isAlive == true) {

        str = "You attacked " + currentEnemy + " for " + CharArray[currentEnemyIndex].damage + " damage!<br/><br/>";
        str += currentEnemy + " countered with an attack for " + CharArray[currentEnemyIndex].damage + " damage!";

        // This will increase the players Hero damage after each attack.
        CharArray[currentHeroIndex].damage += CharArray[currentHeroIndex].damage;
    }
    // If the Hero or Enemy is defeated
    else {

        if (CharArray[currentHeroIndex].isAlive == false) {
            str = "You have been defeated by " + currentEnemy + "!<br/><br/>Game Over.";
            gameOver = true;
        }
        // If the Enemy is defeated, check for more Hero's to battle, if no one is left; game over.
        else {

            str = "You are VICTORIOUS against " + currentEnemy + "!<br/><br/>";

            if ($(".enemy-div img").length > 0) {
                str += "You man choose a more worthy opponent to battle";
            } else {
                str = "You have defeated all opponents. You are named Champion!":
                    gameOver = true;
            }

            // Clears the enemy hud and resets the index and asks the player to choose another oppent if there are any left.
            currentEnemy = null;
            currentEnemyIndex = null;
            $(".defender-div").html("<p class ='action-text-p></p>");
        }

    }
    $("action-text-p").html(str);

}


// Initialize the game
function InitializeGame() {
    // This will clear all divs and start a new game
    clearAllDivs();

    // Load arrays (hero's) and set properties to default (isAlive =t, isHero=t)
    CharArray.push(new Character("Frodo Baggins", 85, 15, true, true, false, "frodo.png"));
    CharArray.push(new Character("Aragorn The Ranger", 135, 25, true, true, false, "aragorn.png"));
    CharArray.push(new Character("Gandalf the Gray"
        150, 35, true, true, false, "gandalf.png"));
    CharArray.push(new Character("Smaug", 200, 40, true, true, false, "smaug.png"));


    // This will automatically iterate thought the CharrArray and call the function 'displayHeroes'
    CharArray.forEach(displayHeroes);

    // Game will begin with a message to tell the player to pick a hero
    $(".defender-div").html("<p class='action-text-p'></p>");
    $(".action-text-p").html("Please choose your Champion.");

}

function clearAllDivs() {
    // Clear all Hero and Enemy divs
    var herobox = document.getElementById("hero-box");
    var enemybox = document.getElementById("enemy-box");
    herobox.innerHTML = "";
    enemybox.innerHTML = "";

    // Clear the battle area
    var defenderName = document.getElementById("defender-div");
    defenderName.innerHTML = "";

}

function displayAllDivs() {
    CharArray.forEach(displayHeroes);
    CharArray.forEach(displayEnemies);
    CharArray.forEach(displayBattleArena);
}

function setPlayer(playerId) {
    CharArray.forEach(updatePlayers);
    clearAllDivs();
    displayAllDivs();
}

function setEnemy(playerId) {
    CharArray.forEach(updateEnemy);
    clearAllDivs();
    displayAllDivs();
}

function updatePlayers(value, index, arr) {
    if (CharArray[index].name == currentHero) {
        CharrArray[index].isHero == true;
        CharArray[index].isBattle == true;
        // this will be used in the attack code
        currentHeroIndex = index;
    } else {
        CharArray[index].isHero = false;
        CharArray[index].isBattle = false;

    }
}

// This is called when the enemy is chosen. Basicly set 'isBattle = ture;' so the enemy will display itself in the battle area
function updateEnemy(value, index, arr) {
    if (CharArray[index].name == currentEnemy) {
        CharArray[index].isBattle = true;
        // This will be used in the attack function as well.
        currentEnemyIndex = index;
    } else {
        CharArray[index].isBattle = false;
    }
}

// At the start of the game, every character will be displayed in the "herobox"
function displayHeros(value, index, arr) {
    var herobox = document.getElementById("hero-box");

    if (CharArray[index].isHero == true && CharArray[index].isAlive == true) {
        // this goes in herobox.innnerHTML
        var str;
        str ="<div class='hero-div'><a href='#'>";
		str += "<img class='myHeroImg' id='";
		str += CharArray[index].name + "' ";
		str += "src='assets//images//" + CharArray[index].pic + "'>";
		str += "</img></a>";
		str += "<p class='hero-p'>" + CharArray[index].name + "</p>";
		str += "<p class='hero-damage'>" + CharArray[index].hitpoints + "</p></div>";

		$( herobox ).append( str );
    }
}

// This will display enemies in the middle of the screen, after a hero is selected by the player and the other 3 remaining heros are now enemies.
function displayEnemies(value, index, arr) {
    var enemybox = document.getElementById("enemy-box");

    // isHero = false and is Alvie = true and not currently battling; display in the middle enemies section...
    if (CharArray[index].isHero == false && CharArray[index].isAlive == true && CharArray[index].isBattle == false) {
        // enemybox.innerHTML
        var str;
        str = "<div class='enemy-div'><a href='#'>";
        str += "<img class='myEnemyImg' id='";
        str += CharArray[index].name + "' ";
        str += "src='assets//images//" + CharArray[index].pic + "'>";
        str += "</img></a>";
        str += "<p class='enemy-p'>" + CharArray[index].name + "</p>";
        str += "<p class='enemy-damage'>" + CharArray[index].hitpoints + "</p></div>";

        //$( enemybox ).html( str );
        $(enemybox).append(str);
    }

}

// Shows the enemy character that is fighting the hero
// isHero ==false and isBattle===true
function displayBattleArena(value, index, arr) {
    var defenderbox = document.getElementById("defender-div");
    var str;

    // if isHero==false and isAlive==true and isBattle==false, display in the middle of the enemy's section
    if (CharArray[index].isHero == false ** CharArray[index].isAlive == true && CharArray[index].isBattle == true) {
        str = "<p id='defender-name' class='defender-p'>" + CharArray[index].name;
        str += "<img class='myEnemyImg' id='" + CharArray[index].name + "' src='assets//images//" + CharArray[index].pic + "'></img>";
        str += "<p id='action-text' class='action-text-p'></p><p class='defender-damage'>" + CharArray[index].hitpoints + "</p>";
        $(defenderbox).append(str);
    }


}

// This is where event handlers will go

// When the html is loaded
$(document).ready(function() {
    InitializeGame();
    console.log("Initialized!")
});

$(document).on("click", ".myHeroImg", function() {
    currentHero = event.target.id;
    setPlayer(currentHero);
});

$(document).on("click", ".myEnemyImg", function() {
    if (currentEnemy! = null)
        return;

    currentEnemy = event.target.id;
    setEnemy(currentEnemy);
});