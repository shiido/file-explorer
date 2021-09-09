import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';

// reducers
import directoryReduces from '@/redux/reducers/directoryReduces';

// sagas
import directorySagas from '@/redux/sagas/directorySagas';

// add reducers
const reducers = {
   directory: directoryReduces,
};

// add Sagas
function* rootSaga() {
   yield all([
      ...directorySagas
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
);

// store
const store = createStore(rootReducer, enhancers);

// run saga
sagaMiddleware.run(rootSaga);

export { store };