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
          margin-right: ${dimensions.gridGap};
          background: ${colors.cardBg};
          align-items: center;
          border-radius: ${dimensions.tileRadius};
        }
        .image {
          background: no-repeat center center;
          background-size: cover;
        }
        .label {
          box-sizing: border-box;
          padding: 1em;
        }
        .image {
          width: 40%;
          height: 100%;
        }
        ul {
          overflow-x: auto;
        }
        @media (max-width: 800px) {
          .tile {
            width: 10em;
            height: 3em;
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
