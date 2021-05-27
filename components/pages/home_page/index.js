import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export default function HomePage() {
  const [isFront, setFront] = useState(true);

  return (
    <ContainerSC>
      <CardContainerSC />
    </ContainerSC>
  );
}

const ContainerSC = styled('div')`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: rgb(43, 43, 43);
  padding: 38px 0 0 65px;
`;

const TopBarSC = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  padding-left: 90px;
  padding-top: 5px;
  padding-bottom: 5px;
  top: 0;
  left: 0;
  box-shadow: 0px 15px 20px -16px rgba(0,0,0,1);
  box-sizing: border-box;
  z-index: 1;
`;

const InfoSC = styled('div')`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  color: rgb(4, 106, 138);
  text-shadow: 2px 2px 5px rgb(0, 0, 0, .6);
`;

const ProjectChooseSC = styled('div')`
  display: flex;
  align-items: center;
  margin-left: 60px;
  color: rgb(153, 157, 161);
  font-weight: 500;
  font-size: 14px;
  
  .select {
    margin-left: 20px;
    outline: none;
    padding: 2px 8px;
    border-radius: 4px;
    color: rgb(153, 157, 161);
    border-color: rgb(93, 96, 96);
    background: rgb(59, 63, 65);
    font-size: 11px;
  }
`;

const CardChooseSC = styled(ProjectChooseSC)`
  //margin-left: 60px;
`;

const SmallItemListSC = styled('div')`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`;

const SmallItemSC = styled('div')`
 padding: 0 20px;
 cursor: pointer;
 .img {
  margin-top: 5px;
  width: 20px;
 }
`;

const CardContainerSC = styled('div')`
  width: 100%;
  min-height: 100%;
  flex: 1;
  position: relative;
  display: flex;
  perspective: 800px;
  z-index: 0;
`;

const DoubleCard = styled('div', ['isFront'])`
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  transform: ${(props) => (props.isFront ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  transform-origin: top;
  transition: 0.4s;
`;

const CardSC = styled('div')`
  padding: 20px 25px;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  outline: none;
  color: rgb(186, 186, 186);
  
  span {
    outline: none;
  }
  
  p {
   margin-block-start: .8em;
   margin-block-end: .8em; 
  }
  
`;

const CardFrontSC = styled(CardSC)`
  backface-visibility:hidden;
  background: rgb(43, 43, 43);
  transform: rotateY(180deg);
`;

const CardBackSC = styled(CardSC)`
  backface-visibility:hidden;
  background: rgb(36,34,34);
`;

const ToLeftSC = styled('img')`
  position: absolute;
  right: 20px;
  bottom: 20px;
  height: 12px;
  cursor: pointer;
`;
