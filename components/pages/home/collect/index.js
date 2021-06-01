import React, {
  useEffect, useRef, useLayoutEffect, useState,
} from 'react';
import styled from 'styled-components';
import { signedStore } from 'store';
import CurrentUser from 'data/user';
import { useImmer } from 'use-immer';
import CircleLabel from '../../../common/circle_label';

const stateColor = {
  overtime: '#ff435d',
  closeSoon: '#FFCB2C',
  feature: '#D3D3D3',
  finish: '#d0cece',
};

export default function Collect() {
  const [signedState] = signedStore.useModel();
  const [allData, updateAllData] = useImmer([]);
  const allDataRef = useRef(null);
  const [focusAction, updateFocusAction] = useImmer({
    preData: null,
    aimData: null,
  });

  useLayoutEffect(() => {
    allDataRef.current = allData;
  }, [allData]);

  useEffect(() => {
    if (!signedState.isSigned) return;
    fetch('/api/action/collection-actions', {
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
  }, [signedState]);

  const handleUpdateOneAction = (index) => {
    fetch('/api/action/update-one', {
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

  const getActionState = (endDate) => {
    if (endDate - new Date().getTime() > 0) {
      return 'closeSoon';
    }
    return 'overtime';
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

  const checkToday = (date) => {
    const _date = new Date(date);
    const today = new Date().setHours(0, 0, 0);
    return today <= _date.getTime();
  };

  const getEndDate = (date) => {
    const _date = new Date(date);
    const isToday = checkToday(date);
    if (isToday) {
      let hours = _date.getHours();
      let minutes = _date.getMinutes();
      if (hours.toString().length === 1) {
        hours = `0${hours}`;
      }
      if (minutes.toString().length === 1) {
        minutes = `0${minutes}`;
      }
      return `${hours}:${minutes}`;
    }
    const year = _date.getFullYear();
    let month = _date.getMonth() + 1;
    let day = _date.getDate();
    if (month.toString().length === 1) {
      month = `0${month}`;
    }
    if (day.toString().length === 1) {
      day = `0${day}`;
    }
    return `${month}/${day}`;
  };

  return (
    <ContainerSC>
      <TitleSC>收件箱</TitleSC>
      <SecondTitleSC>
        <span className="total">{allData.length}</span>
        <span>项</span>
      </SecondTitleSC>
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
                  isToday={checkToday(data.endTimestamp)}
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

const ContainerSC = styled('div')`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
`;

const TitleSC = styled('div')`
  font-size: 26px;
  font-weight: 600;
  color: rgb(125, 135, 179);
`;

const SecondTitleSC = styled('div')`
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  
  .total {
    margin-right: 5px;
  }
`;

const TodoListSC = styled('div')`
  margin-top: 10px;
  width: 100%;
  padding-right: 20px;
  box-sizing: border-box;
`;

const TodoItemSC = styled('div')`
  display: flex;
  padding: 3px ;
  font-size: 13px;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px rgb(57, 57, 57) solid;
`;

const LeftPartSC = styled('div')`
  display: flex;
  flex: 1;
  overflow: auto;
`;

const CircleLabelSC = styled('div')`
  height: 24px;
  display: flex;
  align-items: center;
`;

const TodoDesSC = styled('div', 'focus, pending, actionState')`
  margin-left: 8px;
  min-height: 24px;
  max-height: 24px;
  flex: 1;
  transition: max-height ${(props) => (props.focus ? '0.5s' : '0.3s')};
  overflow: hidden;
  text-decoration:${(props) => props.actionState === 'finish' && 'line-through'};
  color: ${(props) => (props.actionState === 'finish' ? stateColor[props.actionState] : 'rgb(166, 166, 166)')};
  ${(props) => {
    if (props.focus) {
      return {
        maxHeight: '130px',
        wordWrap: 'break-word',
        lineHeight: '24px',
      };
    }
    if (props.pending) {
      return {
        maxHeight: '24px',
        lineHeight: '24px',
      };
    }
    return {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxHeight: '24px',
      lineHeight: '24px',
    };
  }}
`;

const RightPartSC = styled('div')`
  display: flex;
  align-items: center;
  height: 24px;
  margin-left: 40px;
`;
const TodoEndTimeSC = styled('div', 'actionState,isToday')`
  font-size: 12px;
  color: ${(props) => (props.actionState === 'finish' ? stateColor[props.actionState] : 'rgba(31,31,31,1)')};
  background: ${(props) => props.actionState !== 'finish' && stateColor[props.actionState]};
  width: ${(props) => (props.isToday ? '48px' : '48px')};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16px;
`;
