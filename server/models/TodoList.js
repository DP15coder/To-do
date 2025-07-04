const mongoose = require('mongoose');


const todoItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});



const todoListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [todoItemSchema],
});

module.exports = mongoose.model('TodoList', todoListSchema);
