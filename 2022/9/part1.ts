const input = await Deno.readTextFile("./input.txt");

let [hx, hy] = [0, 0];
let [tx, ty] = [0, 0];

function moveTail() {
    const [dx, dy] = [hx - tx, hy - ty] 

    if (Math.abs(dx) < 2 
        && Math.abs(dy) < 2
        && Math.abs(dx) + Math.abs(dy) < 3
    ) {
        return;
    }

    if (dx !== 0) {
        tx += dx / Math.abs(dx);
    } if (dy !== 0) {
        ty += dy / Math.abs(dy);
    }
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
        hx += dx;
        hy += dy;
        moveTail();
        visitedStr.add(`${tx};${ty}`);
    }
});

console.log(visitedStr.size);