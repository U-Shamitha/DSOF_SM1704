import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware,  compose} from 'redux';
import thunk from 'redux-thunk'
import Reducers from './reducers' //no need to give "/index" bcoz entry point of every file is index
import { HashRouter } from 'react-router-dom';

// import CssBaseline from '@material-ui/core/CssBaseline';


const store = createStore( Reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    {/* <CssBaseline /> */}
      <App />
  </React.StrictMode>
  </Provider>
);






// module.hot.accept();