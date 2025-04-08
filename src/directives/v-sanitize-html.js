import sanitizeHtml from 'sanitize-html';

export default {
  // Vue Hook Functions
  inserted(el, binding) {
    const { value } = binding;
    const options = {
      allowedClasses: {
        '*': ['*'],
      },
    };
    el.innerHTML = sanitizeHtml(value, options);
  },
};
