export default class EqSystem {
  constructor(matrix, enabled) {
    this.matrix = matrix;
    this.enabled = enabled;
  }

  solveSystem() {
    let solvedMat = this.matrix.GaussJordan();
    if (!solvedMat) {
      // eslint-disable-next-line
      return this.enabled.map(item => {
        return 0;
      });
    }
    let cols = this.matrix.cols;

    let i = 0
    let j = 0

    let coefArr = []
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

    return coefArr;
  }
}
