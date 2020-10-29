export const url = 'http://localhost:9000/lists';

const GetListByIdApi = async (id:string) => {
  try {
    const response = await fetch(`${url}/${id.trim()}`);
    const newData = await response.json();
    return newData;
  }
  catch (e) {
    return Promise.reject(new Error('Error in GetListByIdApi'));
  }
};

export default GetListByIdApi;
