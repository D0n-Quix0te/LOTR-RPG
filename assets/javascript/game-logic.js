/*Steps
* 1. Create vars for hero hp, enemy hp, bero attk points, enemy attk points
* 2.Create vars for if a hero has been selected, if a challanger has been selected
* 3. Create vars for hero name/enemy name
* 4. Create an array with all the characters info
* 5. Add some background audio. Maybe change the music when fight begins?
* */

$(document).ready(function () {

    var heroHealthPoints;
    var heroAttackPower;
    // var heroCounterAttackPower;
    var heroBaseAttackPower;
    var heroBaseHealthPoints;

    var challengerHealthPoints;
    // var challengerAttackPower;
    var challengerCounterAttackPower;
    var challengerBaseHealthPoints;

    var heroSelected = false;
    var challengerSelected = false;
    var heroName, heroID;
    var challengerName, challengerID;
    
	var heroPercent;
	var badGuyPercent;

	var backgroundAudio = new Audio('assets/audio/introAudio.mp3');
	var backgroundFightAudio = new Audio('assets/audio/battleAudio.mp3');

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
        // this.currentTime = 0;
        this.play();

    }, false);
    backgroundAudio.play();

    backgroundFightAudio.addEventListener('ended', function () {
        // this.currentTime = 0;
        this.play();

    } , false);

    //Generates selector pics
    for (var i = 0; i < 4; i++) {

        $('.monsterList').append(
            $('<button>')
                .attr("id", i)
                .addClass("btn monster")
                .text(myArray[i].name)
                .css('background-image', myArray[i].image)
        );
    }


    function timedText() {
        setTimeout(removeA, 1000)
    }


    var uu;

    function removeA() {
        $(uu).attr("id", 5);
    }


    $("button.monster").click(function() {

        if (heroSelected === false) {
            var tempV = this.id;
            var newId = Number(tempV) + 10;
            heroBaseAttackPower = myArray[Number(this.id)].baseAttackPower;
            heroAttackPower = myArray[Number(this.id)].baseAttackPower;
            heroHealthPoints = myArray[Number(this.id)].baseHealthPoints;
            heroBaseHealthPoints = myArray[Number(this.id)].baseHealthPoints;
            $("#" + tempV).attr("id", newId);

            uu = "#" + newId; // move into selector
            $(uu).fadeOut(400);
            timedText();
            heroName = myArray[tempV].name;
            console.log('Hero name ' + heroName);

            // Move hero to left side of screen
            $('.goodGuy').append(
                $('<button>')
                    .attr("id", "hero")
                    .addClass("btn")
                    .hide()
                    .text(myArray[tempV].name)
                    .css('background-image', myArray[tempV].image)
                    .css('border-color', 'green')
            );
            heroPercent = Math.round(heroHealthPoints / heroBaseHealthPoints * 100);
            $("div.goodguyhp").text(heroName + "'s Health: " + heroPercent + "%");
            $('#hero').fadeIn(400); // fade in at hero position
            heroSelected = true;

            $(".selectText").text("Select your opponent");


        } else if (challengerSelected === false) {

            // Move challenger
            challengerName = this.value;
            challengerID = this.id;
            var tempVI = Number(this.id);

            challengerCounterAttackPower = myArray[Number(this.id)].baseAttackPower;
            challengerHealthPoints = myArray[Number(this.id)].baseHealthPoints;
            challengerBaseHealthPoints = myArray[Number(this.id)].baseHealthPoints;


            uu = "#" + tempVI;
            $(uu).fadeOut(400);
            timedText();
            // move challenger to left side of screen

            $('.badGuy').append(
                $('<button>')
                    .attr("id", "badguy")
                    .addClass("btn")
                    .hide()
                    .text(myArray[tempVI].name)
                    //  .css('background-image', myArray[tempV].image)
                    .css('background-image', myArray[tempVI].image)
                    .css('border-color', 'green')
            );
            challengerName = myArray[tempVI].name;
            console.log('Chanllengers name ' + challengerName);
            badGuyPercent = Math.round(challengerHealthPoints / challengerBaseHealthPoints * 100);
            $("div.badguyhp").text(challengerName + "'s  Health: " + badGuyPercent + "%");

            $('#badguy').fadeIn(400); // fade in at hero position
            challengerSelected = true;
            $(".selectText").text("");
            backgroundAudio.pause();
            backgroundFightAudio.play();
            $("#title").text("LORD OF THE RINGS: CHAMPIONS")
            
        }
    });


    function reportCounterAttack(){
        heroHealthPoints -= challengerCounterAttackPower;
        if(heroHealthPoints < 0){heroHealthPoints = 0;}
        heroAttackPower += heroBaseAttackPower;
        $(".fightInfo").text(challengerName + " attacks " + heroName + " for " + challengerCounterAttackPower + " Dmg!");
        heroPercent = Math.round(heroHealthPoints / heroBaseHealthPoints * 100);
        $("div.goodguyhp").text(heroName + "'s Health: " + heroPercent + "%");
        window.clearInterval(counterAttackTimer);

        checkForWin();

    }

    $("button#attack").click(function() {
        if (heroSelected && challengerSelected) {
            challengerHealthPoints -= heroAttackPower;
            if(challengerHealthPoints < 0){challengerHealthPoints = 0;}

            badGuyPercent = Math.round(challengerHealthPoints / challengerBaseHealthPoints * 100);
            $(".fightInfo").text(heroName + " attacks " + challengerName + " for " + heroAttackPower + " Dmg!");
            $("div.badguyhp").text(challengerName + "'s  Health: " + badGuyPercent + "%");
            checkForWin();
        }



    });
    $('button#reset').click(function() {
        challengerSelected = false;
        heroHealthPoints = heroBaseHealthPoints;
        $(".selectText").text("Select your opponent");
        backgroundFightAudio.pause();
        backgroundAudio.play();
    });



    function checkForWin() { // Challenger wins
        if (heroHealthPoints <= 0) {
            heroHealthPoints = 0;
            // print win status
            $("#title").text("You have been defeated!");
            // remove hero
            $(".fightInfo").text(heroName + " is defeated! " );
            $("div.goodguyhp").text("");
            $('#goodGuy').fadeOut(400); // fade in at hero position
            heroSelected = false;
            // end game

        } else if (challengerHealthPoints <= 0) { // Hero wins
            challengerHealthPoints = 0;
            // set win status

            // print win status
            // remove bad guy
            $(".fightInfo").text(challengerName + " is defeated! " );
            $("div.badguyhp").text("");
            $('#badguy').fadeOut(400); // fade in at hero position
            // reset hero HP
            heroHealthPoints = heroBaseHealthPoints;
            challengerSelected = false;
            heroHealthPoints = heroBaseHealthPoints;
            $(".selectText").text("Select your opponent");
            backgroundFightAudio.pause();
            backgroundAudio.play();
            $("html::before ").css('background-image', 'url(../images/background.gif)');
            $('#hero').css('border-color', 'green');
            $('#badGuy').css('border-color', 'green');
            heroPercent = Math.round(heroHealthPoints / heroBaseHealthPoints * 100);
            $("div.goodguyhp").text(heroName + "'s Health: " + heroPercent + "%");
            $("#title").text(heroName + " is victorious!")



        } else {
            var counterAttackTimer = setTimeout(reportCounterAttack, 800);
            if (heroHealthPoints / heroBaseHealthPoints * 100 < 75) {

                $('#hero').css('border-color', 'yellow');
            }
            if (challengerHealthPoints / challengerBaseHealthPoints * 100 < 75) {
                $('#badguy').css('border-color', 'yellow');
            }
            if (heroHealthPoints / heroBaseHealthPoints * 100 < 50) {

                $('#hero').css('border-color', 'orange');
            }
            if (challengerHealthPoints / challengerBaseHealthPoints * 100 < 50) {
                $('#badguy').css('border-color', 'orange');
            }
            if (heroHealthPoints / heroBaseHealthPoints * 100 < 25) {

                $('#hero').css('border-color', 'red');
            }
            if (challengerHealthPoints / challengerBaseHealthPoints * 100 < 25) {
                $('#badguy').css('border-color', 'red');
            }

        }
    }



}); // document ready

