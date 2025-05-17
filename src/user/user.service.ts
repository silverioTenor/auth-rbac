import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
   constructor(private readonly prismaService: PrismaService) {}

   async create(createUserDto: CreateUserDto) {
      return this.prismaService.userDB.create({
         data: {
            ...createUserDto,
            password: bcrypt.hashSync(createUserDto.password, 10),
         },
      });
   }

   async findAll() {
      return this.prismaService.userDB.findMany();
   }

   async findOne(id: string) {
      const foundUser = await this.prismaService.userDB.findUnique({
         where: { id },
      });

      if (!foundUser) {
         throw new NotFoundException('User not found');
      }

      // const { password, ...userWithoutPassword } = foundUser;
      // return userWithoutPassword;
      delete (foundUser as any).password;
      return foundUser;
   }

   async update(id: string, updateUserDto: UpdateUserDto) {
      const user = await this.prismaService.userDB.findUnique({
         where: { id },
      });

      if (!user) {
         throw new NotFoundException('User not found');
      }

      const password = updateUserDto.password
         ? bcrypt.hashSync(updateUserDto.password, 10)
         : user.password;

      return this.prismaService.userDB.update({
         where: { id },
         data: {
            ...updateUserDto,
            password,
         },
      });
   }

   async remove(id: string) {
      return this.prismaService.userDB.delete({
         where: { id },
      });
   }
}
