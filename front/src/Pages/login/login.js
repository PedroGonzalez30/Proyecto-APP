async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const respuesta = await fetch('http://localhost:3000/usuarios/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const datos = await respuesta.json();
  document.getElementById('mensaje').textContent = datos.mensaje;
}