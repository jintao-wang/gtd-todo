import React, { useState, useEffect } from 'react';
import firebaseAuth from '_firebase/client';
import { signedStore, emailStore } from 'store';
import CurrentUser from 'data/user';
import Drag from '../../common/drag';
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

  return (
    <>
      {
        isSignForm && (
          <Drag
            position="left_center"
          >
            <Login
              signType={signType}
              onClose={() => setIsSignForm(false)}
            />
          </Drag>
        )
      }
    </>
  );
}
