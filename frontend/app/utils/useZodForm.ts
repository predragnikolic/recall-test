import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, UseFormProps, UseFormReturn, useForm } from "react-hook-form"
import { ZodSchema, z } from "zod"

export function useZodForm<
  ZS extends ZodSchema = ZodSchema,
  TFieldValues extends FieldValues = z.infer<ZS>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>({
  schema,
  ...props
}: NoInfer<UseFormProps<TFieldValues, TContext>> & { schema: ZS }): UseFormReturn<
  TFieldValues,
  TContext,
  TTransformedValues
> {
  return useForm({
    resolver: zodResolver(schema),
    ...props,
  })
}
