import { useState, useEffect } from "react";

function UserManagement() {
  // =========================================
  // STATE
  // =========================================

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState({
    fetch: false,
    create: false,
    update: false,
    delete: false,
  });

  const [error, setError] = useState(null);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const [editingUser, setEditingUser] = useState(null);

  // =========================================
  // MOCK API BASE URL
  // =========================================

  const API_BASE = "https://jsonplaceholder.typicode.com";

  // =========================================
  // GENERIC API CALL FUNCTION
  // =========================================

  const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  };

  // =========================================
  // FETCH ALL USERS
  // =========================================

  const fetchUsers = async () => {
    setLoading((prev) => ({
      ...prev,
      fetch: true,
    }));

    setError(null);

    try {
      const userData = await apiCall("/users");

      setUsers(userData);
    } catch (err) {
      setError(`Failed to fetch users: ${err.message}`);
    } finally {
      setLoading((prev) => ({
        ...prev,
        fetch: false,
      }));
    }
  };

  // =========================================
  // CREATE NEW USER
  // =========================================

  const createUser = async (userData) => {
    setLoading((prev) => ({
      ...prev,
      create: true,
    }));

    setError(null);

    try {
      const newUserData = await apiCall("/users", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      // JSONPlaceholder does not permanently create users,
      // so we simulate it by adding the user to local state.
      const userWithId = {
        ...userData,
        id: Date.now(),
      };

      setUsers((prev) => [
        ...prev,
        userWithId,
      ]);

      setNewUser({
        name: "",
        email: "",
        role: "user",
      });

      return userWithId;
    } catch (err) {
      setError(`Failed to create user: ${err.message}`);

      throw err;
    } finally {
      setLoading((prev) => ({
        ...prev,
        create: false,
      }));
    }
  };

  // =========================================
  // UPDATE USER
  // =========================================

  const updateUser = async (userId, userData) => {
    setLoading((prev) => ({
      ...prev,
      update: true,
    }));

    setError(null);

    try {
      const updatedUser = await apiCall(
        `/users/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify(userData),
        }
      );

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId
            ? {
                ...user,
                ...userData,
              }
            : user
        )
      );

      setEditingUser(null);

      return updatedUser;
    } catch (err) {
      setError(`Failed to update user: ${err.message}`);

      throw err;
    } finally {
      setLoading((prev) => ({
        ...prev,
        update: false,
      }));
    }
  };

  // =========================================
  // DELETE USER
  // =========================================
  // This section is not visible in the screenshot,
  // but it fits the delete loading state and CRUD flow.

  const deleteUser = async (userId) => {
    setLoading((prev) => ({
      ...prev,
      delete: true,
    }));

    setError(null);

    try {
      await apiCall(`/users/${userId}`, {
        method: "DELETE",
      });

      setUsers((prev) =>
        prev.filter((user) => user.id !== userId)
      );
    } catch (err) {
      setError(`Failed to delete user: ${err.message}`);

      throw err;
    } finally {
      setLoading((prev) => ({
        ...prev,
        delete: false,
      }));
    }
  };

  // =========================================
  // LOAD USERS ON COMPONENT MOUNT
  // =========================================

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================================
  // HANDLE CREATE FORM
  // =========================================

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email) {
      setError("Name and email are required");
      return;
    }

    try {
      await createUser(newUser);
    } catch (err) {
      // Error already handled in createUser
    }
  };

  // =========================================
  // HANDLE UPDATE FORM
  // =========================================

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!editingUser.name || !editingUser.email) {
      setError("Name and email are required");
      return;
    }

    try {
      await updateUser(
        editingUser.id,
        editingUser
      );
    } catch (err) {
      // Error already handled in updateUser
    }
  };

  // =========================================
  // SIMPLE JSX
  // =========================================
  // Lecturer's original JSX is in presenter notes,
  // so this is a working version for VS Code.

  return (
    <div>
      <h1>User Management System</h1>

      {error && (
        <p style={{ fontWeight: "bold" }}>
          {error}
        </p>
      )}

      {/* CREATE USER */}
      <form onSubmit={handleCreateSubmit}>
        <h2>Create User</h2>

        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              email: e.target.value,
            })
          }
        />

        <select
          value={newUser.role}
          onChange={(e) =>
            setNewUser({
              ...newUser,
              role: e.target.value,
            })
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading.create}
        >
          {loading.create
            ? "Creating..."
            : "Create User"}
        </button>
      </form>

      <hr />

      {/* EDIT USER */}
      {editingUser && (
        <form onSubmit={handleUpdateSubmit}>
          <h2>Edit User</h2>

          <input
            type="text"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                name: e.target.value,
              })
            }
          />

          <input
            type="email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                email: e.target.value,
              })
            }
          />

          <button
            type="submit"
            disabled={loading.update}
          >
            {loading.update
              ? "Updating..."
              : "Update User"}
          </button>

          <button
            type="button"
            onClick={() => setEditingUser(null)}
          >
            Cancel
          </button>
        </form>
      )}

      <hr />

      {/* USER LIST */}
      <h2>Users</h2>

      {loading.fetch && <p>Loading users...</p>}

      {!loading.fetch &&
        users.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>

            <p>{user.email}</p>

            <button
              onClick={() =>
                setEditingUser(user)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                deleteUser(user.id)
              }
              disabled={loading.delete}
            >
              Delete
            </button>

            <hr />
          </div>
        ))}
    </div>
  );
}

export default UserManagement;