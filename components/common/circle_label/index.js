import React from 'react';
import PropTypes from 'prop-types';

export default function CircleLabel({
  size,
  circleColor,
  makeSureColor,
  selected,
}) {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
    >
      <path
        d="M511.6 959.7C264.8 959.7 63.9 758.9 63.9 512S264.8 64.4 511.6 64.4 959.3 265.2 959.3 512 758.5 959.7 511.6 959.7z m0-805.8c-197.5 0-358.2 160.7-358.2 358.2s160.7 358.2 358.2 358.2S869.8 709.5 869.8 512 709.1 153.9 511.6 153.9z"
        fill={selected ? makeSureColor : circleColor}
      />
      <path
        d="M457 701.1c-11.9 0-23.3-4.7-31.7-13.1l-139-139c-17.5-17.5-17.5-45.8 0-63.3s45.8-17.5 63.3 0L457 593l216.6-216.6c17.5-17.5 45.8-17.5 63.3 0s17.5 45.8 0 63.3L488.6 688c-8.4 8.4-19.7 13.1-31.6 13.1z"
        fill={selected ? makeSureColor : 'rgba(0,0,0,0)'}
      />
    </svg>
  );
}

CircleLabel.propTypes = {
  size: PropTypes.number,
  circleColor: PropTypes.string,
  makeSureColor: PropTypes.string,
  selected: PropTypes.bool,
};

CircleLabel.defaultProps = {
  size: 20,
  circleColor: '#fff',
  makeSureColor: 'rgb(86, 87, 87)',
  selected: false,
};
