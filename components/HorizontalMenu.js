import PropTypes from 'prop-types';
import { Link } from '../routes';
import { classNames } from '../lib/util';

HorizontalMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      active: PropTypes.bool,
    })
  ).isRequired,
  routeParams: PropTypes.object,
};

function HorizontalMenu(props) {
  const { items, routeParams } = props;

  return (
    <nav>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link route={item.route} params={routeParams}>
              <a className={classNames([item.active && 'active'])}>
                {item.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {/*language=CSS*/}
      <style jsx>{`
        nav {
        }
        ul {
          display: flex;
          overflow-x: auto;
        }
        a {
          padding: 0.4em 1.5em;
          display: block;
        }
        a.active {
          border-bottom: 2px solid #fff;
        }
      `}</style>
    </nav>
  );
}

export default HorizontalMenu;
