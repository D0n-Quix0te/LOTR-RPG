/*Steps
* 1. Create vars for hero hp, enemy hp, bero attk points, enemy attk points
* 2.Create vars for if a hero has been selected, if a challanger has been selected
* 3. Create vars for hero name/enemy name
* 4. Create an array with all the characters info
* 5. Add some background audio. Maybe change the music when fight begins?
* */

$(document).ready(function () {

	var heroHp;
	var heroAttk;
	var heroBaseHp;
	var heroBaseAttk;
	var heroCounterAttkPwr;

	var enemyHp;
	var enemyAttk;
	var enemyBaseHp;
	var enemyBaseAttk;
	var enemyCounterAttkPwr;

	var isHeroSelected = false;
	var isEnemySelected = false;
	var heroName, heroId;
	var enemyName, enemyId;

	var heroPrecent;
	var enemyPrecent;

	var backgroundAudio = new Audio('assets/audio/introAudio.mp3');
	var fightAudio = new Audio('assets/audio/battleAudio.mp3');

//This array will store the characters info
	var myArray = [{
        name: "Frodo",
        image: 'url(assets/images/frodo.png)',
        baseHp: 90,
        baseAttkPwr: 15,
        counterAttkPwr: 8,
        hp: 0,
        attkPwr: 0
    }, {
        name: "Aragorn",
        image: "url(assets/images/aragorn.png)",
        baseHp: 125,
        baseAttkPwr: 35,
        counterAttkPwr: 15,
        hp: 0,
        attkPwr: 0
    }, {
        name: "Gandalf The Gray",
        image: 'url(assets/images/gandalf.png)',
        baseHp: 200,
        baseAttkPwr: 45,
        counterAttkPwr: 20,
        hp: 0,
        attkPwr: 0
    }, {
        name: "Smaug",
        image: 'url(assets/images/smaug.png)',
        baseHp: 300,
        baseAttkPwr: 45,
        counterAttkPwr: 29,
        hp: 0,
        attkPwr: 0
    }];

	//Audio files will go here
    backgroundAudio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();

    }, false);
    backgroundAudio.play();

    fightAudio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();

    } , false);

    //Generates selector pics
    for (var i = 0; i < 4; i++) {

        $('.enemyList').append($('<button>')
            .attr("id",i)
            .addClass("btn enemy")
            .text(myArray[i].name)
            .css('background-image',myArray[i].image)
        );
    }

    function timedText() {
        setTimeout(removeA, 1000)

    }

    var str;

    function removeA() {
        $(str).attr("id", 5);
    }

    $("button.enemy").click(function () {

        if (isHeroSelected === false){
            var tempV = this.id;
            var newId = Number(tempV) + 10;
            heroBaseAttk = myArray[Number(this.id)].baseAttkPwr;
            heroAttk = myArray[Number(this.id)].baseAttkPwr;
            heroHp = myArray[Number(this.id)].baseHp;
            heroBaseHp = myArray[Number(this.id)].baseHp;
            $("#" + tempV).attr("id", newId);

            str = "#" + newId;
            $(str).fadeOut(350);
            timedText();
            heroName = myArray[tempV].name;
            console.log('Hero name' + heroName);

            //Places hero in the correct area
            $('.hero').append(
                $('<button>')
                    .attr("id","hero")
                    .addClass("btn")
                    .hide()
                    .text(myArray[tempV].name)
                    .css('border-color', 'green')
                    .css('background-image', myArray[tempV].image)
            );
            //hero hp in %
            heroPercent = Math.round(heroHp / heroBaseHp * 100);
            $("div.heroHp").text(heroName + "'s Health: " + heroPrecent + "%");
            //When hero is selected he will fade into the hero area
            $('#hero').fadeIn(400);
            isHeroSelected = true;

            $(".selectText").text("Choose Your Opponent!");

        } else if (isEnemySelected === false) {

            //Move enemy to the correct area
            enemyName = this.value;
            enemyId = this.id;
            var tempV = Number(this.id);

            enemyCounterAttkPwr = myArray[Number(this.id)].baseAttkPwr;
            enemyHp = myArray[Number(this.id)].baseHp;
            enemyBaseHp = myArray[Number(this.id)].baseHp;

            str = "#" + tempV;
            $(str).fadeOut(350);
            timedText();

            $('.enemy').append(
                $('<button>')
                    .attr("id","enemy")
                    .addClass("btn")
                    .hide()
                    .text(myArray[tempV].name)
                    .css('background-image', myArray[tempV].image)
                    .css('border-color', 'black')
            );
            enemyName = myArray[tempV].name;
            console.log('Enemy name' + enemyName);
            enemyPrecent = Math.round(enemyHp / enemyBaseHp * 100);
            $("div.enemyHp").text(enemyName + "'s Health: " + enemyPrecent + "%");

            //enemy fade in
            $('#enemy').fadeIn(350);

            isEnemySelected = true;
            $(".selectText").text("");
            backgroundAudio.pause();
            fightAudio.play();
            $("#title").text("LORD OF THE RINGS: CHAMPIONS");

        }
    });


    function  reportCounterAttack() {
        heroHp -= enemyCounterAttkPwr;
        if (heroHp < 0){heroHp =0;}
        heroAttk += heroBaseAttk;
        $(".fightInfo").text(enemyName + " attacks " + heroName + " for " + enemyCounterAttkPwr + " Dmg!");
        heroPercent = Math.round(heroHp / heroBaseHp * 100);
        $("div.heroHp").text(heroName + "'s Health: " + heroPrecent + "%");
        window.clearInterval(counterAttackTimer);

        checkForWin();

    }

    $("button#attack").click(function () {
        if (isHeroSelected && isEnemySelected) {
            enemyHp -= heroAttk;
            if(enemyHp <0) {enemyHp = 0;}

            enemyPrecent = Math.round(enemyHp / enemyBaseHp * 100);
            $(".fightInfo2").text(heroName + " attacks " + enemyName + " for " + heroAttk + " Dmg!");
            $("div.enemy").text(enemyName + "'s Health: " + enemyPrecent + "%" );

            checkForWin();
        }

    });

    $('button#reset').click(function() {
        isEnemySelected = false;
        heroHp = heroBaseHp;
        $(".selectText").text("Choose Your Opponent");
        fightAudio.pause();
        backgroundAudio.play();

    });

    function checkForWin() {
        if (heroHp <=0) {
            heroHp = 0;
            $("#title").text("You Have Been Defeated!");

            //Hero is removed from the battlefield
            $(".fightInfo").text(heroName + " is defeated");
            $("div.hero").text("");
            $('#hero').fadeOut(350);

            isHeroSelected = false;
            //GAME OVER
        }
        //Hero Wins
        else if (enemyHp <= 0) { enemyHp = 0;
        //display win status and remove enemy
            $(".fightInfo").text(enemyName + " is defeated!");
            $("div.enemyHp").text("");
            $('#enemy').fadeOut(350);



            //This will reset hero HP
            heroHp = heroBaseHp;
            isEnemySelected = false;
            heroHp = heroBaseHp;
            $(".selectText").text("Choose Your Opponent");
            fightAudio.pause();
            backgroundAudio.play();
            $("html::before").css('background-image');
            $('#hero').css('border-color', 'green');
            $('#enemy').css('border-color', 'black');
            heroPrecent = Math.round(heroHp / heroBaseHp * 100);
            $("div.heroHp").text(heroName + "'s Health: " + heroPrecent + "%");
            $("#title").text(heroName + " is victorious!")
        } else {
            var counterAttackTimer = setTimeout(reportCounterAttack, 800);
            if (heroHp / heroBaseHp * 100 < 75) {
                $("#hero").css('border-color', 'yellow');
            }
            if (enemyHp / enemyBaseHp * 100 < 75) {
                $("#enemy").css('border-color', 'yellow');
            }
            if (heroHp / heroBaseHp * 100 < 50) {
                $("#hero").css('border-color', 'orange');
            }
            if (enemyHp / enemyBaseHp * 100 < 50) {
                $("#enemy").css('border-color', 'orange');
            }
            if (heroHp / heroBaseHp * 100 < 25) {
                $("#hero").css('border-color', 'red');
            }
            if (enemyHp / enemyBaseHp * 100 < 25) {
                $("#enemy").css('border-color', 'red');
            }

        }

    }

    function logData() {
        console.log(this.id);
        console.log("ID: " + tempV);
        console.log("Bad guy name: " + myArray[tempV].name);
        console.log("ID: " + tempV);
        console.log("Good guy name: " + myArray[tempV].name);
        console.log("Base attack power: " + heroBaseAttk);
        console.log("Attack power: " + heroAttk);
        console.log("Base HP: " + heroBaseHp);
        console.log("HP: " + heroHp);
        console.log("ID: " + tempV);
        console.log("Bad guy name: " + myArray[tempV].name);
        console.log("Attack power: " + enemyCounterAttkPwr);
        console.log("Base HP: " + enemyBaseHp);
        console.log("HP: " + enemyHp);
        console.log("Hero HP: " + heroHp);
        console.log("Bad guy HP: " + enemyHp);

    }


});