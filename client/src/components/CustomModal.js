import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const CustomModal = ({
  mainButton, disply, title, message, primaryButton, secondaryButton,
  onPrimaryButton,
}: { mainButton:string,
 disply:boolean, title:string, message:string, primaryButton:string, secondaryButton:string,
     onPrimaryButton:()=>void }) => {
  const [show, setShow] = useState(disply);

  const handlePrimaryButton = () => {
    setShow(false);
    onPrimaryButton();
  };
  const handleSecondaryButton = () => {
    setShow(false);
  };

  const displayModal = () => {
    setShow(true);
  };

  return (
    <>
      <Button onClick={displayModal}>{mainButton}</Button>
      <Modal show={show} onHide={handleSecondaryButton} animation centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSecondaryButton}>
            {secondaryButton}
          </Button>
          <Button variant="primary" onClick={handlePrimaryButton}>
            {primaryButton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CustomModal;
