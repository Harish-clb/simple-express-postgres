module.exports = (sequelize, { DataTypes }) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username cannot be null",
          },
          min: {
            args: [3],
            msg: "Username must be at least 3 characters in length",
          },
          max: {
            args: [20],
            msg: "Username cannot be longer than 20 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email cannot be null",
          },
          isEmail: {
            msg: "Email must be a valid email address",
          },
        },
      },
    },
    {
      tableName: "users",
    }
  );

  return User;
};
