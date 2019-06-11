import PropTypes from 'prop-types';
import css from 'styled-jsx/css';

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import ResponsiveImage from './ResponsiveImage';

function Tile(props) {
  const { title, imgProps, style = {} } = props;
  return (
    <div className="tile" style={style}>
      <span className={'title'}>{title}</span>
      {!!imgProps && (
        <div className="img">
          <ResponsiveImage
            showOverlay={true}
            /*language=CSS*/
            {...css.resolve`
            .container {
              display: block;
              width: 100%;  
              height: 100%;
            }
            img {
              object-fit: cover;
              width: 100%;
              height: 100%;
            }
            .overlay {
              top: 20%;
              height: 80%;
              width: 100%;
              background: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 1));
            }
          `}
            {...imgProps}
          />
        </div>
      )}
      {/*language=CSS*/}
      <style jsx>{`
        .tile {
          position: relative;
          display: flex;
          background: ${colors.tileBg};
          height: 100%;
          border-radius: ${dimensions.tileRadius};
          overflow: hidden;
          align-items: flex-end;
        }
        .img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .title {
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
