// @flow
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Modal from '../components/Modal';
import AddList from '../apiWrappers/AddList';
import Toast from '../components/Toast';

const App = () => {
  const [toast, setToast] = useState({
    type: 'danger',
    message: 'This is an alert.',
    autohide: false,
    display: false,
  });

  const onClose = () => { setToast({ ...toast, display: false }); };

  const newList = async () => {
    const newListId = uuid();
    const list = await AddList(newListId);
    if (list && list.listId) {
      setToast({
        autohide: true, display: true, type: 'primary', message: `A new list is created with id:${list.listId}`,
      });
      setTimeout(() => {
        window.location = `${window.location.href.split('?')[0]}list?listId=${newListId}`;
      }, 1500);
    }
    if (list.error) {
      setToast({
        ...toast, display: true, type: 'danger', message: list.error.toString(),
      });
    }
  };

  return (
    <div className="createNewListModal">
      <Modal
        mainButton="Create List"
        disply={false}
        title="New List"
        message="Would you like to create a new List?"
        primaryButton="Yes"
        secondaryButton="Cancel"
        onPrimaryButton={newList}
      />
      <Toast
        type={toast.type}
        message={toast.message}
        autohide={toast.autohide}
        display={toast.display}
        onClose={onClose}
      />
    </div>
  );
};
export default App;
