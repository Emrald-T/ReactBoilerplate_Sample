/**
 *
 * TabPanel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import makeSelectTabPanel from './selectors';
// import reducer from './reducer';
// import saga from './saga';
// import messages from './messages';

function TabPanel(props) {
  const { children, value, index } = props;

  // useInjectReducer({ key: 'tabPanel', reducer });
  // useInjectSaga({ key: 'tabPanel', saga });

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      className={props.className}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  className: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  tabPanel: makeSelectTabPanel(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TabPanel);
