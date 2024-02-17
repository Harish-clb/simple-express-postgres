const db = require("../models");
const Subscription = db.subscription;

const getSubscriptionsCount = async (req, res) => {
  await Subscription.count({
    group: ["platform", "type"],
  })
    .then((subscriptions) => res.status(200).json(subscriptions))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createSubscription = async (req, res) => {
  await Subscription.findOrCreate({
    where: {
      platform: req.body.platform,
      userId: req.body.userId,
    },
    defaults: req.body,
  })
    .then(([subscription, created]) => {
      if (!created) {
        return res.status(409).send({ message: "Subscription already exists" });
      }
      return res.status(201).send({ subscription });
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

const updateSubscription = async (req, res) => {
  const id = req.params.id;
  await Subscription.update(req.body, {
    where: { id },
  })
    .then((updatedCount) => {
      if (!updatedCount[0]) {
        return res.status(400).send({
          message: `User with id ${id} does not exist`,
        });
      }
      return res
        .status(200)
        .send({ message: "Subscription updated successfully" });
    })
    .catch((error) => {
      res.send({
        message: `Cannot update Subscription with id=${id}. Maybe Subscription was not found or req.body is empty!`,
      });
    });
};

const deleteSubscription = async (req, res) => {
  const id = req.params.id;
  try {
    const isDeleted = await Subscription.destroy({
      where: {
        id,
      },
    });
    if (!isDeleted)
      return res
        .status(404)
        .send({ message: `Subscription with id ${id} not found` });
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getSubscriptionsCount,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};
