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

    function init(){
        images.forEach(url => {
            const tag = $('.placeholder.template').clone();
            tag.removeClass('template');
            tag.find('img').attr('src', url);
            $('.gallery').append(tag);
        });
    }

});