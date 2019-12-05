const defaultMemory = [3,225,1,225,6,6,1100,1,238,225,104,0,1001,92,74,224,1001,224,-85,224,4,224,1002,223,8,223,101,1,224,224,1,223,224,223,1101,14,63,225,102,19,83,224,101,-760,224,224,4,224,102,8,223,223,101,2,224,224,1,224,223,223,1101,21,23,224,1001,224,-44,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,1102,40,16,225,1102,6,15,225,1101,84,11,225,1102,22,25,225,2,35,96,224,1001,224,-350,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,1101,56,43,225,101,11,192,224,1001,224,-37,224,4,224,102,8,223,223,1001,224,4,224,1,223,224,223,1002,122,61,224,1001,224,-2623,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1,195,87,224,1001,224,-12,224,4,224,1002,223,8,223,101,5,224,224,1,223,224,223,1101,75,26,225,1101,6,20,225,1102,26,60,224,101,-1560,224,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,108,677,226,224,102,2,223,223,1006,224,329,1001,223,1,223,1108,226,677,224,1002,223,2,223,1006,224,344,101,1,223,223,7,226,677,224,102,2,223,223,1006,224,359,1001,223,1,223,1007,226,677,224,1002,223,2,223,1006,224,374,1001,223,1,223,1108,677,226,224,102,2,223,223,1005,224,389,1001,223,1,223,107,226,226,224,102,2,223,223,1006,224,404,101,1,223,223,1107,226,226,224,1002,223,2,223,1005,224,419,1001,223,1,223,1007,677,677,224,102,2,223,223,1006,224,434,101,1,223,223,1107,226,677,224,1002,223,2,223,1006,224,449,101,1,223,223,107,677,677,224,102,2,223,223,1005,224,464,1001,223,1,223,1008,226,226,224,1002,223,2,223,1005,224,479,101,1,223,223,1007,226,226,224,102,2,223,223,1005,224,494,1001,223,1,223,8,677,226,224,1002,223,2,223,1005,224,509,1001,223,1,223,108,677,677,224,1002,223,2,223,1005,224,524,1001,223,1,223,1008,677,677,224,102,2,223,223,1006,224,539,1001,223,1,223,7,677,226,224,1002,223,2,223,1005,224,554,101,1,223,223,1108,226,226,224,1002,223,2,223,1005,224,569,101,1,223,223,107,677,226,224,102,2,223,223,1005,224,584,101,1,223,223,8,226,226,224,1002,223,2,223,1005,224,599,101,1,223,223,108,226,226,224,1002,223,2,223,1006,224,614,1001,223,1,223,7,226,226,224,102,2,223,223,1006,224,629,1001,223,1,223,1107,677,226,224,102,2,223,223,1005,224,644,101,1,223,223,8,226,677,224,102,2,223,223,1006,224,659,1001,223,1,223,1008,226,677,224,1002,223,2,223,1006,224,674,1001,223,1,223,4,223,99,226];

function intCodeComputer(source, input) {
    const newSource = source.slice();
    let index = 0;
    while (index < newSource.length) {
        if (newSource[index] === 99) {
            break;
        } else if (newSource[index] === 1) {
            const fnSum = newSource[index+1];
            const snSum = newSource[index+2];
            const tSum = newSource[index+3];
            newSource[tSum] = newSource[fnSum] + newSource[snSum];
            index+=4;
        } else if (newSource[index] === 2) {
            const fnMul = newSource[index+1];
            const snMul = newSource[index+2];
            const tMul = newSource[index+3];
            newSource[tMul] = newSource[fnMul] * newSource[snMul];
            index+=4;
        } else if (newSource[index] === 3) {
            const sPosition = newSource[index+1];
            newSource[sPosition] = input;
            index+=2
        } else if (newSource[index] === 4) {
            const wPosition = newSource[index+1];
            console.log('[OUT-O]:_> ', newSource[wPosition]);
            index+=2
        } else {
            const param = `${newSource[index]}`;
            let p1Mode = null;
            let p2Mode = null;
            let p3Mode = null;
            let optcode = null;
            if (param.length === 5) {
                p3Mode = Number(param.substr(0, 1));
                p2Mode = Number(param.substr(1, 1));
                p1Mode = Number(param.substr(2, 1));
                optcode = Number(param.substr(3, 2));
                console.log('P', p1Mode, p2Mode, p3Mode, optcode);
                console.log('RP', param.substr(0, 1), param.substr(1, 1), param.substr(2, 1), param.substr(3, 2));
            } else if (param.length === 4) {
                p3Mode = 0;
                p2Mode = Number(param.substr(0, 1));
                p1Mode = Number(param.substr(1, 1));
                optcode = Number(param.substr(2, 2));
                console.log('P', p1Mode, p2Mode, p3Mode, optcode);
                console.log('RP', param.substr(0, 1), param.substr(1, 1), param.substr(2, 2));
            } else if (param.length === 3) {
                p3Mode = 0;
                p2Mode = 0;
                p1Mode = Number(param.substr(0, 1));
                optcode = Number(param.substr(1, 2));
                console.log('P', p1Mode, p2Mode, p3Mode, optcode);
                console.log('RP', param.substr(0, 1), param.substr(1, 2));
            } else {
                p3Mode = 0;
                p2Mode = 0;
                p1Mode = 0
                optcode = Number(param);
                console.log('P', p1Mode, p2Mode, p3Mode, optcode);
                console.log('RP', param);
            }
            if (optcode === 99) {
                break;
            } else if (optcode === 1) {
                const fnSum = p1Mode === 0 ? newSource[index+1] : index+1;
                const snSum = p2Mode === 0 ? newSource[index+2] : index+2;
                const tSum = p3Mode === 0 ? newSource[index+3] : index+3;
                newSource[tSum] = newSource[fnSum] + newSource[snSum];
                index+=4;
            } else if (optcode === 2) {
                const fnMul = p1Mode === 0 ? newSource[index+1] : index+1;
                const snMul = p2Mode === 0 ? newSource[index+2] : index+2;
                const tMul = p3Mode === 0 ? newSource[index+3] : index+3;
                newSource[tMul] = newSource[fnMul] * newSource[snMul];
                index+=4;
            } else if (optcode === 3) {
                const sPosition = newSource[index+1];
                newSource[sPosition] = input;
                console.log('input');
                index+=2
            } else if (optcode === 4) {
                const wPosition = newSource[index+1];
                console.log('[OUT-I]:_> ', newSource[wPosition]);
                index+=2
            } else {
                console.log("Something went wromg");
                break;
            }
        }
    }
}

intCodeComputer(defaultMemory, 1);