function editarPerfil() {
    document.getElementById("nombreInput").value = document.getElementById("nombre").innerText;
    document.getElementById("emailInput").value = document.getElementById("email").innerText;
    document.getElementById("nombreInput").removeAttribute("disabled");
    document.getElementById("emailInput").removeAttribute("disabled");
}

function guardarCambios() {
    document.getElementById("nombre").innerText = document.getElementById("nombreInput").value;
    document.getElementById("email").innerText = document.getElementById("emailInput").value;
    document.getElementById("nombreInput").setAttribute("disabled", true);
    document.getElementById("emailInput").setAttribute("disabled", true);
    document.getElementById("nombreInput").value = " ";
    document.getElementById("emailInput").value = " ";
}