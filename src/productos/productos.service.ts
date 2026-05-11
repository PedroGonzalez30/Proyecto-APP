import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CrearProductoDto } from './dtos/producto.dto';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  async crear(dto: CrearProductoDto,  file: Express.Multer.File) {
    const producto = await this.prisma.producto.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        precio: dto.precio,
        stock: dto.stock,
        genero: dto.genero,
        IdMarca: dto.IdMarca,
        IdTipo: dto.IdTipo,
      },
    });

    //Guardar la imagen en la tabla de imagenes
    if (file) {
        await this.prisma.imagen.create({
            data: {
            url: `/imagenes/${file.filename}`,
            idProducto: producto.idProducto,
            }
        });
        }


    return { mensaje: 'Producto creado', producto };
  }

  async obtenerTodos() {
    return await this.prisma.producto.findMany({
      where: { activo: true },
      include: {
        marca: true,
        tipo: true,
        imagenes: true,
      },
    });
  }
}