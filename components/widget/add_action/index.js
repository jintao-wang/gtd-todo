import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function AddAction() {
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    document.addEventListener('keypress', (e) => {
      if (e.key === 'a' && e.ctrlKey) {
        setIsAdd(true);
      }
    });
  }, []);

  if (isAdd) {
    return (
      <ContainerSC>
        <ContentSC>
          <InputSC placeholder="action name" />
          <MenuSC>
            <div />
            <DatesSC>
              <input
                type="text"
                className="start"
                placeholder="开始时间"
              />
              <input
                type="text"
                className="end"
                placeholder="结束时间"
              />
            </DatesSC>
          </MenuSC>
        </ContentSC>
      </ContainerSC>
    );
  }
  return null;
}

const ContainerSC = styled('div')`
  width: 400px;
  height: 80px;
  background: white;
  text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  padding: 10px 15px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const ContentSC = styled('div')`
  position: relative;
  padding-left: 10px;
  box-sizing: border-box;
  height: 100%;
  
  ::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: aqua;
  }
`;

const InputSC = styled('input')`
  width: 100%;
  box-sizing: border-box;
  height: 55%;
  outline: none;
  border: none;
  font-size: 16px;
`;

const MenuSC = styled('div')`
  width: 100%;
  height: 45%;
  display: flex;
  justify-content: space-between;
`;

const DatesSC = styled('div')`
  input {
    width: 100px;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    border: none;
  }
`;
