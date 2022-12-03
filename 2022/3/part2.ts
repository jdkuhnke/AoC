const input = await Deno.readTextFile("./input.txt");

const result = (input
    .match(/(?:^.*$\r?\n?){3}/mg) ?? [])
    .map(groupLines => groupLines.split(/\r?\n/))
    .map(group => 
        group      
        .map((bagLine) => new Set<string>([...bagLine]))
        .reduce((bagA, bagB) => {
            if (bagA.size === 0) {
                return bagB;
            } else if (bagB.size === 0) {
                return bagA;
            }
            return new Set<string>([...bagA.values()].filter(entry => bagB.has(entry)));
        })
        .values().next().value
    )
    .map(char => {
        const asciiCode = char.charCodeAt(0);
        return asciiCode < 97 ? (asciiCode - 65 + 27) : (asciiCode - 97 + 1);
    })
    .reduce((a, b) => a + b)
    ;

console.log({result})