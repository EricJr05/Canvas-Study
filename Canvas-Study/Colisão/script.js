const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: undefined,
    y: undefined
}

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX 
    mouse.y = event.clientY 
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init() 
})

// Função para calcular a distância entre dois pontos
function getDistance(x1, y1, x2, y2) {
    const xDistance = x2 - x1; // Diferença em x
    const yDistance = y2 - y1; // Diferença em y

    // Fórmula da distância euclidiana
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
}

class Circle {
    constructor(x, y, radius, color) {
        this.x = x     
        this.y = y     
        this.radius = radius 
        this.color = color  
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color 
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
    }
}

// Declaração das instâncias de círculos
let circle1;
let circle2;

function init() {
    // Círculo central fixo
    circle1 = new Circle(canvas.width / 2, canvas.height / 2, 100, 'black')
    // Círculo controlado pelo mouse
    circle2 = new Circle(undefined, undefined, 30, 'red')
}

function animate() {
    requestAnimationFrame(animate) 
    c.clearRect(0, 0, canvas.width, canvas.height)

    circle1.update() // Atualiza o círculo fixo

    // Atualiza a posição do círculo controlado pelo mouse
    circle2.x = mouse.x
    circle2.y = mouse.y

    // Verifica colisão entre os dois círculos
    if (getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius) {
        circle1.color = 'red' // Muda a cor do círculo fixo para vermelho em caso de colisão
    } else {
        circle1.color = 'black' // Mantém a cor preta se não houver colisão
    }

    circle2.update() // Atualiza o círculo do mouse
}

// Inicializa os círculos e inicia a animação
init()
animate()
