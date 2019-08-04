import { COLORS, MOBILE_BROWSER_REGEX } from './Constants';
import { themeColors } from 'styles/Common.scss';

/**
 * Parses a map into a JS object. Every value for any key will be a string
 *
 * @param scssMapStr {string} - String imported from a .scss file
 * @returns {Object} - The parsed SCSS object
 */
export function parseScssMap(scssMapStr) {
    return JSON.parse(scssMapStr
        .replace('(', '{')
        .replace(')', '}')
        // JSON values: colon + space, bunch of word characters followed by a comma or bracket
        .replace(/: ([^,}]+)([,}])/g, ': "$1"$2')
        // JSON keys: space or bracket as first character, not already a string, anything not colon or space (rules out JSON values), ended by colon
        .replace(/([\s{])(?!")([^:\s]+)+:/g, '$1"$2":')
    );
}

export function randomColor(colorsToAvoid, onlyColors = null) {
    let forbiddenColors;
    if (colorsToAvoid == null) {
        forbiddenColors = [''];
    } else if (typeof(colorsToAvoid) === 'string') {
        forbiddenColors = [colorsToAvoid];
    } else {
        forbiddenColors = colorsToAvoid;
    }

    const themeColorsObj = parseScssMap(themeColors); // e.g. { primary: "#ffffff" }
    const themeColorNames = Object.keys(themeColorsObj);
    const validColors = onlyColors ? onlyColors : COLORS.concat(themeColorNames);

    let chosenColor;
    do {
        chosenColor = validColors[Math.floor(randomNumber(validColors.length))];
    } while(forbiddenColors.includes(chosenColor) || forbiddenColors.includes(themeColorsObj[chosenColor]));

    // If chosenColor is a theme color, the returned value will be a hex so that it can be used in any CSS field
    // Thus, forbiddenColors will need to search the hex value instead of the named value
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

export async function loadImage(image) {
    if (image != null && image !== '') {
        try {
            const module = await import(`assets/${image}`);

            return module.default;
        } catch(error) {} // default return handles error case
    }

    return '';
}
