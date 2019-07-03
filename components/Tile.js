import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import Link from 'next/link';

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import ResponsiveImage from './ResponsiveImage';

function Tile(props) {
  const {
    href,
    title,
    imgProps,
    styles = null,
    className,
    BodyContents = null,
    linkBody = true,
    ContainerElem = 'article',
  } = props;

  const topContent = (
    <header className={['top', className].join(' ')}>
      <span className={'title'}>{title}</span>
      {!!imgProps && (
        <div className="img">
          <ResponsiveImage
            showOverlay={true}
            scale={true}
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
        .top {
          position: relative;
          display: flex;
          background: ${colors.tileBg};
          border-top-left-radius: ${dimensions.tileRadius};
          border-top-right-radius: ${dimensions.tileRadius};
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
          border-bottom-left-radius: ${BodyContents
            ? 0
            : dimensions.tileRadius};
          border-bottom-right-radius: ${BodyContents
            ? 0
            : dimensions.tileRadius};
          overflow: hidden;
        }
        .title {
          margin: 0.6em ${dimensions.tilePadding};
          font-weight: 600;
          font-size: 0.9em;
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
    </header>
  );

  const bodyContent = (
    <div className={['body', className].join(' ')}>
      {BodyContents}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .body {
          font-size: 0.85em;
          color: ${colors.textSoft};
          padding: 0.5em 0.8em;
          border-bottom-left-radius: ${dimensions.tileRadius};
          border-bottom-right-radius: ${dimensions.tileRadius};
          background: ${colors.cardBg};
          box-shadow: ${colors.tileShadow};
          flex-grow: 1;
        }
      `}</style>
    </div>
  );

  return (
    <ContainerElem className={['container', className].join(' ')}>
      {href && (
        <Link href={href}>
          <a>{topContent}</a>
        </Link>
      )}
      {!href && topContent}
      {BodyContents && linkBody && (
        <Link href={href}>
          <a>{bodyContent}</a>
        </Link>
      )}
      {bodyContent && !linkBody && bodyContent}
      {styles}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
      `}</style>
    </ContainerElem>
  );
}

Tile.propTypes = {
  size: PropTypes.oneOf(['small']),
  title: PropTypes.string,
  imgProps: PropTypes.object,
};

export default Tile;
