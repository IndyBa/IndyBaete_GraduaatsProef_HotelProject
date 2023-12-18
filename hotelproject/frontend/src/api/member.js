import API from "./api.js";

export const getMembers = async (customerId) => {
  const response = await API.get(`/customer/${customerId}/member`);
  return response.data;
};

export const getMember = async (customerId, memberId) => {
    if (customerId === null || memberId === null) { return false; }
    const response = await API.get(`/customer/${customerId}/member/${memberId}`);
    return response.data;
  };

export const addMember = async (customerData, customerId) => {
  const response = await API.post(`/customer/${customerId}/member`, customerData);
  return response.data
};

export const updateMember = async (customerId, memberId, customerData) => {
  const response = await API.put(`/customer/${customerId}/member/${memberId}`, customerData);
  return response.data
};

export const deleteMember = async (customerId, memberId) => {
  await API.delete(`/customer/${customerId}/member/${memberId}`);
};