module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define("Music", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Music;
};
