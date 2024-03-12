import { Module } from '@nestjs/common';
import { AuthController } from './auth-github.controller';
import { GithubStrategy } from './strategy/github.strategy';

@Module({
  controllers: [AuthController],
  providers: [GithubStrategy],
})
export class AuthGihubModule {}
