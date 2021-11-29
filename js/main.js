"use strict";

// debug用ポイント初期値
const startPoint = 0;

// 初期値定義
const defPointSize = '20rem';

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

// メニュー関連要素
const btnReset    = document.querySelector('#btn-reset');
const btnTheme    = document.querySelector('#btn-theme');
const btnSet      = document.querySelector('#btn-set');
const btnInfo     = document.querySelector('#btn-info');

// ポップアップ関連要素
const popupBody   = document.querySelector('.popup-body');
const btnYes      = document.querySelector('.btn-yes');
const btnCancel   = document.querySelector('.btn-cancel');

// ポイントセット関連要素
const popupSetPointBody = document.querySelector('.popup-setpoint-body');
const leftIpt           = document.querySelector('#left-ipt');
const rightIpt          = document.querySelector('#right-ipt');
const okBtn             = document.querySelector('#ok-btn');
const cancelBtn         = document.querySelector('#cancel-btn');


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
    汎用オブジェクト
==================== */

const chgType = {up: 1, down: -1};


/* ====================
       汎用関数
==================== */

/**
 * rem単位をpx単位に変換する
 * @param rem rem単位のサイズを表す文字列
 * @return px単位のサイズを表す数値
 */
function convertRemToPx(rem) {
    const fontSize = getComputedStyle(document.documentElement).fontSize;
    return rem * parseFloat(fontSize);
}

/**
 * px単位をrem単位に変換する
 * @param px px単位のサイズを表す文字列
 * @return rem単位のサイズを表す数値
 */
function convertPxToRem(px) {
    const fontSize = getComputedStyle(document.documentElement).fontSize;
    return px / parseFloat(fontSize);
}




/* ====================
    汎用アロー関数
==================== */

const aryMax = (a, b) => Math.max(a, b);
const aryMin = (a, b) => Math.min(a, b);

const delayToggleClass = (elem, clsName, delayMSec = 400) => {
    elem.classList.add(clsName);
    setTimeout(() => {elem.classList.remove(clsName);}, delayMSec);
};

const digitToRemSize = digitVal => {
    return 20 - (6 * (2 - Math.pow(0.5, digitVal - 4)));
};

const resizePoint = () => {
    const points = [pointLeft, pointRight];
    const pointSizes = [];
    points.forEach(point => {
        const nowPointStrCnt = point.textContent.length;
        const newPointSize = nowPointStrCnt >= 4 ? digitToRemSize(nowPointStrCnt) + 'rem' : defPointSize;
        point.style.fontSize = newPointSize;
        pointSizes.push(parseFloat(newPointSize));
    });
    const maxPointSize = pointSizes.reduce(aryMax);
    pointCenter.style.fontSize = maxPointSize + 'rem';
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
        resizePoint();
    });
};


/* ====================
    処理定義
==================== */

window.addEventListener('load', () => {
    resizePoint();
});


// クリックで +1 を行う
const points = [pointLeft, pointRight];
points.forEach(point => {
    point.innerHTML = startPoint; // 初期化
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
    popupSetPointBody.classList.remove('show');
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



// セットボタン押下
btnSet.addEventListener('click', () => {
    menuMask.classList.toggle('show');
    menuBtn.classList.toggle('active');
    popupSetPointBody.classList.add('show');
    
    leftIpt.value = pointLeft.textContent;
    rightIpt.value = pointRight.textContent;
    
});

okBtn.addEventListener('click', () => {
    menuMask.classList.remove('show');
    menuBtn.classList.remove('active');
    popupSetPointBody.classList.remove('show');
    
    // ポイント適用
    pointLeft.innerHTML  = isNaN(parseInt(leftIpt.value)) ? 0 : parseInt(leftIpt.value);
    pointRight.innerHTML = isNaN(parseInt(rightIpt.value)) ? 0 : parseInt(rightIpt.value);
    points.forEach(point => {
        delayToggleClass(point, 'cntDown', 400);
    });
    resizePoint();
});

cancelBtn.addEventListener('click', () => {
    menuMask.classList.remove('show');
    menuBtn.classList.remove('active');
    popupSetPointBody.classList.remove('show');
});




