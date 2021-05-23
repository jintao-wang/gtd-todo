import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Drag from 'components/common/drag';
import Today from 'components/widget/today';
import LoginManage from 'components/widget/login_manage';
import AddAction from 'components/widget/add_action';
import { getUrlParameter } from '../tools/common';

export default () => {
  const [background, setBackground] = useState(null);

  useEffect(() => {
    setBackground(getUrlParameter('background'));
  }, []);

  return (
    <ContainerSC background={background}>
      <LoginManage />
      <Drag position="left_center">
        <AddAction />
      </Drag>
      <Drag>
        <Today />
      </Drag>
    </ContainerSC>
  );
};

const ContainerSC = styled('div', 'background')`
  height: 100vh;
  position: relative;
  background: ${(props) => props.background && props.background};
`;
