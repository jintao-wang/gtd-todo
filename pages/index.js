import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Drag from 'components/common/drag';
import Today from 'components/widget/today';
import LoginManage from 'components/widget/login_manage';
import AddAction from 'components/widget/add_action';

export default () => (
  <ContainerSC>
    <LoginManage />
    <Drag position="left_center">
      <AddAction />
    </Drag>
    <Drag>
      <Today />
    </Drag>
  </ContainerSC>
);

const ContainerSC = styled('div')`
  height: 100vh;
  position: relative;
`;
