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
        unique: true,
        validate: {
          notNull: {
            msg: "Username cannot be null",
          },
          len: {
            args: [3, 20],
            msg: "Username should be between 3 and 20 characters long",
          }
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
