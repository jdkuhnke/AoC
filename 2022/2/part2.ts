const text = await Deno.readTextFile("./input.txt");

enum Choice {
    ROCK=1,
    PAPER=2,
    SCISSOR=3
}

enum Outcome {
    LOSS, DRAW, WIN
}

function stringToChoice(choice: string): Choice {
    switch(String(choice)) {
        case 'A':
            return Choice.ROCK; 
        case 'B':
            return Choice.PAPER; 
        case 'C':
            return Choice.SCISSOR;
        default:
            throw new Error('Unknown choice string: ' + choice);
    }
}

function stringToOutcome(outcome: string): Outcome {
    switch(String(outcome)) {
        case 'X':
            return Outcome.LOSS; 
        case 'Y':
            return Outcome.DRAW; 
        case 'Z':
            return Outcome.WIN;
        default:
            throw new Error('Unknown outcome string: ' + outcome);
    }
}

const CHOICE_WINS_MAP = new Map<Choice, Choice>([
    [Choice.PAPER, Choice.ROCK],
    [Choice.ROCK, Choice.SCISSOR],
    [Choice.SCISSOR, Choice.PAPER]
]);
const CHOICE_LOSES_MAP = new Map<Choice, Choice>(
    Array.from(CHOICE_WINS_MAP.entries()).map(([key, value]) => [value, key])
);

const score = text
    .split('\n')
    .map(line => line.split(' '))
    .map(([enemyPlay, desiredOutcome]): [Choice, Outcome] => [stringToChoice(enemyPlay.trim()), stringToOutcome(desiredOutcome.trim())])
    .map(([enemyPlay, desiredOutcome]) => {
        let myPlay: Choice = enemyPlay; // default: Outcome.DRAW
        if (desiredOutcome === Outcome.LOSS) {
            myPlay = CHOICE_WINS_MAP.get(enemyPlay) as Choice;
        } else if (desiredOutcome === Outcome.WIN) {
            myPlay = CHOICE_LOSES_MAP.get(enemyPlay) as Choice;
        }
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