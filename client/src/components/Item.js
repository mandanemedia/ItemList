// @flow
import React, { useState, useEffect } from 'react';
import {
  ImArrowDown, ImArrowUp, ImCross,
} from 'react-icons/im';

const Item = ({
  description, itemId, listId, order,
  onRemoveItem, onIncreaseOrder, onDecreaseOrder, onUpdateDescription,
}: { description:string, itemId:string, listId:string, order:string,
      onRemoveItem:any, onIncreaseOrder:any, onDecreaseOrder:any, onUpdateDescription:any }) => {
  const [itemText, setItemText] = useState(description);
  const [itemChanged, setitemChanged] = useState(false);

  const removeItem = () => {
    onRemoveItem(itemId, order);
  };

  const increaseOrder = () => {
    onDecreaseOrder(itemId, order);
  };

  const decreaseOrder = () => {
    onIncreaseOrder(itemId, order);
  };

  useEffect(() => {
    const delayUpdateDescription = setTimeout(() => {
      if (itemChanged)
      {
        onUpdateDescription(itemId, itemText);
      }
    }, 2000);

    return () => clearTimeout(delayUpdateDescription);
  }, [itemText]);

  return (
    <div className="itemSection">
      <textarea className="description" value={itemText} onChange={(e) => { setItemText(e.target.value); setitemChanged(true); }} />
      <div className="editItemSection">
        <button type="button" className="editItemButtonRight" onClick={increaseOrder}>
          <ImArrowUp />
        </button>
        <button type="button" className="editItemButtonLeft" onClick={removeItem}>
          <ImCross />
        </button>
        <button type="button" className="editItemButtonLeft" onClick={decreaseOrder}>
          <ImArrowDown />
        </button>
      </div>
      <input type="hidden" value={itemId} name="itemId" />
      <input type="hidden" value={listId} name="listId" />
      <input type="hidden" value={order} name="order" />
    </div>
  );
};

export default Item;
