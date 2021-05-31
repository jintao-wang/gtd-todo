import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Collect from '../collect';

export default function Content() {
  return (
    <ContainerSC>
      <NavigationTopSC />
      <CollectSC>
        <Collect />
      </CollectSC>
    </ContainerSC>
  );
}

const ContainerSC = styled('div')`
  width: 100%;
  height: 100%;
  padding-left: 74px;
  position: relative;
  box-sizing: border-box;
`;

const NavigationTopSC = styled('div')`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  -webkit-app-region: drag;
`;

const ContentSC = styled('div')`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: rgb(30, 30, 32);
  padding: 50px 0 0 20px;
`;

const CollectSC = styled(ContentSC)`
`;
