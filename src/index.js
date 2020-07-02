import React from 'react';
import ReactDOM from 'react-dom';
import { positions, Provider as AlertProvider } from 'react-alert'
import AlertMUITemplate from "react-alert-template-mui";
import './index.css';
import './normalize.css';
import WeatherApp from './WeatherApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <AlertProvider template={AlertMUITemplate} position={positions.MIDDLE}>
    <WeatherApp />
    </AlertProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
