async function crearTipo() {
  const nombre = document.getElementById('nombre').value;

  const respuesta = await fetch('http://localhost:3000/tipo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre })
  });

  const datos = await respuesta.json();

  if (respuesta.ok) {
    document.getElementById('mensaje').textContent = 'Tipo creado exitosamente';
    document.getElementById('nombre').value = '';
  } else {
    document.getElementById('mensaje').textContent = 'Error al crear el tipo';
  }
}