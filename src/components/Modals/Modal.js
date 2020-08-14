import React, { useContext, useState } from 'react';

import cogoToast from 'cogo-toast';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";

import { ModalContext } from '../../context/ModalContext';
import { StateContext } from '../../context/StateContext';
import { emailsCollection } from '../../utils/Firebase';

export const Modal = () => {
	const { setLinks } = useContext(StateContext);
	const { handleModal, modal, modalType, links } = useContext(ModalContext);
	const { register, handleSubmit } = useForm();
	const [recaptchaCode, setRecaptchaCode] = useState(null);

	window.onclick = (e) => {
		const modalOverlay = document.getElementById('modal-overlay');
		if (e.target === modalOverlay) handleModal();
	};

	const handleMainClick = () => {
		if (modalType === 'saved-links') {
			return links.forEach((link) => window.open(link));
		}
		cogoToast.info("Hasn't sent, this is disabled sorry 😥", {
			hideAfter: 5,
		});
	};

	const handleOnChange = (value) => setRecaptchaCode(value);

	const handleSendEmail = handleSubmit((data) => {
		if (!recaptchaCode) {
			 return cogoToast.error('You didn\'t complete the ReCAPTCHA 😕', {
				hideAfter: 5,
			});
		}
		const email = {
			email: data.email,
			subject: data.subject,
			message: data.message,
		};

		emailsCollection
			.add(email)
			.then(() => cogoToast.success('Email sent! 🥳', { hideAfter: 5 }))
			.catch((error) => console.error(error.text));
	});

	let modalInfo = {};

	if (modalType === 'subscribe') {
		modalInfo = {
			heading: 'Subscribe to updates',
			paragraph:
				'Get notified when we add new features. Gain exclusive access to new projects. Opt out anytime.',
			button: 'Subscribe',
			mainButton: handleMainClick,
		};
	} else if (modalType === 'send-feedback') {
		modalInfo = {
			heading: 'Leave feedback',
			paragraph:
				'Have a suggestion or want us to add another news source? Send us a message using the form below',
			button: 'Submit',
			mainButton: handleSendEmail,
		};
	} else if (modalType === 'preferences') {
		modalInfo = {
			heading: 'Preferences',
			paragraph:
				"Personal preferences is an upcoming feature that will let you fine tune your Devurls experience. You'll be able to:",
		};
	} else if (modalType === 'saved-links') {
		modalInfo = {
			heading: 'Saved links',
			clearLinksButton: 'Clear links',
			button: 'Open links',
			mainButton: handleMainClick,
		};
	}

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
							<h3>{modalInfo.heading}</h3>
							<p>{modalInfo.paragraph}</p>
							{modalType === 'send-feedback' && (
								<form>
									<input
										type='text'
										name='email'
										placeholder='Your email'
										ref={register({ required: true, pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/ })}
									/>
									<input
										type='text'
										name='subject'
										placeholder='Subject'
										ref={register({ required: true })}
										style={{ margin: '10px 0' }}
									/>
									<textarea
										name='message'
										placeholder='Your thoughts'
										ref={register({ required: true })}
									></textarea>
									<ReCAPTCHA
										sitekey='6LeD6b4ZAAAAAFk3jGBM-PJ7-80W_l2OjqwxSpK4'
										onChange={handleOnChange}
										style={{ marginTop: '10px' }}
									/>
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
									{modalInfo.clearLinksButton && (
										<button
											className='clear-links-button'
											onClick={handleClearLinks}
										>
											{modalInfo.clearLinksButton}
										</button>
									)}
									<button
										className='main-button'
										onClick={modalInfo.mainButton}
									>
										{modalInfo.button}
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
