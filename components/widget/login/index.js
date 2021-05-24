import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import firebaseAuth from '_firebase/client';
import {signedStore, emailStore, triggerGetAction} from 'store';
import CurrentUser from 'data/user';

const Login = ({
  signType,
  onClose,
}) => {
  const [_signType, setSignType] = useState(signType);
  const [signInError, setSignInError] = useState('');
  const [signInState, setSignInState] = useState('登入');
  const [signUpState, setSignUpState] = useState('注册');
  const [canClick, setCanClick] = useState(true);
  const [, signedActions] = signedStore.useModel();
  const [, emailActions] = emailStore.useModel();
  const [triggerGetActionState, triggerActions] = triggerGetAction.useModel();
  const emailInput = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    const handleKeyEvent = (e) => {
      if (e.keyCode === 13 && _signType === 'signIn') {
        handleSignIn();
        return;
      }
      if (e.keyCode === 13 && _signType === 'signUp') {
        handleSignUp();
      }
    };
    document.addEventListener('keydown', handleKeyEvent);
    return () => {
      document.removeEventListener('keydown', handleKeyEvent);
    };
  }, []);

  const handleEmailChange = () => {
    if (signInError) {
      setSignInError('');
      emailInput.current.value = '';
      password.current.value = '';
    }
  };

  const handlePasswordChange = () => {
    if (signInError) {
      setSignInError('');
      emailInput.current.value = '';
      password.current.value = '';
    }
  };

  const setUserInfo = async (currentUser) => {
    CurrentUser.current = currentUser;
    emailActions.setEmail(CurrentUser.current.email);
    setCanClick(true);
    signedActions.onChange(true);
    onClose();
    let idToken;
    try {
      idToken = currentUser.getIdToken(true);
      triggerActions.onTrigger(!triggerGetActionState.trigger);
    } catch (e) {
      console.error(e);
    }
    if (idToken) {
      CurrentUser.current.token = idToken;
    }
    return idToken;
  };

  const handleSignIn = () => {
    setCanClick(false);
    setSignInState('登入中...');
    firebaseAuth.signInWithEmailAndPassword(emailInput.current.value, password.current.value)
      .then(() => {
        setUserInfo(firebaseAuth.currentUser);
      })
      .catch((e) => {
        setCanClick(true);
        setSignInState('登入');
        setSignInError(e.code);
      });
  };

  const handleSignUp = async () => {
    setCanClick(false);
    setSignUpState('注册中...');
    firebaseAuth.createUserWithEmailAndPassword(emailInput.current.value, password.current.value)
      .then(() => {
        setUserInfo(firebaseAuth.currentUser).then((token) => {
          console.log(token);
          fetch('/api/user/register/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            });
        });
      })
      .catch((e) => {
        setCanClick(true);
        setSignUpState('注册');
        setSignInError(e.code);
      });
  };

  return (
    <ContainerSC>
      <CloseSC onClick={onClose}>
        <svg
          t="1612785238881"
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5388"
          width="28"
          height="28"
        >
          <path
            d="M810.666667 273.493333L750.506667 213.333333 512 451.84 273.493333 213.333333 213.333333 273.493333 451.84 512 213.333333 750.506667 273.493333 810.666667 512 572.16 750.506667 810.666667 810.666667 750.506667 572.16 512z"
            p-id="5389"
            fill="#333333"
          />
        </svg>
      </CloseSC>
      <TitleSC>
        <LoginSC onClick={() => setSignType('signIn')} active={_signType === 'signIn'}>登入</LoginSC>
        <div className="point" />
        <LogUpSC onClick={() => setSignType('signUp')} active={_signType === 'signUp'}>注册</LogUpSC>
      </TitleSC>
      <FormSC>
        <form>
          <FormLineSC>
            <span>邮件:</span>
            <input
              type="email"
              placeholder="请输入邮箱"
              onFocus={handleEmailChange}
              ref={emailInput}
            />
          </FormLineSC>
          <FormLineSC>
            <span>密码:</span>
            <input
              type="password"
              placeholder="请输入密码"
              onFocus={handlePasswordChange}
              ref={password}
            />
          </FormLineSC>
          <ErrorMessageSC>{signInError}</ErrorMessageSC>
          {
            _signType === 'signIn'
              ? (
                <SubmitSC
                  onClick={handleSignIn}
                  canClick={canClick}
                >
                  {signInState}
                </SubmitSC>
              )
              : (
                <SubmitSC onClick={handleSignUp} canClick={canClick}>{signUpState}</SubmitSC>
              )
          }
        </form>
      </FormSC>
    </ContainerSC>
  );
};

Login.propTypes = {
  signType: PropTypes.string,
  onClose: PropTypes.func,
};

Login.defaultProps = {
  signType: 'signIn',
  onClose: () => {},
};
export default Login;

const ContainerSC = styled.div`
  width: 520px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
  user-select: none;
  padding-bottom: 20px;
`;
const CloseSC = styled('div')`
  position: absolute;
  right: 15px;
  top: 13px;
  cursor: pointer;
`;
const TitleSC = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    font-size: 22px;
    font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    color:  #333333;
    
    .point {
      margin-left: 20px;
      margin-right: 20px;
      width: 6px;
      height: 6px;
      background: #333333;
      border-radius: 50%;
    }
  
`;
const LoginSC = styled('div', ['active'])`
  padding: 10px;
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? '#2964b5 2px solid' : 'rgba(41,100,181,0) 2px solid')};
`;
const LogUpSC = styled('div', ['active'])`
  padding: 10px;
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? '#2964b5 2px solid' : 'rgba(41,100,181,0) 2px solid')};
`;
const FormSC = styled('div')`
  margin-top: 40px;
`;
const FormLineSC = styled('div')`
  font-size: 20px;
  font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  color:  #333333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;

  input {
    height: 30px;
    width: 200px;
    border-radius: 2px;
    border: rgba(51,51,51,0.7) solid 1px;
    padding-left: 10px;
    margin-left: 15px;
    outline:none;
    background: rgba(255,255,255,0);
    
    ::-ms-input-placeholder {
      color: rgba(51,51,51, 0.5)
    }
    ::-webkit-input-placeholder {
      color: rgba(51,51,51, 0.5)
    }
    ::-moz-placeholder {
      color: rgba(51,51,51, 0.5)
    }
  }
`;
const ErrorMessageSC = styled('div')`
  margin-top: -8px;
  color: red;
  font-size: 13px;
  height: 18px;
`;
const SubmitSC = styled('div', ['canClick'])`
  height: 40px;
  outline:none;
  border-radius: 20px;
  color: white;
  font-size: 20px;
  letter-spacing: 10px;
  margin-top: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background:  ${(props) => (props.canClick ? '#0a62b0' : 'rgba(10,98,176,0.6)')};
`;
