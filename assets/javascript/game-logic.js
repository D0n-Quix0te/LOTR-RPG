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
function Character(name,hp,damage,isHero,isAlive,isBattle,pic) {

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
		if(this.hitpoints <= 0) {

			this.isAlive = false;
			return;
		}
	}
}

function Attack() {

	var str;

	if(gameOver==true)
		return;

	//This is the start. The player needs to select a Hero. 
	if($(".hero-div img").length > 1) {

		$(".defender-div").html("<p class= 'action-text-p'></p>");
		$(".action-text-p").html("Choose your Champion to begin the battle.");
		return;
	}

	// Player needs to choose an oppoent to battle
	if(!currentEnemy && $(".enemy-div img").length > 0) {

		$(".defender-div").html("<p class='action-text-p></p>");
		$(".action-text-p").html("Choose your challanger");
		return;
	}

	// This is the core code. When the Hero is attacked, the Enemy get attacked
	CharArray[currentHeroIndex].Attack(CharArray[currentEnemyIndex].damage);
	CharArray[currentEnemyIndex].Attack(CharArray[currentHeroIndex].damage);

	// This will update the Hero/Enemy hp's on the screen.
	$(".hero-damage").text(CharArray[currentHeroIndex].hp);
	$(".defender-damage").text(CharArray[currentEnemyIndex].hp);

	// Maybe insert some soundeffects?
	// var audio = new Audio("assests/sounds/#.mp3")''
	// audio.play();

	// This will write a message in an area showing the results for each attack. I used if/else so I could check for defeats/game over.
	if (CharArray[currentHeroIndex].isAlive == ture && CharArray[currentEnemyIndex].isAlive == true) {

		str = "You attacked " + currentEnemy + " for " + CharArray[currentEnemyIndex].damage + " damage!<br/><br/>";
		ste += currentEnemy + " countered with an attack for " + CharArray[currentEnemyIndex].damage + " damage!";

		// This will increase the players Hero damage after each attack.
		CharArray[currentHeroIndex].damage += CharArray[currentHeroIndex].damage;
	}
	// If the Hero or Enemy is defeated
	else {

		if(CharArray [currentHeroIndex].isAlive == false) {
			str = "You have been defeated by " + currentEnemy + "!<br/><br/>Game Over.";
			gameOver = true;
		}
		// If the Enemy is defeated, check for more Hero's to battle, if so game over.
		else {

			str = "You are VICTORIOUS against " + currentEnemy + "!<br/><br/>";

			if($(".enemy-div img").length > 0) {
				str += "You man choose a more worth oppoent to battle";
			}
			else {
				str = "You have defeated all oppoents. You are named Champion!":
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