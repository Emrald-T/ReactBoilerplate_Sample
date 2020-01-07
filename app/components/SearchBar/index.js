/**
 *
 * SearchBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SearchBar(props) {
  const handleChange = e => {
    props.onChange(e);
  };
  const placeholder = props.placeholder || '';

  return (
    <TextField
      variant="outlined"
      defaultValue={props.value}
      placeholder={
        placeholder || <FormattedMessage {...messages.placeholder} />
      }
      onChange={handleChange}
      aria-describedby={`Search bar for ${placeholder}`}
      className={props.className}
    />
  );
}

SearchBar.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default styled(SearchBar)`
  width: 100%;
  padding: 10px 0 !important;
  input {
    padding: 10px;
    background-color: white;
  }
`;
