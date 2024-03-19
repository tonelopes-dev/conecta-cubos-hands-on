import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GithubStrategy } from './strategy/github.strategy';
import { AuthController } from './auth-github.controller';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    // ou a estratégia que você estiver usando
  ],
  controllers: [AuthController],
  providers: [GithubStrategy], // Inclua sua estratégia como um provider
})
export class AuthGihubModule {}
