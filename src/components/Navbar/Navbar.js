import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Search from '../Search/Search';
import ModalContext from '../../context/ModalContext';

import { ReactComponent as FeedbackIcon } from '../../assets/icons/feedback-fill.svg';
import { ReactComponent as LinkIcon } from '../../assets/icons/links-fill.svg';
import { ReactComponent as MailIcon } from '../../assets/icons/mail-fill.svg';
import { ReactComponent as PreferencesIcon } from '../../assets/icons/settings-fill.svg';
import CryptoURLsLogo from '../../assets/icons/cryptourls-logo-typeface.svg';
import HamburgerMenuIcon from '../../assets/icons/hamburger-menu.svg';

const Navbar = () => {
	const [menu, setMenu] = useState(false);
	const desktopMenuRef = useRef(null);
	const { handleModal } = useContext(ModalContext);

	const toggleMenu = () => setMenu(!menu);
	
	const closeMenu = () => {
		setTimeout(() => {
			setMenu(false);
		}, 200);
		const desktopMenu = document.getElementById('desktop-menu');
		if (desktopMenu) {
			desktopMenu.style.animation = 'fadeout 0.3s ease-out';
		}
	};
	
	useEffect(() => {
		const handleDocumentClick = (e) => {
			if (desktopMenuRef.current.contains(e.target)) return;
			closeMenu();
		};

		document.addEventListener('mousedown', handleDocumentClick, false);
	}, []);

	const handleToggleModal = (type) => {
		closeMenu();
		handleModal(type);
	};

	return (
		<div className='navbar-component'>
			<nav>
				<div className='crypto_urls-logo-container'>
					<Link to='/'>
						<img src={CryptoURLsLogo} alt='CryptoURLs Logo' className='crypto_urls-logo' />
					</Link>
				</div>
				<div ref={desktopMenuRef} className='hamburger-menu-container'>
					<img onClick={toggleMenu} src={HamburgerMenuIcon} alt='default profile icon' />
					{
						menu && (
							<div id='desktop-menu' className='desktop-menu'>
								<div onClick={() => handleToggleModal('saved-links')}><LinkIcon />Open Links</div>
								<div onClick={() => handleToggleModal('preferences')}><PreferencesIcon /> Preferences</div>
								<div onClick={() => handleToggleModal('subscribe')}><MailIcon />Subscribe</div>
								<div onClick={() => handleToggleModal('send-feedback')}><FeedbackIcon /> Send Feedback</div>
							</div>
						)
					}
				</div>
			</nav>
			<Search />
		</div>
	);
};

export default Navbar;
