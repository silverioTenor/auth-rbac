import { Roles } from "../../../generated/prisma";

export interface RegisterDto {
   name: string;
   email: string;
   password: string;
   role?: Roles;
}