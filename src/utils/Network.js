import { blobToBase64 } from '@/utils/Text';


/**
 * Fetches a resource and returns the Base64-encoded result.
 *
 * @param {string} url - URL to which the network request will be made.
 * @param {RequestInit} fetchOptions - Options to pass to the underlying `fetch()` function.
 * @returns {Promise<Awaited<ReturnType<typeof blobToBase64>>>} - The result from the [`FileReader`]{@link https://developer.mozilla.org/en-US/docs/Web/API/FileReader}.
 */
export async function fetchAsBase64(url, fetchOptions = {}) {
    const res = await fetch(url, fetchOptions);
    const blob = await res.blob();

    return await blobToBase64(blob);
}
