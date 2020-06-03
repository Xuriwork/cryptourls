import React from 'react';
import CoinDeskLogo from '../../assets/articles_icons/coindesk-logo.png';
import CryptoPotatoLogo from '../../assets/articles_icons/crypto-potato-logo.png';
import NewsBTCLogo from '../../assets/articles_icons/newsbtc-logo.png';
import BitcoinDotComLogo from '../../assets/articles_icons/bitcoindotcom-logo.png';
import EosioLogo from '../../assets/articles_icons/eosio-logo.png';
import EtheruemWorldNewsLogo from '../../assets/articles_icons/Ethereum-World-News.png';

export const CryptoPotatoBlock = ({ cryptopotatoArticles }) => {

	return (
		<div className='publisher-block'>
			<div className='publisher-header publisher-header-cryptopotato'>
                <img src={CryptoPotatoLogo} alt='crypto potato logo' />
                CryptoPotato
            </div>
			<div className='site-container'>
				{cryptopotatoArticles.map((article) => {
					return (
						<div key={article.document_title} className='card-content-container'>
							<article>
								<a
									className='article-title'
									href={article.article_link}
									target='_blank'
									rel='noopener noreferrer'
								>
									{article.article_title}
								</a>
								<span className='article-time'>{article.article_date}</span>
							</article>
						</div>
					);
				})}
			</div>
		</div>
	);
};


export const CoinDeskBlock = ({ coindeskArticles }) => {

	return (
		<div className='publisher-block'>
			<div className='publisher-header publisher-header-coindesk'>
                <img src={CoinDeskLogo} alt='Coindesk logo' />   
                CoinDesk
            </div>
			<div className='site-container'>
				{coindeskArticles.map((article) => {
					return (
						<div key={article.document_title} className='card-content-container'>
							<article>
								<a
									className='article-title'
									href={article.article_link}
									target='_blank'
									rel='noopener noreferrer'
								>
									{article.article_title}
								</a>
								<span className='article-time'>{article.article_date}</span>
							</article>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const NewsBTCArticles = ({ newsBTCArticles }) => {

	return (
		<div className='publisher-block'>
			<div className='publisher-header publisher-header-newsbtc'>
                <img src={NewsBTCLogo} alt='NewsBTC logo' />   
                NewsBTC
            </div>
			<div className='site-container'>
				{newsBTCArticles.map((article) => {
					return (
						<div key={article.document_title} className='card-content-container'>
							<article>
								<a
									className='article-title'
									href={article.article_link}
									target='_blank'
									rel='noopener noreferrer'
								>
									{article.article_title}
								</a>
								<span className='article-time'>{article.article_date}</span>
							</article>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const BitcoinDotComArticles = ({ bitcoinDotComArticles }) => {

	return (
		<div className='publisher-block'>
			<div className='publisher-header publisher-header-bitcoindc'>
                <img src={BitcoinDotComLogo} alt='bitcoin.com logo' />   
                Bitcoin.com Articles
            </div>
			<div className='site-container'>
				{bitcoinDotComArticles.map((article) => {
					return (
						<div key={article.document_title} className='card-content-container'>
							<article>
								<a
									className='article-title'
									href={article.article_link}
									target='_blank'
									rel='noopener noreferrer'
								>
									{article.article_title}
								</a>
								<span className='article-time'>{article.article_date}</span>
							</article>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const EosioArticles = ({ eosioArticles }) => {

	return (
		<div className='publisher-block'>
			<div className='publisher-header publisher-header-eosio'>
                <img src={EosioLogo} alt='eosio logo' />   
                EOSIO Articles
            </div>
			<div className='site-container'>
				{eosioArticles.map((article) => {
					return (
						<div key={article.document_title} className='card-content-container'>
							<article>
								<a
									className='article-title'
									href={article.article_link}
									target='_blank'
									rel='noopener noreferrer'
								>
									{article.article_title}
								</a>
								<span className='article-time'>{article.article_date}</span>
							</article>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export const EtheruemWorldNewsArticles = ({ etheruemWorldNewsArticles }) => {

	return (
		<div className='publisher-block'>
			<div className='publisher-header publisher-header-ewn'>
                <img src={EtheruemWorldNewsLogo} alt='Etheruem World News logo' />   
                Etheruem World News Articles
            </div>
			<div className='site-container'>
				{etheruemWorldNewsArticles.map((article) => {
					return (
						<div key={article.document_title} className='card-content-container'>
							<article>
								<a
									className='article-title'
									href={article.article_link}
									target='_blank'
									rel='noopener noreferrer'
								>
									{article.article_title}
								</a>
								<span className='article-time'>{article.article_date}</span>
							</article>
						</div>
					);
				})}
			</div>
		</div>
	);
};