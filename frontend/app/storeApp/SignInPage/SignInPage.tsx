import { Button, Card, Divider, Input } from "@nextui-org/react";
import { useState } from "react";
import { classNames } from "~/utils/classNames";

export default function SignInPage() {
  const [tab, setTab] = useState<'SIGN_IN' | "SIGN_UP">('SIGN_IN')

  const inactiveTabClasses = 'opacity-60 scale-80'
  return <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <p className="text-center text-6xl mb-3">Welcome to our store!</p>
        <p className="text-center mb-9 text-small">Sign in or create an account to get going</p>
        <Card className="p-6 flex flex-col gap-6 w-full max-w-[369px]">
        <div className="flex justify-between">
          <Button onClick={() => setTab("SIGN_IN")} disableRipple className={classNames("text-3xl nice-font font-bold bg-transparent transition-all", tab === 'SIGN_UP' && inactiveTabClasses)}>
            Sign In
          </Button>
          <Button onClick={() => setTab("SIGN_UP")} disableRipple className={classNames("text-3xl nice-font font-bold bg-transparent transition-all", tab ==='SIGN_IN' && inactiveTabClasses)}>
            Sign Up
          </Button>
        </div>

        {tab === 'SIGN_IN' && <form className="contents">
          <Input variant="underlined" label='Email' isInvalid={false} />
          <Input variant="underlined" label='Password' type="password" isInvalid={false} />

          <Button color="primary" className="uppercase font-bold nice-font tracking-widest">Sign in</Button>
        </form>}

        {tab === 'SIGN_UP' && <form className="contents">
          <Input variant="underlined" label='Name' type="password" isInvalid={false} />
          <Input variant="underlined" label='Email' isInvalid={false} />
          <Input variant="underlined" label='Password' type="password" isInvalid={false} />
          <Input variant="underlined" label='Confirm Password' type="password" isInvalid={false} />

          <Button color="primary" className="uppercase font-bold nice-font tracking-widest">Sign up</Button>
        </form>}
      </Card>
      </div>
  </div>
}
