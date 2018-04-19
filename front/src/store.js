import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer/rootReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux'

export const history = createHistory();
const middleware = [thunk,
    routerMiddleware(history)
];
export default createStore(
    rootReducer,
    composeWithDevTools(),
    applyMiddleware(...middleware),
);