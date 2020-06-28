import React, { useContext } from 'react';

import cogoToast from 'cogo-toast';

import { ModalContext } from '../../context/ModalContext';
import { StateContext } from '../../context/StateContext';

export const Modal = () => {
	const { setLinks } = useContext(StateContext);
	const { handleModal, modal, modalType, links } = useContext(ModalContext);

	window.onclick = (e) => {
		const modalOverlay = document.getElementById('modal-overlay');
		if (e.target === modalOverlay) handleModal();
	};

	let info = {};

	if (modalType === 'subscribe') {
		info = {
			heading: 'Subscribe to updates',
			paragraph:
				'Get notified when we add new features. Gain exclusive access to new projects. Opt out anytime.',
			button: 'Submit',
		};
	} else if (modalType === 'send-feedback') {
		info = {
			heading: 'Leave feedback',
			paragraph:
				'Have a suggestion or want us to add another news source? Send us a message using the form below',
			button: 'Subscribe',
		};
	} else if (modalType === 'preferences') {
		info = {
			heading: 'Preferences',
			paragraph:
				"Personal preferences is an upcoming feature that will let you fine tune your Devurls experience. You'll be able to:",
		};
	} else if (modalType === 'saved-links') {
		info = {
			heading: 'Saved links',
			secondButton: 'Clear links',
			button: 'Open links',
		};
	}

	const handleMainClick = () => {
		if (modalType === 'saved-links') {
			links.forEach((link) => window.open(link));
		}
		cogoToast.info("Hasn't sent, this is disabled sorry 😥", {
			hideAfter: 5,
		});
	};

	const handleClearLinks = () => {
		setLinks([]);
		handleModal();
		cogoToast.success('Links cleared', {
			hideAfter: 5,
		});
	};

	return (
		<>
			{modal && (
				<div className='modal-overlay' id='modal-overlay'>
					<div className='modal'>
						<div className='modal-content'>
							<h3>{info.heading}</h3>
							<p>{info.paragraph}</p>
							{modalType === 'send-feedback' && (
								<form>
									<input type='text' placeholder='Your email' />
									<input type='text' placeholder='Subject' />
									<textarea placeholder='Your thoughts'></textarea>
								</form>
							)}
							{modalType === 'subscribe' && (
								<form>
									<input type='email' placeholder='Email' />
								</form>
							)}
							{modalType === 'saved-links' && (
								<ul className='saved-links-list'>
									{links.map((link, index) => (
										<li key={link}>
											<span>{index + 1}.</span>
											<a href={link} target='_blank' rel='noopener noreferrer'>
												{link}
											</a>
										</li>
									))}
								</ul>
							)}
						</div>
						<div className='modal-bottom'>
							{modalType === 'preferences' ? (
								<button onClick={() => handleModal()}>Close</button>
							) : (
								<>
									<button
										className='cancel-button'
										onClick={() => handleModal()}
									>
										Cancel
									</button>
									{info.secondButton && (
										<button
											className='clear-links-button'
											onClick={handleClearLinks}
										>
											{info.secondButton}
										</button>
									)}
									<button className='main-button' onClick={handleMainClick}>
										{info.button}
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;