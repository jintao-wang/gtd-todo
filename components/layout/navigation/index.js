import React, { useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { signedStore, emailStore } from '../../../store';
import firebaseAuth from '../../../_firebase/client';

let electron;

const Navigation = () => {
  const [signedState, signedActions] = signedStore.useModel();
  const [emailState, emailActions] = emailStore.useModel();

  useEffect(() => {
    try {
      electron = require('electron');
    } catch (error) {
      console.log('current is not electron env');
      console.log(error);
    }
    if (!electron) return;
  }, []);

  const handleLogout = () => {
    firebaseAuth.signOut().then(() => {
      console.log('signOut');
    }).catch((error) => {
      console.error(error);
    });
  };

  const handleElectronIpc = () => {
    if (!electron) return;
    const { ipcRenderer } = electron;
    ipcRenderer.send('createPostIt', true);
  };

  return (
    <ContainerSC>
      <IconSC borderColor="rgb(125, 135, 179)">
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          width="200"
          height="200"
        >
          <defs>
            <style type="text/css" />
          </defs>
          <path
            d="M324.967768 407.195026l169.911808 0c6.107091 0 11.050684 5.531993 11.050684 12.278651 0 6.789637-4.943592 12.284791-11.050684 12.284791L324.967768 431.758468c-6.096858 0-11.050684-5.495154-11.050684-12.284791C313.917084 412.719856 318.884213 407.195026 324.967768 407.195026zM324.967768 351.918072l169.911808 0c6.107091 0 11.050684 5.525853 11.050684 12.285814 0 6.776334-4.943592 12.241812-11.050684 12.241812L324.967768 376.445698c-6.096858 0-11.050684-5.465478-11.050684-12.241812C313.917084 357.443925 318.884213 351.918072 324.967768 351.918072zM62.378188 884.909152 62.378188 699.56691l69.096704 0c6.111185 0 11.007705-5.480828 11.007705-12.248975 0-6.746658-4.909823-12.274558-11.007705-12.274558L62.378188 675.043377l0-34.528398 69.096704 0c6.111185 0 11.007705-5.495154 11.007705-12.258185 0-6.743588-4.909823-12.282744-11.007705-12.282744L62.378188 615.97405l0-34.521235 69.096704 0c6.111185 0 11.007705-5.487991 11.007705-12.252045 0-6.743588-4.909823-12.275581-11.007705-12.275581L62.378188 556.925189l0-30.464849c0-30.637788 24.774243-55.504128 55.383378-55.504128l271.858688 0c30.655184 0 55.489802 24.865317 55.489802 55.504128l0 29.133527 320.383868 0 0-91.514273L638.552789 464.079594c-51.510164 0-93.507674-41.966811-93.507674-93.560886L545.045115 251.122411c-67.853387 0-229.596142 0-229.596142 0-24.62791 0-44.552705 20.035312-44.552705 44.593638l0 55.489802c0 13.506619-11.051707 24.480554-24.558325 24.480554s-24.453948-10.974959-24.453948-24.480554l0-55.489802c0-51.543933 41.99444-93.544513 93.564979-93.544513l268.261767 0c6.636141 0 12.964266 2.702552 17.540492 7.439436l206.226898 210.698746c4.468778 4.635577 6.971785 10.730389 6.971785 17.126053L814.449915 555.586704l87.633896 0c30.759561 0 55.530734 24.859177 55.530734 55.496965l0 273.812179L62.378188 884.895849 62.378188 884.909152zM594.012364 272.127817l0 98.377588c0 24.623817 19.981077 44.632523 44.539402 44.632523l95.306646 0C694.163341 374.489136 627.881752 306.772872 594.012364 272.127817zM902.089951 956.134333 117.761566 956.134333c-27.564799 0-50.326199-20.309558-54.577013-46.747697l893.626697 0c-4.301979 26.438139-26.966165 46.747697-54.727439 46.747697L902.089951 956.134333z"
            fill="#7D87B3"
          />
        </svg>
        <div className="describe">收集</div>
      </IconSC>
      <LoginSC
        onClick={handleElectronIpc}
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
  background: rgb(23, 23, 24);
  z-index: 10;
  padding-top: 40px;
  -webkit-app-region: drag;
  -webkit-user-select: none;
  //border-right: 1px solid rgb(57, 59, 61);
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
