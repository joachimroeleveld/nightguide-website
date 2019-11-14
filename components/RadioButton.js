import PropTypes from 'prop-types';
import { classNames } from '../lib/util';

RadioButton.propTypes = {
  value: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

function RadioButton(props) {
  const { value, checked, label, onChange } = props;

  return (
    <div
      className={classNames(['container', 'form-radio', label && 'has-label'])}
    >
      <label>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <div className="checkmark" />
        {label}
      </label>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          user-select: none;
        }
        label {
          cursor: pointer;
          align-items: center;
          position: relative;
          display: flex;
          align-items: center;
          padding-left: 1.5em;
        }
        input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        input:checked ~ .checkmark::before {
          background: #fff;
        }
        .checkmark {
          position: absolute;
          left: 0;
          width: 1em;
          height: 1em;
          border-radius: 100%;
          border: 1px solid #fff;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
        .has-label .checkmark {
          margin-right: 0.5em;
        }
        .checkmark::before {
          content: '';
          position: absolute;
          width: 0.8em;
          height: 0.8em;
          background: none;
          border-radius: 100%;
          transition: background-color 0.3s;
        }
      `}</style>
    </div>
  );
}

export default RadioButton;
