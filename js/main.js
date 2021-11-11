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

// メニュー要素
const btnReset    = document.querySelector('#btn-reset');
const btnTheme    = document.querySelector('#btn-theme');
const btnSet      = document.querySelector('#btn-set');
const btnInfo     = document.querySelector('#btn-info');

const popupBody   = document.querySelector('.popup-body');
const btnYes      = document.querySelector('.btn-yes');
const btnCancel   = document.querySelector('.btn-cancel');

const selthemeBody = document.querySelector('.seltheme-body');
const themes =  [document.querySelector('.seltheme-body>.default')
                ,document.querySelector('.seltheme-body>.peach')
                ,document.querySelector('.seltheme-body>.modern-pink')
                ];

const body = document.querySelector('body');


// 汎用アロー関数
const delayToggleClass = (element, className, delayMSec = 400) => {
    element.classList.add(className);
    setTimeout(() => {element.classList.remove(className);}, delayMSec);
}



// クリックで +1 を行う
const points = [pointLeft, pointRight];
points.forEach(point => {
    // 初期化
    point.innerHTML = 0;
    delayToggleClass(point, 'cntUp', 400);
    
    point.addEventListener('click', () => {
        let nowPoint = point.innerHTML;
        point.innerHTML = parseInt(nowPoint) + 1;
        delayToggleClass(point, 'cntUp', 400);
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
        delayToggleClass(point, 'cntUp', 400);
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
        delayToggleClass(point, 'cntDown', 400);
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
    menuBtn.classList.remove('active');
    menuBody.classList.remove('show');
    menuMask.classList.remove('show');
    popupBody.classList.remove('show');
});

// リセットボタン押下
btnReset.addEventListener('click', () => {
    menuMask.classList.toggle('show');
    menuBtn.classList.toggle('active');
    popupBody.classList.add('show');
});

btnYes.addEventListener('click', () => {
    menuMask.classList.remove('show');
    menuBtn.classList.remove('active');
    popupBody.classList.remove('show');
    
    points.forEach(point => {
        point.innerHTML = 0;
        delayToggleClass(point, 'cntDown', 400);
    });
});

btnCancel.addEventListener('click', () => {
    menuMask.classList.remove('show');
    menuBtn.classList.remove('active');
    popupBody.classList.remove('show');
});


btnTheme.addEventListener('click', () => {
    menuMask.classList.remove('show');
    menuBtn.classList.remove('active');
    popupBody.classList.remove('show');
    
    selthemeBody.classList.add('show');
    
});



themes.forEach(theme => {
    theme.addEventListener('click', () => {
        menuMask.classList.remove('show');
        menuBtn.classList.remove('active');
        popupBody.classList.remove('show');
        selthemeBody.classList.remove('show');
        
        const themeNames = ['default', 'peach', 'modern-pink']
        themeNames.forEach(themeName => {
            body.classList.remove('theme-' + themeName);
            if (theme.classList.contains(themeName)) {
                body.classList.add('theme-' + themeName);
            }
        });
    });
});




