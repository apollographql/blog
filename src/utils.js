const {decode} = require('he');

exports.stripHtmlTags = (string) => decode(string.replace(/(<([^>]+)>)/g, ''));
