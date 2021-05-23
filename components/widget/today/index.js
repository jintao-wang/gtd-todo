import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CurrentUser from 'data/user';
import { signedStore } from 'store';
import CircleLabel from '../../common/circle_label';

export default function Today({
  style,
}) {
  const [signedState] = signedStore.useModel();
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (!signedState.isSigned) return;
    fetch(`/api/action/today-actions/?todayTimeStamp=${new Date().getTime()}`, {
      headers: {
        Authorization: `Bearer ${CurrentUser.current.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllData(data.message);
      });
  }, [signedState]);

  return (
    <ContainerSC style={style}>
      <TitleSC>
        {/* <DateIconSC onClick={handleAddOneAction}> */}
        {/*  <DateIcon date={new Date().getDate().toString()} /> */}
        {/* </DateIconSC> */}
        <span>{`Today ${new Date().getMonth() + 1}-${new Date().getDate().toString()}`}</span>
      </TitleSC>
      <TodoListSC>
        {
          allData.map((data) => (
            <TodoItemSC>
              <CircleLabel
                size={22}
                circleColor="rgb(240, 94, 87)"
              />
              <TodoDesSC>{data.content}</TodoDesSC>
            </TodoItemSC>
          ))
        }
      </TodoListSC>
    </ContainerSC>
  );
}

const ContainerSC = styled('div', 'style')`
  //color: #565656;
  //font-style: normal;
  //letter-spacing: 0;
  ////text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  //user-select: none;
  //cursor: pointer;
  //padding: 8px 40px 8px 20px;
  //background: linear-gradient(
  //        135deg, 
  //        #ffff88 81%,
  //        #ffff88 82%,
  //        #ffff88 82%,
  //        #ffffc6 100%
  //);
  //font-family: 'Comic Sans MS', cursive !important;
  //border-radius: 8px;

  color: rgb(255, 255, 255);
  text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  user-select: none;
  cursor: pointer;
  padding: 8px 40px 8px 20px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
  border-radius: 16px;
  font-family: 'Comic Sans MS', cursive !important;

  //::after {
  //  content: "";
  //  position: absolute;
  //  z-index: -1;
  //  right: -0px;
  //  bottom: 20px;
  //  width: 200px;
  //  height: 25px;
  //  background: rgba(0, 0, 0, 0.2);
  //  box-shadow: 2px 15px 5px rgb(0 0 0 / 40%);
  //  -moz-transform: matrix(-1, -0.1, 0, 1, 0, 0);
  //  -webkit-transform: matrix(-1, -0.1, 0, 1, 0, 0);
  //  -o-transform: matrix(-1, -0.1, 0, 1, 0, 0);
  //  -ms-transform: matrix(-1, -0.1, 0, 1, 0, 0);
  //  transform: matrix(-1, -0.1, 0, 1, 0, 0);
  //}
`;

const TitleSC = styled('div')`
  font-size: 24px;
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
  margin-top: 10px;
`;

const TodoItemSC = styled('div')`
  display: flex;
  margin: 8px 0;
  font-size: 18px;
  align-items: center;
`;

const TodoDesSC = styled('div')`
  margin-left: 8px;
`;
