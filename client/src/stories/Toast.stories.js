import React, { useState, useEffect } from 'react';
import Toast from '../components/Toast';

export default {
  title: 'Components/Toast',
  component: Toast,
};

const Template = args => {
  const [display, setDisplay] = useState(args.display);
  useEffect(() => {
    setDisplay(args.display);
  }, [args.display]);
  const newArgs = { ...args, display, onClose: () => setDisplay(false) };
  return (
    <Toast {...newArgs} />
  );
};

export const AutoHide = Template.bind({});
AutoHide.args = {
  type: 'danger',
  message: 'This is an alert.',
  display: true,
  autohide: true,
};

export const NoAutoHide = Template.bind({});
NoAutoHide.args = {
  type: 'danger',
  message: 'This is an alert.',
  display: true,
  autohide: false,
};

export const Primary = Template.bind({});
Primary.args = {
  type: 'primary',
  message: 'This is a primary alert. This is an alert. ',
  display: true,
  autohide: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  message: 'This is a secondary alert. This is an alert. ',
  display: true,
  autohide: false,
};
export const Success = Template.bind({});
Success.args = {
  type: 'success',
  message: 'This is a success alert. This is an alert. ',
  display: true,
  autohide: false,
};
export const Danger = Template.bind({});
Danger.args = {
  type: 'danger',
  message: 'This is a danger alert. This is an alert. ',
  display: true,
  autohide: false,
};
export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  message: 'This is a warning alert. This is an alert. ',
  display: true,
  autohide: false,
};
export const Info = Template.bind({});
Info.args = {
  type: 'info',
  message: 'This is an info alert. This is an alert. ',
  display: true,
  autohide: false,
};
export const Light = Template.bind({});
Light.args = {
  type: 'light',
  message: 'This is a light alert. This is an alert. ',
  display: true,
  autohide: false,
};
export const Dark = Template.bind({});
Dark.args = {
  type: 'dark',
  message: 'This is a dark alert. This is an alert. ',
  display: true,
  autohide: false,
};
