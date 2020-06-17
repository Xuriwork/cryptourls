import { useState } from "react";

export const useModal = () => {
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleModal = (type = false) => {
    setModal(!modal);
    if (type) setModalType(type);
  };

  return { modal, handleModal, modalType };
};
