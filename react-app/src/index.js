import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store'
import { ModalProvider } from "./context/Modal";
import AlertTemplate from 'react-alert-template-basic';
import {  transitions, positions, Provider as AlertProvider } from 'react-alert';

const store = configureStore();

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  timeout: 3000,
  offset: '40px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} color={"red"} {...options}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
