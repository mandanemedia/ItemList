export const url = 'http://localhost:9000/items';
const UpdateItemsOrderApi = async (itemId:string, order:number) => {
  try {
    const requestOptions = {
      method: 'Put',
      headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${url}/${itemId}/order/${order}`, requestOptions);
    const newData = await response.json();
    return newData;
  }
  catch (e) {
    return Promise.reject(new Error('Error in UpdateItemsOrderApi'));
  }
};

export default UpdateItemsOrderApi;
