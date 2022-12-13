const input = await Deno.readTextFile("./input.txt");

function charToHeight(char: string) {
    const code = char.charCodeAt(0) - 97;
    if (char === 'S') return 0;
    if (char === 'E') return 25;
    return code;
}

const charMap =  input.split(/\r?\n/).map(line => line.split(''));
const map = charMap.map(cs => cs.map(c => charToHeight(c)));

const start = charMap.map((row, idx) => [idx, row.indexOf('S')]).reduce((a, b) => a[1] !== -1 ? a : b, [-1,-1]) as [number, number];
const end = charMap.map((row, idx) => [idx, row.indexOf('E')]).reduce((a, b) => a[1] !== -1 ? a : b, [-1,-1]) as [number, number];

const rows = map.length;
const cols = map[0].length;
const distances = Array.from(Array(rows), () => new Array(cols).fill(Number.POSITIVE_INFINITY)) as [number, number][];

distances[start[0]][start[1]] = 0;

const visitedNodes: [number, number][] = [];
const nodesToCheck = [start];

while (nodesToCheck.length > 0 && !visitedNodes.filter(vn => vn[0] === end[0] && vn[1] === end[1]).length) {
    const currentNode = nodesToCheck.splice(0, 1)[0];
    const rowIdx = currentNode[0];
    const colIdx = currentNode[1];
    if (visitedNodes.filter(vn => vn[0] === rowIdx && vn[1] === colIdx).length) continue;
    const currentNodeHeight = map[rowIdx][colIdx];
    const currentDistance = distances[rowIdx][colIdx];

    const possibleNeighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const neighbors = possibleNeighbors
        .map((pn): [number, number] => [rowIdx + pn[0], colIdx + pn[1]])
        .filter(([ri, ci]) => 0 <= ri && ri < rows && 0 <= ci && ci < cols)
        .filter(n => !visitedNodes.filter(vn => vn[0] === n[0] && vn[1] === n[1]).length)
        .filter(([ri, ci]) => map[ri][ci] - currentNodeHeight <= 1) as [number, number][];
   
    neighbors.forEach(([ri, ci]) => {
        const newDistance = (currentDistance + 1);
        if (newDistance < distances[ri][ci]) {
            distances[ri][ci] = newDistance;
        }
    });
    visitedNodes.push(currentNode);
    neighbors.filter(n => !visitedNodes.filter(vn => vn[0] === n[0] && vn[1] === n[1]).length).forEach(n => nodesToCheck.push(n));
}

console.log(distances[end[0]][end[1]]);