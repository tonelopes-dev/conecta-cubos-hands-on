import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  // Rota para iniciar o processo de autenticação com o GitHub
  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubAuth() {
    // NestJS delega para o AuthGuard('github'), não é necessário implementar nada aqui
  }

  // Rota de callback após a autenticação com o GitHub
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req, @Res() res: Response) {
    // Aqui você pode extrair o usuário do req.user e criar sua lógica de sessão/cookie
    // res.redirect('/caminho-de-redirecionamento');
  }
}
