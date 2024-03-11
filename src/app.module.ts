import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiManagerModule } from './modules/api-manager/api-manager.module';
//import { APP_GUARD } from '@nestjs/core';
//import { RolesGuard } from './auth/roles.guard';
import { AuthMiddleware } from './auth/auth.middleware';
import { PrismaService } from './providers/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    ApiManagerModule,
  ],
  controllers: [AppController],
  providers: [
    PrismaService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
