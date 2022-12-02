const text = await Deno.readTextFile("./input.txt");

enum Choice {
    ROCK=1,
    PAPER=2,
    SCISSOR=3
}

function stringToChoice(choice: string): Choice {
    switch(String(choice)) {
        case 'A':
        case 'X':
            return Choice.ROCK; 
        case 'B':
        case 'Y':
            return Choice.PAPER; 
        case 'C':
        case 'Z':
            return Choice.SCISSOR;
        default:
            throw new Error('Unknown choice string: ' + choice);
    }
    
}


const score = text
    .split('\n')
    .map(line => line.split(' '))
    .map(([enemyPlay, myPlay]) => [stringToChoice(enemyPlay.trim()), stringToChoice(myPlay.trim())])
    .map(([enemyPlay, myPlay]) => {
        let score: number = myPlay;
        if (enemyPlay === myPlay) {
            score += 3;
        } else if (myPlay === Choice.ROCK && enemyPlay === Choice.PAPER) {
        } else if (myPlay === Choice.ROCK && enemyPlay === Choice.SCISSOR) {
            score += 6;
        } else if (myPlay === Choice.PAPER && enemyPlay === Choice.ROCK) {
            score += 6;
        } else if (myPlay === Choice.PAPER && enemyPlay === Choice.SCISSOR) {
            
        } else if (myPlay === Choice.SCISSOR && enemyPlay === Choice.ROCK) {
            
        } else if (myPlay === Choice.SCISSOR && enemyPlay === Choice.PAPER) {
            score += 6;
        }

        return score;
    })
    .reduce((a, b) => a + b);

console.log({score});