module.exports = class EqSystem {
  constructor(matrix, enabled) {
    this.matrix = matrix;
    this.enabled = enabled;
  }

  solveSystem() {
    var solvedMat = this.matrix.GaussJordan();
    var cols = this.matrix.cols;
    console.log(cols);

    var i = 0
    var j = 0

    var coefArr = []
    while(i < solvedMat.rows || j < this.enabled.length-1) {
      if(this.enabled[j] == false) {
        coefArr.push(0);
        j++;
      } else {
        coefArr.push(solvedMat.getElement(i, cols-1));
        j++;
        i++;
      }
    }

    console.log(coefArr);

    return coefArr;
  }
}
