
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
let matrices: Matrices2 = {
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

// Define la función para dibujar el laberinto en la matriz de LED
function dibujarLaberinto(nivel: string) {
    matrizLaberinto = matrices[nivel]
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
input.onButtonPressed(Button.A, function () {
    moverIzquierda()
})
function moverIzquierda() {
    if (posicionPersonaje && posicionPersonaje[1] > 0) {
        posicionPersonaje[1]--;  // Disminuye la coordenada y del personaje para moverlo hacia la izquierda
        dibujarPersonaje(posicionPersonaje);  // Vuelve a dibujar el personaje en la nueva posición
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
// Llama a la función para dibujar el laberinto al inicio
dibujarLaberinto("nivel1")
dibujarPersonaje(posicionPersonaje)
dibujarMeta(posicionMeta)
basic.forever(function () {
	
})
