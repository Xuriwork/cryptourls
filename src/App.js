import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomeContainer from './components/Home/HomeContainer';
import NotFound from './components/NotFound';
import { StateProvider } from './context/StateContext';
import { ModalProvider } from './context/ModalContext';

const App = () => {
  return (
      <ModalProvider>
        <StateProvider>
          <div className='app-container'>
            <Router>
              <Navbar />
              <Switch>
                <Route exact path='/' component={HomeContainer} />
                <Route path='*' component={NotFound} />
              </Switch>
            </Router>
          </div>
        </StateProvider>
      </ModalProvider>
  );
}

export default App;
