"use strict";

// イベント設定の為の要素の取得
const body        = document.querySelector('body');
const pointLeft   = document.querySelector('.point-left');
const pointRight  = document.querySelector('.point-right');
const dwnBtnLeft  = document.querySelector('.down-btn-left');
const dwnBtnRight = document.querySelector('.down-btn-right');
const upBtnLeft   = document.querySelector('.up-btn-left');
const upBtnRight  = document.querySelector('.up-btn-right');
const menuBtn     = document.querySelector('.menu-btn');
const menuBody    = document.querySelector('.menu-body');
const menuMask    = document.querySelector('.menu-mask');

// メニュー関連要素
const btnReset    = document.querySelector('#btn-reset');
const btnTheme    = document.querySelector('#btn-theme');
const btnSet      = document.querySelector('#btn-set');
const btnInfo     = document.querySelector('#btn-info');

// ポップアップ関連要素
const popupBody   = document.querySelector('.popup-body');
const btnYes      = document.querySelector('.btn-yes');
const btnCancel   = document.querySelector('.btn-cancel');

// テーマ選択関連要素
const selthemeBody = document.querySelector('.seltheme-body');

// テーマ名定義（★追加修正はここで）
const themeNames = ['default', 'peach', 'modern-pink'];

// テーマ選択要素の生成
themeNames.forEach(themeName => {
    const newElement = document.createElement('div');
    newElement.classList.add(themeName);
    selthemeBody.appendChild(newElement);
});

// テーマ選択要素の取得
const themes = [];
themeNames.forEach(themeName => {
    themes.push(document.querySelector('.seltheme-body>.' + themeName));
});



// 汎用アロー関数

const delayToggleClass = (elem, clsName, delayMSec = 400) => {
    elem.classList.add(clsName);
    setTimeout(() => {elem.classList.remove(clsName);}, delayMSec);
}

const chgType = {
    up: 1,
    down: -1
};

const changePoint = (clkElem, ptElem, chgType) => {
    let clsName = '';
    switch (chgType) {
        case 1:
            clsName = 'cntUp';
            break;
        case -1:
            clsName = 'cntDown';
            break;
        default:
            break;
    }
    clkElem.addEventListener('click', () => {
        let nowPoint = ptElem.innerHTML;
        ptElem.innerHTML = parseInt(nowPoint) + chgType;
        delayToggleClass(ptElem, clsName, 400);
    });
};



// クリックで +1 を行う
const points = [pointLeft, pointRight];
points.forEach(point => {
    point.innerHTML = 0; // 初期化
    delayToggleClass(point, 'cntUp', 400);
    changePoint(point, point, chgType.up);
});

// 画面上部のボタンをクリックで +1 を行う
const upBtns = [upBtnLeft, upBtnRight];
upBtns.forEach(upBtn => {
    upBtn.innerHTML = '+'; // 表示する文字
    let point = (upBtn === upBtnLeft) ? pointLeft : pointRight;
    changePoint(upBtn, point, chgType.up);
});

// 画面下部のボタンをクリックで -1 を行う
const dwnBtns = [dwnBtnLeft, dwnBtnRight];
dwnBtns.forEach(dwnBtn => {
    dwnBtn.innerHTML = '-'; // 表示する文字
    let point = (dwnBtn === dwnBtnLeft) ? pointLeft : pointRight;
    changePoint(dwnBtn, point, chgType.down);
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
        
        themeNames.forEach(themeName => {
            body.classList.remove('theme-' + themeName);
            if (theme.classList.contains(themeName)) {
                body.classList.add('theme-' + themeName);
            }
        });
    });
});


