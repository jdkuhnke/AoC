const input = await Deno.readTextFile("./input.txt");

const res = input.split(/[\r?\n]{2}/);
const cols = res[0].split(/\r?\n/).slice(-1)[0].trim().split(/\s+/).length;

const stacks: string[][] = [];
for (let i = 0; i < cols; i++) {
    stacks.push([]);
}

res[0].split(/\r?\n/).slice(0, -1).reverse().forEach(line => {
    for (let i = 0; i < stacks.length; i++ ) {
        const crate = line.charAt(1 + (i*4));
        crate !== " " && stacks[i].push(crate);
    }
});

const regex = /^move (\d+) from (\d+) to (\d+)$/gm;
let match;
while ((match = regex.exec(res[1])) !== null) {
    const quantity = Number(match[1]);
    const src = Number(match[2]) - 1;
    const dst = Number(match[3]) - 1;
    for (let i = 0; i < quantity; i++) {
        stacks[dst].push(stacks[src].pop() ?? "error");
    }
}

const solution = stacks.map(stack => stack.slice(-1)[0]).reduce((a, b) => a + b);
console.log({solution});