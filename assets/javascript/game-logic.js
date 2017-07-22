/*Steps
* 1. Create vars for hero healthPoints, enemy healthPoints, bero attk points, enemy attk points
* 2.Create vars for if a hero has been selected, if a challanger has been selected
* 3. Create vars for hero name/enemy name
* 4. Create an array with all the characters info
* 5. Add some background audio. Maybe change the music when fight begins?
* */

$(document).ready(function () {

    var heroHealthealthPointsoints;
    var heroAttackPower;
    // var heroCounterAttackPower;
    var heroBaseAttackPower;
    var heroBaseHealthealthPointsoints;

    var challengerHealthealthPointsoints;
    // var challengerAttackPower;
    var challengerCounterAttackPower;
    var challengerBaseHealthealthPointsoints;

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
        baseHealthPoints: 90,
        baseAttackPower: 15,
        counterAttackPower: 8,
        healthPoints: 0,
        attackPower: 0
    }, {
        name: "Aragorn",
        image: "url(assets/images/aragorn.png)",
        baseHealthPoints: 125,
        baseAttackPower: 35,
        counterAttackPower: 15,
        healthPoints: 0,
        attackPower: 0
    }, {
        name: "Gandalf The Gray",
        image: 'url(assets/images/gandalf.png)',
        baseHealthPoints: 200,
        baseAttackPower: 45,
        counterAttackPower: 20,
        healthPoints: 0,
        attackPower: 0
    }, {
        name: "Smaug",
        image: 'url(assets/images/smaug.png)',
        baseHealthPoints: 300,
        baseAttackPower: 45,
        counterAttackPower: 29,
        healthPoints: 0,
        attackPower: 0
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
            heroHealthealthPointsoints = myArray[Number(this.id)].baseHealthealthPointsoints;
            heroBaseHealthealthPointsoints = myArray[Number(this.id)].baseHealthealthPointsoints;
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
            heroPercent = Math.round(heroHealthealthPointsoints / heroBaseHealthealthPointsoints * 100);
            $("div.goodguyhealthPoints").text(heroName + "'s Health: " + heroPercent + "%");
            $('#hero').fadeIn(400); // fade in at hero position
            heroSelected = true;

            $(".selectText").text("Select your opponent");


        } else if (challengerSelected === false) {

            // Move challenger
            challengerName = this.value;
            challengerID = this.id;
            var tempVI = Number(this.id);

            challengerCounterAttackPower = myArray[Number(this.id)].baseAttackPower;
            challengerHealthealthPointsoints = myArray[Number(this.id)].baseHealthealthPointsoints;
            challengerBaseHealthealthPointsoints = myArray[Number(this.id)].baseHealthealthPointsoints;


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
            badGuyPercent = Math.round(challengerHealthealthPointsoints / challengerBaseHealthealthPointsoints * 100);
            $("div.badguyhealthPoints").text(challengerName + "'s  Health: " + badGuyPercent + "%");

            $('#badguy').fadeIn(400); // fade in at hero position
            challengerSelected = true;
            $(".selectText").text("");
            backgroundAudio.pause();
            backgroundFightAudio.play();
            $("#title").text("LORD OF THE RINGS: CHAMPIONS")
            
        }
    });


    function reportCounterAttack(){
        heroHealthealthPointsoints -= challengerCounterAttackPower;
        if(heroHealthealthPointsoints < 0){heroHealthealthPointsoints = 0;}
        heroAttackPower += heroBaseAttackPower;
        $(".fightInfo").text(challengerName + " attacks " + heroName + " for " + challengerCounterAttackPower + " Dmg!");
        heroPercent = Math.round(heroHealthealthPointsoints / heroBaseHealthealthPointsoints * 100);
        $("div.goodguyhealthPoints").text(heroName + "'s Health: " + heroPercent + "%");
        window.clearInterval(counterAttackTimer);

        checkForWin();

    }

    $("button#attack").click(function() {
        if (heroSelected && challengerSelected) {
            challengerHealthealthPointsoints -= heroAttackPower;
            if(challengerHealthealthPointsoints < 0){challengerHealthealthPointsoints = 0;}

            badGuyPercent = Math.round(challengerHealthealthPointsoints / challengerBaseHealthealthPointsoints * 100);
            $(".fightInfo").text(heroName + " attacks " + challengerName + " for " + heroAttackPower + " Dmg!");
            $("div.badguyhealthPoints").text(challengerName + "'s  Health: " + badGuyPercent + "%");
            checkForWin();
        }



    });
    $('button#reset').click(function() {
        challengerSelected = false;
        heroHealthealthPointsoints = heroBaseHealthealthPointsoints;
        $(".selectText").text("Select your opponent");
        backgroundFightAudio.pause();
        backgroundAudio.play();
    });



    function checkForWin() { // Challenger wins
        if (heroHealthealthPointsoints <= 0) {
            heroHealthealthPointsoints = 0;
            // print win status
            $("#title").text("You have been defeated!");
            // remove hero
            $(".fightInfo").text(heroName + " is defeated! " );
            $("div.goodguyhealthPoints").text("");
            $('#goodGuy').fadeOut(400); // fade in at hero position
            heroSelected = false;
            // end game

        } else if (challengerHealthealthPointsoints <= 0) { // Hero wins
            challengerHealthealthPointsoints = 0;
            // set win status

            // print win status
            // remove bad guy
            $(".fightInfo").text(challengerName + " is defeated! " );
            $("div.badguyhealthPoints").text("");
            $('#badguy').fadeOut(400); // fade in at hero position
            // reset hero healthPoints
            heroHealthealthPointsoints = heroBaseHealthealthPointsoints;
            challengerSelected = false;
            heroHealthealthPointsoints = heroBaseHealthealthPointsoints;
            $(".selectText").text("Select your opponent");
            backgroundFightAudio.pause();
            backgroundAudio.play();
            $("html::before ").css('background-image', 'url(../images/background.gif)');
            $('#hero').css('border-color', 'green');
            $('#badGuy').css('border-color', 'green');
            heroPercent = Math.round(heroHealthealthPointsoints / heroBaseHealthealthPointsoints * 100);
            $("div.goodguyhealthPoints").text(heroName + "'s Health: " + heroPercent + "%");
            $("#title").text(heroName + " is victorious!")



        } else {
            var counterAttackTimer = setTimeout(reportCounterAttack, 800);
            if (heroHealthealthPointsoints / heroBaseHealthealthPointsoints * 100 < 75) {

                $('#hero').css('border-color', 'yellow');
            }
            if (challengerHealthealthPointsoints / challengerBaseHealthealthPointsoints * 100 < 75) {
                $('#badguy').css('border-color', 'yellow');
            }
            if (heroHealthealthPointsoints / heroBaseHealthealthPointsoints * 100 < 50) {

                $('#hero').css('border-color', 'orange');
            }
            if (challengerHealthealthPointsoints / challengerBaseHealthealthPointsoints * 100 < 50) {
                $('#badguy').css('border-color', 'orange');
            }
            if (heroHealthealthPointsoints / heroBaseHealthealthPointsoints * 100 < 25) {

                $('#hero').css('border-color', 'red');
            }
            if (challengerHealthealthPointsoints / challengerBaseHealthealthPointsoints * 100 < 25) {
                $('#badguy').css('border-color', 'red');
            }

        }
    }



}); // document ready

