import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import moment from 'moment-timezone';
import find from 'lodash/find';
import { useSelector } from 'react-redux';

import { Link } from '../routes';
import withPageLayout from '../components/PageLayout';
import { getEvent, getEvents, getVenue } from '../lib/api';
import colors from '../styles/colors';
import __, { _o } from '../lib/i18n';
import dimensions from '../styles/dimensions';
import ResponsiveImage from '../components/ResponsiveImage';
import { formatEventDate } from '../lib/dates';
import PrimaryButton from '../components/PrimaryButton';
import { generateTicketRedirectUrl } from '../components/events/util';
import ReadMoreLess from '../components/ReadMoreLess';
import { useElemDimensions } from '../lib/hooks';
import EventDateSelect from '../components/events/DateSelector';
import ArtistList from '../components/artists/ArtistList';
import { classNames, generateMetaDescription } from '../lib/util';
import { setUrlParams } from '../lib/routing';
import SeeOnMap from '../components/SeeOnMap';
import EventTicketExternalCheckoutModal from '../components/events/EventTicketExternalCheckoutModal';
import ticketProviders from '../components/events/ticket-providers';
import ImageSlider from '../components/ImageSlider';
import EventRow from '../components/events/EventRow';
import BuyTicketButton from '../components/events/BuyTicketButton';
import EventTicketModal from '../components/events/EventTicketModal';
import TicketUsps from '../components/events/TicketUsps';
import Spinner from '../components/Spinner';
import { getCurrency } from '../state/shop';
import { isEventDatePast } from '../lib/events';
import EventQrCodeModal from '../components/events/EventQrCodeModal';
import EventGuestListModal from '../components/events/EventGuestListModal';

