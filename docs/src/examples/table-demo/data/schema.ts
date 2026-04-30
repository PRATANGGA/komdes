import { z } from 'zod';

const userStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
]);
export type UserStatus = z.infer<typeof userStatusSchema>;

const userRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
]);

export const _userSchema = z.object({
  createdAt: z.coerce.date(),
  email: z.string(),
  firstName: z.string(),
  id: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  role: userRoleSchema,
  status: userStatusSchema,
  updatedAt: z.coerce.date(),
  username: z.string(),
});
export type User = z.infer<typeof _userSchema>;
