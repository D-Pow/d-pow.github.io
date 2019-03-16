import { COLORS, MOBILE_BROWSER_REGEX } from "./Constants";

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

export function randomNumber(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }

    min = Number(min);
    max = Number(max);
    if (isNaN(min) || isNaN(max)) {
        return Math.random();
    }

    return (Math.random() * (max - min)) + min;
}

export function isMobileBrowser() {
    alert(navigator.userAgent || navigator.vendor || window.opera);
    return MOBILE_BROWSER_REGEX.test(navigator.userAgent || navigator.vendor || window.opera);
}
