import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GitHubBotService } from './github-bot.service';
import { GitHubController } from './github-bot.controller';

@Module({
  controllers: [GitHubController],
  imports: [HttpModule],
  providers: [GitHubBotService],
})
export class GithubBotModule {}
