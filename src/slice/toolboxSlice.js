import { COLORS, MENU_ITEMS } from "@/constants";

const { createSlice } = require("@reduxjs/toolkit");

const toolSlice = createSlice({
  name: "toolbox",
  initialState: {
    [MENU_ITEMS.PENCIL]: {
      color: "black",
      brushSize:5
   },
    [MENU_ITEMS.ERASER]: {
      color: "white",
      brushSize:5
    },
    [MENU_ITEMS.UNDO]:{},
    [MENU_ITEMS.REDO]:{},
    [MENU_ITEMS.DOWNLOAD]:{},
  },
  reducers: {
    changeColor: (state, action) => {
      state[action.payload.item].color = action.payload.color 
    },
    changeBrushSize: (state, action) => {
      state[action.payload.item].brushSize = action.payload.brushSize 
    },
  },
});

export const { changeColor,changeBrushSize } = toolSlice.actions;

export default toolSlice.reducer;
