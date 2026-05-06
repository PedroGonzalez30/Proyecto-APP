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
    localStorage.setItem('usuario', JSON.stringify(datos.usuario));

    if (datos.usuario.rol === 'ADMIN') {
      window.location.href = '../dashboard/dashboard.html';
    } else {
      document.getElementById('mensaje').textContent = 'Login exitoso';
    }
  } else {
    document.getElementById('mensaje').textContent = 'Email o contraseña incorrectos';
  }
}