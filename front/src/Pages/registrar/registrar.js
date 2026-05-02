async function registrar() {
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const respuesta = await fetch('http://localhost:3000/usuarios/registrar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password })
  });

  const datos = await respuesta.json();
  console.log(datos.message);
  document.getElementById('mensaje').textContent = datos.mensaje;
}