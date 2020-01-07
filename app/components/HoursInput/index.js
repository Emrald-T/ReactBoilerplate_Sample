/**
 *
 * HoursInput
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  root: {
    '& input': {
      maxWidth: '8em',
    },
  },
}));

function HoursInput(props) {
  const [error, setError] = React.useState({ state: false, text: '' });
  const classes = useStyle();
  const handleChange = (e, params) => {
    const source = e.target;
    const sourceData = params.data;
    const origValue = source.value;
    let errorText = '';
    let value = parseFloat(origValue, 10);
    const validValue = /^\d+(\.\d*)?$/.test(origValue);
    // sourceData[`invalid${params.type}`] = false;
    let errorState = false;
    let otherValue1 = 0;
    let otherValue2 = 0;
    let total = 0;

    if (!validValue && origValue !== '') {
      source.value = value;
    } else if (value < 0) {
      value = 0;
      source.value = 0;
    }

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
    value = !origValue ? sourceData[`Old${props.type}`] : value;
    total = value + otherValue1 + otherValue2;

    if (total > 24) {
      errorState = true;
      errorText = 'Total hours must be =< 24';
    } else {
      sourceData[params.type] = Number.isNaN(value)
        ? sourceData[`Old${props.type}`]
        : value;
      sourceData.Total = total;
    }
    setError({ state: errorState, text: errorText });
    props.handleChange(sourceData);
  };

  return (
    <TextField
      error={error.state}
      variant="standard"
      defaultValue={
        props.data.initData ? '' : props.data[props.type].toFixed(2)
      }
      placeholder={props.data[`Old${props.type}`].toFixed(2)}
      onChange={e => {
        handleChange(e, { type: props.type, data: props.data });
      }}
      helperText={error.text}
      aria-describedby={`${props.type} hours input`}
      className={classes.root}
    />
  );
}

HoursInput.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  handleChange: PropTypes.func,
};

export default HoursInput;
