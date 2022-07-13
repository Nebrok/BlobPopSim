class Point {
    constructor(x,y,obj_data) {
        this.x = x
        this.y = y
        this.oD = obj_data
    } 
}

class Box {
    constructor(x,y,w,h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    contains(obj) {
        if (this.x-this.w <= obj.x && this.x+this.w > obj.x && this.y-this.h <= obj.y && this.y+this.h > obj.y) {
            return true 
        } else {
            // console.log(obj.x)
            return false
        }
    }

    draw() {
        push()
        rectMode(RADIUS)
        noFill()
        stroke(0,255,0)
        rect(this.x,this.y,this.w,this.h)
        pop()
    }

    intersects(range) {
        return !(
            range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h < this.y - this.h
        );
    }
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rSquared = this.r * this.r;
    }
  
    contains(point) {
        // check if the point is in the circle by checking if the euclidean distance of
        // the point and the center of the circle if smaller or equal to the radius of
        // the circle
        let d = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
        return d <= this.rSquared;
    }
  
    intersects(range) {
        var xDist = Math.abs(range.x - this.x);
        var yDist = Math.abs(range.y - this.y);
  
        // radius of the circle
        var r = this.r;
  
        var w = range.w;
        var h = range.h;
  
        var edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);
  
        // no intersection
        if (xDist > r + w || yDist > r + h) return false;
  
        // intersection within the circle
        if (xDist <= w || yDist <= h) return true;
  
        // intersection on the edge of the circle
        return edges <= this.rSquared;
    }
}

class QuadTree {
    constructor(capacity, box){
        this.cap = capacity
        this.area = box
        this.points = []


        this.northWest
        this.northEast
        this.southWest
        this.southEast
    }

    subdivide() {
        let nWbox = new Box(this.area.x-this.area.w/2, this.area.y-this.area.h/2,this.area.w/2,this.area.h/2)
        let nEbox = new Box(this.area.x+this.area.w/2, this.area.y-this.area.h/2,this.area.w/2,this.area.h/2)
        let sWbox = new Box(this.area.x-this.area.w/2, this.area.y+this.area.h/2,this.area.w/2,this.area.h/2)
        let sEbox = new Box(this.area.x+this.area.w/2, this.area.y+this.area.h/2,this.area.w/2,this.area.h/2)
        
        this.northWest = new QuadTree(this.cap,nWbox)
        this.northEast = new QuadTree(this.cap,nEbox)
        this.southWest = new QuadTree(this.cap,sWbox)
        this.southEast = new QuadTree(this.cap,sEbox)

        for (let p of this.points) {
            this.insert(p)
        }
        this.points = []
    }

    insert(obj) {
        if (!this.area.contains(obj)) {
            return false
        }
        if(this.northWest == null) {
            if (this.points.length < this.cap) {
                this.points.push(obj)
                return true
            }
            this.subdivide()
        }
        if(this.northWest.insert(obj)) {
            return true
        } else if (this.northEast.insert(obj)) {
            return true 
        } else if (this.southWest.insert(obj)) {
            return true
        } else if (this.southEast.insert(obj)) {
            return true
        }
        return false
    }

    search(zone, found) {
        if(!found) {
            found = []
        }

        if(!this.area.intersects(zone)) {
            return found
        }

        if(this.northWest == null) {
            for (let p of this.points) {
                if (zone.contains(p)) {
                    found.push(p)
                }
            }
            return found
        }  

        this.northWest.search(zone, found)
        this.northEast.search(zone, found)
        this.southWest.search(zone, found)
        this.southEast.search(zone, found) 

        return found
    }

    collate(pointList) {
        if (!pointList) {
            pointList = []
        }

        if (this.northWest == null) {
            for (let p of this.points){
                pointList.push(p)
            }
            return pointList
        } else {
            this.northWest.collate(pointList)
            this.northEast.collate(pointList)
            this.southWest.collate(pointList)
            this.southEast.collate(pointList)
        }

        return pointList

    }

    draw() {
        push()
        rectMode(RADIUS)
        noFill()
        stroke(255)
        strokeWeight(1)
        rect(this.area.x,this.area.y,this.area.w,this.area.h)
        pop()
        
        if(this.northWest){
            this.northWest.draw()
            this.northEast.draw()
            this.southWest.draw()
            this.southEast.draw()            
        }

        for (let p of this.points) {
            push()
            stroke(255)
            strokeWeight(2)
            point(p.x,p.y)
            pop()
        }
    }
}