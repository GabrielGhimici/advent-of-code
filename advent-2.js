let defaultMemory = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,1,5,19,23,1,23,6,27,1,5,27,31,1,31,6,35,1,9,35,39,2,10,39,43,1,43,6,47,2,6,47,51,1,5,51,55,1,55,13,59,1,59,10,63,2,10,63,67,1,9,67,71,2,6,71,75,1,5,75,79,2,79,13,83,1,83,5,87,1,87,9,91,1,5,91,95,1,5,95,99,1,99,13,103,1,10,103,107,1,107,9,111,1,6,111,115,2,115,13,119,1,10,119,123,2,123,6,127,1,5,127,131,1,5,131,135,1,135,6,139,2,139,10,143,2,143,9,147,1,147,6,151,1,151,13,155,2,155,9,159,1,6,159,163,1,5,163,167,1,5,167,171,1,10,171,175,1,13,175,179,1,179,2,183,1,9,183,0,99,2,14,0,0];

function intCodeComputer(source, noun, verb) {
    const newSource = source.slice();
    newSource[1] = noun;
    newSource[2] = verb;
    for (let i = 0; i < newSource.length; i+=4) {
        if (newSource[i] === 99) {
            return newSource[0];
            break;
        } else if (newSource[i] === 1) {
            const fnSum = newSource[i+1];
            const snSum = newSource[i+2];
            const tSum = newSource[i+3];
            newSource[tSum] = newSource[fnSum] + newSource[snSum];
        } else if (newSource[i] === 2) {
            const fnMul = newSource[i+1];
            const snMul = newSource[i+2];
            const tMul = newSource[i+3];
            newSource[tMul] = newSource[fnMul] * newSource[snMul];
        } else {
            console.log("Something went wrong!");
            break;
        }
    }
}

console.log(intCodeComputer(defaultMemory, 12, 2));

function findTerms() {
    for(let i=0; i<=99; i++) {
        for(let j=0; j<=99; j++) {
            const result = intCodeComputer(defaultMemory, i, j);
            if (result === 19690720) {
                console.log(100*i + j)
                break;
            }
        }
    }
}

findTerms();