import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('post')
export class PostController {
   constructor(private readonly postService: PostService) {}

   @Post('create')
   create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
      return this.postService.create({
         ...createPostDto,
         authorId: req.user!.id,
      });
   }

   @Get()
   findAll() {
      return this.postService.findAll();
   }

   @Get(':id')
   findOne(@Param('id') id: string) {
      return this.postService.findOne(id);
   }

   @Patch(':id')
   update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
      return this.postService.update(id, updatePostDto);
   }

   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.postService.remove(id);
   }
}
