import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import CampusList from './components/CampusList'
import SingleCampus from './components/SingleCampus'
import store from './redux/store'

import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter >
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/campuses' component={CampusList} />
        <Route exact path='/campuses/:id' component={SingleCampus} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
);
