const input = await Deno.readTextFile("./input.txt");

const forest = input.split(/\r?\n/).map(line => line.split('').map(n => parseInt(n)));

function isTreeHiddenInRank(rank: number[], treeIdx: number) {
    const firstRank = rank.slice(0, treeIdx);
    const secondRank  = rank.slice(treeIdx + 1);
    
    const treeHeight = rank[treeIdx];

    return treeIdx !== 0 
        && treeIdx !== rank.length - 1 
        && treeHeight <= Math.max(...firstRank) 
        && treeHeight <= Math.max(...secondRank);
}

function isHidden(forest: number[][], rowIdx: number, colIdx: number){
    const row = forest[rowIdx];
    const column = forest.map(a => a[colIdx]);
    return isTreeHiddenInRank(row, colIdx) && isTreeHiddenInRank(column, rowIdx);
}

let visibleTrees = 0;
for (let rowIdx = 0; rowIdx < forest.length; rowIdx++) {
    const row = forest[rowIdx];
    for (let colIdx = 0; colIdx < row.length; colIdx++) {
        if (!isHidden(forest, rowIdx, colIdx)) {
            visibleTrees++;
        }
    }
}

console.log({visibleTrees});