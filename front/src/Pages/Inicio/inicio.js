async function cargarProductos() {
  const respuesta = await fetch('http://localhost:3000/productos');
  const productos = await respuesta.json();

  const contenedor = document.getElementById('productos');

  productos.forEach(producto => {
    contenedor.innerHTML += `
      <div>
        <h2>${producto.nombre}</h2>
        <p>${producto.descripcion}</p>
        <p>Precio: $${producto.precio}</p>
        <p>Stock: ${producto.stock}</p>
        <p>Género: ${producto.genero}</p>
        <p>Marca: ${producto.marca.nombre}</p>
        <p>Tipo: ${producto.tipo.nombre}</p>
        ${producto.imagenes.length > 0 
          ? `<img src="http://localhost:3000${producto.imagenes[0].url}" width="200"/>` 
          : '<p>Sin imagen</p>'}
        <hr>
      </div>
    `;
  });
}

cargarProductos();