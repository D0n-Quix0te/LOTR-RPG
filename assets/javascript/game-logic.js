// Week-4 RPG-Game using jQuery

/*Pseudocode-----------------
1> Create an object, call it Character; include name, hitpoints, damage, isHero(boolean), isEnemy(boolean), inBattle (boolean), isAlive (boolean)
	-Make it so fuctions are part of the object, the core function will be the Attack(damage). This will be called when the character is  itself being "getting attacked". Damage parameter is insterted when the character(hero) attacks.
		-When the Attack(damage) is activated
				-It will lower hero's hitpoints by an amount that is called in by dmg
				-If the hitpoints <=0, then isAlive will be set to false;

2> Create an array to hold charactersa and enemy objects
3> Create an intialize function that will be called from the body.onload event using jquery
	-This will poupulate the chracter array with the 4 character objects

4> Create 3 new display functions for each of the div sections
	-ShowCharacters():
		-At the start every hero will be set to 'true', so that they all show up in the display (along with the name,hitpoints)
	-ShowEnemies():
		This will be empty at the start. It will populate with the remaning heros after a champion is selected (also with name,hitpoints)
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
var currentHero = null;  // Holds the name of the selected Hero ("Luke Skywalker")
var currentEnemy = null; // Holds the name of the selected Enemy ("Darth Maul")

var currentHeroIndex = null;  // Holds the index of the selected Hero as an integer (CharArray[currentHeroIndex] will give us current hero)  
var currentEnemyIndex = null;  // Holds the index of the selected Hero as an integer (CharArray[currentHeroIndex] will give us current hero)  

var gameOver = false;  //set to true when Hero dies or Enemies all die


function Character(name,hitpoints,damage,isHero,isAlive,isBattle, pic)
{
		this.name = name;
		this.hitpoints = hitpoints;
		this.damage = damage;
		this.isHero = isHero;
		this.isAlive = isAlive;
		this.isBattle = isBattle;
		this.pic = pic;
		this.Attack = function(hitDamage)
		{
			this.hitpoints = this.hitpoints - hitDamage;
			
			if(this.hitpoints <= 0)  //check if you are dead
			{
				 this.isAlive = false;
				 return;
			}
		}
}

function Attack()
{

	var str;


	if(gameOver==true)
		return;

	if($(".hero-div img").length > 1)  //just started, need to select a character
	{
		$(".defender-div").html("<p class='action-text-p'></p>");
		$(".action-text-p").html("Please select a Character to get started.");
		return;
	}

	if (!currentEnemy && $(".enemy-div img").length > 0) //No enemy was selected and some are still available show msg to select
	{
		$(".defender-div").html("<p class='action-text-p'></p>");
		$(".action-text-p").html("Please select an Enemy to continue.");
		return;
	}

	//Next 2 lines are key...Hero gets attacked then Enemy gets attacked 
	CharArray[currentHeroIndex].Attack( CharArray[currentEnemyIndex].damage );
	CharArray[currentEnemyIndex].Attack( CharArray[currentHeroIndex].damage );

	//after the attacks, update the hitpoint DIVs on the screen
	$(".hero-damage").text(CharArray[currentHeroIndex].hitpoints);
	$(".defender-damage").text(CharArray[currentEnemyIndex].hitpoints);

	//Play a sound
	// Play fight music
	var audio = new Audio("assets/sounds/Lightsaber.mp3");
	audio.play();

	//Write to the message area everything that is happening for each attack click.  If/Else because check for dead, game over
	if (CharArray[currentHeroIndex].isAlive == true && CharArray[currentEnemyIndex].isAlive == true)
	{
		str = "You attacked " + currentEnemy + " for " + CharArray[currentHeroIndex].damage + " damage.<br /><br />";
		str += currentEnemy + " attacked you back for " + CharArray[currentEnemyIndex].damage + " damage.";

		CharArray[currentHeroIndex].damage += CharArray[currentHeroIndex].damage;  //damage for the hero continually increases
	}
	else  //one of you is dead
	{
		if(CharArray[currentHeroIndex].isAlive == false)   //Is Hero dead?
		{
			str = "You were defeated by " + currentEnemy + ".<br /><br />Game Over.";
			gameOver = true;	
		}
		else   // Enemy Dead
		{	//Good guy won!  But now check if there is anyone else to fight (i.e. are they all dead?  game over if so)
			str = "You were victorious against " + currentEnemy + ".<br /><br />";

			if($(".enemy-div img").length > 0){		//If this myEnemyImg exists, there is another enemy in that DIV
				str += "You can choose to fight another character.";		
			}
			else 
			{
				str += "There are no more Enemies to fight.  Game Over";
				gameOver = true;	
			}
			
			currentEnemy = null;
			currentEnemyIndex = null;	
			
			$(".defender-div").html("<p class='action-text-p'></p>");
		}
		
	}
	$(".action-text-p").html(str);

}


function InitializeGame()
{
	//Clear the divs, starting new game
    clearAllDivs();

	//Load the arrays and set the default properties (i.e. isAlive=true, Ishero=true)
	CharArray.push(new Character("Aragon",100, 25,true,true,false, "aragorn.png"));
	CharArray.push(new Character("Frodo",95,8,true,true,false, "frodo.png"));
	CharArray.push(new Character("Smaug",180,25,true,true,false, "smaug.png"));
	CharArray.push(new Character("Gandalf The Gray",150,15,true,true,false, "gandalf.png"));

	//Cool built-in function that automatically iterates through our CharArray
	//and calls the function displayHeroes (while staying here at this line)
	CharArray.forEach(displayHeroes);

	//Start the game with a message to select a player.
	$(".defender-div").html("<p class='action-text-p'></p>");
	$(".action-text-p").html("Please select a Hero.");
}

function clearAllDivs()
{
	//Clear Hero and Enemy Divs
	var herobox = document.getElementById( "hero-box" );
	var enemybox = document.getElementById( "enemy-box" );
	herobox.innerHTML = "";
	enemybox.innerHTML = "";

	//Clear Battle Area
	var defenderName = document.getElementById( "defender-div" );
	defenderName.innerHTML = "";
}

function displayAllDivs()
{
	CharArray.forEach (displayHeroes);
	CharArray.forEach (displayEnemies);
	CharArray.forEach (displayBattleArena);
}

function setPlayer(playerId)
{
	CharArray.forEach (updatePlayers);
	clearAllDivs();
	displayAllDivs();
}

function setEnemy(playerId)
{
	CharArray.forEach (updateEnemy);
	clearAllDivs();
	displayAllDivs();
}


function updatePlayers(value, index, arr)
{
	if (CharArray[index].name == currentHero){
		CharArray[index].isHero = true; 
		CharArray[index].isBattle = true;
		currentHeroIndex = index;  // we will use this in attack function
	}
	else {
		CharArray[index].isHero = false; 
		CharArray[index].isBattle = false;	
	}	
}

// Called when an enemy is selected to do battle.  Just
//sets isBattle = true so the enemy displays in the Battle Area	
function updateEnemy(value, index, arr)
{
	
	if (CharArray[index].name == currentEnemy)
	{
	  CharArray[index].isBattle = true;
	  currentEnemyIndex = index;  // we will use this in attack function
	}
	else
	{
		CharArray[index].isBattle = false;
	}
}

//Displays heroes (at the beginning of the game, everyone is a hero)
function displayHeroes(value, index, arr)
{
	var herobox = document.getElementById( "hero-box" );
 	
 	if (CharArray[index].isHero == true && CharArray[index].isAlive == true )
 	{
	 	var str; // = herobox.innerHTML;
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

//Displays enemies in the middle of the screen (after a hero is selected, the other 3 players become enemies)
function displayEnemies(value, index, arr)
{
	var enemybox = document.getElementById( "enemy-box" );
 	
 	// If IsHero is false and still alive and Not currently battling (isBattle), then display in the middle Enemies section
 	if (CharArray[index].isHero == false && CharArray[index].isAlive == true && CharArray[index].isBattle == false)
 	{
	 	var str; // = enemybox.innerHTML;
		str ="<div class='enemy-div'><a href='#'>";
		str += "<img class='myEnemyImg' id='";
		str += CharArray[index].name + "' ";
		str += "src='assets//images//" + CharArray[index].pic + "'>";
		str += "</img></a>";
		str += "<p class='enemy-p'>" + CharArray[index].name + "</p>";
		str += "<p class='enemy-damage'>" + CharArray[index].hitpoints + "</p></div>";
		
		//$( enemybox ).html( str );
		$( enemybox ).append( str );
	}
}

//Displays only one enemy character that has isHero==false and isBattle==true;
function displayBattleArena(value, index, arr)
{
	var defenderbox = document.getElementById( "defender-div" );
 	var str; 
	
	// If IsHero is false and still alive and Not currently battling (isBattle), then display in the middle Enemies section
 	if (CharArray[index].isHero == false && CharArray[index].isAlive == true && CharArray[index].isBattle == true)
 	{
		str ="<p id='defender-name' class='defender-p'>" + CharArray[index].name;
		str += "<img class='myEnemyImg' id='" + CharArray[index].name + "' src='assets//images//" + CharArray[index].pic + "'></img>";
		str += "<p id='action-text' class='action-text-p'></p><p class='defender-damage'>" + CharArray[index].hitpoints + "</p>";
		$( defenderbox ).append( str );
	}
	
}


// --- EVENT HANDLERS BELOW ---

// --- Called when the hmtl document is ready (loaded) ---
$( document ).ready(function() 
{
  //console.log( "Initialized!" );
  InitializeGame();
});

$(document).on('click', '#attack', function(){
   Attack();
});


$(document).on('click', '.myHeroImg', function(){
    currentHero = event.target.id;
   	setPlayer(currentHero);
    } );


$(document).on('click', '.myEnemyImg', function(){
	
		//console.log($(".myEnemyImg"));
		if(currentEnemy != null)
			return;

	currentEnemy = event.target.id;
   	setEnemy(currentEnemy);
});