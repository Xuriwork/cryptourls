import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Navbar/Header';
import HomeContainer from './components/Home/HomeContainer';
import NotFound from './components/NotFound';

const App = () => {
  return (
      <div className='app-container'>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={HomeContainer} />
            <Route path='*' component={NotFound} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
