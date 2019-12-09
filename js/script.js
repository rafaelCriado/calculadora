function createKeyboardListener(document) {
  const state = {
    observers: []
  };

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function notifyAll(command) {
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }
  document.addEventListener("keydown", handleKeydown);

  function handleKeydown(event) {
    event.preventDefault();
    const keyPressed = event.key;

    const command = {
      keyPressed
    };

    notifyAll(command);
  }

  return {
    subscribe
  };
}

function createVirtualKeyboardListener(document) {
  const buttons = document.querySelectorAll(`button`);
  const state = {
    observers: []
  };

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function notifyAll(command) {
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  buttons.forEach(bt => {
    bt.addEventListener("click", handleClick);
  });

  function handleClick() {
    const keyPressed = this.innerHTML;

    const command = {
      keyPressed
    };

    notifyAll(command);
  }

  return {
    subscribe
  };
}

class Validation {
  operators = ["+", "-", "*", "/", "."];
  numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  equals = ["=", "Enter"];
  clear = ["c", "C", "Backspace", "Delete"];

  isNumber = valor => (this.numbers.indexOf(valor) < 0 ? false : true);
  isOperator = valor => (this.operators.indexOf(valor) < 0 ? false : true);
  isEqual = valor => (this.equals.indexOf(valor) < 0 ? false : true);
  isClear = valor => (this.clear.indexOf(valor) < 0 ? false : true);
}

function Calculadora(document, validation) {
  const state = {
    display: null,
    expressao: ""
  };

  state.display = document.querySelector("#display>input");

  digitar = ({ keyPressed }) => {
    //Caso o primeiro digito for um operador
    if (state.expressao.length === 0 && !validation.isNumber(keyPressed)) {
      console.log("Primeiro item deve ser um numero");
    } else {
      //Usuario usou um numero
      if (validation.isNumber(keyPressed)) {
        setExpressao(keyPressed);
      }

      //Usuario usou um operador
      if (
        validation.isOperator(keyPressed) &&
        !validation.isOperator(lastDigit())
      ) {
        setExpressao(keyPressed);
      }

      //Usuario usou um clear
      if (validation.isClear(keyPressed)) {
        removeLastDigit();
      }

      //Usuario usuou o igual
      if (
        validation.isEqual(keyPressed) &&
        !validation.isOperator(lastDigit())
      ) {
        resultado();
      }
    }

    //Atualiza display
    renderDisplay();
  };

  resultado = () => {
    try {
      let resultado = eval(state.expressao);

      if (resultado == "Infinity") {
        throw new Error("Expressão invalida!");
      }

      state.expressao = resultado;
    } catch (error) {
      console.log(error);
    }
  };

  removeLastDigit = () => {
    state.expressao = String(state.expressao).substring(
      0,
      state.expressao.length - 1
    );
  };

  lastDigit = () => {
    if (state.expressao.length > 0) {
      console.log(state.expressao[state.expressao.length - 1]);
      return state.expressao[state.expressao.length - 1];
    }
    return;
  };

  renderDisplay = () => {
    state.display.value = state.expressao;
  };

  setExpressao = valor => {
    state.expressao = `${state.expressao}${valor}`;
  };

  return {
    digitar,
    state
  };
}
const validation = new Validation();
const calculadora = Calculadora(document, validation);

const keyboardListener = createKeyboardListener(document);
keyboardListener.subscribe(calculadora.digitar);

const virtualKeyboardListener = createVirtualKeyboardListener(document);
virtualKeyboardListener.subscribe(calculadora.digitar);
