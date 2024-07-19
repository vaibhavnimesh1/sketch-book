import { COLORS } from "@/constants";

const { createSlice } = require("@reduxjs/toolkit");

const toolSlice = createSlice({
  name: "toolbox",
  initialState: {
    color: COLORS.RED,
    range: 3,
  },
  reducers: {
    rangeSelected: (state, action) => {
      state.range = action.payload.range;
    },
    colorSelected: (state, action) => {
      state.color = action.payload.color;
    },
  },
});

export const { rangeSelected } = toolSlice.actions;

export default toolSlice.reducer;
