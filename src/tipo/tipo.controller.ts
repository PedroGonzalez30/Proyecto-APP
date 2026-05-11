import { Controller, Get, Post, Body } from '@nestjs/common';
import { TipoService } from './tipo.service';
import { CrearTipoDto } from './dto/tipo.dto';

@Controller('tipo')
export class TipoController {
  constructor(private tipoService: TipoService) {}

  @Post()
  crear(@Body() dto: CrearTipoDto) {
    return this.tipoService.crear(dto);
  }

  @Get()
  obtenerTodos() {
    return this.tipoService.obtenerTodos();
  }
}