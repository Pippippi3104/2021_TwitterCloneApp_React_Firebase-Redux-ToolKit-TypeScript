import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import CleanUp from './CleanUp';

/* allow function の型で記述 */
const App: React.FC = () => {
  const [status, setStatus] = useState<string | number>("text");
  const [input, setInput] = useState("");
  const [counter, setCounter] = useState(0);
  const [display, setDisplay] = useState(true);

/* 関数定義 (eの型を忘れず定義) */
const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInput(e.target.value)
};

/* stateの変更に応じてrenderingが実行される、第二引数に指定があればそれが更新された時のみレンダリング */
useEffect(() => {
  console.log("useEffect in App invoked !");
  document.title = `current value is ${counter}`;
}, [counter]);

  return (
    <div className="App">
      <header className="App-header">

        {/* statusの表示と更新 */}
        <h4>{status}</h4>
        <button onClick={() => setStatus("new text")}>Button(text)</button>
        <button onClick={() => setStatus(1)}>Button(1)</button>

        {/* inputのstate */}
        <h4>{input}</h4>
        <input type="text" value={input} onChange={onChangeHandler} />

        {/* counterのstate */}
        <h4>{counter}</h4>
        <button onClick={() => setCounter((preCounter) => preCounter+1)}>Increment</button>

        {/* useEffectの練習 */}
        {display && <CleanUp />}
        <button onClick={() => setDisplay(!display)}>Toggle display</button>

        {/* defaultで作られるやつ */}
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
