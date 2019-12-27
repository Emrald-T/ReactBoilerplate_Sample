import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import messages from './messages';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}));

function Header(props) {
  const classes = useStyles();
  const left = [];
  const right = [];
  props.children.forEach(elem => {
    if (elem.props.left) {
      left.push(elem);
    } else if (elem.props.right) {
      right.push(elem);
    }
  });

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {left}
        <Typography variant="h6" className={classes.title}>
          <FormattedMessage {...messages[props.title]} />
        </Typography>
        {right}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array || PropTypes.element,
};

export default Header;
