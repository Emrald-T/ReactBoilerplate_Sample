/**
 *
 * HomePage
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@mdi/react';
// import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'containers/TabPanel';
import CloseIcon from '@material-ui/icons/Close';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SaveIcon from '@material-ui/icons/Save';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Tooltip from '@material-ui/core/Tooltip';
import { mdiFilter } from '@mdi/js';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

import Header from 'components/Header';
import GangSideNav from 'containers/GangSideNav';
import EmployeeTable from 'containers/EmployeeTable';
import ActivityDialog from 'containers/ActivityDialog';
import SearchBar from 'components/SearchBar';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  openSideNav,
  addProject,
  closeTab,
  changeTab,
  getEmployeeData,
  editEmployeeData,
  searchEmployee,
} from './actions';
import {
  makeSelectProjects,
  makeSelectProjectData,
  makeSelectCurrentTab,
  makeSelectSearchValue,
} from './selectors';
// import messages from './messages';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  toolbar: theme.mixins.toolbar,
  spdButton: {
    height: '100%',
    width: '100%',
    transform: 'translateZ(0px)',
    position: 'fixed',
    // flexGrow: 1,
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    '& > button': {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
    '& #SpeedDial-actions>span>span': {
      right: '4.5rem',
      position: 'fixed',
    },
  },
  // fabGreen: {
  //   color: theme.palette.common.white,
  //   backgroundColor: green[500],
  //   '&:hover': {
  //     backgroundColor: green[600],
  //   },
  // },
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
    maxWidth: '300px',
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
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
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
}));

function HomePage(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });
  const classes = useStyles();
  let closedTab = '';
  const uniqTabs = [];
  const [openDialog, setDialogOpen] = React.useState(false);
  const [openSD, setSDOpen] = React.useState(false);

  // Tab functions
  const handleChange = event => {
    if (event.target.innerText || closedTab === props.currentTab) {
      props.setCurrentTab(event.target.innerText);
    }
  };

  const handleTabClose = event => {
    closedTab = event.currentTarget.parentNode.innerText;
    props.handleCloseTab(closedTab);
  };

  // Dialog and Speed-dial functions
  const handleOpenSD = () => {
    setSDOpen(!openSD);
  };

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = (event, source) => {
    if (source === 'speed-dial') {
      setSDOpen(false);
    } else {
      setDialogOpen(false);
    }
  };

  const actions = [
    { icon: <PostAddIcon />, name: 'Add Project', onClick: handleOpen },
    { icon: <SaveIcon />, name: 'Save', onClick: () => {} },
    { icon: <RateReviewIcon />, name: 'Review and Post', onClick: () => {} },
  ];

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
      <main className={props.projects.length ? classes.content : ''}>
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
                            <Tooltip title={item}>
                              <Typography variant="subtitle1">
                                {item}
                              </Typography>
                            </Tooltip>
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
                  </Typography>
                  <SearchBar
                    placeholder="Search Employee name or number..."
                    onChange={e => props.searchEmp(e.target.value)}
                    value={props.searchValue}
                  />
                  <EmployeeTable tab={props.currentTab} />
                </TabPanel>
              );
            })}
          </div>
        ) : (
          ''
        )}
        <ActivityDialog
          open={openDialog}
          onClose={handleClose}
          onSelectionComplete={props.addProject}
        />
      </main>
      <div className={openSD ? classes.spdButton : ''}>
        <Backdrop open={openSD} />
        <SpeedDial
          ariaLabel="SpeedDial"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={e => {
            handleClose(e, 'speed-dial');
          }}
          onOpen={handleOpenSD}
          open={openSD}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              FabProps={
                action.name === 'Save'
                  ? { component: Link, to: '/features' }
                  : {}
              }
              onClick={e => {
                handleClose(e, 'speed-dial');
                action.onClick();
              }}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}

// <Fab
//   aria-label="Add Project"
//   className={`${classes.fab} ${classes.fabGreen}`}
//   color="inherit"
//   onClick={handleClickOpen}
// >
//   <AddIcon />
// </Fab>

HomePage.propTypes = {
  projects: PropTypes.array,
  projectData: PropTypes.array,
  currentTab: PropTypes.any,
  toggleGangsDrawer: PropTypes.func,
  toggleFilterDrawer: PropTypes.func,
  handleCloseTab: PropTypes.func,
  setCurrentTab: PropTypes.func,
  addProject: PropTypes.func,
  searchEmp: PropTypes.func,
  searchValue: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  projects: makeSelectProjects(),
  projectData: makeSelectProjectData(),
  currentTab: makeSelectCurrentTab(),
  searchValue: makeSelectSearchValue(),
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
    searchEmp: value => dispatch(searchEmployee(value)),
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
