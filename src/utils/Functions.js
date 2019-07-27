import { COLORS, MOBILE_BROWSER_REGEX } from './Constants';
import { themeColors } from 'styles/Common.scss';

export function parseScssMap(scssMapStr) {
    return JSON.parse(scssMapStr.replace('(', '{').replace(')', '"}').replace(/([#,])/g, '"$1'));
}

export function randomColor(colorsToAvoid) {
    let forbiddenColors;
    if (colorsToAvoid == null) {
        forbiddenColors = [''];
    } else if (typeof(colorsToAvoid) === 'string') {
        forbiddenColors = [colorsToAvoid];
    } else {
        forbiddenColors = colorsToAvoid;
    }

    const themeColorsObj = parseScssMap(themeColors);
    const themeColorNames = Object.keys(themeColorsObj);
    const validColors = COLORS.concat(themeColorNames);

    let chosenColor;
    do {
        chosenColor = validColors[Math.floor(randomNumber(validColors.length))];
    } while(forbiddenColors.includes(chosenColor) || forbiddenColors.includes(themeColorsObj[chosenColor]));

    if (themeColorNames.includes(chosenColor)) {
        chosenColor = themeColorsObj[chosenColor];
    }

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
    return MOBILE_BROWSER_REGEX.test(navigator.userAgent || navigator.vendor || window.opera);
}

export function childIsOfType(child, component) {
    return child.type === component;
}

export function getChildName(child) {
    return child.type.name;
}
