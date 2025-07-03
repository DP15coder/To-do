const TodoList = require('../models/TodoList');

class TodoController {
  // @desc    Get all todos for a user
  // @route   GET /api/todos
  // @access  Private
  async getTodos(req, res) {
    try {
      const todos = await TodoList.find({ user: req.user.id });
      res.json(todos);
    } catch (error) {
      console.error("Get Todos Error:", error.message);
      res.status(500).json({ message: "Failed to fetch todos." });
    }
  }

  // @desc    Create a new todo list
  // @route   POST /api/todos
  // @access  Private
  async createTodoList(req, res) {
    try {
      const { name } = req.body;
      const list = await TodoList.create({
        name,
        items: [],
        user: req.user.id
      });
      res.status(201).json(list);
    } catch (error) {
      console.error("Create Todo Error:", error.message);
      res.status(500).json({ message: "Failed to create todo list." });
    }
  }

  // @desc    Update a todo list
  // @route   PUT /api/todos/:id
  // @access  Private
  async updateTodoList(req, res) {
    try {
      const updated = await TodoList.findOneAndUpdate(
        // const { todoId } = req.params; 

        { _id: req.params.todoId, user: req.user.id }, req.body,
        { new: true }
      );
      res.json(updated);
    } catch (error) {
      console.error("Update Todo Error:", error.message);
      res.status(500).json({ message: "Failed to update todo list." });
    }
  }

  // @desc    Delete a todo list
  // @route   DELETE /api/todos/:id
  // @access  Private
  async deleteTodoList(req, res) {
    try {
      const deleted = await TodoList.findOneAndDelete({
        _id: req.params.todoId,
        user: req.user.id
      });

      if (!deleted) {
        return res.status(500).json({ message: "Todo list not found or not authorized" });
      }

      return res.status(200).json({ message: "Todo list deleted successfully" });

    } catch (error) {
      console.error("Delete Todo Error:", error.message);
      return res.status(500).json({ message: "Failed to delete todo list" });
    }
  }


// @desc    add a todo item
  // @route   POST /api/todos/:id
  // @access  Private

  async addItem(req, res) {
  const { todoId } = req.params;
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  try {
    const list = await TodoList.findById(todoId);
    if (!list) return res.status(404).json({ message: 'List not found' });

    list.items.push({
      title,
      description: description || '',
    });

    await list.save();
    res.status(201).json(list.items[list.items.length - 1]); // return the new item only
  } catch (error) {
    console.error('Add Item Error:', error.message);
    res.status(500).json({ message: 'Failed to add item.' });
  }
}

// @desc    Get items of a specific todo list
// @route   GET /api/todos/:todoId/items
// @access  Private
  async getTodoItems(req, res) {
  try {
    const list = await TodoList.findOne({
      _id: req.params.todoId,
      user: req.user.id,
    });

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json(list.items);
  } catch (error) {
    console.error("Get Todo Items Error:", error.message);
    res.status(500).json({ message: "Failed to fetch items." });
  }
}

  // @desc    Update an item in a list
  // @route   PUT /api/todos/:todoId/items/:itemId
  // @access  Private
  async updateItem(req, res) {
    try {
      const list = await TodoList.findById(req.params.todoId);
      const item = list.items.id(req.params.itemId);
      Object.assign(item, req.body);
      await list.save();
      res.json(list);
    } catch (error) {
      console.error("Update Item Error:", error.message);
      res.status(500).json({ message: "Failed to update item." });
    }
  }

  // @desc    Update an item in a list
  // @route   DELETE /api/todos/:todoId/items/:itemId
  // @access  Private
  async deleteItem(req, res) {
    try {
      const list = await TodoList.findById(req.params.todoId);
      if (!list) return res.status(404).json({ message: "List not found" });

      const item = list.items.id(req.params.itemId);
      if (!item) return res.status(404).json({ message: "Item not found" });

      list.items.pull(item._id); 
      await list.save();

      res.json(list);
    } catch (error) {
      console.error("Delete Item Error:", error.message);
      res.status(500).json({ message: "Failed to delete item." });
    }
  }


}

module.exports = new TodoController();
