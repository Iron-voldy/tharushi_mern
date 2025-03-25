import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import busService from '../../services/busService';

const initialState = {
  buses: [],
  bus: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Search buses
export const searchBuses = createAsyncThunk(
  'buses/search',
  async (searchData, thunkAPI) => {
    try {
      return await busService.searchBuses(searchData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get bus details
export const getBusDetails = createAsyncThunk(
  'buses/getDetails',
  async (busId, thunkAPI) => {
    try {
      return await busService.getBusDetails(busId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBuses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchBuses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.buses = action.payload;
      })
      .addCase(searchBuses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBusDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBusDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bus = action.payload;
      })
      .addCase(getBusDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = busSlice.actions;
export default busSlice.reducer;