import React from 'react';
import { useModal } from '../hooks/useModal';
import Modal from '../components/Modals/Modal';

export const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
	const { modal, handleModal, modalType } = useModal();
	return (
		<ModalContext.Provider value={{ modal, handleModal, modalType }}>
			<Modal />
			{children}
		</ModalContext.Provider>
	);
};

export default ModalContext;
