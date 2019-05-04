var primeFactors;
var product;

function getPrimeFactorization() {
  var input = document.getElementById("input").value;
  primeFactors = [];
  clearResults();
  factorNumber(input);
  primeFactors.sort(function(a, b) {
    return a - b;
  });
  if(shouldShowLargeIntegerInfo(input)){
    showWarning();
    showProduct();
  }
  document.getElementById("result").innerHTML = primeFactors;
}

function clearResults() {
  document.getElementById("result").innerHTML = "";
  document.getElementById("product").innerHTML = "";
  document.getElementById("warning").style.display = "none";
}
  
function shouldShowLargeIntegerInfo(input) {
  if(input.toString().length > 15) {
    return true;
  }
}

function showWarning() {
  document.getElementById("warning").style.display = "inline";
}

function showProduct() {
  product = getProduct();
  document.getElementById("product").innerHTML = "The product is: " + product;
}

function getProduct() {
  var product = 1;
  for(i = 0; i < primeFactors.length; i++) {
    product = product * primeFactors[i];
  }
  return product;
}

// The algorithm
function factorNumber(input) {
  if(input == 1) {
    return;
  }
  if(isPrime(input)) {
    primeFactors.push(" " + input + " ");
    return;
  }
  var divisor = rho(input, f);
  factorNumber(divisor);
  factorNumber(input / divisor);
}

function isPrime(input) {
  for(i = 2; i <= Math.sqrt(input); i++) {
    if (input % i == 0) {
      return false;
    }
  }
  return true;
}

function rho(input, func) {
  var num1 = 2, num2 = 2, divisor;
  if(input % 2 == 0) {
    return 2;
  }
  do {
    num1 = func(num1) % input;
    num2 = func(func(num2)) % input;
    divisor = gcd(Math.abs(num1 - num2), input);
  } while (divisor == 1);
  
  if(divisor == input) {
    return rho(input, g);
  }
  return divisor;
}

function f(x) {
  return x*x - 1;
}

function g(x) {
  return x*x + 1;
}

function gcd(x, y) {
  if (x % y == 0) {
    return y
  } else {
    return gcd(y, x % y);
  }
}