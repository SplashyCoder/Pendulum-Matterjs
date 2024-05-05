
//functions for catching the canvas limits 
//width
const ajustarTamañoW = () => {
    var panelIzquierda = document.getElementById("canvasContaienr");
    return panelIzquierda.clientWidth
}

//Heigth
const ajustarTamañoH = () => {
    var panelIzquierda = document.getElementById("canvasContaienr");
    return panelIzquierda.clientHeight
}

const canvasWidth = ajustarTamañoW()
const canvasHeight = ajustarTamañoH()

const canvasWidthPendulum1 = canvasWidth/2



let datosImp = [[188.56180831641268,100],[188.56180831641268,100],0.01,200]


const anguloCartesiano = (anguloEnGrados) => {
  // Convertir a radianes
  const anguloEnRadianes = anguloEnGrados * Math.PI / 180;
  
  // datosImp cartesianas del péndulo
  const x = canvasWidth/3 * Math.sin(anguloEnRadianes); // Posición horizontal
  const y = 10; // Posición vertical
  // const y = 10
  
  let datosImp = [x,y]
  return(datosImp);
  }
  
  
  const catchData = (entry) =>{
  
    datos = [anguloCartesiano(entry[0][1]),anguloCartesiano(entry[1][1]),entry[2][1],entry[3][1]]

    let pendulum1DataX = datos[0][0]
    let pendulum1DataY = datos[0][1]

    let pendulum2DataX = datos[1][0]
    let pendulum2DataY = datos[1][1]

    console.log({pendulum1DataX,pendulum1DataY})
    Matter.Body.setPosition(pendulum1, {pendulum1DataX , pendulum1DataY })
    Matter.Body.setPosition(pendulum2, {pendulum2DataX , pendulum2DataY })

  } 
  
  var enviar = document.getElementById('penduloForm')
  enviar.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(enviar);
    const datosArray = Array.from(formData.entries()); 
    datosImp = catchData(datosArray)
    enviar.reset()
  });
  
  console.log(datosImp)


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

    wireframes: false
  }
});

//Creating the bodies and the ground
const pendulum1 = Bodies.circle(datosImp[0][0], datosImp[0][1], canvasWidth/20, 10);
// const pendulum1 = Bodies.circle(50, 0, 50, 10);

// const pendulum2 = Bodies.circle(datosImp[0]+canvasWidth * 2/3, datosImp[0], 50, 10);
const pendulum2 = Bodies.circle(canvasWidth - datosImp[1][0], datosImp[1][1], canvasWidth/20, 10);

// const ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });


//Adding the two bodies to the world
Composite.add(iEngine.world, [pendulum1, pendulum2]);

//Creating the constriant its means the link between the 2 bodies
const constraint = Matter.Constraint.create({
    bodyA: pendulum1,
    bodyB: pendulum2,
    pointA: { x: (canvasWidth/20)-1, y: 0 },
    pointB: { x:-((canvasWidth/20)-1), y: 0 },
    length: datosImp[3], // Longitud de la cuerda
    stiffness: datosImp[2]// Rigidez de la cuerda
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
Composite.add(iEngine.world, [constraint, constraint2, constraint3]);


//Redering everithing
Render.run(iRender);
Runner.run(iRunner, iEngine);





  