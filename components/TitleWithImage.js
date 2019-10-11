import PropTypes from 'prop-types';

import HeaderImage from './HeaderImage';
import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import { classNames } from '../lib/util';

TitleWithImage.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  titleFontSize: PropTypes.string,
  blurImage: PropTypes.bool,
};

function TitleWithImage(props) {
  const {
    imgSrc,
    title,
    subtitle,
    blurImage = true,
    styles,
    className,
  } = props;

  const imageParams = blurImage ? ['fSoften=1,30,0'] : [];

  return (
    <div className={classNames(['container', className])}>
      <div className="image">
        <HeaderImage imageSrc={imgSrc} imageParams={imageParams} />
      </div>
      <div className="title">
        <h1>
          <span>{title}</span>
        </h1>
        {subtitle && <span className="subtitle">{subtitle}</span>}
      </div>
      {styles}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 12em;
          width: 100%;
        }
        h1 {
          display: inline;
          text-align: center;
          margin: 0;
        }
        h1 span {
          background: ${colors.bg};
          line-height: 1.6;
          padding: 0 0.1em;
        }
        .title {
          justify-content: center;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 ${dimensions.bodyPadding};
          position: relative;
          z-index: 1;
        }
        .subtitle {
          display: block;
          text-align: center;
          justify-content: center;
          margin-top: 0.5em;
          padding: 0 2em;
        }
        .image {
          opacity: ${blurImage ? 0.6 : 1};
          position: absolute;
          z-index: 0;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default TitleWithImage;
