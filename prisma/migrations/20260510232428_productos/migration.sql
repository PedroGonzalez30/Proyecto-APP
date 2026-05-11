-- CreateTable
CREATE TABLE "Producto" (
    "idProducto" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "IdMarca" INTEGER NOT NULL,
    "IdTipo" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("idProducto")
);

-- CreateTable
CREATE TABLE "Marca" (
    "idMarca" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("idMarca")
);

-- CreateTable
CREATE TABLE "Tipo" (
    "idTipo" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Tipo_pkey" PRIMARY KEY ("idTipo")
);

-- CreateTable
CREATE TABLE "Imagen" (
    "idImagen" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "idProducto" INTEGER NOT NULL,

    CONSTRAINT "Imagen_pkey" PRIMARY KEY ("idImagen")
);

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_IdMarca_fkey" FOREIGN KEY ("IdMarca") REFERENCES "Marca"("idMarca") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_IdTipo_fkey" FOREIGN KEY ("IdTipo") REFERENCES "Tipo"("idTipo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagen" ADD CONSTRAINT "Imagen_idProducto_fkey" FOREIGN KEY ("idProducto") REFERENCES "Producto"("idProducto") ON DELETE RESTRICT ON UPDATE CASCADE;
