import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiManagerModule } from './modules/api-manager/api-manager.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from './auth/auth-jwt/auth.middleware';
import { PrismaService } from './providers/prisma.service';
import { JwtModule } from '@nestjs/jwt';

import { AuthGihubModule } from './auth/github/auth-github.module';

//import { APP_GUARD } from '@nestjs/core';
//import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    ApiManagerModule,
    ApiManagerModule,
    AuthGihubModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
