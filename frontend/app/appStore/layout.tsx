import { Link, redirect } from "react-router"
import type * as Route from "./+types.layout"
import { authClient } from "~/utils/auth/authClient"

export async function loader({ request }: Route.LoaderArgs) {
  const session = await authClient.getSession(
    {},
    {
      headers: request.headers,
    },
  )
  if (!session.data) throw redirect("/sign-in")
  return { user: session.data.user }
}

export default function Layout({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <p className="text-6xl">Welcome {user.name}</p>
      <p>Don't have high hopes</p>
      <p>
        There is no store yet, but there is an{" "}
        <Link to={"/admin"} className="underline">
          admin app
        </Link>
      </p>
      <p>... that is also not finished</p>
    </div>
  )
}
