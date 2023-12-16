import API from "./api.js";

export const getCustomers = async (search) => {
  const response = await API.get(`/customer?searchTerm=${search}`);
  return response.data;
};

export const deleteCustomer = async (customerId) => {
  await API.delete(`/customer/${customerId}`);
};