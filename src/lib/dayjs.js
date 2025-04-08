// dayjs library with enabled extensions
const dayjs = require('dayjs');
[
  require('dayjs/plugin/isBetween'),
  require('dayjs/plugin/isSameOrBefore'),
  require('dayjs/plugin/isSameOrAfter'),
  require('dayjs/plugin/utc'),
  require('dayjs/plugin/timezone'),
  require('dayjs/plugin/duration'),
  require('dayjs/plugin/advancedFormat'),
  require('dayjs/plugin/localizedFormat'),
].forEach(dayjs.extend);
export default dayjs;
