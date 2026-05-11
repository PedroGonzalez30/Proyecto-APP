function verUsuarios() {}
function verVentas() {}
function verInventario() {}
function verHistorial() {}

function irA(pagina) {
  window.location.href = `../${pagina}/${pagina}.html`;
}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = '../login/login.html';
}