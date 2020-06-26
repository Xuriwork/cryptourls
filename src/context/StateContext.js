import React, { useState, useEffect } from 'react';
import firebase from '../utils/Firebase';
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
		firebase
		.firestore()
		.enablePersistence()
		.catch((error) => {
			if (error.code === 'failed-precondition') {
				console.log(error);
			} else if (error.code === 'unimplemented') {
				console.log('The current browser does not support all of the features required to enable persistence.');
			}
		});
	}, [])

	useEffect(() => {
		const checkSource = async () => {
			const documentRef = firebase
			.firestore()
			.collection('scrapped_articles')
			.orderBy('article_date', 'desc')

			let snapshot = await documentRef.get({ source: 'cache' });
			if (!snapshot.exists) {
				snapshot = await documentRef.get({ source: 'server'});
			};

			return snapshot;
		};

		const snapshot = checkSource();
		
		snapshot
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
			const _cryptoBriefingArticles = _articles.filter((article) => {
				return article.publisher === 'Crypto Briefing';
			});
			const _cryptoNewsArticles = _articles.filter((article) => {
				return article.publisher === 'Crypto News';
			});
			const _decryptArticles = _articles.filter((article) => {
				return article.publisher === 'Decrypt';
			});
			const _bitcoinistArticles = _articles.filter((article) => {
				return article.publisher === 'Bitcoinist';
			});
			const _theDailyHodlArticles = _articles.filter((article) => {
				return article.publisher === 'The Daily Hodl';
			});
			const _cryptoGlobalArticles = _articles.filter((article) => {
				return article.publisher === 'CryptoGlobe';
			});
			const _coinspeakerArticles = _articles.filter((article) => {
				return article.publisher === 'Coinspeaker';
			});
			const _ambCryptoArticles = _articles.filter((article) => {
				return article.publisher === 'AMBCrypto';
			});
			const _swissborgArticles = _articles.filter((article) => {
				return article.publisher === 'SwissBorg';
			});
			const _mediumArticles = _articles.filter((article) => {
				return article.publisher === 'Medium';
			});
			setArticles({
				coindeskArticles: _coindeskArticles,
				cryptopotatoArticles: _cryptopotatoArticles,
				newsBTCArticles: _newsBTCArticles,
				etheruemWorldNewsArticles: _etheruemWorldNewsArticles,
				eosioArticles: _eosioArticles,
				bitcoinDotComArticles: _bitcoinDotComArticles,
				cryptoBriefingArticles: _cryptoBriefingArticles,
				cryptoNewsArticles: _cryptoNewsArticles,
				decryptArticles: _decryptArticles,
				bitcoinistArticles: _bitcoinistArticles,
				theDailyHodlArticles: _theDailyHodlArticles,
				cryptoGlobalArticles: _cryptoGlobalArticles,
				swissborgArticles: _swissborgArticles,
				coinspeakerArticles: _coinspeakerArticles,
				ambCryptoArticles: _ambCryptoArticles,
				mediumArticles: _mediumArticles
			});
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
