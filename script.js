'use strict'
window.onload = () => {
    let play = false;
    let colors = ['red', 'orange', 'green', 'grey', 'magenta', 'blue', 'pink', 'brown', 'red', 'orange', 'green', 'grey', 'magenta', 'blue', 'pink', 'brown'];
    /// or use HEX
    //let colors = ['#FF0000', '#FF8000', '#FFFF00', '#40FF00', '#01DFD7', '#0000FF', '#FF00BF', '#071918', '#FF0000', '#FF8000', '#FFFF00', '#40FF00', '#01DFD7', '#0000FF', '#FF00BF', '#071918'];

    document.body.onload = newField();
    document.querySelector('.startBtn').addEventListener('click', startGame);

    function startGame() {
        play = true;
        resetTimer();
        clearField();
        newField();
        startTimer();
    }
   
    function newField() {
        colors.sort(compareRandom);
        colors.forEach(function (color) {
            let border = document.createElement('div');
            border.className = 'border';
            let card = document.createElement('div');
            card.className = 'card';
            card.classList.add('hidden');
            card.style.backgroundColor = color;
            card.addEventListener('click', onClickCard);
            border.appendChild(card);
            document.querySelector('.gameField').appendChild(border);
        })
    }

    function compareRandom(a, b) {
        return Math.random() - 0.5;
    }

    function clearField() {
        let parent = document.querySelector('.gameField');
        while (parent.firstChild) {
            parent.firstChild.remove();
        };
    }

    let check = false;
    let openCards = 0;
    let steps = 0;
    let openCard;
    let openColor;

    function onClickCard(e) {
        let selCard = e.target;

        if (play) {
            if (selCard.classList.contains('hidden')) {
                selCard.classList.remove('hidden')
                steps++;
                console.log(steps);

                setTimeout(() => {
                    if (check) {
                        check = false;
                        if (selCard.style.backgroundColor == openColor) {
                            openCards++;
                            if (openCards == 8) {
                                alert('Вы выиграли! Затраченное время: ' + timer.innerHTML);
                                resetTimer();
                            }
                        } else {

                            selCard.classList.add('hidden');
                            openCard.classList.add('hidden');
                        }
                    } else {
                        openCard = selCard;
                        openColor = selCard.style.backgroundColor;
                        check = true;
                    }
                }, 100);
            }
        }
    }

    //description timer

    let second = 0, minute = 0, hour = 0;
    let timer = document.querySelector('.timer');
    let interval;

    function startTimer() {
        interval = setInterval(function () {
            timer.innerHTML = minute + ":" + second;
            second++;
            if (second == 60) {
                minute++;
                second = 0;
            }
            if (minute == 60) {
                hour++;
                minute = 0;
            }
        }, 1000);
    }

    function resetTimer() {
        second = 0;
        minute = 0;
        hour = 0;
        timer.innerHTML = "0:0";
        clearInterval(interval);
    }
}
