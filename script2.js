const engine = Matter.Engine.create();
const world = engine.world;


const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

//Engine, Runner,and render are the ones wich makes the magic happens
const iEngine = Engine.create();
const iRunner = Runner.create();

// Renderizar la simulación
const render = Matter.Render.create({
    element: document.body,
    engine: engine,
    canvas: document.getElementById("canvas"),
    options: {
        width: 800,
        height: 600,
        wireframes: false,
    },
});



const ajustarTamañoW = () => {
    var panelIzquierda = document.getElementById("canvas");
    return panelIzquierda.clientWidth
}

//Heigth
const ajustarTamañoH = () => {
    var panelIzquierda = document.getElementById("canvas");
    return panelIzquierda.clientHeight
}

const canvasWidth = ajustarTamañoW()
const canvasHeight = ajustarTamañoH()

const canvasWidthPendulum1 = canvasWidth/2




const pendulum1 = Matter.Bodies.circle(canvasWidth/3, 300, canvasWidth/20, 10); // Posición inicial
const pendulum2 = Matter.Bodies.circle(canvasWidth * 2/3, 300, canvasWidth/20, 10); // Posición inicial

Matter.World.add(world, [pendulum1,pendulum2]);



const constraint = Matter.Constraint.create({
    bodyA: pendulum1,
    bodyB: pendulum2,
    pointA: { x: (canvasWidth/20)-1, y: 0 },
    pointB: { x:-((canvasWidth/20)-1), y: 0 },
    length: 200, // Longitud de la cuerda
    stiffness: 0.01// Rigidez de la cuerda
});

//Creating costraints 1 & 2 for makin the pendulums
const constraint2 = Matter.Constraint.create({
    pointA: { x: canvasWidth/3, y: 0},
    bodyB: pendulum1,
    stiffness: 0.9,
    render: {
        strokeStyle: "#4a485b"
    }
})

const constraint3 = Matter.Constraint.create({
    pointA: { x: canvasWidth * 2/3, y: 0 },
    bodyB: pendulum2,
    stiffness: 0.9,
    render: {
        strokeStyle: "#4a485b"
    }
})
//Adding constraint and ground to the wold
// Composite.add(iEngine.world, [constraint2]);
Matter.World.add(world, [constraint, constraint2, constraint3]);


Matter.Render.run(render);
Matter.Runner.run(engine);

// Manejador de evento para el formulario
document.getElementById("penduloForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita el comportamiento por defecto (recargar la página)

    // Obtener valores del formulario
    const x = parseFloat(document.getElementById("x").value);
    const y = parseFloat(document.getElementById("y").value);

    // Alterar las coordenadas del péndulo
    Matter.Body.setPosition(pendulum1, { x, y });
    Matter.Body.setPosition(pendulum2, { x, y });


    console.log(`Péndulo movido a (${typeof x}, ${typeof y})`);
});