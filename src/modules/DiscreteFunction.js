export default class DiscreteFunction {
    
    constructor(points) {
        this.x = points.map(item => {
            return item[0];
        });
        this.y = points.map(item => {
            return item[1];
        });
    }

    get xPoints() {
        return this.x.slice(0);
    }

    get yPoints() {
        return this.y.slice(0);
    }

    get formattedPoints() {
        return this.x.map((item, index) => {
            return [item, this.y[index]]
        });
    }
}