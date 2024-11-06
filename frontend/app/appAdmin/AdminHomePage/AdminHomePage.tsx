import { authClient } from "~/utils/auth/authClient"
import type * as Route from "./+types.AdminHomePage"
import { redirect } from "react-router"

export async function loader({ request }: Route.LoaderArgs) {
  const session = await authClient.getSession(
    {},
    {
      headers: request.headers,
    },
  )
  if (!session.data) return redirect("/admin/sign-in")
}

export default function AdminHomePage() {
  return <div>AdminHomePage</div>
}
