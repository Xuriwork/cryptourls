import React, { useContext } from 'react';
import { StateContext } from '../../context/StateContext';
import Home from './Home';
import CryptoPotatoLogo from '../../assets/articles_icons/crypto-potato-logo.png';
import CoinDeskLogo from '../../assets/articles_icons/coindesk-logo.png';
import NewsBTCLogo from '../../assets/articles_icons/newsbtc-logo.png';
import BitcoinDotComLogo from '../../assets/articles_icons/bitcoindotcom-logo.png';
import EosioLogo from '../../assets/articles_icons/eosio-logo.png';
import EtheruemWorldNewsLogo from '../../assets/articles_icons/Ethereum-World-News.png';

const HomeContainer = () => {
	const { articles } = useContext(StateContext);

	const articlesData = [
		{
			name: 'CryptoPotato',
			articles: articles.coindeskArticles,
			image: CryptoPotatoLogo,
			headerClass: 'cryptopotato'
		},
		{
			name: 'CoinDesk',
			articles: articles.coindeskArticles,
			image: CoinDeskLogo,
			headerClass: 'coindesk'
		},
		{
			name: 'NewsBTC',
			articles: articles.newsBTCArticles,
			image: NewsBTCLogo,
			headerClass: 'newsbtc'
		},
		{
			name: 'Bitcoin.com',
			articles: articles.bitcoinDotComArticles,
			image: BitcoinDotComLogo,
			headerClass: 'bitcoindc'
		},
		{
			name: 'EOSIO',
			articles: articles.eosioArticles,
			image: EosioLogo,
			headerClass: 'eosio'
		},
		{
			name: 'Etheruem World News',
			articles: articles.etheruemWorldNewsArticles,
			image: EtheruemWorldNewsLogo,
			headerClass: 'ewn'
		},
	];

	return (
		<Home articles={articlesData} />
	);
};

export default HomeContainer;
