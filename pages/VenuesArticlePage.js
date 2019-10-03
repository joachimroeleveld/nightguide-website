import __, { _o } from '../lib/i18n';
import colors from '../styles/colors';
import ImageSlider from '../components/ImageSlider';
import dimensions from '../styles/dimensions';
import DistanceIndicator from '../components/DistanceIndicator';
import { Link } from '../routes';
import EventRow from '../components/events/EventRow';
import { useScrollToId, useToggleState } from '../lib/hooks';
import { setUrlParams } from '../lib/routing';
import StickyNavigation from '../components/StickyNavigation';
import { classNames } from '../lib/util';
import SeeAllButton from '../components/SeeAllButton';
import { getEvents, getVenues } from '../lib/api';
import withPageLayout from '../components/PageLayout';
import ResponsiveImage from '../components/ResponsiveImage';

function VenuesArticlePage(props) {
  const { article, venues, events, routeParams, query } = props;
  const { section } = query;
  const { intro, title, venues: sections } = article;

  useScrollToId(section ? `venue-${section}` : null);
  const [showIntro, toggleShowIntro] = useToggleState(false);

  const goToSection = section => {
    setUrlParams({ section });
  };

  const renderShortlistItem = (section, index) => {
    const { tagLine } = section;
    const venue = venues[index];
    const { name } = venue;
    return (
      <div className="item">
        <span className="name">{'- ' + name}</span>
        <span className="tagline">{' ' + _o(tagLine)}</span>
        {/*language=CSS*/}
        <style jsx>{`
          .tagline {
            color: ${colors.textPurple};
          }
          @media (min-width: 768px) {
            .item {
              font-size: 0.875em;
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <main className="container">
      <header>
        <h1>{_o(title)}</h1>
        <p
          className={classNames(['intro', showIntro && 'expanded'])}
          onClick={toggleShowIntro}
        >
          {_o(intro)}
        </p>
      </header>

      <div className="columns">
        <aside className="shortlist">
          <StickyNavigation
            title={__('VenuesArticle.theList')}
            items={sections}
            renderItem={renderShortlistItem}
            onItemClick={section => goToSection(section.venueId)}
          />
        </aside>

        <div className="sections">
          {sections.map((section, index) => {
            const { tagLine, body } = section;
            const venue = venues[index];

            if (!venue) {
              return null;
            }

            const { id, name, images, location } = venue;
            const imageSlides = images.map(({ url }) => ({ imgSrc: url }));

            return (
              <section className="venue" key={id} id={`venue-${id}`}>
                <div className="img-slider">
                  <ImageSlider
                    slides={imageSlides}
                    imgWidths={[600, 900, 2000]}
                    imgSizes={`(max-width: 47em) calc(100vw - 2 * ${
                      dimensions.bodyPadding
                    }), 35em`}
                  />
                </div>
                <header className="title">
                  <Link
                    route="venue"
                    params={{
                      ...routeParams,
                      venue: id,
                    }}
                  >
                    <a>
                      <h2 className="name">{name}</h2>
                      <p className="tagline">{_o(tagLine)}</p>
                    </a>
                  </Link>
                </header>
                <p className="description">{_o(body)}</p>
                <footer className="distance">
                  <DistanceIndicator {...location.coordinates} />
                </footer>
                {!!events[index].length && (
                  <div className="events">
                    <h3>{__('VenuesArticle.upcomingEvents')}</h3>
                    <EventRow
                      routeParams={routeParams}
                      events={events[index]}
                      seeAllParams={{ ...routeParams, venue: id }}
                    />
                    <Link route="events" params={{ ...routeParams, venue: id }}>
                      <SeeAllButton title={__('VenuesArticle.seeAllEvents')} />
                    </Link>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {/*language=CSS*/}
      <style jsx>{`
        .columns {
          display: grid;
          grid-template-areas:
            'a'
            'b';
        }
        h1 {
          font-weight: 800;
        }
        .intro {
          margin: -0.5em 0 2em;
          color: ${colors.textSecondary};
        }
        .img-slider {
          height: 16em;
          overflow: hidden;
          border-radius: ${dimensions.tileRadius};
        }
        .venue:not(:last-child) {
          margin-bottom: 2.5em;
          padding-bottom: 2.5em;
          border-bottom: 1px solid ${colors.separator};
        }
        .venue .tagline {
          color: ${colors.textPurple};
          margin-top: -1.2em;
        }
        .venue .title {
          background: no-repeat right center
            url(/static/img/venue-article-title-arrow.svg);
        }
        .venue .distance {
          margin: 1em 0;
        }
        .venue .events {
          max-width: calc(100vw - 2 * ${dimensions.bodyPadding});
          margin-top: 2em;
        }
        .venue {
          max-width: calc(100vw - 2 * ${dimensions.bodyPadding});
        }
        @media (max-width: 768px) {
          .shortlist {
            margin: -0.5em 0 2em;
          }
          .intro:not(.expanded) {
            height: 1.65em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 1em;
            background: url('/static/img/venues-article-intro-expand.svg')
              no-repeat right center;
          }
        }
        @media (min-width: 768px) {
          .sections {
            padding-right: 5em;
            box-sizing: border-box;
            grid-area: a;
          }
          .container > header {
            width: 30em;
          }
          .columns {
            grid-template-columns: 35em 13em;
          }
        }
      `}</style>
    </main>
  );
}

VenuesArticlePage.getInitialProps = async ctx => {
  const { article } = ctx;

  const venueIds = (article.venues || []).map(venue => venue.venueId);
  const venues = await getVenues({ query: { ids: venueIds } }).then(
    res => res.results
  );

  venues.sort((a, b) => {
    return venueIds.indexOf(a.id) - venueIds.indexOf(b.id);
  });

  const events = await Promise.all(
    venueIds.map(venueId =>
      getEvents({
        query: { venue: venueId },
        limit: 5,
      }).then(res => res.results)
    )
  );

  return {
    venues,
    events,
  };
};

export default withPageLayout({
  pageWidth: '47rem',
  breadcrumbs: ({ article }) => [
    { key: 'articles', route: 'articles' },
    { key: 'article', title: _o(article.title) },
  ],
})(VenuesArticlePage);
