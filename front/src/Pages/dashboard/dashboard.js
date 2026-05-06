function verUsuarios() {}
function verVentas() {}
function verInventario() {}
function verHistorial() {}

function cerrarSesion() {
    localStorage.clear();
    window.location.href = '../login/login.html';
}