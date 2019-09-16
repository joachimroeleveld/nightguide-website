import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import colors from '../styles/colors';

RowControls.propTypes = {
  onBackPress: PropTypes.func.isRequired,
  onNextPress: PropTypes.func.isRequired,
};

function RowControls(props) {
  const { onBackPress, onNextPress } = props;

  const [showPrev, setShowPrev] = useState(false);

  return (
    <Fragment>
      {showPrev && <button className="prev" onClick={() => onBackPress()} />}
      <button
        className="next"
        onClick={() => {
          setShowPrev(true);
          onNextPress();
        }}
      />
      {/*language=CSS*/}
      <style jsx>{`
        .prev,
        .next {
          display: block;
          width: 2em;
          height: 2em;
          position: absolute;
          top: 50%;
          margin-top: -1em;
          background: no-repeat url(/static/img/pager-arrow.svg) ${colors.bg}
            center center;
          border-radius: 100%;
          z-index: 10;
          box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 1px 1px;
        }
        .prev {
          left: -1.5em;
          transform: rotateY(180deg);
        }
        .next {
          right: -1.5em;
        }
      `}</style>
    </Fragment>
  );
}

export default RowControls;
