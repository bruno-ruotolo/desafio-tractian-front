import api from "./api.js";

async function getUserCompanies(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get("/companies", config);
  return response.data;
}

async function createCompany(data, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post("/companies", data, config);
  return response.data;
}

const companiesService = {
  getUserCompanies,
  createCompany,
};

export default companiesService;
