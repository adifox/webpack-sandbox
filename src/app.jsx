
import React from "react";
import { hot } from "react-hot-loader";

import style from "./app.css";

import Button from 'Components/button';

const App = () => {
  return (
    <div className={style.app}>
      <h1>
      react Starter 🚀 - for WEBPACK
      </h1>
      <Button />
    </div>
  );
};

export default hot(module)(App);