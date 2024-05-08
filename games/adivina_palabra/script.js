// Arreglo que contiene las palabras para jugar
let arrayPalabras = [
    "GUITARRA",
    "ELEFANTE",
    "TURQUESA",
    "REBECA",
    "TECLADO",
    "INGLATERRA",
    "BALEARES",
    "VENUS",
    "CASTELLON"
];
let ayudas = [
    "Instrumento Musical",
    "Animal de la selva",
    "Es un color",
    "Nombre de mujer",
    "Hardware de computadora",
    "Es un Pais",
    "Son unas islas",
    "Es un planeta",
    "Provincia española"
];
let cantPalabrasJugadas = 0;
let intentosRestantes = 5;
let posActual;
let arrayPalabraActual = [];
let cantidadAcertadas = 0;
let divsPalabraActual = [];
let totalQueDebeAcertar;
let palabraCorrecta = document.getElementById("correcta");

function cargarNuevaPalabra() {
    cantPalabrasJugadas++;
    if (cantPalabrasJugadas > arrayPalabras.length) {
        arrayPalabras = [
            "GUITARRA",
            "ELEFANTE",
            "TURQUESA",
            "REBECA",
            "TECLADO",
            "INGLATERRA",
            "BALEARES",
            "VENUS",
            "CASTELLON"
        ];
        ayudas = [
            "Instrumento Musical",
            "Animal de la selva",
            "Es un color",
            "Nombre de mujer",
            "Hardware de computadora",
            "Es un Pais",
            "Son unas islas",
            "Es un planeta",
            "Provincia española"
        ];
    }
    posActual = Math.floor(Math.random() * arrayPalabras.length);
    let palabra = arrayPalabras[posActual];
    totalQueDebeAcertar = palabra.length;
    cantidadAcertadas = 0;
    arrayPalabraActual = palabra.split('');
    document.getElementById("palabra").innerHTML = "";
    document.getElementById("letrasIngresadas").innerHTML = "";
    for (i = 0; i < palabra.length; i++) {
        var divLetra = document.createElement("div");
        divLetra.className = "letra";
        document.getElementById("palabra").appendChild(divLetra);
    }
    divsPalabraActual = document.getElementsByClassName("letra");
    intentosRestantes = 5;
    document.getElementById("intentos").innerHTML = intentosRestantes;
    document.getElementById("ayuda").innerHTML = ayudas[posActual];
    arrayPalabras.splice(posActual, 1);
    ayudas.splice(posActual, 1);
}

cargarNuevaPalabra();

// Función para manejar eventos táctiles y de teclado
function handleInput(event) {
    let inputKey;
    if (event.type === "keydown") {
        inputKey = event.key.toUpperCase();
    } else if (event.type === "touchstart") {
        inputKey = event.target.textContent.toUpperCase();
    }

    if (isLetter(inputKey)) {
        let letrasIngresadas = document.getElementById("letrasIngresadas").innerHTML;
        letrasIngresadas = letrasIngresadas.split('');
        if (letrasIngresadas.lastIndexOf(inputKey) === -1) {
            let acierto = false;
            for (i = 0; i < arrayPalabraActual.length; i++) {
                if (arrayPalabraActual[i] == inputKey) { // Acertó
                    divsPalabraActual[i].innerHTML = inputKey;
                    acierto = true;
                    cantidadAcertadas = cantidadAcertadas + 1;
                }
            }
            if (acierto == true) {
                if (totalQueDebeAcertar == cantidadAcertadas) {
                    // Asigno a cada div de la palabra la clase pintar para ponerlo en verde cada div
                    for (i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintar";
                    }
                }
            } else {
                intentosRestantes = intentosRestantes - 1;
                document.getElementById("intentos").innerHTML = intentosRestantes;
                if (intentosRestantes <= 0) {
                    for (i = 0; i < arrayPalabraActual.length; i++) {
                        divsPalabraActual[i].className = "letra pintarError";
                        palabraCorrecta.innerHTML = "La palabra correcta es " + arrayPalabraActual.join("")
                    }
                }
            }
            document.getElementById("letrasIngresadas").innerHTML += inputKey + " - ";
        }
    }
}

document.addEventListener("keydown", handleInput);
document.querySelectorAll(".letra").forEach(item => {
    item.addEventListener("touchstart", handleInput);
});

// Función para verificar si es una letra
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}

function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.toggle("show");
}
