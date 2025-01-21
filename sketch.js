const flock = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 200; i++){
  flock.push(new Boid())}
}

function draw() {
  background(20);

  for(let boid of flock) {
    boid.edges();
    boid.align(flock);
    boid.update();
    boid.show();
  }
}

