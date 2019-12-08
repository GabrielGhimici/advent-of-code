const defaultMemory = [3,8,1001,8,10,8,105,1,0,0,21,38,55,64,89,114,195,276,357,438,99999,3,9,101,3,9,9,102,3,9,9,1001,9,5,9,4,9,99,3,9,101,2,9,9,1002,9,3,9,101,5,9,9,4,9,99,3,9,101,3,9,9,4,9,99,3,9,1002,9,4,9,101,5,9,9,1002,9,5,9,101,5,9,9,102,3,9,9,4,9,99,3,9,101,3,9,9,1002,9,4,9,101,5,9,9,102,5,9,9,1001,9,5,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99];
const knownOptCodes = [1, 2, 3, 4, 5, 6, 7, 8, 99];
const order = [0, 1, 2, 3, 4];

let amplifierOutput = 0;

function processOptCode(memory, index, optcode, input, inputPointer, paramModes) {
    switch (optcode) {
        case 1: {
            const fnSum = paramModes[0] === 0 ? memory[index + 1] : index + 1;
            const snSum = paramModes[1] === 0 ? memory[index + 2] : index + 2;
            const tSum = paramModes[2] === 0 ? memory[index + 3] : index + 3;
            memory[tSum] = memory[fnSum] + memory[snSum];
            return index + 4;
        }
        case 2: {
            const fnMul = paramModes[0] === 0 ? memory[index + 1] : index + 1;
            const snMul = paramModes[1] === 0 ? memory[index + 2] : index + 2;
            const tMul = paramModes[2] === 0 ? memory[index + 3] : index + 3;
            memory[tMul] = memory[fnMul] * memory[snMul];
            return index + 4;
        }
        case 3: {
            const sPosition = paramModes[0] === 0 ? memory[index + 1] : index + 1;
            memory[sPosition] = input[inputPointer];
            inputPointer++;
            return index + 2;
        }
        case 4: {
            const wPosition = paramModes[0] === 0 ? memory[index + 1] : index + 1;
            amplifierOutput = memory[wPosition];
            return index + 2;
        }
        case 5: {
            const jumpTrueP1 = paramModes[0] === 0 ? memory[index + 1] : index + 1;
            const jumpTrueP2 = paramModes[1] === 0 ? memory[index + 2] : index + 2;
            if (memory[jumpTrueP1] !== 0) {
                return memory[jumpTrueP2];
            } else {
                return index + 3;
            }
        }
        case 6: {
            const jumpFalseP1 = paramModes[0] === 0 ? memory[index + 1] : index + 1;
            const jumpFalseP2 = paramModes[1] === 0 ? memory[index + 2] : index + 2;
            if (memory[jumpFalseP1] === 0) {
                return memory[jumpFalseP2];
            } else {
                return index + 3;
            }
        }
        case 7: {
            const lessThanP1 = paramModes[0] === 0 ? memory[index + 1] : index + 1;
            const lessThanP2 = paramModes[1] === 0 ? memory[index + 2] : index + 2;
            const lessThanP3 = paramModes[2] === 0 ? memory[index + 3] : index + 3;
            if (memory[lessThanP1] < memory[lessThanP2]) {
                memory[lessThanP3] = 1;
                return index + 4;
            } else {
                memory[lessThanP3] = 0;
                return index + 4;
            }
        }
        case 8: {
            const equalP1 = paramModes[0] === 0 ? memory[index + 1] : index + 1;
            const equalP2 = paramModes[1] === 0 ? memory[index + 2] : index + 2;
            const equalP3 = paramModes[2] === 0 ? memory[index + 3] : index + 3;
            if (memory[equalP1] === memory[equalP2]) {
                memory[equalP3] = 1;
                return index + 4;
            } else {
                memory[equalP3] = 0;
                return index + 4;
            }
        }
        case 99: {
            return null;
        }
        default: {
            console.log("Something went wrong");
            return null;
        }
    }
}

function processComplexState(param) {
    let p1Mode = null;
    let p2Mode = null;
    let p3Mode = null;
    let optcode = null;
    if (param.length === 5) {
        p3Mode = Number(param.substr(0, 1));
        p2Mode = Number(param.substr(1, 1));
        p1Mode = Number(param.substr(2, 1));
        optcode = Number(param.substr(3, 2));
    } else if (param.length === 4) {
        p3Mode = 0;
        p2Mode = Number(param.substr(0, 1));
        p1Mode = Number(param.substr(1, 1));
        optcode = Number(param.substr(2, 2));
    } else if (param.length === 3) {
        p3Mode = 0;
        p2Mode = 0;
        p1Mode = Number(param.substr(0, 1));
        optcode = Number(param.substr(1, 2));
    } else {
        p3Mode = 0;
        p2Mode = 0;
        p1Mode = 0
        optcode = Number(param);
    }
    return {
        optcode: optcode,
        paramModes: [p1Mode, p2Mode, p3Mode]
    }
}

function intCodeComputer(source, input) {
    const newSource = source.slice();
    let inputPointer = -1;
    let index = 0;
    while (index < newSource.length) {
        if (knownOptCodes.indexOf(newSource[index]) !== -1) {
            if (newSource[index] === 3) {
                inputPointer++;
            }
            const newIndexS = processOptCode(newSource, index, newSource[index], input, inputPointer, [0, 0, 0])
            if (newIndexS !== null) {
                index = newIndexS
            } else {
                break;
            }
        } else {
            const param = `${newSource[index]}`;
            const state = processComplexState(param);
            if (state.optcode === 3) {
                inputPointer++;
            }
            const newIndexC = processOptCode(newSource, index, state.optcode, input, inputPointer, state.paramModes);
            if (newIndexC !== null) {
                index = newIndexC
            } else {
                break;
            }
        }
    }
}

function permutations(list) {
	if (list.length == 0) {
        return [[]];
    }	
	const result = [];
	
	for (let i=0; i<list.length; i++) {
		const copy = list.slice();
		const head = copy.splice(i, 1);
		const rest = permutations(copy);
		for (let j=0; j<rest.length; j++) {
			const next = head.concat(rest[j]);
			result.push(next);
		}
	}
	return result;
}

function determineMaxTrusterPower(memory, order) {
    const posibleOrders = permutations(order);
    const signals = posibleOrders.map((or) => {
        return runAmplifiers(memory, or);
    });
    console.log(Math.max(...signals));
}

function runAmplifiers(memory, order) {
    amplifierOutput = 0;
    intCodeComputer(memory.slice(), [order[0], amplifierOutput]);
    intCodeComputer(memory.slice(), [order[1], amplifierOutput]);
    intCodeComputer(memory.slice(), [order[2], amplifierOutput]);
    intCodeComputer(memory.slice(), [order[3], amplifierOutput]);
    intCodeComputer(memory.slice(), [order[4], amplifierOutput]);
    console.log('E => ',amplifierOutput);
    return amplifierOutput;
}

determineMaxTrusterPower(defaultMemory, order);
