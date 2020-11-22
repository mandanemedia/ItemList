import React from 'react';
import Item from '../components/Item';
import ErrorBoundary from '../components/ErrorBoundary';

export default {
  title: 'Components/ErrorBoundary',
  component: Item,
  decorators: [story => <ErrorBoundary>{story()}</ErrorBoundary>],
};

const Template = args => (<Item {...args} />);

export const Default = Template.bind({});
Default.args = {
  key: 1010,
  itemId: '1010',
  listId: '1111',
  description: 'This is an Item',
  order: '-1',
  onRemoveItem: () => { console.log('onRemoveItem is called.'); },
  onIncreaseOrder: () => { console.log('onIncreaseOrder is called.'); },
  onDecreaseOrder: () => { console.log('onDecreaseOrder is called.'); },
  onUpdateDescription: () => { console.log('onUpdateDescription is called.'); },
};
