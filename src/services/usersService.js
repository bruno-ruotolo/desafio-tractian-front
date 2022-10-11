import api from "./api.js";

async function createUser(data, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post("/users", data, config);
  return response.data;
}

async function deleteUser(id, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(`/users/${id}`, config);
  return response.data;
}

async function updateUser(data, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put("/users", data, config);
  return response.data;
}

async function getAllUsers(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/users", config);
  return response.data;
}

const usersService = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};

export default usersService;
