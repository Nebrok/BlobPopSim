
let blobs = [];

worldSize = [1500,1500]
canvasSize = [1500,1500]

//Mouse Drag Stuff
screenx = 50
screeny = 50
mouse_drag = false


let blob = new Blob(worldSize[0]-100, worldSize[1]-100, 15, 5000, 300, 1, [0,255,0])
blobs.push(blob)
blob = new Blob(100, 100, 15, 5000, 300, 1,[0,255,0])
blobs.push(blob)

let food = [];
let total_food_val_per_frame = 2500
let food_val = 1000
let fpf = total_food_val_per_frame / food_val


let iteration = 0
let frame_Count = 0

function setup() {
  createCanvas(canvasSize[0], canvasSize[1])
  background(0)
  for (i = 0; i < 50; i++) {
    let meal = new Food(random() * worldSize[0], random() * worldSize[1], 2500)
    food.push(meal)
  }

  //Mouse Drag Stuff
  last_mousex = mouseX;
  last_mousey = mouseY;

  // frameRate(30)
}


function draw() {
  if (blobs.length == 0) {
    blob = new Blob(worldSize[0]-100, worldSize[1]-100, 15, 5000, 300, 1, [0, 255, 0])
    blobs.push(blob)
    blob = new Blob(100, 100, 15, 5000, 300, 1, [0, 255, 0])
    blobs.push(blob)

    food = []
    total_food_val_per_frame = 2500
    food_val = 1000
    fpf = total_food_val_per_frame / food_val

    for (i = 0; i < 50; i++) {
      let meal = new Food(random() * worldSize[0], random() * worldSize[1], 2500)
      food.push(meal)
    }
    console.log("New Iteration")
    iteration += 1
    frame_Count = 0
  } else {
    //Environment
    total_food_val_per_frame = (40000 / blobs.length)
    fpf = 4
    food_val = total_food_val_per_frame / fpf
    
    background(0)
    border(screenx, screeny)

    for (i = 0; i < food.length; i++) {
      food[i].draw(screenx, screeny)
    }
    for (i = 0; i < fpf; i++) {
      let meal = new Food(random() * worldSize[0], random() * worldSize[1], food_val)
      food.push(meal)
    }
    let zone = new Box(worldSize[0]/2,worldSize[1]/2,worldSize[0]/2,worldSize[1]/2)
    let qtree = new QuadTree(4,zone)
    for (let f of food) {
      nPoint = new Point(f.x,f.y,f)
      qtree.insert(nPoint)
    }
    //Blob
    for (b = 0; b < blobs.length; b++) {
      vision = new Circle(blobs[b].x,blobs[b].y,blobs[b].range)
      close_food = qtree.search(vision)
      for (let f of close_food) {
        if (blobs[b].touching(f.oD) && !f.oD.eaten) {
          blobs[b].feed(f.oD.energy)
          f.oD.changeState(true)
        }
      }
      blobs[b].move(close_food);
      blobs[b].draw(screenx, screeny);
      blobs[b].reproduce(blobs)
    }
    for (b = blobs.length; b > 0; b--) {
      if (blobs[b - 1].isDead()) {
        blobs.splice(b - 1, 1);
      }
    }
    for (f = food.length; f > 0; f--) {
      if (food[f - 1].eaten) {
        food.splice(f - 1, 1);
      }
    }

    // qtree.draw()

    let avgSpeed = 0
    let avgRange = 0
    let avgSize = 0
  
    for (i = 0; i < blobs.length; i++) {
      avgSpeed += blobs[i].speed
      avgRange += blobs[i].range
      avgSize += blobs[i].size
    }

    avgSpeed = avgSpeed / blobs.length
    avgRange = floor(avgRange / blobs.length)
    avgSize = floor(avgSize / blobs.length)

    console.log("Iteration Number:", iteration)
    console.log("Frames Population Survived:", frame_Count)
    console.log("Population Size:", blobs.length)
    console.log("Average Speed:", avgSpeed)
    console.log("Average Range:", avgRange)
    console.log("Average Size:", avgSize)
    console.log("Food Per Frame:", fpf)
    console.log("Value of Food", food_val)
    console.log("Total Value of Food pf:", total_food_val_per_frame)
    console.log(food.length)
    console.log(frameRate())
    frame_Count += 1

    if (frameCount%1000 == 0) {
      console.clear()
    }
  }
}

//Mouse Drag Stuff
function mousePressed() {
  if (mouseX < canvasSize[0]) {
    if (mouseY < canvasSize[1]) {
      mouse_drag = true
      last_mousex = mouseX;
      last_mousey = mouseY;
    } else {
      mouse_drag = false
    }
  } else {
    mouse_drag = false
  }
  
}

function mouseReleased() {
  if (mouse_drag) {
    x_diff = last_mousex - mouseX;
    y_diff = last_mousey - mouseY;

    addToOff("x", x_diff)
    addToOff("y", y_diff)
  }
}

function border(screenx_off, screeny_off) {
  push()
  noFill()
  stroke(255)
  rect(0 - screenx_off, 0 - screeny_off, worldSize[0], worldSize[1])
  pop()
}

function addToOff(dimen, value) {
  if (dimen === "x") {
    screenx += value
  } else if (dimen === "y") {
    screeny += value
  }
}

