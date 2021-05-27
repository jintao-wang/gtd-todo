import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginManage from 'components/widget/login_manage';
import HomePage from 'components/pages/home_page';
import Navigation from 'components/layout/navigation';

export default () => (
  <ContainerSC>
    <LoginManage />
    <HomePage />
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
