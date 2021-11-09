"use strict";

// イベント設定の為の要素の取得
const pointLeft   = document.querySelector('.point-left');
const pointRight  = document.querySelector('.point-right');
const dwnBtnLeft  = document.querySelector('.down-btn-left');
const dwnBtnRight = document.querySelector('.down-btn-right');
const upBtnLeft   = document.querySelector('.up-btn-left');
const upBtnRight  = document.querySelector('.up-btn-right');
const menuBtn     = document.querySelector('.menu-btn');
const menuBody    = document.querySelector('.menu-body');
const menuMask    = document.querySelector('.menu-mask');
const btnReset    = document.querySelector('#btn-reset');
const btnTheme    = document.querySelector('#btn-theme');
const btnSet      = document.querySelector('#btn-set');


// クリックで +1 を行う
const points = [pointLeft, pointRight];
points.forEach(point => {
    // 初期化
    point.innerHTML = 0;
    point.classList.add('cntUp');
    setTimeout(() => {point.classList.remove('cntUp');}, 400);
    
    point.addEventListener('click', () => {
        let nowPoint = point.innerHTML;
        point.innerHTML = parseInt(nowPoint) + 1;
        point.classList.add('cntUp');
        setTimeout(() => {point.classList.remove('cntUp');}, 400);
    });
});

// 画面上部のボタンをクリックで +1 を行う
const upBtns = [upBtnLeft, upBtnRight];
upBtns.forEach(upBtn => {
    upBtn.innerHTML = '+'; // 表示する文字
    let point = (upBtn === upBtnLeft) ? pointLeft : pointRight;
    
    upBtn.addEventListener('click', () => {
        let nowPoint = point.innerHTML;
        point.innerHTML = parseInt(nowPoint) + 1;
        point.classList.add('cntUp');
        setTimeout(() => {point.classList.remove('cntUp');}, 400);
    });
});

// 画面下部のボタンをクリックで -1 を行う
const dwnBtns = [dwnBtnLeft, dwnBtnRight];
dwnBtns.forEach(dwnBtn => {
    dwnBtn.innerHTML = '-'; // 表示する文字
    let point = (dwnBtn === dwnBtnLeft) ? pointLeft : pointRight;
    
    dwnBtn.addEventListener('click', () => {
        let nowPoint = point.innerHTML;
        point.innerHTML = parseInt(nowPoint) - 1;
        point.classList.add('cntDown');
        setTimeout(() => {point.classList.remove('cntDown');}, 400);
    });
});


// メニューボタン切り替え
const toggleMenu = () => {
    menuBtn.classList.toggle('active');
    menuBody.classList.toggle('show');
    menuMask.classList.toggle('show');
}


menuBtn.addEventListener('click', () => {
    toggleMenu();
});

menuBody.addEventListener('click', () => {
    toggleMenu();
});

menuMask.addEventListener('click', () => {
    toggleMenu();
});

btnReset.addEventListener('click', () => {
    // リセット
    points.forEach(point => {point.innerHTML = 0;});
});


