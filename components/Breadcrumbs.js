import { Link } from '../routes';
import { withNavigation } from './Navigation';
import __ from '../lib/i18n';
import colors from '../styles/colors';
import { useWindowWidth } from '../lib/hooks';

function Breadcrumbs(props) {
  const { items, routeParams } = props;

  const windowWidth = useWindowWidth();

  const breadcrumbs = items.map(
    ({ key, label, route, disabled, params, ...i18n }) => {
      if (!label && key) {
        label = __(`menu.${key}`, i18n);
      }

      return { key, label, route, params, disabled };
    }
  );

  const isCompact = windowWidth < 800;

  if (isCompact) {
    breadcrumbs.pop();
  }

  return (
    <ol className="container">
      {isCompact && <span className="prev-marker">{'<'}</span>}
      {breadcrumbs.map(
        ({ key, route, params = {}, label, disabled }, index) => {
          let elem;
          if (!disabled && !(!isCompact && index !== breadcrumbs.length - 1)) {
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
                <span className="separator">{isCompact ? '/' : '>'}</span>
              )}
            </li>
          );
        }
      )}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          color: ${colors.textSecondary};
        }
        li {
          display: inline-block;
          list-style: none;
          align-items: center;
          font-size: 0.9em;
        }
        .prev-marker {
          font-size: 0.6em;
          display: inline-block;
          margin-right: 1em;
        }
        .separator {
          font-size: 0.8em;
          display: inline-block;
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
