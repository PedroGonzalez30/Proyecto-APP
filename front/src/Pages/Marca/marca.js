async function crearMarca() {
  const nombre = document.getElementById('nombre').value;

  const respuesta = await fetch('http://localhost:3000/marca', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre })
  });

  const datos = await respuesta.json();

  if (respuesta.ok) {
    document.getElementById('mensaje').textContent = 'Marca creada exitosamente';
    document.getElementById('nombre').value = '';
  } else {
    const datos = await respuesta.json();
    console.log(datos);
    document.getElementById('mensaje').textContent = 'Error al crear la marca';
  }
}