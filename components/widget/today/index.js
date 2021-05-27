import React, {
  useEffect, useLayoutEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import CurrentUser from 'data/user';
import { signedStore, triggerGetAction } from 'store';
import { useImmer } from 'use-immer';
import CircleLabel from '../../common/circle_label';

const electron = require('electron');

const stateColor = {
  overtime: '#ff435d',
  closeSoon: '#FFCB2C',
  feature: '#D3D3D3',
  finish: '#d0cece',
};

export default function Today({
  newAction,
  finishUpdateNewAction,
  style,
}) {
  const [signedState] = signedStore.useModel();
  const [update, setUpdate] = useState(false);
  const updateRef = useRef(false);
  const [allData, updateAllData] = useImmer([]);
  const allDataRef = useRef(null);
  const [focusAction, updateFocusAction] = useImmer({
    preData: null,
    aimData: null,
  });

  useEffect(() => {
    if (!electron) return;
    const { ipcRenderer } = electron;
    const handleAddActionFromMain = (e, message) => {
      updateRef.current = !updateRef.current;
      setUpdate(updateRef.current);
    };
    ipcRenderer.on('addActionFromMain', handleAddActionFromMain);

    return () => {
      ipcRenderer.removeListener('addActionFromMain', handleAddActionFromMain);
    };
  }, []);

  useLayoutEffect(() => {
    allDataRef.current = allData;
  }, [allData]);

  useEffect(() => {
    if (!signedState.isSigned) return;
    const today = new Date();
    const todayStartTimestamp = today.setHours(0, 0, 0);
    const todayEndTimestamp = today.setHours(23, 59, 59);
    fetch(`/api/action/today-actions/?todayStartTimestamp=${todayStartTimestamp}&todayEndTimestamp=${todayEndTimestamp}`, {
      headers: {
        Authorization: `Bearer ${CurrentUser.current.token}`,
      },
    })
      .then((res) => res.json())
      .then((allData) => {
        updateAllData((draft) => {
          draft.length = 0;
          allData.message.forEach((data) => {
            draft.push(data);
          });
        });
      });
  }, [signedState, update]);

  const handleUpdateOneAction = (index) => {
    fetch('/api/action/update-one/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CurrentUser.current.token}`,
      },
      body: JSON.stringify({
        action: allDataRef.current[index],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('finish update');
      });
  };

  const handleActionDesClick = (data) => {
    updateFocusAction((draft) => {
      draft.preData = draft.aimData;
      draft.aimData = data;
    });
  };

  const handleTransitionEnd = (data) => {
    if (data === focusAction.preData) {
      updateFocusAction((draft) => {
        draft.preData = null;
      });
    }
  };

  const getEndDate = (date) => {
    const _date = new Date(date);
    // const isToday = new Date().getTime() - _date.getTime() < 86400000;
    let hours = _date.getHours();
    let minutes = _date.getMinutes();
    if (hours.toString().length === 1) {
      hours = `0${hours}`;
    }
    if (minutes.toString().length === 1) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  };

  const getActionState = (endDate) => {
    if (endDate - new Date().getTime() > 0) {
      return 'closeSoon';
    }
    return 'overtime';
  };

  return (
    <ContainerSC style={style}>
      <PointSC src="/point.svg" />
      <TitleSC>
        <span>{`Today ${new Date().getMonth() + 1}-${new Date().getDate().toString()}`}</span>
      </TitleSC>
      <TodoListSC>
        {
          allData.map((data, index) => (
            <TodoItemSC
              key={data.documentId}
            >
              <LeftPartSC>
                <CircleLabelSC
                  onClick={() => {
                    updateAllData((draft) => {
                      draft[index].finish = !allData[index].finish;
                    });
                    setTimeout(() => {
                      handleUpdateOneAction(index);
                    });
                  }}
                >
                  <CircleLabel
                    size={22}
                    circleColor={stateColor[getActionState(data.endTimestamp)]}
                    makeSureColor={stateColor.finish}
                    selected={data.finish}
                  />
                </CircleLabelSC>
                <TodoDesSC
                  onClick={() => handleActionDesClick(data)}
                  focus={data === focusAction.aimData}
                  pending={data === focusAction.preData}
                  onTransitionEnd={() => handleTransitionEnd(data)}
                  actionState={data.finish ? 'finish' : getActionState(data.endTimestamp)}
                >
                  {data.content}
                </TodoDesSC>
              </LeftPartSC>
              <RightPartSC>
                <TodoEndTimeSC
                  actionState={data.finish ? 'finish' : getActionState(data.endTimestamp)}
                >
                  {getEndDate(data.endTimestamp)}
                </TodoEndTimeSC>
              </RightPartSC>
            </TodoItemSC>
          ))
        }
      </TodoListSC>
    </ContainerSC>
  );
}

const ContainerSC = styled('div', 'style')`
  //color: rgb(255, 255, 255);
  //text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  //user-select: none;
  //cursor: pointer;
  //padding: 8px 40px 8px 20px;
  //box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
  //border-radius: 16px;
  //font-family: 'Comic Sans MS', cursive !important;
  color: #565656;
  font-style: normal;
  letter-spacing: 0;
  user-select: none;
  padding: 8px 30px 8px 20px;
  background: linear-gradient(
          135deg, 
          #ffff88 81%,
          #ffff88 82%,
          #ffff88 82%,
          #ffffc6 100%
  );
  font-family: 'Comic Sans MS', cursive !important;
  min-width: 200px;
  height: 100%;
  position: relative;

  ::after {
    content: "";
    position: absolute;
    z-index: -1;
    right: -0px;
    bottom: 20px;
    width: 200px;
    height: 25px;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 2px 15px 5px rgb(0 0 0 / 40%);
    -moz-transform: matrix(-1, -0.1, 0, 1, 0, 0);
    -webkit-transform: matrix(-1, -0.1, 0, 1, 0, 0);
    -o-transform: matrix(-1, -0.1, 0, 1, 0, 0);
    -ms-transform: matrix(-1, -0.1, 0, 1, 0, 0);
    transform: matrix(-1, -0.1, 0, 1, 0, 0);
  }
`;

const PointSC = styled('img')`
  position: absolute;
  right: 30px;
  top: -5px;
  width: 45px;
  -webkit-app-region: drag;
  cursor: pointer;
`;

const TitleSC = styled('div')`
  font-size: 24px;
  font-weight: 500;
  position: relative;
  display: flex;
  align-items: center;
`;

const TodoListSC = styled('div')`
  margin-top: 10px;
`;

const TodoItemSC = styled('div')`
  display: flex;
  margin: 8px 0;
  font-size: 18px;
  justify-content: space-between;
  cursor: pointer;
`;

const LeftPartSC = styled('div')`
  display: flex;
`;

const CircleLabelSC = styled('div')`
  height: 26px;
  display: flex;
  align-items: center;
  padding-top: 1px;
`;

const TodoDesSC = styled('div', 'focus, pending, actionState')`
  margin-left: 8px;
  max-width: 210px;
  min-height: 26px;
  max-height: 26px;
  transition: max-height ${(props) => (props.focus ? '0.5s' : '0.3s')};
  overflow: hidden;
  text-decoration:${(props) => props.actionState === 'finish' && 'line-through'};
  color: ${(props) => (props.actionState === 'finish' ? stateColor[props.actionState] : '#565656')};
  ${(props) => {
    if (props.focus) {
      return {
        maxHeight: '130px',
      };
    }
    if (props.pending) {
      return {
        maxHeight: '26px',
      };
    }
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxHeight: '26px',
    };
  }}
`;

// const LineSC = styled('div')`
//   height: 26px;
//   display: flex;
//   align-items: center;
// `;

const RightPartSC = styled('div')`
  display: flex;
  align-items: center;
  height: 26px;
  margin-left: 40px;
  padding-top: 1px;
`;
const TodoEndTimeSC = styled('div', 'actionState')`
  font-size: 12px;
  color: ${(props) => (props.actionState === 'finish' ? stateColor[props.actionState] : 'rgba(31,31,31,1)')};
  background: ${(props) => props.actionState !== 'finish' && stateColor[props.actionState]};
  border-radius: 4px;
  padding: 0 8px;
`;
