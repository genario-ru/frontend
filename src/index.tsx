import "./styles/globals.css";
import "@/lib/i18n";

import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { initSentry } from "@/lib/sentry";
import { createQueryClient } from "@/lib/tanstack-query/create-query-client.ts";
import { createRouter } from "@/lib/tanstack-router/create-router.ts";
import { reportWebVitals } from "@/shared/utils/report-web-vitals.ts";

function mount() {
  const queryClient = createQueryClient();
  const router = createRouter({ queryClient });

  initSentry(router);

  const rootElement = document.getElementById("root");

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
    handleRedirects: true,
    wrapQueryClient: false,
  });

  if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider disableTransitionOnChange attribute="class">
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </StrictMode>,
    );
  }

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

mount();
