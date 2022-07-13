class Blob {
  constructor(x, y, size, energy, range, speed, colour) {
    this.x = x
    this.y = y
    this.size = size
    this.range = range
    this.speed = speed
    this.energy = energy

    //this.colour = [230, 125, 125]
    this.colour = colour
    this.mood = "certain"
    
    if (this.speed < 0) {
      this.speed = 0.1
    }
    if (this.size < 2) {
      this.size = 2
    }


    this.ePs = ((this.range + this.size) * this.speed) / 10
  }

  draw(screenx_off, screeny_off) {
    push()
    if (this.mood == "certain") {
      fill(this.colour)
    } else if (this.mood == "confused") {
      fill(255,100,70)
    }
    ellipse(this.x - screenx_off, this.y - screeny_off, this.size)
    pop()
  }

  detect_closest_object(arry) {
    let storedMag = 1000000;
    let nearestOb = 0;
    for (i = 0; i < arry.length; i++) {
      if (!arry[i].eaten) {
        let x_diff = abs(arry[i].x - this.x)
        let y_diff = abs(arry[i].y - this.y)

        let meg = sqrt((x_diff ** 2 + y_diff ** 2));
        if (meg < storedMag) {
          storedMag = meg
          nearestOb = arry[i]
        }
      }
      
    }
    if (storedMag > this.range) {
      this.mood = "confused"
      return "None"
    }
    this.mood = "certain"
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

    if (meg < this.size / 2) {
      return true
    } else {
      return false
    }
  }

  feed(energyGained) {
    this.energy += energyGained
  }

  reproduce(blobArray) {
    if (this.energy > 10000) {
      for (i = 0; i < 2; i++) {
        let mutationChance = 0.75
        let check = random()
        if (check < mutationChance) {
          let blob = new Blob(this.x + random(-75, 75), this.y + random(-75, 75), this.size + random(-2, 2), this.energy / 2, this.range + random(-25, 25), this.speed + random(-0.1, 0.1), this.colour)
          blobArray.push(blob)
        } else {
          let blob = new Blob(this.x + random(-75, 75), this.y + random(-75, 75), this.size, this.energy / 2, this.range, this.speed, this.colour)
          blobArray.push(blob)
        }
      }
      this.energy -= (this.energy / 2)
    }
  }
}

