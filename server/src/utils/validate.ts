import type { z, ZodSchema } from "zod"

export function validate<ZS extends ZodSchema = ZodSchema, Values = z.infer<ZS>>(schema: ZS, value: NoInfer<Values>): Values {
  return schema.parse(value)
}
