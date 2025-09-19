import { UserRole } from "src/enum/role.enum";

export interface JwtPayload {
    email: string;
    role: UserRole;
  }
  

