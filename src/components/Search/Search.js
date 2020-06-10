import React, { useState } from 'react';
import SearchModal from './SearchModal';

export const Search = () => {
	const [modal, setModal] = useState(null);

	const handleSearch = (e) => {
		if (e.keyCode === 13 && e.target.value) {
			setModal({
				termSearched: e.target.value,
			});
		}
	};

	return (
		<>
			<div className='search-component'>
				<div className='search-input-container'>
					<input
						placeholder='Search'
						className='search-input'
						type='text'
						onKeyDown={handleSearch}
					/>
				</div>
			</div>
			{modal && <SearchModal searchInfo={modal} setModal={setModal} />}
		</>
	);
};

export default Search;
