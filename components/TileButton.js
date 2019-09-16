import PropTypes from 'prop-types';
import { classNames } from '../lib/util';
import colors from '../styles/colors';

TileButton.propTypes = {
  title: PropTypes.string,
  iconSrc: PropTypes.string,
  elemType: PropTypes.string,
};

export function TileButton(props) {
  const { title = '', iconSrc, elemType = 'button', ...elemProps } = props;
  const Elem = elemType;
  return (
    <Elem
      className={classNames(['button', iconSrc && 'icon'])}
      {...elemProps}
      style={{
        backgroundImage: iconSrc && `url(${iconSrc})`,
      }}
    >
      {title}
      {/*language=CSS*/}
      <style jsx>{`
        .button {
          display: block;
          text-align: center;
          padding: 0.2em 0.7em;
          border: 1px solid #a4a4a4;
          border-radius: 21px;
          background: #1f1f1f no-repeat center center;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
          transition: background-color 0.3s;
          color: ${colors.text};
        }
        .button.icon {
          width: 2.15em;
          height: 2.15em;
        }
        .button:hover {
          background-color: #535353;
        }
      `}</style>
    </Elem>
  );
}
