// @flow
import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import AddList from '../apiWrappers/AddList';

const App = () => {
  useEffect(() => {
    const newListId = uuid();
    AddList(newListId);
    window.location = `${window.location.href.split('?')[0]}list?listId=${newListId}`;
  }, []);
  return (
    <div>
      Loading a new List
    </div>
  );
};
export default App;
