let y = 0
let x = 0
let y2 = 0
let x2 = 0
let estadoLED2 = 0
let matrizLaberinto: number[][] = []
let posicionPersonaje: number[] = []
let estadoLED = 0
type Matrices1 = {
    [key: string]: number[];
}
type Matrices2 = {
    [key: string]: number[][];
}
let niveles: Matrices2 = {
    nivel1: [
        [1, 1, 0, 0, 0],
        [0, 1, 0, 1, 1],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [1, 0, 0, 0, 0],
    ],
    nivel2: [
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 1],
        [0, 0, 0, 0, 1],
    ],
    nivel3: [
        [1, 1, 1, 0, 1],
        [0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
    ],
    nivel4: [
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 0, 1, 0, 1],
        [0, 1, 1, 1, 1],
        [0, 0, 1, 0, 1],
    ],
    nivel5: [
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 0],
        [0, 0, 1, 1, 1],
        [0, 1, 1, 0, 1],
        [0, 0, 0, 0, 1],
    ],
    nivel6: [
        [1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 1, 1, 0],
        [1, 0, 1, 0, 0],
        [1, 1, 1, 1, 1],
    ],
    nivel7: [
        [1, 0, 0, 0, 0],
        [1, 0, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1],
    ],
    nivel8: [
        [0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0],
        [1, 0, 1, 1, 0],
        [1, 0, 1, 1, 0],
        [1, 0, 0, 0, 0]
    ],
    nivel9: [
        [1, 1, 0, 1, 1],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    nivel10: [
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 1],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 1, 0],
        [1, 0, 0, 0, 0]
    ]
}
let inicioPersonajeN: Matrices1 = {
    inicioPersonajeN1: [4, 0],
    inicioPersonajeN2: [1, 0],
    inicioPersonajeN3: [3, 0],
    inicioPersonajeN4: [3, 2],
    inicioPersonajeN5: [3, 2],
    inicioPersonajeN6: [3, 3],
    inicioPersonajeN7: [1, 1],
    inicioPersonajeN8: [0, 0],
    inicioPersonajeN9: [2, 0],
    inicioPersonajeN10: [4, 0]
}

let ganadores: Matrices1 = {
    meta1: [0, 1],
    meta2: [1, 2],
    meta3: [0, 1],
    meta4: [1, 4],
    meta5: [1, 4],
    meta6: [1, 3],
    meta7: [0, 3],
    meta8: [3, 0],
    meta9: [0, 1],
    meta10: [1, 1]
}
let nivel = 1;
let nivelActual = niveles[`nivel${nivel}`]
let posicionInicial = inicioPersonajeN[`inicioPersonajeN${nivel}`]
posicionPersonaje = posicionInicial

let posicionMeta = ganadores[`meta${nivel}`]

let puntos = 3;



// Define la función para dibujar el laberinto en la matriz de LED
function dibujarLaberinto() {
    matrizLaberinto = nivelActual
    for (let fila = 0; fila <= 4; fila++) {
        for (let columna = 0; columna <= 4; columna++) {
            estadoLED2 = matrizLaberinto[fila][columna]
            if (estadoLED2 == 1) {
                led.plotBrightness(columna, fila, 255)
            } else {
                led.plotBrightness(columna, fila, 0)
            }
        }
    }
}


function dibujarMeta(posicionM: number[]) {
    x2 = posicionM[0]
    y2 = posicionM[1]
    led.plotBrightness(x2, y2, 60)
}
function dibujarPersonaje(posicion: number[]) {
    let x = posicion[0];
    let y = posicion[1];
    led.plotBrightness(x, y, 120);
}
function borrarPersonaje(posicionBP: number[]) {
    const x = posicionBP[0];
    const y = posicionBP[1];
    led.unplot(x, y);  // Desactiva el LED en la posición (x, y)
}

