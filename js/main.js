"use strict";

// 初期値定義
const defaultPointRemSize = '20';

// WEBストレージオブジェクト (ローカル)
const strg = localStorage;

// イベント設定の為の要素の取得
const body        = document.querySelector('body');
const pointLeft   = document.querySelector('.point-left');
const pointRight  = document.querySelector('.point-right');
const pointCenter = document.querySelector('.point-center');
const dwnBtnLeft  = document.querySelector('.down-btn-left');
const dwnBtnRight = document.querySelector('.down-btn-right');
const upBtnLeft   = document.querySelector('.up-btn-left');
const upBtnRight  = document.querySelector('.up-btn-right');
const menuBtn     = document.querySelector('.menu-btn');
const menuBody    = document.querySelector('.menu-body');
const menuMask    = document.querySelector('.menu-mask');
const splash      = document.querySelector('#splash');
const splashLogo  = document.querySelector('#splash-logo');


// メニュー関連要素
const menuBtns = {
     reset: document.querySelector('#btn-reset')
    ,theme: document.querySelector('#btn-theme')
    ,set:   document.querySelector('#btn-set')
    ,info:  document.querySelector('#btn-info')
}

// ポップアップ関連要素
const resetPopup  = document.querySelector('.reset-pu');
const resetPuBtns = {
    ok: document.querySelector('.reset-pu .ok-btn')
   ,cancel: document.querySelector('.reset-pu .cancel-btn')
}

// ポイントセット関連要素
const popupSetPoint = document.querySelector('.set-pnt-pu');
const leftIpt       = document.querySelector('#left-ipt');
const rightIpt      = document.querySelector('#right-ipt');
const setPntPuBtns  = {
     ok:     document.querySelector('.set-pnt-pu .ok-btn')
    ,cancel: document.querySelector('.set-pnt-pu .cancel-btn')
}

// info関連要素
const infoPopup  = document.querySelector('.info-pu');
const infoPuBtns = {
    ok: document.querySelector('.info-pu .ok-btn')
}

// テーマ選択関連要素
const selthemeBody = document.querySelector('.seltheme-body');

// テーマ名定義（★追加修正はここで行う）
const themeNames = ['default'
                    ,'peach'
                    ,'modern-pink'
                    ,'plum-plate'
                    ];

// テーマ選択要素の生成と格納
const themes = [];
themeNames.forEach(themeName => {
    const newElement = document.createElement('div');
    newElement.classList.add(themeName);
    themes.push(selthemeBody.appendChild(newElement));
});


/* ====================
      関数類定義
==================== */
const chgType = {up: 1, down: -1};
const aryMax = (a, b) => Math.max(a, b);
const aryMin = (a, b) => Math.min(a, b);

function delayToggleClass(elem, clsName, delayMSec = 400) {
    elem.classList.add(clsName);
    setTimeout(() => {elem.classList.remove(clsName);}, delayMSec);
}

const digitToRemSize = digitVal => 20 - (6 * (2 - Math.pow(0.5, digitVal - 4)));

function resizePoint() {
    const points = [pointLeft, pointRight];
    const pointSizes = [];
    points.forEach(point => {
        const nowPointStrCnt = point.textContent.length;
        const newPointSize = nowPointStrCnt >= 4 ? digitToRemSize(nowPointStrCnt) : defaultPointRemSize;
        pointSizes.push(newPointSize);
    });
    const minPointSize = pointSizes.reduce(aryMin);
    points.push(pointCenter);
    points.forEach(point => point.style.fontSize = minPointSize + 'rem');
}

function savePointToStrg(ptElem) {
    switch (ptElem) {
        case pointLeft:
            strg.setItem('leftPoint', pointLeft.innerHTML);
            break;
        case pointRight:
            strg.setItem('rightPoint', pointRight.innerHTML);
            break;
        default:
            break;
    }
}

function changePoint(clkElem, ptElem, chgType) {
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
        resizePoint();
        savePointToStrg(ptElem);
    });
}

function loadThemeFromStrg() {
    // const startTheme = strg.getItem('theme') ?? 'default';
    // 古いバージョンのiPhone対策
    const startTheme = !(strg.getItem('theme')) ? 0 : strg.getItem('theme');
    themeNames.forEach(themeName => body.classList.remove('theme-' + themeName));
    body.classList.add('theme-' + startTheme);
}

