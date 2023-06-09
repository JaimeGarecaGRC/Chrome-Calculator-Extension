
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");

const formula = document.getElementById("formula");
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");

let value = [0];
let index = 0;
let ini;
let result = 0;

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
        value[index] = value[index].replace(/\s/g, "");
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

equal.addEventListener("click", () => {
    
    result = resolve(value);
    formula.textContent = result;
    value = [result];
    result = 0;
    index = 0;
    
})

function resolve(value){
    let simpliValue = [];
    let indx = 0;
    let lastPos = 0;
    let result;

    for(let i = 0; i < value.length; i++){
        if(value[i] === "/" || (i+1) === value.length){
            let tempValue = value.slice(lastPos, (i+1) === value.length ? i+1 : i );
            tempValue = raise(tempValue);
            tempValue = multiply(tempValue);
            simpliValue[indx] = addAndSub(tempValue);

            indx++;
            lastPos = i+1;
        }
    }

    if ( simpliValue.length === 1)
        result = simpliValue[0];

    if( simpliValue.length > 1){
        result = simpliValue[0];
        for(let i = 1; i < simpliValue.length; i++ ){
            result /= simpliValue[i];
        }
    }

    return result;
}

function multiply(value){
    for(let i = 0; i < value.length; i++){
        if(value[i] === "*"){
            value[i] = value[i-1] * value[i+1];
            value.splice(i+1, 1);
            value.splice(i-1, 1);
            i--;
        }
    }

    return value;
}

function raise(value){
    let pot = 0;
    for(let i = 0; i < value.length; i++){
        if(value[i] === "^"){
            value[i - 1] = value[ i-1 ] ** value[ i+1 ];
            // for(let i = 0; i < value[i + 1]; i++){
            //     value[i-1] *= pot; 
            //     console.log(value[i+1] *= pot);
            //}

            value.splice(i, 2);

            i--;
        }
    }

    return value;
}

function addAndSub(value){

    let res = 0;

    for(let i = 0; i < value.length; i++){
        if( typeof value[i] === "number" )
            res = value[i];
        else
            switch (true) {
                case (value[i] === "+"):
                    res += value[i+1];
                    i++;
                    break;
                case (value[i] ==="-"):
                    res -= value[i+1];
                    i++;
                    break;
                default:
                    console.log(value[i]);
                    break;
            }
    }

    return res;
}

