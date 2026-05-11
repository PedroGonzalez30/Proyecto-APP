import { IsString, IsNumber, IsBoolean, IsOptional, Min, MinLength, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';

export class CrearProductoDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @MinLength(3, { message: 'El nombre debe tener minimo 3 caracteres' })
  nombre!: string;

  @IsString({ message: 'La descripcion debe ser texto' })
  descripcion!: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'El precio debe ser un numero' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  precio!: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'El stock debe ser un numero' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock!: number;

  @IsIn(['HOMBRE', 'MUJER', 'UNISEX'], { message: 'El género debe ser HOMBRE, MUJER o UNISEX' })
  genero!: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'El id de marca debe ser un numero' })
  IdMarca!: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, { message: 'El id de tipo debe ser un numero' })
  IdTipo!: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}