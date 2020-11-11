import React from 'react';
import CustomModal from './CustomModal';

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
  title: 'Immediate Pop Up',
  message: 'Would you like to create a new List?',
  primaryButton: 'Yes',
  secondaryButton: 'No',
  onPrimaryButton: () => { console.log('onPrimaryButton is called.'); },
  onSecondaryButton: () => { console.log('onSecondaryButton is called.'); },
};
