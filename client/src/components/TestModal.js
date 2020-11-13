import React, { useState } from 'react';
import { Modal, Alert } from 'react-bootstrap';

const Test = ({ type, message }: { type:string, message:string}) => {
  const [show, setShow] = useState(true);

  const handleSecondaryButton = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleSecondaryButton}>
        <Alert variant={type}>
          {message}
          <button type="button" className="close">
            <span aria-hidden="true">×</span>
          </button>
        </Alert>
      </Modal>
    </>
  );
};

export default Test;
