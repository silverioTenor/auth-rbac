import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
   constructor(private prismaService: PrismaService) {}

   async create(createPostDto: CreatePostDto & { authorId: string }) {
      return this.prismaService.postDB.create({
         data: createPostDto,
      });
   }

   async findAll() {
      return this.prismaService.postDB.findMany();
   }

   async findOne(id: string) {
      const post = this.prismaService.postDB.findUnique({
         where: { id },
      });

      if (!post) {
         throw new NotFoundException('Post not found');
      }

      return post;
   }

   async update(id: string, updatePostDto: UpdatePostDto) {
      const post = this.prismaService.postDB.findUnique({
        where: { id },
      });

      if (!post) {
         throw new NotFoundException('Post not found');
      }

      return this.prismaService.postDB.update({
         where: { id },
         data: updatePostDto,
      });
   }

   async remove(id: string) {
      return this.prismaService.postDB.delete({
         where: { id },
      });
   }
}
