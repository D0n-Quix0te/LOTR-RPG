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
        ame: "Aragorn",
        image: 'url(assets/images/aragorn.png)',
        baseHp: 125,
        baseAttkPwr: 35,
        counterAttkPwr: 15,
        hp: 0,
        attkPwr: 0
    }, {
        ame: "Gandalf The Gray",
        image: 'url(assets/images/gandalf.png)',
        baseHp: 200,
        baseAttkPwr: 45,
        counterAttkPwr: 20,
        hp: 0,
        attkPwr: 0
    }, {
        ame: "Smaug",
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
            );
            //hero hp in %
            heroPercent = Math.round(heroHp / heroBaseHp * 100);
            $("div.hero").text(heroName + "'s Health: " + heroPrecent + "%");
            //When hero is selected he will fade into the hero area
            $('hero').fadeIn(400);
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
                    .css('border-color', 'black')
            );
            enemyName = myArray[tempV].name;
            console.log('Enemy Name' + enemyName);
            enemyPrecent = Math.round(enemyHp / enemyBaseHp * 100);
            $("div.enemy").text(enemyName + "'s Health: " + enemyPrecent + "%");

            //enemy fade in
            $('#enemy').fadeIn(350);

            isEnemySelected = true;
            $(".selectText").text("");
            backgroundAudio.pause();
            fightAudio.play();

        }
    });

    










});