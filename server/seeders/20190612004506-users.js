module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      id: '911f5818-5856-4e09-ad45-82cdc8de14ba',
      username: 'Flora',
      email: 'flora@flora.com',
      password: '$2b$10$C3aNsfGAfHEmE6HfON1sq.v57Oqj09fhrPdF4QwvrCGFoXq1j.VWa'
    },
    {
      id: '64d1f323-9a3c-4311-856c-9dcc641b4331',
      username: 'Fiona',
      email: 'fiona@fiona.com',
      password: '$2b$10$C3aNsfGAfHEmE6HfON1sq.v57Oqj09fhrPdF4QwvrCGFoXq1j.VWa'
    },
    {
      id: '8cd0680f-b510-4b06-ac7b-d77fa241dde7',
      username: 'Maxwell',
      email: 'maxwell@maxwell.com',
      password: '$2b$10$C3aNsfGAfHEmE6HfON1sq.v57Oqj09fhrPdF4QwvrCGFoXq1j.VWa'
    },
    {
      id: '88e98c51-14c1-4fb8-8748-3935940d5189',
      username: 'Audu',
      email: 'audu@audu.com',
      password: '$2b$10$C3aNsfGAfHEmE6HfON1sq.v57Oqj09fhrPdF4QwvrCGFoXq1j.VWa'
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
  ,
};
