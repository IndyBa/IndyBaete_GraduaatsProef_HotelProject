import API from "./api.js";

export const getCustomers = async (search) => {
  const response = await API.get(`/customer?searchTerm=${search}`);
  return response.data;
};

export const getCustomer = async (customerId) => {
  if (customerId === null) { return false; }
  const response = await API.get(`/customer/${customerId}`);
  return response.data;
};

export const addCustomer = async (customerData) => {
  const response = await API.post(`/customer`, customerData);
  return response.data
};

export const updateCustomer = async (customerData, customerId) => {
  const response = await API.put(`/customer/${customerId}`, customerData);
  return response.data
};

export const deleteCustomer = async (customerId) => {
  await API.delete(`/customer/${customerId}`);
};