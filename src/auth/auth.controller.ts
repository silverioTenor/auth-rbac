import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('signin')
   login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
   }

   @Post('signup')
   register(@Body() registerDto: RegisterDto) {
      return this.authService.register(registerDto);
   }
}
