import React from 'react';
import useSWR from 'swr';
import Home from './Home';
import Loading from '../Loading';

const IMG = (imgName) => {
	return require(`../../assets/articles_logos/${imgName}`);
 };

const fetcher = (url) => fetch(url).then((response) => response.json());
const API_URL = process.env.REACT_APP_API_URL;
 
const HomeContainer = () => {
	const { data: articles, error } = useSWR(API_URL, fetcher);
	if (error) return console.error(error);
	if (!articles) return <Loading />;

	const publishersData = [
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
			articles: articles.newsbtcArticles,
			image: IMG('newsbtc-logo.png'),
			headerClass: 'newsbtc'
		},
		{
			name: 'Crypto Briefing',
			articles: articles.cryptobriefingArticles,
			image: IMG('Crypto-Briefing-Logo.png'),
			headerClass: 'cryptobriefing'
		},
		{
			name: 'Etheruem World News',
			articles: articles.ethereumworldnewsArticles,
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
			name: 'CryptoPotato',
			articles: articles.cryptopotatoArticles,
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
			articles: articles.ambcryptoArticles,
			image: IMG('ambcrypto-logo.png'),
			headerClass: 'ambcrypto'
		},
		{
			name: 'CryptoSlate',
			articles: articles.cryptoslateArticles,
			image: IMG('cryptoslate-logo.png'),
			headerClass: 'cryptoslate'
		},
		{
			name: 'The Daily Hodl',
			articles: articles.thedailyhodlArticles,
			image: IMG('dailyhodl-logo.png'),
			headerClass: 'dailyhodl'
		},
		{
			name: 'CryptoGlobe',
			articles: articles.cryptoglobeArticles,
			image: IMG('crypto-globe-logo.png'),
			headerClass: 'cryptoglobe'
		},
		{
			name: 'Crypto News',
			articles: articles.cryptonewsArticles,
			image: IMG('cryptonews-logo.png'),
			headerClass: 'cryptonews'
		}
	];

	return (
		<Home publishers={publishersData} />
	);
};

export default HomeContainer;
