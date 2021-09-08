// Libs
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects'; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import todoReduces from '@/redux/reducers/todoReduces';

// Sagas
import todoSagas from '@/redux/sagas/todoSagas';

// Add Reducers
const reducers = {
   todo: todoReduces,
};

// Add Sagas
function* rootSaga() {
   yield all([
      ...todoSagas
   ]);
}

// config
const rootReducer = combineReducers(
   reducers
);

// middlewares
const middlewares = [];
const sagaMiddleware = createSagaMiddleware();

// devtools
const composeEnhancers = composeWithDevTools({
   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

// enhancers
const enhancers = composeEnhancers(
   applyMiddleware(...middlewares, sagaMiddleware)
   // other store enhancers if any
);

// store
const store = createStore(rootReducer, enhancers);

// Run saga
sagaMiddleware.run(rootSaga);

export { store };