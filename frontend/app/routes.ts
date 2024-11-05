import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, prefix, route } from "@react-router/dev/routes";

export const routes: RouteConfig = [
  layout("./storeApp/layout.tsx", [
    index("./home.tsx"),
  ]),

  ...prefix("admin", [
      index("./adminApp/home.tsx"),
  ]),
];
