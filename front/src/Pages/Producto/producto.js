// Cargar marcas y tipos al abrir la página
async function cargarMarcas() {
  const respuesta = await fetch('http://localhost:3000/marca');
  const marcas = await respuesta.json();

  const select = document.getElementById('marca');
  marcas.forEach(marca => {
    const option = document.createElement('option');
    option.value = marca.idMarca;
    option.textContent = marca.nombre;
    select.appendChild(option);
  });
}

async function cargarTipos() {
  const respuesta = await fetch('http://localhost:3000/tipo');
  const tipos = await respuesta.json();

  const select = document.getElementById('tipo');
  tipos.forEach(tipo => {
    const option = document.createElement('option');
    option.value = tipo.idTipo;
    option.textContent = tipo.nombre;
    select.appendChild(option);
  });
}

async function crearProducto() {
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const precio = parseFloat(document.getElementById('precio').value);
  const stock = parseInt(document.getElementById('stock').value);
  const genero = document.getElementById('genero').value;
  const IdMarca = parseInt(document.getElementById('marca').value);
  const IdTipo = parseInt(document.getElementById('tipo').value);
    const imagen = document.getElementById('imagen').files[0];


    // FormData permite mandar archivos e datos juntos
  const formData = new FormData();
  formData.append('nombre', nombre);
  formData.append('descripcion', descripcion);
  formData.append('precio', precio);
  formData.append('stock', stock);
  formData.append('genero', genero);
  formData.append('IdMarca', IdMarca);
  formData.append('IdTipo', IdTipo);
  if (imagen) formData.append('imagen', imagen);


  const respuesta = await fetch('http://localhost:3000/productos', {
    method: 'POST',
     body: formData
  });

  const datos = await respuesta.json();

  if (respuesta.ok) {
    document.getElementById('mensaje').textContent = 'Producto creado exitosamente';
  } else {
    document.getElementById('mensaje').textContent = 'Error al crear el producto';
  }
}

// Cargar al abrir la pagina
cargarMarcas();
cargarTipos();