import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Roles, UserDB } from '../../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';

type IAuthData = {
   name: string;
   email: string;
   role: Roles;
   sub: string;
};

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(
      private readonly jwtService: JwtService,
      private prismaService: PrismaService,
   ) {}

   async canActivate(context: ExecutionContext): Promise<boolean>{
      const request: Request = context.switchToHttp().getRequest();
      const token = request.headers['authorization']?.split(' ')[1];

      if (!token) {
         throw new UnauthorizedException('No token provided');
      }

      const algorithms = (process.env.JWT_ALGORITHM ?? 'HS256') as any;

      try {
         const payload = this.jwtService.verify<IAuthData>(token, { algorithms: [algorithms] });

         const user = await this.prismaService.userDB.findUnique({
            where: { id: payload.sub },
         });

         if (!user) {
            throw new UnauthorizedException('User not found');
         }
         request.user = user;
      } catch (e) {
         throw new UnauthorizedException('Invalid token', { cause: e });
      }

      return true;
   }
}
