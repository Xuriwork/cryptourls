import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Search from '../Search';

import { ReactComponent as FeedbackIcon } from '../../assets/icons/feedback-fill.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail-fill.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings-fill.svg';
import CryptoURLsLogo from '../../assets/icons/cryptourls-logo.svg';
import HamburgerMenuIcon from '../../assets/icons/hamburger-menu.svg';

const Header = () => {
	const [menu, setMenu] = useState(false);

	const toggleMenu = () => setMenu(!menu);

	// window.onclick = (event) => {
	// 	const desktopMenu = document.getElementById('desktop-menu');
	// 	console.log(menu)
	// 	if (menu && (event.target !== desktopMenu)) {
	// 		setMenu(false);
	// 		console.log('test');
	// 	};
	// };



	return (
		<div className='header-component'>
			<nav>
				<div className='crypto_urls-logo-container'>
					<Link to='/'>
						<img src={CryptoURLsLogo} alt='CryptoURLs Logo' className='crypto_urls-logo' />
					</Link>
				</div>
				<div className='hamburger-menu-container'>
					<img onClick={toggleMenu} src={HamburgerMenuIcon} alt='default profile icon' />
					{
						menu && (
							<div id='desktop-menu' className='desktop-menu'>
								<div><SettingsIcon /> Settings</div>
								<div><MailIcon />Subscribe</div>
								<div><FeedbackIcon /> Send Feedback</div>
							</div>
						)
					}
				</div>
			</nav>
			<Search />
		</div>
	);
};

export default Header;
