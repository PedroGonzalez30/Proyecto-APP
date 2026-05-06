async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const respuesta = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const datos = await respuesta.json();
  if (respuesta.ok) {
    localStorage.setItem('accessToken', datos.accessToken);
    localStorage.setItem('refreshToken', datos.refreshToken);
    document.getElementById('mensaje').textContent = 'Login exitoso';
    } else {
      document.getElementById('mensaje').textContent = 'Credenciales incorrectas';
  }
}