import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegistrarDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(3, { message: 'El nombre debe tener minimo 3 caracteres' })
  nombre!: string;

  @IsEmail({}, { message: 'El email no tiene un formato valido' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener minimo 6 caracteres' })
  password!: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'El email no tiene un formato valido' })
  email!: string;

  @IsString()
  password!: string;
}