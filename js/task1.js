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

        let answer = '';
        for (let i = 0; i < arrayOfSymbols.length; i++) {
            const symbol = arrayOfSymbols[i]; // 'a'
            // ???
            // answer += ???
        }

        $('.task-2 .result').text(answer);
    });
});