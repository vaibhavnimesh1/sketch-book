const { configureStore } = require("@reduxjs/toolkit");
import MenuReducer from "@/slice/menuSlice";
import ToolboxReducer from "@/slice/toolboxSlice";


export const store = configureStore({
    reducer: {
        toolbox : ToolboxReducer,
        menu : MenuReducer
    }
})