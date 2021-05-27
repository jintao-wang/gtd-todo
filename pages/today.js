import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Today from 'components/widget/today';

export default () => {
  const [newAction, setNewAction] = useState(null);

  return (
    <ContainerSC>
      <Today
        newAction={newAction}
        finishUpdateNewAction={() => setNewAction(null)}
      />
    </ContainerSC>
  );
};

const ContainerSC = styled('div', 'background')`
  height: 100vh;
  position: relative;
  padding: 20px 10px;
  box-sizing: border-box;
`;
