import { COLORS } from "./Constants";

export function randomColor(colorsToAvoid) {
    let forbiddenColors;
    if (colorsToAvoid == null) {
        forbiddenColors = [''];
    } else if (typeof(colorsToAvoid) === 'string') {
        forbiddenColors = [colorsToAvoid];
    } else {
        forbiddenColors = colorsToAvoid;
    }

    let chosenColor;
    do {
        chosenColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    } while(forbiddenColors.includes(chosenColor));
    return chosenColor;
}

export function randomInt(min, max) {
    return (Math.random() * (max - min)) + min;
}
