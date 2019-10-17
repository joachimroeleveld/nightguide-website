import PropTypes from 'prop-types';

import colors from '../styles/colors';
import dimensions from '../styles/dimensions';
import __ from '../lib/i18n';

FormItem.propTypes = {
  label: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

function FormItem(props) {
  const { label, error, children } = props;

  return (
    <label>
      {label && <span className="label">{label}</span>}
      {children}
      {error && (
        <span className="error">
          {error === true ? __('FormItem.fieldIsRequired') : error}
        </span>
      )}
      {/*language=CSS*/}
      <style jsx>{`
        label {
          margin: 0.8em 0;
          display: block;
        }
        label
          :global(input:not([type]), input[type='text'], input[type='email'], input[type='tel']) {
          background: ${colors.inputBg};
          border-radius: ${dimensions.inputRadius};
          border: none;
          padding: ${dimensions.inputPadding};
          line-height: ${dimensions.inputLineHeight};
        }
        .label {
          font-size: 0.9em;
          margin-bottom: 0.1em;
          display: block;
        }
        .error {
          font-size: 0.9em;
          color: ${colors.textError};
          margin: 0.8em 0;
        }
      `}</style>
    </label>
  );
}

export default FormItem;
