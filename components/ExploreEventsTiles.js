import PropTypes from 'prop-types';

import { Link } from '../routes';
import __ from '../lib/i18n';
import colors from '../styles/colors';
import dimensions from '../styles/dimensions';

const TILES = [
  {
    label: __('ExploreEventsTiles.venue'),
    imageUrl:
      'https://lh3.googleusercontent.com/cNZm4l8lUc0-_35gFW7lYIq-FLjT5SfyveU2ZlpflMeMVtj2FTzMP84x6qv5DvLfrzd1dYRvaZ12Gw-82dc4hSoRbokl4F8oRw',
    route: 'venues',
  },
  {
    label: __('ExploreEventsTiles.artist'),
    imageUrl:
      'https://lh3.googleusercontent.com/PQUZEPTOAUwMZd-vWkIDwwqBfVyUy6ygnZxQtL6-4jApQQ2HJjKGZnYljzQh8tfUBZSdMT1cGBb1jpFxpSA7yZgTM6FTGuw59g',
    route: 'artists',
  },
  {
    label: __('ExploreEventsTiles.area'),
    imageUrl:
      'https://lh3.googleusercontent.com/LXB09B7p4ndDvYQ_Njgny-8YBa_VFBWrJwxDY3uhjSg9ic-QDf-xCOxpHew5YqPVlrFMsEI36qNblUGzfSsBKPwoU3sziaDE_g',
    route: 'areas',
  },
];

function ExploreEventsTiles(props) {
  const { routeParams } = props;

  return (
    <nav className="container">
      <ul>
        {TILES.map(({ label, route, imageUrl }) => (
          <li key={route}>
            <Link route={route} params={routeParams}>
              <a href="" className="tile">
                <div
                  className="image"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                />
                <span className="label">{label}</span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {/*language=CSS*/}
      <style jsx>{`
        ul {
          display: flex;
        }
        .tile {
          display: flex;
          box-shadow: ${colors.cardShadow};
          background: ${colors.cardBg};
          align-items: center;
          border-radius: ${dimensions.tileRadius};
        }
        li:not(:last-child) .tile {
          margin-right: ${dimensions.gridGap};
        }
        li:last-child .tile {
          margin-right: ${dimensions.bodyPadding};
        }
        .image {
          background: no-repeat center center;
          background-size: cover;
          border-top-left-radius: ${dimensions.tileRadius};
          border-bottom-left-radius: ${dimensions.tileRadius};
          overflow: hidden;
          height: 4em;
          width: 40%;
        }
        .label {
          box-sizing: border-box;
          padding: 1em;
        }
        ul {
          overflow-x: scroll;
          overflow-y: hidden;
          -webkit-overflow-scrolling: touch;
        }
        @media (max-width: 350px) {
          .tile {
            width: calc((100vw - 4em));
          }
        }
        @media (min-width: 350px) {
          .tile {
            width: calc((100vw - 4em - 14px) * 0.5);
          }
        }
        @media (min-width: 560px) {
          .tile {
            width: calc((100vw - 4em - 14px * 2) * 0.33);
          }
        }
        @media (min-width: 800px) {
          .tile {
            width: 16em;
            height: 4em;
          }
        }
      `}</style>
    </nav>
  );
}

ExploreEventsTiles.propTypes = {
  routeParams: PropTypes.object,
};

export default ExploreEventsTiles;
