import { useState, useContext } from 'react';
import { StateContext } from '../context/StateContext';
import cogoToast from 'cogo-toast';

export const useModal = () => {
	const [modal, setModal] = useState(false);
	const [modalType, setModalType] = useState(null);
	const { links } = useContext(StateContext);

	const handleModal = (type = false) => {
		if (type === 'saved-links' && links.length === 0) {
			return cogoToast.info("You haven't added any links", {
				hideAfter: 5,
			});
		};
		setModal(!modal);
		if (type) setModalType(type);
	};

	return { modal, handleModal, modalType, links };
};
