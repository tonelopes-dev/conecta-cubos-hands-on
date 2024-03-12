import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('github')
  @UseGuards(AuthGuard('github'))
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubAuthRedirect(@Req() req) {
    // Aqui você pode extrair o usuário do req.user e criar sua lógica de sessão/cookie
    return { user: req.user };
  }
}
