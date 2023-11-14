import { applyMiddleware, createStore } from 'redux';
import reducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(applyMiddleware()));
const persister = 'Free';

export { store, persister };
