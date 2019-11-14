import DiscoverCity from '../../components/DiscoverCityBlock';
import find from 'lodash/find';
import ResponsiveImage from '../../components/ResponsiveImage';
import dimensions from '../../styles/dimensions';

/**
 * TODO: load on demand
 */
const shortcodeComponents = {
  DiscoverCity,
};

export function getShortcodeRenderer(shortcodes) {
  return shortcode => {
    const { identifier, attributes } = shortcode;

    if (shortcodes.includes(identifier) && shortcodeComponents[identifier]) {
      let Component = shortcodeComponents[identifier];
      return <Component {...attributes} />;
    } else {
      return null;
    }
  };
}

export function getImageRenderer(images) {
  return image => {
    const { src } = image;
    const { width, height, url } = find(images, { id: src }) || {};

    if (!url) {
      return null;
    }

    return (
      <ResponsiveImage
        url={url || src}
        widths={[360, 640, 1000, 2000]}
        sizes={`(max-width: 38em) calc(100vw - 2 * ${
          dimensions.bodyPadding
        }), 38em`}
        width={width}
        height={height}
      />
    );
  };
}
