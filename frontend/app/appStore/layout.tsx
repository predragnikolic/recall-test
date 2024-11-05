import { Outlet, useRevalidator } from "react-router";
import type * as Route from "./+types.layout";
import { authClient } from "~/utils/auth/authClient";

export async function loader({ request }: Route.LoaderArgs) {
  const session =  await authClient.getSession({}, {
    headers: request.headers
  })
  return { user: session.data?.user };
}

export default function Layout({loaderData}: Route.ComponentProps) {
  const revalidator = useRevalidator();

  const {user}= loaderData

  const signUp = async () => {
    try {
       await authClient.signUp.email({
          email: 'idmpepe@gmail.com',
          password: "password123",
          name: 'Predrag Nikolic',

          // crap (on 2 places, look for the same comment) 
          // this is ignored by the "better-auth" because `input: false // don't allow user to set role`` was set on the Backend
          role: 'thisDoesNotMatter'  // TypeScript complains here, TODO see if there is a better way to address this,
        })
       revalidator.revalidate()
    } catch (e) {
      console.error(e)
    }
  }

   const signIn = async () => {
  }

  const signOut = async () => {
    try {
       await authClient.signOut()
       revalidator.revalidate()
    } catch (e) {
      console.error(e)
    }
  }
  return <div>
      {user && <p>{user.name}</p>}
      <button onClick={() => signUp()}>Региструј se </button>
      <button onClick={() => signIn()}>Пријави се </button>
      <button onClick={() => signOut()}>Одјави се </button>
      <p>Store</p>
      {}
      <Outlet/>
  </div>
}
