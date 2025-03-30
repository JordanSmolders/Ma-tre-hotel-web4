export const initialData = {
    tables: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      status: 'free', // free, occupied, reserved
      orders: [],
      bill: 0,
      reservation: null,
      startTime: null,
    })),
    menu: {
      main: [
        { id: 1, name: 'Steak Frites', price: 25, allergens: ['gluten'] },
        { id: 2, name: 'Salmon', price: 22, allergens: [] },
      ],
      drinks: [
        { id: 3, name: 'Wine', price: 8, allergens: ['sulfites'] },
        { id: 4, name: 'Beer', price: 6, allergens: ['gluten'] },
      ]
    },
    reservations: [],
    vouchers: [],
    contest: {
      participants: [],
      record: 15
    }
  };