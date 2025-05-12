import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
   imports: [
      JwtModule.register({
         secret: process.env.JWT_SECRET,
         signOptions: {
            expiresIn: process.env.JWT_EXPIRES_IN,
            algorithm: (process.env.JWT_ALGORITHM ?? 'HS256') as any,
         },
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService],
})
export class AuthModule {}
