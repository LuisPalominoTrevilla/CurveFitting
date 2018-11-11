import matrix from './Matrix'
import system from './EqSystem'
import generator from './FunctionCreator'

export default class Interpreter {

  constructor(discFun) {
    this.mat = [];
    this.x = discFun.xPoints;
    this.y = discFun.yPoints;

  }

  createPolinomial(order, enabled) {

    for(let i = 0; i < order+1; i++) {
      this.mat.push(new Array(order+2));
    }

    for(let k of this.mat) {
      for(let i = 0; i < this.mat.length+1; i++) {
        k[i] = 0;
      }
    }

    for(let i = 0; i < order+1; i++) {
      this.fillRowAndResult(i, i, this.x, this.y, this.mat);
    }

    let objMat = new matrix(order+1, order+2, this.getRowMajorOrder());
    
    for(let i = enabled.length-1; i >= 0; i--) {
      if(enabled[i] == false){
        objMat.deleteRow(i);
        objMat.deleteColumn(i);
      }
    }
    
    let sys = new system(objMat, enabled);
    let coefArr = sys.solveSystem();
    let gen = new generator();

    let fun = gen.generatePolynomial(coefArr);
    
    return fun;
  }

  fillRowAndResult(i, j, x, y, mat) {

    for(let k = 0; k < mat.length; k++) {
      for(let xi of x) {
        mat[k][j] += Math.pow(xi, i);
      }

      i++;
    }

    for(let k = 0; k < x.length; k++) {
      mat[j][mat.length] += Math.pow(x[k], j)*y[k];
    }

  }

  getRowMajorOrder() {
    let rowMaj = [];

    for(let i = 0; i < this.mat.length; i++) {
      for(let j = 0; j < this.mat[0].length; j++) {
        rowMaj[i*this.mat[0].length+j] = this.mat[i][j];
      }
    }

    return rowMaj;
  }
}

/* 



x = [1, 2, 4, 7]
y = [-3, -5, 1, 3]
let mat = new Interpreter(x, y);
mat.createPolinomial(1, [false, true, true])

//let a = new matrix(2, 3, mat.getRowMajorOrder());

//console.log(a.getElement(1, 0))
//console.log(a.getElement(0, 2))
//a.printMatrix()

//a.deleteColumn(0)
//a.deleteRow(0)

//a.GaussJordan().printMatrix()
 */