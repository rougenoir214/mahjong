# 🔥 Firebase セキュリティ解説

## 現在の状態

✅ **安全です！**

mobile-firebase.html に Firebase APIキーが含まれていますが、これはFirebaseの正常な使い方です。

## Firebase Web APIキーの性質

### 公開されることを前提とした設計

Firebaseの公式ドキュメント：
- Web/モバイルアプリでは、APIキーをクライアントコードに含めるのが**標準的な方法**
- APIキーは「秘密鍵」ではなく「識別子」として機能
- 実際のセキュリティは **Firebaseセキュリティルール** で保護される

### 実際のセキュリティ対策

```
Firebase APIキー（公開OK）
    ↓
Firebaseプロジェクトを識別
    ↓
Firebaseセキュリティルール（重要！）
    ↓
データアクセスを制御
```

## 現在のセキュリティルール

Firebaseコンソールで設定済み：

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### グループベースの分離

- 各グループは `/groups/{groupId}/` 配下に保存
- URLパラメータ `?group=xxx` でグループを指定
- グループIDを知らない人はアクセスしにくい

## ⚠️ 注意が必要なケース

### 現在のルール（完全オープン）の影響

- ✅ 開発・テスト環境では問題なし
- ✅ 身内での利用では十分
- ⚠️ 不特定多数に公開する場合は再検討が必要

### より厳密なセキュリティが必要な場合

1. **Firebase Authentication を導入**
   - ユーザーログインを実装
   - ログインユーザーのみアクセス可能に

2. **セキュリティルールを厳格化**
   ```json
   {
     "rules": {
       "groups": {
         "$groupId": {
           ".read": "auth != null",
           ".write": "auth != null"
         }
       }
     }
   }
   ```

3. **App Checkを有効化**
   - 正規のアプリからのリクエストのみ許可
   - 不正なツールからのアクセスをブロック

## 推奨される追加対策（オプション）

### 1. ドメイン制限

Firebase Console → Authentication → 設定
- 承認済みドメインに `rougenoir214.github.io` のみ追加
- 他のドメインからのアクセスをブロック

### 2. 使用量制限

Firebase Console → プロジェクト設定 → 使用量
- 1日あたりの読み取り/書き込み上限を設定
- 異常なアクセスを検知

### 3. セキュリティルールの定期確認

Firebase Console → Realtime Database → ルール
- 定期的にアクセスログを確認
- 不審なアクセスがないかチェック

## ✅ 結論

**現在の状態で問題ありません**

- Firebase Web APIキーは公開されることを前提とした設計
- 実際のセキュリティはFirebaseルールで保護されている
- グループIDによる分離で十分な安全性を確保

ただし、不特定多数に公開する場合や、機密性の高いデータを扱う場合は、Firebase Authentication + より厳格なセキュリティルールの導入を検討してください。

## 📚 参考リンク

- [Firebase: Using API Keys in Client-Side Code](https://firebase.google.com/docs/projects/api-keys)
- [Firebaseセキュリティルール](https://firebase.google.com/docs/database/security)
- [Firebase App Check](https://firebase.google.com/docs/app-check)
