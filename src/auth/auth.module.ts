import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './strategy/github.strategy';

@Module({
  controllers: [AuthController],
  providers: [GithubStrategy],
})
export class AuthModule {}
