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
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
    ],
    nivel3: [
        [1, 1, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
    ],
    nivel4: [
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1],
    ],
    nivel5: [
        [1, 1, 0, 0, 1],
        [1, 0, 1, 0, 0],
        [1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1],
        [0, 0, 1, 0, 1],
    ],
    nivel6: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 1, 0],
        [1, 0, 1, 1, 1],
        [1, 0, 1, 0, 0],
        [1, 1, 1, 1, 1],
    ],
    nivel7: [
        [1, 0, 1, 1, 1],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
    ],
    nivel8: [
        [0, 0, 1, 0, 1],
        [0, 0, 1, 0, 1],
        [1, 0, 1, 0, 0],
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
        [0, 1, 1, 1, 0],
        [0, 0, 1, 1, 0],
        [1, 0, 1, 1, 0],
        [1, 0, 1, 0, 0],
        [1, 0, 0, 0, 1]
    ]
}
let inicioPersonajeN: Matrices1 = {
    inicioPersonajeN1: [4, 0],
    inicioPersonajeN2: [0, 4],
    inicioPersonajeN3: [0, 3],
    inicioPersonajeN4: [1, 0],
    inicioPersonajeN5: [0, 0]
}
let nivelActual = niveles["nivel1"]
let posicionInicial = inicioPersonajeN["inicioPersonajeN1"]
posicionPersonaje = posicionInicial
let ganadore: Matrices1 = {
    meta1: [0, 1],
    meta2: [4, 0],
    meta3: [0, 0],
    meta4: [0, 2],
    meta5: [0, 4]
}
let posicionMeta = ganadore["meta1"]

let puntos = 10;

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
    led.plotBrightness(x2, y2, 120)
}
function dibujarPersonaje(posicion: number[]) {
    let x = posicion[0];
    let y = posicion[1];
    led.plotBrightness(x, y, 180);
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
    }
}

function validarMovimiento(posicionVM: number[], direccion: string): boolean {
    console.log(posicionVM)
    let x = posicionVM[0];
    let y = posicionVM[1];

    // Calcula la próxima posición en función de la dirección


    // Verifica si la próxima posición está dentro de los límites del laberinto
    if (x < 0 || x > 4 || y < 0 || y > 4) {
        console.log("es un limete del mapa: " + x + "," + y)
        return false; // El movimiento está fuera de los límites
    }

    // Verifica si hay un obstáculo en la próxima posición
    if (nivelActual[y][x] == 1) {
        console.log("hay un ostaculo: " + x + "," + y)
        return false; // Hay un obstáculo en la próxima posición
    }

    return true; // El movimiento es válido
}

function perdio() {
    basic.showString("Game Over");
    basic.pause(1000);  // Pausa de 1 segundo para mostrar el mensaje
    dibujarLaberinto();  // Vuelve a dibujar el laberinto
    dibujarMeta(posicionMeta);  // Vuelve a dibujar la meta
    
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

