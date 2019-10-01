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
          if (!disabled && index !== breadcrumbs.length - 1) {
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
                <span className="arrow">{'>'}</span>
              )}
            </li>
          );
        }
      )}
      {/*language=CSS*/}
      <style jsx>{`
        li {
          display: inline-block;
          list-style: none;
          align-items: center;
          color: ${colors.textSecondary};
          font-size: 0.9em;
        }
        .arrow {
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
