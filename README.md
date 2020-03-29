# sbviewer

### 概要

- ScrapboxからエクスポートしたJSONをlocalhostで見るためのアプリケーションのfork（オリジナルは[こちら](https://github.com/hitode909/sbviewer)）
- 海外旅行のしおりをScrapboxで作ったはいいが旅先でオンラインになれるかはわからない、というときに便利
- 全ページを1枚のHTMLとして表示できるので、これをWebブラウザでPDF化すればScrapbox全体を1ファイルにまとめられて便利

### 使い方

- Scrapboxにて `Settings` ➡ `Export Pages` からJSONをダウンロード
- ルートディレクトリのJSONファイルが適当に選ばれて起動
- 環境変数 `PAGES_JSON` でJSONファイルを指定して起動することも可能

```
npm install

# 最初に見つかったJSONファイルが自動で開かれる
npm run dev

# JSONファイル指定
cross-env PAGES_JSON=~/Downloads/hitode909.json npm run dev
```

### 目次ページ (`/`)

[![Image from Gyazo](https://i.gyazo.com/97dae3aa3db50b5b582e4b92d95c2446.png)](https://gyazo.com/97dae3aa3db50b5b582e4b92d95c2446)

### 全ページ (`/all`)

[![Image from Gyazo](https://i.gyazo.com/2be2c8cc792cb71cda722fb237254f39.png)](https://gyazo.com/2be2c8cc792cb71cda722fb237254f39)

### 設定: 環境変数

- [dotenv](https://github.com/motdotla/dotenv) を使っているので環境変数は `.env` に書けば反映される
- `PORT` でサーバのポートを指定（`8080`など）
- `src/options.ts` で表示したいページなどを制御でき、初期状態では `PAGE_OPTIONS` が `true` になっているときに制御が有効になる

### 設定: `src/options.ts`

#### `options.filter?: (pages: Page[]) => Page[]`

- `/all` に表示するページをフィルタできる
- 初期状態では `2020-03-29` のような日付形式のページだけ表示するようになっている

#### `options.linesProcessor?: (lines: string[]) => string[]`

- Scrapbox記法の生データをMarkdownに変換する前に、独自の処理を施せる
- 初期状態では特定のセクションヘッダがある部分だけを抜き出すようになっている

### リンク

- [hitode909/sbviewer](https://github.com/hitode909/sbviewer): オリジナル
- [arcatdmz/sb2md](https://github.com/arcatdmz/sb2md): Scrapbox記法をMarkdownに変換するライブラリのfork

---
https://github.com/arcatdmz/sbviewer