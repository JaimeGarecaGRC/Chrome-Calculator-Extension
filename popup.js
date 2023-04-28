
const numbers = document.getElementsByClassName("number");

const formula = document.getElementById("formula");
const clear = document.getElementById("clear");

let value = [0];
let index = 0;
let ini;

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", () => {
        ini = value[0] === 0 ? 1 : 10; 
        value[index] = parseInt(value[index]) * ini + parseInt(numbers[i].textContent);
        formula.textContent = value[index];
    });
}


clear.addEventListener("click", () => {
    value = [];
    index = 0;
    value[0] = 0;
    formula.textContent = value[index];
})


