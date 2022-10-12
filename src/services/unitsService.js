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

async function getUnits(companyId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.get(`/units/${companyId}`, config);
  return response.data;
}

async function createUnit(data, companyId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post(`/units/${companyId}`, data, config);
  return response.data;
}

const unitsService = {
  getUserCompanies,
  getUnits,
  createUnit,
};

export default unitsService;
