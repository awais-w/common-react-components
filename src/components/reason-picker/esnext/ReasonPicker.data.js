export const listItems = [
  {
    id: '1a',
    content: [
      {
        key: 'Order:',
        value: '1234',
      },
      {
        key: 'Description:',
        value: 'A very bad thing',
      },
    ],
  },
  {
    id: '2a',
    selected: true,
    reasonSelectedId: 'r1a',
    content: [
      {
        key: 'Order:',
        value: '23456',
      },
      {
        key: 'Description:',
        value: 'A very nice thing',
      },
    ],
  },
  {
    id: '3a',
    content: [
      {
        key: 'Order:',
        value: '34567',
      },
      {
        key: 'Description:',
        value: 'It is ok I guess',
      },
    ],
  },
];

export const reasonItems = [
  {
    id: '0',
    description: 'Please select',
    selected: true,
  },
  {
    id: 'r1a',
    description: "I just don't want it",
  },
  {
    id: 'r2a',
    description: 'I already have one',
  },
  {
    id: 'r3a',
    description: 'It is not what I expected',
  },
];
