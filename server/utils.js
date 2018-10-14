// Takes time in ms and returns it converted to "hh:mm:ss"
function formatTime (ms) {
  const seconds = parseInt((ms / 1000) % 60);
  const minutes = parseInt((ms / (1000 * 60)) % 60);
  const hours = parseInt(ms / (1000 * 60 * 60));
  return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
}

// Adds '0' if a number is less than 10
function addLeadingZero (num) {
  return (num < 10 ? '0' : '') + num;
}

// Takes array of types and checks if each of them is allowed in config.json
// returns true if each type is allowed, false otherwise
function validateTypes (types, allowedTypes) {
  if (!Array.isArray(types)) return false;
  if (!types.length > 0) return false;
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
function validatePagination (page, perPage) {
  return isPositiveInt(page) && isPositiveInt(perPage);
}

// Takes string and determines if it consists only of digits
// and begins with digit other than `0`;
function isPositiveInt (str) {
  return /^[1-9]\d*$/.test(str);
}

module.exports = {
  formatTime: formatTime,
  validateTypes: validateTypes,
  validatePagination: validatePagination
};
