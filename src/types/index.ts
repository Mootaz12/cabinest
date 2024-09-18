import { z } from "zod";

import {
  CreateCabinSchema,
  CreateUserSchema,
  SignInSchema,
  UpdateCabinSchema,
  UpdateUserSchema,
} from "@/schemas";
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
  imageUrl: string;
};
export type Cabin = {
  cabinId: number;
  cabinName: string;
  maxCapacity: number;
  price: number;
  discount: number;
  imageUrl: string;
  description: string;
};

export type Booking = {
  booking: string;
};
export type SignInSchemaType = z.infer<typeof SignInSchema>;
export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;
export type CreateCabinSchemaType = z.infer<typeof CreateCabinSchema>;
export type UpdateCabinSchemaType = z.infer<typeof UpdateCabinSchema>;
