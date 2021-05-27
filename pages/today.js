import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Today from 'components/widget/today';
import firebaseAuth from '../_firebase/client';
import CurrentUser from '../data/user';
import { emailStore, signedStore } from '../store';

export default () => {
  const [newAction, setNewAction] = useState(null);
  const [, signedActions] = signedStore.useModel();
  const [, emailActions] = emailStore.useModel();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        CurrentUser.current = user;
        emailActions.setEmail(CurrentUser.current.email);
        user.getIdToken(true).then((idToken) => {
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
      <Today
        newAction={newAction}
        finishUpdateNewAction={() => setNewAction(null)}
      />
    </ContainerSC>
  );
};

const ContainerSC = styled('div', 'background')`
  height: 100vh;
  position: relative;
  padding: 20px 10px;
  box-sizing: border-box;
`;
