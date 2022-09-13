const buttons= document.querySelectorAll('button');
const screenMid = document.querySelector('.screenMid');
const screenLeft = document.querySelector('.screenLeft');
const screenRight= document.querySelector('.screenRight');

let firstOperand = 0;
let secondOperand = 0;
let operator = '';
let isSecondOperand = false;

console.log(buttons);

buttons.forEach(button => button.addEventListener('click', e =>  buttonHandler(e)));

function buttonHandler(e){
    const buttonText = e.target.innerText;
    let screenText = screenMid.innerText;
    /*if(!isNaN(buttonText))
        {
            if(screenText==='0')
            {
                screenMid.innerText = '';
            }
            if(screenText.length <=22)
                screenMid.innerText += e.target.innerText;
        } */
    switch (true) {
        case (!isNaN(buttonText))   :
            if(screenText === "0" || screenRight.innerText !='' && !isSecondOperand)
               {
                   screenMid.innerText='';
                    isSecondOperand = true;
                    screenLeft.innerText = '';
               }
            if(screenMid.innerText.length < 22)
                screenMid.innerText += buttonText;
            if(screenRight.innerText != '')
                secondOperand = parseFloat(screenLeft.innerText + screenMid.innerText);
            else
                firstOperand = parseFloat(screenLeft.innerText + screenMid.innerText);
             
             break;
        case buttonText==="AC"  :
            clearAll();
            break;
        case buttonText==="+/-" :
            toggleMinusSign();
            break;
        case buttonText==="⌫"   : 
            clearOne();
            break;
        case buttonText==="."   :
            addDecimalPoint();
            break;
        case buttonText==="="   :
            operate(firstOperand, secondOperand, operator);
            break;
        default                 :
            addOperator(buttonText);  
    }
        

}

function operate(a, b, operator){
    let result = 0;
    switch (!isNaN(a) && !isNaN(b) && operator != ''){
        case operator === "%"   :
            result = calculatePercent(a, b);
            break;
        case operator === "÷"   :
            result = divide(a, b);
            break;
        case operator === "×"   :
            result = multiply(a, b);
            break;
        case operator === "-"   :
            result = substract(a, b);
            break;
        case operator === "+"   :
            result = add(a, b);
            break;
        default :
            break;
    }
    screenRight.innerText = '';
    screenLeft.innerText = '';
    isSecondOperand = false;
    screenMid.innerText = result;
    firstOperand = result;
}

function add(a, b){
    return a + b;
}

function substract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function calculatePercent(a, b){
    return (a / 100) * b;
}

function clearOne() {

        let str = (new String(screenMid.innerText)).slice(0,-1);
        screenMid.innerText = str != '' ? str : "0";

    
}

function clearAll() {
    screenLeft.innerText = "";
    screenMid.innerText = 0;
    screenRight.innerText = ""; 
    isSecondOperand = false;
    firstOperand = 0;
    secondOperand = 0;
    operator = '';
}

function addOperator(buttonText){
    if(isNaN(buttonText)){
        screenRight.innerText = buttonText;
        operator = buttonText;
        firstOperand = parseFloat(screenLeft.innerText + screenMid.innerText);
        isSecondOperand = false;
    }

}

function toggleMinusSign(){
    if(screenMid.innerHTML != 0 && screenLeft.innerText == '')
        screenLeft.innerText = '-';
    else
        screenLeft.innerText = '';
}

function addDecimalPoint() {
    let str= new String(screenMid.innerText);

    if(!str.includes('.') && str.length < 22)
        screenMid.innerText += ".";
    if(!isSecondOperand){
        screenMid.innerText = '0.';
        isSecondOperand = true;
    }
    

}