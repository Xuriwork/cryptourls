import React, { useContext } from 'react';

import algoliasearch from 'algoliasearch/lite';
import {
	InstantSearch,
	Hits,
	SearchBox,
	connectHighlight,
	connectStateResults,
} from 'react-instantsearch-dom';
import cogoToast from 'cogo-toast';

import { StateContext } from '../../context/StateContext';

import AlgoliaIcon from '../../assets/icons/search-by-algolia-light-background.svg';

const searchClient = algoliasearch(
	'3C9U5NS6QB',
	'f8b5f2324c15924d09ae524e47cd647d'
);

const Highlight = ({ highlight, attribute, hit }) => {
	const parsedHit = highlight({
		highlightProperty: '_highlightResult',
		attribute,
		hit,
	});

	return (
		<span>
			{parsedHit.map((part, index) =>
				part.isHighlighted ? (
					<mark key={index}>{part.value}</mark>
				) : (
					<span key={index}>{part.value}</span>
				)
			)}
		</span>
	);
};

const CustomHighlight = connectHighlight(Highlight);

const Hit = ({ hit }) => {
	const { links, setLinks } = useContext(StateContext);

	const handleAddToLinks = () => {
		if (links.includes(hit.article_link)) {
			return cogoToast.info('Link is already added', {
				hideAfter: 5,
			});
		};
		setLinks([...links, hit.article_link]);
	};

	return (
		<div className='hit-item-container'>
			<h4>
				<CustomHighlight attribute='article_title' hit={hit} />
			</h4>
			<a href={hit.article_link} target='_blank' rel='noopener noreferrer'>
				{hit.article_link}
			</a>
			<br />
			<button onClick={handleAddToLinks}>Add to LINKS</button>
		</div>
	);
};

const Results = connectStateResults(
	({ searchResults, isSearchStalled, children }) => {
		return isSearchStalled ? (
			<div className='loader'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		) : searchResults && searchResults.nbHits !== 0 ? (
			children
		) : (
			<div className='no-results-div'>No results have been found.</div>
		);
	}
);

const SearchModal = ({ searchInfo, setModal }) => {
	window.onclick = (e) => {
		const modalOverlay = document.getElementById('modal-overlay');
		if (e.target === modalOverlay) {
			setModal(null);
			document.body.style.overflow = 'auto';
		}
	};

	if (searchInfo) document.body.style.overflow = 'hidden';

	const SearchResults = () => (
		<InstantSearch
			indexName='prod_Articles'
			searchClient={searchClient}
			currentRefinement={searchInfo.termSearched}
		>
			<Results>
				<Hits hitComponent={Hit} />
			</Results>
			<SearchBox
				defaultRefinement={searchInfo.termSearched}
				showLoadingIndicator
			/>
		</InstantSearch>
	);

	return (
		<>
			<div className='modal-overlay' id='modal-overlay'>
				<div className='modal search_modal'>
					<span className='modal-close-button' onClick={() => setModal(null)}>
						&times;
					</span>
					<h3>
						Searched Term: <span>{searchInfo.termSearched}</span>
					</h3>
					<div className='modal-content'>
						<SearchResults />
					</div>
					<div className='modal-bottom'>
						<img src={AlgoliaIcon} alt='Search By Algolia' draggable='false' />
					</div>
				</div>
			</div>
		</>
	);
};

export default SearchModal;
