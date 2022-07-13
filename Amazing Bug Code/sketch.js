
let blobs = [];

let blob = new Blob(550, 550, 25, 5000, 300, 1)
blobs.push(blob)
blob = new Blob(50, 50, 25, 5000, 300, 1)
blobs.push(blob)

let food = [];

function setup() {
  createCanvas(600, 600)
  background(0)
  for (i = 0; i < 50; i++) {
    let meal = new Food(random() * 600, random() * 600, 2500)
    food.push(meal)
  }
  frameRate(30)
}


function draw() {
  //Environment
  background(0)
  for (i = 0; i < food.length; i++) {
    food[i].draw()
  }
  for (i = 0; i < 1; i++) {
    let meal = new Food(random() * 600, random() * 600, 2500)
    food.push(meal)
  }

  //Blob
  for (b = 0; b < blobs.length; b++){
    for (i = food.length; i > 0; i--) {
      if (blobs[b].touching(food[i - 1])) {
        blobs[b].feed(food[i - 1].energy)
        food.splice(i - 1, 1);
      }
    }
    blobs[b].move(food);
    blobs[b].draw();
    blobs[b].reproduce(blobs)
    //console.log(blobs[b].energy)
  }
  for (b = blobs.length; b > 0; b--) {
    if (blobs[b - 1].isDead()) {
      blobs.splice(b - 1, 1);
    }
  }
  print("Population Size:", blobs.length)
}

