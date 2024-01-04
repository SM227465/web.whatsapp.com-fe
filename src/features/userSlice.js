import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { environment } from '../environments';

const initialState = {
  status: '',
  error: '',
  user: {
    id: '',
    name: '',
    email: '',
    picture: '',
    status: '',
    token: '',
  },
};

export const registerUser = createAsyncThunk(
  '/auth/register',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${environment.BASE_URL}/auth/register`, { ...values });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.status = '';
      state.error = '';
      state.user = {
        id: '',
        name: '',
        email: '',
        picture: '',
        status: '',
        token: '',
      };
    },
  },

  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
