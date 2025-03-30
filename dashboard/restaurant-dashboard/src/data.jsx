export const initialData = {
  tables: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    status: 'free',
    orders: [],
    bill: 0,
    reservation: null,
    startTime: null,
    specialRequests: ''
  })),

  menu: {
    main: [
      { id: 1, name: 'Steak Frites', price: 25, allergens: ['gluten'] },
      { id: 2, name: 'Grilled Salmon', price: 22, allergens: [] },
      { id: 3, name: 'Vegetarian Risotto', price: 18, allergens: ['dairy'] }
    ],
    drinks: [
      { id: 4, name: 'House Wine', price: 8, allergens: ['sulfites'] },
      { id: 5, name: 'Craft Beer', price: 6, allergens: ['gluten'] },
      { id: 6, name: 'Sparkling Water', price: 3, allergens: [] }
    ]
  },

  reservations: [], // Properly initialized empty array

  vouchers: [
    {
      id: 1,
      code: "WELCOME20",
      amount: 20,
      validUntil: new Date("2024-12-31").toISOString(),
      used: false,
      createdAt: new Date().toISOString()
    }
  ],

  inventory: {
    steaks: 50,
    salmon: 30,
    beer: 100,
    wine: 50,
    risotto: 40,
    water: 200
  },

  contest: {
    participants: [],
    record: 15,
    active: false,
    startTime: null
  },

  specialDates: []
};

// Safe mapping with fallback
initialData.reservations = (initialData.reservations || []).map(r => ({
  ...r,
  datetime: new Date(r.datetime).toISOString()
}));