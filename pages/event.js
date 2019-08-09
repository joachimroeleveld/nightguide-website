import Head from 'next/head';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import moment from 'moment-timezone';

import { Link, Router } from '../routes';
import withPageLayout from '../components/PageLayout';
import { getEvent, getEvents, getVenue } from '../lib/api';
import colors from '../styles/colors';
import __, { _o } from '../lib/i18n';
import dimensions from '../styles/dimensions';
import ResponsiveImage from '../components/ResponsiveImage';
import TagList from '../components/TagList';
import { formatEventDate } from '../lib/dates';
import PrimaryButton from '../components/PrimaryButton';
import { generateTicketRedirectUrl } from '../components/events/util';
import ReadMoreLess from '../components/ReadMoreLess';
import { useElemDimensions, useWindowWidth } from '../lib/hooks';
import EventDateSelect from '../components/events/DateSelector';
import VenueSlider from '../components/venues/VenueSlider';
import ArtistList from '../components/tags/ArtistList';
import { classNames } from '../lib/util';
import { useOnScroll } from '../lib/hooks';
import Header from '../components/Header';
import { getRouteInfo } from '../lib/routing';

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
  const [dateIndex, setDateIndex] = useState(query.dateIndex || 0);
  const mediaDimensions = useElemDimensions(mediaRef);
  const [isBuyTicketsButtonFixed, setIsBottomTicketsButtonFixed] = useState(
    false
  );

  useOnScroll(() => {
    if (!tickets.checkoutUrl) return;

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

  const date = dates[dateIndex];

  const ticketsViaString =
    tickets.checkoutUrl &&
    __('eventPage.buyTicketsVia', {
      domain: tickets.checkoutUrl
        .match(/^(?:https?:\/\/)(?:www.)?((?:[^/:]+))/)
        .pop(),
    });

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
            (_o(description) || facebook.description)
              .slice(0, 160)
              .replace('\n', ' ')
              .replace('  ', ' ') + '...'
          }
        />
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
                  onChange={setDateIndex}
                  value={dateIndex}
                  dates={dates}
                />
              )}
              {dates.length === 1 && (
                <span>{formatEventDate(date.from, date.to)}</span>
              )}
            </div>
            {tickets && tickets.checkoutUrl && (
              <div className="buy-tickets" id="buy-tickets-header">
                <PrimaryButton
                  iconSrc={'/static/img/buy-tickets-arrow.svg'}
                  href={generateTicketRedirectUrl(event.id, dateIndex)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={__('eventPage.getTickets')}
                />
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
      <section className="description">
        <h2>{__('eventPage.details')}</h2>
        <div className="content">
          <ReadMoreLess
            initialHeight={300}
            backgroundImage={`linear-gradient(to bottom, rgba(46, 46, 46, 0.44), ${
              colors.cardBg
            } )`}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: (_o(description) || facebook.description).replace(
                  /(\/n)/g,
                  '<br/>'
                ),
              }}
            />
          </ReadMoreLess>
        </div>
      </section>
      <aside className="sidebar">
        {tickets && tickets.checkoutUrl && (
          <section
            className={classNames([
              'buy-tickets',
              isBuyTicketsButtonFixed && 'fixed',
            ])}
            id="buy-tickets-bottom"
          >
            <div className="fixed-button">
              <PrimaryButton
                iconSrc={'/static/img/buy-tickets-arrow.svg'}
                href={generateTicketRedirectUrl(event.id, dateIndex)}
                target="_blank"
                rel="noopener noreferrer"
                title={__('buyTickets')}
              />
            </div>
            {!isBuyTicketsButtonFixed && (
              <PrimaryButton
                iconSrc={'/static/img/buy-tickets-arrow.svg'}
                href={generateTicketRedirectUrl(event.id, dateIndex)}
                target="_blank"
                rel="noopener noreferrer"
                title={__('buyTickets')}
              />
            )}
            <span className="via">{ticketsViaString}</span>
          </section>
        )}
        {date.artists && !!date.artists.length && (
          <section className="artists">
            <header>
              <h2>{__('eventPage.artists')}</h2>
            </header>
            <div className="list">
              <ArtistList routeParams={routeParams} artists={date.artists} />
            </div>
          </section>
        )}
        <section className="venue">
          <h2>{__('eventPage.venue')}</h2>
          <div className="tile">
            <VenueSlider
              routeParams={routeParams}
              venue={venue}
              imgWidths={[600, 1000, 2000]}
            />
          </div>
        </section>
      </aside>
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
          padding: 0.7em 2em;
        }
        .title .date {
          padding-right: ${dimensions.bodyPadding};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .title .date .day {
          line-height: 1;
          font-size: 24px;
        }
        .title .date .month {
          font-size: 14px;
          color: ${colors.yellowTextColor};
          text-transform: uppercase;
        }
        h1 {
          font-size: 20px;
          font-weight: 400;
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
        .description h2 {
          padding: 0 ${dimensions.bodyPadding};
        }
        .description .content {
          padding: 1.5em 2em;
          word-break: break-word;
          background: ${colors.cardBg};
          box-shadow: ${colors.cardShadow};
        }
        h2 {
          font-size: 14px;
          margin: 2.3em 0 1.3em;
        }
        .artists header {
          display: flex;
        }
        .artists .toggle-orientation {
          background: url(/static/img/toggle-orientation.svg) center center
            no-repeat;
          width: 1em;
          height: 1em;
          transition: transform 0.3s;
        }
        .artists .toggle-orientation.vertical {
          transform: rotate(90deg);
        }
        .buy-tickets .via {
          color: #5e5e5e;
          font-size: 0.8em;
          text-align: center;
          display: block;
          margin-top: 0.2em;
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
          .venue .tile {
            height: 230px;
            margin: 0 -${dimensions.bodyPadding};
          }
          .description {
            margin: 0 -${dimensions.bodyPadding};
          }
          .sidebar {
            display: grid;
          }
          .sidebar .buy-tickets {
            grid-area: 3 / 1 / 4 / 2;
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
              'sidebar description';
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
          .description {
            grid-area: description;
          }
          .venue .tile {
            height: 205px;
            border-radius: ${dimensions.tileRadius};
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
          .artists .toggle-orientation {
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
        }
      `}</style>
    </main>
  );
}

const HeaderComponent = props => {
  const { query } = props;

  const windowWidth = useWindowWidth();

  const onBackPress = () => {
    if (query.srcRef) {
      const info = getRouteInfo(query.srcRef);
      if (info) {
        return Router.replaceRoute(info);
      }
    }
    history.back();
  };

  if (false) {
    return (
      <div className="header">
        <button className="back" onClick={onBackPress} />
        {/*language=CSS*/}
        <style jsx>{`
          .header {
            position: fixed;
            z-index: 110;
            top: 0;
            display: flex;
            align-items: center;
            height: 3em;
            width: 100%;
            box-shadow: ${colors.headerShadow};
            background: ${colors.bg};
          }
          .back {
            width: 9px;
            height: 16px;
            padding: 1em;
            margin-left: 1em;
            background: url(/static/img/modal-back.svg) no-repeat center center;
          }
        `}</style>
      </div>
    );
  } else {
    return <Header />;
  }
};

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
  { key: 'events', route: 'events' },
  { key: 'event', title: event.title || event.facebook.title },
];

export default withPageLayout({
  getBreadcrumbs,
  HeaderComponent,
})(EventPage);
