import React, { useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import alanBtn from '@alan-ai/alan-sdk-web';

import Navbar from './components/Navbar/Navbar';
import HomeContainer from './components/Home/HomeContainer';
import NotFound from './components/NotFound';
import { StateProvider } from './context/StateContext';
import { ModalProvider } from './context/ModalContext';

const App = () => {
	useEffect(() => {
		const ALANAPIKEY = process.env.REACT_APP_ALAN_APIKEY;
		alanBtn({
			key: `${ALANAPIKEY}/stage`,
			onCommand: ({ command }) => {
				if (command === 'go:back') {
					// Call the client code that will react to the received command
				}
			},
		});
	}, []);

	return (
		<StateProvider>
			<ModalProvider>
				<div className='app-container'>
					<Router>
						<Navbar />
						<Switch>
							<Route exact path='/' component={HomeContainer} />
							<Route path='*' component={NotFound} />
						</Switch>
					</Router>
				</div>
			</ModalProvider>
		</StateProvider>
	);
};

export default App;
