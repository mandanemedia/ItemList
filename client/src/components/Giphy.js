// @flow
import React from 'react';
import GiphyYears from './GiphyYears';

const Giphy = (
  { items } : { items:Array<any> },
) => (
  <div className="sidebar">
    <GiphyYears data={items} />
  </div>
);

export default Giphy;
