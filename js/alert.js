$(document).ready(function () {
    const animationTimeSeconds = 2;
    const autoHideTimeSeconds = 600000;
    const images = [];
    let alertWithImage = false;

    $(".do").click(function () {
        const alertContainer = $(".alert-container.template").clone();
        alertContainer.click(hideAlert);
        alertContainer.removeClass('template');

        const alert = alertContainer.find('.alert');
        if (alertWithImage) {
            const randomImage = getRandomImageSrc();
            alert.append($(`<img src='${randomImage}' />`));
            alert.css('justify-content', 'center')
        } else {
            const text = $('.alert-text').val();
            alert.text(text);
            $('.alert-text').val('');
        }

        const additionalClass = $('.alert-type').val();
        alert.addClass(additionalClass);

        alertContainer.css('animation', `show-alert ${animationTimeSeconds}s both`);
        $('.alerts').append(alertContainer);

        subscribeTo(alertContainer[0]);
        
        setTimeout(() => {
            alertContainer.click();
        }, autoHideTimeSeconds * 1000);
    });

    function hideAlert() {
        const currentAlert = $(this);
        currentAlert.css('animation', `hide-alert ${animationTimeSeconds}s both`);
        setTimeout(() => {
            currentAlert.remove();
        }, animationTimeSeconds * 1000);
    }

    // Just for fun
    init();

    function init() {
        for (let i = 0; i < 5; i++) {
            images.push(`images/girl-wide-0${i + 1}.jpg`);
        }

        for (let i = 0; i < 9; i++) {
            images.push(`images/girl0${i + 1}.jpg`);
        }


    }

    function getRandomImageSrc() {
        const index = getRandom(images.length);
        return images[index];
    }

    function getRandom(max) {
        return Math.floor(Math.random() * max);
    }

    $('.with-images').change(function () {
        $('.alert-info').toggle();
        alertWithImage = !alertWithImage;
    })

    const callback = function (entities, b) {
        entities.forEach(entity => {
            if (entity.boundingClientRect.top < 0){
                $(entity.target).click();
            }
        });
        console.log(this, entities, b);
    }

    const observer = new IntersectionObserver(
        callback,
        {
            threshold: 1.0,
        });
    function subscribeTo(observed) {
        observer.observe(observed);
    }
});