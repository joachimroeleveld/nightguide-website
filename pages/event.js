import Head from 'next/head';
import { useState } from 'react';

import withPageLayout from '../components/PageLayout';
import { getEvent, getEvents, getVenue } from '../lib/api';
import colors from '../styles/colors';
import { getFutureEventDates } from '../lib/events';
import __, { _o } from '../lib/i18n';
import dimensions from '../styles/dimensions';
import ResponsiveImage from '../components/ResponsiveImage';
import TagList from '../components/TagList';
import VenueTile from '../components/venues/VenueTile';
import EventGrid from '../components/events/EventGrid';
import { formatEventDate } from '../lib/dates';
import PrimaryButton from '../components/PrimaryButton';
import { generateTicketRedirectUrl } from '../components/events/util';
import VideoModal from '../components/VideoModal';
import ReadMoreLess from '../components/ReadMoreLess';

function EventPage(props) {
  const { event, baseUrl, similarEvents, venue } = props;

  const [showAllDates, setShowAllDates] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const toggleVideoModal = () => setShowVideoModal(!showVideoModal);

  const {
    title,
    facebook,
    images,
    dates,
    location,
    tags,
    tickets = {},
    description = {},
    videoUrl,
  } = event;
  const futureDates = getFutureEventDates(dates);

  const toggleShowAllDates = () => setShowAllDates(!showAllDates);

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
              {!!videoUrl && (
                <div className="video-button">
                  <button onClick={toggleVideoModal} />
                  <VideoModal
                    url={videoUrl}
                    isOpen={showVideoModal}
                    onClose={toggleVideoModal}
                  />
                </div>
              )}
            </figure>
            <div className="dates">
              {!futureDates.length && (
                <span>{__('nDatesInPast', { dates: dates.length })}</span>
              )}
              {futureDates
                .slice(0, showAllDates ? futureDates.length : 3)
                .map((date, index) => (
                  <div className={'date'} key={index}>
                    <span>{formatEventDate(date.from, date.to)}</span>
                  </div>
                ))}
              {!showAllDates && futureDates.length > 3 && (
                <a onClick={toggleShowAllDates} className={'more-dates'}>
                  {__('eventPage.nMoreDates', { n: futureDates.length - 3 })}
                </a>
              )}
            </div>
            <div className="additional-info">
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
              <div className="tickets-button">
                {!!tickets.checkoutUrl && (
                  <PrimaryButton
                    rel="noopener noreferrer"
                    target="_blank"
                    href={generateTicketRedirectUrl(
                      event.id,
                      dates.indexOf(futureDates[0])
                    )}
                    title={__('buyTickets')}
                  />
                )}
              </div>
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
          <ReadMoreLess initialHeight={500}>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: (_o(description) || facebook.description).replace(
                  /(\/n)/g,
                  '<br/>'
                ),
              }}
            />
          </ReadMoreLess>
        </div>

        {!!similarEvents.length && (
          <section className="similar-events">
            <h2>{__('eventPage.similarEvents')}</h2>
            <EventGrid baseUrl={baseUrl} events={similarEvents} />
          </section>
        )}
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
          grid-template-rows: repeat(4, auto);
        }
        .organiser {
          grid-area: 4 / 1 / 5 / 2;
        }
        .info {
          display: grid;
          font-size: 0.95em;
          background-color: ${colors.cardBg};
          box-shadow: ${colors.cardShadow};
        }
        .event-image {
          position: relative;
        }
        .event-image img {
          margin: 0 auto;
          display: block;
          max-width: 100%;
        }
        .video-button {
          position: absolute;
          right: 0;
          top: 0;
          width: 50%;
          height: 60%;
          background-image: linear-gradient(
            212deg,
            #000000 0%,
            rgba(0, 0, 0, 0) 46%
          );
          display: flex;
          justify-content: flex-end;
        }
        .video-button button {
          width: 30px;
          height: 30px;
          margin: 0.7em;
          background: url(/static/img/video-icon.svg) no-repeat center center;
          background-size: cover;
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
          text-decoration: underline;
          margin: 0.5em 0;
          color: ${colors.textSecondary};
          color: ${colors.textSecondary};
        }
        .additional-info {
          padding: 0.5em ${dimensions.cardPadding} 1.5em;
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
          word-break: break-word;
        }
        .facebook-page {
          color: ${colors.linkText};
          display: block;
          margin: 1em 0 1em;
        }
        .tickets-button {
          margin-top: 2em;
        }
        .organiser,
        .similar-events {
          margin-top: 1em;
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
            grid-template-rows: max-content 1fr;
            grid-template-columns: 1fr 2fr;
          }
          .organiser {
            grid-area: 2 / 1 / 3 / 2;
          }
          .similar-events {
            margin-left: 2em;
          }
          .similar-events {
            grid-area: 2 / 2 / 4 / 3;
          }
          .description-container {
            grid-area: 1 / 2 / 2 / 3;
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
  const { event: eventId, pageSlug } = ctx.query;

  const event = await getEvent(eventId);
  const tags = event.tags || [];

  return {
    event,
    venue: await getVenue(event.organiser.venue.id),
    similarEvents: tags.length
      ? (await getEvents({
          limit: 4,
          query: {
            pageSlug: pageSlug,
            exclude: event.id,
            tags: event.tags.map(tag => tag.id),
            sortBy: 'tagsMatchScore:desc',
          },
        })).results
      : [],
  };
};

const getBreadcrumbs = ({ event }) => [
  { key: 'events', url: 'events' },
  { key: 'event', title: event.title || event.facebook.title },
];

export default withPageLayout(getBreadcrumbs)(EventPage);
