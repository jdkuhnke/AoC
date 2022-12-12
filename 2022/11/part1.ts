const input = await Deno.readTextFile("./input.txt");

function getMonkey(lines: string) {
    const monkeyId = parseInt(/Monkey (\d)+:/gm.exec(lines)![1]);
    const items = /Starting items: ([\d+,? ?]+)/gm.exec(lines)![1].split(', ').map(d => parseInt(d));
    const op = /Operation: new = ([\d\+\*oldnew ]+)/gm.exec(lines)![1];
    const test = parseInt(/Test: divisible by (\d+)/gm.exec(lines)![1]);
    const iftrue = parseInt(/If true: throw to monkey (\d+)/gm.exec(lines)![1]);
    const iffalse = parseInt(/If false: throw to monkey (\d+)/gm.exec(lines)![1]);
    return {
        monkeyId,
        items,
        op,
        test,
        iftrue,
        iffalse
    }
}   

type Monkey = ReturnType<typeof getMonkey>;

function makeTurn(monkeys: Monkey[], monkey: Monkey) {
    const itemCount = monkey.items.length;
    monkey.items.forEach(item => {
        let old = item;
        const _new = eval(monkey.op) as number;
        const worryLevel = Math.floor(_new / 3);
        const isDivisble = worryLevel % monkey.test === 0;
        const receiverMonkey = isDivisble ? monkey.iftrue : monkey.iffalse;
        monkeys[receiverMonkey].items.push(worryLevel);
    });
    monkey.items = [];
    return itemCount;
}

const monkeys = input.split(/[\r?\n]{2}/).map(lines => getMonkey(lines));
const monkeyInspections = new Map<number, number>();

for (let round = 0; round < 20; round++) {
    monkeys.forEach(monkey => {
        const inspections = makeTurn(monkeys, monkey);
        monkeyInspections.set(monkey.monkeyId, inspections + (monkeyInspections.get(monkey.monkeyId) ?? 0));
    });
}

const business = [...monkeyInspections.entries()].sort((a, b) => a[1] - b[1]).map(m => m[1]).slice(-2).reduce((a, b) => a * b, 1);
console.log({business});