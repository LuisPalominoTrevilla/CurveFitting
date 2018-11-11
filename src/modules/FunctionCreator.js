export default class FunctionCreator {
  generatePolynomial(coefArr) {
    var res = "";
    for(var i = 0; i < coefArr.length; i++) {
      if(coefArr[i] != 0) {
        res += coefArr[i]+"x^"+i + "+";
      }
    }
    return res.slice(0, -1);
  }
}
