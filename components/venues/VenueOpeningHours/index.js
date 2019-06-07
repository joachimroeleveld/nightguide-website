import React from 'react';
import PropTypes from 'prop-types';
import range from 'lodash/range';
import moment from 'moment/moment';

import __ from '../../../lib/i18n';
import {
  getDayScheduleParsed,
  checkIsOpenFromSchedule,
  TIME_FORMAT,
} from './util';

class VenueOpeningHours extends React.PureComponent {
  static propTypes = {
    schedule: PropTypes.object.isRequired,
    toggleModalCallback: PropTypes.func,
  };

  get todayScheduleParsed() {
    return getDayScheduleParsed(this.props.schedule);
  }

  get isOpen() {
    return checkIsOpenFromSchedule(this.props.schedule);
  }

  get nextOpenMoment() {
    return range(0, 7).reduce((openMoment, dayOffset) => {
      if (openMoment) {
        return openMoment;
      }
      const daySchedule = getDayScheduleParsed(
        this.props.schedule,
        true,
        dayOffset
      );
      if (daySchedule) {
        return daySchedule.from;
      }
      return null;
    }, null);
  }

  get openText() {
    if (this.isOpen) {
      return __('venue.openingHours.openUntilTime', {
        time: this.todayScheduleParsed.to.format(TIME_FORMAT),
      });
    }

    const nextOpenMoment = this.nextOpenMoment;
    if (nextOpenMoment) {
      if (nextOpenMoment.isSame(moment(), 'day')) {
        const date = nextOpenMoment.format(TIME_FORMAT);
        return __('venue.openingHours.opensAt', { date });
      } else {
        const date = nextOpenMoment.format(`ddd, ${TIME_FORMAT}`);
        return __('venue.openingHours.opensOn', { date });
      }
    }
    return null;
  }

  render() {
    const openText = this.openText;

    if (!openText) {
      return null;
    }

    return (
      <span className={'container'}>
        {this.isOpen && <span className="open-indicator" />}
        <span>{openText}</span>
        {/*language=CSS*/}
        <style jsx>{`
          .container {
            display: flex;
            align-items: center;
          }
          .open-indicator {
            display: block;
            margin-right: 0.5em;
            width: 5px;
            height: 5px;
            border-radius: 100%;
            background: #9eed5a;
          }
        `}</style>
      </span>
    );
  }
}

export default VenueOpeningHours;
