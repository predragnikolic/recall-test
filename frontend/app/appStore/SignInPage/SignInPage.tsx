import { Button, Card, Input } from "@nextui-org/react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { z } from "zod"
import { authClient } from "~/utils/auth/authClient"
import { classNames } from "~/utils/classNames"
import { useZodForm } from "~/utils/useZodForm"
import AutoAnimateHeight from "react-auto-animate-height"

export default function SignInPage() {
  const [tab, setTab] = useState<"SIGN_IN" | "SIGN_UP">("SIGN_IN")
  const navigate = useNavigate()

  const signInSchema = z.object({
    email: z.string().email().min(1).trim(),
    password: z.string().min(1),
  })
  const {
    register: signInRegister,
    handleSubmit: handleSignIn,
    formState: signInFormState,
  } = useZodForm({
    schema: signInSchema,
  })

  const signIn = handleSignIn(async (formData) => {
    const { error } = await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    })
    if (error) {
      toast.error(error.message)
      return
    }
    navigate("/")
  })

  const signUpSchema = z
    .object({
      name: z.string().min(1).trim(),
      email: z.string().email().min(1).trim(),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords does not match",
    })
  const {
    register: signUpRegister,
    handleSubmit: handleSignUp,
    formState: signUnFormState,
  } = useZodForm({
    schema: signUpSchema,
  })

  const signUp = handleSignUp(async (formData) => {
    const { error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })
    if (error) {
      toast.error(error.message)
      return
    }
    navigate("/")
  })

  const inactiveTabClasses = "opacity-60 scale-80"
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <p className="text-center text-6xl mb-3">Welcome to our store!</p>
        <p className="text-center mb-9 text-small">Sign in or create an account to get going</p>
        <Card className="p-6 flex flex-col gap-6 w-full max-w-[369px]">
          <div className="flex justify-between">
            <Button
              onClick={() => setTab("SIGN_IN")}
              disableRipple
              className={classNames("text-3xl nice-font font-bold bg-transparent transition-all", tab === "SIGN_UP" && inactiveTabClasses)}
            >
              Sign In
            </Button>
            <Button
              onClick={() => setTab("SIGN_UP")}
              disableRipple
              className={classNames("text-3xl nice-font font-bold bg-transparent transition-all", tab === "SIGN_IN" && inactiveTabClasses)}
            >
              Sign Up
            </Button>
          </div>

          <AutoAnimateHeight ease="ease-in-out">
            {tab === "SIGN_IN" && (
              <form className="contents" onSubmit={signIn}>
                <Input
                  {...signInRegister("email")}
                  isInvalid={Boolean(signInFormState.errors.email?.message)}
                  errorMessage={signInFormState.errors.email?.message}
                  variant="underlined"
                  label="Email"
                />
                <Input
                  {...signInRegister("password")}
                  isInvalid={Boolean(signInFormState.errors.password?.message)}
                  errorMessage={signInFormState.errors.password?.message}
                  variant="underlined"
                  label="Password"
                  type="password"
                />

                <Button type="submit" color="primary" className="uppercase font-bold nice-font mt-6 w-full tracking-widest">
                  Sign in
                </Button>
              </form>
            )}

            {tab === "SIGN_UP" && (
              <form className="contents" onSubmit={signUp}>
                <Input
                  {...signUpRegister("name")}
                  isInvalid={Boolean(signUnFormState.errors.name?.message)}
                  errorMessage={signUnFormState.errors.name?.message}
                  variant="underlined"
                  label="Name"
                />
                <Input
                  {...signUpRegister("email")}
                  isInvalid={Boolean(signUnFormState.errors.email?.message)}
                  errorMessage={signUnFormState.errors.email?.message}
                  variant="underlined"
                  label="Email"
                />
                <Input
                  {...signUpRegister("password")}
                  isInvalid={Boolean(signUnFormState.errors.password?.message)}
                  errorMessage={signUnFormState.errors.password?.message}
                  variant="underlined"
                  label="Password"
                  type="password"
                />
                <Input
                  {...signUpRegister("confirmPassword")}
                  isInvalid={Boolean(signUnFormState.errors.confirmPassword?.message)}
                  errorMessage={signUnFormState.errors.confirmPassword?.message}
                  variant="underlined"
                  label="Confirm Password"
                  type="password"
                />

                <Button type="submit" color="primary" className="uppercase font-bold nice-font mt-6 w-full tracking-widest">
                  Sign up
                </Button>
              </form>
            )}
          </AutoAnimateHeight>
        </Card>
      </div>
    </div>
  )
}
