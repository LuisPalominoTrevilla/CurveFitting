const matrix = require("./Matrix")
const system = require("./EqSystem")
const generator = require("./FunctionCreator")

class Interpreter {

  constructor(x, y, order) {
    this.mat = [];
    this.x = x;
    this.y = y;

  }

  createPolinomial(order, enabled) {

    for(var i = 0; i < order+1; i++) {
      this.mat.push(new Array(order+2));
    }

    for(var k of this.mat) {
      for(var i = 0; i < this.mat.length+1; i++) {
        k[i] = 0;
      }
    }

    for(var i = 0; i < order+1; i++) {
      this.fillRowAndResult(i, i, this.x, this.y, this.mat);
    }

    var objMat = new matrix(order+1, order+2, this.getRowMajorOrder());

    objMat.printMatrix();

    for(var i = enabled.length-1; i >= 0; i--) {
      if(enabled[i] == false){
        objMat.deleteRow(i);
        objMat.deleteColumn(i);
      }
    }

    objMat.printMatrix();
    var sys = new system(objMat, enabled);
    var coefArr = sys.solveSystem();

    var gen = new generator();

    var fun = gen.generatePolynomial(coefArr);
    
    console.log(fun);
  }

  fillRowAndResult(i, j, x, y, mat) {

    for(var k = 0; k < mat.length; k++) {
      for(var xi of x) {
        mat[k][j] += Math.pow(xi, i);
      }

      i++;
    }

    for(var k = 0; k < x.length; k++) {
      mat[j][mat.length] += Math.pow(x[k], j)*y[k];
    }

    console.log(mat);
  }

  getRowMajorOrder() {
    var rowMaj = [];

    for(var i = 0; i < this.mat.length; i++) {
      for(var j = 0; j < this.mat[0].length; j++) {
        rowMaj[i*this.mat[0].length+j] = this.mat[i][j];
      }
    }

    return rowMaj;
  }
}





x = [1, 2, 4, 7]
y = [-3, -5, 1, 3]
var mat = new Interpreter(x, y);
mat.createPolinomial(1, [false, true, true])

//var a = new matrix(2, 3, mat.getRowMajorOrder());

//console.log(a.getElement(1, 0))
//console.log(a.getElement(0, 2))
//a.printMatrix()

//a.deleteColumn(0)
//a.deleteRow(0)

//a.GaussJordan().printMatrix()
