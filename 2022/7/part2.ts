const input = await Deno.readTextFile("./input.txt");

type Node = {
    value?: number;
    parent?: Node;
    children: Node[];
}

let root: Node|undefined;
let currentNode: Node|undefined ;
input.split(/\r?\n/).forEach(line => {
    if (line.startsWith('$ cd')) {
        const dirName = line.split(' ')[2];
        if (dirName === '..') {
            if (currentNode) currentNode = currentNode.parent;
        } else {
            currentNode = {
                parent: currentNode,
                children: []      
            };
            currentNode.parent?.children.push(currentNode);
        }
    } else if (/^\d+ .*$/.test(line)) {
        const value = Number(line.split(' ')[0]);
        currentNode?.children.push({
            parent: currentNode, 
            value: value,
            children: []
        });
    }
    if (!root) root = currentNode;
});

function getValue(node: Node): number {
    if (node.value) return node.value;
    else return node.children.map(c => getValue(c)).reduce((a, b) => a + b, 0);
}

function getDirSizes(node: Node) {
    const dirs: number[] = [];
    if (!node.value) dirs.push(getValue(node));
    dirs.push(...node.children.flatMap(c => getDirSizes(c)));
    return dirs;
}

if (root) {
    const requiredSpace = -(70000000 - 30000000 - getValue(root));
    console.log(getValue(root));
    console.log({requiredSpace});
    console.log(getDirSizes(root).length);
    for (const size of getDirSizes(root).sort((a, b) => a-b)) {
        if (size >= requiredSpace) {
            console.log({size});
            break;
        }
    }
}