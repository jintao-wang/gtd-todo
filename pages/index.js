import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Drag from 'components/common/drag';
import Today from 'components/widget/today';
import Login from 'components/common/login';
import { signedStore, emailStore } from 'store';
import app from '../_firebase/client';
import CurrentUser from '../data/user';

export default () => {
  const [signType, setSignType] = useState('signIn');
  const [isSignForm, setIsSignForm] = useState(false);
  const [signedState, signedActions] = signedStore.useModel();
  const [emailState, emailActions] = emailStore.useModel();

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        CurrentUser.current = user;
        emailActions.setEmail(CurrentUser.current.email);
        signedActions.onChange(true);
        user.getIdToken(true).then((idToken) => {
          CurrentUser.current.token = idToken;
        }).catch((error) => {
          console.error(error);
        });
      } else {
        CurrentUser.current = null;
        setIsSignForm(true);
      }
    });
  }, []);

  const test = () => {
    fetch('/api/user/test', {
      headers: {
        Authorization: `Bearer ${CurrentUser.current.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <ContainerSC>
      {
        isSignForm && (
          <Drag
            position="center"
          >
            <Login
              signType={signType}
              onClose={() => {
                setIsSignForm(false);
                test();
              }}
            />
          </Drag>
        )
      }
      <Drag>
        <Today />
      </Drag>
    </ContainerSC>
  );
};

const ContainerSC = styled('div')`
  height: 100vh;
  position: relative;
`;
