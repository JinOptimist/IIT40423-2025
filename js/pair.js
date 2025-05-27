$(document).ready(function () {
    const countOfPairs = 3; // * 3 + 1

    let numberOfOpenCard = undefined;

    let stepCount = 0;
    let maxStep = countOfPairs % 2 == 0
        ? countOfPairs * 3
        : countOfPairs * 3 + 1;

    let imagesFromDatabase = [
        'images/girl01.jpg',
        'images/girl02.jpg',
        'images/girl03.jpg',

        'images/girl04.jpg',
        'images/girl05.jpg',
        'images/girl06.jpg',

        'images/girl07.jpg',
        'images/girl08.jpg',
        'images/girl09.jpg',
    ];

    let imagesForGame = [];

    init();

    function init() {
        // Step 1. build imagesForGame array from imagesFromDatabase
        for (let i = 0; i < countOfPairs; i++) {
            imagesForGame.push(imagesFromDatabase[i]);
            imagesForGame.push(imagesFromDatabase[i]);
        }

        // Step 2. Shuflt imagesForGame
        shufle(imagesForGame);

        // Step 3. Create tag for each elements from imagesForGame
        for (let i = 0; i < imagesForGame.length; i++) {
            const url = imagesForGame[i];
            const number = imagesFromDatabase.indexOf(url);
            createCard(url, number);
        }

        $('.max-steps-count').text(maxStep);
    }

    function createCard(url, number) {
        const card = $('.card.template').clone();
        card.removeClass('template');
        card.find('.face img').attr('src', url);
        card.attr('data-number', number);
        $('.desc').append(card);
    }

    function shufle(array) {

        for (let i = 0; i < array.length * 2; i++) {
            const firstIndex = getRandom(array.length - 1);
            const secondIndex = getRandom(array.length - 1);

            const firstCard = array[firstIndex];
            const secondCard = array[secondIndex];
            array[firstIndex] = secondCard;
            array[secondIndex] = firstCard;
        }
    }

    function getRandom(max) {
        return Math.floor(Math.random() * max);
    }

    $('.card').click(function () {
        // this is card for which user clicked
        if ($(this).hasClass('finded')){
            return;
        }


        // case 1. No open card on desc
        if (numberOfOpenCard == undefined) {
            numberOfOpenCard = $(this).attr('data-number');

            $(this).find('.face').toggle();
            $(this).find('.cover').toggle();
        } else {
            // numberOfOpenCard != undefined
            // case 2. One card is open
            $(this).find('.face').toggle();
            $(this).find('.cover').toggle();
            
            const currentCardNumber = $(this).attr('data-number');
            // wait 0.5 sec
            setTimeout(function () {
                // comaper numberOfOpenCard and number of current card
                if (numberOfOpenCard == currentCardNumber) {
                    // cards is the same
                    // mark cards as opened
                    $(`[data-number=${numberOfOpenCard}]`).addClass('finded');
                } else {
                    // cards is diff
                    // hide card
                    $('.cover').show();
                    $('.face').hide();
                }

                numberOfOpenCard = undefined
            }, 1000);
        }

        stepCount++;
        $('.steps-count').text(stepCount);
    });
});
