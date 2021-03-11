const {decode} = require('he');

function trackCustomEvent({category, action, label, value}) {
  if (window.gtag) {
    window.gtag('event', action, {
      category,
      label,
      value
    });
  }
}

exports.trackCustomEvent = trackCustomEvent;
exports.stripHtmlTags = (string) => decode(string.replace(/(<([^>]+)>)/g, ''));
