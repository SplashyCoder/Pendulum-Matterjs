function ajustarTamaño(){
    var panelIzquierda = document.getElementById("canvasContaienr");
    console.log(panelIzquierda.clientWidth);


    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Constraint = Matter.Constraint,
    Body = Matter.Body,
    Bodies = Matter.Bodies;

// create engine
    var engine = Engine.create(),
        world = engine.world;

    const W = 800;
    const H = panelIzquierda;
}


