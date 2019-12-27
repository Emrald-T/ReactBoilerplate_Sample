/**
 *
 * GangSideNav
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { makeSelectTabOpen } from './selectors';
import messages from './messages';
import { openSideNav, setGangFilter } from '../Home/actions';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

export function GangSideNav(props) {
  const { container } = props;
  const classes = useStyles();

  const drawer = () => (
    <div>
      <Toolbar>
        <Typography variant="h6">
          <FormattedMessage {...messages.header} />
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button key="All" onClick={props.setGangFilter}>
          <ListItemText primary="All" />
        </ListItem>
        {['G001', 'G002', 'G003', 'G004', 'G005', 'G006', 'G007'].map(text => (
          <ListItem button key={text} onClick={props.setGangFilter}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor="left"
          open={props.tabOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer()}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
        >
          {drawer()}
        </Drawer>
      </Hidden>
    </nav>
  );
}

GangSideNav.propTypes = {
  tabOpen: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  setGangFilter: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  container: PropTypes.instanceOf(
    typeof Element === 'undefined' ? Object : Element,
  ),
};

const mapStateToProps = createStructuredSelector({
  tabOpen: makeSelectTabOpen(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleDrawerToggle: () => dispatch(openSideNav()),
    setGangFilter: e => dispatch(setGangFilter(e.target.innerText)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GangSideNav);
