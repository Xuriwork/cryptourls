import React from 'react';
import LazyLoad from 'react-lazyload';

const Home = ({ publishers }) => {
	return (
		<div className='home-component'>
			<section className='sites-container'>
				{publishers.map((publisher) => (
					<LazyLoad key={publisher.name} height={480} offset={100} once={true}>
						<div className='publisher-block'>
							<div
								className={`publisher-header publisher-header-${publisher.headerClass}`}
							>
								<img src={publisher.image} alt='crypto potato logo' />
								{publisher.name}
							</div>
							<div className='site-container'>
								{publisher.articles.map((article) => {
									return (
										<div
											key={article.document_title}
											className='card-content-container'
										>
											<article>
												<span className='article-time'>
													{article.article_date}
												</span>
												<a
													className='article-title'
													href={article.article_link}
													target='_blank'
													rel='noopener noreferrer'
												>
													{article.article_title}
												</a>
											</article>
										</div>
									);
								})}
							</div>
						</div>
					</LazyLoad>
				))}
			</section>
		</div>
	);
};

export default Home;
