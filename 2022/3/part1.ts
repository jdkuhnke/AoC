const input = await Deno.readTextFile("./input.txt");

const result = input
    .split(/[\r\n]+/)
    .map(line => {
        const mid = line.length / 2;
        return [line.slice(0, mid), line.slice(mid)]
    })
    .map((compartments) => {
        const compartmentsMap = [new Map<string, number>(), new Map<string, number>()]

        compartments.map((compString, idx) => {
            [...compString].forEach(char => {
                compartmentsMap[idx].set(char, 1 + (compartmentsMap[idx].get(char) ?? 0))
            });
        });

        return compartmentsMap;
    })
    .map(([firstCompartmentMap, secondCompartmentMap]) => {
        return [...firstCompartmentMap.keys()].filter(key => [...secondCompartmentMap.keys()].includes(key))[0];
    })
    .map(char => {
        const asciiCode = char.charCodeAt(0);
        return asciiCode < 97 ? (asciiCode - 65 + 27) : (asciiCode - 97 + 1);
    })
    .reduce((a, b) => a + b)
    ;

console.log({result})