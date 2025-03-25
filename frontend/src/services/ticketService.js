import axios from 'axios';

const API_URL = '/api/tickets/';

// Book ticket
const bookTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'book', ticketData, config);
  return response.data;
};

// Get ticket details
const getTicketDetails = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId, config);
  return response.data;
};

const ticketService = {
  bookTicket,
  getTicketDetails
};

export default ticketService;