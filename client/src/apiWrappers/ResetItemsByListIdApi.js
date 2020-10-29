export const url = 'http://localhost:9000/items/list/';

const ResetItemsByListIdApi = async (listId:string) => {
  try {
    const requestOptions = {
      method: 'Delete',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(url + listId, requestOptions);
    const newData = await response.json();
    return newData;
  }
  catch (e) {
    return Promise.reject(new Error('Error in ResetItemsByListIdApi'));
  }
};

export default ResetItemsByListIdApi;
