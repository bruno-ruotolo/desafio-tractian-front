import api from "./api.js";

async function createTokenAndLogin(data) {
  const response = await api.post("/", data);
  console.log(response.data);
  return response.data;
}

const authService = {
  createTokenAndLogin,
};

export default authService;
