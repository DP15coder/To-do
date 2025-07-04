import React, { useState, useEffect } from "react";
import { todoService } from "../services/todoService";
import Header from "../components/layout/Header";
import TodoListCard from "../components/todo/TodoListCard";
import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [todoLists, setTodoLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [creating, setCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [editErrorMsg, setEditErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadTodoLists();
  }, []);

  const loadTodoLists = async () => {
    try {
      const lists = await todoService.getTodoLists();
      setTodoLists(lists);
    } catch (error) {
      console.error("Failed to load todo lists:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateList = async (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    setCreating(true);
    setErrorMsg("");
    try {
      const newList = await todoService.createTodoList(newListName.trim());
      setTodoLists((prev) => [newList, ...prev]);
      setNewListName("");
      setShowCreateForm(false);

      navigate(`/todos/${newList._id}`);
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
        setErrorMsg("Failed to create todo list.");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleEditList = async (id, name) => {
    setEditErrorMsg("");
    try {
      const updatedList = await todoService.updateTodoList(id, name);
      setTodoLists((prev) =>
        prev.map((list) => (list._id === id ? updatedList : list)),
      );
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setEditErrorMsg(error.response.data.errors.map((e) => e.msg).join(". "));
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setEditErrorMsg(error.response.data.message);
      } else {
        setEditErrorMsg("Failed to update todo list.");
      }
    }
  };

  const handleDeleteList = async (id) => {
    try {
      await todoService.deleteTodoList(id);
      setTodoLists((prev) => prev.filter((list) => list._id !== id));
      toast.success("List deleted");
    } catch (error) {
      console.error("Failed to delete list:", error);
      toast.error("Failed to delete");
    }
  };

  const confirmDeleteList = (id) => {
    toast((t) => (
      <span className="flex flex-col space-y-2">
        <span>Are you sure you want to delete this list?</span>
        <span className="flex gap-2 justify-end">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              await handleDeleteList(id);
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
    ));
  };

  const filteredLists = todoLists.filter((list) =>
    list.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  console.log(filteredLists, "what isinside filterdLists");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="mt-32">
        <Toaster position="top-center" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semi-bold text-gray-900 mb-4">
            Todo Builder
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search todo lists..."
              />
            </div>

            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New List</span>
            </button>
          </div>
        </div>

        {showCreateForm && (
          <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleCreateList}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Create New Todo List
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => {
                    setNewListName(e.target.value.slice(0, 150));
                    setErrorMsg("");
                  }}
                  maxLength={150}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 break-words truncate"
                  placeholder="Enter list name..."
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                />
                <button
                  type="submit"
                  disabled={creating || !newListName.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {creating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Create"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewListName("");
                    setErrorMsg("");
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
              {errorMsg && (
                <div className="mt-2 mb-2 text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm">
                  {errorMsg}
                </div>
              )}
            </form>
          </div>
        )}

        {filteredLists.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? "No lists found" : "No todo lists yet"}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Create your first todo list to get organized."}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create your first list
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLists.map((list) => (
              <TodoListCard
                key={list._id}
                list={list}
                onEdit={handleEditList}
                onDelete={confirmDeleteList}
                onSelect={(list) => {
                  window.location.hash = `/todos/${list._id}`;
                }}
                style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
              />
            ))}
          </div>
        )}
        {editErrorMsg && (
          <div className="mt-2 mb-2 text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm">
            {editErrorMsg}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
