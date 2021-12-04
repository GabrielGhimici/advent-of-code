const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/input`)
});

const map = [];

readInterface.on('line', (line) => {
    map.push(line.split(''));
});

readInterface.on('close', () => {
    const asteroids = [];
    for(let i=0; i<map.length; i++) {
        for(let j=0; j<map[i].length; j++) {
            if (map[i][j] === '#') {
                asteroids.push({
                    position: {
                        x: j,
                        y: i
                    },
                    value: 0
                })
            }
        }
    }
    const info = computeAsteroidsDetected(asteroids);
    console.log(`Asteroids = ${info.value}`);
    console.log(`Positions _> X = ${info.position.x}, Y = ${info.position.y}`);
})

function computeSlope(p1, p2) {
    const numerator = p1.y - p2.y;
    const denominator = p1.x - p2.x;
    if (denominator === 0) {
        return null;
    }
    return numerator/denominator;
}

function pointOnLine(slope, p1, p2, point) {
    if (slope !== null) {
        return (point.y - p1.y) === slope*(point.x - p1.x);
    } else {
        return point.x === p1.x && 
               point.x === p2.x && 
               (point.y >= p1.y && point.y <= p2.y || point.y <= p1.y && point.y >= p2.y)
    }
}

function pointInBounding(p, p1, p2) {
    return (p.x >= p1.x && p.x <= p2.x || p.x <= p1.x && p.x >= p2.x) && 
           (p.y >= p1.y && p.y <= p2.y || p.y <= p1.y && p.y >= p2.y)
}

function samePoint(p, p1) {
    return p.x === p1.x && p.y === p1.y
}

function computeAsteroidsDetected(asteroids) {
    const data = asteroids.slice();
    for(let i=0; i<data.length; i++) {
        for (let j=0; j<data.length; j++) {
            if (i != j) {
                const slope = computeSlope(data[i].position, data[j].position);
                const restrictedData = data.filter((val) => {
                    return pointInBounding(val.position, data[i].position, data[j].position) && 
                           !samePoint(val.position, data[i].position) &&
                           !samePoint(val.position, data[j].position)
                });
                const existingIntersection = restrictedData.reduce((acc, val) => {
                    return acc || pointOnLine(slope, data[i].position, data[j].position, val.position);
                }, false)
                if (!existingIntersection) {
                    data[i].value++
                }
            }
        }
    }
    data.sort((val1, val2) => val2.value - val1.value);
    return data[0];
}