import axios from 'axios';

const API_URL = '/api/tickets/';

// Search buses
const searchBuses = async (searchData) => {
  const { departureLocation, destination, date } = searchData;
  const response = await axios.get(
    `${API_URL}search?departureLocation=${departureLocation}&destination=${destination}&date=${date}`
  );
  return response.data;
};

// Get bus details
const getBusDetails = async (busId) => {
  const response = await axios.get(API_URL + 'bus/' + busId);
  return response.data;
};

const busService = {
  searchBuses,
  getBusDetails,
};

export default busService;