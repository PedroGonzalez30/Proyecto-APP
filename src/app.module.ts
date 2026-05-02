import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';


@Module({
  imports: [PrismaModule, AuthModule, UsuariosModule],
})
export class AppModule {}