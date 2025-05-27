$(document).ready(function () {
    const animationDelay = 2 * 1000; // animation speed in css == 1s
    let countOfPairs = 5;
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

    $('.start').click(function () {
        if ($(this).hasClass('easy')) {
            countOfPairs = 2;
        }
        if ($(this).hasClass('medium')) {
            countOfPairs = 3;
        }
        if ($(this).hasClass('hard')) {
            countOfPairs = 5;
        }
        init();
    });

    function init() {
        // Step 0. Reset all variabels
        imagesForGame = [];
        numberOfOpenedCard = undefined;
        maxSteps = countOfPairs % 2 == 0
            ? countOfPairs * 3
            : countOfPairs * 3 + 1;
        countOfSteps = 0;
        const template = $('.card.template');
        $('.desc').empty();
        $('.desc').append(template);
        
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
        $('.card').click(onCardClick);
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

    function onCardClick() {
        // this is card for which user clicked
        if ($(this).hasClass('finded')) {
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

                numberOfOpenedCard = undefined;
            }, animationDelay);
        }

        countOfSteps++;
        $('.steps-count').text(countOfSteps);
    }
});
