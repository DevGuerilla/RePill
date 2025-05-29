import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/AuthStore";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/loginSuccess",
          "auth/loginFailure",
          "auth/logoutFailure",
        ],
        ignoredPaths: ["auth.user", "auth.error"],
      },
    }),
});

export default store;
