module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
    },
    time_in: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    made_by: {
      type: DataTypes.UUID
    },
    space: {
      type: DataTypes.UUID
    }
  }, {});
  Booking.associate = (models) => {
    Booking.belongsTo(models.User, {
      as: 'made_by',  // To rename the foreign key
      onDelete: 'CASCADE'
    });
    Booking.belongsTo(models.Space, {
      as: 'space',
    });
  };
  return Booking;
};
