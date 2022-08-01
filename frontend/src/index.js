import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import {store,persistor} from "./store/configureStore";
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import 'antd/dist/antd.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
     <App />
     </PersistGate>
  </Provider>
);

reportWebVitals();
