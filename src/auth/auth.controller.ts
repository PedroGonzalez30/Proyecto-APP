import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { JwtPayload, JwtPayloadWithRefreshToken } from './types/jwt-payload.type';
import { LoginDto } from 'src/usuarios/DTOs/usuarios.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


 @HttpCode(HttpStatus.OK)
  @Post('login')
    login(@Body() dto: LoginDto ) {
    return this.authService.login(dto.email, dto.password);
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Req() req: Request & { user: JwtPayloadWithRefreshToken }) {
    return this.authService.refreshTokens(req.user.sub, req.user.refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Req() req: Request & { user: JwtPayload }) {
    return this.authService.logout(req.user.sub);
  }
}