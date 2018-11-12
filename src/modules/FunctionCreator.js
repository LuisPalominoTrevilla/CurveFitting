export default class FunctionCreator {
  
  generatePolynomial(coefArr) {
    let res = "";
    for(let i = 0; i < coefArr.length; i++) {
      if(coefArr[i] != 0) {
        res += coefArr[i]+"x^"+i + "+";
      }
    }
    return res.slice(0, -1);
  }

  generateLnx(coefArr) {
    return coefArr[0] + " + " + coefArr[1] + " * ln(x)";
  }

  generateTrans(coefArr, n) {
    return `${coefArr[0]} + ${coefArr[1]}* 1/x^${n}`;
  }

  generateExp(coefArr, k) {
    return `${coefArr[0]} + ${coefArr[1]}*exp(${k}*x)`;
  }

  generateLogx(coefArr, base) {
    return coefArr[0] + " + " + coefArr[1] + " * log(x)/log("+base+")";
  }

  generateNLogN(coefArr, base) {
    return coefArr[0] + " + " + coefArr[1] + " * x*log(x)/log("+base+")";
  }

  generateSine(coefArr) {
    return `${coefArr[0]} + ${coefArr[1]}*sin(x)`;
  }

  generateCosine(coefArr) {
    return `${coefArr[0]} + ${coefArr[1]}*cos(x)`;
  }

  generateCosineSine(coefArr) {
    return `${coefArr[0]} + ${coefArr[1]}*sin(x) + ${coefArr[2]}*cos(x)`;
  }
}
