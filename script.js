
//functions for catching the canvas limits 
//width
function ajustarTamañoW(){
    var panelIzquierda = document.getElementById("canvasContaienr");
    return panelIzquierda.clientWidth
}

//Heigth
function ajustarTamañoH(){
    var panelIzquierda = document.getElementById("canvasContaienr");
    return panelIzquierda.clientHeight
}

//saving it in variables
const canvasWidth = ajustarTamañoW()
console.log(canvasWidth);

const canvasHeight = ajustarTamañoH()
console.log(canvasHeight);

//Creating the const for Matter js
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

//Engine, Runner,and render are the ones wich makes the magic happens
const iEngine = Engine.create();
const iRunner = Runner.create();
const iRender = Render.create({
  element: document.body,
  engine: iEngine,
  options: {
    width: 800,
    height: 400,
    wireframes: false
  }
});

//Creating the bodies and the ground
const pendulum1 = Bodies.circle(300, 100, 50, 10);
const pendulum2 = Bodies.circle(400, 100, 50, 10);
const ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });


//Adding the two bodies to the world
Composite.add(iEngine.world, [pendulum1, pendulum2]);

//Creating the constriant its means the link between the 2 bodies
const constraint = Matter.Constraint.create({
    bodyA: pendulum1,
    bodyB: pendulum2,
    pointA: { x: 49, y: 0 },
    pointB: { x:-49, y: 0 },
    length: 150, // Longitud de la cuerda
    stiffness: 0.7 // Rigidez de la cuerda
});

//Adding constraint and ground to the wold
Composite.add(iEngine.world, [constraint,ground]);

//Redering everithing
Render.run(iRender);
Runner.run(iRunner, iEngine);