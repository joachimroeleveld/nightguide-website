import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import pickBy from 'lodash/pickBy';
import find from 'lodash/find';
import identity from 'lodash/identity';

import FilterModal from '../FilterModal';
import EventDateFilter from './EventDateFilter';
import EventFilterBar from './EventFilterBar';
import __, { _o } from '../../lib/i18n';
import EventCheckboxFilter from './EventCheckboxFilter';
import EventAutoCompleteFilter from './EventAutocompleteFilter';
import { getArtists, getVenues } from '../../lib/api';
import { useWindowWidth } from '../../lib/hooks';

EventFilters.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

function EventFilters(props) {
  const { values, onChange, venue, artist, genres, pageSlug } = props;
  const {
    dateFrom,
    dateTo,
    dateFilterId,
    genres: genreNames,
    venue: venueId,
    artist: artistId,
  } = values;

  const [openModal, setOpenModal] = useState(null);

  const windowWidth = useWindowWidth();

  const closeOpenModal = () => setOpenModal(null);

  const setDateFilters = ({
    dateFrom = null,
    dateTo = null,
    dateFilterId = null,
  }) => {
    setValues({
      dateFrom,
      dateTo,
      dateFilterId,
    });
  };

  const setValue = key => val => setValues({ [key]: val });

  const setValues = newValues => {
    onChange({
      ...pickBy(values, identity), // Filter undefined values
      ...newValues,
    });
  };

  const onBarItemPress = filterId => {
    const item = find(items, { id: filterId });
    if (item.active) {
      if (filterId === 'dates') {
        setDateFilters({});
      } else {
        onChange({ [filterId]: null });
      }
    } else {
      setOpenModal(filterId);
    }
  };

  const fetchVenues = async input => {
    const { results } = await getVenues({
      query: { query: input, pageSlug },
    });
    return results.map(venue => ({
      value: venue.id,
      label: venue.name,
    }));
  };

  const fetchArtists = async input => {
    const { results } = await getArtists({
      query: { query: input },
    });
    return results.map(artist => ({
      value: artist.id,
      label: artist.name,
    }));
  };

  const items = [
    {
      id: 'dates',
      active: !!dateFilterId,
      label: __(`EventFilters.dates`),
      activeLabel: (() => {
        if (dateFilterId === 'custom' && dateFrom && dateTo) {
          // Localized form of day and month
          const format = date =>
            moment(date)
              .format('LL')
              .match(/^(\w+ \w+)/)
              .pop();
          if (!moment(dateFrom).isSame(dateTo, 'day')) {
            return `${format(dateFrom)} - ${format(dateTo)}`;
          } else {
            return `${format(dateFrom)}`;
          }
        } else if (dateFilterId) {
          return __(`EventFilters.dateFilters.${dateFilterId}`);
        }
      })(),
      render: () => (
        <EventDateFilter
          dateFilterId={dateFilterId}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onChange={setDateFilters}
        />
      ),
    },
    genres.length && {
      id: 'genres',
      active: !!genreNames,
      label: __('EventFilters.genre'),
      activeLabel:
        genreNames &&
        genreNames
          .map(
            genreName => find(genres, genre => genre.name === genreName).name
          )
          .join(', '),
      render: () => (
        <EventCheckboxFilter
          checked={genreNames || []}
          items={genres.map(genre => ({
            value: genre.name,
            label: genre.name,
          }))}
          onChange={setValue('genres')}
        />
      ),
      onClear: setValue('genres'),
    },
    {
      id: 'venue',
      active: !!venueId,
      label: __('EventFilters.location'),
      activeLabel: !!venue && venue.name,
      render: () => (
        <EventAutoCompleteFilter
          placeholder={__('EventFilters.searchLocation')}
          loadOptions={fetchVenues}
          onChange={setValue('venue')}
          value={venueId}
          defaultInputValue={venue && venue.name}
        />
      ),
      onClear: setValue('venue'),
    },
    {
      id: 'artist',
      active: !!artistId,
      label: __('EventFilters.artist'),
      activeLabel: !!artist && artist.name,
      render: () => (
        <EventAutoCompleteFilter
          placeholder={__('EventFilters.searchArtist')}
          loadOptions={fetchArtists}
          onChange={setValue('artist')}
          value={artistId}
          defaultInputValue={artist && artist.name}
        />
      ),
      onClear: setValue('artist'),
    },
  ].filter(val => val);

  return (
    <div className="filters">
      {windowWidth < 800 && (
        <Fragment>
          <EventFilterBar items={items} onItemPress={onBarItemPress} />
          {items.map(({ label, id, onClear, render }) => (
            <FilterModal
              key={id}
              label={label}
              isOpen={openModal === id}
              onClose={closeOpenModal}
              onClear={onClear}
            >
              {render()}
            </FilterModal>
          ))}
        </Fragment>
      )}

      {windowWidth > 800 &&
        items.map(item => (
          <section key={item.id}>
            <strong className="label">{item.label}</strong>
            {item.render()}
          </section>
        ))}

      {/*language=CSS*/}
      <style jsx>{`
        .label {
          display: block;
          margin: 1.5em 0 0.7em;
        }
      `}</style>
    </div>
  );
}

export default EventFilters;
