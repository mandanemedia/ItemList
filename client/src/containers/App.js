// @flow
import React from 'react';
import { v4 as uuid } from 'uuid';
import CustomModal from '../components/CustomModal';
import AddList from '../apiWrappers/AddList';

const App = () => {
  const newList = () => {
    const newListId = uuid();
    AddList(newListId);
    window.location = `${window.location.href.split('?')[0]}list?listId=${newListId}`;
  };

  return (
    <div className="createNewListModal">
      <CustomModal
        mainButton="Create List"
        disply={false}
        title="New List"
        message="Would you like to create a new List?"
        primaryButton="Yes"
        secondaryButton="Cancel"
        onPrimaryButton={newList}
      />
    </div>
  );
};
export default App;
