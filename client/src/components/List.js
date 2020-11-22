// @flow
import React from 'react';
import Item, {type ItemFunction} from './Item';
import ErrorBoundary from '../components/ErrorBoundary';
import AddItem from './AddItem';

const List = (
  {
    id, items, onReset, onAddItem, onRemoveItem,
    onIncreaseOrder, onDecreaseOrder, onUpdateDescription,
  }
  : { id:string, items:Array<any>, onReset:()=>void, onAddItem:()=>void, 
    onRemoveItem: ItemFunction, onIncreaseOrder: ItemFunction,
    onDecreaseOrder: ItemFunction, onUpdateDescription: ItemFunction},
) => (
  <div className="list" key={id}>
    <AddItem onAddItem={onAddItem} />
    <div className="items">
      {
        items.map(({
          description, itemId, listId, order,
        }) => (
          <ErrorBoundary>
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
          </ErrorBoundary>
        ))
    }
    </div>
    <div className="resetSection">
      <button type="button" className="resetList" onClick={onReset}> Reset </button>
    </div>
  </div>
);

export default List;
