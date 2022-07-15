
class PoissonFoodGrid {
    constructor(worldHeight, worldWidth) {
        let _height = worldHeight;
        let _width = worldWidth;

        let _r;
        let _k;
        let _w;
        let _cols;
        let _rows;
        let grid = [];
        let active = [];


        console.log("Food Grid Created");
    }

    initPoissonAlgo(r, k) {
        _r = r;
        _k = k;
        _w = _r/Math.sqrt(2);

        _cols = floor(width/w)
        _rows = floor(height/w)

    }

    generateGrid(grid) {
        console.log("Grid Generated")
    }

    _distance(pos1, pos2) {
        return Math.sqrt((pos1.x - pos2.x)**2 + (pos1.y - pos2.y)**2)
      }
}