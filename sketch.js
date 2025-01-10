const flock = [];

function setup() {
  createCanvas(400, 400);
  flock.push(new Boid());
}

function draw() {
  background(20);

  for(let boid of flock) {
    boid.edges();
    boid.update();
    boid.show();
  }
}

