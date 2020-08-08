import React, { useContext } from 'react';
import { StateContext } from '../../context/StateContext';
import Home from './Home';

const IMG = (imgName) => {
	return require(`../../assets/articles_logos/${imgName}`);
 };
 
const HomeContainer = () => {
	const { articles } = useContext(StateContext);

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
			name: 'Etheruem World News',
			articles: articles.etheruemWorldNewsArticles,
			image: IMG('Ethereum-World-News.png'),
			headerClass: 'ewn'
		},
		{
			name: 'Live Bitcoin News',
			articles: articles.livebitcoinnewsArticles,
			image: IMG('livebitcoinnews-logo.png'),
			headerClass: 'livebitcoinnews'
		},
		{
			name: 'Crypto Briefing',
			articles: articles.cryptoBriefingArticles,
			image: IMG('Crypto-Briefing-Logo.png'),
			headerClass: 'cryptobriefing'
		},
		{
			name: 'The Block',
			articles: articles.theblockArticles,
			image: IMG('theblock-logo.svg'),
			headerClass: 'theblock'
		},
		{
			name: 'Bitcoinist',
			articles: articles.bitcoinistArticles,
			image: IMG('bitcoinist-logo.svg'),
			headerClass: 'bitcoinist'
		},
		{
			name: 'EOSIO',
			articles: articles.eosioArticles,
			image: IMG('eosio-logo.svg'),
			headerClass: 'eosio'
		},
		{
			name: 'Bitcoin.com',
			articles: articles.bitcoinDotComArticles,
			image: IMG('bitcoindotcom-logo.png'),
			headerClass: 'bitcoindc'
		},
		{
			name: 'CryptoPotato',
			articles: articles.coindeskArticles,
			image: IMG('crypto-potato-logo.png'),
			headerClass: 'cryptopotato'
		},
		{
			name: 'Coinspeaker',
			articles: articles.coinspeakerArticles,
			image: IMG('coinspeaker-logo.svg'),
			headerClass: 'coinspeaker'
		},
		{
			name: 'AMBCrypto',
			articles: articles.ambCryptoArticles,
			image: IMG('ambcrypto-logo.png'),
			headerClass: 'ambcrypto'
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
			headerClass: 'cryptoglobe'
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
