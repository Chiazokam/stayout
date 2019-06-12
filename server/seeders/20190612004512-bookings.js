module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Bookings', [
    {
      id: '2fc8bde7-6745-4ace-ba62-80de7ae7d620',
      date: '2019-07-05',
      time_in: '08:00am',
      duration: '120'
    },
    {
      id: '54ce85cb-20a5-4025-a101-4d8afc6ced4a',
      date: '2019-07-05',
      time_in: '10:00am',
      duration: '60'
    },
    {
      id: '75bf4d6c-813e-4c03-8bb2-28928a37af0e',
      date: '2019-07-15',
      time_in: '08:00am',
      duration: '120'
    },
    {
      id: 'ae89a4e3-cca4-4709-8215-cd33e820fd0e',
      date: '2019-07-12',
      time_in: '01:30pm',
      duration: '30'
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Bookings', null, {})
  ,
};
