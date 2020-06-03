import React from 'react';
import { Link } from 'react-router-dom';

import CryptoURLsLogo from '../../assets/icons/cryptourls-logo.svg';
import HamburgerMenuIcon from '../../assets/icons/hamburger-menu.svg';
import Search from '../Search';

const Header = () => {

	return (
		<div className='header-component'>
			<nav>
				<div className='crypto_urls-logo-container'>
					<Link to='/'>
						<img src={CryptoURLsLogo} alt='CryptoURLs Logo' className='crypto_urls-logo' />
					</Link>
				</div>
				<div className='hamburger-menu-container'>
					<img src={HamburgerMenuIcon} alt='default profile icon' />
				</div>
			</nav>
			<Search />
		</div>
	);
};

export default Header;
