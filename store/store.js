import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import counterReducer from "./slices/cartslice";

const makeStore = () =>
  configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
export const wrapper = createWrapper(makeStore);
