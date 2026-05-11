import { Controller, Get, Post, Body } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CrearMarcaDto } from './dto/marca.dto';

@Controller('marca')
export class MarcaController {
  constructor(private marcaService: MarcaService) {}

  @Post()
  crear(@Body() dto: CrearMarcaDto) {
    return this.marcaService.crear(dto);
  }

  @Get()
  obtenerTodas() {
    return this.marcaService.obtenerTodas();
  }
}