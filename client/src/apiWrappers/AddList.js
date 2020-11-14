export const url = 'http://localhost:9000/lists';

const AddList = async (listId) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listId }),
    };
    const response = await fetch(url, requestOptions);
    const newData = await response.json();
    return newData;
  }
  catch (e) {
    return ({ error: `Add List Error - ${e}` });
  }
};

export default AddList;
