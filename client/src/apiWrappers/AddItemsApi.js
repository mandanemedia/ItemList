export const url = 'http://localhost:9000/items';
const AddItemsApi = async (listId:string, description:string, order:number) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listId, description, order }),
    };
    const response = await fetch(url, requestOptions);
    const newData = await response.json();
    return newData;
  }
  catch (e) {
    return Promise.reject(new Error('Error in AddItemsApi'));
  }
};

export default AddItemsApi;
