import React, { useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { signedStore, emailStore } from '../../../store';
import firebaseAuth from '../../../_firebase/client';

const Navigation = () => {
  const [signedState, signedActions] = signedStore.useModel();
  const [emailState, emailActions] = emailStore.useModel();

  const handleLogout = () => {
    firebaseAuth.signOut().then(() => {
      console.log('signOut');
    }).catch((error) => {
      console.error(error);
    });
  };

  const generateTodayWindow = () => {
    let electron;

    try {
      electron = require('electron');
    } catch (error) {
      console.log('current is not electron env');
      console.log(error);
    }

    if (!electron) return;
    const { BrowserWindow, globalShortcut, ipcMain } = electron.remote;
    let win = new BrowserWindow({
      width: 400,
      height: 300,
      transparent: true,
      frame: false,
      roundedCorners: false,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    });
    // win.webContents.openDevTools();
    globalShortcut.register('Command+1', () => {
      win.setAlwaysOnTop(true);
      win.show();
    });

    win.loadURL(`${window.location.origin}/today`).then((r) => console.log('load success!'));
    ipcMain.on('addActionMain', (event, message) => {
      win.webContents.send('addActionFromMain', message);
    });
    win.on('blur', () => {
      win.setAlwaysOnTop(false);
    });
    win.on('close', () => {
      win = null;
    });
  };

  return (
    <ContainerSC>
      <IconSC borderColor="rgb(125, 135, 179)">
        {/* <img className="icon" src={require('./assets/collect.svg')} alt="" /> */}
        <div className="describe">收集</div>
      </IconSC>
      <LoginSC
        onClick={generateTodayWindow}
        onDoubleClick={handleLogout}
      >
        {
          signedState.isSigned ? (
            <>{emailState.email?.slice(0, 1)}</>
          ) : (
            <svg
              t="1622085354090"
              className="icon"
              viewBox="0 0 1024 1024"
              width="24"
              height="24"
            >
              <defs>
                <style type="text/css" />
              </defs>
              <path
                d="M512 469.333333a170.666667 170.666667 0 1 0-170.666667-170.666666 170.666667 170.666667 0 0 0 170.666667 170.666666zM768 896a42.666667 42.666667 0 0 0 42.666667-42.666667 298.666667 298.666667 0 0 0-597.333334 0 42.666667 42.666667 0 0 0 42.666667 42.666667z"
                fill="#d5d5d5"
              />
            </svg>
          )
        }
      </LoginSC>
    </ContainerSC>
  );
};

export default Navigation;

const ContainerSC = styled('div')`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 74px;
  background: rgb(59, 63, 65);
  z-index: 10;
  padding-top: 40px;
  -webkit-app-region: drag;
  -webkit-user-select: none;
`;

const IconSC = styled('div', ['active', 'borderColor'])`
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  //background: ${(props) => props.active && 'rgb(44, 46, 47)'};
  position: relative;
  &::after {
    content: "";
    width: 5px;
    height: 100%;
    background: ${(props) => props.active && props.borderColor};
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }
  
  
  .icon {
    width: 45%;
  }
  
  .describe {
    margin-top: 5px;
    font-size: 10px;
    color: rgb(234, 235, 235);
  }
`;

const LoginSC = styled('div')`
  width: 36px;
  height: 36px;
  background: blueviolet;
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #d5d5d5;
  font-weight: 500;
`;
