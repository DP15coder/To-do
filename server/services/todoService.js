// services/todoService.js
const TodoList = require('../models/TodoList');

class TodoService {

  /* ---------------------------- LIST-LEVEL METHODS ------------------------------ */

  async getTodos(userId) {
    const lists = await TodoList.find({ user: userId }).select(
      '_id name user items'
    );
    return lists.map((list) => ({
      _id: list._id,
      name: list.name,
      user: list.user,
     created_at: list.created_at,

      items: list.items.map((item) => ({
        _id: item._id,
        title: item.title,
        description: item.description,
        completed: item.completed,
        created_at: item.created_at,
      })),
    }));
  }

  async createTodoList(userId, name) {
    const list = await TodoList.create({ name, items: [], user: userId });
    return {
      _id: list._id,
      name: list.name,
      user: list.user,
     created_at: list.created_at,
      items: [],
    };
  }

  async updateTodoList(userId, todoId, updates) {
    const list = await TodoList.findOneAndUpdate(
      { _id: todoId, user: userId },
      updates,
      {
        new: true,
        fields: '_id name user items',
      }
    );
    if (!list) return null;
    return {
      _id: list._id,
      name: list.name,
      user: list.user,
      items: list.items.map((item) => ({
        _id: item._id,
        title: item.title,
        description: item.description,
        completed: item.completed,
        created_at: item.created_at,
      })),
    };
  }

  async deleteTodoList(userId, todoId) {
    const list = await TodoList.findOneAndDelete({ _id: todoId, user: userId });
    if (!list) return null;
    return {
      _id: list._id,
      name: list.name,
      user: list.user,
      items: list.items.map((item) => ({
        _id: item._id,
        title: item.title,
        description: item.description,
        completed: item.completed,
        created_at: item.created_at,
      })),
    };
  }

  /* ----------------------------------------ITEM-LEVEL METHODS --------------------------------- */

  async addItem(todoId, title, description = '') {
    const list = await TodoList.findById(todoId);
    if (!list) throw new Error('List not found');

    list.items.push({ title, description });
    await list.save();
    const item = list.items[list.items.length - 1];
    return {
      _id: item._id,
      title: item.title,
      description: item.description,
      completed: item.completed,
      created_at: item.created_at,
    };
  }

  async getTodoItems(userId, todoId) {
    const list = await TodoList.findOne({ _id: todoId, user: userId })
    if (!list) throw new Error('List not found');
    return list.items.map((item) => ({
      _id: item._id,
      title: item.title,
      description: item.description,
      completed: item.completed,
      created_at: item.created_at,
    }));
  }

  async updateItem(todoId, itemId, updates) {
    const list = await TodoList.findById(todoId);
    if (!list) throw new Error('List not found');

    const item = list.items.id(itemId);
    if (!item) throw new Error('Item not found');

    Object.assign(item, updates);
    await list.save();
    return {
      _id: item._id,
      title: item.title,
      description: item.description,
      completed: item.completed,
      created_at: item.created_at,
    };
  }

  async deleteItem(todoId, itemId) {
    const list = await TodoList.findById(todoId);
    if (!list) throw new Error('List not found');

    const item = list.items.id(itemId);
    if (!item) throw new Error('Item not found');

    list.items.pull(item._id);
    await list.save();
    return {
      _id: item._id,
      title: item.title,
      description: item.description,
      completed: item.completed,
      created_at: item.created_at,
    };
  }
}

module.exports = new TodoService();
