import React, { useContext } from 'react';
import { ArticlesContext } from '../../context/ArticlesContext';
import Home from './Home';

const IMG = (imgName) => {
	return require(`../../assets/articles_icons/${imgName}`);
 };
 
const HomeContainer = () => {
	const { articles } = useContext(ArticlesContext);

	const articlesData = [
		{
			name: 'Decrypt',
			articles: articles.decryptArticles,
			image: IMG('decrypt-logo.png'),
			headerClass: 'decrypt'
		},
		{
			name: 'CoinDesk',
			articles: articles.coindeskArticles,
			image: IMG('coindesk-logo.png'),
			headerClass: 'coindesk'
		},
		{
			name: 'NewsBTC',
			articles: articles.newsBTCArticles,
			image: IMG('newsbtc-logo.png'),
			headerClass: 'newsbtc'
		},
		{
			name: 'Bitcoinist',
			articles: articles.bitcoinistArticles,
			image: IMG('bitcoinist-logo.png'),
			headerClass: 'bitcoinist'
		},
		{
			name: 'CryptoPotato',
			articles: articles.coindeskArticles,
			image: IMG('crypto-potato-logo.png'),
			headerClass: 'cryptopotato'
		},
		{
			name: 'Bitcoin.com',
			articles: articles.bitcoinDotComArticles,
			image: IMG('bitcoindotcom-logo.png'),
			headerClass: 'bitcoindc'
		},
		{
			name: 'EOSIO',
			articles: articles.eosioArticles,
			image: IMG('eosio-logo.png'),
			headerClass: 'eosio'
		},
		{
			name: 'Etheruem World News',
			articles: articles.etheruemWorldNewsArticles,
			image: IMG('Ethereum-World-News.png'),
			headerClass: 'ewn'
		},
		{
			name: 'Crypto Briefing',
			articles: articles.cryptoBriefingArticles,
			image: IMG('Crypto-Briefing-Logo.png'),
			headerClass: 'cryptobriefing'
		},
		{
			name: 'The Daily Hodl',
			articles: articles.bitcoinistArticles,
			image: IMG('dailyhodl-logo.png'),
			headerClass: 'dailyhodl'
		},
		{
			name: 'CryptoGlobe',
			articles: articles.bitcoinistArticles,
			image: IMG('crypto-globe-logo.png'),
			headerClass: 'cryptoglobal'
		},
		{
			name: 'Crypto News',
			articles: articles.cryptoNewsArticles,
			image: IMG('cryptonews-logo.png'),
			headerClass: 'cryptonews'
		}
	];

	return (
		<Home articles={articlesData} />
	);
};

export default HomeContainer;
