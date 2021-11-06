# simple-web-score

## 方針
Web Storage を使用する。





## 参考サイト集
### Web Storage
- [JavaScript Web Storageについて \- Qiita](https://qiita.com/smith-30/items/e200b246a9fc960cb52e)


### Sass
- [【vscode】『Live Sass Compiler』の\.cssの出力先変更設定（win10） \- Qiita](https://qiita.com/fukudamax/items/9c974415b0668516c39e)



## さまざまな手順

### liveSassCompile の CSS の出力先を変更する

1. 設定を開く
1. liveSassCompile.settings.formats を検索する
1. 上のタブ部分を「ワークスペース」にした後、「settings.json で編集」を押して、次の内容を追加する

```
    "liveSassCompile.settings.formats":[
        {
            "format": "expanded",
            "extensionName": ".css",
            "savePath": "/css"
        }
    ]
```



