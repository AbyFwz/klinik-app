import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jenisTindakanList: [],
  selectedData: {},
  loading: true,
};

const jenisTindakanSlice = createSlice({
  name: "jenisTindakan",
  initialState,
  reducers: {
    setJenisTindakanList: (state, action) => {
      state.jenisTindakanList = action.payload;
    },
    setSelectedData: (state, action) => {
        state.selectedData = action.payload;
    }
  },
});

export const { setJenisTindakanList, setSelectedData } = jenisTindakanSlice.actions;
export default jenisTindakanSlice.reducer;
