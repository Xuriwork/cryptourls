import React from 'react';
import { ModalContext } from '../../context/ModalContext';
import cogoToast from 'cogo-toast';

export const Modal = () => {
	const { handleModal, modal, modalType } = React.useContext(ModalContext);

	if (modal) document.body.style.overflow = 'hidden';
	else document.body.style.overflow = 'auto';
    
    window.onclick = (e) => {
        const modalOverlay = document.getElementById('modal-overlay');
        if (e.target === modalOverlay) handleModal();
    }

	let info = {};

	if (modalType === 'subscribe') {
		info = {
			heading: 'Subscribe to updates',
			paragraph:
                'Get notified when we add new features. Gain exclusive access to new projects. Opt out anytime.',
            button: 'Submit'
		};
	} else if (modalType === 'send-feedback') {
		info = {
			heading: 'Leave feedback',
			paragraph:
                'Have a suggestion or want us to add another news source? Send us a message using the form below',
            button: 'Subscribe'
		};
	} else if (modalType === 'preferences') {
        info = {
            heading: 'Preferences',
            paragraph: 'Personal preferences is an upcoming feature that will let you fine tune your Devurls experience. You\'ll be able to:',
        }
    }

	const handleFeebackSend = () => {
		cogoToast.info("Hasn't been send because this is disabled sorry 😥", {
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
						</div>
						<div className='modal-bottom'>
                            {
                                modalType === 'preferences' ? <button onClick={() => handleModal()}>Close</button>
							    : (
                                <>
                                    <button className='cancel-button' onClick={() => handleModal()}>
                                        Cancel
                                    </button>
                                    <button onClick={handleFeebackSend}>{info.button}</button>
                                </>
                                )
                            }
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
