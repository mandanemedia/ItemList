export const DataURL = 'http://localhost:9000/giphy?search=';

const fetchData = async (search) => {
  try {
    const response = await fetch(DataURL + search.trim());
    const newData = await response.json();

    // convert it to array
    const newArray = [];
    for (const [key, value] of Object.entries(newData)) {
      newArray.push({
        year: key,
        images: value,
      });
    }
    console.log(newArray);
    return newArray;
  }
  catch (e) {
    return Promise.reject(new Error('Error in FetchData'));
  }
};

export default fetchData;
