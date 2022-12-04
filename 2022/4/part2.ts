const input = await Deno.readTextFile("./input.txt");

const result = input
    .split(/\r?\n/)
    .map(line => line.split(',').map(rangeString => rangeString.split('-').map(str => Number(str))))
    .map(([[a, b], [c , d]]) => (a <= c && c <= b) || (a <= d && d <= b) || (c <= a && a <= d) || (c <= b && b <= d))
    .map(b => Number(b))
    .reduce((a, b) => a + b);
console.log(result);
