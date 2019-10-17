import PropTypes from 'prop-types';
import { useState } from 'react';
import Observer from '@researchgate/react-intersection-observer';
import { classNames } from '../lib/util';
import colors from '../styles/colors';

ResponsiveImage.propTypes = {
  url: PropTypes.string.isRequired,
  widths: PropTypes.arrayOf(PropTypes.number),
  sizes: PropTypes.string.isRequired,
  alt: PropTypes.string,
  style: PropTypes.object,
  imgStyle: PropTypes.object,
  lazy: PropTypes.bool,
  showOverlay: PropTypes.bool,
  styles: PropTypes.any,
  className: PropTypes.string,
  scale: PropTypes.bool,
  progressive: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  imageParams: PropTypes.arrayOf(PropTypes.string),
};

export default function ResponsiveImage(props) {
  const {
    url,
    widths,
    sizes,
    alt,
    style,
    imgStyle,
    lazy = true,
    showOverlay = false,
    styles = null,
    className = null,
    scale = false,
    progressive = true,
    width,
    height,
    imageParams = [],
  } = props;

  if (!url) {
    return null;
  }

  const getSrcSet = (url, widths = [], additionalParams = null) => {
    const sources = widths.map(size => {
      let params = [`s${size}`];
      params = params.concat(additionalParams).concat(imageParams);
      return `${url}=${params.join('-')}`;
    });
    const srcSet = sources
      .map((url, index) => `${url} ${widths[index]}w`)
      .join(', ');
    return srcSet;
  };

  const [visible, setVisible] = useState(!lazy);
  const [loaded, setLoaded] = useState(false);

  const jpegSrcSet = getSrcSet(url, widths, ['rj']);
  const webPSrcSet = getSrcSet(url, widths, ['rw']);

  const onIntersect = ({ isIntersecting }) => {
    if (isIntersecting) {
      setVisible(true);
    }
  };

  const onLoad = () => {
    setLoaded(true);
  };

  const containerClasses = [className || ''];
  if (visible) {
    containerClasses.push('visible');
  }
  if (!lazy || loaded) {
    containerClasses.push('loaded');
  }
  if (scale) {
    containerClasses.push('scale');
  }

  const progressiveImgUrl = `${url}=s10-c-fSoften=1,100,0`;
  const aspectRatio = height / width;

  return (
    <Observer disabled={!lazy} onChange={onIntersect}>
      <picture
        className={`container ${containerClasses.join(' ')}`.trim()}
        style={{
          backgroundImage:
            progressive && visible ? `url(${progressiveImgUrl})` : null,
          ...style,
        }}
      >
        <div
          className="placeholder"
          style={{
            paddingTop: Math.round(aspectRatio * 100000) / 1000 + '%',
            maxHeight: height,
          }}
        />
        <source
          type="image/webp"
          sizes={sizes}
          srcSet={visible ? webPSrcSet : undefined}
        />
        <source
          type="image/jpeg"
          sizes={sizes}
          srcSet={visible ? jpegSrcSet : undefined}
        />
        <img
          style={imgStyle}
          className={className}
          alt={alt}
          onLoad={onLoad}
          width={width}
          height={height}
          src={visible ? `${url}=s600-rj` : undefined}
        />
        {showOverlay && <div className={classNames([className, 'overlay'])} />}
        {/*language=CSS*/}
        <style jsx>{`
          picture {
            background: no-repeat center center ${colors.imagePlaceholder};
            background-size: cover;
            display: block;
            position: relative;
          }
          img {
            position: absolute;
            top: 0;
            z-index: 0;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            vertical-align: middle;
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
          .loaded img {
            opacity: 1;
          }
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
          }
          .container.scale:hover img {
            transform: scale(1.05);
          }
          .placeholder {
            width: 100%;
          }
        `}</style>
        {styles}
      </picture>
    </Observer>
  );
}
