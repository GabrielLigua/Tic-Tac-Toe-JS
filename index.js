let jugadorActual = "X"; // Jugador que inicia el juego

let juegoActivo = true; // Indica si el juego está activo

let tablero = []; // Arreglo que representa las 9 casillas del tablero

// Todas las combinaciones posibles para que haya un ganador
const COMBINACIONES_GANADORAS = [
  [0, 1, 2], //Fila
  [3, 4, 5], //Fila
  [6, 7, 8], //Fila
  [0, 3, 6], //Columna
  [1, 4, 7], //Columna
  [2, 5, 8], //Columna
  [0, 4, 8], //Diagonal
  [2, 4, 6], //Diagonal
];

// Imprime el tablero por consola
function imprimirTablero() {
  console.clear();
  console.log(`\n--- TURNO DEL JUGADOR: ${jugadorActual} ---`);

  console.log("======================");
  console.log(` ${tablero[0]} | ${tablero[1]} | ${tablero[2]} `);
  console.log("-----------");
  console.log(` ${tablero[3]} | ${tablero[4]} | ${tablero[5]} `);
  console.log("-----------");
  console.log(` ${tablero[6]} | ${tablero[7]} | ${tablero[8]} `);
  console.log("======================\n");
}

// Cambia el turno entre jugador X y O
function cambiarTurno() {
  jugadorActual = jugadorActual === "X" ? "O" : "X";
}

// Crea el tablero inicial con los números del 1 al 9
function inicializarTablero() {
  for (let i = 0; i < 9; i++) {
    tablero[i] = (i + 1).toString();
  }
}

// Reinicia todas las variables para volver a jugar
function reiniciarJuego() {
  inicializarTablero();

  jugadorActual = "X";
  juegoActivo = true;
  console.log("\n--- ¡Juego reiniciado! ---");
}

// Verifica si hay ganador o empate
function verificarEstadoJuego() {
  // Recorre las combinaciones ganadoras
  for (const grupo of COMBINACIONES_GANADORAS) {
    const [a, b, c] = grupo;

    // Si las 3 casillas son iguales quiere decir que hay un ganador
    if (tablero[a] === tablero[b] && tablero[b] === tablero[c]) {
      imprimirTablero();
      console.log(`\n\n¡Felicidades, ganó ${tablero[a]}!\n\n`);
      juegoActivo = false; // Y se detiene el juego
      return true;
    }

    // Revisa si todas las casillas están ocupadas (si hay empate)
    const esTableroLleno = tableroLleno();

    if (esTableroLleno) {
      imprimirTablero();
      console.log("\n\n ¡Es un empate!\n\n");
      juegoActivo = false; // Se detiene el juego
      return true;
    }
  }
  return false; // Todavia no hay ganador
}

// Verifica si el tablero está completamente ocupado
function tableroLleno() {
  // Recorre cada celda del tablero
  for (let celda of tablero) {
    // Si la celda todavía contiene un número (no ha sido reemplazada por "X" u "O"),
    // significa que aún quedan movimientos disponibles
    if (celda !== "X" && celda !== "O") {
      return false; // El tablero no está lleno
    }
  }

  // Si todas las celdas contienen "X" u "O", no quedan movimientos
  return true; // El tablero está lleno
}

// Pide al jugador que ingrese su jugada (1-9)
function pedirPosicionJugada() {
  let jugadaValida = false;

  while (!jugadaValida) {
    // Se obtiene el valor que ingresó el jugador y se convierte a número
    const movimiento = parseInt(
      prompt(`Jugador ${jugadorActual} elige una casilla (1-9)\n\n`)
    );

    // Comprueba si lo que ingresó el jugador es un número válido
    if (isNaN(movimiento) || movimiento < 1 || movimiento > 9) {
      jugadaValida = false;
      console.error("Jugada no válida, vuelva a ingresar un movimiento");
      continue;
    }

    const indice = movimiento - 1; // Convierte los valores entre 1 y 9 a índice entre 0 y 8 (indispensable para saber que casilla del tablero marcar)

    // Si la casilla todavia tiene el número original y es igual al número que ingresó el jugador
    if (tablero[indice] == movimiento) {
      tablero[indice] = jugadorActual; // Se reemplaza ese valor por "X" u "O"
      jugadaValida = true;
    } else {
      jugadaValida = false;
      console.error(
        `ERROR: La casilla ${movimiento} ya está ocupada por '${tablero[indice]}'. Intenta de nuevo.`
      );
    }
  }
}

// Controla el inicio del juego y la posiblidad de volver a jugar
function iniciarJuego() {
  let jugarDeNuevo = true;

  while (jugarDeNuevo) {
    reiniciarJuego(); // Prepara un juego nuevo

    while (juegoActivo) {
      imprimirTablero();
      pedirPosicionJugada();

      // Si no hay ganador ni empate, cambia de turno
      if (!verificarEstadoJuego()) {
        cambiarTurno();
      }
    }
    jugarDeNuevo = confirm("¿Quieren jugar de nuevo?");
  }

  console.log("\n--- Gracias por jugar. ¡Nos vemos pronto! ---");
}

iniciarJuego(); // Inicia el juego