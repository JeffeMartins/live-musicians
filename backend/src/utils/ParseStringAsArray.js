module.exports = function parseStringAsArray(value) {
 if(typeof value !== 'string') throw new TypeError('techs must be a comma-separated string');
 return [...new Set(value.split(',').map(item => item.trim()).filter(Boolean))];
};
