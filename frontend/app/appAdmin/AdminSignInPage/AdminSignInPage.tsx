import { Button, Card, Input } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";
import { authClient } from "~/utils/auth/authClient";
import { useZodForm } from "~/utils/useZodForm";

export default function SignInPage() {
    const navigate = useNavigate();

    const signInSchema = z.object({
        email: z.string().email().min(1).trim(),
        password: z.string().min(1),
    });
    const {
        register,
        handleSubmit,
        formState,
    } = useZodForm({
        schema: signInSchema,
    });

    const signIn = handleSubmit(async (formData) => {
        const { error } = await authClient.signIn.email({
            email: formData.email,
            password: formData.password,
        });
        if (error) {
            toast.error(error.message)
            return;
        }
        navigate("/admin");
    });

    return (
        <div className="h-[100vh] w-full flex justify-center items-center dark">
            <div className="flex flex-col items-center">
                <p className="text-center text-6xl mb-3">Store Admin</p>
                <p className="text-center mb-9 text-small uppercase tracking-widest text-small">
                    books matter
                </p>
                <Card className="p-6 flex flex-col gap-6 w-full max-w-[369px]">
                    <div className="flex justify-between">
                        <h1 className="text-3xl nice-font font-bold bg-transparent transition-all">
                            Sign In
                        </h1>
                    </div>

                    <form className="contents" onSubmit={signIn}>
                        <Input
                            {...register("email")}
                            isInvalid={Boolean(formState.errors.email?.message)}
                            errorMessage={formState.errors.email?.message}
                            variant="underlined"
                            label="Email"
                        />
                        <Input
                            {...register("password")}
                            isInvalid={Boolean(formState.errors.password?.message)}
                            errorMessage={formState.errors.password?.message}
                            variant="underlined"
                            label="Password"
                            type="password"
                        />

                        <Button
                            type="submit"
                            color="primary"
                            className="uppercase font-bold nice-font tracking-widest"
                        >
                            Sign in
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
}