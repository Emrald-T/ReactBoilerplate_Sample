/**
 *
 * HomePage
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'containers/TabPanel';
import CloseIcon from '@material-ui/icons/Close';
import { mdiFilter } from '@mdi/js';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import Header from 'components/Header';
import GangSideNav from 'containers/GangSideNav';
import EmployeeTable from 'containers/EmployeeTable';
import ActivityDialog from 'containers/ActivityDialog';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  openSideNav,
  addProject,
  closeTab,
  changeTab,
  getEmployeeData,
  editEmployeeData,
} from './actions';
import {
  makeSelectProjects,
  makeSelectProjectData,
  makeSelectCurrentTab,
  makeSelectEmpData,
} from './selectors';
// import messages from './messages';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  fab: {
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  content: {
    flexGrow: 1,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: `calc(100% - 240px)`,
      position: 'relative',
    },
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  tabsBar: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    '& header': {
      position: 'fixed',
      [theme.breakpoints.up('md')]: {
        maxWidth: `calc(100% - 240px)`,
      },
    },
  },
  tabs: {
    transition: 'background-color 150ms ease',
    '&:hover': {
      backgroundColor: '#e2e2e2',
      '& svg': {
        opacity: 1,
      },
    },
  },
  tabLabel: {
    width: '100%',
    '& > h6': {
      float: 'left',
      width: '7em',
    },
  },
  closeBtn: {
    fontSize: '16px',
    margin: '5px auto',
    float: 'right',
    opacity: 0,
    transition: 'opacity 0.15s ease',
    '&:hover': {
      opacity: 1,
    },
  },
  tabPanels: {
    position: 'absolute',
    marginTop: '48px',
    width: '100%',
  },
  table: {
    minWidth: 700,
  },
}));

function HomePage(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  const classes = useStyles();
  let closedTab = '';
  const uniqTabs = [];
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    if (event.target.innerText || closedTab === props.currentTab) {
      props.setCurrentTab(event.target.innerText);
    }
  };

  const handleTabClose = event => {
    closedTab = event.currentTarget.parentNode.innerText;
    props.handleCloseTab(closedTab);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // When project tabs are availble initially, load the table data
  // useEffect(() => {
  //   if (props.projects.length > 0) props.getEmployeeData();
  // }, []);

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      {/* provide i18n key value */}
      <Header title="homeTitle">
        <div left="true">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.toggleGangsDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div right="true">
          <IconButton
            color="inherit"
            aria-label="open filter"
            edge="end"
            onClick={props.toggleFilterDrawer}
          >
            <Icon path={mdiFilter} title="Filter" size={1} />
          </IconButton>
        </div>
      </Header>
      <GangSideNav />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.projects.length ? (
          <div className={classes.tabsBar}>
            <AppBar position="static" color="default">
              <Tabs
                value={props.currentTab}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                indicatorColor="primary"
                textColor="primary"
                aria-label="tabs"
              >
                {props.projects.map((item, index) => {
                  if (uniqTabs.indexOf(item) === -1) {
                    uniqTabs.push(item);
                    return (
                      <Tab
                        key={item}
                        label={
                          <span className={classes.tabLabel}>
                            <Typography variant="subtitle1">{item}</Typography>
                            <CloseIcon
                              className={classes.closeBtn}
                              onClick={handleTabClose}
                            />
                          </span>
                        }
                        value={`${item}`}
                        id={`tab-${index}`}
                        aria-controls={`tabpanel-${index}`}
                        className={classes.tabs}
                      />
                    );
                  }
                  return '';
                })}
              </Tabs>
            </AppBar>
            {props.projectData.map((itemData, index) => {
              const item = props.projects[index];
              return (
                <TabPanel
                  key={item}
                  value={`${item}`}
                  index={`${props.currentTab}`}
                  className={classes.tabPanels}
                >
                  <Typography>
                    Type - {itemData.OrderType}
                    <br />
                    Description -&nbsp;
                    {itemData.OrderDesc ||
                      `${itemData.NwDesc}::${itemData.ActDesc}`}
                    <br />
                    <br />
                  </Typography>
                  <EmployeeTable
                    tab={props.currentTab}
                    // data={props.empData}
                    // onEdit={props.onEdit}
                  />
                </TabPanel>
              );
            })}
          </div>
        ) : (
          ''
        )}
        <Fab
          aria-label="Add Project"
          className={`${classes.fab} ${classes.fabGreen}`}
          color="inherit"
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <ActivityDialog
          open={open}
          onClose={handleClose}
          onSelectionComplete={props.addProject}
        />
      </main>
    </div>
  );
}

HomePage.propTypes = {
  projects: PropTypes.array,
  projectData: PropTypes.array,
  currentTab: PropTypes.any,
  // empData: PropTypes.array,
  toggleGangsDrawer: PropTypes.func,
  toggleFilterDrawer: PropTypes.func,
  handleCloseTab: PropTypes.func,
  setCurrentTab: PropTypes.func,
  addProject: PropTypes.func,
  // onEdit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  projects: makeSelectProjects(),
  projectData: makeSelectProjectData(),
  currentTab: makeSelectCurrentTab(),
  empData: makeSelectEmpData(),
});

function mapDispatchToProps(dispatch, props) {
  return {
    toggleGangsDrawer: () => dispatch(openSideNav()),
    setCurrentTab: value => dispatch(changeTab(value)),
    handleCloseTab: value => {
      dispatch(closeTab(value));
      if (props.currentTab === value) {
        dispatch(changeTab());
      }
    },
    addProject: data => {
      dispatch(addProject(data));
      dispatch(changeTab());
      dispatch(getEmployeeData());
    },
    onEdit: (key, data) => {
      dispatch(editEmployeeData(key, data));
    },
    // getEmpData: () => dispatch(getEmployeeData(props.currentTab)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
