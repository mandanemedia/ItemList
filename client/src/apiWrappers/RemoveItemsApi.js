export const url = 'http://localhost:9000/items/';
const RemoveItemsApi = async (itemId:string) => {
  try {
    const requestOptions = {
      method: 'Delete',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(url + itemId, requestOptions);
    const newData = await response.json();
    return newData;
  }
  catch (e) {
    return Promise.reject(new Error('Error in RemoveItemsApi'));
  }
};

export default RemoveItemsApi;
