import React from 'react';
import {
	CryptoPotatoBlock,
	CoinDeskBlock,
	NewsBTCArticles,
	BitcoinDotComArticles,
	EosioArticles,
	EtheruemWorldNewsArticles,
} from './Blocks';

const Home = ({
	cryptopotatoArticles,
	coindeskArticles,
	newsBTCArticles,
	bitcoinDotComArticles,
	etheruemWorldNewsArticles,
	eosioArticles,
}) => {
	console.log(cryptopotatoArticles);
	return (
		<>
			<div className='home-component'>
				<section className='sites-container'>
					<CryptoPotatoBlock cryptopotatoArticles={cryptopotatoArticles} />
					<NewsBTCArticles newsBTCArticles={newsBTCArticles} />
					<CoinDeskBlock coindeskArticles={coindeskArticles} />
					<BitcoinDotComArticles
						bitcoinDotComArticles={bitcoinDotComArticles}
					/>
					<EosioArticles eosioArticles={eosioArticles} />
					<EtheruemWorldNewsArticles
						etheruemWorldNewsArticles={etheruemWorldNewsArticles}
					/>
				</section>
			</div>
		</>
	);
};

export default Home;
