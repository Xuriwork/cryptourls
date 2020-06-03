import React, { useEffect, useState } from 'react';
import Home from './Home';

import firebase from '../../utils/Firebase';
import Loading from '../Loading';

const HomeContainer = () => {

	const [loading, setLoading]  = useState(true);
	const [coindeskArticles, setCoindeskArticles] = useState([]);
	const [cryptopotatoArticles, setCryptopotatoArticles] = useState([]);
	const [newsBTCArticles, setNewsBTCArticles] = useState([]);
	const [etheruemWorldNewsArticles, setEtheruemWorldNewsArticles] = useState([]);
	const [eosioArticles, setEOSIOArticles] = useState([]);
	const [bitcoinDotComArticles, setBitcoinDotComArticles] = useState([]);
    
	useEffect(() => {
		firebase
			.firestore()
			.collection('scrapped_articles')
			.where('publisher', '==', 'CryptoPotato')
			.get()
			.then((snapshot) => {
				const _articles = [];
				snapshot.forEach((doc) => {
					const data = doc.data();
					_articles.push(data)
				});
				setCoindeskArticles(_articles);
			})
			.then(() => {
				firebase
				.firestore()
				.collection('scrapped_articles')
				.where('publisher', '==', 'CoinDesk')
				.get()
				.then((snapshot) => {
					const _articles = [];
					snapshot.forEach((doc) => {
						const data = doc.data();
						_articles.push(data)
					});
					setCryptopotatoArticles(_articles);
				});
			})
			.then(() => {
				firebase
				.firestore()
				.collection('scrapped_articles')
				.where('publisher', '==', 'NewsBTC')
				.get()
				.then((snapshot) => {
					const _articles = [];
					snapshot.forEach((doc) => {
						const data = doc.data();
						_articles.push(data)
					});
					setNewsBTCArticles(_articles);
				});
			})
			.then(() => {
				firebase
				.firestore()
				.collection('scrapped_articles')
				.where('publisher', '==', 'Bitcoin News')
				.get()
				.then((snapshot) => {
					const _articles = [];
					snapshot.forEach((doc) => {
						const data = doc.data();
						_articles.push(data)
					});
					setBitcoinDotComArticles(_articles);
				});
			})
			.then(() => {
				firebase
				.firestore()
				.collection('scrapped_articles')
				.where('publisher', '==', 'EOSIO')
				.get()
				.then((snapshot) => {
					const _articles = [];
					snapshot.forEach((doc) => {
						const data = doc.data();
						_articles.push(data)
					});
					setEOSIOArticles(_articles);
				});
			})
			.then(() => {
				firebase
				.firestore()
				.collection('scrapped_articles')
				.where('publisher', '==', 'Ethereum World News')
				.get()
				.then((snapshot) => {
					const _articles = [];
					snapshot.forEach((doc) => {
						const data = doc.data();
						_articles.push(data)
					});
					setEtheruemWorldNewsArticles(_articles);
					setLoading(false);
				});
			})

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <Loading />;

	return (
	<Home 
		coindeskArticles={coindeskArticles} 
		cryptopotatoArticles={cryptopotatoArticles} 
		newsBTCArticles={newsBTCArticles}
		etheruemWorldNewsArticles={etheruemWorldNewsArticles}
		bitcoinDotComArticles={bitcoinDotComArticles}
		eosioArticles={eosioArticles}
	/>
	);
};

export default HomeContainer;
