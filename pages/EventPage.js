import Head from 'next/head';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import moment from 'moment-timezone';
import find from 'lodash/find';

import { Link } from '../routes';
import withPageLayout from '../components/PageLayout';
import { getEvent, getVenue } from '../lib/api';
import colors from '../styles/colors';
import __, { _o } from '../lib/i18n';
import dimensions from '../styles/dimensions';
import ResponsiveImage from '../components/ResponsiveImage';
import TagList from '../components/TagList';
import { formatEventDate } from '../lib/dates';
import PrimaryButton from '../components/PrimaryButton';
import { generateTicketRedirectUrl } from '../components/events/util';
import ReadMoreLess from '../components/ReadMoreLess';
import { useElemDimensions } from '../lib/hooks';
import EventDateSelect from '../components/events/DateSelector';
import ArtistList from '../components/artists/ArtistList';
import { classNames, trimToDescription } from '../lib/util';
import { useOnScroll } from '../lib/hooks';
import { setUrlParams } from '../lib/routing';
import SeeOnMap from '../components/SeeOnMap';
import EventTicketModal from '../components/events/EventTicketModal';
import ticketProviders from '../components/events/ticket-providers';
import ImageSlider from '../components/ImageSlider';

export function EventPage(props) {
  const { event, routeParams, similarEvents, venue, query } = props;

  const {
    title,
    facebook,
    images,
    dates = [],
    location,
    tags,
    tickets = {},
    description = {},
    videoUrl,
  } = event;

  const [mediaRef, setMediaRef] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [dateIndex, setDateIndex] = useState(query.dateIndex || 0);
  const mediaDimensions = useElemDimensions(mediaRef);
  const [isBuyTicketsButtonFixed, setIsBottomTicketsButtonFixed] = useState(
    false
  );

  const date = dates[dateIndex];
  const artists =
    date.artists && date.artists.length ? date.artists : event.artists;
  const ticketsUrl = date.ticketsUrl || (tickets && tickets.checkoutUrl);
  const ticketProvider =
    tickets.provider && find(ticketProviders, { id: tickets.provider });

  const switchDateIndex = dateIndex => {
    setUrlParams({ dateIndex });
    setDateIndex(dateIndex);
  };

  useOnScroll(() => {
    if (!ticketsUrl) return;

    const { top: headerElemTop } = document
      .querySelector('#buy-tickets-header')
      .getBoundingClientRect();
    const { top: footerElemTop } = document
      .querySelector('#buy-tickets-bottom')
      .getBoundingClientRect();
    const headerHeight = document.querySelector('#header-height');
    const isFixed =
      headerElemTop - headerHeight <= 0 &&
      footerElemTop - window.innerHeight > 0;
    setIsBottomTicketsButtonFixed(isFixed);
  }, [isBuyTicketsButtonFixed]);

  let ticketButton = null;
  let ticketsViaString;
  if (ticketsUrl) {
    ticketsViaString = __('EventPage.buyTicketsVia', {
      via: ticketsUrl.match(/^(?:https?:\/\/)(?:www.)?((?:[^/:]+))/).pop(),
    });
    ticketButton = (
      <PrimaryButton
        iconSrc={'/static/img/buy-tickets-arrow.svg'}
        href={generateTicketRedirectUrl(event.id, dateIndex)}
        target="_blank"
        rel="noopener noreferrer"
        title={__('EventPage.buyTickets')}
      />
    );
  } else if (ticketProvider && date.providerEventId) {
    ticketsViaString = __('EventPage.buyTicketsBy', {
      by: ticketProvider.name,
    });
    ticketButton = (
      <PrimaryButton
        title={__('EventPage.buyTickets')}
        onClick={() => setShowTicketModal(true)}
      />
    );
  }

  return (
    <main className={classNames([ticketButton && 'has-tickets'])}>
      <Head>
        <title>
          {__('EventPage.meta.title', {
            event: title || facebook.title,
            city: location.city,
          })}
        </title>
        <meta
          name="description"
          content={trimToDescription(_o(description) || facebook.description)}
        />
        {!!images.length && (
          <meta property="og:image" content={`${images[0].url}=s1200`} />
        )}
      </Head>
      <header className="header">
        <figure className="media" ref={setMediaRef}>
          {!!videoUrl && (
            <ReactPlayer
              light={true}
              width={mediaDimensions.width}
              height={(mediaDimensions.width / 16) * 9}
              controls={true}
              url={videoUrl}
            />
          )}
          {!videoUrl && !!images.length && (
            <div className="thumbnail">
              <div
                className="bg"
                style={{
                  backgroundImage: `url(${
                    images[0].url
                  }=s50-c-fSoften=1,100,0)`,
                }}
              />
              <ResponsiveImage
                lazy={false}
                url={images[0].url}
                widths={[320]}
                imgStyle={{
                  maxWidth: '320px',
                }}
                alt={title || facebook.title}
                progressive={false}
                width={images[0].width}
                height={images[0].height}
              />
            </div>
          )}
        </figure>
        <section className="title">
          <div className="date">
            <span className="day">{moment(date.from).format('D')}</span>
            <span className="month">{moment(date.from).format('MMM')}</span>
          </div>
          <h1>{title || facebook.title}</h1>
        </section>
        <section className="when-where">
          <div className="when">
            <div
              className={classNames(['date', dates.length > 1 && 'multiple'])}
            >
              {dates.length > 1 && (
                <EventDateSelect
                  onSelect={switchDateIndex}
                  value={dateIndex}
                  dates={dates}
                />
              )}
              {dates.length === 1 && (
                <span>{formatEventDate(date.from, date.to)}</span>
              )}
            </div>
            {ticketButton && (
              <div className="buy-tickets" id="buy-tickets-header">
                {ticketButton}
                <span className="via">{ticketsViaString}</span>
              </div>
            )}
          </div>
          <div className="where">
            <Link route="venue" params={{ venue: venue.id, ...routeParams }}>
              <a target="_blank">{venue.name}</a>
            </Link>
          </div>
        </section>
      </header>
      {ticketButton && (
        <section className="usps">
          <ul>
            <li>
              <span>{__('EventPage.instantConfirmation')}</span>
            </li>
            <div className="separator" />
            <li>
              <span>{__('EventPage.officialPartner')}</span>
            </li>
            <div className="separator" />
            <li>
              <span>{__('EventPage.secureCheckout')}</span>
            </li>
          </ul>
        </section>
      )}
      <section className="description">
        <h2>{__('EventPage.details')}</h2>
        <div className="content">
          {!!tags.length && (
            <section className="tags">
              <div className="list">
                <TagList tags={tags} routeParams={routeParams} />
              </div>
            </section>
          )}
          <ReadMoreLess
            initialHeight={300}
            backgroundImage={`linear-gradient(to bottom, rgba(46, 46, 46, 0.44), ${
              colors.cardBg
            } )`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: (_o(description) || facebook.description).replace(
                  /(\n)/g,
                  '<br/>'
                ),
              }}
            />
          </ReadMoreLess>
        </div>
      </section>
      <aside className="sidebar">
        {ticketButton && (
          <section
            className={classNames([
              'buy-tickets',
              isBuyTicketsButtonFixed && 'fixed',
            ])}
            id="buy-tickets-bottom"
          >
            <div className="fixed-button">{ticketButton}</div>
            {!isBuyTicketsButtonFixed && ticketButton}
            <span className="via">{ticketsViaString}</span>
          </section>
        )}
        {artists && !!artists.length && (
          <section className="artists">
            <header>
              <h2>{__('EventPage.artists')}</h2>
            </header>
            <div className="list">
              <ArtistList routeParams={routeParams} artists={artists} />
            </div>
          </section>
        )}
        <section className="venue">
          <h2>{__('EventPage.venue')}</h2>
          <div className="card">
            <div className="images">
              <ImageSlider
                slides={venue.images}
                imgWidths={[600, 1000, 2000]}
                imgSizes={`(max-width: 800px) 100vw, calc(0.4 * 100vw - 4em - 2 * ${
                  dimensions.bodyPadding
                })`}
              />
            </div>
            <section className="name-address">
              <div className="name">{venue.name}</div>
              <div className="address">
                {[
                  [venue.location.address1, venue.location.address2]
                    .join(' ')
                    .trim(),
                  venue.location.city,
                ].join(', ')}
              </div>
            </section>
            {venue.description && (
              <section className="about">
                <h4>{__('EventPage.aboutVenue')}</h4>
                <ReadMoreLess
                  initialHeight={180}
                  backgroundImage={`linear-gradient(to bottom, rgba(46, 46, 46, 0.44), ${
                    colors.cardBg
                  } )`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: _o(venue.description).replace(/(\n)/g, '<br/>'),
                    }}
                  />
                </ReadMoreLess>
              </section>
            )}
          </div>
        </section>
        <section className="map">
          <header>
            <h2>{__('EventPage.map')}</h2>
          </header>
          <div className="preview">
            <SeeOnMap {...location.coordinates} />
          </div>
        </section>
      </aside>
      {!!date.providerEventId && (
        <EventTicketModal
          ticketProvider={tickets.provider}
          eventId={date.providerEventId}
          providerData={tickets.providerData}
          isOpen={showTicketModal}
          onClose={() => setShowTicketModal(false)}
        />
      )}
      {/*language=CSS*/}
      <style jsx>{`
        .header {
          background: ${colors.cardBg};
          box-shadow: ${colors.cardShadow};
        }
        .header .media {
          width: 100%;
        }
        .header .media .thumbnail {
          min-height: 160px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background: no-repeat ${colors.imagePlaceholder};
          background-size: cover;
        }
        .header .media .thumbnail .bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background: no-repeat;
          background-size: cover;
        }
        .header .title {
          display: flex;
          padding: 1em 2em;
        }
        .title .date {
          padding-right: 2em;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .title .date .day {
          line-height: 1;
          font-size: 1.4em;
        }
        .title .date .month {
          font-size: 0.95em;
          color: ${colors.yellowTextColor};
          text-transform: uppercase;
        }
        h1 {
          font-weight: 500;
          margin: 0;
          display: flex;
          align-items: center;
        }
        .when {
          padding: 0.5em 0;
        }
        .when .date {
          padding-left: 2em;
          display: flex;
          align-items: center;
          background: url(/static/img/event-date.svg) left center no-repeat;
        }
        .when .date > :global(div) {
          width: 100%;
        }
        .where {
          padding: 0.5em 0 0.5em 2em;
          background: url(/static/img/event-location.svg) left 3px center
            no-repeat;
          color: ${colors.linkText};
        }
        .when-where {
          padding: 0.8em ${dimensions.bodyPadding};
        }
        .description .content {
          padding: 1.5em ${dimensions.bodyPadding};
          word-break: break-word;
          background: ${colors.cardBg};
          box-shadow: ${colors.cardShadow};
        }
        h2 {
          margin: 2.3em 0 1.3em;
        }
        .artists header {
          display: flex;
        }
        .buy-tickets .via {
          color: #5e5e5e;
          font-size: 0.9em;
          text-align: center;
          display: block;
          margin-top: 0.2em;
        }
        .map header {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin: 2.3em 0 1.3em;
        }
        .map h2 {
          flex-grow: 1;
          margin: 0;
        }
        .tags {
          margin: -0.3em 0 1em;
        }
        .venue .card {
          background: ${colors.cardBg};
          box-shadow: ${colors.cardShadow};
        }
        .venue .name-address {
          padding: ${dimensions.bodyPadding};
          border-bottom: 1px solid ${colors.separator};
        }
        .venue .name {
          font-weight: 600;
        }
        .venue .about {
          padding: ${dimensions.bodyPadding};
        }
        .venue .about :global(p:first-child) {
          margin-top: 0;
        }
        .venue h4 {
          margin-top: 0;
        }
        .usps li {
          display: flex;
          align-items: center;
        }
        .usps span {
          display: inline-block;
          background: no-repeat left center;
          padding-left: 2em;
        }
        .usps li:nth-of-type(1) span {
          background-image: url(/static/img/event-usps-instant-confirm.svg);
        }
        .usps li:nth-of-type(2) span {
          background-image: url(/static/img/event-usps-partner.svg);
        }
        .usps li:nth-of-type(3) span {
          background-image: url(/static/img/event-usps-secure.svg);
        }
        @media (max-width: 800px) {
          .header {
            margin: 1em -${dimensions.bodyPadding} 2em;
          }
          .header .media {
            width: 100vw;
          }
          .header .title {
            border-bottom: 1px solid ${colors.cardSeparator};
          }
          .header .buy-tickets {
            padding-left: 2em;
          }
          .artists .list {
            padding: 0.5em ${dimensions.bodyPadding};
          }
          .artists header {
            margin: 2.3em ${dimensions.bodyPadding} 1.3em;
          }
          .artists {
            margin: 0 -${dimensions.bodyPadding};
          }
          .artists h2 {
            margin: 0;
            flex-grow: 1;
          }
          .venue .card {
            margin: 0 -${dimensions.bodyPadding};
          }
          .venue .images {
            width: 100vw;
            height: 230px;
          }
          .description {
            margin: 0 -${dimensions.bodyPadding};
          }
          .description h2 {
            padding: 0 ${dimensions.bodyPadding};
          }
          .sidebar {
            display: grid;
          }
          .sidebar .buy-tickets {
            grid-area: 4 / 1 / 5 / 2;
          }
          .sidebar .buy-tickets {
            margin-top: 3em;
          }
          .sidebar .buy-tickets .fixed-button :global(.button) {
            left: 0;
            box-sizing: border-box;
            transition: transform 0.3s ease-in;
            z-index: 100;
            position: fixed;
            transform: translateY(60px);
            margin: 0.7em ${dimensions.bodyPadding} 0.2em;
            bottom: 10px;
            width: calc(100% - 2 * ${dimensions.bodyPadding});
          }
          .sidebar .buy-tickets.fixed .fixed-button :global(.button) {
            transform: translateY(0);
            transition-timing-function: ease-out;
          }
          .when .buy-tickets {
            margin-top: 1em;
          }
          .map .preview {
            margin: 0 -${dimensions.bodyPadding};
          }
          .usps {
            padding: 0.7em 1em;
            border: 1px solid ${colors.separator};
            border-radius: 3px;
            display: flex;
            justify-content: center;
          }
          .usps li {
            padding-top: 0.3em;
            padding-bottom: 0.3em;
          }
        }
        @media (min-width: 800px) {
          h1 {
            font-size: 22px;
            margin: 0.5em 0;
          }
          h2 {
            font-size: 18px;
          }
          main {
            margin-top: 2em;
            display: grid;
            grid-template-columns: 40% 60%;
            grid-template-rows: auto;
            grid-template-areas:
              'sidebar header'
              'sidebar usps'
              'sidebar description';
            align-content: start;
          }
          .header {
            grid-area: header;
            grid-template-columns: 100%;
            grid-template-rows: repeat(3, auto);
            grid-template-areas:
              'title'
              'media'
              'info';
            display: grid;
          }
          .header .title {
            grid-area: title;
          }
          .usps {
            grid-area: usps;
          }
          .sidebar {
            grid-area: sidebar;
            margin-right: 4em;
          }
          .sidebar section:first-of-type h2 {
            margin-top: 0;
          }
          .description {
            grid-area: description;
          }
          :not(.has-tickets) .description {
            grid-area: usps;
          }
          .venue .images {
            height: 205px;
            border-radius: ${dimensions.images};
            overflow: hidden;
          }
          .sidebar .buy-tickets {
            position: static;
            background: ${colors.cardBg};
            box-shadow: ${colors.cardShadow};
            padding: 1em 1.5em 0.4em;
          }
          .sidebar .buy-tickets .fixed-button {
            display: none;
          }
          .header .buy-tickets .via {
            display: none;
          }
          .when {
            display: flex;
          }
          .when .date {
            padding-right: 1em;
          }
          .when .date.multiple {
            flex-grow: 1;
          }
          .description .content,
          .venue .name-address,
          .venue .about {
            padding: 1.5em;
          }
          .usps ul {
            display: flex;
            margin: 1em 0 0;
          }
          .usps .separator {
            flex-grow: 1;
            padding: 0 1em;
            position: relative;
          }
          .usps .separator:before {
            content: '';
            position: absolute;
            left: 50%;
            top: 0;
            height: 100%;
            width: 1px;
            background: ${colors.separator};
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
    // similarEvents: tags.length
    //   ? (await getEvents({
    //       limit: 4,
    //       query: {
    //         pageSlug: pageSlug,
    //         exclude: event.id,
    //         tags: event.tags.map(tag => tag.id),
    //         sortBy: 'tagsMatchScore:desc',
    //       },
    //     })).results
    //   : [],
  };
};

const breadcrumbs = ({ event }) => [
  { key: 'events', route: 'events' },
  { key: 'event', title: event.title || event.facebook.title },
];

export default withPageLayout({
  breadcrumbs,
})(EventPage);
