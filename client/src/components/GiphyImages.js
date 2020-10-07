// @flow
import React from 'react';

const GiphyImages = ({ data }:{ data:Array<any> }) => (
  <div className="GiphyImages">
    {data.map(
      (url) => (<img className="imageItem" src={url} key={url} alt="gify" />),
    )}
  </div>
);

export default GiphyImages;
