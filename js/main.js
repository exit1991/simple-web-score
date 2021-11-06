"use strict";


// 要素の取得
const leftPoint  = document.querySelector('.left-point');
const rightPoint = document.querySelector('.right-point');

// ポイントに対しての初期化とイベント設定
const points = [leftPoint, rightPoint]
points.forEach(point => {
    // 初期化
    point.innerHTML = 0;
    
    // 押下時の処理
    point.addEventListener('click', () => {
        let nowPoint = point.innerHTML
        point.innerHTML = parseInt(nowPoint) + 1
    });
    
});


