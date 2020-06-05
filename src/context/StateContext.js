import React, { useState, useEffect } from 'react';
import firebase from '../utils/Firebase';
import Loading from '../components/Loading';

export const StateContext = React.createContext();

export const StateProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [articles, setArticles] = useState({});

	useEffect(() => {
		firebase
			.firestore()
			.collection('scrapped_articles')
			.orderBy('article_date', 'desc')
			.get()
			.then((snapshot) => {
				const _articles = [];
				snapshot.forEach((doc) => {
					const data = doc.data();
					_articles.push(data);
				});
				const _coindeskArticles = _articles.filter((article) => {
					return article.publisher === 'CoinDesk';
				});
				const _cryptopotatoArticles = _articles.filter((article) => {
					return article.publisher === 'CryptoPotato';
				});
				const _newsBTCArticles = _articles.filter((article) => {
					return article.publisher === 'NewsBTC';
				});
				const _etheruemWorldNewsArticles = _articles.filter((article) => {
					return article.publisher === 'Ethereum World News';
				});
				const _eosioArticles = _articles.filter((article) => {
					return article.publisher === 'EOSIO';
				});
				const _bitcoinDotComArticles = _articles.filter((article) => {
					return article.publisher === 'Bitcoin News';
				});
				setArticles({
					coindeskArticles: _coindeskArticles,
					cryptopotatoArticles: _cryptopotatoArticles,
					newsBTCArticles: _newsBTCArticles,
					etheruemWorldNewsArticles: _etheruemWorldNewsArticles,
					eosioArticles: _eosioArticles,
					bitcoinDotComArticles: _bitcoinDotComArticles,
				});
                setLoading(false);
			});
            
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
        
	if (loading) return <Loading />;

	return (
		<StateContext.Provider value={{ articles }}>
			{children}
		</StateContext.Provider>
	);
};
