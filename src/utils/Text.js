/**
 * Encodes a string with Base64.
 *
 * Optionally, creates a data URL if a `mimeType` is specified.
 *
 * @param {string} str - String to Base64-encode.
 * @param {Object} [options]
 * @param {string} [options.mimeType] - Mime type of the content; include this if you want a [Data URL]{@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs}.
 * @param {boolean} [options.urlEncode] - If the string should be Base64-URL-encoded instead of just Base64-encoded (e.g. for crypto).
 * @param {boolean} [options.nullOnFail] - If null should be returned instead of the original string upon failure.
 * @returns {string} - Base64-encoded string (or original string/null on failure).
 *
 * @see [Why `urlEncode` needs to be specified]{@link https://developer.mozilla.org/en-US/docs/Glossary/Base64#the_unicode_problem}
 * @see [Base64 vs Base64-URL]{@link https://stackoverflow.com/questions/28100601/decode-url-safe-base64-in-javascript-browser-side}
 * @see [Verifying JWT which uses Base64-URL-encoded strings]{@link https://stackoverflow.com/questions/56357330/how-to-verify-an-es256-jwt-token-using-web-crypto-when-public-key-is-distributed}
 */
export function base64Encode(str, {
    mimeType = '',
    urlEncode = false,
    nullOnFail = false,
} = {}) {
    try {
        const base64String = urlEncode
            ? btoa(unescape(encodeURIComponent(str)))
            : btoa(str);

        if (mimeType) {
            return `data:${mimeType};base64,${base64String}`;
        }

        return base64String;
    } catch (couldNotEncodeError) {}

    return nullOnFail ? null : str;
}


/**
 * Decodes a Base64-encoded string.
 *
 * @param {string} str - String to Base64-decode.
 * @param {Object} options
 * @param {boolean} [options.urlDecode] - If the string was Base64-URL-encoded instead of just Base64-encoded (e.g. for crypto).
 * @param {boolean} [options.nullOnFail] - If null should be returned instead of the original string upon failure.
 * @returns {string} - Base64-decoded string (or original string/null on failure).
 */
export function base64Decode(str, {
    urlDecode = false,
    nullOnFail = false,
} = {}) {
    try {
        return urlDecode
            ? decodeURIComponent(escape(atob(str)))
            : atob(str);
    } catch (couldNotDecodeLikelyMalformedError) {}

    return nullOnFail ? null : str;
}


/**
 * Extracts the content string from a Base64 data URL.
 * Optionally, decode the content string for direct usage.
 *
 * e.g. Either `'aGVsbG8gd29ybGQ='` (`decode == false`) or
 * `'hello world'` (`decode == true`) would be extracted
 * from `'data:text/plain;base64,aGVsbG8gd29ybGQ='`.
 *
 * @param {string} dataUrl - Base64 data URL, including the `data`/`base64` header content.
 * @param {boolean} [decode=false] - Decode the Base64 content string.
 * @returns {string} - The Base64 content from the data URL.
 */
export function getTextFromBase64DataUrl(dataUrl = '', decode = false) {
    const encodedContentString = dataUrl.replace(/(.*?base64,)/, '');

    if (!decode) {
        return encodedContentString;
    }

    return base64Decode(encodedContentString);
}


/**
 * Extracts the mime type from a Base64 data URL.
 *
 * e.g. `image/svg+xml` would be extracted
 * from `data:image/svg+xml;base64,aGVsbG8gd29ybGQ=`.
 *
 * @param {string} dataUrl - Base64 data URL, including the `data`/`base64` header content.
 * @returns {string} - The mime type from the data URL.
 */
export function getMimeTypeFromDataUrl(dataUrl = '') {
    try {
        return dataUrl.match(/(?<=data:)[^;]+/)[0];
    } catch (e) {
        // Could not find match, likely a malformed data URL
    }

    return null;
}


/**
 * Converts a Blob's data to Base64.
 *
 * @param {Blob} blob - Blob whose data to convert.
 * @returns {Promise<FileReader['result']>} - Base64 string of the data.
 */
