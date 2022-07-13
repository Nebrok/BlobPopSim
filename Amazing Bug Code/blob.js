class Blob {
  constructor(x, y, size, energy, range, speed) {
    this.x = x
    this.y = y
    this.size = size
    this.range = range
    this.speed = speed
    this.energy = energy

    //this.colour = [230, 125, 125]
    this.colour = [0,255,0]


    this.ePs = ((this.range + this.size) * this.speed)/10

    //this.shrek = loadImage("shrek.png")
  }

  draw() {
    push()
    fill(this.colour)
    ellipse(this.x, this.y, this.size)
    //image(this.img, this.x, this.y)
    pop()
  } 

  detect_closest_object(arry) {
    let storedMag = 1000000;
    let nearestOb = 0;
    for (i = 0; i < arry.length; i++) {
      let x_diff = abs(arry[i].x - this.x)
      let y_diff = abs(arry[i].y - this.y)

      let meg = sqrt((x_diff ** 2 + y_diff ** 2));
      if (meg < storedMag) {
        storedMag = meg
        nearestOb = arry[i]
      }
    }
    if (storedMag > this.range) {
      return "None"
    }
    return [nearestOb, storedMag]
  }

  isDead() {
    if (this.energy <= 0) {
      this.colour = (100, 100, 100)
      return true
    } else {
      return false
    }
  }

  move(arry) {
    if (this.isDead()) {
      
    } else {
      if (this.detect_closest_object(arry) == "None") {
        this.x += this.speed
        this.energy -= this.ePs
      } else {
        let nearestOb = this.detect_closest_object(arry)[0]
        let meg = this.detect_closest_object(arry)[1]

        let x_diff = abs(nearestOb.x - this.x)
        let y_diff = abs(nearestOb.y - this.y)

        let x_step = (x_diff / (meg / this.speed))
        let y_step = (y_diff / (meg / this.speed))
        let dx;
        let dy;
    
        if (this.x < nearestOb.x) {
          dx = 1
        }
        else if (this.x == nearestOb.x) {
          x_step = 0
          dx = 1
        } else {
          dx = -1
        }
        if (this.y < nearestOb.y) {
          dy = 1
        }
        else if (this.y == nearestOb.y) {
          y_step = 0
          dy = 1
        } else {
          dy = -1
        }

        this.x += (x_step * dx)
        this.y += (y_step * dy)
        this.energy -= this.ePs
      }
    }
  }

  touching(ob) {
    let x_diff = abs(ob.x - this.x)
    let y_diff = abs(ob.y - this.y)

    let meg = sqrt((x_diff ** 2 + y_diff ** 2));

    if (meg < this.size/2) {
      return true
    } else {
      return false
    }
  }

  feed(energyGained) {
    this.energy += energyGained
  }

  reproduce(blobArray){
    if (this.energy > 10000) {
      let mutationChance = 0.1
      let check = random()
      if (check < mutationChance) {
        let blob = new Blob(this.x + random(-75, 75), this.y + random(-75, 75), this.size + random(-5,5), this.energy/2, this.range + random(-25,25), this.speed + random(-0.5,0.5))
        this.energy -= (this.energy/2)
        blobArray.push(blob)
      } else {
        let blob = new Blob(this.x + random(-75, 75), this.y + random(-75, 75), this.size, this.energy/2, this.range, this.speed)
        this.energy -= (this.energy/2)
        blobArray.push(blob)
      }
    }
  }
}