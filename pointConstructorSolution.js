let PointPrototype = {

    x: 0,
    y: 0,

    print: function() {
        console.log("(" + this.x + ", " + this.y + ")");
    }
    
};

function createPoint(x, y) {
    
    const obj = Object.create(PointPrototype);
    obj.x = x;
    obj.y = y;
    return obj;

}

let p1 = createPoint(3, 4);
p1.print();
p1 = createPoint(10, 15);
p1.print();
p1 = createPoint(-2, 8);
p1.print();

function Point(x, y) {

    this.x = x;
    this.y = y;

    this.print = function() {
        console.log("(" + this.x + ", " + this.y + ")");
    };
}

let p2 = new Point(3, 4);
p2.print();
p2 = new Point(10, 15);
p2.print();
p2 = new Point(-2, 8);
p2.print();