export function EventPage(props) {
  const { event, routeParams, similarEvents, venue, query } = props;

  const currency = useSelector(getCurrency);

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
  const { products = [] } = tickets;

  const [mediaRef, setMediaRef] = useState(null);
  const [showExternalTicketModal, setShowExternalTicketModal] = useState(
    query.externalCheckout !== undefined
  );
  const [showQrCodeModal, setShowQrCodeModal] = useState(
    query.qrCode !== undefined
  );
  const [showGuestListModal, setShowGuestListModal] = useState(
    query.qrCode !== undefined
  );
  const [ticketModalStep, setTicketModalStep] = useState(
    query.checkoutStep || null
  );
  const [dateIndex, setDateIndex] = useState(query.dateIndex || 0);
  const mediaDimensions = useElemDimensions(mediaRef);

  useEffect(() => {
    setTicketModalStep(query.checkoutStep);
  }, [query.checkoutStep]);

  useEffect(() => {
    setShowExternalTicketModal(query.externalCheckout !== undefined);
  }, [query.externalCheckout]);

  useEffect(() => {
    setShowQrCodeModal(query.qrCode !== undefined);
  }, [query.qrCode]);

  useEffect(() => {
    setShowGuestListModal(query.guestList !== undefined);
  }, [query.guestList]);

  const changeCheckoutStep = step => {
    setUrlParams({
      checkoutStep: step,
      client_secret: null,
      livemode: null,
      source: null,
    });
  };

  const toggleExternalCheckout = () => {
    setUrlParams({
      externalCheckout: showExternalTicketModal ? null : '',
    });
  };

  const toggleQrCodeModal = () => {
    setUrlParams({
      qrCode: showQrCodeModal ? null : '',
    });
  };

  const toggleGuestListModal = () => {
    setUrlParams({
      guestList: showGuestListModal ? null : '',
    });
  };

  const date = dates[dateIndex];
  const artists =
    date.artists && date.artists.length ? date.artists : event.artists;
  const ticketsUrl = date.ticketsUrl || (tickets && tickets.checkoutUrl);
  const ticketProvider =
    tickets.provider && find(ticketProviders, { id: tickets.provider });
  const isPast = isEventDatePast(date);

  const switchDateIndex = dateIndex => {
    setUrlParams({ dateIndex });
    setDateIndex(dateIndex);
  };

  let ticketButton = null;
  let ticketsViaString;
  if (!isPast) {
    if (tickets.soldOut) {
      ticketButton = (
        <PrimaryButton title={__('EventPage.soldOut')} disabled={true} />
      );
    } else if (tickets.free) {
      ticketButton = (
        <BuyTicketButton
          title={__('EventPage.free')}
          currency={currency}
          price={0}
          disabled={true}
        />
      );
    } else if (tickets.qrCode) {
      ticketButton = (
        <PrimaryButton
          onClick={toggleQrCodeModal}
          title={__('EventPage.getQrCode')}
        />
      );
    } else if (tickets.guestList) {
      ticketButton = (
        <PrimaryButton
          onClick={toggleGuestListModal}
          title={__('EventPage.joinGuestList')}
        />
      );
    } else if (tickets.doorSale) {
      ticketButton = (
        <BuyTicketButton
          title={__('EventPage.doorSale')}
          currency={currency}
          price={tickets.displayPrice}
          disabled={true}
        />
      );
    } else if (products.length) {
      ticketButton = (
        <BuyTicketButton
          currency={currency}
          price={products[0].price || tickets.displayPrice}
          onClick={() => changeCheckoutStep('cart')}
        />
      );
    } else if (ticketProvider && date.providerEventId) {
      ticketsViaString = __('EventPage.buyTicketsBy', {
        by: ticketProvider.name,
      });
      ticketButton = (
        <BuyTicketButton
          currency={currency}
          price={tickets.displayPrice}
          onClick={toggleExternalCheckout}
        />
      );
    } else if (ticketsUrl) {
      ticketsViaString = __('EventPage.buyTicketsVia', {
        via: ticketsUrl.match(/^(?:https?:\/\/)(?:www.)?((?:[^/:]+))/).pop(),
      });
      ticketButton = (
        <BuyTicketButton
          currency={currency}
          price={tickets.displayPrice}
          onClick={toggleExternalCheckout}
          href={generateTicketRedirectUrl(event.id, dateIndex)}
          target="_blank"
          rel="noopener noreferrer"
        />
      );
    }
  }

  return (
    <main
      className={classNames([ticketButton && 'has-tickets', isPast && 'past'])}
    >
      <Head>
        <title>
          {__('EventPage.meta.title', {
            event: title || facebook.title,
            city: location.city,
          })}
        </title>
        <meta
          name="description"
          content={generateMetaDescription(
            _o(description) || facebook.description
          )}
        />
        {!!images.length && (
          <meta property="og:image" content={`${images[0].url}=s1200`} />
        )}
      </Head>
      <div className="main">
        {(!!ticketModalStep || showExternalTicketModal) && (
          <div className="spinner-overlay">
            <Spinner />
          </div>
        )}
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
                <div className="img" style={{ maxWidth: images[0].width }}>
                  <ResponsiveImage
                    lazy={false}
                    url={images[0].url}
                    widths={[600, 900, 2000]}
                    alt={title || facebook.title}
                    progressive={false}
                    width={images[0].width}
                    height={images[0].height}
                    sizes={`(max-width: 800px) 100vw, calc(0.6 * ${
                      dimensions.pageWidth
                    })`}
                  />
                </div>
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
          <section className="details">
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
            {!!tags.length && (
              <section className="genres">
                {tags.map(tag => _o(tag.name)).join(', ')}
              </section>
            )}
            <div className="where">
              <Link route="venue" params={{ venue: venue.id, ...routeParams }}>
                <a target="_blank">{venue.name}</a>
              </Link>
            </div>
          </section>
        </header>
        <section className="description">
          <h2>{__('EventPage.description')}</h2>
          <div className="content">
            <ReadMoreLess
              initialHeight={400}
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
        {!!similarEvents && similarEvents.results.length && (
          <section className="similar-events">
            <h2>{__('EventPage.similarEvents')}</h2>
            <EventRow
              routeParams={routeParams}
              events={similarEvents.results}
              totalCount={similarEvents.totalCount}
            />
          </section>
        )}
      </div>
      <aside className="sidebar">
        {ticketButton && (
          <section className={'buy-tickets'} id="buy-tickets-bottom">
            {ticketButton}
            <span className="via">{ticketsViaString}</span>
            {!tickets.free && !tickets.soldOut && (
              <div className="usps">
                <TicketUsps
                  hideCheckout={tickets.qrCode || tickets.guestList}
                />
              </div>
            )}
            <span className="info">
              {tickets.guestList && _o(tickets.guestListInfo)}
              {tickets.qrCode && _o(tickets.qrCodeInfo)}
            </span>
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
        <EventTicketExternalCheckoutModal
          ticketProvider={tickets.provider}
          eventId={date.providerEventId}
          providerData={tickets.providerData}
          isOpen={showExternalTicketModal}
          onClose={toggleExternalCheckout}
        />
      )}
      {tickets.qrCode && (
        <EventQrCodeModal
          event={event}
          isOpen={showQrCodeModal}
          onClose={toggleQrCodeModal}
        />
      )}
      {tickets.guestList && (
        <EventGuestListModal
          event={event}
          isOpen={showGuestListModal}
          onClose={toggleGuestListModal}
        />
      )}
      {!!products.length && (
        <EventTicketModal
          step={ticketModalStep}
          onStepChange={changeCheckoutStep}
          event={event}
          dateIndex={dateIndex}
          sourceId={query.source}
          clientSecret={query.client_secret}
        />
      )}
      {/*language=CSS*/}
      <style jsx>{`
        .spinner-overlay {
          z-index: 300;
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          pointer-events: none;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${colors.bgOverlay};
          transition: opacity 0.3s;
        }
        .header {
          background: ${colors.cardBg};
          box-shadow: ${colors.cardShadow};
        }
        .media {
          width: 100%;
        }
        .media .thumbnail {
          min-height: 160px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background: no-repeat ${colors.imagePlaceholder};
          background-size: cover;
        }
        .media .thumbnail .bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background: no-repeat;
          background-size: cover;
        }
        .media .img {
          width: 100%;
        }
        .media :global(picture) {
          background: none;
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
        .past .when .date {
          text-decoration: line-through;
        }
        .when .date {
          padding-left: 2.2em;
          display: flex;
          align-items: center;
          background: url(/static/img/event-date.svg) left center no-repeat;
        }
        .when .date > :global(div) {
          width: 100%;
        }
        .where {
          padding: 0.5em 0 0.5em 2.2em;
          background: url(/static/img/event-location.svg) left center no-repeat;
        }
        .genres {
          padding: 0.5em 0 0.5em 2.2em;
          background: url(/static/img/event-music.svg) left center no-repeat;
        }
        .details {
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
          margin: -0.3em 0 ${dimensions.cardPadding};
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
        .sidebar .buy-tickets {
          position: static;
          background: ${colors.cardBg};
          box-shadow: ${colors.cardShadow};
          padding: 1em ${dimensions.cardPadding};
        }
        .sidebar .buy-tickets :global(button) {
          width: 100%;
        }
        .sidebar .buy-tickets .info {
          display: block;
          background: url(/static/img/event-ticket-info.svg) no-repeat left -0.3em
            center;
          margin: 1.2em 0 0;
          padding-left: 1.8em;
        }
        .usps {
          margin: 0.7em 0 -0.3em;
        }
        @media (max-width: 800px) {
          .header {
            margin: 0 -${dimensions.bodyPadding} 2em;
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
            margin-top: 3em;
          }
          .when .buy-tickets {
            margin-top: 1em;
          }
          .when .buy-tickets :global(button) {
            width: 100%;
          }
          .when .date,
          .where,
          .genres {
            background-size: 1em;
          }
          .map .preview {
            margin: 0 -${dimensions.bodyPadding};
          }
          .similar-events {
            max-width: calc(100vw - 2 * ${dimensions.bodyPadding});
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
            margin-top: 2.5em;
            display: grid;
            grid-template-columns: 40% 60%;
            grid-template-rows: auto;
            grid-template-areas:
              'sidebar main'
              'sidebar main'
              'sidebar main';
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
          .sidebar {
            grid-area: sidebar;
            margin-right: 4em;
          }
          .sidebar section:first-of-type h2 {
            margin-top: 0;
          }
          :not(.has-tickets) .description {
            grid-area: usps;
          }
          .venue .images {
            height: 205px;
            border-radius: ${dimensions.images};
            overflow: hidden;
          }
          .header .buy-tickets .via {
            display: none;
          }
          .when {
            display: flex;
          }
          .when .buy-tickets {
            margin-left: 1em;
          }
          .where {
            background-position-x: 0.1em;
          }
          .when .date.multiple {
            flex-grow: 1;
          }
          .description .content,
          .venue .about {
            padding: ${dimensions.cardPadding};
          }
          .venue .name-address {
            padding: 1em ${dimensions.cardPadding};
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
    similarEvents:
      tags.length &&
      (await getEvents({
        limit: 4,
        query: {
          pageSlug,
          exclude: event.id,
          tags: tags.map(tag => tag.id),
          sortBy: 'tagsMatchScore:desc',
        },
      })),
  };
};

const breadcrumbs = ({ event }) => [
  { key: 'events', route: 'events' },
  { key: 'event', title: event.title || event.facebook.title },
];

export default withPageLayout({
  breadcrumbs,
})(EventPage);
