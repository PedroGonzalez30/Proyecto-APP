import { IsString, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class CrearTipoDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(2, { message: 'El nombre debe tener minimo 2 caracteres' })
  nombre!: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}