function mIzq() {
    if (posicionPersonaje[0] > 0) {
        borrarPersonaje(posicionPersonaje);
        posicionPersonaje[0]--;  // Disminuye la coordenada y del personaje para moverlo hacia la izquierda
        if (validarMovimiento(posicionPersonaje, 'izq')) {
            dibujarPersonaje(posicionPersonaje);  // Vuelve a dibujar el personaje en la nueva posición
        }else{
            perdio()
            posicionPersonaje[0]++;
            dibujarPersonaje(posicionPersonaje);  // Vuelve a dibujar el personaje en la nueva posición
        }
        verificarMeta();
    }
}
function mDer() {
    if (posicionPersonaje[0] < 4) {
        borrarPersonaje(posicionPersonaje);
        posicionPersonaje[0]++;  // Disminuye la coordenada y del personaje para moverlo hacia la izquierda
        if (validarMovimiento(posicionPersonaje, 'der')){
            dibujarPersonaje(posicionPersonaje);  // Vuelve a dibujar el personaje en la nueva posición
        } else {
            perdio()
            posicionPersonaje[0]--;
            dibujarPersonaje(posicionPersonaje);  // Vuelve a dibujar el personaje en la nueva posición
        }
        verificarMeta();
    }
}
function mAba() {
    if (posicionPersonaje[1] < 4) {
        borrarPersonaje(posicionPersonaje);
        posicionPersonaje[1]++;  // Disminuye la coordenada y del personaje para moverlo hacia la izquierda
        if (validarMovimiento(posicionPersonaje, 'aba')){
            dibujarPersonaje(posicionPersonaje);  // Vuelve a dibujar el personaje en la nueva posición
        }else {
            perdio()
            posicionPersonaje[1]--;
            dibujarPersonaje(posicionPersonaje);  // Vuelve a dibujar el personaje en la nueva posición
        }
        verificarMeta();
    }
}
function mAri() {
    if (posicionPersonaje[1] > 0) {
        borrarPersonaje(posicionPersonaje);
        posicionPersonaje[1]--;  // Disminuye la coordenada y del personaje para moverlo hacia la izquierda
        if (validarMovimiento(posicionPersonaje,'ari')){
            dibujarPersonaje(posicionPersonaje);  // Vuelve a dibujar el personaje en la nueva posición
        } else {
            perdio()
            posicionPersonaje[1]++;
            dibujarPersonaje(posicionPersonaje);  // Vuelve a dibujar el personaje en la nueva posición
        }
        verificarMeta();
    }
}

function validarMovimiento(posicionVM: number[], direccion: string): boolean {
    console.log(posicionVM)
    let x = posicionVM[0];
    let y = posicionVM[1];

    // Calcula la próxima posición en función de la dirección


    // Verifica si la próxima posición está dentro de los límites del laberinto
    if (x < 0 || x > 4 || y < 0 || y > 4) {
        return false; // El movimiento está fuera de los límites
    }

    // Verifica si hay un obstáculo en la próxima posición
    if (nivelActual[y][x] == 1) {
        return false; // Hay un obstáculo en la próxima posición
    }

    return true; // El movimiento es válido
}

function perdio() {
    if (puntos == 0) {
        basic.showString("Game Over");
        nivel = 1; // Volver al nivel 1
        puntos = 0; // Reiniciar los puntos a cero
        posicionMeta = ganadores[`meta${nivel}`]
        nivelActual = niveles[`nivel${nivel}`]
        posicionInicial = inicioPersonajeN[`inicioPersonajeN${nivel}`]
        posicionPersonaje = posicionInicial
        dibujarLaberinto()
        dibujarPersonaje(posicionPersonaje)
        dibujarMeta(posicionMeta)
    }else{
        basic.showString("fault");
        basic.pause(1000);  // Pausa de 1 segundo para mostrar el mensaje
        dibujarLaberinto();  // Vuelve a dibujar el laberinto
        dibujarMeta(posicionMeta);  // Vuelve a dibujar la meta
        restarPuntos()
    }
    
}

function sumarPuntos() {
    puntos += 4;
}

function restarPuntos() {
    puntos -= 1;
}

function verificarMeta() {
    const meta = ganadores[`meta${nivel}`]; // Obtener las coordenadas de la meta según el nivel actual
    if (posicionPersonaje[0] === meta[0] && posicionPersonaje[1] === meta[1]) {
        basic.showString("Successful");
        sumarPuntos(); // Aumentar los puntos al llegar a la meta

        if (nivel == 10) {
            basic.showString("Successful game");
            basic.showString("Score: " + puntos);
            nivel = 1; // Volver al nivel 1
            puntos = 0; // Reiniciar los puntos a cero
        } else {
            nivel++; // Aumentar el nivel
            // Aquí puedes agregar la lógica para pasar al siguiente nivel, reiniciar el juego, etc.
        }
    }
    posicionMeta = ganadores[`meta${nivel}`]
    nivelActual = niveles[`nivel${nivel}`]
    posicionInicial = inicioPersonajeN[`inicioPersonajeN${nivel}`]
    posicionPersonaje = posicionInicial
    dibujarLaberinto()
    dibujarPersonaje(posicionPersonaje)
    dibujarMeta(posicionMeta)
}

input.onButtonPressed(Button.A, function () {
    mIzq()
})

input.onButtonPressed(Button.B, function () {
    mDer()
})

input.onButtonPressed(Button.AB, function () {
    mAba()
})

input.onGesture(Gesture.Shake, function () {
    mAri()
})
// Llama a la función para dibujar el laberinto al inicio
dibujarLaberinto()
dibujarPersonaje(posicionPersonaje)
dibujarMeta(posicionMeta)
basic.forever(function () {

})

