import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";
import { dataApi } from "./dataApi";
import authSlliceReducer from "./authSlice";
import { sessionApi } from "./sessionApi";
import sessionReducer from "./sessionApiSlice";

import { securityLogsApi } from "./securityLogsApi";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [securityLogsApi.reducerPath]: securityLogsApi.reducer,
    [dataApi.reducerPath]: dataApi.reducer,
    auth: authSlliceReducer,
    [sessionApi.reducerPath]: sessionApi.reducer,
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      dataApi.middleware,
      sessionApi.middleware,
      securityLogsApi.middleware
    ),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
