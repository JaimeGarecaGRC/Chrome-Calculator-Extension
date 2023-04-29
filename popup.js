
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");

const formula = document.getElementById("formula");
const clear = document.getElementById("clear");

let value = [0];
let index = 0;
let ini;

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", () => {
        ini = value[index] === 0 ? 1 : 10; 
        value[index] = parseInt(value[index]) * ini + parseInt(numbers[i].textContent);
        formula.textContent = index === 0 ? value[index] : formula.textContent.slice(0, -(value[index].toString().length)) + value[index];
        
    });
}

for ( let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", () => {
        index++;
        value[index] = operators[i].textContent;
        formula.textContent = formula.textContent + value[index];
        index++;
        value[index] = 0;
    })
}

clear.addEventListener("click", () => {
    value = [];
    index = 0;
    value[0] = 0;
    formula.textContent = value[index];
})


