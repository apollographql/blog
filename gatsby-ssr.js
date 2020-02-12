const React = require('react');

exports.onRenderBody = ({setPostBodyComponents}) => {
  setPostBodyComponents([
    React.createElement('script', {
      key: 'mkto',
      src: '//app-ab16.marketo.com/js/forms2/js/forms2.min.js'
    })
  ]);
};
