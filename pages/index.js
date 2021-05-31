import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginManage from 'components/widget/login_manage';
import Content from 'components/pages/home/content';
import Navigation from 'components/layout/navigation';

export default () => (
  <ContainerSC>
    <LoginManage />
    <Content />
    <Navigation />
  </ContainerSC>
);

const ContainerSC = styled('div')`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-sizing: border-box;
`;
