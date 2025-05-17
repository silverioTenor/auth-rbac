import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register-dto';

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

   async register(registerDto: RegisterDto) {
      if (registerDto?.role !== 'ADMIN') {
         registerDto.role = 'ADMIN';
      }

      return this.prismaService.userDB.create({
         data: {
            ...registerDto,
            password: bcrypt.hashSync(registerDto.password, 10),
         },
      });
   }
}
