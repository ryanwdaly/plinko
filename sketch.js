var Engine = Matter.Engine,
    World = Matter.World, 
    Bodies = Matter.Bodies;

var engine;
var world; 
var particles = [];
var plinkos = [];
var buckets  = [];
var cols = 11;
var rows = 10;

function setup() {
    createCanvas(600, 800);
    engine = Engine.create();
    world = engine.world;
    newParticle();  
    var spacing = width / cols;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var x = j * spacing;
            if (i % 2 == 0){
                x += spacing / 2;
            }
            var y = spacing + i * spacing;
            var p = new Plinko(x, y, 4);
            plinkos.push(p);
        }
    }
}

function newParticle() {
    var p = new Particle(300, 50, 10);
    particles.push(p);
}

function draw() {
    if (frameCount % 60 == 0) {
        newParticle();
    }
    background(51);
    Engine.update(engine);

    for(var i = 0; i < particles.length; i++){
        particles[i].show(); 
    }
    for(var i = 0; i < plinkos.length; i++){
        plinkos[i].show(); 
    }
}