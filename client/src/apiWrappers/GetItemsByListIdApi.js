export const url = 'http://localhost:9000/items';

const GetItemsByListIdApi = async (id:string) => {
  try {
    const response = await fetch(`${url}?listId=${id.trim()}`);
    const newData = await response.json();
    console.log(newData);
    return newData;
  }
  catch (e) {
    return Promise.reject(new Error('Error in GetItemsByListIdApi'));
  }
};

export default GetItemsByListIdApi;
