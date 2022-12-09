const input = await Deno.readTextFile("./input.txt");

let currentDir: string = '/';

export type Node = {
    name: string;
    children: Node[];
    parent: Node|null;
    size: number;
}

let root: Node|undefined|null = null;
let currentNode: Node|undefined|null = null;
let sum = 0;
input.split(/\r?\n/).forEach((line, idx) => {
    if (line.startsWith('$')) {
        if(line.endsWith('ls')) {
            // ?
        } else { // cd
            const dirname = line.split(' ').slice(-1)[0];
            if (dirname === '..') {
                currentDir = currentDir?.split('/').splice(-1, 1).join('/');
                const size = currentNode?.size ?? 0;
                if (size <= 100000) {
                    sum += size;
                }
                currentNode = currentNode?.parent;
                currentNode && (currentNode.size += size);
            } else if (dirname.startsWith('/')) {
                currentDir = dirname;
                root = {
                    name: currentDir,
                    children: [],
                    parent: null,
                    size: 0
                };
                currentNode = root;
            } else {
                currentDir += '/' + dirname
                currentNode = {
                    name: currentDir,
                    children: [],
                    parent: currentNode as Node,
                    size: 0
                };
                root?.children.push(currentNode);
            }
        }
    } else if (line.startsWith('dir')) {
        const [, dirname] = line.split(' ');
    } else {
        const [fileSize, filename] = line.split(' ');
        currentNode && (currentNode.size += Number(fileSize));
    }
});

console.log({sum});