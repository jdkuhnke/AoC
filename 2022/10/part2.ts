const input = await Deno.readTextFile("./input.txt");

let registerX = 1;
let cycle = 0;

let crt = '';
const crtWidth = 40;

function nextCycle(instruction?: CallableFunction) {
    cycle++;
    
    const pos = (cycle-1) % crtWidth;
    if (registerX - 1 <= pos && pos <= registerX + 1) {
        crt += '#';
    } else {
        crt += '.'
    }
    if (instruction) {
        instruction(); 
    }
    registerAfterCycle.set(cycle, registerX);
}

const registerAfterCycle = new Map<number, number>([[cycle, registerX]]);
input.split(/\r?\n/).forEach((line, idx) => {
    if (line.startsWith('noop')) {
        nextCycle();
    } else if(line.startsWith('addx')) {
        nextCycle();
        nextCycle(() => registerX += parseInt(line.split(' ')[1]));
    }
});

for (let i = 0; i + crtWidth <= crt.length; i += crtWidth) {
    console.log(crt.slice(i, i+crtWidth));
}