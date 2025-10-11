# 🔒 APIキーの安全な管理方法

## ファイル構成

```
musicgame/
├── mobile-music.html    # メインアプリ
├── config.js            # APIキー設定（.gitignoreで除外）
├── config.sample.js     # サンプル設定ファイル
└── .gitignore          # Git除外設定
```

## セットアップ手順

### 1. config.jsファイルを作成

`config.sample.js` をコピーして `config.js` にリネームしてください。

### 2. APIキーを設定

`config.js` を開いて、`YOUR_API_KEY_HERE` の部分をあなたのAPIキーに置き換えます。

```javascript
const CONFIG = {
    YOUTUBE_API_KEY: 'AIzaSyAubPfKVpT9cJNEjH--8LqzPuy39Usy83Q'
};
```

### 3. セキュリティ確保

- ✅ `config.js` は `.gitignore` に含まれているため、Gitにコミットされません
- ✅ APIキーが外部に公開されることはありません
- ✅ 他の人と共有する際は `config.sample.js` を渡してください

## ⚠️ 重要な注意事項

### クライアントサイドの制限

このアプリは **クライアントサイド（ブラウザ）** で動作するため、完全にAPIキーを隠すことはできません。


### なぜ完全には隠せないのか？

- ブラウザで実行されるJavaScriptは、誰でも見ることができます
- Developer Toolsでネットワークリクエストを見ればAPIキーが見えます
- 外部ファイル（config.js）にしても、技術的には同じです

### より安全にする方法

#### 1. **APIキーの使用制限を設定**（推奨）

Google Cloud Consoleで以下を設定してください：

- **HTTPリファラー制限**: 特定のドメインからのみ使用可能に
- **API制限**: YouTube Data API v3のみに制限
- **クォータ設定**: 1日あたりの使用量を制限

#### 2. **本当に安全にしたい場合**

バックエンドサーバーが必要です：

```
ブラウザ → バックエンドサーバー → YouTube API
         （APIキー保持）
```

- Node.js + Express
- Python + Flask
- などのサーバーサイドアプリケーション

## 🎯 このアプリの想定用途

- **個人利用**: 自分だけで使う（最も安全）
- **小規模グループ**: 友人・家族と共有
- **ローカルネットワーク**: 同じWi-Fi内で使用

## ❌ 避けるべき使い方

- 公開Webサイトにアップロード
- 不特定多数への配布
- 商用利用

## 📋 チェックリスト

- [ ] `config.js` を作成した
- [ ] 実際のAPIキーを設定した
- [ ] `.gitignore` で除外されていることを確認
- [ ] Google Cloud ConsoleでAPI制限を設定
- [ ] 使用クォータを確認

これで安全に使えます！ 🎵
