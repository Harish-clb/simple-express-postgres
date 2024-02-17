/**
 * @openapi
 * definitions:
 *   AddUpdateSubscription:
 *     type: object
 *     required:
 *       - platform
 *       - startDate
 *       - endDate
 *       - userId
 *     properties:
 *       platform:
 *         type: enum
 *         enum: [Netflix, Amazon Prime, Disney+]
 *       subscriptionType:
 *         type: enum
 *         enum: [Basic, Standard, Premium]
 *         default: Basic
 *       startDate:
 *         type: string
 *         format: date
 *       endDate:
 *         type: string
 *         format: date
 *       userId:
 *         type: integer
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       required:
 *         - platform
 *         - startDate
 *         - endDate
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the subscription
 *         platform:
 *           type: enum
 *           description: Subscription platform
 *           enum: [Netflix, Amazon Prime, Disney+]
 *         subscriptionType:
 *           type: enum
 *           description: Subscription type
 *           enum: [Basic, Standard, Premium]
 *           default: Basic
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the subscription was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the subscription was updated
 *         userId:
 *           type: integer
 *           description: The user id associated with the subscription
 *       example:
 *         id: 1
 *         platform: Netflix
 *         type: Basic
 *         startDate: 2021-01-01
 *         endDate: 2021-01-31
 *         userId: 1
 *         createdAt: 2021-01-01T00:00:00.000Z
 *         updatedAt: 2021-01-01T00:00:00.000Z
 */

const router = require("express").Router();

const { isValidId } = require("../middlewares/request.middleware");

const controller = require("../controllers/subscription.controller");

/**
 *  @openapi
 *  /api/subscriptions:
 *    get:
 *      summary: Get subscriptions count by platform and type
 *      operationId: GetSubscriptionsCount
 *      tags: [ Subscriptions ]
 *      responses:
 *        200:
 *          description: A list of subscriptions count by platform and type.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    platform:
 *                      type: string
 *                    subscriptionType:
 *                      type: string
 *                    count:
 *                      type: integer
 *        500:
 *          description: Internal server error
 */
// Get subscriptions count by platform and type
router.get("/", controller.getSubscriptionsCount);

/**
 *  @openapi
 *  /api/subscriptions:
 *    post:
 *      summary: Create a new subscription
 *      operationId: CreateSubscription
 *      consumes:
 *        - application/json
 *      tags: [ Subscriptions ]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/definitions/AddUpdateSubscription'
 *      responses:
 *        201:
 *          description: Subscription created successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                     type: string
 *        500:
 *          description: Internal server error
 *        409:
 *          description: Subscription already exists
 *        400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errors:
 *                      type: object
 */
// Create a new subscription
router.post("/", controller.createSubscription);

/**
 *  @openapi
 *  /api/subscriptions/{id}:
 *    put:
 *      summary: Update a new subscription
 *      operationId: UpdateSubscription
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *      consumes:
 *        - application/json
 *      tags: [ Subscriptions ]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/definitions/AddUpdateSubscription'
 *      responses:
 *        201:
 *          description: Subscription updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                     type: string
 *        500:
 *          description: Internal server error
 *        400:
 *           description: Bad request
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errors:
 *                      type: object
 */
// Update subscription
router.put("/:id", [isValidId], controller.updateSubscription);

/**
 * @openapi
 * /api/subscriptions/{id}:
 *   delete:
 *     summary: Delete user subscription by id
 *     operationId: DeleteSubscription
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       204:
 *         description: Subscription deleted successfully
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */
// Delete subscription
router.delete("/:id", [isValidId], controller.deleteSubscription);

module.exports = router;
