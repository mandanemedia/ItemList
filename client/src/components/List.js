// @flow
import React from 'react';
import Item from './Item';
import AddItem from './AddItem';

const List = (
  {
    id, items, onReset, onAddItem, onRemoveItem,
    onIncreaseOrder, onDecreaseOrder, onUpdateDescription,
  }
  : { id:string, items:Array<any>, onReset:any, onAddItem:any, onRemoveItem:any,
    onIncreaseOrder:any, onDecreaseOrder:any, onUpdateDescription:any },
) => (
  <div className="list" key={id}>
    <AddItem onAddItem={onAddItem} />
    <div className="items">
      {
        items.map(({
          description, itemId, listId, order,
        }) => (
          <Item
            key={itemId}
            description={description}
            itemId={itemId}
            listId={listId}
            order={order}
            onRemoveItem={onRemoveItem}
            onIncreaseOrder={onIncreaseOrder}
            onDecreaseOrder={onDecreaseOrder}
            onUpdateDescription={onUpdateDescription}
          />
        ))
    }
    </div>
    <div className="resetSection">
      <button type="button" className="resetList" onClick={onReset}> Reset </button>
    </div>
  </div>
);

export default List;
