const btNumeros = document.querySelectorAll("#bt");
const btSoma = document.getElementById("btSoma");
const btIgual = document.getElementById("btIgual");
const btLimpar = document.getElementById("btLimpar");
const btReset = document.getElementById("btReset");
const inputExpressao = document.getElementById("expressao");

class Calculadora {
  display = "";
  numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  operadores = ["+", "-", "*", "/", "="];

  digitar = valor => {
    this.display = `${this.display}${valor}`;
  };

  resultado = () => {
    this.display = eval(this.display);
  };
}

const calc = new Calculadora();
//Alimenta input
const digitar = function(valorBotao) {
  let textoExpressao = inputExpressao.value;
  let tamanhoTexto = textoExpressao.length;

  if (tamanhoTexto === 0 && !Number(valorBotao)) {
    return false;
  } else {
    let lastChar = textoExpressao[tamanhoTexto - 1];
    if (lastChar === "+" && valorBotao === "+") {
      return false;
    }

    let valorAtual = inputExpressao.value;
    inputExpressao.value = `${valorAtual}${valorBotao}`;
  }
};

const resultado = function() {
  try {
    let textoExpressao = inputExpressao.value;
    let tamanhoTexto = textoExpressao.length;

    let lastChar = textoExpressao[tamanhoTexto - 1];
    if (lastChar === "+") {
      alert("Ultimo caracter não pode ser um operador");
      return false;
    }
    let valorExpressao = inputExpressao.value;
    inputExpressao.value = eval(valorExpressao);
  } catch (error) {
    alert("Expressão Inválida");
  }
};

//recebe o evento dos botoes de numero
btNumeros.forEach(bt => {
  bt.addEventListener("click", function() {
    digitar(bt.innerHTML);
  });
});

//evento de click do botao somar
btSoma.addEventListener("click", function() {
  digitar(btSoma.innerHTML);
});

//evento de limpar campo
btReset.addEventListener("click", function() {
  inputExpressao.value = "";
});

//evento de limpar ultimo caracter digitado
btLimpar.addEventListener("click", function() {
  let texto = inputExpressao.value;
  texto = texto.substring(0, texto.length - 1);
  inputExpressao.value = texto;
});

//evento quando clica enter
inputExpressao.addEventListener("keypress", function(event) {
  if (event.code === "Enter" || event.code === "NumpadEnter") {
    resultado();
  }
});

//evento de click do botao igual
btIgual.addEventListener("click", function() {
  resultado();
});
