const input = await Deno.readTextFile("./input.txt");

const debug = false;

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

function makeTurn(monkeys: Monkey[], monkey: Monkey, gcd: number) {
    debug && console.log(`Monkey ${monkey.monkeyId}:`);
    const itemCount = monkey.items.length;
    monkey.items.forEach(item => {
        let old = item;
        const _new = eval(monkey.op) as number;
        const worryLevel = _new % gcd;
        const isDivisble = (worryLevel % monkey.test) === 0;
        const receiverMonkey = isDivisble ? monkey.iftrue : monkey.iffalse;
        monkeys[receiverMonkey].items.push(worryLevel);
    });
    monkey.items = [];
    return itemCount;
}

const monkeys = input.split(/[\r?\n]{2}/).map(lines => getMonkey(lines));
const gcd = monkeys.reduce((a, b) => a * b.test, 1);
const monkeyInspections = new Map<number, number>();

for (let round = 0; round < 10_000; round++) {
    monkeys.forEach(monkey => {
        const inspections = makeTurn(monkeys, monkey, gcd);
        monkeyInspections.set(monkey.monkeyId, inspections + (monkeyInspections.get(monkey.monkeyId) ?? 0));
    });
}

debug && monkeys.forEach(monkey => console.log('Monkey ' + monkey.monkeyId + ' ' + monkey.items.join(', ')));

const business = [...monkeyInspections.entries()].sort((a, b) => a[1] - b[1]).map(m => m[1]).slice(-2).reduce((a, b) => a * b, 1);
console.log({business});