import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function DateIcon({
  size,
}) {
  return (
    <ContainerSC size={size}>
      <TopPartSC />
      <DatePartSC>22</DatePartSC>
    </ContainerSC>
  );
}

DateIcon.propTypes = {
  size: PropTypes.number,
};

DateIcon.defaultProps = {
  size: 22,
};

const ContainerSC = styled('div', 'size')`
  width: 20px;
  height: 22px;
  position: relative;
  transform: scale(${(props) => props.size / 22});
`;

const TopPartSC = styled('div')`
  width: 100%;
  height: 22%;
  background-image: linear-gradient(to bottom right, rgb(232, 94, 87), rgb(248, 93, 84));
  border-radius: 3px 3px 0 0;
  font-size: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
`;

const DatePartSC = styled('div')`
  width: 100%;
  height: 78%;
  background: white;
  border-radius: 0 0 3px 3px;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(44, 44, 44);
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
`;
