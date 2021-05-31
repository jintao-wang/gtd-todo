import React, {useState, useEffect, useRef} from 'react';
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
          // document.getElementsByClassName('firebase-emulator-warning')[0].style.display = 'none';
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
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding-top: 6px;
  box-sizing: border-box;
`;
