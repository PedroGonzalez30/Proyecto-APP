import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CrearProductoDto } from './dtos/producto.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';

@Controller('productos')
export class ProductosController {
  constructor(private productosService: ProductosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './imagenes', 
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + extname(file.originalname);
        cb(null, uniqueName);
      }
    })
  }))
  crear(
    @Body() dto: CrearProductoDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.productosService.crear(dto, file);
  }
  

  @Get()
  obtenerTodos() {
    return this.productosService.obtenerTodos();
  }
}