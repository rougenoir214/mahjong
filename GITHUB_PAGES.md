# 🌐 GitHub Pagesでの安全な使用方法

## 🎯 推奨される使い方

### オプション1: 個人使用（最も簡単）

1. **初回アクセス時に`setup.html`を開く**
2. **APIキーを入力** （一度だけ）
3. **自動的に保存されて`mobile-music.html`に移動**

#### メリット
- ✅ config.jsをGitにコミットしない
- ✅ APIキーはあなたのブラウザにのみ保存
- ✅ 簡単セットアップ

#### デメリット
- ⚠️ 各ユーザーがAPIキーを入力する必要がある
- ⚠️ DevToolsを開けばAPIキーは見える

---

### オプション2: 友人とシェア（公開リポジトリ用）

#### ステップ1: リポジトリから`config.js`を削除

```bash
# check-security.batを実行して確認
check-security.bat

# もしconfig.jsがコミットされていたら
remove-config-from-git.bat
```

#### ステップ2: 古いAPIキーを無効化

1. Google Cloud Console → 認証情報
2. 現在のAPIキーを削除
3. 新しいAPIキーを作成

#### ステップ3: 使い方を説明

友人には以下を伝える：

```
1. https://[あなたのユーザー名].github.io/[リポジトリ名]/setup.html にアクセス
2. 自分のAPIキーを入力
3. 自動的にクイズが開始
```

---

## ⚠️ 重要な制限

### クライアントサイドの本質的な問題

GitHub Pagesで公開されるアプリは**全てブラウザで実行**されます：

| 状況 | APIキーの安全性 |
|------|----------------|
| ローカルで使用 | ⭐⭐⭐ 安全 |
| GitHub Pages + setup.html | ⭐⭐ まあまあ |
| config.jsをコミット | ❌ 危険 |

### 完全には隠せない理由

- ブラウザのDevToolsで見える
- ネットワークタブでAPIリクエストが見える
- JavaScriptは暗号化できない

---

## 🛡️ API制限で保護する

最も重要なのは**Google CloudでAPIキーを制限すること**です：

### 1. HTTPリファラー制限

```
許可するリファラー:
https://[あなたのユーザー名].github.io/*
```

### 2. API制限

```
使用できるAPI:
YouTube Data API v3 のみ
```

### 3. クォータ設定

```
1日あたりの上限:
10,000クエリ（デフォルト）
```

詳しくは `API_SECURITY.md` を参照

---

## 🚀 デプロイ手順

### 1. セキュリティチェック

```bash
# config.jsがコミットされていないか確認
git status
git ls-files | findstr config.js

# 結果が空ならOK
```

### 2. .gitignoreを確認

```.gitignore
config.js  ← この行があることを確認
```

### 3. GitHubにプッシュ

```bash
git add .
git commit -m "Add intro quiz app with secure API key handling"
git push origin main
```

### 4. GitHub Pages設定

1. GitHubリポジトリ → Settings
2. Pages → Source: `main` branch
3. Save

### 5. 初回アクセス

```
https://[あなたのユーザー名].github.io/[リポジトリ名]/setup.html
```

---

## 📋 チェックリスト

デプロイ前に確認：

- [ ] `config.js`がGitにコミットされていない
- [ ] `.gitignore`に`config.js`が含まれている
- [ ] `setup.html`が正常に動作する
- [ ] Google CloudでAPI制限を設定済み
- [ ] 古いAPIキーを無効化済み（漏洩していた場合）

---

## 🆘 トラブルシューティング

### Q: config.jsを既にコミットしてしまった

```bash
# 履歴から完全削除
remove-config-from-git.bat

# Google CloudでAPIキーを削除
# 新しいAPIキーを作成
```

### Q: .gitignoreが効かない

```bash
# キャッシュをクリア
git rm --cached config.js
git commit -m "Remove config.js from tracking"
git push
```

### Q: 他の人も使えるようにしたい

各ユーザーが`setup.html`で自分のAPIキーを設定する必要があります。

または、バックエンドサーバーを構築してAPIキーをサーバー側で管理してください。

---

## 🎯 まとめ

### ✅ やること

1. `config.js`をGitから除外
2. `setup.html`でAPIキーを入力
3. Google CloudでAPI制限を設定

### ❌ やらないこと

1. `config.js`をGitにコミット
2. APIキーを公開リポジトリに含める
3. API制限なしで公開

これで比較的安全に使えます！ 🎵
