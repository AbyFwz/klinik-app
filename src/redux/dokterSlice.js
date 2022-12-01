import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// will generate promise life cycle: pending, fulfilled, reject
// these states will be evaluated in the extra reducers

const baseUrl = "http://localhost:3001/dokter";

export const getAll = createAsyncThunk("dokter/getAll", async () => {
  const response = await axios.get(baseUrl);
  return response.data;
});

export const getDokter = createAsyncThunk(
  "dokter/getDokter",
  async ({ id }) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  }
);

export const deleteDokter = createAsyncThunk(
  "dokter/deleteDokter",
  async ({ id }) => {
    const response = await axios.remove(`${baseUrl}/${id}`);
    return response.data;
  }
);

const initialState = {
  dokter: [],
  loading: false,
  error: null,
  edit: false,
};

const dokterSlice = createSlice({
  name: "dokter",
  initialState,
  reducers: {
    setDokter: (state, action) => {
      state.dokter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.loading = true;
      state.dokter = action.payload;
    });
    // [getAll.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getAll.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.dokter = [action.payload];
    // },
    // [getAll.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // [getDokter.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [getDokter.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.dokter = [action.payload];
    // },
    // [getDokter.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
    // [deleteDokter.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [deleteDokter.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.dokter = action.payload;
    // },
    // [deleteDokter.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // },
  },
});
export const { setDokter } = dokterSlice.actions;
export default dokterSlice.reducer;
