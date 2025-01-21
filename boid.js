class Boid {
    constructor() {
      this.position = createVector(random(width), random(height));
      this.velocity = p5.Vector.random2D();
    //   this.velocity.setMag(random(2, 4));
      this.acceleration = createVector();
      this.maxForce = 0.2;
      this.maxSpeed = 2;
    }
  
    // edges() {
    //   if (this.position.x > width) {
    //     this.position.x = 0;
    //   } else if (this.position.x < 0) {
    //     this.position.x = width;
    //   }
    //   if (this.position.y > height) {
    //     this.position.y = 0;
    //   } else if (this.position.y < 0) {
    //     this.position.y = height;
    //   }
    // }

    edges(){  
        if (this.position.x > width) {
        this.velocity.x = -this.velocity.x;
      } else if (this.position.x < 0) {
        this.velocity.x = -this.velocity.x;
      }
      if (this.position.y > height) {
        this.velocity.y = -this.velocity.y;
      } else if (this.position.y < 0) {
        this.velocity.y = -this.velocity.y;
      }
      }
  
    align(boids) {
      let perceptionRadius = 25;
      let steering = createVector();
      let total = 0;
      for (let other of boids) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other != this && d < perceptionRadius) {
          steering.add(other.velocity);
          total++;
        }
      }
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  
    // align() {
    //     let perceptionRadius = 250;
    //     let avg = createVector(0,0);
    //     let total = 0;
    //     for (let other of boids) {
    //         let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    //         if (other != this && d < perceptionRadius) {
    //             let angle = this.velocity.angleBetween(other.vel);
    //             if (angle < PI / this.vision || angle > -PI / this.vision) {
    //                 avg.add(other.velocity);
    //                 total++
    //             }
    //         }
    //     }
    //     if (total > 0) {
    //         avg.div(total);
    //         avg.setMag(this.maxSpeed)
    //         avg.sub(this.vel);
    //         avg.limit(this.maxForce); 
    //     }
    //     // what happens if total == 0?
    //     return avg;
    // }

    // separation(boids) {
    //   let perceptionRadius = 24;
    //   let steering = createVector();
    //   let total = 0;
    //   for (let other of boids) {
    //     let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    //     if (other != this && d < perceptionRadius) {
    //       let diff = p5.Vector.sub(this.position, other.position);
    //       diff.div(d * d);
    //       steering.add(diff);
    //       total++;
    //     }
    //   }
    //   if (total > 0) {
    //     steering.div(total);
    //     steering.setMag(this.maxSpeed);
    //     steering.sub(this.velocity);
    //     steering.limit(this.maxForce);
    //   }
    //   return steering;
    // }
  
    // cohesion(boids) {
    //   let perceptionRadius = 50;
    //   let steering = createVector();
    //   let total = 0;
    //   for (let other of boids) {
    //     let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    //     if (other != this && d < perceptionRadius) {
    //       steering.add(other.position);
    //       total++;
    //     }
    //   }
    //   if (total > 0) {
    //     steering.div(total);
    //     steering.sub(this.position);
    //     steering.setMag(this.maxSpeed);
    //     steering.sub(this.velocity);
    //     steering.limit(this.maxForce);
    //   }
    //   return steering;
    // }
  
    flock(boids) {
      let alignment = this.align(boids);
      let cohesion = this.cohesion(boids);
      let separation = this.separation(boids);
  
    //   alignment.mult(alignSlider.value());
    //   cohesion.mult(cohesionSlider.value());
    //   separation.mult(separationSlider.value());
      alignment.mult(0.4);
      cohesion.mult(1.8);
      separation.mult(0.9);
  
      this.acceleration.add(alignment);
      this.acceleration.add(cohesion);
      this.acceleration.add(separation);
    }

  
    update() {
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.acceleration.mult(0);
    }
  
    show() {
      strokeWeight(10);
      stroke(255);
      point(this.position.x, this.position.y);
    }
  }