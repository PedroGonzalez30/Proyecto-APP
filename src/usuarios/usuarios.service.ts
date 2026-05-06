import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegistrarDto, LoginDto } from './DTOs/usuarios.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
    constructor(private prisma: PrismaService) {}

    async registrar(dto: RegistrarDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const usuario = await this.prisma.usuario.create({
            data: {
                nombre: dto.nombre,
                email: dto.email,
                password: hashedPassword,
            },
        });
        const { password, ...usuarioSinPassword } = usuario;
        return { mensaje: "Usuario registrado exitosamente", usuario: usuarioSinPassword };
    }

    //async login(dto: LoginDto) {
      //  const usuario = await this.prisma.usuario.findUnique({
        //    where: { email: dto.email },
        //}); 

    //    if (!usuario) {
    //        return { mensaje: "credenciales incorrectas" };
    //    }

    //    const passwordValido = await bcrypt.compare(dto.password, usuario.password);

    //   if (!passwordValido) {
    //        return { mensaje: "credenciales incorrectas" };
    //    }
    //    const { password, ...usuarioSinPassword } = usuario;
    //    return { mensaje: "Login exitoso", usuario };
    //}
}

