import React from 'react';
import CustomModal from '../components/CustomModal';

export default {
  title: 'Components/CustomModal',
  component: CustomModal,
};

const Template = args => (<CustomModal {...args} />);

export const Default = Template.bind({});
Default.args = {
  mainButton: 'Create List',
  disply: false,
  title: 'New List',
  message: 'Would you like to create a new List?',
  primaryButton: 'Yes',
  secondaryButton: 'No',
  onPrimaryButton: () => { console.log('onPrimaryButton is called.'); },
  onSecondaryButton: () => { console.log('onSecondaryButton is called.'); },
};

export const ImmediatePopUp = Template.bind({});
ImmediatePopUp.args = {
  mainButton: 'Immediate Pop Up',
  disply: true,
  message: 'Would you like to create a new List?',
  primaryButton: 'Yes',
  secondaryButton: 'No',
  onPrimaryButton: () => { console.log('onPrimaryButton is called.'); },
  onSecondaryButton: () => { console.log('onSecondaryButton is called.'); },
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  mainButton: 'No Title',
  disply: false,
  message: 'Would you like to create a new List?',
  primaryButton: 'Yes',
  secondaryButton: 'No',
  onPrimaryButton: () => { console.log('onPrimaryButton is called.'); },
  onSecondaryButton: () => { console.log('onSecondaryButton is called.'); },
};

export const NoButtoms = Template.bind({});
NoButtoms.args = {
  mainButton: 'No Buttoms',
  disply: false,
  title: 'New List',
  message: 'This is a message.',
};

export const OneButtoms = Template.bind({});
OneButtoms.args = {
  mainButton: 'One Buttoms',
  disply: false,
  message: 'This is a message.',
  primaryButton: 'Okay',
};
