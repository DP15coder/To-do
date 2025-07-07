import React, { useState } from "react";
import { Edit, Trash2, Check, Clock } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const TodoItemCard = ({ item, onUpdate, onDelete, clearError }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(item.title);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editTitle.trim()) {
      onUpdate(item._id, { title: editTitle.trim() });
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditTitle(item.title);
    setIsEditing(false);
    if (clearError) clearError();
  };

  const confirmDelete = () => {
    toast(
      (t) => (
        <span className="flex flex-col space-y-2">
          <span>Are you sure you want to delete?</span>
          <span className="flex gap-2 justify-end">
            <button
              onClick={() => {
                onDelete(item._id);
                toast.dismiss(t.id);
              }}
              className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </span>
        </span>
      ),
      { duration: 5000 },
    );
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all ${
        item.completed ? "opacity-75" : ""
      }`}
    >
      <Toaster position="top-center" />

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => {
              setEditTitle(e.target.value);
              if (clearError) clearError();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Todo title"
            autoFocus
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleEditCancel}
              className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-start space-x-3">
            
            <div className="flex-1">
              <h4
                className={`font-medium ${item.completed ? "text-gray-500 line-through" : "text-gray-900"}`}
              >
                {item.title}
              </h4>
              
              <div className="flex items-center text-xs text-gray-400 mt-2">
                <Clock className="w-3 h-3 mr-1" />
                <span>
                  Created {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex space-x-1">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                title="Edit todo"
              >
                <Edit className="w-4 h-4" />
              </button>
              
              <button
                onClick={confirmDelete}
                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete todo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItemCard;
