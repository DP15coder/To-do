import { useState } from "react";
import { Edit, Trash2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const TodoListCard = ({ list, onEdit, onDelete, onSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(list.name);
  // const [editDescription, setEditDescription] = useState(list.description);

  const navigate = useNavigate();

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editName.trim()) {
      onEdit(list._id, editName.trim());
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setEditName(list.name);
    setIsEditing(false);
  };

  return (
    <div className="bg-white-600  rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
          />
          <div className="flex space-x-2 mt-4">
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleEditCancel}
              className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-start justify-between min-h-[150px]">
            <div className="flex-1">
              <div className="">
                <h4 className="font-medium break-all break-words">
                  {list.name}
                </h4>
              </div>

              {/* <div className="text-xs text-gray-500 mb-2">
                {list.description} || No Description is added
              </div> */}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                title="Edit list"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(list._id)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Delete list"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={() => navigate(`/todos/${list._id}`)}
            className="mt-4 w-full flex items-center justify-between px-4 py-2 bg-gray-50 border border-blue-500 rounded-lg transition-colors text-left"
          >
            <span className="text-sm font-medium text-gray-700">
              View items
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </>
      )}
    </div>
  );
};

export default TodoListCard;
