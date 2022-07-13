class Food {
  constructor(x, y, energy) {
    this.x = x
    this.y = y
    this.energy = energy
  }

  draw() {
    push()
    fill(230)
    noStroke()
    ellipse(this.x, this.y, 5)
    pop()
  } 
}