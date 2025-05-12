import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

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
         throw new HttpException('Invalid credentials', 400);
      }

      const isPasswordValid = await bcrypt.compare(login.password, user.password);

      if (!isPasswordValid) {
         throw new HttpException('Invalid credentials', 400);
      }

      const token = this.jwtService.sign({
         email: user.email,
         name: user.name,
         role: user.role,
      });

      return { access_token: token };
   }
}
