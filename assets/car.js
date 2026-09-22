class AutomaticCar {
  constructor() {
    this.gearRatios = [0, 3.8, 2.2, 1.5, 1.1, 0.8];
    // Vehicle state
    this.speed = 0;          // mph
    this.gear = 1;
    this.rpm = 0;

    this.accelerating = false;
    this.braking = false;

    // Limits
    this.maxSpeed = 130;

    // Rates (per frame)
    this.acceleration = 0.25;
    this.brakeForce = 0.6;
    this.coastDeceleration = 0.05;

    // Gear change thresholds (mph)
    this.upshift = [15, 30, 50, 70];
    this.downshift = [12, 25, 45, 65];
  }

  update() {

    // Accelerator
    if (keyIsDown(UP_ARROW)) {
      this.speed += this.acceleration;
      this.accelerating = true;
      this.braking = false;
    }
    // Brake
    else if (keyIsDown(DOWN_ARROW)) {
      this.speed -= this.brakeForce;
      this.accelerating = false;
      this.braking = true;
    }
    // Natural deceleration
    else {
      this.speed -= this.coastDeceleration;
      this.accelerating = false;
      this.braking = false;
    }

    // Clamp speed
    this.speed = constrain(this.speed, 0, this.maxSpeed);

    this.updateGear();

    let targetRPM = max(800, this.speed * this.gearRatios[this.gear] * 80);
    // Smooth the change
    this.rpm = lerp(this.rpm, targetRPM, 0.08);
  }

  updateGear() {

    // Upshift
    if (this.gear === 1 && this.speed > this.upshift[0]) {
      this.gear = 2;
    }
    else if (this.gear === 2 && this.speed > this.upshift[1]) {
      this.gear = 3;
    }
    else if (this.gear === 3 && this.speed > this.upshift[2]) {
      this.gear = 4;
    }
    else if (this.gear === 4 && this.speed > this.upshift[3]) {
      this.gear = 5;
    }

    // Downshift (hysteresis prevents gear hunting)
    else if (this.gear === 5 && this.speed < this.downshift[3]) {
      this.gear = 4;
    }
    else if (this.gear === 4 && this.speed < this.downshift[2]) {
      this.gear = 3;
    }
    else if (this.gear === 3 && this.speed < this.downshift[1]) {
      this.gear = 2;
    }
    else if (this.gear === 2 && this.speed < this.downshift[0]) {
      this.gear = 1;
    }
  }
}