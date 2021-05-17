import React from 'react';
import styled from 'styled-components';
import Drag from '../components/common/drag';
import Today from '../components/widget/today';

export default () => (
  <ContainerSC>
    <Drag>
      <Today />
    </Drag>
  </ContainerSC>
);

const ContainerSC = styled('div')`
  height: 100vh;
  position: relative;
`;