const saveThemeToStrg = (themeName) => strg.setItem('theme', themeName);


/* ====================
    処理定義
==================== */

window.addEventListener('load', () => {
    const delayTime = 800;
    setTimeout(() => {
        splash.classList.add('hide');
        splashLogo.classList.add('hide');
    }, delayTime);
    setTimeout(() => {
        splash.style.display = 'none';
        // splashLogo.style.display = 'none';
    }, delayTime + 200);
    
    resizePoint();
    loadThemeFromStrg();
});

// ポイントをWebStrageから初期化
// pointLeft.innerHTML = strg.getItem('leftPoint') ?? 0;
// pointRight.innerHTML = strg.getItem('rightPoint') ?? 0;
// 古いバージョンのiPhone対策
pointLeft.innerHTML = !(strg.getItem('leftPoint')) ? 0 : strg.getItem('leftPoint');
pointRight.innerHTML = !(strg.getItem('rightPoint')) ? 0 : strg.getItem('rightPoint');

// クリックで +1 を行う
const points = [pointLeft, pointRight];
points.forEach(point => {
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
    resetPopup.classList.remove('show');
    popupSetPoint.classList.remove('show');
    infoPopup.classList.remove('show');
});

// リセットボタン押下
menuBtns.reset.addEventListener('click', () => {
    menuMask.classList.toggle('show');
    menuBtn.classList.toggle('active');
    resetPopup.classList.add('show');
});

resetPuBtns.ok.addEventListener('click', () => {
    // WebStrageを空にした上でページをリロード
    strg.clear();
    location.reload();
});

resetPuBtns.cancel.addEventListener('click', () => {
    menuMask.classList.remove('show');
    menuBtn.classList.remove('active');
    resetPopup.classList.remove('show');
});

menuBtns.theme.addEventListener('click', () => {
    menuMask.classList.remove('show');
    menuBtn.classList.remove('active');
    resetPopup.classList.remove('show');
    selthemeBody.classList.add('show');
});

themes.forEach(theme => {
    theme.addEventListener('click', () => {
        menuMask.classList.remove('show');
        menuBtn.classList.remove('active');
        resetPopup.classList.remove('show');
        selthemeBody.classList.remove('show');
        
        themeNames.forEach(themeName => {
            body.classList.remove('theme-' + themeName);
            if (theme.classList.contains(themeName)) {
                body.classList.add('theme-' + themeName);
                saveThemeToStrg(themeName);
            }
        });
    });
});


// セットボタン押下
menuBtns.set.addEventListener('click', () => {
    menuMask.classList.toggle('show');
    menuBtn.classList.toggle('active');
    popupSetPoint.classList.add('show');
    
    leftIpt.value = pointLeft.textContent;
    rightIpt.value = pointRight.textContent;
    
});

setPntPuBtns.ok.addEventListener('click', () => {
    menuMask.classList.remove('show');
    menuBtn.classList.remove('active');
    popupSetPoint.classList.remove('show');
    
    // ポイント適用
    pointLeft.innerHTML  = isNaN(parseInt(leftIpt.value)) ? 0 : parseInt(leftIpt.value);
    pointRight.innerHTML = isNaN(parseInt(rightIpt.value)) ? 0 : parseInt(rightIpt.value);
    points.forEach(point => {
        delayToggleClass(point, 'cntDown', 400);
    });
    resizePoint();
    savePointToStrg(pointLeft);
    savePointToStrg(pointRight);
});

setPntPuBtns.cancel.addEventListener('click', () => {
    menuMask.classList.remove('show');
    menuBtn.classList.remove('active');
    popupSetPoint.classList.remove('show');
});



// リセットボタン押下
menuBtns.info.addEventListener('click', () => {
    menuMask.classList.toggle('show');
    menuBtn.classList.toggle('active');
    infoPopup.classList.add('show');
});

infoPuBtns.ok.addEventListener('click', () => {
    menuMask.classList.remove('show');
    menuBtn.classList.remove('active');
    infoPopup.classList.remove('show');
});

