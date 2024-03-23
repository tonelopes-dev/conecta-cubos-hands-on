import { Controller, Get } from '@nestjs/common';
import { GitHubBotService } from './github-bot.service';

@Controller('github-bot')
export class GitHubController {
  constructor(private readonly githubBotService: GitHubBotService) {}

  org = 'conecta-test';
  tag = 'meet';
  token = process.env.GITHUB_TOKEN;

  @Get()
  search() {
    return this.githubBotService.searchTagInOrganizationRepos(
      this.org,
      this.tag,
      this.token,
    );
  }
}
