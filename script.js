'use strict'
window.onload = () => {
    let colors = ['red', 'orange', 'green', 'grey', 'magenta', 'blue', 'pink', 'brown', 'red', 'orange', 'green', 'grey', 'magenta', 'blue', 'pink', 'brown'];
    /// or use HEX
    //let colors = ['#FF0000', '#FF8000', '#FFFF00', '#40FF00', '#01DFD7', '#0000FF', '#FF00BF', '#071918', '#FF0000', '#FF8000', '#FFFF00', '#40FF00', '#01DFD7', '#0000FF', '#FF00BF', '#071918'];
    
    let play = false;

    document.body.onload = newField();

    function newField() {
        colors.sort(compareRandom);
        colors.forEach(function (color) {
            let borderElem = document.createElement('div');
            borderElem.className = 'border';
            let newElem = document.createElement('div');
            newElem.className = 'card';
            newElem.style.backgroundColor = color;
            newElem.style.opacity = 0;
            newElem.addEventListener('click', onClickCard);
            borderElem.appendChild(newElem);
            document.querySelector('.gameField').appendChild(borderElem);
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
    let selCard;
    let selColor;

    function onClickCard(e) {
        let card = e.target;

        if (play) {
            if (getComputedStyle(card).opacity == 0) {
                steps++;
                card.style.opacity = 1;

                setTimeout(() => {
                    if (check) {
                        check = false;
                        if (card.style.backgroundColor == selColor) {
                            openCards++;
                            if (openCards == 8) {
                                alert('Вы выиграли! Затраченное время: ' + timer.innerHTML);
                                resetTimer();
                            }
                        } else {

                            selCard.style.opacity = 0;
                            card.style.opacity = 0;
                        }
                    } else {
                        selCard = card;
                        selColor = card.style.backgroundColor;
                        check = true;
                    }
                }, 100);
            }
        }
    }

    //description timer

    let second = 0, minute = 0; hour = 0;
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

    document.querySelector('.startBtn').addEventListener('click', startGame);

    function startGame() {
        play = true;
        resetTimer();
        clearField();
        newField();
        startTimer();
    }
}
