import { COLORS } from 'utils/Constants';
import { asNumber, randomNumber } from 'utils/Numbers';
import { themeColors, gridBreakpoints } from 'styles/Common.scss';

/**
 * Parses a map into a JS object. Every value for any key will be a string
 *
 * @param {string} scssMapStr - String imported from a .scss file
 * @returns {Object} - The parsed SCSS object
 */
export function parseScssMap(scssMapStr) {
    return JSON.parse(
        scssMapStr
            .replace('(', '{')
            .replace(')', '}')
            // JSON values: convert any collection of word characters followed by a comma or bracket to a string
            .replace(/: ?([^,}]+)([,}])/g, ': "$1"$2')
            // JSON keys: space/bracket/comma as first character, not already a string, anything not colon or
            // space (rules out JSON values), ended by colon
            .replace(/([\s{,])(?!")([^:\s]+)+:/g, '$1"$2":')
    );
}

export function getThemeColors() {
    return parseScssMap(themeColors);
}

export function getGridBreakpoints(parsePxStrToNum = true) {
    const mapWithPxInStr = parseScssMap(gridBreakpoints);

    if (parsePxStrToNum) {
        return Object.keys(mapWithPxInStr).reduce((valsAsNum, breakpointName) => {
            valsAsNum[breakpointName] = asNumber(mapWithPxInStr[breakpointName]);

            return valsAsNum;
        }, {});
    }

    return mapWithPxInStr;
}

/**
 * Gets the animation duration time in milliseconds from the CSS className string
 * containing .duration-XX
 *
 * @param {string} className - CSS className to search for .duration-XX
 * @returns {(boolean|number)} - The duration time in ms or false if .duration-XX not found in className
 */
export function getDurationTimeMsFromClassName(className) {
    const durationTimeCssClass = new RegExp('(duration-)(\\d+)');
    const durationTimeMatch = className.match(durationTimeCssClass);

    if (durationTimeMatch) {
        // .duration-XX is (XX * 0.1 seconds) so the milliseconds value is XX/10*1000
        return Number(durationTimeMatch[2]) * 100;
    } else {
        return false;
    }
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

    const themeColorsObj = getThemeColors(); // e.g. { primary: "#ffffff" }
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
