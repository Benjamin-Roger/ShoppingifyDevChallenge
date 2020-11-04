/**
 * Given a string, converts it to kebab case (lowercase, hyphen-separated). For example,
 * "makeFoo" becomes "make-foo", and "a Multi Word string" becomes "a-multi-word-string".
 *
 * @param {string} string Your input string.
 * @returns {string} Kebab-cased string.
 */

export function toKebabCase(string) {
    var result = string;

    // Convert non-camelCase capitals to lowercase.
    result = result.toLowerCase();

    // Convert non-alphanumeric characters to hyphens
    result = result.replace(/[^-a-z0-9]+/g, '-');

    // Remove hyphens from both ends
    result = result.replace(/^-+/, '').replace(/-+$/, '');

    // Remove double hyphens from both ends
    result = result.replace(/-{2,}/, '-');

    return result;
}