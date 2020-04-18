var Engine = Matter.Engine,
    World = Matter.World, 
    Bodies = Matter.Bodies;

var engine;
var world; 
var particles = [];
var plinkos = [];
var boundaries = [];
var buckets  = [];
var cols = 11;
var rows = 10;

function setup() {
    createCanvas(600, 700);
    colorMode(HSB);
    engine = Engine.create();
    world = engine.world;
    newParticle();  
    var spacing = width / cols;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols + 1; j++) {
            var x = j * spacing;
            if (i % 2 == 0){
                x += spacing / 2;
            }
            var y = spacing + i * spacing;
            var p = new Plinko(x, y, 10);
            plinkos.push(p);
        }
    }
    var b = new Boundary(width/2, height + 50, width, 100)
    boundaries.push(b);

    for (var j = 0; j < cols + 1; j++) {
        var x = j * spacing;
        var h = 100;
        var w = 10;
        var y = height - h / 2;
        var b = new Boundary(x, y, w, h);
        boundaries.push(b);
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
    background(0, 0, 0);
    Engine.update(engine, 16.666);

    for(var i = 0; i < particles.length; i++){
        particles[i].show(); 
        if (particles[i].isOffScreen()) {
            World.remove(world, particles[i].body)
            particles.splice(i, 1);
            i--;
        }
    }
    for(var i = 0; i < plinkos.length; i++){
        plinkos[i].show(); 
    }
    for(var i = 0; i < boundaries.length; i++){
        boundaries[i].show(); 
    }
}