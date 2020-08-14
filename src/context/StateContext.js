import React, { useState, useEffect } from 'react';

export const StateContext = React.createContext();

export const StateProvider = ({ children }) => {
	const [links, setLinks] = useState(() => {
		const parsedLinksObject = JSON.parse(sessionStorage.getItem('links'))
		return parsedLinksObject || [];
	});

	useEffect(() => {
		sessionStorage.setItem('links', JSON.stringify(links))
	}, [links]);

	return (
		<StateContext.Provider value={{ links, setLinks }}>
			{children}
		</StateContext.Provider>
	);
};
