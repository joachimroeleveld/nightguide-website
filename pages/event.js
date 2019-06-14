import Head from 'next/head';
import moment from 'moment';

import withPageLayout from '../components/PageLayout';
import { getEvent, getVenue } from '../lib/api';
import colors from '../styles/colors';
import { getFutureEventDates } from '../lib/events';
import __ from '../lib/i18n';
import dimensions from '../styles/dimensions';
import ResponsiveImage from '../components/ResponsiveImage';
import TagList from '../components/TagList';
import VenueTile from '../components/venues/VenueTile';

function EventPage(props) {
  const { event, baseUrl, venue } = props;

  const { title, facebook, images, dates, location, tags } = event;
  const futureDates = getFutureEventDates(dates);

  return (
    <main>
      <Head>
        <title>
          {__('eventPage.meta.title', {
            event: title || facebook.title,
            city: location.city,
          })}
        </title>
        <meta
          name="description"
          content={
            facebook.description
              .slice(0, 160)
              .replace('\n', ' ')
              .replace('  ', ' ') + '...'
          }
        />
      </Head>

      <h1>{title || facebook.title}</h1>
      <div className="content">
        <aside>
          <div className="info">
            <figure className={'event-image'}>
              {!!images.length && (
                <ResponsiveImage
                  lazy={false}
                  url={images[0].url}
                  widths={[320]}
                  imgStyle={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                  alt={title || facebook.title}
                />
              )}
            </figure>
            <div className="dates">
              {futureDates.slice(0, 3).map((date, index) => (
                <div className={'date'} key={index}>
                  <span>{moment(date.from).format('LLL')}</span>
                  {!!date.to && (
                    <span>
                      {' - '}
                      {moment(date.to).format('LLL')}
                    </span>
                  )}
                </div>
              ))}
              {futureDates.length > 3 && (
                <span className={'more-dates'}>
                  {__('eventPage.nMoreDates', { n: futureDates.length - 3 })}
                </span>
              )}
            </div>
            <div className="additional-info">
              {facebook.goingCount !== undefined && (
                <div className={'labeled-text'}>
                  <strong>{__('eventPage.noGoing')}</strong>
                  <span>{facebook.goingCount}</span>
                </div>
              )}
              {facebook.interestedCount !== undefined && (
                <div className={'labeled-text'}>
                  <strong>{__('eventPage.noInterested')}</strong>
                  <span>{facebook.interestedCount}</span>
                </div>
              )}
              {location && (
                <div className={'labeled-text'}>
                  <strong>{__('eventPage.location')}</strong>
                  <span>
                    {[
                      location.address1,
                      location.address2,
                      location.postalCode,
                    ].join(' ')}
                  </span>
                </div>
              )}
              {!!facebook.id && (
                <a
                  className={'facebook-page'}
                  href={`https://facebook.com/events/${facebook.id}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {__('eventPage.facebookPage')}
                </a>
              )}
            </div>
          </div>
        </aside>
        <aside className="organiser">
          <h2>{__('eventPage.organiser')}</h2>
          <div className="venue">
            <VenueTile
              venue={venue}
              baseUrl={baseUrl + '/venues'}
              imgWidths={[600, 1000, 2000]}
              imgSizes="(min-width: 900px) calc(100vw - 2rem), 300px"
            />
          </div>
        </aside>
        <div className="description-container">
          <TagList baseUrl={baseUrl} tags={tags} />
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: facebook.description.replace(/(\/n)/g, '<br/>'),
            }}
          />
        </div>
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        h1 {
          border-bottom: 1px solid ${colors.separator};
          padding: 1em 0 0.8em;
          margin: 0;
        }
        .content {
          display: grid;
          grid-template-rows: repeat(3, auto);
        }
        .info {
          display: grid;
          background-color: ${colors.cardBg};
          box-shadow: ${colors.cardShadow};
        }
        .event-image img {
          margin: 0 auto;
          display: block;
          max-width: 100%;
        }
        .info .dates {
          padding: 0.8em ${dimensions.cardPadding};
          border-bottom: 1px solid ${colors.cardSeparator};
        }
        .info .date {
          display: block;
          margin: 0.3em 0;
        }
        .info .more-dates {
          display: block;
          margin: 0.5em 0;
          color: ${colors.textSecondary};
          color: ${colors.textSecondary};
        }
        .additional-info {
          padding: 1em ${dimensions.cardPadding};
        }
        .info .labeled-text {
          margin: 0.9em 0;
        }
        .info .labeled-text > strong {
          display: block;
        }
        .description-container {
          padding: 1.5em 0;
        }
        .description {
          padding: 1em 0 0;
        }
        .facebook-page {
          color: ${colors.linkText};
          display: block;
          margin: 2em 0 1em;
        }
        .organiser {
          margin-top: 1em;
        }
        .description-container {
          grid-area: 2 / 1 / 3 / 2;
        }
        @media (min-width: 500px) {
          .event-image {
            grid-area: 1 / 1 / 2 / 3;
          }
          .info {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 900px) {
          .info {
            grid-template-columns: 1fr;
          }
          .event-image {
            grid-area: auto;
          }
          .content {
            grid-template-rows: auto auto;
            grid-template-columns: 1fr 2fr;
          }
          .description-container {
            grid-area: 1 / 2 / 3 / 3;
            padding: 1em 2em 0;
          }
          .description {
            padding: 1em 0em 0;
          }
        }
      `}</style>
    </main>
  );
}

EventPage.getInitialProps = async ctx => {
  const { event: eventId } = ctx.query;

  const event = await getEvent(eventId);

  let venue = null;
  if (event.organiser.venue) {
    venue = await getVenue(event.organiser.venue);
  }

  return {
    event,
    venue,
  };
};

const getBreadcrumbs = ({ event }) => [
  { key: 'events', url: 'events' },
  { key: 'event', url: event.id, title: event.title || event.facebook.title },
];

export default withPageLayout(getBreadcrumbs)(EventPage);
