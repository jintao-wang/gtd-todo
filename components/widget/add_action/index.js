import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { triggerGetAction } from 'store';
import CurrentUser from '../../../data/user';

let electron;

export default function AddAction({
  onAdd,
}) {
  const [triggerGetActionState, triggerActions] = triggerGetAction.useModel();
  const actionInputRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  useEffect(() => {
    const handleKeyListener = (e) => {
      if (e.key === 'Enter') {
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

  useEffect(() => {
    try {
      electron = require('electron');
    } catch (error) {
      console.log('current is not electron env');
      console.log(error);
    }
    if (!electron) return;
  }, []);

  const finishAddOne = () => {
    actionInputRef.current = null;
    startTimeRef.current = null;
    endTimeRef.current = null;
    triggerActions.onTrigger(!triggerGetActionState.trigger);
    handleElectron();
  };

  const handleElectron = () => {
    if (!electron) return;
    const { ipcRenderer, remote } = electron;
    ipcRenderer.send('addActionMain', {
      isAdd: true,
    });
    remote.getCurrentWindow().close();
  };

  const handleAddOneAction = () => {
    const newAction = {
      content: actionInputRef.current.value,
      startTimestamp: parseToTimestamp(startTimeRef.current.value),
      endTimestamp: parseToTimestamp(endTimeRef.current.value, false),
    };
    onAdd?.({
      ...newAction,
      documentId: 'temple',
    });
    fetch('/api/action/add-one/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CurrentUser.current.token}`,
      },
      body: JSON.stringify({
        action: newAction,
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
    const parseDate = Date.parse(`${date.join('-')} ${time.join(':')}`.replace(/-/g, '/'));
    return new Date(parseDate).getTime();
  };

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

const ContainerSC = styled('div')`
  width: 100%;
  height: 100%;
  background: #313131;
  text-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  padding: 10px 15px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  -webkit-app-region: drag;
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
