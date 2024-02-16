/**
 * @openapi
 * definitions:
 *   AddUpdateUser:
 *     type: object
 *     required:
 *       - username
 *       - email
 *     properties:
 *       username:
 *         type: string
 *         minLength: 3
 *         maxLength: 20
 *       email:
 *         type: string
 *         format: email
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the user was updated
 *       example:
 *         id: 1
 *         username: Mark
 *         email: mark@mail.com
 *         createdAt: 2021-01-01T00:00:00.000Z
 *         updatedAt: 2021-01-01T00:00:00.000Z
 */

const router = require("express").Router();

const controller = require("../controllers/user.controller");

/**
 *  @openapi
 *  /api/users:
 *    get:
 *      summary: Get all users
 *      operationId: GetAllUsers
 *      tags: [ Users ]
 *      responses:
 *        200:
 *          description: A list of users.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    username:
 *                      type: string
 *                    email:
 *                      type: string
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                    updatedAt:
 *                      type: string
 *                      format: date-time
 *        500:
 *          description: Internal server error
 *        400:
 *          description: Bad request
 */
// Get all users
router.get("/", controller.getAllUsers);

/**
 *  @openapi
 *  /api/users/{id}:
 *    get:
 *      summary: Get user by id
 *      operationId: GetUserById
 *      tags: [ Users ]
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *      responses:
 *        200:
 *          description: A user object.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                items:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: integer
 *                    username:
 *                      type: string
 *                    email:
 *                      type: string
 *                    createdAt:
 *                      type: string
 *                      format: date-time
 *                    updatedAt:
 *                      type: string
 *                      format: date-time
 *        500:
 *          description: Internal server error
 *        400:
 *          description: Bad request
 */
// Get user by id
router.get("/:id", controller.getUserById);

/**
 *  @openapi
 *  /api/users:
 *    post:
 *      summary: Create a new user
 *      operationId: CreateUser
 *      consumes:
 *        - application/json
 *      tags: [ Users ]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/definitions/AddUpdateUser'
 *      responses:
 *        201:
 *          description: User created successfully
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
 *          description: User already exists
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
// Create a new user
router.post("/", controller.createUser);

/**
 *  @openapi
 *  /api/users/{id}:
 *    put:
 *      summary: Update user by id
 *      operationId: UpdateUser
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/definitions/AddUpdateUser'
 *      responses:
 *        200:
 *          description: User updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  msg:
 *                    type: string
 *        500:
 *          description: Internal server error
 *        400:
 *          description: Bad request
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  errors:
 *                    type: object
 */
// Update user by id
router.put("/:id", controller.updateUser);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user by id
 *     operationId: DeleteUser
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */
// Delete user by id
router.delete("/:id", controller.deleteUser);

module.exports = router;
