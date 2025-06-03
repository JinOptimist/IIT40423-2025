$(document).ready(function () {
    const fullSize = 300;
    const halfSize = 150;
    const animationSpeed = 2;
    $('.next').click(function () {
        // run animation
        setWidthAndHeight('.prev', 0);
        setWidthAndHeight('.center', halfSize);
        setWidthAndHeight('.next', fullSize);
        setWidthAndHeight('.after-next', halfSize);

        // return to initial state
        setTimeout(setAllSizeToDefault, animationSpeed * 1000);
    })

    function setAllSizeToDefault() {
        $('.image-container').css('transition', 'none');

        setWidthAndHeight('.before-prev', 0);
        setWidthAndHeight('.prev', halfSize);
        setWidthAndHeight('.center', fullSize);
        setWidthAndHeight('.next', halfSize);
        setWidthAndHeight('.after-next', 0);

        moveImage('.next', '.center');

        setTimeout(function(){
            $('.image-container').css('transition', `all ${animationSpeed}s`);
        }, 100);
    }

    function moveImage(fromSelector, toSelector){
        const url = $(fromSelector).find('img').attr('src');
        $(toSelector).find('img').attr('src', url);
    }

    function setWidthAndHeight(blockSelector, widthAndHeight) {
        $(blockSelector).css('width', widthAndHeight);
        $(blockSelector).css('height', widthAndHeight);
    }
})