const input = await Deno.readTextFile("./input.txt");

const knots: [number, number][] = Array.from(Array(10), () => new Array(2).fill(0)) as [number, number][];

function moveTail([tx, ty]: [number, number], [hx, hy]: [number, number]): [number, number] {
    const [dx, dy] = [hx - tx, hy - ty] 

    if (Math.abs(dx) < 2 
        && Math.abs(dy) < 2
        && Math.abs(dx) + Math.abs(dy) < 3
    ) {
        return [tx, ty];
    }

    if (dx !== 0) {
        tx += dx / Math.abs(dx);
    } if (dy !== 0) {
        ty += dy / Math.abs(dy);
    }

    return [tx, ty];
}


const visitedStr = new Set<string>();

input.split(/\r?\n/).forEach(line => {
    const [direction, stepsStr] = line.split(' ');
    const steps = parseInt(stepsStr);

    let [dx, dy] = [0, 0];
    if (direction === 'R') {
        dx = 1;
    } else if (direction === 'D') {
        dy = 1;
    } else if (direction === 'L') {
        dx = -1;
    } else if (direction === 'U') {
        dy = -1;
    }

    for (let i = 0;  i < steps; i++ ) {
        knots[0][0] += dx;
        knots[0][1] += dy;
        for (let k = 1; k < knots.length; k++) {
           knots[k] = moveTail(knots[k], knots[k-1]);
        }    
        visitedStr.add(`${knots[9][0]};${knots[9][1]}`);
    }
});

console.log(visitedStr.size);