import React from 'react';
import TestModal from '../components/TestModal';

export default {
  title: 'Components/TestModal',
  component: TestModal,
};

const Template = args => (<TestModal {...args} />);

export const Default = Template.bind({});
Default.args = {
  type: 'danger',
  message: 'This is an alert.',
};
