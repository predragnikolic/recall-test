import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, prefix, route } from "@react-router/dev/routes";

export const routes: RouteConfig = [
  route("/sign-in", "./appStore/SignInPage/SignInPage.tsx"),
  layout("./appStore/layout.tsx", [
    index("./home.tsx"),
  ]),

  ...prefix("admin", [
      route("/sign-in", "./appAdmin/AdminSignInPage/AdminSignInPage.tsx"),
      layout("./appAdmin/dashboardLayout.tsx", [
        index("./appAdmin/AdminHomePage/AdminHomePage.tsx"),
        route("/dashboard/orders", "./appAdmin/OrdersPage/OrdersPage.tsx"),
        route("/dashboard/books", "./appAdmin/AdminBooksPage/AdminBooksPage.tsx"),
      ])
  ]),
];
