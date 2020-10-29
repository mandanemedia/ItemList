import React, { useState } from 'react';

const AddItem = (props) => {
  const [description, setDescription] = useState('');
  const { onAddItem } = props;

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const addItem = () => {
    onAddItem(description);
  };

  return (
    <div className="addItemSection">
      <input type="text" value={description} name="newItem" className="addItemDescription" placeholder="Enter Item" onChange={changeDescription} />
      <button type="button" className="addItembutton" onClick={addItem}> Add </button>
    </div>
  );
};
export default AddItem;
