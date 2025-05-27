$(document).ready(function () {
    const countOfPairs = 5;
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
            createCard(imagesForGame[i]);
        }
    }

    function createCard(url) {
        const card = $('.card.template').clone();
        card.removeClass('template');
        card.find('.face img').attr('src', url);
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
        $(this).find('.face').toggle();
        $(this).find('.cover').toggle();
    });
});