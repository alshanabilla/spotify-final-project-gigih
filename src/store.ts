import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth-slice";

const store = configureStore ({
    reducer: {
        auth: authReducer,
    }
});

export type TRootState = ReturnType<typeof store.getState>

export default store;