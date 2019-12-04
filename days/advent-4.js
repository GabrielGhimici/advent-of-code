const lowerLimit = 193651;
const upperLimit = 649729;

function isAscSsorted(number) {
    const digits = `${number}`.split('').map((val) => Number(val));
    for(i=0; i<=digits.length - 1; i++) {
        if (digits[i] > digits[i+1]) {
            return false;
        }
    }
    return true;
}

function hasAtLeastOneDouble(number) {
    const digits = `${number}`.split('').map((val) => Number(val));
    for(i=0; i<=digits.length - 1; i++) {
        if (digits[i] === digits[i+1]) {
            return true;
        }
    }
    return false;
}

function hasDoublesComplex(number) {
    const digits = `${number}`.split('').map((val) => Number(val));
    const digitInfo = {};
    for(i=0; i<=digits.length - 1; i++) {
        if (!digitInfo[digits[i]]) {
            digitInfo[digits[i]] = 0;
        }
        digitInfo[digits[i]]++;
    }
    const digitKeys = Object.keys(digitInfo);
    for(let i=0; i<digitKeys.length; i++) {
        if (digitInfo[digitKeys[i]] === 2) {
            return true;
        }
    }
    return false;
}

function getResult1() {
    let number = 0;
    for(x=lowerLimit; x<=upperLimit; x++) {
        if (isAscSsorted(x) && hasAtLeastOneDouble(x)) {
            number++;
        }
    }
    console.log(number);
}

function getResult2() {
    let number = 0;
    for(x=lowerLimit; x<=upperLimit; x++) {
        if (isAscSsorted(x) && hasDoublesComplex(x)) {
            number++;
        }
    }
    console.log(number);
}

getResult1()
getResult2()