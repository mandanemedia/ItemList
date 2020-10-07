// @flow
import React from 'react';
import GiphyImages from './GiphyImages';

const GiphyYears = ({ data }:{ data:Array<any> }) => (
  <div className="GiphyYears">
    {
        data.map(({ year, images }) => (
          <div key={year}>
            <h3>
              {year}
            </h3>
            <GiphyImages data={images} />
          </div>
        ))
    }
  </div>
);

export default GiphyYears;
