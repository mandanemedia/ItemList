import React from 'react';
import List from '../components/List';

export default {
  title: 'Components/List',
  component: List,
};

const Template = args => (<List {...args} />);

export const Default = Template.bind({});
Default.args = {
  id: '1111',
  onReset: () => { console.log('onReset is called.'); },
  onAddItem: () => { console.log('onAddItem is called.'); },
  onRemoveItem: () => { console.log('onRemoveItem is called.'); },
  onIncreaseOrder: () => { console.log('onIncreaseOrder is called.'); },
  onDecreaseOrder: () => { console.log('onDecreaseOrder is called.'); },
  onUpdateDescription: () => { console.log('onUpdateDescription is called.'); },
  items: [{
    key: 1010,
    itemId: '1010',
    listId: '1111',
    description: 'First Item',
    order: '1',
  },
  {
    key: 2020,
    itemId: '2020',
    listId: '1111',
    description: 'Second Item',
    order: '2',
  },
  {
    key: 2030,
    itemId: '2030',
    listId: '1111',
    description: 'Third Item',
    order: '3',
  }],
};