export async function blobToBase64(blob) {
    // FileReader uses callbacks, so we must use the basic Promise API
    return await new Promise((res, rej) => {
        const reader = new FileReader();

        reader.onload = () => {
            res(reader.result);
        };
        reader.onerror = e => {
            rej(e);
        };

        reader.readAsDataURL(blob);
    });
}


/**
 * Converts an extension of `ArrayBuffer` (e.g. `Uint8Array`) to a hexadecimal string representation.
 *
 * @example <caption>Get the UTF-8 string of an emoji</caption>
 * const emoji = new TextEncoder().encode('some emoji');
 * byteArrayToHexString(emoji);
 * // Output: 'AABBCC'
 *
 * @example <caption>Add spaces between hex entries for easy reading</caption>
 * byteArrayToHexString(myData, { hexDelimiter: ' ' });
 * // Output: 'AA BB CC'
 *
 * @example <caption>Prepend hex entries with your preferred </caption>
 * byteArrayToHexString(myData, { hexPrefix: '0x', hexDelimiter: ' ' });
 * // Output: '0xAA 0xBB 0xCC'
 *
 * @param {Array | ArrayLike | ArrayBuffer | ArrayBufferLike} uint8Array - Buffer to convert to a hex string.
 * @param {Object} [options]
 * @param {string} [options.hexPrefix] - Prefix to add to each hex entry (e.g. `0x`, `%00`, etc.).
 * @param {string} [options.hexDelimiter] - Delimiter to use when joining all hex entries as a string (is not prepended to the first hex entry).
 * @param {boolean} [options.asArray] - Return an array of hex strings instead of one joined string.
 * @returns {string} - The hex representation of the buffer.
 *
 * @see [StackOverflow post about encoding emojis/symbols to UTF-8 strings]{@link https://stackoverflow.com/questions/48419167/how-to-convert-one-emoji-character-to-unicode-codepoint-number-in-javascript}
 * @see [StackOverflow post about decoding UTF-8]{@link https://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript}
 */
export function byteArrayToHexString(uint8Array, {
    hexPrefix = '',
    hexDelimiter = '',
    asArray = false,
} = {}) {
    // TODO Support types of ArrayBuffers other than Uint8Array
    // Convert buffer to bytes via spread - Yes, this needs to be cast to an array even though it has its own `.map()` function.
    // Then, convert bytes to readable hex string.
    const hexStrings = [ ...uint8Array ].map(byte => byte.toString(16).padStart(2, '0'));
    const hexStringsWithPrefixes = hexStrings.map(hexString => `${hexPrefix}${hexString}`);

    if (asArray) {
        return hexStringsWithPrefixes;
    }

    return hexStringsWithPrefixes.join(hexDelimiter);
}


/**
 * Converts a string of hexadecimal characters to a `Uint8Array` byte array.
 *
 * Every 2 characters is considered 1 array entry.
 *
 * @example <caption>Convert a hex string created from `byteArrayToHexString()` back to a Uint8Array</caption
 * const emoji = new TextEncoder().encode('some emoji');
 * const emojiHexString = byteArrayToHexString(emoji); // e.g. 'AABBCC'
 * const utf8Array = hexStringToByteArray(emojiHexString); // Uint8Array
 * new TextDecoder().decode(utf8Array);
 * // Output: Original 'some emoji' text
 *
 *
 * @param {string} hexString - String of hexadecimal characters to convert to a byte array.
 * @returns {Uint8Array} - Byte array containing the values in the specified hexadecimal string.
 *
 * @see [Hex to byte array StackOverflow post]{@link https://stackoverflow.com/questions/14603205/how-to-convert-hex-string-into-a-bytes-array-and-a-bytes-array-in-the-hex-strin/69980864#69980864}
 */
export function hexStringToByteArray(hexString) {
    if (hexString.length % 2 !== 0) {
        throw 'Must have an even number of hex digits to convert to bytes';
    }

    const numBytes = hexString.length / 2;

    const byteArray = Array.from({ length: numBytes }).reduce((uint8Array, byte, i) => {
        const bytesStr = hexString.substr(i * 2, 2);

        uint8Array[i] = parseInt(bytesStr, 16);

        return uint8Array;
    }, new Uint8Array(numBytes));

    return byteArray;
}
