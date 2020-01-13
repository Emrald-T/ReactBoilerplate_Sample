/**
 *
 * ReviewPage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import TreeTable from 'containers/TreeView';
import FilterDialog from 'containers/FilterDialog';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react';
// import AddIcon from '@material-ui/icons/Add';
import { mdiFilter } from '@mdi/js';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import saga from './saga';
import reducer from './reducer';
import makeSelectReviewPage from './selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));
export function ReviewPage() {
  useInjectReducer({ key: 'reviewPage', reducer });
  useInjectSaga({ key: 'reviewPage', saga });
  const classes = useStyles();
  const [openFDialog, setFDialogOpen] = React.useState(false);
  const openFilterDialog = () => {
    setFDialogOpen(true);
  };
  const handleFilterDialog = () => {
    setFDialogOpen(false);
  };

  return (
    <div>
      <Helmet>
        <title>ReviewPage</title>
        <meta name="description" content="Description of ReviewPage" />
      </Helmet>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={openFilterDialog}
            >
              <Icon path={mdiFilter} title="Filter" size={1} />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Review Page
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <FilterDialog open={openFDialog} close={handleFilterDialog} />
    </div>
  );
}

ReviewPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  reviewPage: makeSelectReviewPage(),
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

export default compose(
  withConnect,
  memo,
)(ReviewPage);
