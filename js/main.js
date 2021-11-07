"use strict";

// イベント設定の為の要素の取得
const pointLeft   = document.querySelector('.point-left');
const pointRight  = document.querySelector('.point-right');
const dwnBtnLeft  = document.querySelector('.down-btn-left');
const dwnBtnRight = document.querySelector('.down-btn-right');
const upBtnLeft   = document.querySelector('.up-btn-left');
const upBtnRight  = document.querySelector('.up-btn-right');

// クリックで +1 を行う
const points = [pointLeft, pointRight]
points.forEach(point => {
    point.innerHTML = 0; // 初期値
    point.addEventListener('click', () => {
        let nowPoint = point.innerHTML
        point.innerHTML = parseInt(nowPoint) + 1
    });
});

// 画面上部のボタンをクリックで +1 を行う
const upBtns = [upBtnLeft, upBtnRight]
upBtns.forEach(upBtn => {
    upBtn.innerHTML = '+'; // 表示する文字
    let point = (upBtn === upBtnLeft) ? pointLeft : pointRight;
    upBtn.addEventListener('click', () => {
        let nowPoint = point.innerHTML
        point.innerHTML = parseInt(nowPoint) + 1
    });
});

// 画面下部のボタンをクリックで -1 を行う
const dwnBtns = [dwnBtnLeft, dwnBtnRight]
dwnBtns.forEach(dwnBtn => {
    dwnBtn.innerHTML = '-'; // 表示する文字
    let point = (dwnBtn === dwnBtnLeft) ? pointLeft : pointRight;
    dwnBtn.addEventListener('click', () => {
        let nowPoint = point.innerHTML
        point.innerHTML = parseInt(nowPoint) - 1
    });
});


