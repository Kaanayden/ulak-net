export const data = [
  {
    contact: {
      _id: 2,
      name: 'Kaan',
    },
    chat: [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Depremzede 1',
        },
      },
      {
        _id: 2,
        text: 'Hello',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Kaan',
        },
      },
    ],
  },
  {
    contact: {
      _id: 3,
      name: 'Test User',
    },
    chat: [
      {
        _id: 1,
        text: 'Selam',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Depremzede 1',
        },
      },
      {
        _id: 2,
        text: 'Selaaaam',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'Test User',
        },
      },
    ],
  },
];
