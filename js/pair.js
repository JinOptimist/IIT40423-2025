$(document).ready(function(){
    const countOfPairs = 3;
    init();

    function init(){
        for (let i = 0; i < 3; i++) {
            const card = $('.card.template').clone();
            card.removeClass('template');
            card.find('.face').text(i);
            $('.desc').append(card);
        }
    }

    $('.card').click(function(){
        // this is card for which user clicked
        $(this).find('.face').toggle();
        $(this).find('.cover').toggle();
    });
});