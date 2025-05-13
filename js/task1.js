$(document).ready(function () {

    $('.task-1 .do').click(function () {
        const array = [1, 5, 7, 89, 4, 12];
        const resultArray = [];

        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element > 10) {
                resultArray.push(element);
            }
        }

        $('.task-1 .result').text(resultArray);
    });

    $('.task-2 .do').click(function () {
        const userValue = $('.task-2 .user-input').val(); // abac
        const arrayOfSymbols = userValue.split(''); // ['a','b','a','c']

        const listWithSymbolsAndCount = [];
        for (let i = 0; i < arrayOfSymbols.length; i++) {
            const symbol = arrayOfSymbols[i]; // 'a'

            const goodObj = listWithSymbolsAndCount
                .find(obj => obj.s == symbol); // {s: 'q', c: 1}
            if (goodObj != undefined) {
                goodObj.c++;
            } else {
                const newGoodObj = {
                    s: symbol,
                    c: 1
                };
                listWithSymbolsAndCount.push(newGoodObj);
            }
        }

        let answer = '';
        for (let index = 0; index < listWithSymbolsAndCount.length; index++) {
            const obj = listWithSymbolsAndCount[index];

            answer += `${obj.s}: ${obj.c}; `
        }

        $('.task-2 .result').text(answer);
    });

    let images = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwctyTE48aLTh8txv4Tsdg53zap46VGvZJoA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ix09HQuQHM0q-OPQBUhJAW8X-mhHS9EPOQ&s'
    ];

    $('.task-3 .do').click(function () {
        const newUrl = $('.task-3 .user-input').val();
        images.push(newUrl);
        $('.task-3 .result').empty();
        for (let i = 0; i < images.length; i++) {
            const url = images[i];
            const img = $('<img>');
            img.attr('src', url);
            $('.task-3 .result').append(img);
        }
    });

});