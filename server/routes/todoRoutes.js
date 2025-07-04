const express = require('express');
const {
  getTodos,
  createTodoList,
  updateTodoList,
  deleteTodoList,
  getTodoItems,
  addItem,
  updateItem,
  deleteItem,
} = require('../controllers/todoController');

const {
  validateCreateList,
  validateAddItem,
  validateUpdateItem,
  validateDeleteItem,
} = require('../middleware/todoValidator');

const protect = require('../middleware/authMiddleware');

const todoRouter = express.Router();
const itemsRouter = express.Router({mergeParams: true});

todoRouter.use(protect);

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo list and item management
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todo lists for the authenticated user
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todo lists
 *   post:
 *     summary: Create a new todo list
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Tasks
 *     responses:
 *       201:
 *         description: Todo list created
 *       400:
 *         description: Invalid input
 */
todoRouter.get('/', getTodos);
todoRouter.post('/', validateCreateList, createTodoList);

/**
 * @swagger
 * /api/todos/{todoId}:
 *   put:
 *     summary: Update a todo list
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated List Name
 *     responses:
 *       200:
 *         description: Todo list updated
 *       404:
 *         description: Todo list not found
 *   delete:
 *     summary: Delete a todo list
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo list
 *     responses:
 *       200:
 *         description: Todo list deleted
 *       404:
 *         description: Todo list not found
 */
todoRouter.put('/:todoId', validateCreateList, updateTodoList);
todoRouter.delete('/:todoId', deleteTodoList);

/**
 * @swagger
 * /api/todos/{todoId}/items:
 *   get:
 *     summary: Get all items in a todo list
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo list
 *     responses:
 *       200:
 *         description: List of todo items
 *   post:
 *     summary: Add a new item to a todo list
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy milk
 *               description:
 *                 type: string
 *                 example: 2% organic
 *     responses:
 *       201:
 *         description: Todo item created
 *       400:
 *         description: Invalid input
 */
itemsRouter.get('/', getTodoItems);
itemsRouter.post('/', validateAddItem, addItem);

/**
 * @swagger
 * /api/todos/{todoId}/items/{itemId}:
 *   put:
 *     summary: Update a todo item
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo list
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated task
 *               description:
 *                 type: string
 *                 example: Updated description
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Todo item updated
 *       404:
 *         description: Todo item not found
 *   delete:
 *     summary: Delete a todo item
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: todoId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo list
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo item
 *     responses:
 *       200:
 *         description: Todo item deleted
 *       404:
 *         description: Todo item not found
 */
itemsRouter.put('/:itemId', validateUpdateItem, updateItem);
itemsRouter.delete('/:itemId', validateDeleteItem, deleteItem);

todoRouter.use('/:todoId/items', itemsRouter);

module.exports = todoRouter;
