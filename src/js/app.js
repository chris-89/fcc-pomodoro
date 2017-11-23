'use strict';
import $ from 'jquery';

const pomodoro = (function() {
    let seshCount = 25,
        breakCount = 5,
        seshID,
        breakID;

    const render = () => {
        seshTime.text(seshCount);
        breakTime.text(breakCount);
    };

    //-----cache dom elements

    const seshTime = $('#session-time'),
        breakTime = $('#break-time'),
        minus = $('.icon-minus'),
        plus = $('.icon-plus'),
        start = $('#start'),
        reset = $('#reset');

    // render the timer values
    render();
    //----- functions

    let reduceTime = (event) => {
        if (event.currentTarget.className.indexOf('session') !== -1) {
            seshCount--;
        } else {
            breakCount--;
        }
        render();
    };

    const increaseTime = (event) => {
        if (event.currentTarget.className.indexOf('session') !== -1) {
            seshCount++;
        } else {
            breakCount++;
        }
        render();
    };

    const countDown = () => {
        seshID = setInterval(() => {
            seshCount--;
            render();
            if (seshCount === 0) {
                clearInterval(seshID);
                resetTime.seshReset();
                breakID = setInterval(() => {
                    breakCount--;
                    render();

                    if (breakCount === 0) {
                        clearInterval(breakID);
                        resetTime.breakReset();
                        render();
                    }
                }, 300);
            }
        }, 300);
    };
    const resetTime = {
        clearInterval(seshID);
        clearInterval(breakID);
        seshReset: () => {
            seshCount = 25;
        },
        breakReset: () => {
            breakCount = 5;
        },
        all: function() {
            seshCount = 25;
            breakCount = 5;
            clearInterval(seshID);
            clearInterval(breakID);
            render();
        }
    };

    //----- bind events
    minus.click(reduceTime);
    plus.click(increaseTime);
    start.click(countDown);
    reset.click(resetTime.all);

    //-----api to return
    return {
        init: render,
        reduceTime: reduceTime,
        increaseTime: increaseTime
    };
})();
