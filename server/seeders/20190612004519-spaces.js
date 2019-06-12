module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Spaces', [
    {
      id: 'a7f61dab-c27d-4ca3-94b2-0ae5886c0889',
      name: 'Blue Seal',
      image: 'https://res.cloudinary.com/zokky/image/upload/v1560303408/dolly.jpg',
      capacity: '1',
      cost: '500'
    },
    {
      id: '4704a260-76f6-4d6c-b049-0d26dcb4d10d',
      name: 'Black Jack',
      image: 'https://res.cloudinary.com/zokky/image/upload/v1560303408/dolly.jpg',
      capacity: '3',
      cost: '1200'
    },
    {
      id: 'd9ced441-dde9-43c8-8df5-59121d81def7',
      name: 'Wander',
      image: 'https://res.cloudinary.com/zokky/image/upload/v1560303408/dolly.jpg',
      capacity: '1',
      cost: '600'
    },
    {
      id: 'aa442c5a-cf7e-481a-9ea5-b830622b60f6',
      name: 'Kariotte',
      image: 'https://res.cloudinary.com/zokky/image/upload/v1560303408/dolly.jpg',
      capacity: '2',
      cost: '800'
    }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Spaces', null, {})
  ,
};
