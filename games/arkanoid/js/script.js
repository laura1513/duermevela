"use strict";

window.onload = function () {
    // definimos las variables
    var canvas = document.getElementById("myCanvas");
    var iniciar = document.getElementById("iniciar");
    var ctx = canvas.getContext("2d");
    var x = canvas.width / 2;
    var y = canvas.height - 50;
    var velocidadInicial = 1.1;
    var velocidadNivel = velocidadInicial;
    var aumentoVelocidad = 1.1;
    var dx = 0 * velocidadInicial;
    var dy = -1 * velocidadInicial;
    var ballRadius = 10;
    var colorBola = "#0095DD";
    var colorRGB1 = 0;
    var colorRGB2 = 0;
    var colorRGB3 = 0;
    var playerX = 300;
    var playerY = canvas.height - 20;
    var playerWidth = 100;
    var playerHeight = 10;
    var puntos = 0;
    var aumentaPuntuación = 10;
    var finPartida = "";
    var rightPressed = false;
    var leftPressed = false;
    var movimientoPlayer = 4;
    var finPartida = 0;
    var vidas = 3;
    var leftImg = document.getElementById("moverIzquierda");
    var rightImg= document.getElementById("moverDerecha")

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // tamaño canva
    var margenMin = canvas.offsetLeft;
    var margenMax = canvas.offsetLeft + canvas.width;

    // ladrillos
    var brickRowCount = 3;
    var brickColumnCount = 13;
    var brickWidth = 50;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 15;
    var brickCount = 0;
    var brickColor = "";

    var c;
    var r;
    var bricks = [];

    // ┌────────────────────────────────────────────────────────────────────┐
    // │  Iniciamos los ladrillos                                           │
    // └────────────────────────────────────────────────────────────────────┘
    audioMusica(); // música de fondo

    iniciar.addEventListener("click", iniciarPartida);


    function iniciaLadrillos() {
        brickCount = 0;
        for (c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            nuevoColor();
            brickColor =
                "rgba(" + colorRGB1 + "," + colorRGB2 + "," + colorRGB3 + ")";
            for (r = 0; r < brickRowCount; r++) {
                bricks[c][r] = {
                    x: 0,
                    y: 0,
                    status: 1,
                    color: brickColor
                };
                brickCount += 1;
            }
        }
    }

    // ┌────────────────────────────────────────────────────────────────────┐
    // │  Dibujamos la bola                                                 │
    // └────────────────────────────────────────────────────────────────────┘
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = colorBola;
        ctx.fill();
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.closePath();
    }


    function nuevoColor() {
        colorRGB1 = Math.random(1) * 255;
        colorRGB2 = Math.random(1) * 255;
        colorRGB3 = Math.random(1) * 255;
    }

    // ┌────────────────────────────────────────────────────────────────────┐
    // │  Dibujamos el jugador                                              │
    // └────────────────────────────────────────────────────────────────────┘
    function drawPlayer() {
        //cuadrado2
        ctx.beginPath();
        ctx.rect(playerX, playerY, playerWidth, playerHeight);
        // otra manera de guardar el color del borde (strokeStyle y stroke())
        ctx.fillStyle = "rgba(100,100,100)";
        ctx.fill();
        ctx.closePath();
        document.onmousemove = function (movimiento) {
            // Movimiento con ratón
            //definimos si hay que mover al player en función de la ubicación del ratón
            if (movimiento.pageX - playerWidth / 2 >= margenMin &&
                movimiento.pageX + playerWidth / 2 <= margenMax) {
                playerX = movimiento.pageX - playerWidth / 2;
            }
        };
        /*canvas.addEventListener('touchmove', function(event) {
            // Prevenir el comportamiento predeterminado de desplazamiento
            event.preventDefault();

            // Obtener la posición del dedo
            var touch = event.touches[0];
            var touchX = touch.pageX - canvas.offsetLeft;

            // Ajustar la posición del jugador en función de la posición del dedo
            if (touchX - playerWidth / 2 >= margenMin && touchX + playerWidth / 2 <= margenMax) {
                playerX = touchX - playerWidth / 2;
            }
        });*/

        // Movimiento con teclado ──────────────────────────────────────────
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);

        function keyDownHandler(e) {
            if (e.keyCode == 39) {
                rightPressed = true;
            } else if (e.keyCode == 37) {
                leftPressed = true;
            }
        }

        function keyUpHandler(e) {
            if (e.keyCode == 39) {
                rightPressed = false;
            } else if (e.keyCode == 37) {
                leftPressed = false;
            }
        }
        leftImg.addEventListener('touchstart', function() {
            leftPressed = true;
        });

        leftImg.addEventListener('touchend', function() {
            leftPressed = false;
        });

        rightImg.addEventListener('touchstart', function() {
            rightPressed = true;
        });

        rightImg.addEventListener('touchend', function() {
            rightPressed = false;
        });

        if (rightPressed && playerX + playerWidth < canvas.width) {
            playerX += movimientoPlayer;
        } else if (leftPressed && playerX > 0) {
            playerX -= movimientoPlayer;
        }
    }

    // ┌────────────────────────────────────────────────────────────────────┐
    // │  Dibujamos los puntos                                              │
    // └────────────────────────────────────────────────────────────────────┘
    function drawPuntos() {
        ctx.beginPath();
        ctx.fillStyle = "grey";
        ctx.textAlign = "left";
        ctx.font = "20px Arial";
        ctx.fillText("Puntos: " + puntos, 5, 20);
        ctx.closePath();
    }

    // ┌────────────────────────────────────────────────────────────────────┐
    // │  Dibujamos las vidas                                               │
    // └────────────────────────────────────────────────────────────────────┘
    function drawVidas() {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.textAlign = "right";
        ctx.font = "20px Arial";
        var cadenaVidas = "";
        var v = 0;
        for (v = 1; v <= vidas; v++) {
            cadenaVidas += "❤";
        }
        ctx.fillText(cadenaVidas, canvas.width - 5, 20);
        ctx.closePath();
    }



    // ┌────────────────────────────────────────────────────────────────────┐
    // │  Dibujamos todo                                                    │
    // └────────────────────────────────────────────────────────────────────┘
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // limpia el canvas
        drawBricks();
        drawBall(); // dibuja la bola
        drawPlayer(); // dibuja el jugador
        drawPuntos(); //muestra puntuación
        drawVidas(); // muestra las vidas disponibles
        collisionDetection(); // detectamos colisión con los ladrillos

        // ────────────────────────────────────────────────────────────────────
        // detectamos las colisiones con el borde del canva
        if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
            dx = -dx;
            audioPared();
        }
        if (y + dy < ballRadius) {
            dy = -dy;
            audioPared();
        }

        x += dx; // desplaza la coordenada 'x'
        y += dy; // desplaza la coordenada 'y'

        // ────────────────────────────────────────────────────────────────────
        // detectamos colisiones con player eje Y (rebote normal)
        if (
            y > playerY - ballRadius &&
            x + ballRadius > playerX &&
            x - ballRadius < playerX + playerWidth
        ) {
            dy = -dy;
            audioPlayer();

            // calcular el cambio de movimiento horizontal en función de dónde golpea la bola al jugador
            dx = ((x - playerX - playerWidth / 2) / 100) * 4;
        }

        // Detectamos Game Over ───────────────────────────────────────────────
        if (y + dy >= canvas.height + ballRadius) {
            vidas -= 1;
            if (vidas < 0) {
                gameOver();
            } else {
                // pierde una vida y reiniciamos la pantalla
                audioGameOver();
                iniciarPartida();
            }
        }
    }

    // ┌────────────────────────────────────────────────────────────────────┐
    // │  Game Over                                                         │
    // └────────────────────────────────────────────────────────────────────┘
    function gameOver() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        audioGameOver();

        ctx.beginPath();
        // imprimimos Has perdido
        ctx.font = "60px Impact";
        ctx.textAlign = "center";
        ctx.fillStyle = "red";
        ctx.fillText("Has perdido", canvas.width / 2, canvas.height / 2);
        ctx.font = "30px Impact";
        // imprimimos puntuación
        ctx.fillText(
            "Puntuación: " + puntos,
            canvas.width / 2,
            canvas.height / 2 + 50
        );
        ctx.closePath();

        clearInterval(finPartida);
        dx = 1 * velocidadInicial;
        dy = -1 * velocidadInicial;
        velocidadNivel = velocidadInicial;
        puntos = 0;
        finPartida = 0;
        brickRowCount = 3;
        vidas = 3;
        document.getElementById("iniciar").style.display = "inline";
        iniciar.addEventListener("click", iniciarPartida);
    }

    // ┌────────────────────────────────────────────────────────────────────┐
    // │  Aumento de velocidad                                              │
    // └────────────────────────────────────────────────────────────────────┘
    function aumentaVelocidad() {
        dx *= aumentoVelocidad;
        dy *= aumentoVelocidad;
    }

    // ┌────────────────────────────────────────────────────────────────────┐
    // │  Dibujamos los ladrillos                                           │
    // └────────────────────────────────────────────────────────────────────┘
    function drawBricks() {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                if (bricks[c][r].status == 1) {
                    var brickX =
                        c * (brickWidth + brickPadding) + brickOffsetLeft;
                    var brickY =
                        r * (brickHeight + brickPadding) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;

                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = bricks[c][r].color;
                    ctx.fill();
                    ctx.strokeStyle = "grey";
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }

    // ┌────────────────────────────────────────────────────────────────────┐
    // │  Colisión con ladrillos                                            │
    // └────────────────────────────────────────────────────────────────────┘
    function collisionDetection() {
        for (c = 0; c < brickColumnCount; c++) {
            for (r = 0; r < brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.status == 1) {
                    if (
                        x + ballRadius > b.x &&
                        x - ballRadius < b.x + brickWidth &&
                        y + ballRadius > b.y &&
                        y - ballRadius < b.y + brickHeight
                    ) {
                        dy = -dy;
                        b.status = 0;
                        puntos += aumentaPuntuación;
                        colorBola = b.color;
                        audioLadrillo();
                        brickCount -= 1;
                    }
                }
            }
        }

        if (brickCount <= 0) {
            // si eliminamos todos los ladrillos, seguimos jugando reiniciando los ladrillos con una nueva fila de ladrillos
            if (brickRowCount < 7) { // si hay menos de 7 filas, añadimos fila
                brickRowCount += 1;
            }
            x = canvas.width / 2 + parseInt(Math.random() * 300) - 150;
            y = canvas.height - 80;
            velocidadNivel *= aumentoVelocidad;
            dx = 0 * velocidadNivel;
            dy = -1 * velocidadNivel;
            audioNuevoNivel();
            iniciaLadrillos();
        }
    }

    function ajustarElementoa() {
        playerY = canvas.height - 20;
        playerWidth = canvas.width / 10;
        brickWidth = canvas.width / 15;
        brickHeight = canvas.height / 30;
        brickOffsetTop = canvas.height / 20;
        brickOffsetLeft = canvas.width / 30;
    }
    // ┌────────────────────────────────────────────────────────────────────┐
    // │  Ajuste de velocidades                                             │
    // └────────────────────────────────────────────────────────────────────┘


    function iniciarPartida() {
        ajustarElementoa()
        audioNuevoNivel();
        x = canvas.width / 2;
        y = canvas.height - 50;
        velocidadInicial = 1.1;
        aumentoVelocidad = 1.1;
        dx = 0 * velocidadInicial;
        dy = -1 * velocidadInicial;

        iniciaLadrillos(); // definimos los bloques
        document.getElementById("iniciar").style.display = "none";

        if (finPartida === 0) {
            finPartida = setInterval(draw, 1); // cada 10 milisegundos se llamará a la función 'draw' que: limpiará, dibujará y desplazará la bola para la siguiente llamada
        }
        setInterval(aumentaVelocidad, 10000); // aumento de velocidad de la bola
    }
};
function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.toggle("show");
}