// @flow
import React, { useEffect, useState } from 'react';
import * as queryString from 'query-string';
import validator from 'validator';
import { v4 as uuid } from 'uuid';
import List from '../components/List';
import GetItemsByListIdApi from '../apiWrappers/GetItemsByListIdApi';
import AddItemsApi from '../apiWrappers/AddItemsApi';
import RemoveItemsApi from '../apiWrappers/RemoveItemsApi';
import UpdateItemsOrderApi from '../apiWrappers/UpdateItemsOrderApi';
import UpdateItemsDescriptionApi from '../apiWrappers/UpdateItemsDescriptionApi';
import AddList from '../apiWrappers/AddList';
import GetListByIdApi from '../apiWrappers/GetListByIdApi';
import ResetItemsByListIdApi from '../apiWrappers/ResetItemsByListIdApi';

const ListContainer = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const parsedQueryString = queryString.parse(window.location.search);

  const isExistingList = async (id) => {
    const existingList = await GetListByIdApi(id);
    if (existingList.error)
    {
      // if list does not exist, create it with the given id
      await AddList(id);
    }
  };

  const onAddList = () =>
  {
    // Create a new list with new id and redirect
    const newListId = uuid();
    AddList(newListId);
    window.location = `${window.location.href.split('?')[0]}?listId=${newListId}`;
  };

  useEffect(() => {
    if (parsedQueryString.listId && validator.isUUID(parsedQueryString.listId)) {
      isExistingList(parsedQueryString.listId);
    }
    else {
      onAddList();
    }
  }, [parsedQueryString.listId]);

  const listId = parsedQueryString.listId;

  const getItems = async () => {
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
    getItems();
  };

  const onDecreaseOrder = async (itemId, order) => {
    const newOrder = parseInt(order, 10) > 1 ? parseInt(order, 10) - 1 : 1;
    await UpdateItemsOrderApi(itemId, newOrder);
    getItems();
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
    getItems();
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
    getItems();
  };

  const onUpdateDescription = async (itemId, description) => {
    await UpdateItemsDescriptionApi(itemId, listId, description);
  };

  const onReset = async () => {
    await ResetItemsByListIdApi(listId);
    getItems();
  };

  useEffect(() => {
    getItems();
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
  ); };

export default ListContainer;
