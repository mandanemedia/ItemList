// @flow
import React, { useEffect, useState } from 'react';
import List from '../components/List';
import GetItemsByListIdApi from '../apiWrappers/GetItemsByListIdApi';
import AddItemsApi from '../apiWrappers/AddItemsApi';
import RemoveItemsApi from '../apiWrappers/RemoveItemsApi';
import UpdateItemsOrderApi from '../apiWrappers/UpdateItemsOrderApi';
import UpdateItemsDescriptionApi from '../apiWrappers/UpdateItemsDescriptionApi';

const App = () => {
  const [list, setList] = useState([]);
  const [listId] = useState('1000ef5c-1657-46b2-bb36-c74080e00a11');
  const [loading, setLoading] = useState(true);

  const getList = async () => {
    try {
      const newList = await GetItemsByListIdApi(listId);
      newList.sort((a, b) => (a.order > b.order ? 1 : -1));

      setList(newList);
      setLoading(false);
    }
    catch (e) {
      setLoading(false);
    }
  };

  const onAddItem = async (description) => {
    await AddItemsApi(listId, description, (list.length + 1));
    getList();
  };

  const onDecreaseOrder = async (itemId, order) => {
    const newOrder = parseInt(order, 10) > 1 ? parseInt(order, 10) - 1 : 1;
    await UpdateItemsOrderApi(itemId, newOrder);
    getList();
  };

  const onIncreaseOrder = async (itemId, order) => {
    let newItemId;
    const newOrder = order < list.length ? order + 1 : order;
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].order === newOrder) {
        newItemId = list[i].itemId;
      }
    }
    if (newItemId) {
      await UpdateItemsOrderApi(newItemId, order);
    }
    getList();
  };

  const onRemoveItem = async (itemId, order) => {
    await RemoveItemsApi(itemId);
    // adjust the order for the rest of the items
    let newItemId;
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].order > order) {
        newItemId = list[i].itemId;
        break;
      }
    }
    if (newItemId) {
      await UpdateItemsOrderApi(newItemId, order);
    }
    getList();
  };

  const onUpdateDescription = async (itemId, description) => {
    console.log(`${description} is set`);
    await UpdateItemsDescriptionApi(itemId, listId, description);
    // getList();
  };

  const onReset = () => {

  };

  useEffect(() => {
    getList();
  }, [listId]);

  return (
    <>
      {!loading
        ? (
          <List
            id={listId}
            items={list}
            onReset={onReset}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            onIncreaseOrder={onIncreaseOrder}
            onDecreaseOrder={onDecreaseOrder}
            onUpdateDescription={onUpdateDescription}
          />
        )
        : <span>Loading List</span>}
    </>
  );
};
export default App;
