import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Global } from "@emotion/react";
import router from "./router/index.tsx";
import { ProviderTheme } from "./theme/providerTheme.tsx";
import { globalStyles } from "./styles/globalStyles.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProviderTheme>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </ProviderTheme>
  </React.StrictMode>
);
