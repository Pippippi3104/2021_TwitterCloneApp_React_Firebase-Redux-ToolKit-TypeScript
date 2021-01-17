## Source Code
* [完成したコード](https://github.com/GomaGoma676/twitter_firebase)

## note
* init
  ```
  npx create-react-app basic_lesson --template redux-typescript
  npx create-react-app twitter_app_lesson --template redux-typescript
  ```
  ```
  npm inatall @material-ui/core
  npm install @material-ui/icons
  npm install firebase
  ```
* firebaseでエラーが出る時
  * 以下のように書き換えると良い
    ```
    import * as firebase from "firebase/app";
    ↓
    import firebase from "firebase/app";
    ```

* .envを設定後
  * 再度 npm start を実行