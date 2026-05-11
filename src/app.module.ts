import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProductosModule } from './productos/productos.module';
import { MarcaModule } from './marca/marca.module';
import { TipoModule } from './tipo/tipo.module';


@Module({
  imports: [PrismaModule, AuthModule, UsuariosModule, ProductosModule, MarcaModule, TipoModule],
})
export class AppModule {}