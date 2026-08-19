import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import authReducer from "./slices/authSlice";

import storage from "@/lib/redux-persist-storage";

import uiReducer from "./slices/uiSlice";
import preferencesReducer from "./slices/preferencesSlice";
import favoritesReducer from "./slices/favoritesSlice";
import { baseApi } from "./api/baseApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["ui", "preferences", "favorites", "auth"], // Only persist these slices
};

const rootReducer = combineReducers({
  ui: uiReducer,
  preferences: preferencesReducer,
  favorites: favoritesReducer,
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });
};

setupListeners(() => {});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
