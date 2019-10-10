import { Link } from '../routes';
import { withNavigation } from './Navigation';
import __ from '../lib/i18n';
import colors from '../styles/colors';

function Breadcrumbs(props) {
  const { items, routeParams } = props;

  const breadcrumbs = items.map(
    ({ key, label, route, disabled, params, ...i18n }) => {
      if (!label && key) {
        label = __(`menu.${key}`, i18n);
      }

      return { key, label, route, params, disabled };
    }
  );

  return (
    <ol className="container">
      {breadcrumbs.map(
        ({ key, route, params = {}, label, disabled }, index) => {
          let elem;
          if (!disabled && index !== items.length - 1) {
            elem = (
              <Link route={route} params={{ ...params, ...routeParams }}>
                <a>{label}</a>
              </Link>
            );
          } else {
            elem = <span>{label}</span>;
          }
          return (
            <li key={index}>
              {elem}
              {index !== breadcrumbs.length - 1 && (
                <span className="separator">{'>'}</span>
              )}
            </li>
          );
        }
      )}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          color: ${colors.textSecondary};
          line-height: 1.4;
          height: 1.26em;
        }
        ol {
          display: flex;
        }
        li {
          list-style: none;
          align-items: center;
          font-size: 0.9em;
          white-space: nowrap;
        }
        li:last-child {
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .prev-marker {
          font-size: 0.6em;
          display: inline-block;
          margin-right: 1em;
        }
        .separator {
          font-size: 0.8em;
          margin: 0 1em;
        }
        a:active,
        a:hover {
          text-decoration: underline;
        }
        @media (min-width: 800px) {
          .container {
            font-size: 1em;
          }
        }
      `}</style>
    </ol>
  );
}

export default withNavigation(Breadcrumbs);
