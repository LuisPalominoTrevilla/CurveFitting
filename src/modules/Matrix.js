export default class Matrix {

    /* CONSTRUCTORS */

    constructor(rows, cols, rowMajor) {
        this.m = rows;
        this.n = cols;
        this.matrix = rowMajor.slice(0);
    }

    /* GETTERS */

    get rows() {
        return this.m;
    }

    get cols() {
        return this.n;
    }

    /* ANALYZERS */

    getElement(i, j) {
        return this.matrix[i * this.n + j];
    }

    setElement(i, j, val) {
        this.matrix[i * this.n + j] = val;
    }

    GaussJordan() {
        const matrix = new Matrix(this.m, this.n, this.matrix);
        let pivot = 0;
        let factor = 0;
        let tol = 1.e-10;
        for (let i = 0; i < matrix.m; i++) {
            pivot = matrix.getElement(i, i);

            if (Math.abs(pivot) <= tol) {
                let k;
                for (k = i + 1; k < matrix.rows; k++) {
                    if (Math.abs(matrix.getElement(k, i)) > tol) {
                        matrix.exchangeRows(i, k);
                        pivot = matrix.getElement(i, i);
                        break;
                    }
                }
                if (k == matrix.rows) return null;
            }

            // make pivot equal to 1
            for (let j = 0; j < matrix.cols; j++) {
                matrix.setElement(i, j, matrix.getElement(i, j) / pivot);
            }
            for (let k = 0; k < matrix.rows; k++) {
                if (k != i) {
                    factor = -matrix.getElement(k, i);
                    for (let j = 0; j < matrix.cols; j++) {
                        matrix.setElement(k, j, matrix.getElement(i, j) * factor + matrix.getElement(k, j));
                    }
                }
            }
        }
        return matrix;
    }

    /* MODIFIERS */

    exchangeRows(r1, r2) {
        for (let j = 0; j < this.n; j++) {
            const tmp = this.getElement(r1, j);
            this.setElement(r1, j, this.getElement(r2, j));
            this.setElement(r2, j, tmp);
        }
    }

    sum(B) {
        if (B.rows == this.m && B.cols == this.n) {
            const newMatrix = this.matrix.map((val, index) => val + B.matrix[index]);
            return new Matrix(this.m, this.n, newMatrix);
        }
        return null;
    }

    multiply(B) {
        if (this.n == B.rows) {
            let newMatrix = [];
            for (let i = 0; i < this.m; i++) {
                for (let k = 0; k < B.cols; k++) {
                    let currSum = 0;
                    for (let j = 0; j < this.n; j++) {
                        currSum += this.getElement(i, j) * B.getElement(j, k);
                    }
                    newMatrix.push(currSum);
                }
            }
            return new Matrix(this.n, B.rows, newMatrix);
        }
        return null;
    }

    printMatrix() {
        for (let i = 0; i < this.m; i++) {
            let row = "";
            for (let j = 0; j < this.n; j++) {
                row += this.getElement(i, j) + " ";
            }
            console.log(row);
        }
    }

    deleteColumn(colNo) {
      var newMat = new Array((this.n-1)*this.m);
      var k = 0;

      for(var i = 0; i < this.n; i++) {
        if(i != colNo) {
          for(var j = 0; j < this.m; j++) {
            newMat[j * (this.n - 1) + k] = this.getElement(j, i);
          }
          k++;
        }
      }

      this.n--;
      this.matrix = newMat;
    }

    deleteRow(rowNo) {
      var newMat = [];

      for(var i = 0; i < this.m; i++) {
        if(i != rowNo) {
          for(var j = 0; j < this.n; j++) {
            newMat.push(this.getElement(i, j));
          }
        }
      }

      this.m--;
      this.matrix = newMat;
    }
}
