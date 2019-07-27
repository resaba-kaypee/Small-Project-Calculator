class Calculator{
  constructor(prevOperandTxt, currOperandTxt){
    this.prevOperandTxt = prevOperandTxt;
    this.currOperandTxt = currOperandTxt;
    this.clear();
  }

  clear(){
    this.prevOperand = '';
    this.currOperand = '';
    this.operation = undefined;
  }

  delete(){
    this.currOperand = this.currOperand.toString().slice(0, -1)
  }

  appendNumber(number){
    if(number === '.' && this.currOperand.includes('.')) return;
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  chooseOperation(operation){
    if(this.currOperand === '') return;
    if(this.prevOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = '';
  }

  compute(){
    let computation;
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if(isNaN(prev) || isNaN(curr)) return;
    switch(this.operation){
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '÷':
        computation = prev / curr;
        break;
      case '*':
        computation = prev * curr;
        break;
      default:
        return;
    }
    this.currOperand = computation;
    this.operation = undefined;
    this.prevOperand = '';
  }

  getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if(isNaN(integerDigits)){
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currOperandTxt.innerText = this.getDisplayNumber(this.currOperand);
    if(this.operation != null){
      this.prevOperandTxt.innerText = 
      `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
    } else {
      this.prevOperandTxt.innerText = '';
    }
  }
}

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const prevOperandTxt = document.querySelector('[data-prev-operand]');
const currOperandTxt = document.querySelector('[data-curr-operand]');

const calculator = new Calculator(prevOperandTxt, currOperandTxt);
numberBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay();
  })
})

operationBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay();
  })
})

equalsBtn.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearBtn.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})