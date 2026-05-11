import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearMarcaDto } from './dto/marca.dto';

@Injectable()
export class MarcaService {
  constructor(private prisma: PrismaService) {}

  async crear(dto: CrearMarcaDto) {
    const marca = await this.prisma.marca.create({
      data: { nombre: dto.nombre  }
    });
    return { mensaje: 'Marca creada', marca };
  }

  async obtenerTodas() {
    return await this.prisma.marca.findMany({
      where: { activo: true }
    });
  }
}