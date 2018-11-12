import matrix from './Matrix';
import system from './EqSystem';
import generator from './FunctionCreator';
import { tipo } from '../constants.json';

export default class Interpreter {

  constructor(discFun) {
    this.mat = [];
    this.x = discFun.xPoints;
    this.y = discFun.yPoints;
    this.gen = new generator();
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

    let fun = this.gen.generatePolynomial(coefArr);
    return fun;
  }

  createTrans(enabled, n) {
    let lnxi = [];
    let ylnxi = [];
    for (let i = 0; i < 3; i++) {
      lnxi.push(0);
      for (let j = 0; j < this.x.length; j++) {
        if (this.x[j] == 0) {
          return null;
        }
        lnxi[i] += 1/Math.pow(this.x[j], i*n);
      }
    }
    for (let i = 0; i < 2; i++) {
      ylnxi.push(0);
      for (let j = 0; j < this.y.length; j++) {
        if (this.x[j] == 0) {
          return null;
        }
        ylnxi[i] += 1/Math.pow(this.x[j], i*n) * this.y[j];
      }
    }
    // Fill matrix
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        this.mat.push(lnxi[i+j]);
      }
      this.mat.push(ylnxi[i]);
    }
    let objMat = new matrix(2, 3, this.mat);
    for(let i = enabled.length-1; i >= 0; i--) {
      if(enabled[i] == false){
        objMat.deleteRow(i);
        objMat.deleteColumn(i);
      }
    }
    let sys = new system(objMat, enabled);
    let coefArr = sys.solveSystem();
    return this.gen.generateTrans(coefArr, n);
  }

  createExponential(enabled, k) {
    let lnxi = [];
    let ylnxi = [];
    for (let i = 0; i < 3; i++) {
      lnxi.push(0);
      for (let j = 0; j < this.x.length; j++) {
        lnxi[i] += Math.pow(Math.exp(k * this.x[j]), i);
      }
    }
    for (let i = 0; i < 2; i++) {
      ylnxi.push(0);
      for (let j = 0; j < this.y.length; j++) {
        ylnxi[i] += Math.pow(Math.exp(k * this.x[j]), i) * this.y[j];
      }
    }
    // Fill matrix
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        this.mat.push(lnxi[i+j]);
      }
      this.mat.push(ylnxi[i]);
    }
    let objMat = new matrix(2, 3, this.mat);
    for(let i = enabled.length-1; i >= 0; i--) {
      if(enabled[i] == false){
        objMat.deleteRow(i);
        objMat.deleteColumn(i);
      }
    }
    let sys = new system(objMat, enabled);
    let coefArr = sys.solveSystem();
    return this.gen.generateExp(coefArr, k);
  }

  createLogarithm(enabled, type, base = 10) {
    let lnxi = [];
    let ylnxi = [];
    for (let i = 0; i < 3; i++) {
      lnxi.push(0);
      for (let j = 0; j < this.x.length; j++) {
        if (this.x[i] <= 0) {
          return null;
        }
        if (type == tipo.Logaritmica) {
          lnxi[i] += Math.pow(Math.log(this.x[j])/Math.log(base), i);
        }else if (type == tipo.lnx) {
          lnxi[i] += Math.pow(Math.log(this.x[j]), i);
        }else if (type == tipo.NlogN) {
          lnxi[i] += Math.pow(this.x[j] * Math.log(this.x[j])/Math.log(base), i);
        }
      }
    }
    for (let i = 0; i < 2; i++) {
      ylnxi.push(0);
      for (let j = 0; j < this.y.length; j++) {
        if (type == tipo.Logaritmica) {
          ylnxi[i] += Math.pow(Math.log(this.x[j])/Math.log(base), i) * this.y[j];
        } else if (type == tipo.lnx) {
          ylnxi[i] += Math.pow(Math.log(this.x[j]), i) * this.y[j];
        } else if (type == tipo.NlogN) {
          ylnxi[i] += Math.pow(this.x[j] * Math.log(this.x[j])/Math.log(base), i) * this.y[j];
        }
      }
    }
    // Fill matrix
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        this.mat.push(lnxi[i+j]);
      }
      this.mat.push(ylnxi[i]);
    }
    let objMat = new matrix(2, 3, this.mat);
    for(let i = enabled.length-1; i >= 0; i--) {
      if(enabled[i] == false){
        objMat.deleteRow(i);
        objMat.deleteColumn(i);
      }
    }
    let sys = new system(objMat, enabled);
    let coefArr = sys.solveSystem();
    let fun = "";
    if (type == tipo.Logaritmica) {
      fun = this.gen.generateLogx(coefArr, base);
    }else if (type == tipo.lnx) {
      fun = this.gen.generateLnx(coefArr);
    }else if (type == tipo.NlogN) {
      fun = this.gen.generateNLogN(coefArr, base);
    }
    return fun;
  }

  createTrig(enabled, type) {
    let lnxi = [];
    let ylnxi = [];
    for (let i = 0; i < 3; i++) {
      lnxi.push(0);
      for (let j = 0; j < this.x.length; j++) {
        if (type == tipo.Trigonometrica1) {
          lnxi[i] += Math.pow(Math.sin(this.x[j]), i);
        }else if (type == tipo.Trigonometrica2) {
          lnxi[i] += Math.pow(Math.cos(this.x[j]), i);
        }
      }
    }
    for (let i = 0; i < 2; i++) {
      ylnxi.push(0);
      for (let j = 0; j < this.y.length; j++) {
        if (type == tipo.Trigonometrica1) {
          ylnxi[i] += Math.pow(Math.sin(this.x[j]), i) * this.y[j];
        } else if (type == tipo.Trigonometrica2) {
          ylnxi[i] += Math.pow(Math.cos(this.x[j]), i) * this.y[j];
        }
      }
    }
    // Fill matrix
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        this.mat.push(lnxi[i+j]);
      }
      this.mat.push(ylnxi[i]);
    }
    let objMat = new matrix(2, 3, this.mat);
    for(let i = enabled.length-1; i >= 0; i--) {
      if(enabled[i] == false){
        objMat.deleteRow(i);
        objMat.deleteColumn(i);
      }
    }
    let sys = new system(objMat, enabled);
    let coefArr = sys.solveSystem();
    if (type == tipo.Trigonometrica1) {
      return this.gen.generateSine(coefArr);
    }else if (type == tipo.Trigonometrica2) {
      return this.gen.generateCosine(coefArr);
    }
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