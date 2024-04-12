function validarRegistro() {
    var usuario = document.getElementById("user").value;
    var email = document.getElementById("email").value;
    var contrasena = document.getElementById("password").value;
    var confirmarContrasena = document.getElementById("confPassword").value;
    var errorMensaje = document.getElementById("errorMensaje");

    errorMensaje.innerHTML = "";

    if (usuario === "" || email === "" || contrasena === "" || confirmarContrasena === "") {
        errorMensaje.innerHTML = "Por favor complete todos los campos.";
        return false;
    }

    if (contrasena !== confirmarContrasena) {
        errorMensaje.innerHTML = "Las contraseñas no coinciden.";
        return false;
    }

    return true;
}
