module.exports.isStringNull = (value) => {
    return value === undefined || value === null || value.trim() === '';
}
  