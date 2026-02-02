import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./services/redux/reducer.ts";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster />
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
