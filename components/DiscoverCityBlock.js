import { withNavigation } from './Navigation';
import __, { __city } from '../lib/i18n';
import { Link } from '../routes';
import colors from '../styles/colors';

const DiscoverCityBlock = withNavigation(props => {
  const { routeParams, pageSlug } = props;
  return (
    <div className="container">
      <div className="usps">
        <span className="usp">
          {__('DiscoverCityShortcode.parties&Events')}
        </span>
        <span className="usp">{__('DiscoverCityShortcode.clubs&Bars')}</span>
      </div>
      <Link to={`/${pageSlug}`} params={routeParams}>
        <a>
          {__('DiscoverCityShortcode.startDiscovering', {
            city: __city(pageSlug)('name'),
          })}
        </a>
      </Link>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          margin: 2em 0;
          padding: 1.5em 0;
          border-top: 1px solid ${colors.separator};
          border-bottom: 1px solid ${colors.separator};
        }
        .usps {
          display: flex;
          justify-content: space-around;
        }
        .usp {
          background: url(/static/img/usp-tick.svg) no-repeat left center;
          padding-left: 1.5em;
        }
        a {
          border: 2px solid ${colors.secondaryButtonBorder};
          border-radius: 3px;
          padding: 0.5em 3em;
          display: block;
          text-align: center;
          margin-top: 1.3em;
        }
      `}</style>
    </div>
  );
});

export default DiscoverCityBlock;
