import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import Router from './Router';
import reducers from './reducers/rootReducer';
import './sass/style.scss';
import 'bootstrap-loader';
import 'font-awesome/css/font-awesome.min.css';

const dev = NODE_ENV === 'development';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const store = dev ? createStoreWithMiddleware(reducers,
                                              window.__REDUX_DEVTOOLS_EXTENSION__ &&
                                              window.__REDUX_DEVTOOLS_EXTENSION__()) : createStoreWithMiddleware(reducers);


const muiTheme = getMuiTheme({
    palette: {
        primary1Color: 'rgb(233,218,196)',
        primary2Color: 'rgb(233,218,196)',
        primary3Color: 'rgb(233,218,196)',
        accent1Color: 'rgb(70,62,63)',
        accent2Color: 'rgb(233,218,196)',
        accent3Color: 'rgb(233,218,196)',
        textColor: 'rgb(233,218,196)',
        alternateTextColor: 'rgb(233,218,196)',
        canvasColor: 'rgb(70,62,63)',
        borderColor: 'rgb(233,218,196)',
        disabledColor: 'rgb(70,62,63)',
        pickerHeaderColor: 'rgb(70,62,63)',
        clockCircleColor: 'rgb(70,62,63)',
        shadowColor: 'rgb(70,62,63)',
    }
});

ReactDOM.render(
    <Provider store={ store }>
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
            <Router />
      </MuiThemeProvider>
    </Provider>, document.querySelector('#app'));
