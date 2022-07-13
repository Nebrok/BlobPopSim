class Food {
  constructor(x, y, energy) {
    this.x = x
    this.y = y
    this.energy = energy
    this.eaten = false
  }

  changeState(val) {
    if (val) {
      this.eaten = true
    } else if (!val) {
      this.eaten = false
    } else {
      console.log("None T/F val passed into changeState fucntion")
    }
  }

  draw(screenx_off,screeny_off) {
    push()
    fill(230) 
    noStroke()
    ellipse(this.x - screenx_off, this.y - screeny_off, 5)
    pop()
  } 
}