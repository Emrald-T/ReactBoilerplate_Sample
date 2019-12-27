/**
 *
 * ActivityDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'containers/TabPanel';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectProjects, makeSelectProjectData } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperScrollPaper': {
      height: '100%',
    },
    '& .MuiDialogContent-root': {
      padding: 0,
    },
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    '& p': {
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      maxWidth: '200px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      height: 'auto',
    },
  },
  tabsBar: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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
}));

export function ActivityDialog(props) {
  useInjectReducer({ key: 'activityDialog', reducer });
  useInjectSaga({ key: 'activityDialog', saga });

  const classes = useStyles();
  const finalData = {};
  const data = [
    { OrderType: 'IO', OrderDesc: 'First IO', OrderValue: '201' },
    { OrderType: 'IO', OrderDesc: '2 IO', OrderValue: '202' },
    { OrderType: 'IO', OrderDesc: '3 IO', OrderValue: '203' },
    { OrderType: 'IO', OrderDesc: 'Four IO', OrderValue: '204' },
    { OrderType: 'IO', OrderDesc: '5 IO', OrderValue: '205' },
    { OrderType: 'IO', OrderDesc: '6 IO', OrderValue: '206' },
    { OrderType: 'IO', OrderDesc: '7 IO', OrderValue: '207' },
    { OrderType: 'CC', OrderDesc: '1 CC', OrderValue: '1001' },
    { OrderType: 'CC', OrderDesc: 'TWo CC', OrderValue: '1002' },
    { OrderType: 'CC', OrderDesc: 'Three CC', OrderValue: '1003' },
    { OrderType: 'CC', OrderDesc: '4 CC', OrderValue: '1004' },
    { OrderType: 'CC', OrderDesc: 'Five CC', OrderValue: '1005' },
    {
      OrderType: 'FC',
      ProjectNo: '1502100',
      Fastcode: '105A',
      ProjDesc: 'Project 1.1',
      Network: '12070121114',
      NwDesc: 'NetWork Desc 1',
      Activity: '800',
      ActDesc: 'Act desc 1',
    },
    {
      OrderType: 'FC',
      ProjectNo: '1502100',
      Fastcode: '106A',
      ProjDesc: 'Project 1.2',
      Network: '12070121114',
      NwDesc: 'NetWork Desc 1',
      Activity: '800',
      ActDesc: 'Act desc 1',
    },
    {
      OrderType: 'FC',
      ProjectNo: '1502101',
      Fastcode: '110B',
      ProjDesc: 'Project 2.1',
      Network: '12070121114',
      NwDesc: 'NetWork Desc 1',
      Activity: '800',
      ActDesc: 'Act desc 1',
    },
    {
      OrderType: 'FC',
      ProjectNo: '1502101',
      Fastcode: '105A',
      ProjDesc: 'Project 2.2',
      Network: '12070121114',
      NwDesc: 'NetWork Desc 1',
      Activity: '800',
      ActDesc: 'Act desc 1',
    },
  ];

  const splitData = () => {
    const FC = [];
    const IO = [];
    const CC = [];
    for (let i = data.length - 1; i >= 0; i -= 1) {
      if (data[i].OrderType === 'FC') {
        FC.push(data[i]);
      } else if (data[i].OrderType === 'IO') {
        IO.push(data[i]);
      } else {
        CC.push(data[i]);
      }
    }
    finalData.FC = FC;
    finalData.IO = IO;
    finalData.CC = CC;
  };

  splitData();

  const getListItemBinding = item => {
    let listItemTitle = '';
    let listItemText = '';
    let listItemSubTitle = '';
    let listItemSubSubTitle = '';
    if (item.OrderType === 'FC') {
      listItemTitle = item.ProjectNo;
      listItemText = item.Fastcode;
      listItemSubTitle = item.ProjDesc;
      listItemSubSubTitle = `${item.NwDesc} :: ${item.ActDesc}`;
    } else {
      listItemTitle = item.OrderValue;
      listItemSubTitle = item.OrderDesc;
    }
    return {
      title: listItemTitle,
      text: listItemText,
      subTitle: listItemSubTitle,
      subSubTitle: listItemSubSubTitle,
    };
  };

  const [value, setValue] = React.useState('FC');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [checked, setChecked] = React.useState([]);
  const [bindings, setBinding] = React.useState([]);

  // Generate the tabs
  const ActTab = (key, label) => (
    <Tab
      label={<Typography variant="subtitle1">{label || key}</Typography>}
      value={key}
      id={`tab-${key}`}
      aria-controls={`tabpanel-${key}`}
      className={classes.tabs}
    />
  );

  // Generate the tab panels
  const ActTabPanel = key => {
    const listData = finalData[key];
    let output = '';
    output = listData.map(item => {
      const itemData = getListItemBinding(item);
      const itemValue =
        item.OrderType === 'FC'
          ? `${itemData.title}_${itemData.text}`
          : `${item.OrderType}_${itemData.title}`;
      const labelId = `checkbox-list-label-${itemValue}`;

      return (
        <ListItem key={itemValue} dense button onClick={handleToggle(item)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(itemValue) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText
            id={labelId}
            primary={itemData.title}
            secondary={
              <span>
                <span>{itemData.subTitle}</span>
                <br />
                <span>{itemData.subSubTitle}</span>
              </span>
            }
          />
          <ListItemSecondaryAction>
            <Typography>{itemData.text}</Typography>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return (
      <TabPanel value={key} index={value}>
        <List className={classes.list}>{output}</List>
      </TabPanel>
    );
  };

  const beforeOpening = () => {
    setChecked(props.projects);
    setBinding(props.projectData);
  };

  // Called when the check box is checked/unchecked
  const handleToggle = item => () => {
    const itemData = getListItemBinding(item);
    const itemValue =
      item.OrderType === 'FC'
        ? `${itemData.title}_${itemData.text}`
        : `${item.OrderType}_${itemData.title}`;
    const currentIndex = checked.indexOf(itemValue);
    const newChecked = [...checked];
    const newBindings = [...bindings];

    if (currentIndex === -1) {
      newChecked.push(itemValue);
      newBindings.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
      newBindings.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setBinding(newBindings);
  };

  // Called when the 'Confirm' button is pressed
  const onConfirm = () => {
    props.onSelectionComplete({ id: checked, data: bindings });
    props.onClose();
  };

  // The Activity Dialog
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        aria-labelledby="dialog-title"
        open={props.open}
        onClose={props.onClose}
        className={classes.root}
        onEnter={beforeOpening}
      >
        <DialogTitle id="dialog-title">
          <FormattedMessage {...messages.header} />
        </DialogTitle>
        <DialogContent>
          <div className={classes.tabsBar}>
            <AppBar position="sticky" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="acitivity tabs"
              >
                {ActTab('FC', 'Fast Code')}
                {ActTab('IO', 'Internal Order')}
                {ActTab('CC', 'Cost Center')}
              </Tabs>
            </AppBar>
            {ActTabPanel('FC')}
            {ActTabPanel('IO')}
            {ActTabPanel('CC')}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm} color="primary">
            Confirm
          </Button>
          <Button onClick={props.onClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ActivityDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSelectionComplete: PropTypes.func,
  projects: PropTypes.array,
  projectData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  projects: makeSelectProjects(),
  projectData: makeSelectProjectData(),
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

export default compose(withConnect)(ActivityDialog);
