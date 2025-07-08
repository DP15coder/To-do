import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { todoService } from "../services/todoService";
import Header from "../components/layout/Header";
import TodoItemCard from "../components/todo/TodoItemCard";
import CreateTodoForm from "../components/todo/CreateTodoItem";
import { ArrowLeft, Search, Filter, Edit } from "lucide-react";
import Footer from "../components/layout/Footer";

const TodoItems = () => {
  const { todoId } = useParams();
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState(null);
  const [todoItems, setTodoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [creating, setCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(todoList?.name || "");
  const [titleError, setTitleError] = useState("");


useEffect(() => {
  if (todoId) {
    loadTodoItems();
  }
}, [todoId]);

  const loadTodoItems = async () => {
  if (!todoId) return;
  try {
    const items = await todoService.getTodoItems(todoId);
    setTodoItems(items);

    const lists = await todoService.getTodoLists();
    const currentList = lists.find((list) => list._id === todoId);
    setTodoList(currentList || null);
    setListTitle(currentList?.name || "");
  } catch (error) {
    console.error("Failed to load todo items:", error);
  } finally {
    setLoading(false);
  }

  }

  const handleTitleSave = async () => {
    if (!listTitle.trim()) {
      setTitleError("Title cannot be empty");
      return;
    }
    try {
      await todoService.updateTodoList(todoList._id, listTitle.trim());
      setEditingTitle(false);
      setTitleError("");
      setTodoList((prev) => ({ ...prev, name: listTitle.trim() }));
    } catch (error) {
      setTitleError("Failed to update title it is too long");
    }
  };

  const handleCreateItem = async (title, description) => {
    if (!todoId) return;

    setCreating(true);
    setErrorMsg("");
    try {
      const newItem = await todoService.createTodoItem(
        todoId,
        title,
        description
      );
      setTodoItems((prev) => [newItem, ...prev]);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMsg(error.response.data.errors.map((e) => e.msg).join(". "));
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Failed to create todo item.");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateItem = async (itemId, updates) => {
    console.log(updates, "whatis in updates");
    if (!todoId) return;

    try {
      const updatedItem = await todoService.updateTodoItem(
        todoId,
        itemId,
        updates
      );

      setTodoItems((prev) =>
        prev.map((item) => (item._id === itemId ? updatedItem : item))
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMsg(error.response.data.errors.map((e) => e.msg).join(". "));
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Failed to Update todo item.");
      }
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!todoId) return;

    try {
      await todoService.deleteTodoItem(todoId, itemId);
      setTodoItems((prev) => prev.filter((item) => item._id !== itemId));
      // toast.success('item deleted');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMsg(error.response.data.errors.map((e) => e.msg).join(". "));
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Failed to delete todo item:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!todoList) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900">
              List not found
            </h2>
            <p className="text-gray-600 mt-2">
              The todo list you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Lists</span>
          </button>

          {/* <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {todoList.name}
              </h1>
            </div>
          </div> */}

          {editingTitle ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                className="border px-2 py-1 rounded"
                autoFocus
              />
              <button
                onClick={handleTitleSave}
                className="px-2 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingTitle(false);
                  setListTitle(todoList.name);
                }}
                className="px-2 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
              {titleError && (
                <span className="text-red-500 text-sm ml-2">{titleError}</span>
              )}
            </div>
          ) : (
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              {todoList.name}
              {/* <button
                onClick={() => setEditingTitle(true)}
                className="ml-2 text-blue-600 underline text-sm"
              >
                Edit
              </button> */}

              <button
                onClick={() => setEditingTitle(true)}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                title="Edit list"
              >
                <Edit className="w-4 h-4" />
              </button>
            </h1>
          )}
        </div>

        <div className="space-y-4">
          <CreateTodoForm onSubmit={handleCreateItem} loading={creating} />

          {errorMsg && (
            <div className="mt-2 mb-4 text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm">
              {errorMsg}
            </div>
          )}

          {todoItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filter !== "all"
                  ? "No todos found"
                  : "No todo items yet"}
              </h3>
              <p className="text-gray-600">
                {searchTerm || filter !== "all"
                  ? "Try adjusting your search or filter."
                  : "Add your first todo item  to get started."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {todoItems.map((item) => (
                <TodoItemCard
                  key={item._id}
                  item={item}
                  onUpdate={handleUpdateItem}
                  onDelete={handleDeleteItem}
                  clearError={() => setErrorMsg("")}
                />
              ))}
            </div>
          )}
        </div>
       
      </div>
            <Footer />

    </div>
  );
};

export default TodoItems;
