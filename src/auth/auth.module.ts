import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Role } from '../user/user.types';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,

    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        global: true,

        secret: configService.get<string>('JWT_SECRET'),

        signOptions: {
          expiresIn: '60s',
        },
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthModule,JwtModule]
})
export class AuthModule {}