const db = require("../models");
const User = db.user;

const excludeUserAttributes = ["createdAt", "updatedAt"];
const excludeSubscriptionAttributes = [
  "createdAt",
  "updatedAt",
  "id",
  "createdAt",
  "updatedAt",
  "userId",
];

// A helper method for GET requests to check if subscriptions should be sent in the response based on the query parameter
const getUserQuery = (req) => {
  if ((req.query.subscriptions ?? "").toLowerCase() === "true") {
    return {
      include: [
        {
          model: db.subscription,
          as: "subscriptions",
          attributes: { exclude: excludeSubscriptionAttributes },
        },
      ],
    };
  }
  return {
    attributes: { exclude: excludeUserAttributes },
  };
};

const getAllUsers = async (req, res) => {
  await User.findAll(getUserQuery(req))
    .then((users) => res.status(200).send({ users }))
    .catch((error) => res.status(500).send({ message: error.message }));
};

const getUserById = async (req, res) => {
  await User.findByPk(req.params.id, getUserQuery(req))
    .then((user) => res.status(200).send({ user }))
    .catch((error) => res.status(500).send({ message: error.message }));
};

const createUser = async (req, res) => {
  await User.findOrCreate({
    where: {
      email: req.body.email,
      username: req.body.username,
    },
    defaults: req.body,
  })
    .then(([user, created]) => {
      if (!created) {
        return res.status(409).send({ message: "User already exists" });
      }
      return res.status(201).send({ user });
    })
    .catch((error) => {
      if (error.errors?.length) {
        const errors = error.errors.map(({ path, message }) => ({
          [path]: message,
        }));
        return res.status(400).send({ errors });
      }
      res.status(500).send({ message: error.message });
    });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  await User.update(req.body, {
    where: { id },
  })
    .then((updatedCount) => {
      if (!updatedCount[0]) {
        return res.status(400).send({
          message: `User with id ${id} does not exist`,
        });
      }
      return res.status(200).send({ message: "User updated successfully" });
    })
    .catch((error) => res.status(500).send({ message: error.message }));
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const isDeleted = await User.destroy({
      where: {
        id,
      },
    });
    if (!isDeleted)
      return res.status(404).send({ message: `User with id ${id} not found` });
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
