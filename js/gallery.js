$(document).ready(function () {
    let images = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwctyTE48aLTh8txv4Tsdg53zap46VGvZJoA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ix09HQuQHM0q-OPQBUhJAW8X-mhHS9EPOQ&s',
        'https://m.media-amazon.com/images/I/417YwW3UwsL._AC_UF1000,1000_QL80_.jpg'
    ];
    init();

    $('.container').click(function () {
        $('.box').toggleClass('isActive');
    });

    function init() {
        images.forEach((url, index) => {
            // craete a copy of template and set the url for image
            const tag = $('.placeholder.template').clone();
            tag.removeClass('template');
            tag.find('img').attr('src', url);
            const card = tag.find('.card');
            card.css('top', -600);
            card.css('left', 600);
            card.attr('data-index', index);
            $('.gallery').append(tag);
        });

        for (let i = 0; i < images.length; i++) {
            setTimeout(function () {
                const card = $(`.card[data-index=${i}]`);
                card.css('top', 0);
                card.css('left', 0);
            }, 300 * (i + 1));

        }
    }

});