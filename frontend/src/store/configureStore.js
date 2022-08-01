import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../reducer/index";
import rootSaga from "../sagas";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// const configStore = () => {
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   const sagaMiddleware = createSagaMiddleware();
//   return {
//     ...createStore(
//       rootReducer,
//       composeEnhancers(applyMiddleware(sagaMiddleware))
//     ),
//     runSaga: sagaMiddleware.run(rootSaga)
//   };
// };
// export default configStore;


const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(store);
  // kick off root saga
sagaMiddleware.run(rootSaga);
export { store, persistor, sagaMiddleware };


