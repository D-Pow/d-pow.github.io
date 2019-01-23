import { COLORS } from "./Constants";

export function randomColor(avoidedColor) {
    let chosen;
    do {
        chosen = COLORS[Math.floor(Math.random() * COLORS.length)];
    } while(chosen === avoidedColor);
    return chosen;
}

export function randomInt(min, max) {
    return (Math.random() * (max - min)) + min;
}
