import { COLORS, MOBILE_BROWSER_REGEX } from './Constants';
import { themeColors } from 'styles/Common.scss';

export function isMobileBrowser() {
    return MOBILE_BROWSER_REGEX.test(navigator.userAgent || navigator.vendor || window.opera);
}

export function childIsOfType(child, component) {
    return child.type === component;
}

export function getChildName(child) {
    return child.type.name || child.type;
}

export function childIsReactElement(child) {
    return typeof child.type === 'function';
}

export async function loadImage(image, base64 = false) {
    if (image != null && image !== '') {
        try {
            const module = await import(`assets/${image}`);
            const imageSrc = module.default;

            if (base64) {
                return fetch(imageSrc).then(res => res.blob()).then(blob => new Promise((res, rej) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        res(reader.result);
                    };
                    reader.onerror = () => {
                        rej(); // error handled below
                    };
                    reader.readAsDataURL(blob);
                }));
            }

            return imageSrc;
        } catch(error) {} // default return handles error case
    }

    throw new Error(`Image at ${image} was not found`);
}

/**
 * Checks if all fields passed into the function exist nested
 * inside each other. This does not check if multiple
 * fields exist in a given level inside the object, only that fields
 * exist inside other fields.
 * If a field exists, but is null or undefined, then this will
 * return false.
 *
 * @param {Object} obj - Object to check validity of nested fields, e.g. network response or ref
 * @param {...string} nestedFields - Spread of nested fields to check in order
 * @returns {boolean} If the obj contains all given nested fields and they are not null/undefined
 */
export function validateObjNestedFields(obj, ...nestedFields) {
    const fieldsArray = (nestedFields[0] instanceof Array) ? nestedFields[0] : nestedFields;
    const responseExists = obj != null;

    if (fieldsArray.length === 0) {
        return responseExists;
    }

    const nextField = fieldsArray[0];

    return (
        responseExists
        && obj.hasOwnProperty(nextField)
        && validateObjNestedFields(obj[nextField], fieldsArray.slice(1))
    );
}

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
