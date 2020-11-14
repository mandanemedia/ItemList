import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

const backgroundColorDic = {
  primary: '#cce5ff',
  secondary: '#e2e3e5',
  success: '#d4edda',
  danger: '#f8d7da',
  warning: '#fff3cd',
  info: '#d1ecf1',
  light: '#fefefe',
  dark: '#d6d8d9',
};

const colorDic = {
  primary: '#004085',
  secondary: '#383d41',
  success: '#155724',
  danger: '#721c24',
  warning: '#856404',
  info: '#0c5460',
  light: '#818182',
  dark: '#1b1e21',
};

const Test = ({
  type, message, display, autohide,
}:
{ type:string, message:string, display:boolen, autohide:boolean}) => {
  const [show, setShow] = useState(display);
  const [msg] = useState(message);

  return (
    <>
      <Toast
        style={{
          left: '50%',
          position: 'fixed',
          transform: 'translate(-50%, 0px)',
          zIndex: '9999',
          bottom: '20px',
          maxWidth: '600px',
          backgroundColor: 'none',
        }}
        onClose={() => setShow(false)}
        show={show}
        delay={2500}
        autohide={autohide}
      >
        <Toast.Header
          style={{
            backgroundColor: `${backgroundColorDic[type]}`,
            color: `${colorDic[type]}`,
            padding: '12px',
            borderRadius: '5px',
          }}
        >
          {msg}
        </Toast.Header>
      </Toast>
    </>
  );
};

export default Test;
