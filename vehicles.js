
class Vehicle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.r = 7;
      this.maxspeed = 7; // Maximum speed
      this.maxforce = 0.1; // Maximum steering force
      this.acceleration = createVector(0, 0);
      this.velocity = createVector(0, 0);
    }
  
    applyBehaviors(vehicles) {
      let separateForce = this.separate(vehicles);
    //  let seekForce = this.seek(createVector(mouseX, mouseY));
    //  let seekForce = this.seek(createVector(mapPotX, mapPotY));
      let seekForce = this.seek(createVector(x, y));
  
      separateForce.mult(1.7);
      seekForce.mult(0.5);
  
      this.applyForce(separateForce);
      this.applyForce(seekForce);
    }
  
    applyForce(force) {
      // We could add mass here if we want A = F / M
      this.acceleration.add(force);
    }
  
    // Separation
    // Method checks for nearby vehicles and steers away
    separate(vehicles) {
      let desiredSeparation = this.r * 2;
      let sum = createVector();
      let count = 0;
      // For every vehicle in the system, check if it's too close
      for (let other of vehicles) {
        let d = p5.Vector.dist(this.position, other.position);
        // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
        if (this != other && d < desiredSeparation) {
          // Calculate vector pointing away from neighbor
          let diff = p5.Vector.sub(this.position, other.position);
          diff.setMag(1 / d); // Weight by distance
          sum.add(diff);
          count++; // Keep track of how many
        }
      }
      // Average -- divide by how many
      if (count > 0) {
        sum.div(count);
        // Our desired vector is the average scaled to maximum speed
        sum.setMag(this.maxspeed);
        // Implement Reynolds: Steering = Desired - Velocity
        sum.sub(this.velocity);
        sum.limit(this.maxforce);
      }
      return sum;
    }
  
    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
    // seek(target) {
    //   let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  
    //   // Normalize desired and scale to maximum speed
    //   desired.normalize();
    //   desired.mult(this.maxspeed);
    //   // Steering = Desired minus velocity
    //   let steer = p5.Vector.sub(desired, this.velocity);
    //   steer.limit(this.maxforce); // Limit to maximum steering force
    //   return steer;
    // }
  
    // Method to update location
    update() {
      // Update velocity
      this.velocity.add(this.acceleration);
      // Limit speed
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      // Reset accelertion to 0 each cycle
      this.acceleration.mult(0);
    }
  
    show() {
      fill(0, 150);
      noStroke();
      push();
      translate(this.position.x, this.position.y);
      circle(0, 0, this.r+5);
      pop();
    }
  
    // Wraparound
    // borders() {
    //   if (this.position.x < -this.r) this.position.x = width + this.r;
    //   if (this.position.y < -this.r) this.position.y = height + this.r;
    //   if (this.position.x > width + this.r) this.position.x = -this.r;
    //   if (this.position.y > height + this.r) this.position.y = -this.r;
    // }

    //// bounce off edges??
    edges() {
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
  }
  