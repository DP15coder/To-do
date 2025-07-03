const express = require('express');
const {
  getTodos,
  createTodoList,
  updateTodoList,
  deleteTodoList,
  getTodoItems,
  addItem,
  updateItem,
  deleteItem
} = require('../controllers/todoController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.use(protect);

router.get('/', getTodos);
router.post('/', createTodoList);
router.put('/:todoId', updateTodoList);
router.delete('/:todoId', deleteTodoList);

router.get('/:todoId/items', getTodoItems); 
router.post('/:todoId/items',addItem);
router.put('/:todoId/items/:itemId', updateItem);
router.delete('/:todoId/items/:itemId', deleteItem);

module.exports = router;
