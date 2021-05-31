import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebaseAuth from '../_firebase/client';
import CurrentUser from '../data/user';
import { emailStore, signedStore } from '../store';
import AddAction from '../components/widget/add_action';

export default () => {
  const [, signedActions] = signedStore.useModel();
  const [, emailActions] = emailStore.useModel();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        CurrentUser.current = user;
        emailActions.setEmail(CurrentUser.current.email);
        user.getIdToken(true).then((idToken) => {
          document.getElementsByClassName('firebase-emulator-warning')[0].style.display = 'none';
          CurrentUser.current.token = idToken;
          signedActions.onChange(true);
        }).catch((error) => {
          console.error(error);
        });
      } else {
        CurrentUser.current = null;
      }
    });
  }, []);

  return (
    <ContainerSC>
      <AddAction />
    </ContainerSC>
  );
};

const ContainerSC = styled('div', 'background')`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
`;
