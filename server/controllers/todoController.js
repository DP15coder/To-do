const todoService = require('../services/todoService');

class TodoController {
  /* ----------------------------LIST-LEVEL ENDPOINTS ------------------------------- */

  getTodos = async (req, res) => {
    try {
      const todos = await todoService.getTodos(req.user.id);
      res.json(todos);
    } catch (err) {
      console.error('Get Todos Error:', err.message);
      res.status(500).json({ message: 'Failed to fetch todos.' });
    }
  };

  createTodoList = async (req, res) => {
    try {
      const list = await todoService.createTodoList(req.user.id, req.body.name);
      res.status(201).json(list);
    } catch (err) {
      console.error('Create Todo Error:', err.message);
      res.status(500).json({ message: 'Failed to create todo list.' });
    }
  };

  updateTodoList = async (req, res) => {
   
    try {
      const updated = await todoService.updateTodoList(
        req.user.id,
        req.params.todoId,
        req.body
      );
      res.json(updated);
    } catch (err) {
      console.error('Update Todo Error:', err.message);
      res.status(500).json({ message: 'Failed to update todo list.' });
    }
  };

  deleteTodoList = async (req, res) => {
   
    try {
      const deleted = await todoService.deleteTodoList(
        req.user.id,
        req.params.todoId
      );
      if (!deleted) {
        return res
          .status(500)
          .json({ message: 'Todo list not found or not authorized' });
      }
      res.json({ message: 'Todo list deleted successfully' });
    } catch (err) {
      console.error('Delete Todo Error:', err.message);
      res.status(500).json({ message: 'Failed to delete todo list' });
    }
  };

  /* ------------------------------ ITEM-LEVEL ENDPOINTS ------------------------------------ */

  addItem = async (req, res) => {
    const { todoId } = req.params;
    const { title, description } = req.body;


    try {
      const item = await todoService.addItem(todoId, title, description);
      res.status(201).json(item);
    } catch (err) {
      console.error('Add Item Error:', err.message);
      res.status(500).json({ message: 'Failed to add item.' });
    }
  };

  getTodoItems = async (req, res) => {
    
    try {
      const items = await todoService.getTodoItems(
        req.user.id,
        req.params.todoId
      );
      res.json(items);
    } catch (err) {
      console.error('Get Todo Items Error:', err.message);
      res.status(500).json({ message: 'Failed to fetch items.' });
    }
  };

  updateItem = async (req, res) => {
   
       try {
      const list = await todoService.updateItem(
        req.params.todoId,
        req.params.itemId,
        req.body
      );
  
      if (!list) {
        return res.status(404).json({ message: 'Todo list not found' });
      }
      
      res.json(list);
    } catch (err) {
      console.error('Update Item Error:', err.message);
      res.status(500).json({ message: 'Failed to update item.' });
    }
  };

  deleteItem = async (req, res) => {
    
    try {
      const list = await todoService.deleteItem(
        req.params.todoId,
        req.params.itemId
      );
      res.json(list);
    } catch (err) {
      console.error('Delete Item Error:', err.message);
      res.status(500).json({ message: 'Failed to delete item.' });
    }
  };
}

module.exports = new TodoController();
