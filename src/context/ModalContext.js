import React from 'react';
import { useModal } from '../hooks/useModal';
import Modal from '../components/Modals/Modal';

export const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
	const { modal, handleModal, modalType, links } = useModal();

	if (modal) document.body.style.overflow = 'hidden';
	else document.body.style.overflow = 'auto';

	return (
		<ModalContext.Provider value={{ modal, handleModal, modalType, links }}>
			<Modal />
			{children}
		</ModalContext.Provider>
	);
};

export default ModalContext;
