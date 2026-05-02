import { Controller, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { LoginDto, RegistrarDto } from './DTOs/usuarios.dto';

@Controller('usuarios')
export class UsuariosController {

    constructor(private usuariosService: UsuariosService) {}

    @Post('registrar')
    registrar(@Body() dto: RegistrarDto){
        return this.usuariosService.registrar(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.usuariosService.login(dto);
    }
}
