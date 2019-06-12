module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define('Space', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      defaultValue: 0.00,
      allowNull: false
    }
  }, {});
  Space.associate = (models) => {
    Space.belongsToMany(models.Booking, {
      through: 'bookedSpace',
    });
  };
  return Space;
};
