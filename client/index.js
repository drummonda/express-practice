import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import OwnerList from './components/OwnerList'
import SingleOwner from './components/SingleOwner'
import PetList from './components/PetList'
import SinglePet from './components/SinglePet'
import Navbar from './components/Navbar'

import App from './components/App';

ReactDOM.render(
    <HashRouter >
      <div id='router-children'>
        <Navbar />
        <Switch>
          <Route exact path='/owners/:id' component={SingleOwner} />
          <Route exact path='/pets/:id' component={SinglePet} />
          <Route path='/owners' component={OwnerList} />
          <Route path='/pets' component={PetList} />
          <Route path='/' component={App} />
        </Switch>
      </div>
    </HashRouter>,
  document.getElementById('app')
);
