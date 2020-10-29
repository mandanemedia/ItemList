export const url = 'http://localhost:9000/items';
const UpdateItemsDescriptionApi = async (itemId:string, listId:string, description:string) => {
  try {
    const requestOptions = {
      method: 'Put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listId, description }),
    };
    const response = await fetch(`${url}/${itemId}`, requestOptions);
    const newData = await response.json();
    return newData;
  }
  catch (e) {
    return Promise.reject(new Error('Error in UpdateItemsDescriptionApi'));
  }
};

export default UpdateItemsDescriptionApi;
