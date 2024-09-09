import { z } from "zod";

import { CreateUserSchema, SignInSchema, UpdateUserSchema } from "@/schemas";
export type SidebarLinkType = {
  id: number;
  title: string;
  path: string;
  icon: React.ElementType;
};
export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
};
export type SignInSchemaType = z.infer<typeof SignInSchema>;
export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
