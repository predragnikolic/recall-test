import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import './dashboard.css'

export default function Layout() {
  return <div className="dark">
      <section className="app-grid">
        <main className="app-grid_main">
          <Outlet />
        </main>
        <Sidebar className={"app-grid_sidebar open"} />
      </section>
  </div>
}
