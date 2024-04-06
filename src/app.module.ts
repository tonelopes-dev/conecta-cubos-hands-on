import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiManagerModule } from './modules/api-manager/api-manager.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from './auth/auth-jwt/auth.middleware';
import { PrismaService } from './providers/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ApiAdminModule } from './modules/api-admin/api-admin.module';
import { ApiManagerController } from './modules/api-manager/api-manager.controller';
import { ApiAdminController } from './modules/api-admin/api-admin.controller';
import { GithubBotModule } from './modules/github-bot/github-bot.module';
import { AuthGihubModule } from './auth/github/auth-github.module';
import { ApiLectureModule } from './modules/api-lecture/api-lecture.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    ApiManagerModule,
    ApiAdminModule,
    GithubBotModule,

    AuthGihubModule,

    ApiLectureModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ApiManagerController, ApiAdminController);
  }
}
