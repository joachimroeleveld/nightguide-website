import moment from 'moment-timezone';
import { withNavigation } from './Navigation';

// TODO: fetch from on cityConfig
const TimezoneManager = withNavigation(query => {
  const { pageSlug } = query;
  moment.tz.setDefault('Europe/Amsterdam');

  return null;
});

export default TimezoneManager;
