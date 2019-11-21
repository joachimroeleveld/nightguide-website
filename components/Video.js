import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import colors from '../styles/colors';

Video.propTypes = {
  contentItem: PropTypes.object.isRequired,
};

function Video(props) {
  const { url, caption } = props;

  if (url && url.includes('youtu')) {
    return (
      <Fragment>
        <figure className="video">
          <YouTubePlayer
            width="100%"
            height="100%"
            light={true}
            url={url}
            controls
          />
          {/*language=CSS*/}
          <style jsx>{`
            .video {
              width: 100%;
              padding-top: 66%;
              background: ${colors.imagePlaceholder};
              position: relative;
            }
            .video :global(iframe) {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
            }
          `}</style>
        </figure>
        {caption && <em>{caption}</em>}
      </Fragment>
    );
  } else {
    return null;
  }
}

export default Video;
