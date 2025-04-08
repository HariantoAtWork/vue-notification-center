const dm = require('deepmerge');

const combineMerge = (target, source, options) => {
  const destination = target.slice();

  source.forEach((item, index) => {
    if (typeof destination[index] === 'undefined') {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = dm(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });
  return destination;
};

const deepmerge = (...updates) => {
  let target = {};
  while (updates.length) {
    target = dm(target, updates.shift(), { arrayMerge: combineMerge });
  }
  return target;
};

export default deepmerge;
