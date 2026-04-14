import api from './axiosConfig';

export const createExchangeRequest = (data) => api.post('/exchanges', data);
export const getIncomingRequests = () => api.get('/exchanges/incoming');
export const getOutgoingRequests = () => api.get('/exchanges/outgoing');
export const updateRequestStatus = (id, status) => api.put(`/exchanges/${id}`, { status });