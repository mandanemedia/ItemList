import React from 'react';

const GiphySearch = (props) => {
  const { onChangeSearch } = props;

  return (
    <div className="GiphySearch">
      <input type="text" name="search" className="searchBox" placeholder="Giphy Search" onChange={onChangeSearch} />
    </div>
  );
};
export default GiphySearch;
