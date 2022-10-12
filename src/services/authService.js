import api from "./api.js";

async function createTokenAndLogin(data) {
  const response = await api.post("/", data);
  return response.data;
}

const authService = {
  createTokenAndLogin,
};

export default authService;
