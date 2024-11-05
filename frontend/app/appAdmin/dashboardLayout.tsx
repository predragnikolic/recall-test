import { Outlet, redirect } from "react-router";
import { Sidebar } from "./Sidebar";
import './dashboard.css'
import { authClient } from "~/utils/auth/authClient";
import type * as Route from "../appAdmin/+types.dashboardLayout";

export async function loader({ request }: Route.LoaderArgs) {
  const session =  await authClient.getSession({}, {
    headers: request.headers
  })
  if (!session.data) throw redirect('/admin/sign-in')
  return {user: session.data.user}
}


export default function Layout({loaderData}: Route.ComponentProps) {
  return <div className="dark">
      <section className="app-grid">
        <main className="app-grid_main">
          <Outlet />
        </main>
        <Sidebar user={loaderData.user} className={"app-grid_sidebar open"} />
      </section>
  </div>
}
