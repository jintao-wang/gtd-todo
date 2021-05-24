import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CurrentUser from '../../../data/user';
import { triggerGetAction } from 'store';

export default function AddAction() {
  const [isAdd, setIsAdd] = useState(false);
  const [triggerGetActionState, triggerActions] = triggerGetAction.useModel();
  const isAddRef = useRef(false);
  const actionInputRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  useEffect(() => {
    isAddRef.current = isAdd;
  }, [isAdd]);

  useEffect(() => {
    const handleKeyListener = (e) => {
      if (e.key === 'a' && e.ctrlKey) {
        setIsAdd(true);
        actionInputRef.current.focus();
      }
      if (e.key === 'Enter' && isAddRef.current) {
        if (actionInputRef.current.value) {
          handleAddOneAction();
        } else {
          actionInputRef.current.focus();
        }
      }
    };
    document.addEventListener('keypress', handleKeyListener);

    return () => {
      document.removeEventListener('keypress', handleKeyListener);
    };
  }, []);

  const finishAddOne = () => {
    setIsAdd(false);
    actionInputRef.current = null;
    startTimeRef.current = null;
    endTimeRef.current = null;
    triggerActions.onTrigger(!triggerGetActionState.trigger);
  };

  const handleAddOneAction = () => {
    fetch('/api/action/add-one/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CurrentUser.current.token}`,
      },
      body: JSON.stringify({
        action: {
          content: actionInputRef.current.value,
          startTimestamp: parseToTimestamp(startTimeRef.current.value),
          endTimestamp: parseToTimestamp(endTimeRef.current.value, false),
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        finishAddOne();
      });
  };

  const parseToTimestamp = (dateDraft, isStart = true) => {
    if (!dateDraft) return null;
    const currentDate = new Date();
    const date = [currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()];
    const time = isStart ? ['00', '00'] : ['23', '59'];

    const parseDay = (dateDraft) => {
      const array = dateDraft.split('-');
      if (array.length === 3) {
        // eslint-disable-next-line prefer-destructuring
        date[0] = array[0];
        // eslint-disable-next-line prefer-destructuring
        date[1] = array[1];
        // eslint-disable-next-line prefer-destructuring
        date[2] = array[2];
      } else if (array.length === 2) {
        // eslint-disable-next-line prefer-destructuring
        date[1] = array[0];
        // eslint-disable-next-line prefer-destructuring
        date[2] = array[1];
      }
    };

    const parseTime = (timeDraft) => {
      const array = timeDraft.split(':');
      // eslint-disable-next-line prefer-destructuring
      time[0] = array[0];
      // eslint-disable-next-line prefer-destructuring
      time[1] = array[1];
    };

    const array = dateDraft.split(' ');
    if (array.length === 1) {
      if (array[0].includes('-')) {
        parseDay(array[0]);
      } else if (array[0].includes(':')) {
        parseTime(array[0]);
      }
    } else if (array.length === 2) {
      parseDay(array[0]);
      parseTime(array[1]);
    }
    return new Date(`${date.join('-')} ${time.join(':')}`).getTime();
  };

  if (isAdd) {
    return (
      <ContainerSC>
        <ContentSC>
          <InputSC
            ref={actionInputRef}
            placeholder="action name"
          />
          <MenuSC>
            <div />
            <DatesSC>
              <input
                ref={startTimeRef}
                type="text"
                className="start"
                placeholder="开始时间"
              />
              <input
                ref={endTimeRef}
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
  background: #313131;
  text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  padding: 10px 15px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const ContentSC = styled('div')`
  position: relative;
  padding-left: 15px;
  box-sizing: border-box;
  height: 100%;
  
  ::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: rgb(248,93,84);
    border-radius: 2px;
  }
`;

const InputSC = styled('input')`
  width: 100%;
  box-sizing: border-box;
  height: 55%;
  outline: none;
  border: none;
  font-size: 14px;
  caret-color:rgb(248,93,84);
  //color: rgba(41, 41, 41, 1);
  color: rgba(200, 200, 200, 1);
  background: #313131;
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
    //color: rgba(41, 41, 41, 1);
    color: rgba(200, 200, 200, 1);
    caret-color:rgb(248,93,84);
    background: #313131;
  }
`;
