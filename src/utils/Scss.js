import { COLORS } from '@/utils/Constants';
import { asNumber, randomNumber } from '@/utils/Numbers';
import CommonStyles from '@/styles/Common.scss';

const { themeColors, gridBreakpoints } = CommonStyles;

/**
 * Parses an SCSS variable that was exported via `:export` block into the
 * respective JavaScript variable.
 *
 * SCSS exports are always strings, so we have to parse them into the correct
 * type ourselves. Parsing attempts are done in the order:
 *
 * 1. JSON.parse() - Works for everything that isn't a list or object/map.
 *    Will work for lists/maps if they are formatted to JSON strings within the
 *    SCSS file before being exported.
 * 2. Manual string parsing - Manually swap SCSS syntax for JS (e.g. `(|)` with `{|}` for maps).
 * 3. Original string value - Fallback in case the value cannot be parsed by the above attempts.
 *
 * @param {string} scssStr - Variable imported from a .scss file.
 * @returns {*} - The JavaScript representation of the variable.
 */
export function parseScssVar(scssStr) {
    if (!scssStr || (typeof scssStr !== typeof '')) {
        return scssStr;
    }

    // Lists and maps are surrounded by single quotes, e.g. "'[ \"string in list\", 5, \"5px\" ]'"
    // Remove them if they exist so they can be parsed correctly.
    const jsValue = scssStr.replace(/(^['"])|(['"]$)/g, '');

    try {
        // JSON-formatted string from within SCSS file
        return JSON.parse(jsValue);
    } catch (errorParsingJsonGeneratedInUtilScssFile) {
        try {
            // Value was likely an SCSS literal string; attempt parsing it manually.
            // Example: inspect($my-map) => '(num: 10, numWithUnits: 5px, str: hello, color: #fff, "keyAsStr": false, other: null)'
            return JSON.parse(
                scssStr
                    .replace('(', '{')
                    .replace(')', '}')
                    // JSON values: convert any collection of word characters followed by a comma or bracket to a string
                    .replace(/: ?([^,}]+)([,}])/g, ': "$1"$2')
                    // JSON keys: space/bracket/comma as first character, not already a string, anything not colon or
                    // space (rules out JSON values), ended by colon
                    .replace(/([\s{,])(?!")([^:\s]+)+:/g, '$1"$2":'),
            );
        } catch (errorParsingScssStringLiteral) {
            return jsValue;
        }
    }
}

export function getThemeColors() {
    return parseScssVar(themeColors);
}

export function getGridBreakpoints(parsePxStrToNum = true) {
    const mapWithPxInStr = parseScssVar(gridBreakpoints);

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
 * containing the `classNamePrefix` followed by the time.
 *
 * `classNamePrefix` should be followed by numbers where the number of digits represents the
 * number of seconds and each decimal place following it, e.g.
 * - `.duration-5` = 5 seconds.
 * - `.duration-56` = 5.6 seconds.
 * - `.duration-567` = 5.67 seconds.
 * - `.duration-5678` = 5.678 seconds.
 * - `.duration-0123` = 0.123 seconds.
 *
 * @param {string} className - CSS className string to search for the animation-duration class.
 * @param {Object} [options]
 * @param {string} [options.classNamePrefix] - Class prefix for animation durations.
 * @returns {number} - The duration time in ms or null if animation duration not found in `className`.
 */
export function getDurationTimeMsFromClassName(className, {
    classNamePrefix = 'duration-',
} = {}) {
    const durationTimeCssClass = new RegExp(`(${classNamePrefix})(\\d+)`);
    const durationTimeMatch = className.match(durationTimeCssClass);

    if (durationTimeMatch) {
        const durationTimeString = durationTimeMatch[2];
        // `.duration-XX` is (XX * 0.1 seconds) so the milliseconds value is XX/10*1000
        return Number(durationTimeString) / Math.pow(10, durationTimeString.length - 1) * 1000;
    }

    return null;
}

export function getRandomColor(colorsToAvoid, onlyColors = null) {
    let forbiddenColors;
    if (colorsToAvoid == null) {
        forbiddenColors = [ '' ];
    } else if (typeof (colorsToAvoid) === 'string') {
        forbiddenColors = [ colorsToAvoid ];
    } else {
        forbiddenColors = colorsToAvoid;
    }

    const themeColorsObj = getThemeColors(); // e.g. { primary: "#ffffff" }
    const themeColorNames = Object.keys(themeColorsObj);
    const validColors = onlyColors ? onlyColors : COLORS.concat(themeColorNames);

    let chosenColor;
    do {
        chosenColor = validColors[Math.floor(randomNumber(validColors.length))];
    } while (forbiddenColors.includes(chosenColor) || forbiddenColors.includes(themeColorsObj[chosenColor]));

    // If chosenColor is a theme color, the returned value will be a hex so that it can be used in any CSS field
    // Thus, forbiddenColors will need to search the hex value instead of the named value
    if (themeColorNames.includes(chosenColor)) {
        chosenColor = themeColorsObj[chosenColor];
    }

    return chosenColor;
}
