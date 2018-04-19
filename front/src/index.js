import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './component/route'
import store, {history} from './store'
import {ConnectedRouter} from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main/>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
