const isEmpty = (value) => {
    return value === undefined || value === null || value === "";
};

const isNotEmpty = (value) => {
    return !isEmpty(value);
}

module.exports = { isEmpty, isNotEmpty }
