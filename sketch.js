let car;                            //variables start with 'let'
let h = 0;                          // variables at the top is a 'global variable' for height (of speed rectangle)
let font;

async function setup() {                  //happens once when it first runs
    createCanvas(800, 600);
    car = new AutomaticCar();       // speed, gear, rpm
    font = await loadFont('/assets/DS-DIGI.ttf');
    textFont(font);
}

function draw() {                   //runs at 60frmes per minute, draws it over and over again
    background(0, 64, 46, 64);
    car.update();                   //update the current status of the car - calling a function in the car class to calculate current speed, gear...

    fill(140, 190, 140);            //text colour RGB
    textSize(50)
    text(ceil(car.speed), width * 0.3, height * 0.60);        //displays the car.update functions  
    textSize(30)
    text("MPH", width * 0.385, height * 0.60);

    textSize(60)
    text(car.gear, width * 0.45, height * 0.70);
    textSize(30)
    text("GEAR", width * 0.5, height * 0.70);
    textSize(50)
    text(ceil(car.rpm), width * 0.60, height * 0.60);         //"ceil" rounds up whatever is in the brackets, "floor" rounds down
    textSize(30)
    text("RPM", width * 0.73, height * 0.60);

    fill(35, 169, 242)
    textSize(80)
    if(car.accelerating) text("Accelelerating", width * 0.19, height * 0.85);            //boulions - either true of false
    fill(238, 75, 43)
    if(car.braking) text("Braking", width * 0.35, height * 0.85);               //putting in height * ... or width * ... so the sizes stay the same on every screen

    fill(140, 90, 140);                          //colour RGB
    h = map(car.speed, 0, 130, 0, -(height - 40));         //first two left numbers are the speed (max 130mph), two right numbers are height of speedomiter (max 560)
    rect(width * 0.30, height * 0.50, 80, h * 0.5);                        //draw rectagle to visualise that

    fill(32);
    arc(width * 0.65, height * 0.5, height * 0.33, height * 0.33, PI, TWO_PI);      //this line fills in the speedomiter with another colour
    fill(132, 164, 223);                                                            
    let stopAngle = map(car.rpm, 0, 8720, PI, TWO_PI);      //mapping the arc to the rpm
    arc(width * 0.65, height * 0.5, height * 0.33, height * 0.33, PI, stopAngle); //frawing the arc
}                                                //the order that the code is in matters as it gets drawn in that order so if something is hiding something, I need to change the order of the code
