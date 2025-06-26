$(document).ready(function () {
    let isGrabActive = false;
    let cursorPositionAtGrabMoment = [0, 0];
    init();

    $('.popup .header').on('mousedown', function (event) {
        $(this).css('cursor', 'grabbing');
        if (!isGrabActive) {
            isGrabActive = true;
            const top = $('.popup .content').css('top').replace('px', '') - 0;
            const left = $('.popup .content').css('left').replace('px', '') - 0;
            cursorPositionAtGrabMoment = [event.pageX - left, event.pageY - top];
        }

    });

    $('.popup .header').on('mouseup', function () {
        $(this).css('cursor', 'grab');
        isGrabActive = false;
    });

    $('.popup').on('mousemove', function (event) {
        if (isGrabActive) {
            console.log(cursorPositionAtGrabMoment);

            const [initialX, initialY] = cursorPositionAtGrabMoment;
            const difX = event.pageX - initialX;
            const difY = event.pageY - initialY;
            $('.popup .content').css('top', difY);
            $('.popup .content').css('left', difX);
        }
    })

    function init() {
        for (let i = 0; i < 10; i++) {
            const img = $(`<img class='image' src="images/girl-wide-0${i + 1}.jpg" />`)
            $('body > .content').append(img);
        }
    }
});