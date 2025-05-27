$(document).ready(function () {
    let images = [
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
    init();

    $('.container').click(function () {
        $('.box').toggleClass('isActive');
    });

    function init() {


        // comand to show button

    }

    $('.get-images').click(function () {
        addImagesToGallery();
    });

    $('.fly-images').click(function(){
        $('.task .fly img').attr('src', 'images/girl04.jpg');
        $('.task .fly').css('animation', 'image-fly 5s');
    });

    function addImagesToGallery() {
        // create a copy of template and set the url for image
        images.forEach((url, index) => {
            // create a copy of existed tag
            const tag = $('.gallery .placeholder.template').clone();
            // remove class template from copy
            tag.removeClass('template');
            // find and set src for image
            tag.find('img').attr('src', url);
            // into copy find card
            const card = tag.find('.card');
            // move card out of the window
            card.css('top', -1500);
            card.css('left', 1500);
            // set index for the card into data attribute
            card.attr('data-index', index);
            // add copy to the page
            $('.gallery').append(tag);
        });

        // run animation with delay
        for (let i = 0; i < images.length; i++) {
            setTimeout(function () {
                const card = $(`.card[data-index=${i}]`);
                card.css('top', 0);
                card.css('left', 0);
            }, 300 * (i + 1));

        }
    }
});