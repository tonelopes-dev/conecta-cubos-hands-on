import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'Bem vindos ao Projeto Conecta Cubos',
      description:
        'Com o intuito de facilitar a concretização desse propósito, este projeto busca apresentar uma plataforma inovadora. Essa plataforma fornecerá aos alunos os meios necessários para criar, gerenciar e divulgar seus eventos de forma eficiente, ampliando assim a amplitude e o impacto das iniciativas desenvolvidas pela nossa comunidade acadêmica.',
    };
  }
}
