import PropTypes from 'prop-types';
import colors from '../styles/colors';
import dimensions from '../styles/dimensions';

function Tile(props) {
  const { size = 'small', title, imgProps, style = {} } = props;
  return (
    <div className={`tile ${size}`} style={style}>
      <div className="contents">
        <span className={'text'}>{title}</span>
        {!!imgProps && <div className={'shadow'} />}
      </div>
      {!!imgProps && <img {...imgProps} />}
      {/*language=CSS*/}
      <style jsx>{`
        .tile {
          position: relative;
          display: flex;
          background: ${colors.tileBg};
          border-radius: ${dimensions.tileRadius};
          height: 100%;
        }
        .contents {
          position: absolute;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: flex-end;
        }
        .text {
          margin: ${dimensions.tilePadding};
          line-height: 1.4;
          width: 100%;
          position: relative;
          z-index: 1;
          overflow-wrap: break-word;
          text-shadow: 0 1px #000;
          max-height: calc(1.4em * 3);
          display: block;
          overflow: hidden;
        }
        .shadow {
          z-index: 0;
          height: 80%;
          width: 100%;
          position: absolute;
          background: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 1));
          left: 0;
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }
        img {
          border-radius: 6px;
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

Tile.propTypes = {
  size: PropTypes.oneOf(['small']),
  title: PropTypes.string,
  imgProps: PropTypes.object,
};

export default Tile;
