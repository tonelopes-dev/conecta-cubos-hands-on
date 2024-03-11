import axios from 'axios';
import { Strategy } from 'passport-github';
import { Injectable } from '@nestjs/common';
import { ProfileDTO } from '../dto/profile.dto';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: ['read:user'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: ProfileDTO,
    done: any,
  ): Promise<any> {
    const { id, displayName, emails } = profile;

    // Busca os repositórios do GitHub
    const githubApiUrl = 'https://api.github.com/user/repos';
    let repos = [];
    try {
      const response = await axios.get(githubApiUrl, {
        headers: { Authorization: `token ${accessToken}` },
      });
      repos = response.data; // Array de repositórios
    } catch (error) {
      console.error('Erro ao buscar repositórios do GitHub', error);
      // Trate o erro conforme necessário
    }

    const user = {
      id,
      displayName,
      email: emails[0].value,
      accessToken,
      repos, // Adiciona os repositórios ao objeto do usuário
    };

    done(null, user);
  }
}
