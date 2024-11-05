import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, prefix, route } from "@react-router/dev/routes";

export const routes: RouteConfig = [
  route("/sign-in", "./appStore/SignInPage/SignInPage.tsx"),
  layout("./appStore/layout.tsx", [
    index("./home.tsx"),
  ]),

  ...prefix("admin", [
      index("./appAdmin/AdminHomePage/AdminHomePage.tsx"),
      route("/sign-in", "./appAdmin/AdminSignInPage/AdminSignInPage.tsx"),
  ]),
];
