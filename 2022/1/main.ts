const text = await Deno.readTextFile("./input.txt");

const lines = text.split('\n');

const caloriesOfElf: number[] = [0];

let elfIndex = 0;
lines.forEach(line => {
    if (line !== '') {
        caloriesOfElf[elfIndex] += Number.parseInt(line);
    } else {
        caloriesOfElf.push(0);
        elfIndex++;
    }
});

const top3Elves = caloriesOfElf.sort((a, b) => a - b).slice(-3).reduce((a, b) => a + b);
console.log({top3Elves});