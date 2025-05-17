import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor(
      private jwtService: JwtService,
      private prismaService: PrismaService,
   ) {}

   async login(login: LoginDto) {
      const user = await this.prismaService.userDB.findUnique({
         where: {
            email: login.email,
         },
      });

      if (!user) {
         throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(login.password, user.password);

      if (!isPasswordValid) {
         throw new UnauthorizedException('Invalid credentials');
      }

      const token = this.jwtService.sign({
         email: user.email,
         name: user.name,
         role: user.role,
         sub: user.id,
      });

      return { access_token: token };
   }
}
