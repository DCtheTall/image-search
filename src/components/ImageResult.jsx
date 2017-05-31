import React from 'react';
import PropTypes from 'prop-types';

function ImageResult({ name, thumbnail, url }) {
  return (
    <div className="col-sm-6 col-xs-12">
      <button
        onClick={() => window.open(url)}
      >
        <img
          src={thumbnail}
          alt={name}
        />
      </button>
    </div>
  );
}
ImageResult.propTypes = {};

export default ImageResult;
