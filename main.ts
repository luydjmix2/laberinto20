function validarMovimiento (posicionVM: number[], direccion: string) {
    x5 = posicionVM[0]
    y5 = posicionVM[1]
    if (x5 < 0 || x5 > 4 || y5 < 0 || y5 > 4) {
        return false
    }
    if (nivelActual[y5][x5] == 1) {
        return false
    }
    return true
}
input.onPinPressed(TouchPin.P0, function () {
    control.reset()
})
function mAba () {
    if (posicionPersonaje[1] < 4) {
        borrarPersonaje(posicionPersonaje)
        posicionPersonaje[1]++;
if (validarMovimiento(posicionPersonaje, "aba")) {
            dibujarPersonaje(posicionPersonaje)
        } else {
            perdio()
            posicionPersonaje[1]--;
dibujarPersonaje(posicionPersonaje)
        }
        verificarMeta()
    }
}
function verificarMeta () {
    meta = ganadores[`meta${nivel}`]
    if (posicionPersonaje[0] == meta[0] && posicionPersonaje[1] == meta[1]) {
        if (nivel == 10) {
            basic.clearScreen()
            basic.showString("Successful game")
            basic.showString("Score: ")
            basic.showNumber(puntos)
            basic.pause(10000)
            nivel = 1
            puntos = 0
        } else {
            basic.clearScreen()
            basic.showString("successful")
            sumarPuntos()
            nivel += 1
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
function mAri () {
    if (posicionPersonaje[1] > 0) {
        borrarPersonaje(posicionPersonaje)
        posicionPersonaje[1]--;
if (validarMovimiento(posicionPersonaje, "ari")) {
            dibujarPersonaje(posicionPersonaje)
        } else {
            perdio()
            posicionPersonaje[1]++;
dibujarPersonaje(posicionPersonaje)
        }
        verificarMeta()
    }
}
function dibujarLaberinto () {
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
function perdio () {
    if (puntos == 0) {
        basic.clearScreen()
        basic.showString("Game Over")
        nivel = 1
        puntos = 0
        posicionMeta = ganadores[`meta${nivel}`]
        nivelActual = niveles[`nivel${nivel}`]
        posicionInicial = inicioPersonajeN[`inicioPersonajeN${nivel}`]
        posicionPersonaje = posicionInicial
        dibujarLaberinto()
        dibujarPersonaje(posicionPersonaje)
        dibujarMeta(posicionMeta)
    } else {
        basic.clearScreen()
        basic.showString("fault")
        basic.pause(1000)
        dibujarLaberinto()
        dibujarMeta(posicionMeta)
        restarPuntos()
    }
}
function borrarPersonaje (posicionBP: number[]) {
    x4 = posicionBP[0]
    y4 = posicionBP[1]
    led.unplot(x4, y4)
}
input.onButtonPressed(Button.A, function () {
    mIzq()
})
function sumarPuntos () {
    puntos += 4
}
function restarPuntos () {
    puntos += 0 - 1
}
input.onPinPressed(TouchPin.P2, function () {
    mAri()
})
function dibujarMeta (posicionM: number[]) {
    x2 = posicionM[0]
    y2 = posicionM[1]
    led.plotBrightness(x2, y2, 60)
}
function dibujarPersonaje (posicion: number[]) {
    x3 = posicion[0]
    y3 = posicion[1]
    led.plotBrightness(x3, y3, 120)
}
function mIzq () {
    if (posicionPersonaje[0] > 0) {
        borrarPersonaje(posicionPersonaje)
        posicionPersonaje[0]--;
if (validarMovimiento(posicionPersonaje, "izq")) {
            dibujarPersonaje(posicionPersonaje)
        } else {
            perdio()
            posicionPersonaje[0]++;
dibujarPersonaje(posicionPersonaje)
        }
        verificarMeta()
    }
}
input.onButtonPressed(Button.B, function () {
    mAba()
})
input.onPinPressed(TouchPin.P1, function () {
    mDer()
})
function mDer () {
    if (posicionPersonaje[0] < 4) {
        borrarPersonaje(posicionPersonaje)
        posicionPersonaje[0]++;
if (validarMovimiento(posicionPersonaje, "der")) {
            dibujarPersonaje(posicionPersonaje)
        } else {
            perdio()
            posicionPersonaje[0]--;
dibujarPersonaje(posicionPersonaje)
        }
        verificarMeta()
    }
}
let y3 = 0
let x3 = 0
let y2 = 0
let x2 = 0
let y4 = 0
let x4 = 0
let estadoLED2 = 0
let matrizLaberinto: number[][] = []
let meta: number[] = []
let y5 = 0
let x5 = 0
let puntos = 0
let posicionMeta: number[] = []
let posicionInicial: number[] = []
let nivelActual: number[][] = []
let nivel = 0
let estadoLED = 0
let posicionPersonaje: number[] = []
let x = 0
let y = 0
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
nivel = 1
nivelActual = niveles[`nivel${nivel}`]
posicionInicial = inicioPersonajeN[`inicioPersonajeN${nivel}`]
posicionPersonaje = posicionInicial
posicionMeta = ganadores[`meta${nivel}`]
puntos = 3
dibujarLaberinto()
dibujarPersonaje(posicionPersonaje)
dibujarMeta(posicionMeta)
