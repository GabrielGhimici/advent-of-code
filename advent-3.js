// const wire1 = "R75,D30,R83,U83,L12,D49,R71,U7,L72,U62,R66,U55,R34,D71,R55,D58,R83";
// const wire2 = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51,U98,R91,D20,R16,D67,R40,U7,R15,U6,R7"
const wire1 = "R8,U5,L5,D3";
const wire2 = "U7,R6,D4,L4";

function computeCoordinates(wire) {
    const origin = {x: 0, y: 0};
    return wire
        .split(',')
        .map((value) => {
            const dir = value[0];
            const val = Number(value.substring(1))
            return {
                direction: dir,
                value: val
            };
        })
        .map((el) => {
            switch(el.direction) {
                case 'D':
                    origin.y = origin.y - el.value;
                    break;
                case 'U':
                    origin.y = origin.y + el.value;
                    break;
                case 'L':
                    origin.x = origin.x - el.value;
                    break;
                case 'R':
                    origin.x = origin.x + el.value;
                    break;
                default:
                    break;
            }
            return {
                x: origin.x,
                y: origin.y
            }
        })
}

console.log(computeCoordinates(wire1));
console.log(computeCoordinates(wire2));