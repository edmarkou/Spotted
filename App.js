import React from 'react';
import App from './src/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './src/reducers';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
};
