import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormItem from './FormItem';
import __ from '../lib/i18n';
import find from 'lodash/find';
import PrimaryButton from './PrimaryButton';
import Spinner from './Spinner';

EmailForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  showProgress: PropTypes.bool.isRequired,
};

function EmailForm(props) {
  const { submitButtonText, showProgress } = props;

  const [values, setValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const errors = {
      email:
        !(values.email || '').match(/.+@.+/) &&
        __('TicketForm.enterValidEmail'),
    };
    setFormErrors(errors);
    return !find(Object.values(errors), error => error);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!validate()) return;

    props.onSubmit(values);
  };

  return (
    <div className="form">
      <FormItem label={__('EmailForm.emailAddress')} error={formErrors.email}>
        <input
          name="email"
          onChange={e => setValues({ email: e.target.value })}
          value={values.email}
          placeholder={'john@doe.com'}
        />
      </FormItem>
      <PrimaryButton
        onClick={onSubmit}
        title={!showProgress ? submitButtonText : null}
        icon={showProgress ? <Spinner /> : null}
      />
      {/*language=CSS*/}
      <style jsx>{`
        input,
        :global(.button) {
          max-width: 30em;
          width: 100%;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export default EmailForm;
