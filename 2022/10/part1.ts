const input = await Deno.readTextFile("./input.txt");

let registerX = 1;
let cycle = 0;

function nextCycle(instruction?: CallableFunction) {
    cycle++;
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

let sum = 0;
for (let i = 20 - 1; i < registerAfterCycle.size; i+=40) {
    console.log(i+1 + 'th cycle ' + registerAfterCycle.get(i) + ' / '+ ((i+1) * registerAfterCycle.get(i)!));
    sum += ((i+1) * registerAfterCycle.get(i)!);
}

console.log({sum});