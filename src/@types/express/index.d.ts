import type { UserDB } from "../../../generated/prisma";

declare global {
   namespace Express {
      export interface Request {
         user?: UserDB;
      }
   }
}