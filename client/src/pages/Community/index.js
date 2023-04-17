import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware,  compose} from 'redux';
import thunk from 'redux-thunk'
import Reducers from './reducers' //no need to give "/index" bcoz entry point of every file is index
import { HashRouter } from 'react-router-dom';


//sm
import './index.css';
import authReducer from './state';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // to store user information in local storage
import { PersistGate } from 'redux-persist/integration/react';

//
// import CssBaseline from '@material-ui/core/CssBaseline';


const store = createStore( Reducers, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));


//sm
const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store_sm = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});
//


root.render(
  <Provider store={store}>
  <React.StrictMode>
      <App />
  </React.StrictMode>
  </Provider>
);






// module.hot.accept();