/**
 *
 * HoursInput
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function HoursInput(props) {
  const [error, setError] = React.useState(false);
  const handleChange = (e, params) => {
    const source = e.target;
    const sourceData = params.data;
    const origValue = source.value;
    let value = parseFloat(origValue, 10);
    sourceData[`invalid${params.type}`] = false;
    let errorState = false;
    let otherValue1 = 0;
    let otherValue2 = 0;
    let total = 0;

    // Check if total value is greater than 24
    if (props.type === 'St') {
      otherValue1 = sourceData.Ot;
      otherValue2 = sourceData.Dt;
    } else if (props.type === 'Ot') {
      otherValue1 = sourceData.St;
      otherValue2 = sourceData.Dt;
    } else {
      otherValue1 = sourceData.Ot;
      otherValue2 = sourceData.St;
    }
    // if value is less than 0, then set as 0 only
    value =
      (value < 0 || Number.isNaN(value)) > 0
        ? sourceData[`Old${props.type}`]
        : value;
    total = value + otherValue1 + otherValue2;

    if (total > 24) {
      sourceData[`invalid${params.type}`] = true;
      errorState = true;
    } else {
      sourceData[params.type] = Number.isNaN(value)
        ? sourceData[`Old${props.type}`]
        : value;
      sourceData.Total = total;
    }
    setError(errorState);
    props.handleChange(sourceData);
  };

  return (
    <TextField
      error={error}
      type="number"
      variant="standard"
      defaultValue={
        props.data.initData ? '' : props.data[props.type].toFixed(2)
      }
      placeholder={props.data[`Old${props.type}`].toFixed(2)}
      onChange={e => {
        handleChange(e, { type: props.type, data: props.data });
      }}
      helperText={error ? 'Please enter a valid value' : ''}
      aria-describedby={`${props.type} hours input`}
    />
  );
}

HoursInput.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  handleChange: PropTypes.func,
};

export default HoursInput;
