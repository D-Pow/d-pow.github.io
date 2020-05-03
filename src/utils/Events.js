/**
 * Asynchronously imports the specified image from the 'assets/' folder.
 * Optionally returns the resolved image data encoded with Base64.
 * Since this uses dynamic imports, images are cached, so multiple calls
 * for the same asset don't need to be memoized.
 *
 * @param {string} image - Image file name under 'assets/'
 * @param {boolean} [base64=false] - Return base64-encoded image data instead of image src path
 * @returns {Promise<string>} - Path of the image (base64=false) or Base64-encoded image data (base64=true)
 */
export async function importImageAsync(image, base64 = false) {
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
        } catch(error) {} // default return below handles error case
    }

    throw new Error(`${image} was not found`);
}

/**
 * Gets the path from the clicked element to the root.
 *
 * @param {Object} event - Click Event
 * @returns {[HTMLElement]} - Path from clicked element to the root, including `document` and `window`
 */
export function getClickPath(event) {
    if (!event || (Array.isArray(event) && event.length === 0)) {
        return [];
    }

    if (event.path) {
        return event.path;
    }

    // support for browsers without clickEvent.path
    const clickPath = [];
    let element = event.target;

    while (element) {
        clickPath.push(element);
        element = element.parentElement;
    }

    clickPath.push(document, window);

    return clickPath;
}

/**
 * HTML element properties object used in searching for an element
 *
 * @global
 * @typedef {Object} ElementProps
 * @property {string} attribute - Attribute of HTML element to compare the value to
 * @property {string} value - Value of the desired HTML element to search for
 */

/**
 * Determines if a click-path generated by an onClick event contains a given element.
 *
 * @param {string} attribute - Attribute of HTML element to compare the value to
 * @param {string} value - Value of the desired HTML element to search for
 * @param {[HTMLElement]} clickPath - onClick event's `path` value
 * @returns {boolean} - If the element described by `attribute` and `value` exists in the click-path
 */
export function elementIsInClickPath({ attribute, value }, clickPath) {
    let elementIsInPath = false;

    for (let element of clickPath) {
        if (element instanceof HTMLElement) {
            const elemAttr = element.getAttribute(attribute);

            if (elemAttr && elemAttr.includes(value)) {
                elementIsInPath = true;
                break;
            }
        }
    }

    return elementIsInPath
}

/**
 * Resets the window scroll location to the top of the screen
 */
export function resetWindowScroll() {
    window.scrollTo(0, 0);
}

/**
 * Sets the scrolling ability of the whole `document.body`.
 * Useful for controlling the app's ability to scroll from any
 * component.
 *
 * Since `document.body` is outside of the control of React,
 * set the style manually. Default value is ''.
 *
 * @param allowScrolling
 */
export function setDocumentScrolling(allowScrolling = true) {
    document.body.style.overflow = allowScrolling ? '' : 'hidden';
}