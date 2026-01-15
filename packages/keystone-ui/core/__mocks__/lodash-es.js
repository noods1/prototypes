const _ = require('lodash');
module.exports = {
  ..._,
  isElement: (val) => _.isObjectLike(val) && val.nodeType === 1,
};
