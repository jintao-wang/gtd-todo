import React, { useEffect } from 'react';
import styled from 'styled-components';
import CircleLabel from '../../common/circle_label';
import DateIcon from "../../common/date_icon";

export default function Today() {
  return (
    <ContainerSC>
      <TitleSC>
        <DateIconSC>
          <DateIcon />
        </DateIconSC>
        <span>Today</span>
      </TitleSC>
      <TodoListSC>
        <TodoItemSC>
          <CircleLabel
            size={22}
            circleColor="rgb(242, 216, 125)"
          />
          <TodoDesSC>复习英标并学习e音</TodoDesSC>
        </TodoItemSC>
        <TodoItemSC>
          <CircleLabel
            size={22}
            circleColor="rgb(242, 216, 125)"
          />
          <TodoDesSC>阅读omnifocus文章</TodoDesSC>
        </TodoItemSC>
      </TodoListSC>
    </ContainerSC>
  );
}

const ContainerSC = styled('div')`
  border-radius: 4px;
  color: rgb(255, 255, 255);
  text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  user-select: none;
  cursor: pointer;
  //padding-left: 40px;
`;

const TitleSC = styled('div')`
  font-size: 26px;
  font-weight: 500;
  position: relative;
  display: flex;
  align-items: center;
`;

const DateIconSC = styled('div')`
  margin-right: 8px;
  //position: absolute;
  //top: 0;
  //bottom: 0;
  //margin: auto;
  //left: -30px;
  //display: flex;
  //align-items: center;
`;

const TodoListSC = styled('div')`
  
`;

const TodoItemSC = styled('div')`
  display: flex;
  margin: 5px 0;
`;

const TodoDesSC = styled('div')`
  margin-left: 8px;
`;
