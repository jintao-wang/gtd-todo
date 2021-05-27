import React, { useState, useEffect } from 'react';
import firebaseAuth from '_firebase/client';
import { signedStore, emailStore } from 'store';
import CurrentUser from 'data/user';
import styled from 'styled-components';
import GlobalClose from 'components/common/global-close';
import Login from '../login';

export default function LoginManage() {
  const [signType, setSignType] = useState('signIn');
  const [isSignForm, setIsSignForm] = useState(false);
  const [signedState, signedActions] = signedStore.useModel();
  const [emailState, emailActions] = emailStore.useModel();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        CurrentUser.current = user;
        user.getIdToken(true).then((idToken) => {
          CurrentUser.current.token = idToken;
          emailActions.setEmail(CurrentUser.current.email);
          signedActions.onChange(true);
          localStorage.token = idToken;
        }).catch((error) => {
          console.error(error);
        });
      } else if (!user) {
        CurrentUser.current = null;
        emailActions.setEmail(null);
        signedActions.onChange(false);
        setIsSignForm(true);
        localStorage.removeItem('token');
      }
    });
  }, []);

  return (
    <>
      {
        isSignForm && (
          <ContainerSC>
            <Login
              signType={signType}
              onClose={() => setIsSignForm(false)}
            />
          </ContainerSC>
        )
      }
    </>
  );
}

const ContainerSC = styled('div')`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;
