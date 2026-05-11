import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearTipoDto } from './dto/tipo.dto';

@Injectable()
export class TipoService {
  constructor(private prisma: PrismaService) {}

  // CREAR TIPO
  async crear(dto: CrearTipoDto) {
    const tipo = await this.prisma.tipo.create({
      data: { nombre: dto.nombre, activo: dto.activo }
    });
    return { mensaje: 'Tipo creado', tipo };
  }

  async obtenerTodos() {
    return await this.prisma.tipo.findMany({
      where: { activo: true }
    });
  }
}