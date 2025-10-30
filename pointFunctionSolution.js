function Point(x, y) {
    
    this.x = x;
    this.y = y;

    this.print = function() {
        console.log("(" + this.x + ", " + this.y + ")");
    };


    this.midpoint = function(p2){

        let midX = (this.x + p2.x) / 2;
        let midY = (this.y + p2.y) / 2;
        return new Point(midX, midY);

    };

    this.scaleTo = function(p2, s){
       
        let scaledX = this.x + (p2.x - this.x) * s;
        let scaledY = this.y + (p2.y - this.y) * s;
        return new Point(scaledX, scaledY);

    };
}


let p1 = new Point(1,5)
let p2 = new Point(5,7)
p1.midpoint(p2).print()
p2.midpoint(p1).print()

let p3 = new Point(0,0)
let p4 = new Point(4,8)
p3.scaleTo(p4,0.25).print(1,2)
p4.scaleTo(p3, 0.75).print()
