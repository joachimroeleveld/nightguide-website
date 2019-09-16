import PropTypes from 'prop-types';

CheckBox.propTypes = {
  value: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function CheckBox(props) {
  const { value, checked, label, onChange } = props;

  return (
    <div className="container form-checkbox">
      <label>
        <input
          type="checkbox"
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
          display: flex;
          align-items: center;
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
          width: 1em;
          height: 1em;
          margin-right: 0.5em;
          border-radius: 3px;
          border: 1px solid #fff;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
        .checkmark::before {
          content: '';
          position: absolute;
          width: 0.8em;
          height: 0.8em;
          background: none;
          border-radius: 1px;
          transition: background-color 0.3s;
        }
      `}</style>
    </div>
  );
}

export default CheckBox;
