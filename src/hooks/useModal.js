import React from "react";

export const useModal = () => {
  const [modal, setModal] = React.useState(false);
  const [modalType, setModalType] = React.useState(null);

  const handleModal = (type = false) => {
    setModal(!modal);
    if (type) setModalType(type);
  };

  return { modal, handleModal, modalType };
};
