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
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk('/auth/login', async (values, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${environment.BASE_URL}/auth/login`, { ...values });
    return data;
  } catch (error) {
    console.log('1111', error);
    return rejectWithValue(error.response.data.message);
  }
});

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

    changeStatus: (state, action) => {
      state.status = action.payload;
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
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('Here', action);
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, changeStatus } = userSlice.actions;
export default userSlice.reducer;
