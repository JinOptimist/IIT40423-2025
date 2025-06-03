$(document).ready(function () {
    const fullSize = 300;
    const halfSize = 150;
    const animationSpeed = 2;
    const images = [];
    let centerImageIndex = 3;

    initImages();
    setAllSizeToDefault();

    $('.next').click(function () {
        centerImageIndex = getSafeIndex(centerImageIndex + 1);
        
        $('.dot').removeClass('active')
        $(`.dot[data-number=${centerImageIndex}]`).addClass('active');

        // run animation
        setWidthAndHeight('.prev', 0);
        setWidthAndHeight('.center', halfSize);
        setWidthAndHeight('.next', fullSize);
        setWidthAndHeight('.after-next', halfSize);

        // return to initial state
        setTimeout(setAllSizeToDefault, animationSpeed * 1000);
    });

    $('.prev').click(function () {
        centerImageIndex = getSafeIndex(centerImageIndex - 1);

        $('.dot').removeClass('active')
        $(`.dot[data-number=${centerImageIndex}]`).addClass('active');

        // run animation
        setWidthAndHeight('.before-prev', halfSize);
        setWidthAndHeight('.prev', fullSize);
        setWidthAndHeight('.center', halfSize);
        setWidthAndHeight('.next', 0);

        // return to initial state
        setTimeout(setAllSizeToDefault, animationSpeed * 1000);
    });

    function initImages() {
        for (let i = 0; i < 5; i++) {
            images.push(`images/girl-wide-0${i + 1}.jpg`);
        }

        for (let i = 0; i < 9; i++) {
            images.push(`images/girl0${i + 1}.jpg`);
        }

        for (let i = 0; i < images.length; i++) {
            const dotTag = $(`<i class='dot' data-number=${i}></i>`)
            $('.dots').append(dotTag);
        }
    }

    function setAllSizeToDefault() {
        $('.image-container').css('transition', 'none');

        setWidthAndHeight('.before-prev', 0);
        setWidthAndHeight('.prev', halfSize);
        setWidthAndHeight('.center', fullSize);
        setWidthAndHeight('.next', halfSize);
        setWidthAndHeight('.after-next', 0);

        moveAllImages();

        setTimeout(function () {
            $('.image-container').css('transition', `all ${animationSpeed}s`);
        }, 100);
    }

    function moveAllImages() {
        // moveImage('.prev', '.before-prev');
        // moveImage('.center', '.prev');
        // moveImage('.next', '.center');
        // moveImage('.after-next', '.next');

        setImageByIndex('.before-prev', centerImageIndex - 2);
        setImageByIndex('.prev', centerImageIndex - 1);
        setImageByIndex('.center', centerImageIndex);
        setImageByIndex('.next', centerImageIndex + 1);
        setImageByIndex('.after-next', centerImageIndex + 2);
    }

    function setImageByIndex(selector, index) {
        const safeIndex = getSafeIndex(index);
        const url = images[safeIndex];
        $(selector).find('img').attr('src', url);
    }

    function getSafeIndex(index) {
        if (index >= images.length) {
            return index - images.length;
        }

        if (index < 0) {
            return index + images.length;
        }

        return index;
    }

    function moveImage(fromSelector, toSelector) {
        const url = $(fromSelector).find('img').attr('src');
        $(toSelector).find('img').attr('src', url);
    }

    function setWidthAndHeight(blockSelector, widthAndHeight) {
        $(blockSelector).css('width', widthAndHeight);
        $(blockSelector).css('height', widthAndHeight);

        if (widthAndHeight == 0) {
            $(blockSelector).css('margin', 0);
        } else {
            $(blockSelector).css('margin', 5);
        }


    }
})