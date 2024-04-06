import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

interface Repository {
  name: string;
  html_url: string;
  tags_url?: string;
}

@Injectable()
export class GitHubBotService {
  constructor(private readonly httpService: HttpService) {}

  private async getRepositories(
    org: string,
    token: string,
  ): Promise<Repository[]> {
    const url = `https://api.github.com/orgs/${org}/repos`;
    const headers = {
      Authorization: `token ${token}`,
    };

    try {
      const response = await this.httpService.axiosRef.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching repositories:',
        error.message, //error.response?.data ||
      );
      return [];
    }
  }

  private async findTagInRepositories(
    org: string,
    tag: string,
    token: string,
  ): Promise<string[]> {
    const repositories = await this.getRepositories(org, token);
    const foundRepositories: Repository[] = [];
    const readMes: string[] = [];

    for (const repository of repositories) {
      const tagsUrl = repository.tags_url.replace('{/sha}', '');
      const headers = {
        Authorization: `token ${token}`,
      };

      const response: AxiosResponse<any> = await this.httpService.axiosRef.get(
        tagsUrl,
        {
          headers,
        },
      );

      const hasTag = response.data.some(
        (tagObject: any) => tagObject.name === tag,
      );

      if (hasTag) {
        //console.log(repository);
        foundRepositories.push({
          name: repository.name,
          html_url: repository.html_url,
        });
      }

      for (const repo of foundRepositories) {
        try {
          //const url = `https://raw.githubusercontent.com/conecta-test/${repo.name}/main/README.md`;
          const url = `https://api.github.com/repos/conecta-test/${repo.name}/contents/README.md`;

          console.log('Link:', url);
          const response: AxiosResponse<any> =
            await this.httpService.axiosRef.get(url, {
              headers,
            });
          console.log('Response data:', response.data);
          const readmeContent: string = Buffer.from(
            response.data.content,
            'base64',
          ).toString('utf-8');
          console.log('README:', readmeContent);
          const meet = JSON.parse(readmeContent);
          console.log('Meet:', meet);

          readMes.push(meet);
        } catch (error) {
          console.error(
            'Error fetching README content:',
            error.message,
            // error.response?.data || ,
          );
        }
      }
    }

    return readMes;
  }

  searchTagInOrganizationRepos(
    org: string,
    tag: string,
    token: string,
  ): Observable<string[]> {
    tag = tag.toLowerCase();
    org = org.toLowerCase();

    return new Observable((observer) => {
      this.findTagInRepositories(org, tag, token)
        .then((foundRepositories) => {
          observer.next(foundRepositories);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
