import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';

const dev = process.env.NODE_ENV !== 'production';
const DEBUG_STORE = Boolean(Number(process.env.NEXT_PUBLIC_DEBUG_STORE));

const HIDDEN_ACTIONS = ['SET_CLIENTS_COUNT', 'PING', 'PONG'];

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  const middlewareLogsEnabled = process.env.NODE_ENV === 'development' && DEBUG_STORE && !HIDDEN_ACTIONS.includes(action.type)

  if(middlewareLogsEnabled){
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());
  }

  next(action);

  if(middlewareLogsEnabled){
    console.log('next state: ', store.getState());
  }
};

const middleWares = [loggerMiddleware];

const composedEnhancers =  dev ?
  compose(applyMiddleware(...middleWares)) :
  compose(applyMiddleware(...[]));

export const store = createStore(rootReducer, undefined, composedEnhancers);