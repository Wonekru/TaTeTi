let jugador = "X";
let finJuego = false;
let celdas = document.querySelectorAll(".celda");

const tablero = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

// Función para dibujar el tablero en la página web
function dibujarTablero() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            celdas[i * 3 + j].textContent = tablero[i][j];
        }
    }
}

// Función para cambiar el jugador actual
function cambiarJugador() {
  jugador = jugador === "X" ? "O" : "X";
  document.getElementById("turno").textContent = jugador;
}




// Función para verificar si hay un ganador
function verificarGanador() {
  // Verificar filas
  for (let i = 0; i < 3; i++) {
    if (tablero[i][0] !== "" && tablero[i][0] === tablero[i][1] && tablero[i][0] === tablero[i][2]) {
      return true;
    }
  }
  // Verificar columnas
  for (let i = 0; i < 3; i++) {
    if (tablero[0][i] !== "" && tablero[0][i] === tablero[1][i] && tablero[0][i] === tablero[2][i]) {
      return true;
    }
  }
  // Verificar diagonales
  if (tablero[0][0] !== "" && tablero[0][0] === tablero[1][1] && tablero[0][0] === tablero[2][2]) {
    return true;
  }
  if (tablero[2][0] !== "" && tablero[2][0] === tablero[1][1] && tablero[2][0] === tablero[0][2]) {
    return true;
  }
  // Si no hay ganador, retornar falso
  return false;
}



// Función para mostrar el mensaje de ganador y reiniciar el juego
function finJuegoMensaje(mensaje, filaInicio, columnaInicio, filaFin, columnaFin) {
  finJuego = true;
  document.getElementById("ganador").textContent = mensaje;
  const celdasGanadoras = [];
  // Agregar las celdas ganadoras a un array
  for (let i = filaInicio; i <= filaFin; i++) {
    for (let j = columnaInicio; j <= columnaFin; j++) {
      celdasGanadoras.push(celdas[i * 3 + j - 1]);
    }
  }
  
  // Agregar la clase "linea" a las celdas ganadoras
  celdasGanadoras.forEach(celda => {
    celda.classList.add("linea");



  });
  // Esperar 2 segundos antes de reiniciar el juego
  setTimeout(() => {
    reiniciarJuego();
  }, 2000);
}


// Función para manejar el evento de hacer clic en una celda
// Función para manejar el evento de hacer clic en una celda
function manejarClic(event) {
    const celda = event.target;
    const id = parseInt(celda.dataset.id) - 1;
    const fila = Math.floor(id / 3);
    const columna = id % 3;
    if (tablero[fila][columna] === "" && !finJuego) {
      tablero[fila][columna] = jugador;
      dibujarTablero();
      if (verificarGanador()) {
        finJuegoMensaje(`¡${jugador} ha ganado!`); 
      } else if (!tablero.flat().includes("")) {
        finJuegoMensaje("¡Empate!");
      } else {
        cambiarJugador();
      }
    }
  }
  

// Función para reiniciar el juego
function reiniciarJuego() {
  tablero.forEach((fila, i) => {
    fila.forEach((valor, j) => {
      tablero[i][j] = "";
    });
  });
  dibujarTablero();
  finJuego = false;
}

celdas.forEach(celda => {
  celda.addEventListener("click", manejarClic);
}); 