import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createHash, randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  
  // GENERAR TOKENS
  private async getTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ ...payload, jti: randomUUID() }, {
        secret: process.env.JWT_ACCESS_SECRET!,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync({ ...payload, jti: randomUUID() }, {
        secret: process.env.JWT_REFRESH_SECRET!,
        expiresIn: '7d',
      }),
    ]);
    return { accessToken, refreshToken };
  }

  // GUARDAR HASH DEL REFRESH TOKEN
  private hashRefreshToken(refreshToken: string) {
    return createHash('sha256').update(refreshToken).digest('hex');
  }

  private async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const refreshTokenHash = this.hashRefreshToken(refreshToken);
    await this.prisma.usuario.update({
      where: { id: userId },
      data: { refreshTokenHash },
    });
  }

     async login(email: string, password: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const tokens = await this.getTokens({ sub: usuario.id, email: usuario.email });
    await this.updateRefreshTokenHash(usuario.id, tokens.refreshToken);

    const { password: _, ...usuarioSinPassword } = usuario;
    return { usuario: usuarioSinPassword, ...tokens };
  }

  // LOGOUT
  async logout(userId: number) {
    await this.prisma.usuario.update({
      where: { id: userId },
      data: { refreshTokenHash: null },
    });
    return { mensaje: 'Sesion cerrada' };
  }

  // RENOVAR TOKENS
  async refreshTokens(userId: number, refreshToken: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!usuario?.refreshTokenHash) {
      throw new UnauthorizedException('Refresh token invalido');
    }

    const refreshTokenMatches =
      this.hashRefreshToken(refreshToken) === usuario.refreshTokenHash;

    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Refresh token invalido');
    }

    const tokens = await this.getTokens({ sub: usuario.id, email: usuario.email });
    await this.updateRefreshTokenHash(usuario.id, tokens.refreshToken);
    return tokens;
  }
}