$(document).ready(function () {
    const animationDelay = 4 * 1000;
    const countOfPairs = 5;
    let numberOfOpenedCard = undefined;
    let countOfSteps = 0;
    let maxSteps = countOfPairs % 2 == 0
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

        $('.max-steps-count').text(maxSteps);
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
        if (numberOfOpenedCard == undefined) {
            numberOfOpenedCard = $(this).attr('data-number');

            $(this).addClass('open');
        } else {
            // numberOfOpenCard != undefined
            // case 2. One card is open
            $(this).addClass('open');

            const currentCardNumber = $(this).attr('data-number');
            // wait 0.5 sec
            setTimeout(function () {
                // comaper numberOfOpenCard and number of current card
                if (numberOfOpenedCard == currentCardNumber) {
                    // cards is the same
                    // mark cards as opened
                    $(`[data-number=${numberOfOpenedCard}]`).addClass('finded');
                } else {
                    // cards is diff
                    // hide card
                    $('.open').removeClass('open');
                }

                numberOfOpenedCard = undefined
            }, animationDelay);
        }

        countOfSteps++;
        $('.steps-count').text(countOfSteps);
    });
});
