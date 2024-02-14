module.exports = (sequelize, { DataTypes }) => {
  const Subscription = sequelize.define(
    "subscription",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      platform: {
        type: DataTypes.ENUM("Netflix", "Amazon Prime", "Disney+"),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Platform cannot be null",
          },
          isIn: {
            args: [["Netflix", "Amazon Prime", "Disney+"]],
            msg: "Platform must be Netflix, Amazon Prime, or Disney+",
          },
        },
      },
      subscriptionType: {
        type: DataTypes.ENUM("Basic", "Standard", "Premium"),
        allowNull: false,
        field: "type", // column name in the table
        defaultValue: "Basic",
        validate: {
          notNull: {
            msg: "Subscription type cannot be null",
          },
          isIn: {
            args: [["Basic", "Standard", "Premium"]],
            msg: "Subscription type must be Basic, Standard, or Premium",
          },
        },
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "start_date",
        validate: {
          notNull: {
            msg: "Start Date is mandatory",
          },
          isDate(value) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
              throw new Error(
                "Invalid start date. Expected format is yyyy-mm-dd"
              );
            }
          },
        },
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "end_date",
        validate: {
          notNull: {
            msg: "End Date is mandatory",
          },
          isDate(value) {
            if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
              throw new Error(
                "Invalid end date. Expected format is yyyy-mm-dd"
              );
            }
          },
        },
      },
    },
    {
      tableName: "subscriptions",
    }
  );

  return Subscription;
};
