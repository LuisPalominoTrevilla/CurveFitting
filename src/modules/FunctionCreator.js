export default class FunctionCreator {
  
  generatePolynomial(coefArr) {
    let graph = "";
    let func = "";
    for(let i = 0; i < coefArr.length; i++) {
      if(coefArr[i] != 0) {
        graph += coefArr[i]+"x^"+i + "+";
        func += (i<=1)? (i == 0)?coefArr[i] + " + ": coefArr[i]+"x" + " + ":coefArr[i]+"x^"+i + " + ";
      }
    }
    return {graph: graph.slice(0, -1), func: func.slice(0, -2)};
  }

  generateLnx(coefArr) {
    return {graph: coefArr[0] + " + " + coefArr[1] + " * ln(x)", func: `${coefArr[0]} + ${coefArr[1]}lnx`};
  }

  generateTrans(coefArr, n) {
    return {graph: `${coefArr[0]} + ${coefArr[1]}* 1/x^${n}`, func: `${coefArr[0]} + ${coefArr[1]}* 1/x^${n}`};
  }

  generateExp(coefArr, k) {
    return {graph: `${coefArr[0]} + ${coefArr[1]}*exp(${k}*x)`, func: `${coefArr[0]} + ${coefArr[1]}e^(${k}x)`};
  }

  generateLogx(coefArr, base) {
    return {graph: `${coefArr[0]} + ${coefArr[1]} * log(x)/log(${base})`, func: `${coefArr[0]} + ${coefArr[1]}log_${base}(x)`};
  }

  generateNLogN(coefArr, base) {
    return {graph: `${coefArr[0]} + ${coefArr[1]} * x*log(x)/log(${base})`, func: `${coefArr[0]} + ${coefArr[1]}xlog_${base}(x)`};
  }

  generateSine(coefArr) {
    return {graph: `${coefArr[0]} + ${coefArr[1]}*sin(x)`, func: `${coefArr[0]} + ${coefArr[1]}sin(x)`};
  }

  generateCosine(coefArr) {
    return {graph: `${coefArr[0]} + ${coefArr[1]}*cos(x)`, func: `${coefArr[0]} + ${coefArr[1]}cos(x)`};
  }

  generateCosineSine(coefArr) {
    return {graph: `${coefArr[0]} + ${coefArr[1]}*sin(x) + ${coefArr[2]}*cos(x)`, func: `${coefArr[0]} + ${coefArr[1]}sin(x) + ${coefArr[2]}cos(x)`};
  }
}
