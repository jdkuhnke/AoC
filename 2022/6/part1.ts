const input = await Deno.readTextFile("./input.txt");

function bufferContainsFourDifferentChars(buffer: string[]) {
    if (buffer.length !== 4) return false;

    return !buffer.map((char, idx, arr) => {
        return arr.slice(0, idx).includes(char) || arr.slice(idx + 1).includes(char);
    }).reduce((a, b) => a || b);
}

const buffer: string[] = [];
const inputStream = [...input];
for (let i=0; i<inputStream.length; i++) {
    buffer.push(inputStream[i]);
    if (buffer.length > 4) {
        buffer.splice(0, 1);
    }
    if (bufferContainsFourDifferentChars(buffer)) {
        console.log(i + 1);
        break;
    }
}