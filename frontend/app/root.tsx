import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { LinksFunction } from "react-router";
import {NextUIProvider} from "@nextui-org/react";
import { ToastContainer } from "./components/ToastContainer/ToastContainer";
import { ProvideReactQuery } from "./utils/ProvideTenstackQuery";
import "./app.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Gilda+Display&family=Jura:wght@300..700&family=Noto+Serif+Display:ital,wght@0,100..900;1,100..900&family=Yeseva+One&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
        <ProvideReactQuery>
          <ToastContainer />
          {children}
          <ScrollRestoration />
          <Scripts />
          </ProvideReactQuery>
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
