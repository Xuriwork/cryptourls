import React from 'react';

const Home = ({ articles }) => {
	return (
		<div className='home-component'>
			<section className='sites-container'>
				{articles.map((article) => (
					<div key={article.name} className='publisher-block'>
						<div
							className={`publisher-header publisher-header-${article.headerClass}`}
						>
							<img src={article.image} alt='crypto potato logo' />
							{article.name}
						</div>
						<div className='site-container'>
							{article.articles.map((article) => {
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
				))}
			</section>
		</div>
	);
};

export default Home;
