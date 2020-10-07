// @flow
import React, { useEffect, useState } from 'react';
import GiphySearch from '../components/GiphySearch';
import Giphy from '../components/Giphy';
import fetchData from '../apiWrappers/fetchData';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const newData = await fetchData('puppy');
        setData(newData);
        setLoading(false);
      }
      catch (e) {
        setLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const onChangeSearch = async (e) => {
    const search = e.target.value.toLowerCase();
    setLoading(true);
    const newData = await fetchData(search);
    setData(newData);
    setLoading(false);
  };

  return (
    <>
      <GiphySearch onChangeSearch={onChangeSearch} />
      {!loading
        ? (<Giphy items={data} />)
        : <span>Loading List</span>}
    </>
  );
};
export default App;
