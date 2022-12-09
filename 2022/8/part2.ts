const input = await Deno.readTextFile("./input.txt");

const forest = input.split(/\r?\n/).map(line => line.split('').map(n => parseInt(n)));

function countTreeSmallerOrEqual(direction: number[], treeHeight: number) {
    let counter = 0;
    for (const t of direction) {
        counter++;
        if (t >= treeHeight) {
           break;
        }
    }
    return counter;
}

function getScenicScore(forest: number[][], rowIdx: number, colIdx: number){
    const row = forest[rowIdx];
    const column = forest.map(a => a[colIdx]);
    const treeHeight = forest[rowIdx][colIdx];

    const left = countTreeSmallerOrEqual(row.slice(0, colIdx).reverse(), treeHeight);
    const right  = countTreeSmallerOrEqual(row.slice(colIdx + 1), treeHeight);
    const up = countTreeSmallerOrEqual(column.slice(0, rowIdx).reverse(), treeHeight);
    const down = countTreeSmallerOrEqual(column.slice(rowIdx + 1), treeHeight);

    return left * right * up * down;
}

let maxScenicScore = -1;
for (let rowIdx = 0; rowIdx < forest.length; rowIdx++) {
    const row = forest[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
        const scenicScore = getScenicScore(forest, rowIdx, colIdx);
        if (scenicScore > maxScenicScore) {
            maxScenicScore = scenicScore;
        }
    }
}

console.log({maxScenicScore});