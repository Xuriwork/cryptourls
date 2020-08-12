import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';

export const StateContext = React.createContext();

export const StateProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [articles, setArticles] = useState({});
	const [links, setLinks] = useState(() => {
		const parsedLinksObject = JSON.parse(sessionStorage.getItem('links'))
		return parsedLinksObject || [];
	});

	useEffect(() => {
		sessionStorage.setItem('links', JSON.stringify(links))
	}, [links]);

	useEffect(() => {

		axios.get('https://us-central1-cryptourls.cloudfunctions.net/api/articles')
		.then((res) => {
			const articles = res.data;
			setArticles({...articles});
			setLoading(false);
		});
	
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

   
	if (loading) return <Loading />;

	return (
		<StateContext.Provider value={{ articles, links, setLinks }}>
			{children}
		</StateContext.Provider>
	);
};
