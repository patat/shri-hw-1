// Takes time in ms and returns it converted to "hh:mm:ss"
export function formatTime(ms) {
    const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((ms / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor(ms / (1000 * 60 * 60)).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
// Takes array of types and checks if each of them is allowed in config.json
// returns true if each type is allowed, false otherwise
export function validateTypes(types, allowedTypes) {
    if (!Array.isArray(types))
        return false;
    if (types.length === 0)
        return false;
    for (const type of types) {
        if (!allowedTypes.includes(type)) {
            return false;
        }
    }
    return true;
}
// Takes page and perPage query params values and checks
// if they are positive integers
// returns true if it's the case, false otherwise
export function validatePagination(page, perPage) {
    return isPositiveInt(page) && isPositiveInt(perPage);
}
// Takes string and determines if it consists only of digits
// and begins with digit other than `0`;
function isPositiveInt(str) {
    return /^[1-9]\d*$/.test(str);
}
