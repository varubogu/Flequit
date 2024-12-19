# frontend.md

## データ構造について

- プロジェクト
  - リスト
    - タスク
      - サブタスク

## デザイン全体像

※<>で括られたものは該当する変数を表示する

- 画面全体
  - サイドメニュー（画面左側、折りたたみ可能）
    - 折りたたみ（ボタン）
    - 今日（ボタン）
    - 明日（ボタン）
    - 今週（ボタン）
    - <選択中のプロジェクト名>（文字検索可能なプルダウン）
    - <プロジェクト内のリスト1>（ボタン）
    - <プロジェクト内のリスト2>（ボタン）
    - <プロジェクト内のリスト3>（ボタン）
    - <プロジェクト内のリスト、以下繰り返し>（ボタン）
    - ヘルプ（下部に張り付くボタン）
    - 設定（下部に張り付くボタン）
    - アカウント（下部に張り付くボタン）
  - タスク一覧
    - タスクを追加（右下固定表示の「+」アイコンボタン）
  - タスク詳細
    - <タスク名>
    - <期限>
    - <優先度>
    - <開始日時>
    - <終了日時>
    - <繰り返し>
    - <繰り返しの間隔>
    - <タスクのノート>

備考：

- サイドメニューはすべて<SVGアイコン+名前>の形式で表示する。
- 折りたたみ時にアイコンのみを表示する。
- タスク一覧、タスク詳細は端末の横幅に応じて両方表示するか片方のみ表示するかを判断する。
- サイドメニューはスマホの場合、ハンバーガーメニューとして表示する。

## サイドメニューの動作について

デザインはすべて左寄せとする（折りたたみでアイコンの位置が固定となるように）

- 折りたたみボタン

アイコンのみ表示、クリックするたびにサイドメニューの折りたたみと展開を切り替える

- 今日、明日、今週ボタン

文言固定。
クリックしたボタンの条件に応じてタスク一覧を表示する

- <選択中のプロジェクト名>

選択済みの名称を画面に表示、選択済みがない場合は作成日時が古いものを選択する。
クリックするとコンボボックスが開く。
テキスト入力でプロジェクトの絞り込みができる。
選択値が変更された場合、サイドメニューのプロジェクト内リスト、タスク一覧、タスク詳細を更新する。

- プロジェクト内リストボタン

選択中のプロジェクトのリスト名を表示する。
アイコンのみ表示、クリックすると表示するリストを切り替える

- 設定ボタン

アイコンのみ表示、クリックするたびに表示する設定を切り替える

## ソースコードの要望

- デザインはコンポーネント化を重視する
- デザインはQwik UIを使用する
-