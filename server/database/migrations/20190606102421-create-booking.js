'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        unique: false,
      },
      time_in: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      made_by: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
          as: 'made_by'
        }
      },
      space: {
        type: Sequelize.UUID,
        references: {
          model: 'Spaces',
          key: 'id',
          as: 'space'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bookings');
  }
};