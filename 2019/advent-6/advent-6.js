const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/input`)
});

const arrContent = [];

readInterface.on('line', (line) => {
    arrContent.push(line);
});

readInterface.on('close', () => {
    const parsedList = arrContent.map((val, index) => {
        const splitVal = val.split(')');
        return {
            source: splitVal[0],
            target: splitVal[1]
        }
    })
    const tree = {};
    constructTree(tree, parsedList.slice(), 'COM', 0)
    console.log("CheckSum: ", checkSum(tree['COM'], 0));
    determineTransferNumber(tree)
})

function constructTree(tree, list, parentKey, level) {
    const usedElem = list.filter(elem => elem.source === parentKey);
    const remaining = list.filter(elem => elem.source !== parentKey);
    if (!tree[parentKey]) {
        tree[parentKey] = {
            value: level,
            children: {}
        };
    }
    if (usedElem.length === 0 && Object.keys(tree[parentKey].children).length === 0) {
        tree[parentKey].children = null
    }
    usedElem.forEach(elem => {
        constructTree(tree[parentKey].children, remaining, elem.target, level + 1);
    })
}

function checkSum(map) {
    if(map.children === null) {
        return map.value
    } else {
        const childrenSum = Object.keys(map.children).reduce((acc, val) => {
            acc = acc + checkSum(map.children[val])
            return acc;
        }, 0);
        return childrenSum + map.value
    }
}

function determineTransferNumber(map) {
    const pathToYou = ['COM', ...determinePath(map, 'YOU')];
    const pathToSanta = ['COM', ...determinePath(map, 'SAN')];
    pathToYou.pop();
    pathToSanta.pop();
    let divideIndex = 0;
    while(pathToYou[divideIndex] === pathToSanta[divideIndex]) {
        divideIndex++;
    }
    console.log("Minimum transfers: ", pathToSanta.length - divideIndex + pathToYou.length - divideIndex);
}

function determinePath(map, target, key = 'COM') {
    if (!map[key].children && key === target) {
        return [key];
    } else if (!map[key].children && key !== target){
        return [];
    } else {
        let result = [];
        Object.keys(map[key].children).forEach((k) => {
            const path = determinePath(map[key].children, target, k);
            if (path.length) {
                result = result.concat([], path.indexOf(k) !== -1 ? [] : [k], path);
            }
        })
        return result;
    }
}