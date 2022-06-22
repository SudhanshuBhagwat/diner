import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { registerSW } from "virtual:pwa-register";
import "./index.css";
import Root from "./Root";
import { store } from "./store";
import { signIn, signOut } from "./store/slices/userSlice";

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <Root />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")!
);

onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    store.dispatch(signIn(user));
  } else {
    store.dispatch(signOut());
  }
});

registerSW({
  onOfflineReady() {},
  immediate: true,
});
