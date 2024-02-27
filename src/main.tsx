import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import { ProviderTheme } from "./theme/providerTheme.tsx";
import FlutterJsChannel from "./utils/jsChannel.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <ProviderTheme>
    <RouterProvider router={router} />
    <FlutterJsChannel />
  </ProviderTheme>
  //</React.StrictMode>
);
